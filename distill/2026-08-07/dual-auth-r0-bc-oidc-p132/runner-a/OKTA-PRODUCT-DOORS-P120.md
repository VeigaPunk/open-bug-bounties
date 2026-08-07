# Okta BC/product doors (PULSE-120)

UTC: 2026-08-07T18:25:19Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| Method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://bugcrowd.com/engagements/okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | `-` |
| `HEAD` | `https://login.okta.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://login.okta.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://okta.com/bug-bounty` | 301 | `→ www.okta.com/bug-bounty` |
| `GET` | `https://okta.com/bug-bounty` | 301 | `→ www.okta.com/bug-bounty` |
| `HEAD` | `https://www.okta.com/bug-bounty` | 404 | `-` |
| `GET` | `https://www.okta.com/bug-bounty` | 404 | `-` |
| `HEAD` | `https://security.okta.com` | 200 | `-` |
| `GET` | `https://security.okta.com` | 200 | `-` |
| `HEAD` | `https://status.okta.com` | 200 | `-` |
| `GET` | `https://status.okta.com` | 200 | `-` |
| `HEAD` | `https://bugcrowd-pam-5335.oktapreview.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://bugcrowd-pam-5335.oktapreview.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://bugcrowd-pam-5335.oktapreview.com/api/v1/users/me` | 403 | `-` |
| `GET` | `https://bugcrowd-pam-5335.oktapreview.com/api/v1/users/me` | 403 | `-` |
| `HEAD` | `https://bugcrowd.com/programs/okta` | 404 | `-` |
| `GET` | `https://bugcrowd.com/programs/okta` | 404 | `-` |
| `HEAD` | `https://tracker.bugcrowd.com` | 302 | `→ /user/sign_in` |
| `GET` | `https://tracker.bugcrowd.com` | 302 | `→ /user/sign_in` |

## Auth chain (passive)

1. BC okta + auth0-okta bare/`/h` **200** SSoT.
2. login.okta OIDC **200**; first-party www bug-bounty **404**.
3. Set5 OIDC **200**; `/api/v1/users/me` **403** unauth.
4. security/status **200**; programs/okta **404**; tracker → sign_in **302**.

## Delta vs P110

- Stable BC dual SSoT; login.okta OIDC; Set5 OIDC/me map. Century pulse (P120).

## Notes

- Set5 MFA still human; no secrets in distill.

## Auth readiness

- Okta BC + product OIDC + Set5 doors mapped.

## Next (human / gated)

- Browser Set5 + MFA; BC identity session.
