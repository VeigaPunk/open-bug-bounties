# AUTH0-CIC-DOORS-P185
UTC: 2026-08-07T20:38:12Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Auth0 product surfaces

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://auth0.com/` | 200 | marketing |
| `GET` | `https://auth0.com/security` | 308 | → security.okta.com |
| `GET` | `https://auth0.com/responsible-disclosure-policy` | 308 | → BC auth0-okta |
| `GET` | `https://auth0.com/docs` | 200 | docs |
| `GET` | `https://auth0.com/blog` | 308 | hop |
| `GET` | `https://developer.auth0.com/` | 200 | developer |
| `GET` | `https://cdn.auth0.com/` | 200 | CDN |
| `GET` | `https://auth0.auth0.com/.well-known/openid-configuration` | 200 | tenant OIDC |
| `GET` | `https://login.auth0.com/.well-known/openid-configuration` | 404 | not login host |

## Manage + CIC bug-bounty tenant

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://manage.auth0.com/` | 302 | → /login |
| `GET` | `https://manage.auth0.com/login` | 302 | → authorize PKCE |
| `GET` | `https://manage.cic-bug-bounty.auth0app.com/` | 302 | → /login |
| `GET` | `https://manage.cic-bug-bounty.auth0app.com/.well-known/openid-configuration` | 404 | not on manage host |
| `GET` | `https://cic-bug-bounty.auth0app.com/` | 000 | bare tenant dead |
| `GET` | bare cic well-known | 000 | dead |

## Bounty map

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | SSoT |
| `GET` | `https://bugcrowd.com/engagements/auth0` | 404 | slug drift |
| `GET` | `https://hackerone.com/auth0` | 404 | not H1 |

## Summary
Auth0 RD → BC **auth0-okta**. manage.auth0 PKCE hop. CIC manage **302**; bare cic tenant **000**. auth0.auth0 OIDC **200**. H1 **404**.

## Auth readiness (runner-a)
- Product: manage.auth0.com browser PKCE.
- CIC BB: manage.cic-bug-bounty.auth0app.com (Get Creds human).
- Bounty: BC auth0-okta.

## Deltas vs P175
- manage.cic well-known **404**; developer.auth0.com **200** noted.
- Core RD→BC / manage PKCE / bare cic 000 / H1 404 matrix **stable**.
