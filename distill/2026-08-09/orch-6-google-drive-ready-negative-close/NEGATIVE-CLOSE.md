# NEGATIVE-CLOSE pack — Google Drive T1–T5

**UTC:** 2026-08-09T01:36:16Z  
**Author:** orch-6  
**State:** **BLOCKED(human) / MAPPED-PARTIAL** — dual A/B sessions not available  
**COMPLETE:** **NO** (COMPLETE-GATE: negative-close is not COMPLETE money path)

## Why negative-close (not COMPLETE)

| Gate | Status |
|------|--------|
| Two research Google sessions | **FAIL** — human door closed |
| FIRST-5 live results with own docs | **FAIL** — not executed |
| GATE-PASS block | **not written** |

Per `tracker/COMPLETE-GATE.md` H3: negative-close pack allowed as honesty artifact; **does not** flip COMPLETE or fire hydra-refill.

## Expected "secure" outcomes (when A/B eventually runs)

| Test | Secure result | Fail signal (finding candidate) |
|------|---------------|-----------------------------------|
| T1 private direct object | B deny / request-access; no body content | B reads content or IT1 metadata leak |
| T2 share-then-revoke | Access gone after revoke (+ short delay recheck) | Residual content/export/revision |
| T3 link downgrade/stale | Stale link dies after Restricted | Old link still yields content |
| T4 viewer self-elevate | B cannot promote/reshare/widen ACL | B mutates ACL without A |
| T5 folder/file ACL | Effective ACL consistent parent/child/sibling | Scope bleed |

## Execution log (this pulse)

| Test | Result | Evidence |
|------|--------|----------|
| T1 | **not_run** — A/B blocked | — |
| T2 | **not_run** — A/B blocked | — |
| T3 | **not_run** — A/B blocked | — |
| T4 | **not_run** — A/B blocked | — |
| T5 | **not_run** — A/B blocked | — |

## Map fidelity (already shipped)

- PRODUCT-PICK · AUTH-SURFACE · SCOPE-NOTES · FIRST-5-TESTS · REPORT skeleton · L3 packs  
- Passive HTTP re-stamp orch-6: Drive/Docs/Bughunters **200**

## Operator one-liner

When dual Google ready: open RECOVERY-FIRST-3 → fill `evidence/FIRST-5-RESULTS.md` → only then consider GATE-PASS.

**evidence:** A-B-READINESS.md · this file · PASSIVE-HTTP-orch6 · COMPLETE-GATE H3
