# Okta product + BC doors (PULSE-110)

UTC: 2026-08-07T18:05:35Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://www.okta.com` | 200 | `-` |
| `GET` | `https://www.okta.com` | 200 | `-` |
| `HEAD` | `https://www.okta.com/security` | 301 | `https://trust.okta.com` |
| `GET` | `https://www.okta.com/security` | 301 | `https://trust.okta.com` |
| `HEAD` | `https://www.okta.com/bug-bounty` | 404 | `-` |
| `GET` | `https://www.okta.com/bug-bounty` | 404 | `-` |
| `HEAD` | `https://trust.okta.com` | 200 | `-` |
| `GET` | `https://trust.okta.com` | 200 | `-` |
| `HEAD` | `https://login.okta.com` | 200 | `-` |
| `GET` | `https://login.okta.com` | 200 | `-` |
| `HEAD` | `https://login.okta.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://login.okta.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://developer.okta.com` | 200 | `-` |
| `GET` | `https://developer.okta.com` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/okta/brief` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/okta/brief` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/auth0-okta/brief` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/auth0-okta/brief` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/programs/okta` | 404 | `-` |
| `GET` | `https://bugcrowd.com/programs/okta` | 404 | `-` |
| `HEAD` | `https://tracker.bugcrowd.com/okta` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `GET` | `https://tracker.bugcrowd.com/okta` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `HEAD` | `https://bugcrowd-pam-5335.oktapreview.com` | 302 | `https://bugcrowd-pam-5335.oktapreview.com/app/UserHome?iss=https%3A%2F%2Fbugcrowd-pam-5335` |
| `GET` | `https://bugcrowd-pam-5335.oktapreview.com` | 302 | `https://bugcrowd-pam-5335.oktapreview.com/app/UserHome?iss=https%3A%2F%2Fbugcrowd-pam-5335` |
| `HEAD` | `https://bugcrowd-pam-5335.oktapreview.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://bugcrowd-pam-5335.oktapreview.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://bugcrowd-pam-5335.oktapreview.com/api/v1/users/me` | 403 | `-` |
| `GET` | `https://bugcrowd-pam-5335.oktapreview.com/api/v1/users/me` | 403 | `-` |
| `HEAD` | `https://security.okta.com` | 200 | `-` |
| `GET` | `https://security.okta.com` | 200 | `-` |
| `HEAD` | `https://status.okta.com` | 200 | `-` |
| `GET` | `https://status.okta.com` | 200 | `-` |

## Auth chain (passive)

1. First-party `/bug-bounty` **404**; BC okta + auth0-okta bare/`/h`/brief **200** SSoT.
2. login.okta OIDC **200**; marketing security → trust **301**; trust/status/security **200**.
3. Set5 preview → UserHome hop **302** (non-durable headless); Set5 OIDC **200**; `/api/v1/users/me` **403**.
4. programs/okta **404**; tracker → sign_in **302**.

## Delta vs P101

- Stable map: BC dual SSoT **200**; login.okta OIDC **200**; Set5 OIDC **200** / me **403**.
- No regressions observed this tick.

## Notes

- Set5 MFA browser still human; no secrets in distill.

## Auth readiness

- Okta BC + product OIDC + Set5 doors mapped; enroll/MFA human.

## Next (human / gated)

- Browser Set5 + MFA; BC identity session.
