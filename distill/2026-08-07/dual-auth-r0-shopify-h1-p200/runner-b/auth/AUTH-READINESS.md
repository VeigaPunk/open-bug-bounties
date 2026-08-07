# AUTH-READINESS — Runner B (Q-FP + Q-H1)

**Generated:** 2026-08-07 · **Secrets in this file:** none (op:// labels only)  
**Sekhmet:** sp-rb06-auth-map (spark) status=ok

## Vault items (1Password Personal — titles only)

| Title | Purpose | op:// field refs (do not expand into distill) |
|---|---|---|
| HackerOne | H1 session / Shopify submit | `op://Personal/HackerOne/username` · `op://Personal/HackerOne/user[password]` |
| Intigriti | Dropbox join / Inti session | `op://Personal/Intigriti/Input.Username` · `op://Personal/Intigriti/Input.Password` |
| TinyFish API | Public recon search/fetch | `op://Personal/TinyFish API/credential` |

Runtime: `op run --env-file` / desktop integrate / `op read` under `op run` only — never paste values into chat or bounty-distill.

## Platform matrix (from ACCOUNTS.md)

| Portal | Status | Lane use |
|---|---|---|
| HackerOne | **authed** | Shopify H1; GitLab stub only |
| Intigriti | **authed** | Dropbox deep |
| Google Bug Hunters | **authed**/ready | VRP submit |
| Microsoft MSRC | **needs_profile_on_submit** | Create profile on first report |
| Proton | **needs_report_channel** | security@proton.me (+PGP) |
| Shopify | **authed via H1** | partners bugbounty store |

## Re-auth path

1. Browser profile (pre-authed preferred).  
2. 1Password desktop **Integrate with CLI** unlock.  
3. Fill login via op / browser extension — no cookie dumps to markdown.  
4. CDP path: the-janitor cdp-bridge if needed — never scrape secrets into files.

## Blockers

- MSRC researcher profile not pre-created (allowed at submit).  
- Proton no platform join — email channel only.  
- Shopify H1 full asset table needs logged-in export (PARTIAL fidelity).  
- GitLab stub by XOR policy.  
- Spark model usage_limit observed → automatic fallback to luna (pool root still dual).
