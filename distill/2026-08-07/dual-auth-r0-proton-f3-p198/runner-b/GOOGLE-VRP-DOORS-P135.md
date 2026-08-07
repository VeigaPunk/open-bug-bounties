# GOOGLE-VRP-DOORS-P135
UTC: 2026-08-07T18:55:08Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://bughunters.google.com/` | 200 | VRP portal SSoT |
| `GET` | `https://bughunters.google.com/about/rules` | 301 | /about/rules/about-this-section |
| `GET` | `https://g.co/vulnz` | 302 | bughunters.google.com |
| `GET` | `https://accounts.google.com/.well-known/openid-configuration` | 200 | OIDC |
| `GET` | `https://accounts.google.com/ServiceLogin` | 302 | /v3/signin/identifier |
| `GET` | `https://www.googleapis.com/oauth2/v3/certs` | 200 | JWKS |
| `GET` | `https://hackerone.com/google` | 200 | H1 handle |
| `GET` | `https://hackerone.com/googlevrp` | 404 | - |
| `GET` | `https://bugcrowd.com/engagements/google` | 404 | - |
| `GET` | `https://bugcrowd.com/h/engagements/google` | 200 | soft shell |
| `GET` | `https://admin.google.com/` | 302 | google.com/sorry captcha gate |
| `GET` | `https://drive.google.com/` | 302 | accounts ServiceLogin |
| `GET` | `https://docs.google.com/` | 302 | accounts ServiceLogin |
| `GET` | `https://www.google.com/about/appsecurity/` | 301 | about.google/appsecurity |
| `GET` | `https://www.google.com/about/appsecurity/reward-program/` | 301 | bughunters rules path |
| `GET` | `https://oauth2.googleapis.com/` | 404 | bare |
| `GET` | `https://www.googleapis.com/` | 404 | bare |

## Summary
Google VRP passive door refresh for runner-b (P135).
- Portal **bughunters.google.com 200**; g.co/vulnz → portal; rules path rename hop.
- Accounts OIDC **200** + googleapis JWKS **200**; ServiceLogin → v3 identifier.
- H1 google **200**; googlevrp **404**; BC bare **404** /h soft **200**.
- admin.google → sorry/captcha; Drive/Docs → login; oauth2/googleapis bare **404**.

## Auth readiness
Google account (browser) for bughunters VRP; H1 google for coordinated disclosure paths. No secrets in distill.
