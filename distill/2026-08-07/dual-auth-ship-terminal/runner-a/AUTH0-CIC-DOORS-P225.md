# AUTH0-CIC-DOORS-P225
UTC: 2026-08-07T22:00:01Z
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
| `GET` | `https://www.okta.com/` | 200 | parent brand |

## CIC bug-bounty tenant

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://cic.auth0.com/` | 302 | product hop |
| `GET` | `https://cic.auth0.com/.well-known/openid-configuration` | 200 | **OIDC JSON** |
| `GET` | `https://manage.cic.auth0.com/` | 000 | DNS/connect fail |
| `GET` | `https://manage.cic-bug-bounty.auth0app.com/` | 302→400 | manage hop (session/PKCE class) |
| `GET` | `https://cic-bug-bounty.auth0app.com/` | 000 | DNS fail (wrong host) |
| `GET` | `https://auth0app.com/` | 000 | bare DNS fail |

## Bounty surface

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | **BC SSoT** |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | Okta joint |
| `GET` | `https://bugcrowd.com/engagements/auth0` | 404 | short slug miss |
| `GET` | `https://hackerone.com/auth0` | 404 | not H1 |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | BC identity |

## Summary
Auth0 BB SSoT **BC auth0-okta** (+ okta) **200**. manage **302**; auth0.auth0 OIDC **200**. security → Okta. CIC OIDC **200**; manage.cic-bug-bounty **302→400**; manage.cic.auth0 **000**. H1 + eng/auth0 **404**.

## Auth readiness (runner-a)
- Product: developer.auth0.com + manage.auth0.com browser; Get Credentials → op:// only.
- CIC: BC program tenant manage.cic-bug-bounty.auth0app.com (browser after join).
- Bounty: BC auth0-okta + okta; not H1.

## Deltas vs P215
- manage.cic.auth0.com **000** this tick (DNS/connect).
- Matrix otherwise **stable**: BC SSoT 200, OIDC 200, login path 404, H1 404, CIC manage 302→400.
