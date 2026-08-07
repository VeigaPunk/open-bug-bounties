# OKTA-PRODUCT-DOORS-P189
UTC: 2026-08-07T20:46:19Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Okta first-party product

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://www.okta.com/` | 200 | marketing |
| `GET` | `https://www.okta.com/bug-bounty/` | 404 | not first-party BB |
| `GET` | `https://trust.okta.com/` | 200 | trust center |
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

## Set5 oktapreview (passive; no credentials)

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | bugcrowd-pam-5335 apex | 302 | → UserHome session_hint class |
| `GET` | org well-known | 200 | OIDC discovery |
| `GET` | org oauth2/default well-known | 200 | default AS |
| `GET` | org api/v1/users/me | 403 | unauth |
| `GET` | admin apex | 302 | → admin sso entry class |
| `GET` | admin well-known | 200 | admin OIDC |
| `GET` | admin oauth2/default well-known | 200 | admin AS |

## Summary
Okta BB SSoT **BC engagements/okta** (+ auth0-okta). Product login+developer **200**. Set5 pam-5335 OIDC **200**; me **403**.

## Auth readiness (runner-a)
- Product: developer.okta.com signup + login.okta.com browser.
- Set5: browser + op:// vault (not curl durable).
- Bounty: BC okta + auth0-okta.

## Deltas vs P179
- Matrix **stable**: product/BC/Set5 OIDC 200, me 403, BB slug 404 first-party.
