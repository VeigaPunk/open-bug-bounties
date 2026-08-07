# Auth0 / CIC / manage passive map (PULSE-52)

UTC: 2026-08-07T16:04:41Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (no follow beyond first hop)

| URL | status | location | set-cookie | notes |
|-----|--------|----------|------------|-------|
| `https://auth0.com` | 200 | - | 0 |  |
| `https://auth0.com/signup` | 200 | - | 1 | cookies=1 |
| `https://auth0.com/login` | 404 | - | 0 |  |
| `https://auth0.com/u/login` | 404 | - | 0 |  |
| `https://auth0.com/docs` | 200 | - | 0 |  |
| `https://auth0.com/security` | 308 | https://security.okta.com/ | 0 |  |
| `https://auth0.com/responsible-disclosure-policy` | 308 | https://bugcrowd.com/auth0-okta | 0 |  |
| `https://auth0.com/blog` | 308 | /blog/ | 0 |  |
| `https://manage.auth0.com` | 302 | /login | 1 | cookies=1 |
| `https://manage.auth0.com/login` | 302 | https://auth0.auth0.com/authorize?scope=openid%20profile%20email&max_age=43200&nonce=eb667 | 1 | cookies=1 |
| `https://manage.auth0.com/dashboard` | 302 | /login | 1 | cookies=1 |
| `https://auth0.auth0.com/.well-known/openid-configuration` | 200 | - | 0 |  |
| `https://auth0.auth0.com/authorize` | 400 | - | 2 | cookies=2 |
| `https://cic-bug-bounty.auth0app.com` | err | - | 0 |  |
| `https://manage.cic-bug-bounty.auth0app.com` | 302 | /login | 1 | cookies=1 |
| `https://manage.cic-bug-bounty.auth0app.com/login` | 302 | https://config.cic-bug-bounty.auth0app.com/authorize?scope=openid%20profile%20email&max_ag | 1 | cookies=1 |
| `https://bugcrowd.com/engagements/auth0-okta` | 200 | - | 1 | cookies=1 |
| `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | - | 0 |  |
| `https://bugcrowd.com/engagements/auth0` | 404 | - | 0 |  |
| `https://bugcrowd.com/engagements/okta` | 200 | - | 1 | cookies=1 |
| `https://bugcrowd.com/h/engagements/okta` | 200 | - | 0 |  |
| `https://developer.auth0.com` | 200 | - | 0 |  |
| `https://support.auth0.com` | 302 | https://auth0.auth0.com/authorize?client_id=YAoR7lyosNmtHiP4CUcdI8Fu4J2vC6wM&scope=read%3A | 3 | cookies=3 |
| `https://cdn.auth0.com` | 200 | - | 0 |  |

## Notes

- manage.auth0.com typically bounces to auth0.auth0.com/authorize (OIDC).
- CIC tenant manage host often 400 without OIDC state (surface alive).
- BC SSoT: engagements/auth0-okta (+ /h variant).
- No secrets; free-tier Auth0 still human.

## Next (human / gated)

- Auth0 free tenant signup in browser if engagement allows.
- op:// only for any future creds; never distill secrets.

## Delta vs prior claims
- `/u/login` previously med-400 bare; this tick **404** (path drift).
- CIC manage no longer documented as bare 400 only: **/login 302 → config.cic authorize**.
- RD short-link `bugcrowd.com/auth0-okta` (alongside `/engagements/auth0-okta`).
