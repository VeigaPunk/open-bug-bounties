import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";

import {
  CONFIGURED_SOURCE_IDS,
  SOURCE_DEFINITIONS,
  RefreshError,
  crawlPaginatedInventory,
  findNextPage,
  independentEligibilityReason,
  isPublicAddress,
  parseHackerOnePage,
  parseSherlockPage,
  robotsDecision,
  validateNetworkUrl,
  verifyGeneration,
} from "../scripts/refresh-data.mjs";

function document(body) {
  return `<!doctype html><html><body>${body}</body></html>`;
}

function hackerOneCard({ index, handle, name, offers = true }) {
  return `<a class="bug-bounty-list-item" data-item="${index}" data-item-name=" ${name} " href="https://hackerone.com/${handle}">
    <span class="bug-bounty-list-item-name">${name}</span>
    <span class="bug-bounty-list-item-meta-item ${offers ? "bounties" : "disclosure"}">${offers ? "Offers bounties" : "Disclosure only"}</span>
  </a>`;
}
function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function generationFixture() {
  const runId = "refresh-20260829T120000000Z";
  const independent = { refresh_run_id: runId, programs: [] };
  const platform = { refresh_run_id: runId, programs: [] };
  const web3 = { refresh_run_id: runId, records: [] };
  const serialized = Object.fromEntries(
    Object.entries({ independent, platform, web3 }).map(([id, value]) => [
      id,
      `${JSON.stringify(value)}\n`,
    ]),
  );
  const evidence = {
    run_id: runId,
    status: "partial",
    totals: {
      records: 0,
      canonical_urls: 0,
      duplicate_urls: 0,
      independent_configured: 0,
      independent_eligible: 0,
    },
    datasets: [
      {
        id: "independent",
        path: "data/independent_programs.json",
        records: 0,
        sha256: sha256(serialized.independent),
      },
      {
        id: "platform",
        path: "data/platform_programs.json",
        records: 0,
        sha256: sha256(serialized.platform),
      },
      {
        id: "web3",
        path: "data/web3_programs.json",
        records: 0,
        sha256: sha256(serialized.web3),
      },
    ],
    sources: CONFIGURED_SOURCE_IDS.map((source_id) => ({
      source_id,
      count: 0,
      complete: false,
    })),
  };
  evidence.evidence_id = sha256(JSON.stringify(evidence));
  return { input: { independent, platform, web3, evidence }, serialized };
}

test("HackerOne parser keeps only source-valid bounty cards", () => {
  const html = document(
    `${hackerOneCard({ index: 1, handle: "alpha", name: "Alpha &amp; Co" })}
     ${hackerOneCard({ index: 2, handle: "beta", name: "Beta", offers: false })}`,
  );
  const parsed = parseHackerOnePage(html);
  assert.deepEqual(parsed.records, [
    { id: "hackerone:alpha", name: "Alpha & Co", url: "https://hackerone.com/alpha" },
  ]);
  assert.equal(parsed.directoryItems, 2);
  assert.equal(parsed.rawCount, 1);
  assert.equal(parsed.nextUrl, null);
});

test("HackerOne parser rejects off-source links and incomplete card sequences", () => {
  const hostile = document(
    `<a class="bug-bounty-list-item" data-item="1" data-item-name="Hostile" href="https://example.test/hostile">
      <span class="bug-bounty-list-item-name">Hostile</span>
      <span class="bug-bounty-list-item-meta-item bounties">Offers bounties</span>
    </a>`,
  );
  assert.throws(() => parseHackerOnePage(hostile), (error) => error.code === "hackerone_program_url_invalid");

  const gap = document(
    `${hackerOneCard({ index: 1, handle: "alpha", name: "Alpha" })}
     ${hackerOneCard({ index: 3, handle: "gamma", name: "Gamma" })}`,
  );
  assert.throws(() => parseHackerOnePage(gap), (error) => error.code === "hackerone_card_index_gap");
  const bidi = document(
    hackerOneCard({ index: 1, handle: "bidi", name: "Safe\u202Eevil" }),
  );
  assert.throws(
    () => parseHackerOnePage(bidi),
    (error) => error.code === "text_contains_control_character",
  );
});

