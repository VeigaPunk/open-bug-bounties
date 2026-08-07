# OKTA-PRODUCT-DOORS-P169
UTC: 2026-08-07T20:04:53Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Okta first-party product

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://www.okta.com/` | 200 | marketing |
| `GET` | `https://www.okta.com/bug-bounty/` | 404 | not first-party BB path |
| `GET` | `https://www.okta.com/company/trust` | 404 | use trust.okta.com |
| `GET` | `https://trust.okta.com/` | 200 | trust center |
| `GET` | `https://status.okta.com/` | 200 | status |
| `GET` | `https://developer.okta.com/` | 200 | developer |
| `GET` | `https://developer.okta.com/signup/` | 200 | signup shell |
| `GET` | `https://login.okta.com/` | 200 | login shell |
| `GET` | `https://login.okta.com/.well-known/openid-configuration` | 200 | OIDC |
| `GET` | `https://www.okta.com/.well-known/openid-configuration` | 404 | not apex |

## Bounty + BC IdP

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | SSoT |
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | Auth0 joint |
| `GET` | login.hackers OIDC default | 200 | BC hacker IdP |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | identity login |
| `GET` | hackers.bugcrowd OIDC well-known | 404 | |

## Set5 oktapreview (passive)

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | integrator-4805164-admin well-known | 403 | |
| `GET` | admin oauth2/default well-known | 401 | |
| `GET` | org well-known | 403 | |
| `GET` | org api/v1/users/me | 403 | unauth |

## Summary
Okta BB SSoT remains **BC engagements/okta** (+ auth0-okta). Product login+developer signup **200**; first-party bug-bounty path **404**. Set5 discovery still **403/401** unauth (no durable headless session).

## Auth readiness (runner-a)
- Product: developer.okta.com signup + login.okta.com browser.
- Set5: needs browser/session_hint path (not curl).
- Bounty: BC okta + auth0-okta.

## Deltas vs P159
- Matrix stable: trust/status 200; Set5 403/401; BC okta+auth0-okta 200.
- No new path flips this tick.
