# Auth0 / CIC / BC doors (PULSE-72)

UTC: 2026-08-07T16:44:14Z
Policy: recon only — no auth, no exploit, no token harvest.
OIDC query values redacted (`client_id`/`nonce`/`state`/`code_challenge` → `…`).

## Passive GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://auth0.com` | 200 | - | marketing |
| `https://auth0.com/signup` | 200 | - | public signup |
| `https://auth0.com/login` | 404 | - | not product login |
| `https://auth0.com/u/login` | 404 | - | |
| `https://auth0.com/docs` | 200 | - | |
| `https://auth0.com/responsible-disclosure-policy` | 308 | → bugcrowd.com/auth0-okta | **policy SSoT hop** |
| `https://auth0.com/blog/responsible-disclosure/` | 404 | - | still dead |
| `https://manage.auth0.com` | 302 | → /login | |
| `https://manage.auth0.com/login` | 302 | → auth0.auth0.com/authorize (openid profile email + PKCE) | UL |
| `https://auth0.auth0.com/.well-known/openid-configuration` | 200 | - | discovery |
| `https://manage.cic-bug-bounty.auth0app.com` | 302 | → /login | CIC manage |
| `https://manage.cic-bug-bounty.auth0app.com/login` | 302 | → config.cic-bug-bounty.auth0app.com/authorize | CIC UL host |
| `https://cic-bug-bounty.auth0app.com` | ERR | - | apex not public |
| `https://config.cic-bug-bounty.auth0app.com` | 302 | → cic-bug-bounty.auth0app.com/ | reverse hop |
| `https://bugcrowd.com/engagements/auth0` | 404 | - | bare |
| `https://bugcrowd.com/engagements/auth0-okta` | 200 | - | **combined SSoT** |
| `https://bugcrowd.com/engagements/okta-auth0` | 404 | - | bare |
| `https://bugcrowd.com/h/engagements/auth0` | 200 | - | soft shell |
| `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | - | |
| `https://bugcrowd.com/h/engagements/okta-auth0` | 200 | - | soft |
| `https://bugcrowd.com/h/engagements/auth0/brief` | 200 | - | |
| `https://bugcrowd.com/h/engagements/auth0-okta/brief` | 200 | - | |
| `https://bugcrowd.com/programs/auth0` | 404 | - | retired alias |
| `https://tracker.bugcrowd.com/auth0` | 302 | → /user/sign_in | |
| `https://tracker.bugcrowd.com/auth0-okta` | 302 | → /user/sign_in | |
| `https://identity.bugcrowd.com/login` | 200 | - | IdP shell |
| `https://login.hackers.bugcrowd.com/.well-known/openid-configuration` | 200 | - | hacker OIDC |

## Auth chain (passive)

1. Product: `manage.auth0.com` → `/login` → `auth0.auth0.com/authorize` (openid profile email, PKCE S256).
2. CIC: `manage.cic-bug-bounty.auth0app.com` → `/login` → `config.cic-bug-bounty.auth0app.com/authorize` (tenant-local issuer).
3. Policy: RD policy URL → **bugcrowd.com/auth0-okta** (not bare auth0).
4. BC catalog: bare `auth0-okta` **200**; bare auth0/okta-auth0 **404**; `/h` soft-200 for all three.

## Delta vs P62

- Stable: manage→UL, CIC config authorize, RD→auth0-okta, blog RD 404.
- New explicit: config host reverse 302 → cic apex; tracker auth0+auth0-okta → sign_in; identity login + hackers OIDC still 200.
- Brief shells `/h/.../brief` **200** both auth0 soft + auth0-okta.

## Notes

- Free Auth0 tenant still human (Get Creds).
- No credentials; OIDC client_id not stored.

## Auth readiness

- Auth0/CIC doors mapped; enroll/join via BC **auth0-okta** still human.

## Next (human / gated)

- Free tenant + BC identity login; enroll auth0-okta brief.
