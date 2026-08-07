# SHOPIFY-H1-OAUTH-P160
UTC: 2026-08-07T19:46:44Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://hackerone.com/shopify` | 200 | - |
| `GET` | `https://hackerone.com/shopify-scripts` | 200 | - |
| `GET` | `https://hackerone.com/users/sign_in` | 403 | - |
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | - |
| `GET` | `https://hackerone.com/oauth/authorize` | 302 | → https://hackerone.com/users/sign_in |
| `GET` | `https://api.hackerone.com/v1/me` | 401 | - |
| `GET` | `https://accounts.shopify.com/` | 403 | - |
| `GET` | `https://admin.shopify.com/` | 403 | - |
| `GET` | `https://partners.shopify.com/` | 301 | → https://www.shopify.com/partners |
| `GET` | `https://partners.shopify.com/organizations` | 302 | → https://accounts.shopify.com/oauth/authorize (auth hop) |
| `GET` | `https://shopify.dev/` | 301 | → https://shopify.dev/docs |
| `GET` | `https://shopify.dev/docs/apps/auth` | 301 | → https://shopify.dev/docs/apps/build/authentication-authorization |
| `GET` | `https://www.shopify.com/legal/bug-bounty` | 404 | - |
| `GET` | `https://bugcrowd.com/engagements/shopify` | 404 | - |
| `GET` | `https://bugcrowd.com/h/shopify` | 200 | - |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | - |
| `GET` | `https://www.shopify.com/` | 200 | - |

## Summary
Shopify H1 programs + accounts/partners OAuth map (P160 runner-b).

## Auth readiness
- BB SSoT: HackerOne shopify (+ shopify-scripts).
- partners OAuth hop; accounts/admin often curl-gated.

## Deltas vs P143
- H1 shopify+shopify-scripts SPA **200**; OIDC **200**; oauth→sign_in; sign_in **403**; api me **401** — stable.
- accounts/admin **403** curl; partners orgs → accounts OAuth authorize hop; partners apex→www/partners.
- legal/bug-bounty **404**; shopify.dev auth docs rename hop; BB SSoT remains H1.
- BC engagements/shopify **404**; /h soft **200**; identity login **200**.
