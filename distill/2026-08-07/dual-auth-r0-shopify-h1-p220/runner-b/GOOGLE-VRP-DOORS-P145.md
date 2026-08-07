# GOOGLE-VRP-DOORS-P145
UTC: 2026-08-07T19:17:28Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://bughunters.google.com/` | 200 | VRP portal SSoT |
| `GET` | `https://bughunters.google.com/about/rules/6625378258649088` | 301 | → google-friends/…-vulnerability rules path |
| `GET` | `https://bughunters.google.com/learn` | 200 | - |
| `GET` | `https://accounts.google.com/` | 302 | → ServiceLogin |
| `GET` | `https://accounts.google.com/.well-known/openid-configuration` | 200 | OIDC discovery |
| `GET` | `https://www.googleapis.com/.well-known/openid-configuration` | 404 | - |
| `GET` | `https://oauth2.googleapis.com/` | 404 | bare |
| `GET` | `https://www.google.com/about/appsecurity/` | 301 | → about.google/appsecurity |
| `GET` | `https://hackerone.com/google` | 200 | program SPA shell |
| `GET` | `https://hackerone.com/google-vrp` | 404 | handle not used |
| `GET` | `https://hackerone.com/users/sign_in` | 403 | curl UA gated |
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | OIDC discovery |
| `GET` | `https://api.hackerone.com/v1/me` | 401 | unauth expected |
| `GET` | `https://bugcrowd.com/engagements/google` | 404 | not BC engagement |
| `GET` | `https://bugcrowd.com/h/google` | 200 | soft shell |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | BC IdP shell |
| `GET` | `https://issuetracker.google.com/` | 302 | → /issues |
| `GET` | `https://security.googleblog.com/` | 301 | → blog.google/security/ |

## Summary
Google VRP passive door refresh for runner-b (P145). bughunters portal **200** SSoT; rules path **301** rename; accounts OIDC **200** + ServiceLogin hop; googleapis OIDC **404**. H1 google SPA 200; google-vrp 404; sign_in 403; H1 OIDC 200. BC google bare 404; /h soft 200. Auth readiness: Google account + bughunters browser (not BC).

## Deltas vs P135
- rules numeric path still **301** to google-friends slug (stable).
- security.googleblog **301→blog.google/security/**.
- Core portal + accounts OIDC + H1 google SPA **stable**.
