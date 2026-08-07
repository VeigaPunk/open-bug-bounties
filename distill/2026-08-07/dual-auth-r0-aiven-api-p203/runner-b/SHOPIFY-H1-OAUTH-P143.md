# SHOPIFY-H1-OAUTH-P143
UTC: 2026-08-07T19:12:57Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://www.shopify.com/` | 200 | - |
| `GET` | `https://accounts.shopify.com/` | 403 | curl UA gated |
| `GET` | `https://accounts.shopify.com/lookup` | 403 | curl UA gated |
| `GET` | `https://admin.shopify.com/` | 403 | curl UA gated |
| `GET` | `https://partners.shopify.com/` | 301 | → www.shopify.com/partners |
| `GET` | `https://partners.shopify.com/organizations` | 302 | → accounts.shopify.com/oauth/authorize (partners OAuth hop) |
| `GET` | `https://shopify.dev/` | 301 | → /docs |
| `GET` | `https://shopify.dev/docs/api/usage/authentication` | 200 | auth docs |
| `GET` | `https://www.shopify.com/legal/bug-bounty` | 404 | first-party BB path gone |
| `GET` | `https://hackerone.com/shopify` | 200 | program SPA shell |
| `GET` | `https://hackerone.com/shopify-scripts` | 200 | program SPA shell |
| `GET` | `https://hackerone.com/users/sign_in` | 403 | curl UA gated |
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | OIDC discovery |
| `GET` | `https://hackerone.com/.well-known/oauth-authorization-server` | 200 | OAuth AS meta |
| `GET` | `https://api.hackerone.com/` | 200 | - |
| `GET` | `https://api.hackerone.com/v1/me` | 401 | unauth expected |
| `GET` | `https://bugcrowd.com/engagements/shopify` | 404 | not BC engagement |
| `GET` | `https://bugcrowd.com/h/shopify` | 200 | soft shell |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | BC IdP shell |

## Summary
Shopify+H1 passive door refresh for runner-b (P143). Shopify accounts/admin **403** curl; partners orgs **302** OAuth authorize hop; first-party legal/bug-bounty **404**. H1 Shopify BB SSoT: program SPA 200, OIDC+OAuth AS 200, sign_in 403, API me 401. BC bare shopify 404; /h soft 200. Auth readiness remains H1+browser (accounts gated).

## Deltas vs P133
- partners.shopify.com apex **301→www.shopify.com/partners** (stable pattern).
- accounts/admin still **403** curl gate.
- Core H1 OIDC/OAuth AS + program shells **stable**.
- legal/bug-bounty still **404** (H1 remains policy SSoT).
