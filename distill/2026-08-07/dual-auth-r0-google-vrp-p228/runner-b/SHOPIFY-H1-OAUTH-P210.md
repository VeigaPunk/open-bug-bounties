# SHOPIFY-H1-OAUTH-P210
UTC: 2026-08-07T21:28:01Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Bounty SSoT

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/shopify` | 200 | **H1 program SSoT** |
| `GET` | `https://www.shopify.com/bugbounty` | 200 | first-party policy |
| `GET` | `https://www.shopify.com/bug-bounty` | 404 | hyphen path miss |
| `GET` | `https://bugcrowd.com/engagements/shopify` | 404 | not on BC |

## Shopify accounts / admin

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://accounts.shopify.com/` | 403 | apex curl class |
| `GET` | `https://accounts.shopify.com/lookup` | 403 | lookup curl class |
| `GET` | `https://accounts.shopify.com/.well-known/openid-configuration` | 200 | OIDC JSON |
| `GET` | `https://admin.shopify.com/` | 403 | admin curl class |
| `GET` | `https://partners.shopify.com/` | 301 | → www.shopify.com/partners |
| `GET` | `https://shopify.dev/` | 301 | → shopify.dev/docs |

## H1 platform OAuth

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | OIDC |
| `GET` | `https://hackerone.com/.well-known/oauth-authorization-server` | 200 | OAuth AS |
| `GET` | `https://api.hackerone.com/v1/me` | 401 | unauth |

## Summary
Shopify BB **H1 shopify** + shopify.com/bugbounty **200**. accounts OIDC **200**; apex/lookup/admin **403**. BC eng **404**. H1 OIDC+AS **200**; me **401**.

## Auth readiness (runner-b)
- H1: browser sign_in + program shopify.
- Shopify product: accounts OIDC via browser (curl 403 on apex).
- Not BC.

## Deltas vs P200
- partners + shopify.dev bare **301** (no-follow) vs prior 200 after -L.
- Core stable: H1+bugbounty 200, OIDC 200, hyphen 404, BC 404, me 401, admin/accounts 403.
