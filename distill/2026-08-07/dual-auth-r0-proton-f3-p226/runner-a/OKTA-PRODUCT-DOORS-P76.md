# Okta product + BC doors (PULSE-76)

UTC: 2026-08-07T16:52:57Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://www.okta.com` | 200 | - | marketing |
| `https://www.okta.com/bug-bounty` | 404 | - | no first-party BB |
| `https://www.okta.com/company/trust` | 404 | - | path gone |
| `https://trust.okta.com` | 200 | - | trust center |
| `https://status.okta.com` | 200 | - | status |
| `https://security.okta.com` | 200 | - | security hub |
| `https://developer.okta.com` | 200 | - | developer |
| `https://login.okta.com` | 200 | - | product login shell |
| `https://bugcrowd.com/engagements/okta` | 200 | - | **BC SSoT bare** |
| `https://bugcrowd.com/engagements/auth0-okta` | 200 | - | combined program |
| `https://bugcrowd.com/engagements/okta-auth0` | 404 | - | bare alias dead |
| `https://bugcrowd.com/h/engagements/okta` | 200 | - | /h soft |
| `https://bugcrowd.com/h/engagements/okta/brief` | 200 | - | |
| `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | - | |
| `https://bugcrowd.com/h/engagements/auth0-okta/brief` | 200 | - | |
| `https://bugcrowd.com/programs/okta` | 404 | - | retired |
| `https://tracker.bugcrowd.com/okta` | 302 | → /user/sign_in | |
| `https://bugcrowd.com/user/sign_in` | 302 | → identity/login?user_hint=researcher | |
| `https://identity.bugcrowd.com/login` | 200 | - | IdP shell |
| `https://login.hackers.bugcrowd.com/.well-known/openid-configuration` | 200 | - | OIDC |

## Auth chain (passive)

1. Okta BB is **not** first-party (`/bug-bounty` 404) — BC engagements **okta** + **auth0-okta** are SSoT.
2. Public shells: trust/status/security/developer/login.okta **200**.
3. BC join: sign_in → identity researcher hint; tracker/okta → sign_in.

## Delta vs P66

- Stable: first-party BB 404; bare okta+auth0-okta 200; programs dead.
- Confirmed company/trust still 404 (use trust.okta.com).

## Notes

- Free Okta developer tenant still human; no Set5 in distill.
- No credentials.

## Auth readiness

- Okta BC SSoT mapped; enroll human.

## Next (human / gated)

- BC identity login; enroll okta and/or auth0-okta briefs; free Okta org if testing product.
