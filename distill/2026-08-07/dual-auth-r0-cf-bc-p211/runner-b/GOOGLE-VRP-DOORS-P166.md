# GOOGLE-VRP-DOORS-P166
UTC: 2026-08-07T19:58:56Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## VRP + bughunters portal

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bughunters.google.com/` | 200 | portal shell |
| `GET` | VRP rules (numeric path) | 301 | → google-and-alphabet-vrp-rules slug |
| `GET` | `https://bughunters.google.com/learn` | 200 | learn |
| `GET` | reward-program (google.com/about) | 301 | → bughunters rules path |
| `GET` | `https://www.google.com/about/appsecurity/` | 301 | → about.google/appsecurity |
| `GET` | `https://security.googleblog.com/` | 301 | → blog.google/security/ |
| `GET` | `https://appsecurity.google.com/` | 000 | dead this tick |
| `GET` | `https://issuetracker.google.com/` | 302 | → /issues |

## Accounts / workspace shells

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://accounts.google.com/` | 302 | → ServiceLogin |
| `GET` | `https://accounts.google.com/.well-known/openid-configuration` | 200 | issuer accounts.google.com |
| `GET` | `https://drive.google.com/` | 302 | → ServiceLogin continue drive |
| `GET` | `https://docs.google.com/` | 302 | → ServiceLogin continue docs |
| `GET` | `https://oauth2.googleapis.com/` | 404 | bare |
| `GET` | `https://www.googleapis.com/` | 404 | bare |

OIDC: authorization_endpoint o/oauth2/v2/auth; token_endpoint oauth2.googleapis.com/token.

## Platform map

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/google` | 200 | soft H1 presence |
| `GET` | `https://bugcrowd.com/engagements/google` | 404 | not BC SSoT |

## Summary
VRP SSoT remains **bughunters.google.com** (portal+rules). Accounts OIDC **200**; Drive/Docs → ServiceLogin. H1 google soft **200**; BC eng **404**. appsecurity.google.com **000**.

## Auth readiness (runner-b F1)
- Google account browser session for Drive/Docs product surface.
- VRP submit path via bughunters portal (human).

## Deltas vs P154
- VRP rules numeric path **301** to alphabet VRP slug (path canonicalization).
- appsecurity.google.com **000** (was sometimes soft).
- H1 google still 200; BC still 404.
