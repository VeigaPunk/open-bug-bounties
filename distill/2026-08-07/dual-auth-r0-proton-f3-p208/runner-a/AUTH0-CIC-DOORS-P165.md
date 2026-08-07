# AUTH0-CIC-DOORS-P165
UTC: 2026-08-07T19:57:04Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Auth0 product surfaces

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://auth0.com/` | 200 | marketing |
| `GET` | `https://auth0.com/login` | 404 | path drift |
| `GET` | `https://auth0.com/signup` | 200 | signup |
| `GET` | `https://auth0.com/u/login` | 404 | bare u/login |
| `GET` | `https://auth0.com/security` | 308 | → security.okta.com |
| `GET` | `https://auth0.com/responsible-disclosure-policy` | 308 | → bugcrowd.com/auth0-okta |
| `GET` | `https://auth0.com/docs` | 200 | docs |
| `GET` | `https://auth0.com/.well-known/openid-configuration` | 404 | not apex |
| `GET` | `https://login.auth0.com/` | 302 | → auth0.com |
| `GET` | `https://cdn.auth0.com/` | 200 | CDN shell |
| `GET` | `https://auth0.auth0.com/.well-known/openid-configuration` | 200 | tenant OIDC |

## Manage + CIC bug-bounty tenant

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://manage.auth0.com/` | 302 | → /login then auth0.auth0.com/authorize (PKCE) |
| `GET` | `https://manage.auth0.com/login` | 302 | login hop |
| `GET` | `https://manage.cic-bug-bounty.auth0app.com/` | 302 | → /login |
| `GET` | `https://manage.cic-bug-bounty.auth0app.com/login` | 302 | CIC manage login |
| `GET` | `https://cic-bug-bounty.auth0app.com/` | 000 | bare tenant ERR this tick |
| `GET` | `https://support.auth0.com/` | 302 | → auth0.auth0.com/authorize (prompt=none) |

## Bounty map

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | SSoT |
| `GET` | `https://bugcrowd.com/engagements/auth0` | 404 | slug drift |
| `GET` | `https://bugcrowd.com/engagements/okta-auth0` | 404 | slug drift |
| `GET` | `https://hackerone.com/auth0` | 404 | not H1 |

### Follow (-L)
| Start | final class | code |
|-------|-------------|------|
| manage.auth0.com | auth0.auth0.com/authorize PKCE | 302 chain |
| auth0.com/security | security.okta.com | 200 |
| RD policy | bugcrowd engagements/auth0-okta | 200 |
| support.auth0.com | login/callback error=login_required | 302 |

## Summary
Auth0 RD → BC **auth0-okta** SSoT. manage UL authorize PKCE hop stable. CIC manage host up (login hop); bare cic-bug-bounty.auth0app.com **000**. auth0.com/login still **404**; signup **200**.

## Auth readiness (runner-a)
- Product session: manage.auth0.com browser authorize.
- CIC BB tenant: manage.cic-bug-bounty.auth0app.com (Get Creds path still human).
- Bounty: BC auth0-okta only.

## Deltas vs P151
- RD policy 308 now lands BC auth0-okta (was soft BC map).
- security → security.okta.com stable.
- bare CIC tenant still **000**; manage CIC **302→login**.
