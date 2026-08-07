# GATES — dual-auth-runners

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
| dual runners race | IN PROGRESS | A REPORT done; B + workflow running |
| workflow dual-bounty-auth | LAUNCHED | display name dual-bounty-auth |

## Human still required
- Durable Okta Set5 browser session + MFA
- @bugcrowdninja free tier Aiven console
- Atlassian bugbounty-test CAPTCHA
- H1 Shopify export SPA
