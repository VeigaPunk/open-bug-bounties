# Okta product + BC Okta/Auth0 engagements — passive (Runner A)

**UTC:** 2026-08-07T14:55:40Z  
**Policy recon only** — no tenant create, no customer targeting, no exploit. Bounty SSoT = BC.

## Bugcrowd engagements

| URL | Code | Role |
|-----|------|------|
| https://bugcrowd.com/engagements/okta | 200 | **Okta BB SSoT** |
| https://bugcrowd.com/engagements/auth0-okta | 200 | **Auth0+Okta SSoT** |

## Okta public product / trust

| URL | Code | Role |
|-----|------|------|
| https://www.okta.com | 200 | Marketing home |
| https://www.okta.com/security/ | 200 | Security hub |
| https://www.okta.com/bug-bounty/ | **404** | No public BB path — use BC |
| https://www.okta.com/integrations/ | 200 | Integrations catalog |
| https://okta.com/company/trust | **404** | Stale trust path |
| https://trust.okta.com | 200 | Trust/status product |
| https://status.okta.com | 200 | Status |
| https://sec.okta.com | 200 | Security portal shell |
| https://help.okta.com | 200 | Help |
| https://support.okta.com | 200 | Support |
| https://okta-support.okta.com | 200 | Support Okta org shell |
| https://login.okta.com | 200 | Generic login front |
| https://developer.okta.com | 200 | Developer docs |
| https://developer.okta.com/docs/guides | 200 | Guides |
| https://developer.okta.com/signup | 200 | Integrator signup (own sandbox only) |

## Auth-ready implications

1. **Do not** use okta.com/bug-bounty (404) — submit via **BC engagements/okta** (+ auth0-okta for Auth0).
2. Set5 org remains separate: `bugcrowd-pam-5335.oktapreview.com` (see AIVEN-OKTA-AUTH-DOORS / BC-OKTA-ADMIN).
3. Developer signup **200** for **own integrator** orgs only when program allows; never spray customer tenants.
4. `login.okta.com` is a generic shell — not a program asset by itself.
5. Durable Set5 session still needs browser MFA (prior non-durable curl claim).

## Related

- `BC-OKTA-ADMIN-PASSIVE.md`, `AIVEN-OKTA-AUTH-DOORS.md`, `AUTH0-OIDC-PASSIVE.md`, `OKTA-MAP.md`

## Axes

- auth_ready_a↑ (Okta product + BC SSoT)
- evidence_fidelity↑ (bug-bounty 404, trust path 404)
- safety_in_policy↑
