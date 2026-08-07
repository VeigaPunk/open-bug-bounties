# Atlassian product + BC engagement auth doors — passive (Runner A)

**UTC:** 2026-08-07T14:51:41Z  
**Policy recon only** — no site create, no login, no exploit. Bounty SSoT = BC atlassian engagement.

## Live status this tick

| URL | Code | Role |
|-----|------|------|
| https://bugcrowd.com/engagements/atlassian | 200 | **Bounty SSoT** |
| https://www.atlassian.com | 200 | Marketing home |
| https://www.atlassian.com/trust/security/bug-bounty | **404** | Stale public BB path (prior claim) |
| https://www.atlassian.com/software/jira | 200 | Jira product |
| https://id.atlassian.com | **202** | Identity shell |
| https://id.atlassian.com/login | **202** | Login shell |
| https://auth.atlassian.com | **202** | Auth host |
| https://admin.atlassian.com | 200 | Admin hub shell |
| https://start.atlassian.com | 200 | Start/switcher shell |
| https://developer.atlassian.com | 200 | Developer docs |
| https://developer.atlassian.com/console | 200 | Dev console shell |
| https://api.atlassian.com | 200 | API gateway shell |
| https://status.atlassian.com | 200 | Status |
| https://support.atlassian.com | 200 | Support |
| https://confluence.atlassian.com | 200 | Confluence marketing |
| https://bitbucket.org | 200 | Bitbucket |
| https://bitbucket.org/account/signin | **202** | BB sign-in shell |
| https://trello.com | 200 | Trello |
| https://trello.com/login | **202** | Trello login shell |

## Auth-ready implications

1. Do **not** use trust/security/bug-bounty (404) — use **BC engagements/atlassian**.
2. Identity/login hosts return **202** unauth (browser OAuth expected) — same class as prior OPENAI-ATLASSIAN-PASSIVE.
3. Test sites: create only **bugbounty-test-*** style per program rules (human); no customer-tenant targeting.
4. Developer console / api.atlassian.com shells are **200** but not a join substitute for BC.

## Related

- `OPENAI-ATLASSIAN-PASSIVE.md`, `Q-BC-JOIN-READINESS.md`, `INTI-SHOPIFY-AUTH-DOORS.md` (Atlassian 202 note)

## Axes

- auth_ready_a↑ (Atlassian door map)
- evidence_fidelity↑ (202 logins, 404 trust path)
- safety_in_policy↑
