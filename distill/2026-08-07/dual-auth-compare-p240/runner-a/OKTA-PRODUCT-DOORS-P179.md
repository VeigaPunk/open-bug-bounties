# OKTA-PRODUCT-DOORS-P179
UTC: 2026-08-07T20:27:16Z
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

## Set5 oktapreview (passive; no credentials)

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | bugcrowd-pam-5335 apex | 302 | → UserHome session_hint=AUTHENTICATED (non-durable SPA) |
| `GET` | org well-known | 200 | OIDC discovery public |
| `GET` | org oauth2/default well-known | 200 | default AS discovery |
| `GET` | org api/v1/users/me | 403 | unauth |
| `GET` | admin apex | 302 | → /admin/sso/oidc-entry |
| `GET` | admin well-known | 200 | admin OIDC discovery |
| `GET` | admin oauth2/default well-known | 200 | admin AS discovery |

## Summary
Okta BB SSoT **BC engagements/okta** (+ auth0-okta). Product login+developer signup **200**. Set5 pam-5335 OIDC discovery **200** public; me **403**; UserHome hint not a durable headless session.

## Auth readiness (runner-a)
- Product: developer.okta.com signup + login.okta.com browser.
- Set5: browser + op:// vault item (not curl durable session).
- Bounty: BC okta + auth0-okta.

## Deltas vs P169
- Set5 matrix uses **bugcrowd-pam-5335** hosts (OIDC **200**, not 403 class of other integrator probes).
- admin oauth2/default well-known **200** (was 401 on alternate admin host class).
- Product/BC matrix **stable**.
