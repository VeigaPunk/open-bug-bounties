# Auth0 CIC + BC doors (PULSE-114)

UTC: 2026-08-07T18:13:26Z
Policy: recon only — no auth, no exploit, no token harvest.
Note: authorize nonces are transient; not durable secrets.

## Passive HEAD/GET (max-redirs 0)

| Method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://auth0.com` | 200 | `-` |
| `GET` | `https://auth0.com` | 200 | `-` |
| `HEAD` | `https://auth0.com/security` | 308 | `→ security.okta.com` |
| `GET` | `https://auth0.com/security` | 308 | `→ security.okta.com` |
| `HEAD` | `https://auth0.com/responsible-disclosure-policy` | 308 | `→ bugcrowd.com/auth0-okta` |
| `GET` | `https://auth0.com/responsible-disclosure-policy` | 308 | `→ bugcrowd.com/auth0-okta` |
| `HEAD` | `https://manage.auth0.com` | 302 | `/login` |
| `GET` | `https://manage.auth0.com` | 302 | `/login` |
| `HEAD` | `https://manage.auth0.com/login` | 302 | `→ auth0.auth0.com/authorize` |
| `GET` | `https://manage.auth0.com/login` | 302 | `→ auth0.auth0.com/authorize` |
| `HEAD` | `https://auth0.auth0.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://auth0.auth0.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://config.cic-bug-bounty.auth0app.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://config.cic-bug-bounty.auth0app.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://manage.cic-bug-bounty.auth0app.com` | 302 | `/login` |
| `GET` | `https://manage.cic-bug-bounty.auth0app.com` | 302 | `/login` |
| `HEAD` | `https://manage.cic-bug-bounty.auth0app.com/login` | 302 | `→ config.cic…/authorize` |
| `GET` | `https://manage.cic-bug-bounty.auth0app.com/login` | 302 | `→ config.cic…/authorize` |
| `HEAD` | `https://config.cic-bug-bounty.com/.well-known/openid-configuration` | 000 | `-` |
| `GET` | `https://config.cic-bug-bounty.com/.well-known/openid-configuration` | 000 | `-` |
| `HEAD` | `https://cic-bug-bounty.com` | 000 | `-` |
| `GET` | `https://cic-bug-bounty.com` | 000 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/auth0` | 404 | `-` |
| `GET` | `https://bugcrowd.com/engagements/auth0` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/auth0` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/auth0` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/auth0-okta` | 302 | `→ /engagements/auth0-okta` |
| `GET` | `https://bugcrowd.com/auth0-okta` | 302 | `→ /engagements/auth0-okta` |
| `HEAD` | `https://bugcrowd.com/engagements/okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/okta` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/okta` | 200 | `-` |
| `HEAD` | `https://cdn.auth0.com` | 200 | `-` |
| `GET` | `https://cdn.auth0.com` | 200 | `-` |
| `HEAD` | `https://login.auth0.com` | 302 | `→ auth0.com` |
| `GET` | `https://login.auth0.com` | 302 | `→ auth0.com` |

## Auth chain (passive)

1. RD policy → BC auth0-okta **308**; BC slug → engagements **302**.
2. Prod manage → UL authorize; auth0.auth0 OIDC **200**.
3. CIC manage.auth0app → config.cic authorize; CIC OIDC **200**.
4. Bare cic-bug-bounty.com **000**; use auth0app hosts only.
5. BC bare auth0 **404**; /h soft **200**; auth0-okta + okta bare+/h **200** SSoT.

## Delta vs P104

- CIC auth0app OIDC **200** stable; apex **000** stable.
- BC dual SSoT + RD hop stable.

## Notes

- No secrets in distill; nonces ephemeral.

## Auth readiness

- Auth0 prod + CIC UL doors + BC SSoT mapped.

## Next (human / gated)

- BC identity for auth0-okta; CIC browser enroll if required.
