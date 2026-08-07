# GATES — dual-auth-runners

**Race status:** DONE  
**Workflow:** dual-bounty-auth-2 finished  
**UTC closeout:** 2026-08-07  
**Winner:** A (Q-BC) · ship_ok · substrate_ok · sanitize_ok  

| Gate | Status | Evidence |
|------|--------|----------|
| tmp headroom | PASS | /tmp ~1–2% after sanitize |
| sekhmet luna dry-run | PASS | model gpt-5.6-luna @ xbrd-spark-luna |
| sekhmet spark dry-run | PASS | model gpt-5.3-codex-spark @ xbrd-spark-spark (post wrapper fix) |
| sekhmet luna live | PASS | sp-fe0afdb8… ok |
| sekhmet spark live | DEGRADED | usage_limit on spark model → fallback luna; roots still isolated |
| vault inventory titles | PASS | shared/VAULT-INVENTORY.md |
| secret leakage scan | PASS | only scrub docs mention password= patterns |
| Okta Set5 URL map | PASS | AUTHENTICATED hint non-durable |
| dual runners race | **DONE** | A+B REPORT 22:38Z; COMPARE winner A; SCRIBE+SHIP+WORKFLOW-DONE 2026-08-07 |
| workflow dual-bounty-auth | **DONE** | display dual-bounty-auth-2 · finished · see WORKFLOW-DONE.md |

## Human still required
- Durable Okta Set5 browser session + MFA
- @bugcrowdninja free tier Aiven console
- Atlassian bugbounty-test CAPTCHA
- H1 Shopify export SPA
- Auth0 Get Credentials → 1Password only
- Google dual own accounts (A/B) for F1 path

## History (unchanged lineage)
- Race launched with A REPORT ahead; B + workflow concurrent (prior stamp: IN PROGRESS).
- Substrate gates (tmp, dual sekhmet dry/live, vault, secret scan, Okta map) held PASS/DEGRADED as tabled above.
- Ship: open-bug-bounties `e46fd83` dual-auth-runners; parent HUNT-NOW/ACTION-LOG `c508f20` (SHIP.md).

## Closeout (2026-08-07 UTC)

| Artifact | Result |
|----------|--------|
| COMPARE.md | complete · A wins auth_ready break-tie · total 24–24 |
| SCRIBE.md | phase 5/6 · secret hygiene op titles only |
| WORKFLOW-DONE.md | finished · winner A · ship_ok |
| SHIP.md | APPROVED + pushed main · ok=true |
| Autonomous ops | AUTONOMOUS-READY.md (human freeze + dry re-gates + live phrase) |

**Machine-autonomous race slice:** closed.  
**Bounty COMPLETE:** still 0 — blocked on human instance/MFA/CAPTCHA freezes only.  
**Next operator phrase:** `xbgst live test Aiven`