test("Sherlock parser exposes responsive duplicates for deterministic collapse", () => {
  const html = document(`
    <a class="block featured" href="/bug-bounties/56"><h2>Gamma</h2></a>
    <a class="block list" href="/bug-bounties/56"><h2>Gamma</h2></a>
    <a class="block" href="/bug-bounties/355"><h2>Puffer</h2></a>
  `);
  const parsed = parseSherlockPage(html);
  assert.equal(parsed.rawCount, 3);
  assert.equal(parsed.records.length, 3);
  assert.deepEqual(parsed.records[2], {
    id: "sherlock:355",
    name: "Puffer",
    url: "https://audits.sherlock.xyz/bug-bounties/355",
  });
});

test("pagination follows one explicit next link and deduplicates by canonical URL", async () => {
  const firstUrl = SOURCE_DEFINITIONS.HackerOne.directoryUrl;
  const secondUrl = `${firstUrl}?page=2`;
  const pages = new Map([
    [
      firstUrl,
      document(
        `${hackerOneCard({ index: 1, handle: "alpha", name: "Alpha" })}
         <a rel="next" href="?page=2">Next</a>`,
      ),
    ],
    [secondUrl, document(hackerOneCard({ index: 2, handle: "beta", name: "Beta" }))],
  ]);
  const crawled = await crawlPaginatedInventory({
    definition: SOURCE_DEFINITIONS.HackerOne,
    parser: parseHackerOnePage,
    fetchPage: async (url) => pages.get(url),
  });
  assert.equal(crawled.pages.length, 2);
  assert.equal(crawled.rawCount, 2);
  assert.equal(crawled.deduplicatedCount, 2);
  assert.equal(crawled.duplicatesRemoved, 0);
  assert.deepEqual(crawled.records.map((record) => record.id), ["hackerone:alpha", "hackerone:beta"]);
});

test("pagination rejects ambiguity, cycles, and page-cap exhaustion", async () => {
  const pageUrl = SOURCE_DEFINITIONS.HackerOne.directoryUrl;
  const ambiguous = document(
    `<a rel="next" href="?page=2">Next</a><a aria-label="Next" href="?page=3">More</a>`,
  );
  assert.throws(() => findNextPage(ambiguous, pageUrl), (error) => error.code === "pagination_next_ambiguous");

  const cyclingParser = () => ({
    records: [{ id: "hackerone:alpha", name: "Alpha", url: "https://hackerone.com/alpha" }],
    rawCount: 1,
    directoryItems: 1,
    nextUrl: pageUrl,
  });
  await assert.rejects(
    crawlPaginatedInventory({
      definition: SOURCE_DEFINITIONS.HackerOne,
      parser: cyclingParser,
      fetchPage: async () => document("ok"),
    }),
    (error) => error.code === "pagination_cycle",
  );
  await assert.rejects(
    crawlPaginatedInventory({
      definition: SOURCE_DEFINITIONS.HackerOne,
      parser: () => ({ ...cyclingParser(), nextUrl: `${pageUrl}?page=2` }),
      fetchPage: async () => document("ok"),
      maxPages: 1,
    }),
    (error) => error.code === "pagination_page_cap",
  );
});

test("robots rules use the named agent, wildcard matching, and Allow tie precedence", () => {
  const text = `
User-agent: *
Disallow: /

User-agent: OpenBugBountiesIndex
Disallow: /private*
Allow: /private/public$
Crawl-delay: 2
`;
  assert.deepEqual(robotsDecision(text, "/private/public"), {
    allowed: true,
    crawlDelaySeconds: 2,
    matched: { kind: "allow", pattern: "/private/public$" },
  });
  assert.equal(robotsDecision(text, "/private/other").allowed, false);
  assert.equal(robotsDecision(text, "/public").allowed, true);
  assert.equal(
    robotsDecision("User-agent: *\nDisallow: /a*b*c$", "/axbyc").allowed,
    false,
  );
  assert.throws(
    () =>
      robotsDecision(
        `User-agent: *\nDisallow: /${"*a".repeat(65)}`,
        "/aaaaaaaa",
      ),
    (error) => error.code === "robots_invalid",
  );
});

test("network boundary rejects schemes, credentials, IP literals, and private resolutions", () => {
  assert.equal(validateNetworkUrl("https://example.com/security").hostname, "example.com");
  for (const value of [
    "http://example.com/security",
    "https://user:secret@example.com/security",
    "https://127.0.0.1/security",
    "https://[::1]/security",
    "https://example.com:444/security",
  ]) {
    assert.throws(() => validateNetworkUrl(value), RefreshError);
  }
  for (const address of [
    "127.0.0.1",
    "10.0.0.1",
    "169.254.169.254",
    "::1",
    "fc00::1",
    "2001:2::1",
    "2001:db8::1",
    "2002:7f00:1::",
    "3fff::1",
  ]) {
    assert.equal(isPublicAddress(address), false, address);
  }
  assert.equal(isPublicAddress("1.1.1.1"), true);
  assert.equal(isPublicAddress("2001:4860:4860::8888"), true);
  assert.equal(isPublicAddress("2606:4700:4700::1111"), true);
});

