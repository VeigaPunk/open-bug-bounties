# Next-action packs (sekhmet + godspeed)
Generated with godspeed inject on every dispatch.

## VeigaPunk/opendbc-branch-coverage#1 — [STAFF] Open PR for commaai/opendbc#2557 from VeigaPunk:branch-coverage-2557
- family: `comma.ai` · status: staff-blocked / package ready
- issue: https://github.com/VeigaPunk/opendbc-branch-coverage/issues/1

```
1) Axes  
- PR visibility/mergeability  
- Branch-coverage evidence (3,691 tests; 100%)  
- Staff-permission unblock  
- Reproducible verification  

2) Next concrete action in 48h  
Staff opens `commaai/opendbc` PR from `VeigaPunk:branch-coverage-2557` using the supplied compare URL, linking/closes issue #1 and attaching the coverage artifact.

3) Blocker  
VeigaPunk cannot create PRs in the `commaai` organization.

4) Gate command  
`git diff --check master...VeigaPunk/branch-coverage-2557 && cargo test --workspace`
```

## VeigaPunk/op-fuzz-tx#2 — Staff apply: TX fuzzy for openpilot #32425
- family: `comma.ai` · status: staff-blocked / package ready
- issue: https://github.com/VeigaPunk/op-fuzz-tx/issues/2

```
1) Axes: fuzz coverage; TX correctness; reproducibility; integration risk; CI/runtime cost.

2) Next action (48h): comma staff cherry-picks the README-referenced patch, runs the TX fuzz smoke/regression suite, and posts seed, corpus, crash, and runtime results on issue #2.

3) Blocker: staff review/cherry-pick authority; no merge until openpilot CI confirms no TX regressions.

4) Gate command: `cargo test --workspace --all-targets`
```

## VeigaPunk/op-fuzz-tx#1 — Staff: cherry-pick TX fuzzy patch for commaai/openpilot#32425
- family: `comma.ai` · status: staff-blocked / package ready
- issue: https://github.com/VeigaPunk/op-fuzz-tx/issues/1

