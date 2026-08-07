# GOOGLE-VRP-DOORS-P192
UTC: 2026-08-07T20:52:35Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Bughunters VRP SSoT

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bughunters.google.com/` | 200 | portal |
| `GET` | `https://bughunters.google.com/learn` | 200 | learn |
| `GET` | `https://bughunters.google.com/report` | 200 | report |
| `GET` | `https://bughunters.google.com/about/rules` | 200 | rules |
| `GET` | `https://bughunters.google.com/about/rules/google-friends` | 404 | slug miss this tick |

## Google accounts / product hops

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://accounts.google.com/.well-known/openid-configuration` | 200 | OIDC |
| `GET` | `https://accounts.google.com/` | 200 | accounts apex |
| `GET` | `https://accounts.google.com/ServiceLogin` | 200 | ServiceLogin |
| `GET` | `https://drive.google.com/` | 200 | Drive (login hop class) |
| `GET` | `https://docs.google.com/` | 200 | Docs (login hop class) |
| `GET` | `https://oauth2.googleapis.com/` | 404 | bare |
| `GET` | `https://www.googleapis.com/` | 404 | bare |
| `GET` | `https://appsecurity.google.com/` | 000 | dead this tick |
| `GET` | `https://www.google.com/about/appsecurity/` | 200 | appsecurity marketing |
| `GET` | `https://security.googleblog.com/` | 200 | blog |

## Program surfaces

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/google` | 200 | soft H1 listing |
| `GET` | `https://hackerone.com/googlevrp` | 404 | slug miss |
| `GET` | `https://bugcrowd.com/engagements/google` | 404 | not on BC |

## Summary
VRP SSoT **bughunters.google.com** (portal/learn/report/rules **200**). accounts OIDC **200**. appsecurity.google **000**. H1 google soft **200**; googlevrp **404**. BC eng **404**.

## Auth readiness (runner-b)
- VRP: browser bughunters.google.com + Google account.
- Product: accounts.google.com ServiceLogin.
- H1 google is soft surface only; primary is first-party bughunters.

## Deltas vs P182
- Matrix **stable**: bughunters 200, OIDC 200, H1 soft, BC 404, appsecurity 000.
- **New:** `/about/rules/google-friends` **404** (was slug target earlier).
