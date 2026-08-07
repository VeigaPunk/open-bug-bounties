# OKTA-PRODUCT-DOORS-P219
UTC: 2026-08-07T21:49:07Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Okta first-party product

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://www.okta.com/` | 200 | marketing |
| `GET` | `https://www.okta.com/bug-bounty` | 404 | not first-party BB |
| `GET` | `https://developer.okta.com/signup/` | 200 | signup shell |
| `GET` | `https://login.okta.com/` | 200 | login shell |
| `GET` | `https://login.okta.com/.well-known/openid-configuration` | 200 | OIDC JSON |

## Bounty + BC IdP

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | **SSoT** |
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | Auth0 joint |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | identity login |
| `GET` | `https://login.hackers.bugcrowd.com/.well-known/openid-configuration` | 200 | **OIDC recovered** |

## Set5 oktapreview (passive; no credentials)

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd-pam-5335.oktapreview.com/` | 302→200 | UserHome hop class |
| `GET` | `https://bugcrowd-pam-5335.oktapreview.com/.well-known/openid-configuration` | 200 | OIDC discovery |
| `GET` | `https://bugcrowd-pam-5335.oktapreview.com/api/v1/users/me` | 403 | unauth |
| `GET` | `https://bugcrowd-pam-5335-admin.oktapreview.com/` | 302→200 | admin sso hop class |

## Summary
Okta BB SSoT **BC engagements/okta** (+ auth0-okta). Product login+developer **200**. Set5 pam-5335 OIDC **200**; me **403**. first-party bug-bounty **404**. login.hackers OIDC **200** (recovered).

## Auth readiness (runner-a)
- Product: developer.okta.com signup + login.okta.com browser.
- Set5: browser + op:// vault (not curl durable).
- Bounty: BC okta + auth0-okta.

## Deltas vs P209
- login.hackers OIDC **200** (was **000** DNS last tick).
- Set5 apex/admin still **302** hop class; me **403**.
- Core stable: BC okta+auth0-okta 200, login OIDC 200, first-party BB 404.
