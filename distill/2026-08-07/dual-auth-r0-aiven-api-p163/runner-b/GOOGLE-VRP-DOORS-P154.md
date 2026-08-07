# GOOGLE-VRP-DOORS-P154
UTC: 2026-08-07T19:34:47Z
Policy: passive HTTP recon only (no -L for status). No auth abuse. IdP query scrubbed.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://bughunters.google.com/` | 200 | - |
| `GET` | `https://bughunters.google.com/about/rules` | 301 | → https://bughunters.google.com/about/rules/about-this-section |
| `GET` | `https://bughunters.google.com/learn` | 200 | - |
| `GET` | `https://bughunters.google.com/report` | 200 | - |
| `GET` | `https://accounts.google.com/.well-known/openid-configuration` | 200 | - |
| `GET` | `https://accounts.google.com/ServiceLogin` | 302 | → https://accounts.google.com/InteractiveLogin/?… IdP hop |
| `GET` | `https://www.googleapis.com/.well-known/openid-configuration` | 404 | - |
| `GET` | `https://oauth2.googleapis.com/` | 404 | - |
| `GET` | `https://hackerone.com/google` | 200 | - |
| `GET` | `https://hackerone.com/google-vrp` | 404 | - |
| `GET` | `https://hackerone.com/users/sign_in` | 403 | - |
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | - |
| `GET` | `https://api.hackerone.com/v1/me` | 401 | - |
| `GET` | `https://bugcrowd.com/engagements/google` | 404 | - |
| `GET` | `https://bugcrowd.com/h/google` | 200 | - |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | - |
| `GET` | `https://tracker.bugcrowd.com/google` | 302 | → https://tracker.bugcrowd.com/user/sign_in |
| `GET` | `https://www.google.com/about/appsecurity/` | 301 | → https://about.google/appsecurity |
| `GET` | `https://g.co/vulnz` | 302 | → https://bughunters.google.com/ |

## Summary
Google VRP portal + accounts OIDC + H1/BC map (P154 runner-b). Policy recon only.

## Auth readiness
- VRP SSoT: bughunters.google.com; H1 program google often SPA.
- Browser accounts.google for portal auth; no unauth abuse.

## Deltas vs P145
- portal **200**; rules **301** rename path; learn+report **200**; g.co/vulnz → bughunters.
- accounts OIDC **200** + ServiceLogin→InteractiveLogin; googleapis OIDC **404**.
- H1 google SPA **200**; google-vrp **404**; sign_in **403**; OIDC **200**; api me **401**.
- BC engagements/google **404**; /h soft **200**; identity login **200**.
- Matrix stable vs P145 (no material flip).
