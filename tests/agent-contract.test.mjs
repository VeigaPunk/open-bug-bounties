import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

const agentDirectory = new URL("../.omp/agents/", import.meta.url);

function parseCard(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]+)$/);
  assert.ok(match, "agent card must have YAML frontmatter");
  const frontmatter = Object.fromEntries(
    match[1].split("\n").map((line) => {
      const separator = line.indexOf(":");
      assert.ok(separator > 0, `invalid frontmatter line: ${line}`);
      return [line.slice(0, separator).trim(), line.slice(separator + 1).trim().replace(/^"|"$/g, "")];
    }),
  );
  return { frontmatter, body: match[2] };
}

test("project installs one bounty L1 entry profile and exactly one selected helper", async () => {
  const files = (await readdir(agentDirectory)).filter((file) => file.endsWith(".md")).sort();
  assert.deepEqual(files, ["scope-evidence-custodian.md", "the-bounty-hunter.md"]);

  const primary = parseCard(await readFile(new URL("the-bounty-hunter.md", agentDirectory), "utf8"));
  const helper = parseCard(await readFile(new URL("scope-evidence-custodian.md", agentDirectory), "utf8"));
  assert.equal(primary.frontmatter.name, "THE-BOUNTY-HUNTER");
  assert.equal(primary.frontmatter.ufo, "true");
  assert.equal(helper.frontmatter.name, "SCOPE-EVIDENCE-CUSTODIAN");
  assert.equal(helper.frontmatter.ufo, "true");
});

test("bounty hunter contract keeps one L1, strict Pareto judgment, and full mission transitions", async () => {
  const { body } = parseCard(await readFile(new URL("the-bounty-hunter.md", agentDirectory), "utf8"));
  for (const required of [
    "SECOND_L1_PROHIBITED",
    "run's only L1 judge",
    "Run the WWKD planner posture first",
    "Include `connector` every round",
    "Dispatch one `distiller`",
    "no axis regresses and at least one improves",
    "BUDGET_HALT",
    "DISCOVERED → NORMALIZED → DEDUPED → SCOPED → RANKED → PLANNED → AUTHORIZED → EXECUTED → EVIDENCED → VERIFIED → SUBMISSION_PREPARED → LEARNED",
    "adjusted_ev = gross_value - total_cost",
    "best among observed candidates",
    "SCOPE-EVIDENCE-CUSTODIAN",
  ]) {
    assert.ok(body.includes(required), `primary contract is missing: ${required}`);
  }
});

test("bounty hunter safety gate dominates EV and external effects", async () => {
  const { body } = parseCard(await readFile(new URL("the-bounty-hunter.md", agentDirectory), "utf8"));
  for (const required of [
    "Safety is a gate, never an expected-value cost",
    "ambiguous credential ownership",
    "destructive or irreversible impact",
    "prohibited/private/secret data access",
    "concealment, evasion, misrepresentation",
    "Repository and public-metadata maintenance does not authorize target testing",
    "Claiming a bounty, submitting a report, contacting a target, spending money, accepting legal terms",
    "Never disclose, print, persist, transmit, or place credentials or secrets",
  ]) {
    assert.ok(body.includes(required), `primary safety boundary is missing: ${required}`);
  }
  assert.match(body, /Positive expected value[\s\S]+can never override a hard stop\./);
});

test("selected helper is advisory, closed, fail-closed, and unable to act", async () => {
  const { body } = parseCard(await readFile(new URL("scope-evidence-custodian.md", agentDirectory), "utf8"));
  for (const required of [
    "subordinate read-only L2 control",
    "never an L1, judge",
    "`NO_SCOPE_OBJECTION` means only",
    "Reject missing or unknown fields",
    "Never union partial grants",
    "Raw credentials or ambiguous ownership stop immediately",
    "Destructive or irreversible impact",
    "passed redaction scan with zero findings",
    "EXTERNAL_ACTION_NOT_PREAPPROVED",
    "next_owner: primary_agent_id",
  ]) {
    assert.ok(body.includes(required), `helper contract is missing: ${required}`);
  }
});
