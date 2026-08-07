# GOOGLE-VRP-DOORS-P228
UTC: 2026-08-07T22:05:56Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Bughunters VRP SSoT

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bughunters.google.com/` | 200 | portal **SSoT** |
| `GET` | `https://bughunters.google.com/learn` | 200 | learn |
| `GET` | `https://bughunters.google.com/report` | 200 | report |
| `GET` | `https://bughunters.google.com/rules` | 404 | bare rules miss |
| `GET` | `https://bughunters.google.com/about/rules` | 301→200 | about rules section |
| `GET` | `https://g.co/vulnz` | 302 | shortlink hop class |

## Google accounts / product hops

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://accounts.google.com/.well-known/openid-configuration` | 200 | OIDC JSON |
| `GET` | `https://accounts.google.com/` | 302 | → ServiceLogin chain |
| `GET` | `https://accounts.google.com/ServiceLogin` | 302 | login hop |
| `GET` | `https://drive.google.com/` | 302 | login wise hop |
| `GET` | `https://docs.google.com/` | 302 | login hop |
| `GET` | `https://developers.google.com/identity` | 200 | identity docs |

## Program surfaces

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/google` | 200 | soft H1 listing |
| `GET` | `https://hackerone.com/googlevrp` | 404 | slug miss |
| `GET` | `https://bugcrowd.com/engagements/google` | 404 | not on BC |

## Summary
Google VRP SSoT **bughunters.google.com** portal+learn+report **200**. accounts OIDC **200**. H1 google soft **200**; googlevrp **404**. BC eng **404**. bare /rules **404**.

## Auth readiness (runner-b)
- VRP: bughunters.google.com browser report flow.
- Product: accounts.google.com OIDC + own-test assets only.
- Not BC primary; H1 google is soft listing only.

## Deltas vs P212
- Matrix **stable**: portal 200, OIDC 200, H1 soft 200, BC 404, rules bare 404, g.co/vulnz 302.
