# SHOPIFY-H1-OAUTH-P190
UTC: 2026-08-07T20:48:07Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## HackerOne Shopify + platform

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/shopify` | 200 | SPA program SSoT |
| `GET` | `https://hackerone.com/users/sign_in` | 403 | curl blocked |
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | OIDC |
| `GET` | `https://hackerone.com/.well-known/oauth-authorization-server` | 200 | OAuth AS |
| `GET` | `https://api.hackerone.com/` | 200 | bare |
| `GET` | `https://api.hackerone.com/v1/hackers/me` | 401 | unauth |

## Shopify first-party + accounts

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://www.shopify.com/` | 200 | marketing |
| `GET` | `https://www.shopify.com/bugbounty` | 200 | criteria public SSoT |
| `GET` | `https://www.shopify.com/bug-bounty` | 404 | hyphen |
| `GET` | `https://www.shopify.com/bugbounty/scope` | 404 | not public scope table |
| `GET` | `https://shopify.com/bugbounty/scope` | 301 | → www then 404 class |
| `GET` | `https://accounts.shopify.com/` | 403 | curl blocked |
| `GET` | `https://accounts.shopify.com/lookup` | 403 | curl blocked |
| `GET` | `https://accounts.shopify.com/.well-known/openid-configuration` | 200 | OIDC public |
| `GET` | `https://admin.shopify.com/` | 403 | curl blocked |
| `GET` | `https://partners.shopify.com/` | 301 | → www/partners |
| `GET` | `https://shopify.dev/` | 301 | hop |
| `GET` | `https://shopify.dev/docs/api/admin-rest` | 200 | API docs |

## Platform map

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/engagements/shopify` | 404 | not BC eng |

## Summary
Shopify BB: **H1 /shopify** + **shopify.com/bugbounty**. Scope table **404** public. Accounts OIDC **200** despite accounts apex **403**. BC eng **404**.

## Auth readiness (runner-b)
- H1 browser for program; Shopify accounts/admin browser OAuth.
- No durable curl session.

## Deltas vs P170
- accounts.shopify.com OIDC well-known **200** (new explicit row vs apex 403).
- H1 OAuth-AS **200** confirmed.
- Core H1/bugbounty/scope-404/BC-404 matrix **stable**.
