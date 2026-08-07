# Okta product + BC doors (PULSE-84)

UTC: 2026-08-07T17:08:05Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://www.okta.com` | 200 | - | marketing |
| `https://okta.com` | 301 | → www.okta.com/ | |
| `https://www.okta.com/bug-bounty/` | 404 | - | no first-party BB |
| `https://www.okta.com/company/trust` | 404 | - | path gone |
| `https://www.okta.com/security/` | 301 | → trust.okta.com/ | security→trust |
| `https://trust.okta.com` | 200 | - | trust center |
| `https://status.okta.com` | 200 | - | status |
| `https://security.okta.com` | 200 | - | security hub |
| `https://developer.okta.com` | 200 | - | developer |
| `https://developer.okta.com/signup/` | 200 | - | free org door |
| `https://login.okta.com` | 200 | - | product login shell |
| `https://help.okta.com` | 200 | - | help shell |
| `https://support.okta.com` | 301 | → /help/ | support hop |
| `https://bugcrowd.com/engagements/okta` | 200 | - | **BC SSoT bare** |
| `https://bugcrowd.com/engagements/auth0-okta` | 200 | - | combined program |
| `https://bugcrowd.com/h/engagements/okta` | 200 | - | /h soft |
| `https://bugcrowd.com/h/engagements/okta/brief` | 200 | - | brief |
| `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | - | /h combined |
| `https://bugcrowd.com/programs/okta` | 404 | - | retired |
| `https://tracker.bugcrowd.com/okta` | 302 | → /user/sign_in | |

## Auth chain (passive)

1. Okta BB is **not** first-party (`/bug-bounty` 404) — BC engagements **okta** + **auth0-okta** are SSoT.
2. Public shells: trust/status/security/developer/login/signup **200**.
3. www.okta.com/security → trust.okta.com (use trust.okta.com as trust SSoT).
4. BC join: tracker/okta → sign_in; bare + /h engagements 200.

## Delta vs P76

- Stable matrix: first-party BB 404; bare okta + auth0-okta **200**; programs dead.
- Confirmed company/trust still 404; **/security → trust.okta.com** hop explicit.
- developer signup + help.okta **200** rechecked.

## Notes

- Free Okta developer tenant still human; no Set5 secrets in distill.
- No credentials.

## Auth readiness

- Okta BC SSoT mapped; enroll human.

## Next (human / gated)

- BC identity login; enroll okta and/or auth0-okta briefs; free Okta org if testing product.