test("first-party eligibility is explicit and never inferred from reachability", () => {
  const eligible = {
    status: "active",
    confidence: "high",
    participation: "public",
    paid_status: "cash",
  };
  assert.equal(independentEligibilityReason(eligible), null);
  assert.equal(
    independentEligibilityReason({ ...eligible, participation: "public_needs_confirmation" }),
    "participation_needs_confirmation",
  );
  assert.equal(independentEligibilityReason({ ...eligible, paid_status: "unpaid" }), "paid_reward_not_explicit");
});

test("generation verifier rejects mixed, substituted, and unbound evidence", () => {
  const { input, serialized } = generationFixture();
  assert.equal(verifyGeneration(input, serialized), true);
  assert.throws(
    () =>
      verifyGeneration(
        { ...input, web3: { ...input.web3, refresh_run_id: "refresh-20260829T120000001Z" } },
        serialized,
      ),
    (error) => error.code === "generation_id_mismatch",
  );
  const substitutedSources = input.evidence.sources.map((source) => ({ ...source }));
  substitutedSources[0].source_id = "shadow-source";
  assert.throws(
    () =>
      verifyGeneration(
        { ...input, evidence: { ...input.evidence, sources: substitutedSources } },
        serialized,
      ),
    (error) => error.code === "source_coverage_mismatch",
  );
  assert.throws(
    () =>
      verifyGeneration(
        {
          ...input,
          evidence: {
            ...input.evidence,
            datasets: [
              input.evidence.datasets[0],
              input.evidence.datasets[0],
              input.evidence.datasets[2],
            ],
          },
        },
        serialized,
      ),
    (error) => error.code === "dataset_coverage_mismatch",
  );
  const missingDigest = { ...input.evidence };
  delete missingDigest.evidence_id;
  assert.throws(
    () => verifyGeneration({ ...input, evidence: missingDigest }, serialized),
    (error) => error.code === "evidence_hash_mismatch",
  );
});

test("pagination rejects unproved terminals and query-order cycles", async () => {
  const pageUrl = SOURCE_DEFINITIONS.HackerOne.directoryUrl;
  assert.throws(
    () => findNextPage(document(`<nav class="pagination"><a href="?page=2">2</a></nav>`), pageUrl),
    (error) => error.code === "pagination_terminal_unproved",
  );

  let page = 0;
  await assert.rejects(
    crawlPaginatedInventory({
      definition: SOURCE_DEFINITIONS.HackerOne,
      parser: () => ({
        records: [
          {
            id: `hackerone:page-${page}`,
            name: `Page ${page}`,
            url: `https://hackerone.com/page-${page}`,
          },
        ],
        rawCount: 1,
        directoryItems: 1,
        nextUrl:
          page++ === 0
            ? `${pageUrl}?b=2&a=1`
            : `${pageUrl}?a=1&b=2`,
      }),
      fetchPage: async () => document("fixture"),
    }),
    (error) => error.code === "pagination_cycle",
  );
});

test("pagination retains failure instead of promoting an incomplete second page", async () => {
  const first = document(
    `${hackerOneCard({ index: 1, handle: "alpha", name: "Alpha" })}
     <a rel="next" href="?page=2">Next</a>`,
  );
  await assert.rejects(
    crawlPaginatedInventory({
      definition: SOURCE_DEFINITIONS.HackerOne,
      parser: parseHackerOnePage,
      fetchPage: async (_url, index) => {
        if (index === 1) throw new RefreshError("fixture_page_failure");
        return first;
      },
    }),
    (error) => error.code === "fixture_page_failure",
  );
});

test("pagination never follows a discovered URL outside the configured origin", async () => {
  const hostile = document(
    `${hackerOneCard({ index: 1, handle: "alpha", name: "Alpha" })}
     <a rel="next" href="https://example.test/page-2">Next</a>`,
  );
  await assert.rejects(
    crawlPaginatedInventory({
      definition: SOURCE_DEFINITIONS.HackerOne,
      parser: parseHackerOnePage,
      fetchPage: async () => hostile,
    }),
    (error) => error.code === "directory_origin_not_allowed",
  );
});
