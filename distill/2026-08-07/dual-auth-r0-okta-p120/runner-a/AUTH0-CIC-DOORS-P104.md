# Auth0 CIC + BC doors (PULSE-104)

UTC: 2026-08-07T17:53:37Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://manage.auth0.com` | 302 | `/login` |
| `GET` | `https://manage.auth0.com` | 302 | `/login` |
| `HEAD` | `https://manage.auth0.com/login` | 302 | `https://auth0.auth0.com/authorize?scope=openid%20profile%20email&max_age=43200&nonce=206a7` |
| `GET` | `https://manage.auth0.com/login` | 302 | `https://auth0.auth0.com/authorize?scope=openid%20profile%20email&max_age=43200&nonce=6eb81` |
| `HEAD` | `https://auth0.auth0.com` | 302 | `https://auth0.com/` |
| `GET` | `https://auth0.auth0.com` | 302 | `https://auth0.com/` |
| `HEAD` | `https://auth0.auth0.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://auth0.auth0.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://manage.cic-bug-bounty.auth0app.com` | 302 | `/login` |
| `GET` | `https://manage.cic-bug-bounty.auth0app.com` | 302 | `/login` |
| `HEAD` | `https://manage.cic-bug-bounty.auth0app.com/login` | 302 | `https://config.cic-bug-bounty.auth0app.com/authorize?scope=openid%20profile%20email&max_ag` |
| `GET` | `https://manage.cic-bug-bounty.auth0app.com/login` | 302 | `https://config.cic-bug-bounty.auth0app.com/authorize?scope=openid%20profile%20email&max_ag` |
| `HEAD` | `https://config.cic-bug-bounty.auth0app.com` | 302 | `https://cic-bug-bounty.auth0app.com/` |
| `GET` | `https://config.cic-bug-bounty.auth0app.com` | 302 | `https://cic-bug-bounty.auth0app.com/` |
| `HEAD` | `https://config.cic-bug-bounty.auth0app.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://config.cic-bug-bounty.auth0app.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://cic-bug-bounty.auth0app.com` | 000 | `-` |
| `GET` | `https://cic-bug-bounty.auth0app.com` | 000 | `-` |
| `HEAD` | `https://auth0.com` | 200 | `-` |
| `GET` | `https://auth0.com` | 200 | `-` |
| `HEAD` | `https://auth0.com/security` | 308 | `https://security.okta.com/` |
| `GET` | `https://auth0.com/security` | 308 | `https://security.okta.com/` |
| `HEAD` | `https://auth0.com/responsible-disclosure-policy` | 308 | `https://bugcrowd.com/auth0-okta` |
| `GET` | `https://auth0.com/responsible-disclosure-policy` | 308 | `https://bugcrowd.com/auth0-okta` |
| `HEAD` | `https://auth0.com/docs` | 200 | `-` |
| `GET` | `https://auth0.com/docs` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/auth0-okta/brief` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/auth0-okta/brief` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/auth0` | 404 | `-` |
| `GET` | `https://bugcrowd.com/engagements/auth0` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/auth0` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/auth0` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | `-` |
| `HEAD` | `https://blog.auth0.com/responsible-disclosure` | 301 | `https://auth0.com/blog/responsible-disclosure` |
| `GET` | `https://blog.auth0.com/responsible-disclosure` | 301 | `https://auth0.com/blog/responsible-disclosure` |
| `HEAD` | `https://cdn.auth0.com` | 200 | `-` |
| `GET` | `https://cdn.auth0.com` | 200 | `-` |
| `HEAD` | `https://login.auth0.com` | 302 | `https://auth0.com/` |
| `GET` | `https://login.auth0.com` | 302 | `https://auth0.com/` |
| `HEAD` | `https://tracker.bugcrowd.com/auth0-okta` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `GET` | `https://tracker.bugcrowd.com/auth0-okta` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |

## Auth chain (passive)

1. Prod manage → `/login` → `auth0.auth0.com/authorize` (openid profile email; nonce in Location, not stored full).
2. CIC manage → `/login` → `config.cic-bug-bounty.auth0app.com/authorize`.
3. OIDC: `auth0.auth0.com` + `config.cic-bug-bounty` well-known **200**.
4. CIC apex `cic-bug-bounty.auth0app.com` **000** (ERR/no route expected); config apex → cic apex **302**.
5. RD policy → BC auth0-okta **308**; security → security.okta **308**.
6. BC bare auth0-okta **200** SSoT; bare auth0 **404**; `/h` auth0 soft **200**; okta bare **200**.
7. blog RD path **301**→auth0.com/blog; tracker auth0-okta → sign_in **302**.

## Delta vs P96

- CIC apex still **000** (no public shell).
- **Stable:** dual UL authorize hops; both OIDC **200**; RD→BC; bare auth0 **404** vs auth0-okta **200**.
- **Noted:** bare `/h/engagements/auth0` soft-**200** without bare engagement (soft shell).

## Notes

- Researcher tenants only (CIC); never prod customer manage.auth0.com for bounty.
- Get Creds → op only; no secrets in distill.

## Auth readiness

- Auth0 CIC + BC auth0-okta SSoT mapped; Get Creds human.

## Next (human / gated)

- BC Get Credentials → 1Password; stay on cic-bug-bounty tenants only.
