# GOOGLE-VRP-DOORS-P178
UTC: 2026-08-07T20:25:01Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## VRP + bughunters portal

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bughunters.google.com/` | 200 | portal shell |
| `GET` | `https://bughunters.google.com/learn` | 200 | learn |
| `GET` | numeric VRP rules path | 301 | → google-friends alphabet VRP slug |
| `GET` | google-friends VRP rules slug | 200 | rules SSoT body |
| `GET` | google.com/about/appsecurity/reward-program/ | 301 | → bughunters numeric rules |
| `GET` | google.com/about/appsecurity/ | 301 | → about.google/appsecurity |
| `GET` | about.google/appsecurity/ | 302 | → company-info/appsecurity |
| `GET` | security.googleblog.com | 301 | → blog.google/security/ |
| `GET` | appsecurity.google.com | 000 | dead this tick |
| `GET` | issuetracker.google.com | 302 | → /issues |

## Accounts / workspace shells

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | accounts.google.com | 302 | → ServiceLogin |
| `GET` | accounts OIDC well-known | 200 | issuer accounts.google.com |
| `GET` | drive.google.com | 302 | → ServiceLogin continue drive |
| `GET` | docs.google.com | 302 | → ServiceLogin continue docs |
| `GET` | oauth2.googleapis.com | 404 | bare |
| `GET` | www.googleapis.com | 404 | bare |

## Platform map

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | hackerone.com/google | 200 | soft H1 |
| `GET` | bugcrowd.com/engagements/google | 404 | not BC SSoT |

## Summary
VRP SSoT **bughunters.google.com** (portal+rules). Accounts OIDC **200**; Drive/Docs → ServiceLogin. H1 google soft **200**; BC eng **404**. appsecurity.google.com **000**.

## Auth readiness (runner-b F1)
- Google account browser for Drive/Docs.
- VRP submit via bughunters (human).

## Deltas vs P166
- about.google/appsecurity **302**→company-info/appsecurity (extra hop).
- Core portal/OIDC/H1/BC matrix **stable**.
