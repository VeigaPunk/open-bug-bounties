# AUTH0-CIC-DOORS-P151
UTC: 2026-08-07T19:29:37Z
Policy: passive HTTP recon only (no -L for status). No auth abuse. UL query scrubbed.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://auth0.com/` | 200 | - |
| `GET` | `https://auth0.com/docs` | 200 | - |
| `GET` | `https://auth0.com/security` | 308 | → https://security.okta.com/ |
| `GET` | `https://auth0.com/responsible-disclosure-policy` | 308 | → https://bugcrowd.com/auth0-okta |
| `GET` | `https://manage.auth0.com/` | 302 | → https://manage.auth0.com/login |
| `GET` | `https://manage.auth0.com/login` | 302 | → https://auth0.auth0.com/authorize/?… PKCE authorize |
| `GET` | `https://auth0.auth0.com/.well-known/openid-configuration` | 200 | - |
| `GET` | `https://cdn.auth0.com/` | 200 | - |
| `GET` | `https://cdn.eu.auth0.com/` | 302 | → https://eu.auth0.com/ |
| `GET` | `https://login.auth0.com/` | 302 | → https://auth0.com/ |
| `GET` | `https://guardian.auth0.com/` | 302 | → https://auth0.com/ |
| `GET` | `https://developer.auth0.com/` | 200 | - |
| `GET` | `https://config.cic.eu.auth0.com/` | 000 | - |
| `GET` | `https://manage.cic-bug-bounty.auth0app.com/` | 302 | → https://manage.cic-bug-bounty.auth0app.com/login |
| `GET` | `https://cic-bug-bounty.auth0app.com/` | 000 | - |
| `GET` | `https://security.okta.com/` | 200 | - |
| `GET` | `https://login.okta.com/` | 200 | - |
| `GET` | `https://developer.okta.com/` | 200 | - |
| `GET` | `https://www.okta.com/bug-bounty/` | 404 | - |
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/auth0` | 404 | - |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | - |
| `GET` | `https://bugcrowd.com/auth0-okta` | 302 | → https://bugcrowd.com/engagements/auth0-okta |
| `GET` | `https://bugcrowd.com/h/auth0-okta` | 200 | - |
| `GET` | `https://bugcrowd.com/h/auth0` | 200 | - |
| `GET` | `https://bugcrowd.com/h/okta` | 200 | - |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | - |
| `GET` | `https://tracker.bugcrowd.com/auth0` | 302 | → https://tracker.bugcrowd.com/user/sign_in |
| `GET` | `https://login.bugcrowd.com/` | 302 | → https://tracker.bugcrowd.com/user/sign_in |

## Summary
Auth0+CIC+Okta passive door refresh for runner-a (P151). RD **308→BC auth0-okta** SSoT; security→security.okta; manage→login→auth0.auth0.com authorize (PKCE UL). Product OIDC discovery **200**. BC engagements **auth0-okta+okta 200**; bare **auth0 404**. First-party www.okta.com/bug-bounty **404**. CIC hosts rechecked for delta vs P144.

## Deltas vs P144
- manage.auth0.com/login now surfaces full UL hop to **auth0.auth0.com/authorize** (PKCE) — expected product path.
- Core BC auth0-okta SSoT + RD 308 + manage hop **stable**.
- CIC/config hosts + first-party BB path recorded this tick for readiness matrix.

## Auth readiness
- BB SSoT: Bugcrowd **auth0-okta** (+ okta engagement).
- Browser: manage UL + BC identity login; no unauth API abuse.
