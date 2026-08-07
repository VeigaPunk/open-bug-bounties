# Okta product + BC doors (PULSE-92)

UTC: 2026-08-07T17:26:18Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://www.okta.com` | 200 | `-` |
| `GET` | `https://www.okta.com` | 200 | `-` |
| `HEAD` | `https://okta.com` | 301 | `https://www.okta.com/` |
| `GET` | `https://okta.com` | 301 | `https://www.okta.com/` |
| `HEAD` | `https://www.okta.com/bug-bounty/` | 404 | `-` |
| `GET` | `https://www.okta.com/bug-bounty/` | 404 | `-` |
| `HEAD` | `https://www.okta.com/company/trust` | 404 | `-` |
| `GET` | `https://www.okta.com/company/trust` | 404 | `-` |
| `HEAD` | `https://www.okta.com/security/` | 301 | `https://trust.okta.com` |
| `GET` | `https://www.okta.com/security/` | 301 | `https://trust.okta.com` |
| `HEAD` | `https://trust.okta.com` | 200 | `-` |
| `GET` | `https://trust.okta.com` | 200 | `-` |
| `HEAD` | `https://status.okta.com` | 200 | `-` |
| `GET` | `https://status.okta.com` | 200 | `-` |
| `HEAD` | `https://security.okta.com` | 200 | `-` |
| `GET` | `https://security.okta.com` | 200 | `-` |
| `HEAD` | `https://developer.okta.com` | 200 | `-` |
| `GET` | `https://developer.okta.com` | 200 | `-` |
| `HEAD` | `https://developer.okta.com/signup/` | 200 | `-` |
| `GET` | `https://developer.okta.com/signup/` | 200 | `-` |
| `HEAD` | `https://login.okta.com` | 200 | `-` |
| `GET` | `https://login.okta.com` | 200 | `-` |
| `HEAD` | `https://help.okta.com` | 200 | `-` |
| `GET` | `https://help.okta.com` | 200 | `-` |
| `HEAD` | `https://support.okta.com` | 301 | `https://support.okta.com/help/` |
| `GET` | `https://support.okta.com` | 301 | `https://support.okta.com/help/` |
| `HEAD` | `https://bugcrowd.com/engagements/okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/okta/brief` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/okta/brief` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/programs/okta` | 404 | `-` |
| `GET` | `https://bugcrowd.com/programs/okta` | 404 | `-` |
| `HEAD` | `https://tracker.bugcrowd.com/okta` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `GET` | `https://tracker.bugcrowd.com/okta` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `HEAD` | `https://www.okta.com/.well-known/openid-configuration` | 404 | `-` |
| `GET` | `https://www.okta.com/.well-known/openid-configuration` | 404 | `-` |
| `HEAD` | `https://login.okta.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://login.okta.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://developer.okta.com/docs/guides/` | 200 | `-` |
| `GET` | `https://developer.okta.com/docs/guides/` | 200 | `-` |

## Auth chain (passive)

1. Okta BB is **not** first-party (`/bug-bounty` 404) — BC engagements **okta** + **auth0-okta** are SSoT.
2. Marketing www.okta.com GET **200**; apex okta.com **301**.
3. Trust/status/security shells: trust **200**, status **200**, security **200**.
4. Developer signup GET **200**; login.okta shell **200**.
5. BC bare okta **200**; auth0-okta **200**; /h soft **200**.
6. programs/okta **404** (retired expected); tracker → sign_in hop **302** loc `https://tracker.bugcrowd.com/user/sign_in`.
7. login.okta.com OIDC well-known GET **200**; www.okta.com well-known **404**.

## Delta vs P84

- **New:** `login.okta.com/.well-known/openid-configuration` **200** (OIDC door on product login host).
- **New:** `www.okta.com/.well-known/openid-configuration` **404** (marketing host not OIDC).
- BC bare + /h okta/auth0-okta **200**; programs/okta **404**; tracker → sign_in **302** stable.
- First-party `/bug-bounty` **404**; `/security` → trust hop; developer signup **200** stable.

## Notes

- Free Okta developer tenant still human; no Set5 secrets in distill.
- No credentials.

## Auth readiness

- Okta BC SSoT mapped; enroll human.

## Next (human / gated)

- BC identity login; enroll okta and/or auth0-okta briefs; free Okta org if testing product.
