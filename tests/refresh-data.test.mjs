import assert from "node:assert/strict";
import test from "node:test";

import {
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
});

test("network boundary rejects schemes, credentials, IP literals, and private resolutions", () => {
  assert.equal(validateNetworkUrl("https://example.com/security").hostname, "example.com");
  for (const value of [
    "http://example.com/security",
    "https://user:secret@example.com/security",
    "https://127.0.0.1/security",
    "https://[::1]/security",
  ]) {
    assert.throws(() => validateNetworkUrl(value), RefreshError);
  }
  for (const address of ["127.0.0.1", "10.0.0.1", "169.254.169.254", "::1", "fc00::1", "2001:db8::1"]) {
    assert.equal(isPublicAddress(address), false, address);
  }
  assert.equal(isPublicAddress("1.1.1.1"), true);
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

test("generation verifier rejects mixed runs and incomplete source coverage", () => {
  const sources = Array.from({ length: 9 }, (_, index) => ({ source_id: `source-${index}` }));
  const valid = {
    independent: { refresh_run_id: "run-1" },
    platform: { refresh_run_id: "run-1" },
    web3: { refresh_run_id: "run-1" },
    evidence: { run_id: "run-1", sources, datasets: [] },
  };
  assert.equal(verifyGeneration(valid), true);
  assert.throws(
    () => verifyGeneration({ ...valid, web3: { refresh_run_id: "run-2" } }),
    (error) => error.code === "generation_id_mismatch",
  );
  assert.throws(
    () => verifyGeneration({ ...valid, evidence: { ...valid.evidence, sources: sources.slice(1) } }),
    (error) => error.code === "source_coverage_mismatch",
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