```
1) Axes: access, patch integrity, integration, CI, auditability.

2) Next action in 48h: an authorized `commaai` maintainer fetches the ready VeigaPunk patch, verifies its commit hash, cherry-picks it onto `openpilot`, and opens/updates PR #32425.

3) Blocker: VeigaPunk is organization-blocked from creating PRs or comments in `commaai/*`; staff intervention is required.

4) Gate command:
```sh
git apply --check op-fuzz-tx.patch && git diff --check
```
```

## VeigaPunk/openpilot-wifi-no-nm#1 — [for maintainers] #37752 no-NM patch + CI fix for #38330
- family: `comma.ai` · status: staff-blocked / package ready
- issue: https://github.com/VeigaPunk/openpilot-wifi-no-nm/issues/1

```
1. Axes  
   - No-NetworkManager functional correctness  
   - CI/unit-test reliability  
   - Upstream mergeability  
   - Maintainer response/readiness  

2. Next concrete action in 48h  
   Rebase PR #38330, reproduce and fix its failing unit tests, publish green CI logs, then request review from `@andiradulescu` and `@adeebshihadeh`.

3. Blocker  
   Staff-blocked: upstream maintainer approval is pending, and the draft currently has failing unit tests.

4. Gate command  
   `cargo test --workspace --all-targets --no-fail-fast`
```

## VeigaPunk/horizon-halo-comma-design#1 — Staff handoff: comma four revision + website PR#335
- family: `comma.ai` · status: staff-blocked / package ready
- issue: https://github.com/VeigaPunk/horizon-halo-comma-design/issues/1

```
1) Axes  
- Staff-merge readiness (PR #335)  
- Comma Four hardware prominence  
- Visual/design fidelity after Qt removal  
- Website integration risk  
- Handoff evidence and reproducibility  

2) Next concrete action (within 48h)  
Recheck PR #335, confirm staff merge status, then capture the merged diff and verify commit `5c9184b` is represented in production-facing website content.

3) Blocker  
Only comma staff merging `https://github.com/commaai/website/pull/335`.

4) Gate command  

```bash
gh pr view 335 --repo commaai/website --json state,mergedAt,mergeCommit --jq 'select(.state=="MERGED")'
```
```

## VeigaPunk/harness-tester-bugs-veigapunk#1 — Staff grade request: comma harness LB still 24
- family: `comma.ai` · status: staff-blocked / package ready
- issue: https://github.com/VeigaPunk/harness-tester-bugs-veigapunk/issues/1

```
1. Axes: staff-readiness, package completeness, PR/preview health, live leaderboard visibility, blocker clearance.
2. Next concrete action within 48h: ask comma.ai staff to review/merge PR #334, verify preview #1, then confirm the live challenge entry at `/leaderboard#harness_tester_challenge`.
3. Blocker: comma.ai remains staff-blocked; leaderboard status is still LB 24.
4. Gate command:
```rust
std::process::Command::new("curl")
    .args(["-fsSL", "https://comma.ai/leaderboard#harness_tester_challenge"])
    .status()
    .expect("leaderboard gate failed");
```
```

## VeigaPunk/comma-controls-challenge#1 — Awaiting comma LB publish @ 6.880
- family: `comma.ai` · status: staff-blocked / package ready
- issue: https://github.com/VeigaPunk/comma-controls-challenge/issues/1

```
1) Axes  
- Leaderboard score: 6.880472 (floor)  
- Publication status: comma LB pending  
- Maintainer response/unblock  
- Evidence freshness: issue, form, emails, PR#333  

2) Next concrete action in 48h  
Send one concise follow-up to work@comma.ai and maintainers citing issue #1, form completion, and closed PR#333; poll https://comma.ai/leaderboard and log any change.

3) Blocker  
Staff-blocked: awaiting comma.ai leaderboard publication.

4) Gate command  
`cargo test --all --locked`
```

## VeigaPunk/op-metadrive-macos-33207#1 — Ready for cherry-pick: MetaDrive macOS #33207
- family: `comma.ai` · status: staff-blocked / package ready
- issue: https://github.com/VeigaPunk/op-metadrive-macos-33207/issues/1

```
1) Axes  
- Package readiness: ready for cherry-pick  
- Upstream integration: commaai/openpilot issue #33207  
- Access: staff-only merge path  
- Time: 48-hour execution window  

2) Next concrete action in 48h  
- Have comma.ai staff cherry-pick the prepared MetaDrive macOS package and link the resulting commit to issue #33207.

3) Blocker  
- VeigaPunk cannot open PRs or comment on `commaai/*`; staff intervention is required.

4) Gate command  
```bash
git cherry-pick <prepared-metadrive-macos-33207-commit>
```
```

## VeigaPunk/flash-bounty-128-package#1 — Bounty #128 staff handoff: blocked on commaai, ready for cherry-pick
- family: `comma.ai` · status: staff-blocked / package ready
- issue: https://github.com/VeigaPunk/flash-bounty-128-package/issues/1

```
Axes:
- Reproducibility: package builds/tests cleanly.
- Evidence: walkthrough and artifacts are publicly reviewable.
- Access: ability to fork, comment, or open a PR in `commaai/*`.
- Handoff: staff can cherry-pick without further author action.
- Time: concrete progress within 48 hours.

Next concrete action (within 48h):
- Publish/verify the package commit, walkthrough, and checksum.
- Send the staff handoff with the exact commit and cherry-pick instructions.
- Recheck `commaai/flash#128` access once; otherwise leave the package ready.

Blocker:
- GitHub returns `Blocked` for every interaction with `commaai/*` (fork, comments, PR creation). This is an external permission/policy block.

Gate command:

```bash
cargo test --all --locked
```

Status: staff-blocked; package ready for cherry-pick.
```

## huggingface/agents-course#715 — Students_leaderboard: earliest-timestamp freeze among 615×100 scores
- family: `research-eval` · status: upstream open
- issue: https://github.com/huggingface/agents-course/issues/715

```
1) Axes  
- Correctness: score DESC, timestamp ASC; earliest timestamp wins ties.  
- Completeness: exactly 615 entries; validate all 100-score groups.  
- Reproducibility: immutable snapshot, retrieval time, SHA-256.  
- Compatibility: preserve upstream API/schema and ranking semantics.  
- Timeliness: freeze and publish within 48h.

2) Next concrete action in 48h  
Capture the live API response, archive its SHA-256, normalize timestamps to UTC, run the deterministic sort, and publish the frozen 615-entry artifact plus validation report.

3) Blocker  
No authoritative immutable snapshot/schema is identified; the live Space API may change while the freeze is being computed.

4) Gate command  

```bash
cargo test --locked --all-targets -- leaderboard_freeze
```
```

## qanta-org/qb-tournament-runner#1 — Late eval: submission Space RUNTIME_ERROR + advcal-requests 404 (VeigaPunk)
- family: `research-eval` · status: upstream open
- issue: https://github.com/qanta-org/qb-tournament-runner/issues/1

```
1. Axes  
   - Runtime reliability (HF Space exits `RUNTIME_ERROR`)  
   - API compatibility (`advcal-requests` returns 404)  
   - User impact (external submissions blocked)  
   - Recovery speed/observability (clear health checks and logs)

2. Next concrete action (within 48h)  
   Reproduce both failures, capture Space logs/request traces, then publish a minimal fix or temporary submission fallback; add a smoke test covering submission startup and `advcal-requests`, and cross-link findings to QANTA25#1.

3. Blocker  
   The Hugging Face Space and `advcal-requests` endpoint are upstream-controlled and currently unavailable to external users; maintainer access or an approved fallback is required.

4. Gate command  
   `cargo test --workspace --all-targets`
```

## qanta-org/QANTA25#1 — Late eval request: VeigaPunk/qanta-tossup-v1 (submission Space RUNTIME_ERROR)
- family: `research-eval` · status: upstream open
- issue: https://github.com/qanta-org/QANTA25/issues/1

```
Axes:
1. Runtime reliability (eliminate `RUNTIME_ERROR`).
2. Answer quality (public-split accuracy, calibrated confidence).
3. Reproducibility (pinned HF revision, deterministic config/logs).
4. Evaluation integrity (post-deadline, public-only, no prize eligibility).

Next concrete action (48h): rerun the public leaderboard harness against `VeigaPunk/qanta-tossup-v1` at a pinned commit; first execute 10-example smoke test, then full public evaluation; attach logs, revision, config, and metrics to QANTA25#1.

Blocker: the prior submission’s runtime failure is unresolved; custom `quizbowl-tossup` code/output-schema compatibility must be verified before accepting metrics.

Gate command:

```text
cargo run --locked --release --bin qanta-gate -- --model VeigaPunk/qanta-tossup-v1 --revision <PINNED_SHA> --split public --smoke 10 --full --require-jsonl-schema
```
```

## anthropics/claude-code#77902 — My Claude developed Arachnophobia. help. I tell him to check my spoderman repo, it insta blocks the chat.
- family: `oss-tooling` · status: open
- issue: https://github.com/anthropics/claude-code/issues/77902

```
1) Axes  
- Reproducibility: exact prompt, tmux/Linux, version 2.1.179  
- False-positive rate: “spiderman/spooder” benign variants vs genuine spider-harm requests  
- User impact: chat hard-block vs warning/continuation  
- Safety/regression: preserve legitimate arachnophobia safeguards  
- Observability: moderation reason/code and Feedback ID `976a0c5d-30c2-4930-8846-e891ec14fdce`

2) Next concrete action in 48h  
Run a minimal prompt matrix (`spoderman`, `spider-man`, repo URL, neutral repo names), capture block reason and logs, then attach results to #77902 and add a regression test for benign repository references.

3) Blocker  
No access to Claude’s moderation decision payload/model policy or the referenced repository, so root-cause attribution is currently impossible.

4) Gate command  
`cargo test --all --locked -- arachnophobia_spiderman`
```

## oven-sh/bun#29488 — bun.report crash: panic(main thread) Segmentation fault at address 0x431D45D0 on Bun v1.3.13
- family: `oss-tooling` · status: open
- issue: https://github.com/oven-sh/bun/issues/29488

```
1) Axes  
- Reproducibility: deterministic minimal trigger  
- Diagnosis: native stack/core dump and regression range  
- Mitigation: safe workaround or fixed Bun build  
- Upstream readiness: complete report with environment and repro  

2) Next concrete action in 48h  
Re-run the smallest available repro on Bun 1.3.13 and latest nightly; attach the complete `bun.report`, command, OS/CPU, and a native backtrace. If reproducible, bisect to the first failing build and update issue #29488.

3) Blocker  
The supplied report has no reproducer, stack trace, environment, or accessible report contents, so ownership and regression scope are unknown.

4) Gate command  
```sh
bun --version && bun run repro.ts
```
```

## VeigaPunk/aaronplug#1 — TODO: swap to simplified version and integrate it to claude
- family: `oss-tooling` · status: open
- issue: https://github.com/VeigaPunk/aaronplug/issues/1

```
1) Axes  
- Headless parity: behavior matches `/home/vhpnk/ClaudeCode/epublicdom`.  
- Claude surface: stable command/API wiring and protocol compatibility.  
- Build hygiene: TUI/dead dependencies removed.  
- Verification: deterministic tests and CI gate.

2) Next concrete action in 48h  
Port the sandbox’s headless entrypoint into the repository, delete TUI modules/dependencies, add the Claude adapter, and add an end-to-end headless invocation test.

3) Blocker  
The reference sandbox and Claude integration contract are external to this checkout; access/API details must be available to validate parity.

4) Gate command  
```rust
cargo test --workspace --all-features
```
```

## VeigaPunk/inv-hxh-v2#5 — Hunt The Accountant — evidence collection for accountability
- family: `internal-ops` · status: active internal
- issue: https://github.com/VeigaPunk/inv-hxh-v2/issues/5

```
Axes:
1. Data integrity
2. Cross-source identity
3. Period/coverage completeness
4. Auditability and independence

Next concrete action (within 48h):
- Recompute all 140 points across the five periods from source PDFs.
- Preserve hashes, extraction output, and a signed reconciliation table.
- Obtain one independent export/source for external corroboration.

Blocker:
- Current proof is entirely in-house; independent corroboration and reproducible extraction artifacts are not yet evidenced.

Gate command:
`cargo test --workspace --all-targets --locked`
```

## VeigaPunk/inv-hxh-v2#4 — Visual dashboard — diff viewer and reconciliation report UI
- family: `internal-ops` · status: active internal
- issue: https://github.com/VeigaPunk/inv-hxh-v2/issues/4

```
Axes:
- Reconciliation correctness: matched/added/removed/changed/unresolved counts.
- Review efficiency: filters, search, “next unresolved,” bulk triage.
- Explainability: provenance, matching key, normalization rationale, timestamps.
- Safety/accessibility: reversible decisions, audit reasons, keyboard/contrast support.

Next action (within 48h): implement summary counts, filterable side-by-side source/account diff, and accept/merge/ignore actions with undo and audit reason.

Blocker: execution host is disabled, so `diff-viewer.html` and repository tests could not be inspected or changed.

Gate command: `cargo test --all`
```

## VeigaPunk/inv-hxh-v2#3 — CFOP adjustment logic — reconcile Omie exits vs control system
- family: `internal-ops` · status: active internal
- issue: https://github.com/VeigaPunk/inv-hxh-v2/issues/3

```
1. Axes: reconciliation error; period completeness; CFOP 5.405 semantic fidelity; duplicate/cancellation handling; auditability; processing latency.

2. Next concrete action (48h): build a Rust reconciliation fixture from the five periods, joining Omie exits to control rows by document/item, normalizing dates/units, and reporting deltas by period, branch, SKU, and document status. Quantify whether the 23,900-unit gap is timing, duplication, returns, or classification before changing logic.

3. Keep the adjustment only if it reduces every period’s absolute delta without increasing unmatched or duplicate rows; preserve raw Omie identifiers and an explainable adjustment reason.

4. Blocker: no agreed canonical extract/schema and no authoritative mapping for cancellations, returns, transfers, and unit conversions; without these, either proposed approach can merely relocate the gap.

5. Gate command:

```bash
cargo test --workspace --all-features reconciliation
```
```

## VeigaPunk/inv-hxh-v2#2 — Omie API integration — replace web GUI exports with direct API calls
- family: `internal-ops` · status: active internal
- issue: https://github.com/VeigaPunk/inv-hxh-v2/issues/2

```
Axes: API fidelity, data coverage, reliability, security, and migration latency.

Next 48h: implement a typed Rust Omie client with authenticated JSON-RPC calls, pagination, retries, and fixtures; ingest per-movement `devolucao`/`cancelamento` plus `dDataPosicao`; run parity diffs against current Playwright exports.

Blocker: Omie credentials/scopes and confirmed method/schema for movement history and date-specific stock positions.

Gate command:

```rust
std::process::Command::new("cargo")
    .args(["test", "--all", "--locked"])
    .status()
    .expect("gate failed")
    .success()
    .then_some(())
    .expect("tests failed");
```
```
