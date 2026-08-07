# OKTA-PRODUCT-DOORS-P209
UTC: 2026-08-07T21:26:10Z
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
| `GET` | login.hackers OIDC well-known | 000 | DNS fail this tick |

## Set5 oktapreview (passive; no credentials)

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | bugcrowd-pam-5335 apex | 302 | → UserHome hop class |
| `GET` | pam-5335 org well-known | 200 | OIDC discovery |
| `GET` | pam-5335 api/v1/users/me | 403 | unauth |
| `GET` | pam-5335-admin apex | 302 | → admin sso oidc-entry |

## Summary
Okta BB SSoT **BC engagements/okta** (+ auth0-okta). Product login+developer **200**. Set5 pam-5335 OIDC **200**; me **403**. first-party bug-bounty **404**. login.hackers **000**.

## Auth readiness (runner-a)
- Product: developer.okta.com signup + login.okta.com browser.
- Set5: browser + op:// vault (not curl durable).
- Bounty: BC okta + auth0-okta.

## Deltas vs P199
- login.hackers host **000** DNS this tick (was 200 OIDC).
- Set5 apex reports **302** UserHome hop (cookie/env class possible; treat as passive hop only).
- Core stable: BC okta+auth0-okta 200, login OIDC 200, me 403, first-party BB 404.
