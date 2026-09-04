import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { parse } from "parse5";
import test from "node:test";
const sourceIds = [
  "hackerone",
  "bugcrowd",
  "intigriti",
  "yeswehack",
  "hackenproof",
  "immunefi",
  "cantina",
  "sherlock",
  "first-party",
];

function documentText(root) {
  const values = [];
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (node?.nodeName === "#text") values.push(node.value ?? "");
    const children = node?.childNodes ?? [];
    for (let index = children.length - 1; index >= 0; index -= 1) {
      stack.push(children[index]);
    }
  }
  return values.join(" ").replace(/\s+/g, " ").trim();
}

function elements(root) {
  const result = [];
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (node?.tagName) result.push(node);
    stack.push(...(node?.childNodes ?? []));
  }
  return result;
}

test("exports a public, standalone Pages site", async () => {
  const [html, evidenceContent] = await Promise.all([
    readFile(new URL("../out/index.html", import.meta.url), "utf8"),
    readFile(new URL("../data/refresh_evidence.json", import.meta.url), "utf8"),
  ]);
  const evidence = JSON.parse(evidenceContent);
  const document = parse(html);
  const text = documentText(document);
  const expectedHealth = evidence.status === "complete" ? "HEALTHY" : "PARTIAL";
  const firstParty = evidence.sources.find((source) => source.source_id === "first-party");
  assert.match(text, /The Bounty Index/);
  assert.match(text, /source-linked public listings/);
  assert.match(text, /INDEX HEALTH/);
  assert.match(text, new RegExp(`INDEX HEALTH ${expectedHealth}`));
  assert.match(text, new RegExp(`Explore ${evidence.totals.canonical_urls} programs`));
  assert.match(text, new RegExp(`First-party policies ${firstParty.count}`));
  assert.match(html, /EVIDENCE(?:\s|<!--.*?-->)+[a-f0-9]{12}/);
  assert.equal((html.match(/class=\"source-card\"/g) ?? []).length, sourceIds.length);
  assert.doesNotMatch(html, /verified public listings|signin-with-chatgpt|oai-authenticated-user/i);

  for (const element of elements(document)) {
    const href = element.attrs?.find((entry) => entry.name === "href")?.value;
    if (!href || !/^[a-z][a-z0-9+.-]*:/i.test(href)) continue;
    const url = new URL(href);
    assert.equal(url.protocol, "https:", href);
    assert.equal(url.username, "", href);
    assert.equal(url.password, "", href);
    assert.equal(url.port, "", href);
  }
});

test("exports assets below the configured Pages base path", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (basePath) assert.match(html, new RegExp(`${basePath}/_next/`));
});

test("committed refresh evidence reconciles every dataset and source", async () => {
  const evidence = JSON.parse(
    await readFile(new URL("../data/refresh_evidence.json", import.meta.url), "utf8"),
  );
  assert.deepEqual(
    evidence.sources.map((source) => source.source_id),
    sourceIds,
  );
  for (const source of evidence.sources) {
    assert.equal(Number.isInteger(source.count), true, source.source_id);
    assert.equal(Array.isArray(source.failure_codes), true, source.source_id);
    if (source.complete) {
      assert.deepEqual(source.failure_codes, [], source.source_id);
    } else {
      assert.ok(source.failure_codes.length > 0, source.source_id);
    }
    if (source.access_mode === "retained_permission_limited") {
      assert.equal(source.complete, false, source.source_id);
      assert.equal(source.status, "policy_limited_snapshot_retained", source.source_id);
    }
  }
  assert.equal(
    evidence.totals.records - evidence.totals.canonical_urls,
    evidence.totals.duplicate_urls,
  );
  assert.equal(
    evidence.totals.live_raw_candidates - evidence.totals.live_deduplicated_candidates,
    evidence.totals.live_duplicates_removed,
  );

  for (const dataset of evidence.datasets) {
    const content = await readFile(new URL(`../${dataset.path}`, import.meta.url), "utf8");
    const parsed = JSON.parse(content);
    assert.equal(parsed.refresh_run_id, evidence.run_id);
    assert.equal(createHash("sha256").update(content).digest("hex"), dataset.sha256);
    const records =
      dataset.id === "web3" ? parsed.records.length : parsed.programs.length;
    assert.equal(records, dataset.records);
  }

  const evidenceCore = { ...evidence };
  delete evidenceCore.evidence_id;
  assert.equal(
    createHash("sha256").update(JSON.stringify(evidenceCore)).digest("hex"),
    evidence.evidence_id,
  );
});
