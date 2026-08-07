# GOOGLE-VRP-DOORS-P212
UTC: 2026-08-07T21:33:43Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Bughunters VRP SSoT

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bughunters.google.com/` | 200 | portal **SSoT** |
| `GET` | `https://bughunters.google.com/learn` | 200 | learn |
| `GET` | `https://bughunters.google.com/report` | 200 | report |
| `GET` | `https://bughunters.google.com/rules` | 404 | bare rules miss |
| `GET` | `https://bughunters.google.com/about/rules` | 301→200 | about rules section |
| `GET` | `https://bughunters.google.com/google-friends` | 404 | slug miss |
| `GET` | `https://g.co/vulnz` | 302→200 | shortlink hop class |

## Google accounts / product hops

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://accounts.google.com/.well-known/openid-configuration` | 200 | OIDC JSON |
| `GET` | `https://accounts.google.com/` | 302→200 | → ServiceLogin chain |
| `GET` | `https://accounts.google.com/ServiceLogin` | 302→200 | → InteractiveLogin class |
| `GET` | `https://drive.google.com/` | 302→200 | login wise hop |
| `GET` | `https://docs.google.com/` | 302→200 | login hop |
| `GET` | `https://oauth2.googleapis.com/` | 404 | bare |
| `GET` | `https://appsecurity.google.com/` | 000 | DNS fail |
| `GET` | `https://www.google.com/about/appsecurity/` | 301→200 | → about.google class |
| `GET` | `https://security.googleblog.com/` | 301→200 | → blog.google/security |
| `GET` | `https://developers.google.com/identity` | 200 | identity docs |

## Program surfaces

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/google` | 200 | soft H1 listing |
| `GET` | `https://hackerone.com/googlevrp` | 404 | slug miss |
| `GET` | `https://bugcrowd.com/engagements/google` | 404 | not on BC |

## Summary
VRP SSoT **bughunters.google.com** (portal/learn/report **200**). `/rules` **404**; `/about/rules` **301→200**. accounts OIDC **200**; apex/ServiceLogin **302** login chain. g.co/vulnz **302→200**. appsecurity host **000**. H1 google soft **200**; googlevrp **404**. BC eng **404**.

## Auth readiness (runner-b)
- VRP: browser bughunters.google.com + Google account.
- Product: accounts InteractiveLogin/ServiceLogin chain.
- H1 google soft only; primary first-party bughunters.

## Deltas vs P202
- bare `/rules` **404** confirmed; about/rules still **301→200**.
- g.co/vulnz shortlink **302→200** (new probe this tick).
- Core stable: bughunters 200, OIDC 200, H1 soft, BC 404, appsecurity 000, Drive/Docs login hops.
