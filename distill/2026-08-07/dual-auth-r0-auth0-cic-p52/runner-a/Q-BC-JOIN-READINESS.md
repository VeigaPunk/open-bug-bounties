# Q-BC keep-8 join / auth readiness (runner-a)

Source of truth: parent distill `ENROLL.md`, `HUNT-NOW.md`, `scopes/*` (FIDELITY FULL).

| # | Program | BC URL | Enroll | Auth / next human | Notes |
|---|---|---|---|---|---|
| B1 | Aiven | https://bugcrowd.com/engagements/aiven-mbb-og | **joined** | Free tier on console.aiven.io with **@bugcrowdninja.com** only; API token `Authorization: aivenv1` | Own services only; no CC |
| B2a | Auth0 | https://bugcrowd.com/engagements/auth0-okta | **joined** | Get Credentials → 3 users / 3 tenants; env **manage.cic-bug-bounty.auth0app.com only** | ≤5 rps; prod manage.auth0.com OOS |
| B2b | Okta | https://bugcrowd.com/engagements/okta | **joined** | Get Credentials → org sets (Set5 vault item present); host **bugcrowd-pam-5335.oktapreview.com** | SPA login; MFA enforce for MFA class |
| B3 | Atlassian | https://bugcrowd.com/engagements/atlassian | **joined** | Create `bugbounty-test-<user>.atlassian.net` | Human cloud site signup |
| B4 | OpenAI | https://bugcrowd.com/engagements/openai | **joined** | Personal/ninja + TAC verified | **Security-impact only**; model/jailbreak OOS |

## Platform login
- Bugcrowd platform: **authed** (ACCOUNTS.md); vault item title **Bugcrowd** → `https://login.hackers.bugcrowd.com`
- op refs for Okta Set5 only for injection: `op://Personal/Bugcrowd Org (Set 5) Okta/{username,password}`

## HTTP door check (runner-a 2026-08-07)
See `ENGAGEMENT-HTTP.txt` — all five engagements **200**; login.bugcrowd.com → tracker sign_in **200**; Auth0 manage host redirects to CIC login (400 on final without session — expected unauth SPA).
