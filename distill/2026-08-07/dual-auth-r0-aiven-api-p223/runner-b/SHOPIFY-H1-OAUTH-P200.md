# SHOPIFY-H1-OAUTH-P200
UTC: 2026-08-07T21:08:46Z
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
| `GET` | `https://accounts.shopify.com/.well-known/openid-configuration` | 200 | OIDC |
| `GET` | `https://admin.shopify.com/` | 403 | admin curl class |
| `GET` | `https://partners.shopify.com/` | 200 | partners (-L) |
| `GET` | `https://shopify.dev/` | 200 | developer |
| `GET` | `https://www.shopify.com/` | 200 | marketing |

## H1 platform OAuth

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | OIDC |
| `GET` | `https://hackerone.com/.well-known/oauth-authorization-server` | 200 | OAuth AS |
| `GET` | `https://api.hackerone.com/v1/hackers/me` | 401 | unauth |

## Summary
Shopify BB **H1 shopify** + shopify.com/bugbounty **200**. accounts OIDC **200**; apex/lookup/admin **403**. BC eng **404**. H1 OIDC+AS **200**; me **401**.

## Auth readiness (runner-b)
- H1: browser sign_in + program shopify.
- Shopify product: accounts OIDC via browser (curl 403 on apex).
- Not BC.

## Deltas vs P190
- Matrix **stable**: H1+bugbounty 200, OIDC 200, scope/hyphen 404, BC 404, me 401, admin 403.
- partners **200** after -L (was 301 bare).
