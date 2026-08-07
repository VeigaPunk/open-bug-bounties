# AUTH0-CIC-DOORS-P215
UTC: 2026-08-07T21:40:15Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Auth0 first-party

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://auth0.com/` | 200 | marketing |
| `GET` | `https://auth0.com/security` | 308→200 | → security.okta.com |
| `GET` | `https://auth0.com/responsible-disclosure` | 404 | path miss (policy via BC) |
| `GET` | `https://auth0.com/login` | 404 | not apex login |
| `GET` | `https://auth0.com/signup` | 200 | signup |
| `GET` | `https://manage.auth0.com/` | 302 | → login hop |
| `GET` | `https://auth0.auth0.com/.well-known/openid-configuration` | 200 | tenant OIDC JSON |
| `GET` | `https://developer.auth0.com/` | 200 | developer |

## CIC bug-bounty tenant

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://manage.cic-bug-bounty.auth0app.com/` | 302→400 | manage hop (session/PKCE class) |
| `GET` | `https://cic-bug-bounty.auth0app.com/` | 000 | DNS fail (wrong host) |
| `GET` | `https://cic.auth0.com/` | 302→200 | CIC product hop |
| `GET` | `https://cic.auth0.com/.well-known/openid-configuration` | 200 | **OIDC JSON this tick** |

## Bounty surface

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | **BC SSoT** |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | Okta joint |
| `GET` | `https://bugcrowd.com/engagements/auth0` | 404 | short slug miss |
| `GET` | `https://hackerone.com/auth0` | 404 | not H1 |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | BC identity |

## Summary
Auth0 BB SSoT **BC auth0-okta** (+ okta). manage **302** login; auth0.auth0 OIDC **200**. security **308**→Okta. CIC manage **302→400**; bare auth0app **000**. cic.auth0 OIDC **200**. H1 **404**.

## Auth readiness (runner-a)
- Product: auth0.com signup + manage.auth0 browser (not prod customer abuse).
- CIC: manage.cic-bug-bounty.auth0app.com with program invite; vault Get Creds op:// only.
- Bounty: BC engagements/auth0-okta.

## Deltas vs P205
- cic.auth0.com OIDC **200** (was 404 class in earlier ticks).
- manage.cic follow **400** (was 302 login-only hop class).
- Core stable: BC auth0-okta+okta 200, manage 302, auth0.auth0 OIDC 200, eng/auth0+H1 404, bare auth0app 000.
