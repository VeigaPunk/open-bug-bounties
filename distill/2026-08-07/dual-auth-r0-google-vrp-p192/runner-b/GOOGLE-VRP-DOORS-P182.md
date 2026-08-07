# GOOGLE-VRP-DOORS-P182
UTC: 2026-08-07T20:32:15Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## VRP + bughunters portal

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bughunters.google.com/` | 200 | portal shell |
| `GET` | `https://bughunters.google.com/learn` | 200 | learn |
| `GET` | `https://bughunters.google.com/report` | 200 | report shell |
| `GET` | `https://bughunters.google.com/about/rules` | 301 | redirect class |
| `GET` | numeric VRP rules path | 301 | → friends/alphabet slug |
| `GET` | google.com/about/appsecurity/reward-program/ | 301 | → bughunters rules |
| `GET` | google.com/about/appsecurity/ | 301 | → about.google |
| `GET` | security.googleblog.com | 301 | → blog.google/security/ |
| `GET` | appsecurity.google.com | 000 | dead this tick |
| `GET` | issuetracker.google.com | 302 | → /issues |

## Accounts / workspace shells

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | accounts.google.com | 302 | → ServiceLogin |
| `GET` | accounts OIDC well-known | 200 | issuer accounts.google.com |
| `GET` | www.googleapis.com OIDC well-known | 404 | not public AS |
| `GET` | oauth2.googleapis.com | 404 | bare |
| `GET` | drive.google.com | 302 | → ServiceLogin continue |
| `GET` | docs.google.com | 302 | → ServiceLogin continue |

## Platform map

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | hackerone.com/google | 200 | soft H1 program |
| `GET` | hackerone.com/googlevrp | 404 | no googlevrp slug |
| `GET` | bugcrowd.com/engagements/google | 404 | not BC |
| `GET` | bugcrowd.com/google | 404 | not BC short |

## Summary
VRP SSoT **bughunters.google.com** (portal+learn+report). Accounts OIDC **200**; Drive/Docs → ServiceLogin. H1 google soft **200**; BC **404**. appsecurity.google.com **000**.

## Auth readiness (runner-b F1)
- Google account browser for Drive/Docs workspace shells.
- VRP submit via bughunters (human).

## Deltas vs P178
- `bughunters.google.com/report` **200** confirmed this tick.
- `hackerone.com/googlevrp` **404** (soft H1 is `/google` only).
- Core portal/OIDC/H1/BC/appsecurity matrix **stable**.
