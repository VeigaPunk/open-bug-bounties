# SHOPIFY-H1-OAUTH-P170
UTC: 2026-08-07T20:06:58Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## HackerOne Shopify programs

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/shopify` | 200 | SPA program |
| `GET` | `https://hackerone.com/shopify-scripts` | 200 | SPA program |
| `GET` | `https://hackerone.com/users/sign_in` | 403 | curl blocked |
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | OIDC |
| `GET` | `https://api.hackerone.com/v1/hackers/me` | 401 | unauth |

## Shopify first-party + partners auth

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://www.shopify.com/bugbounty` | 200 | criteria shell (SSoT public) |
| `GET` | `https://www.shopify.com/bug-bounty` | 404 | hyphen path |
| `GET` | `https://shopify.com/bugbounty/scope` | 301 | → www; follow: 404|https://www.shopify.com/bugbounty/scope |
| `GET` | `https://www.shopify.com/legal/bug-bounty` | 404 | |
| `GET` | `https://admin.shopify.com/` | 403 | curl |
| `GET` | `https://accounts.shopify.com/` | 403 | curl |
| `GET` | `https://partners.shopify.com/` | 301 | → www.shopify.com/partners |
| `GET` | `https://partners.shopify.com/signup` | 302 | → accounts.shopify.com/oauth/authorize |
| `GET` | `https://partners.shopify.com/organizations` | 302 | → accounts OAuth authorize |
| `GET` | partners orgs (-L) | 403 | lands accounts lookup |
| `GET` | `https://checkout.shopify.com/` | 404 | bare |
| `GET` | shopify.dev authentication docs | 200 | |

## Platform map

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/engagements/shopify` | 404 | not BC eng |
| `GET` | `https://bugcrowd.com/h/shopify` | 200 | soft /h |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | |

## Summary
Shopify BB public SSoT: **H1 shopify (+ scripts)** and **shopify.com/bugbounty**. Admin/accounts **403** curl; partners signup/orgs hop to **accounts OAuth authorize** then lookup **403**. BC eng slug 404.

## Auth readiness (runner-b)
- H1 browser session for program export.
- Shopify partners/admin: browser OAuth (not durable curl).

## Deltas vs P160
- www.shopify.com/bugbounty **200** (criteria live).
- partners → OAuth authorize hop stable; -L ends accounts lookup 403.
- H1 SPA+OIDC stable; sign_in 403; api me 401.
