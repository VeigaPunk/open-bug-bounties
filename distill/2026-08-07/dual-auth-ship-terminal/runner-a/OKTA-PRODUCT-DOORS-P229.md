# OKTA-PRODUCT-DOORS-P229
UTC: 2026-08-07T22:07:51Z
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
| `GET` | `https://login.hackers.bugcrowd.com/.well-known/openid-configuration` | 200 | hackers OIDC |

## Set5 oktapreview (passive; no credentials)

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd-pam-5335.oktapreview.com/` | 302→200 | UserHome hop class (session_hint class) |
| `GET` | `https://bugcrowd-pam-5335.oktapreview.com/.well-known/openid-configuration` | 200 | OIDC discovery |
| `GET` | `https://bugcrowd-pam-5335.oktapreview.com/api/v1/users/me` | 403 | unauth |
| `GET` | `https://bugcrowd-pam-5335-admin.oktapreview.com/` | 302→200 | admin sso hop class |

## Summary
Okta BB SSoT **BC engagements/okta** (+ auth0-okta). Product login+developer **200**. Set5 pam-5335 OIDC **200**; me **403**. first-party bug-bounty **404**. login.hackers OIDC **200**.

## Auth readiness (runner-a)
- Product: developer.okta.com signup + login.okta.com browser.
- Set5: browser + op://Personal/Bugcrowd Org (Set 5) Okta (not curl durable).
- Bounty: BC okta + auth0-okta.

## Deltas vs P219
- Matrix **stable**: BC SSoT 200, product OIDC 200, Set5 OIDC 200, me 403, first-party BB 404, hackers OIDC 200.
