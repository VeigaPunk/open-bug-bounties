import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("exports a public, standalone Pages site", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  assert.match(html, /The Bounty Index/);
  assert.match(html, /source-linked public listings/);
  assert.match(html, /INDEX HEALTH/);
  assert.match(html, /PARTIAL/);
  assert.match(html, /permission-limited/);
  assert.match(html, /EVIDENCE(?:\s|<!--.*?-->)+[a-f0-9]{12}/);
  assert.equal((html.match(/class=\"source-card\"/g) ?? []).length, 9);
  assert.doesNotMatch(html, /verified public listings|>HEALTHY</);
  assert.doesNotMatch(html, /signin-with-chatgpt|oai-authenticated-user/i);
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
  assert.equal(evidence.status, "partial");
  assert.equal(evidence.sources.length, 9);
  assert.equal(new Set(evidence.sources.map((source) => source.source_id)).size, 9);
  assert.equal(
    evidence.sources.filter(
      (source) => source.status === "policy_limited_snapshot_retained",
    ).length,
    6,
  );
  const sourceById = new Map(evidence.sources.map((source) => [source.source_id, source]));
  assert.equal(sourceById.get("hackerone").complete, true);
  assert.equal(sourceById.get("sherlock").complete, true);
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
