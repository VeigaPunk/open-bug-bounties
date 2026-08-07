# AUTH0-CIC-DOORS-P175
UTC: 2026-08-07T20:18:59Z
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
| `GET` | `https://manage.auth0.com/` | 302 | → /login |
| `GET` | `https://manage.auth0.com/login` | 302 | → auth0.auth0.com/authorize PKCE |
| `GET` | `https://manage.cic-bug-bounty.auth0app.com/` | 302 | → /login |
| `GET` | `https://manage.cic-bug-bounty.auth0app.com/login` | 302 | → config.cic-bug-bounty.auth0app.com/authorize PKCE |
| `GET` | `https://cic-bug-bounty.auth0app.com/` | 000 | bare tenant dead |
| `GET` | `https://support.auth0.com/` | 302 | → auth0.auth0.com/authorize prompt=none |

## Bounty map

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | SSoT |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | joint Okta |
| `GET` | `https://bugcrowd.com/engagements/auth0` | 404 | slug drift |
| `GET` | `https://bugcrowd.com/engagements/okta-auth0` | 404 | slug drift |
| `GET` | `https://hackerone.com/auth0` | 404 | not H1 |

## Summary
Auth0 RD → BC **auth0-okta** SSoT (+ okta eng). manage.auth0 → auth0.auth0 authorize PKCE. CIC manage login now authorizes on **config.cic-bug-bounty.auth0app.com**. Bare cic tenant still **000**.

## Auth readiness (runner-a)
- Product: manage.auth0.com browser PKCE.
- CIC BB: manage.cic-bug-bounty.auth0app.com → config host authorize (Get Creds still human).
- Bounty: BC auth0-okta (+ okta).

## Deltas vs P165
- CIC manage login hop target **config.cic-bug-bounty.auth0app.com/authorize** (not only /login shell).
- BC okta eng **200** co-listed with auth0-okta.
- Core RD/security/OIDC/H1 matrix **stable**.
