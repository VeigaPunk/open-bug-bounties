# GOOGLE-VRP-DOORS-P202
UTC: 2026-08-07T21:12:24Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Bughunters VRP SSoT

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bughunters.google.com/` | 200 | portal |
| `GET` | `https://bughunters.google.com/learn` | 200 | learn |
| `GET` | `https://bughunters.google.com/report` | 200 | report |
| `GET` | `https://bughunters.google.com/about/rules` | 301 | → `/about/rules/about-this-section` |
| `GET` | `https://bughunters.google.com/about/rules/google-friends` | 404 | slug miss |
| `GET` | `https://bughunters.google.com/dashboard` | 404 | no public dash path |

## Google accounts / product hops

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://accounts.google.com/.well-known/openid-configuration` | 200 | OIDC JSON |
| `GET` | `https://accounts.google.com/` | 302 | → ServiceLogin |
| `GET` | `https://accounts.google.com/ServiceLogin` | 302 | → InteractiveLogin |
| `GET` | `https://drive.google.com/` | 302 | → ServiceLogin wise |
| `GET` | `https://docs.google.com/` | 302 | → ServiceLogin |
| `GET` | `https://oauth2.googleapis.com/` | 404 | bare |
| `GET` | `https://www.googleapis.com/` | 404 | bare |
| `GET` | `https://oauth2.googleapis.com/token` | 404 | GET unauth |
| `GET` | `https://appsecurity.google.com/` | 000 | DNS fail |
| `GET` | `https://www.google.com/about/appsecurity/` | 301 | → about.google/appsecurity |
| `GET` | `https://security.googleblog.com/` | 301 | → blog.google/security/ |
| `GET` | `https://developers.google.com/identity` | 200 | identity docs |
| `GET` | `https://issuetracker.google.com/` | 302 | → /issues |

## Program surfaces

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/google` | 200 | soft H1 listing |
| `GET` | `https://hackerone.com/googlevrp` | 404 | slug miss |
| `GET` | `https://bugcrowd.com/engagements/google` | 404 | not on BC |

## Summary
VRP SSoT **bughunters.google.com** (portal/learn/report **200**). rules path **301** to about-this-section. accounts OIDC **200**; apex/ServiceLogin **302** login chain. appsecurity host **000**. H1 google soft **200**; googlevrp **404**. BC eng **404**.

## Auth readiness (runner-b)
- VRP: browser bughunters.google.com + Google account.
- Product: accounts InteractiveLogin/ServiceLogin chain.
- H1 google soft only; primary first-party bughunters.

## Deltas vs P192
- `/about/rules` **301** (was 200 direct).
- accounts apex + ServiceLogin now **302** hop class (not terminal 200).
- security.googleblog + www appsecurity paths **301** rehomes.
- dashboard probe **404**; token GET **404**.
- Core SSoT stable: bughunters 200, OIDC 200, H1 soft, BC 404, appsecurity 000.
