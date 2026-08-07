# SHOPIFY-H1-OAUTH-P133
UTC: 2026-08-07T18:51:10Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://www.shopify.com/` | 302 | /br locale hop |
| `GET` | `https://www.shopify.com/bugbounty` | 200 | first-party BB landing |
| `GET` | `https://www.shopify.com/bug-bounty` | 404 | hyphen path dead |
| `GET` | `https://hackerone.com/shopify` | 200 | H1 program SSoT |
| `GET` | `https://hackerone.com/shopify/policy_scopes` | 200 | - |
| `GET` | `https://accounts.shopify.com/` | 403 | curl gated |
| `GET` | `https://admin.shopify.com/` | 403 | curl gated |
| `GET` | `https://partners.shopify.com/` | 301 | www.shopify.com/partners |
| `GET` | `https://partners.shopify.com/signup` | 302 | accounts.shopify.com/oauth/authorize?client_id=… |
| `GET` | `https://partners.shopify.com/organizations` | 302 | accounts.shopify.com/oauth/authorize?client_id=… |
| `GET` | `https://checkout.shopify.com/` | 404 | - |
| `GET` | `https://shopify.com/` | 301 | www.shopify.com |
| `GET` | `https://www.shopify.com/partners` | 200 | - |
| `GET` | `https://help.shopify.com/` | 403 | curl gated this tick |
| `GET` | `https://hackerone.com/users/sign_in` | 403 | - |
| `GET` | `https://hackerone.com/users/sign_up` | 403 | - |
| `GET` | `https://hackerone.com/users/password/new` | 200 | - |
| `GET` | `https://api.hackerone.com/` | 200 | - |
| `GET` | `https://api.hackerone.com/v1/me` | 401 | unauth |
| `GET` | `https://api.hackerone.com/v1/hackers/programs` | 401 | unauth |
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/shopify` | 404 | not BC engagement |
| `GET` | `https://bugcrowd.com/h/engagements/shopify` | 200 | soft shell |

## Summary
Shopify+H1 OAuth/doors refresh for runner-b (P133).
- BB SSoT: **www.shopify.com/bugbounty 200** + **hackerone.com/shopify 200** (+ policy_scopes).
- accounts/admin **403** curl; partners signup/orgs → **accounts OAuth authorize**.
- partners root → www partners **301/200**; checkout bare **404**.
- H1 login shells **403**; OIDC **200**; API me/programs **401**.
- BC bare shopify **404**; /h soft **200**. help.shopify **403** this tick.

## Auth readiness
H1 session (browser) for Shopify program; partners path uses accounts.shopify.com OAuth (public client_id in redirect). No secrets in distill.
