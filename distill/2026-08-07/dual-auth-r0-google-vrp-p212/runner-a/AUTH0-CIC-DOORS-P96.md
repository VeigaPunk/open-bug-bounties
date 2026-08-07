# Auth0 / CIC / BC doors (PULSE-96)

UTC: 2026-08-07T17:34:03Z
Policy: recon only — no auth, no exploit, no token harvest.
OIDC query values redacted (`client_id`/`nonce`/`state`/`code_challenge` → `…`).

## Passive HEAD/GET (max-redirs 0)

| method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://auth0.com` | 200 | `-` |
| `GET` | `https://auth0.com` | 200 | `-` |
| `HEAD` | `https://auth0.com/signup` | 200 | `-` |
| `GET` | `https://auth0.com/signup` | 200 | `-` |
| `HEAD` | `https://auth0.com/login` | 404 | `-` |
| `GET` | `https://auth0.com/login` | 404 | `-` |
| `HEAD` | `https://auth0.com/docs` | 200 | `-` |
| `GET` | `https://auth0.com/docs` | 200 | `-` |
| `HEAD` | `https://auth0.com/responsible-disclosure-policy` | 308 | `https://bugcrowd.com/auth0-okta` |
| `GET` | `https://auth0.com/responsible-disclosure-policy` | 308 | `https://bugcrowd.com/auth0-okta` |
| `HEAD` | `https://auth0.com/blog/responsible-disclosure/` | 404 | `-` |
| `GET` | `https://auth0.com/blog/responsible-disclosure/` | 404 | `-` |
| `HEAD` | `https://manage.auth0.com` | 302 | `/login` |
| `GET` | `https://manage.auth0.com` | 302 | `/login` |
| `HEAD` | `https://manage.auth0.com/login` | 302 | `https://auth0.auth0.com/authorize?scope=openid%20profile%20email&max_age=43200&nonce=…&response_type=code&redirect_uri=h` |
| `GET` | `https://manage.auth0.com/login` | 302 | `https://auth0.auth0.com/authorize?scope=openid%20profile%20email&max_age=43200&nonce=…&response_type=code&redirect_uri=h` |
| `HEAD` | `https://auth0.auth0.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://auth0.auth0.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://manage.cic-bug-bounty.auth0app.com` | 302 | `/login` |
| `GET` | `https://manage.cic-bug-bounty.auth0app.com` | 302 | `/login` |
| `HEAD` | `https://manage.cic-bug-bounty.auth0app.com/login` | 302 | `https://config.cic-bug-bounty.auth0app.com/authorize?scope=openid%20profile%20email&max_age=43200&nonce=…&response_type=` |
| `GET` | `https://manage.cic-bug-bounty.auth0app.com/login` | 302 | `https://config.cic-bug-bounty.auth0app.com/authorize?scope=openid%20profile%20email&max_age=43200&nonce=…&response_type=` |
| `HEAD` | `https://config.cic-bug-bounty.auth0app.com` | 302 | `https://cic-bug-bounty.auth0app.com/` |
| `GET` | `https://config.cic-bug-bounty.auth0app.com` | 302 | `https://cic-bug-bounty.auth0app.com/` |
| `HEAD` | `https://config.cic-bug-bounty.auth0app.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://config.cic-bug-bounty.auth0app.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/auth0` | 404 | `-` |
| `GET` | `https://bugcrowd.com/engagements/auth0` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/okta-auth0` | 404 | `-` |
| `GET` | `https://bugcrowd.com/engagements/okta-auth0` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/auth0` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/auth0` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/okta-auth0` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/okta-auth0` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/auth0/brief` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/auth0/brief` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/auth0-okta/brief` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/auth0-okta/brief` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/programs/auth0` | 404 | `-` |
| `GET` | `https://bugcrowd.com/programs/auth0` | 404 | `-` |
| `HEAD` | `https://tracker.bugcrowd.com/auth0` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `GET` | `https://tracker.bugcrowd.com/auth0` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `HEAD` | `https://tracker.bugcrowd.com/auth0-okta` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `GET` | `https://tracker.bugcrowd.com/auth0-okta` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `HEAD` | `https://identity.bugcrowd.com/login` | 200 | `-` |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | `-` |
| `HEAD` | `https://login.hackers.bugcrowd.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://login.hackers.bugcrowd.com/.well-known/openid-configuration` | 200 | `-` |

## Auth chain (passive)

1. Product manage GET **302** → login **302** loc `https://auth0.auth0.com/authorize?scope=openid%20profile%20email&max_age=43200&n`.
2. auth0.auth0.com OIDC discovery **200**.
3. CIC manage **302**; config OIDC **200**.
4. RD policy hop **308** → `https://bugcrowd.com/auth0-okta`.
5. BC bare auth0-okta **200**; bare auth0 **404**.
6. BC IdP identity login **200**; hackers OIDC **200**.

## Delta vs P72

- **New explicit:** `config.cic-bug-bounty.auth0app.com/.well-known/openid-configuration` **200** (CIC tenant-local OIDC discovery).
- manage.auth0 + CIC manage login still **302** → authorize (PKCE params redacted).
- BC bare auth0-okta **200** SSoT; bare auth0/okta-auth0 **404**; /h soft **200** stable.
- RD policy **308** → bugcrowd auth0-okta; blog RD still **404**.

## Notes

- Free Auth0 tenant + BC enroll still human; no Set5 secrets.
- No credentials.

## Auth readiness

- Auth0 product + CIC + BC auth0-okta SSoT mapped; enroll human.

## Next (human / gated)

- BC login; enroll auth0-okta; free Auth0 tenant for own testing.
