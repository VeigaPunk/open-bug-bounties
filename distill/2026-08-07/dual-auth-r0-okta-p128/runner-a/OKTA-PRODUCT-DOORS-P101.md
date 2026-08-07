# Okta product + BC doors (PULSE-101)

UTC: 2026-08-07T17:44:03Z
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
| `HEAD` | `https://www.okta.com/okta-security-vulnerability-disclosure-policy` | 404 | `-` |
| `GET` | `https://www.okta.com/okta-security-vulnerability-disclosure-policy` | 404 | `-` |
| `HEAD` | `https://trust.okta.com` | 200 | `-` |
| `GET` | `https://trust.okta.com` | 200 | `-` |
| `HEAD` | `https://developer.okta.com` | 200 | `-` |
| `GET` | `https://developer.okta.com` | 200 | `-` |
| `HEAD` | `https://developer.okta.com/.well-known/openid-configuration` | 404 | `-` |
| `GET` | `https://developer.okta.com/.well-known/openid-configuration` | 404 | `-` |
| `HEAD` | `https://okta.com/.well-known/openid-configuration` | 301 | `https://www.okta.com/.well-known/openid-configuration` |
| `GET` | `https://okta.com/.well-known/openid-configuration` | 301 | `https://www.okta.com/.well-known/openid-configuration` |
| `HEAD` | `https://login.okta.com` | 200 | `-` |
| `GET` | `https://login.okta.com` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/okta/brief` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/okta/brief` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/okta/brief` | 301 | `https://bugcrowd.com/h/engagements/okta/brief` |
| `GET` | `https://bugcrowd.com/engagements/okta/brief` | 301 | `https://bugcrowd.com/h/engagements/okta/brief` |
| `HEAD` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/auth0-okta/brief` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/auth0-okta/brief` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/auth0` | 404 | `-` |
| `GET` | `https://bugcrowd.com/engagements/auth0` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/programs/okta` | 404 | `-` |
| `GET` | `https://bugcrowd.com/programs/okta` | 404 | `-` |
| `HEAD` | `https://tracker.bugcrowd.com/okta` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `GET` | `https://tracker.bugcrowd.com/okta` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `HEAD` | `https://bugcrowd.com/user/sign_in` | 302 | `https://identity.bugcrowd.com/login?user_hint=researcher&returnTo=https%3A%2F%2Fbugcrowd.c` |
| `GET` | `https://bugcrowd.com/user/sign_in` | 302 | `https://identity.bugcrowd.com/login?user_hint=researcher&returnTo=https%3A%2F%2Fbugcrowd.c` |
| `HEAD` | `https://identity.bugcrowd.com` | 403 | `-` |
| `GET` | `https://identity.bugcrowd.com` | 403 | `-` |
| `HEAD` | `https://bugcrowd-pam-5335.oktapreview.com` | 302 | `https://bugcrowd-pam-5335.oktapreview.com/app/UserHome?iss=https%3A%2F%2Fbugcrowd-pam-5335` |
| `GET` | `https://bugcrowd-pam-5335.oktapreview.com` | 302 | `https://bugcrowd-pam-5335.oktapreview.com/app/UserHome?iss=https%3A%2F%2Fbugcrowd-pam-5335` |
| `HEAD` | `https://bugcrowd-pam-5335.oktapreview.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://bugcrowd-pam-5335.oktapreview.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://bugcrowd-pam-5335.oktapreview.com/api/v1/users/me` | 403 | `-` |
| `GET` | `https://bugcrowd-pam-5335.oktapreview.com/api/v1/users/me` | 403 | `-` |
| `HEAD` | `https://support.okta.com` | 301 | `https://support.okta.com/help/` |
| `GET` | `https://support.okta.com` | 301 | `https://support.okta.com/help/` |
| `HEAD` | `https://login.okta.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://login.okta.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://www.okta.com/.well-known/openid-configuration` | 404 | `-` |
| `GET` | `https://www.okta.com/.well-known/openid-configuration` | 404 | `-` |
| `HEAD` | `https://status.okta.com` | 200 | `-` |
| `GET` | `https://status.okta.com` | 200 | `-` |
| `HEAD` | `https://security.okta.com` | 200 | `-` |
| `GET` | `https://security.okta.com` | 200 | `-` |

## Auth chain (passive)

1. First-party `/bug-bounty` **404**; disclosure policy path **404** — BC **okta** + **auth0-okta** remain SSoT (both **200** bare + `/h` + brief).
2. Marketing www **200**; `/security` → trust.okta.com **301**; trust/status/security shells **200**.
3. developer OIDC well-known **404**; login.okta OIDC well-known **200**; apex okta.com well-known **301**→www (**404** on www).
4. BC bare okta brief → `/h` **301**; bare **auth0** engagement **404** (use auth0-okta).
5. programs/okta **404**; tracker → sign_in **302**.
6. bugcrowd sign_in → identity.bugcrowd.com researcher hint **302**; identity apex unauth **403**.
7. Set5 preview host **302**→UserHome+session_hint (non-durable headless); Set5 OIDC well-known **200**; `/api/v1/users/me` **403** unauth.

## Delta vs P92

- **New:** Set5 `bugcrowd-pam-5335.oktapreview.com` OIDC well-known **200**; `/api/v1/users/me` **403**.
- **New:** identity.bugcrowd.com apex **403**; sign_in researcher returnTo hop confirmed.
- **New:** bare `engagements/auth0` **404** (auth0-okta only); bare okta brief → `/h` **301**.
- developer host OIDC **404** (not IdP); login.okta OIDC **200** stable vs P92.
- BC okta + auth0-okta bare/`/h`/brief **200** stable; first-party BB still **404**.

## Notes

- Set5 durable browser + MFA still human; no secrets in distill.
- No credentials.

## Auth readiness

- Okta BC SSoT + product login OIDC + Set5 OIDC door mapped; enroll/human MFA still gated.

## Next (human / gated)

- Browser Set5 login + MFA enforce; BC identity session; free Okta developer org if product-scope tests.
