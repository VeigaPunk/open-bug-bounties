# INTI-DROPBOX-DOORS-P186
UTC: 2026-08-07T20:40:11Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Dropbox product + API

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://www.dropbox.com/` | 200 | marketing |
| `GET` | `https://www.dropbox.com/login` | 200 | login shell |
| `GET` | `https://www.dropbox.com/developers` | 200 | dev portal |
| `GET` | `https://www.dropbox.com/bug-bounty` | 404 | not first-party |
| `GET` | `https://www.dropbox.com/.well-known/openid-configuration` | 200 | OIDC |
| `GET` | `https://api.dropboxapi.com/` | 404 | bare |
| `GET` | `https://api.dropboxapi.com/2/users/get_current_account` | 400 | unauth |
| `GET` | `https://hackerone.com/dropbox` | 404 | not H1 |
| `GET` | `https://bugcrowd.com/engagements/dropbox` | 200 | BC soft |

## Intigriti platform + Dropbox program

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://www.intigriti.com/` | 200 | marketing |
| `GET` | `https://app.intigriti.com/` | 307 | hop |
| `GET` | `https://app.intigriti.com/login` | 200 | login alias |
| `GET` | `https://app.intigriti.com/auth/login` | 200 | auth login |
| `GET` | `https://app.intigriti.com/researcher` | 302 | → auth/researcher |
| `GET` | `https://app.intigriti.com/programs` | 200 | programs shell |
| `GET` | `https://app.intigriti.com/programs/dropbox/detail` | 200 | program SSoT |
| `GET` | `https://app.intigriti.com/.well-known/openid-configuration` | 200 | OIDC shell/meta |
| `GET` | `https://login.intigriti.com/` | 302 | → account/login |
| `GET` | `https://api.intigriti.com/` | 404 | bare |
| `GET` | `https://api.intigriti.com/core/researcher` | 404 | path |
| `GET` | `https://www.intigriti.com/researchers` | 200 | researchers |

## Summary
Dropbox BB SSoT **Intigriti programs/dropbox/detail 200**; H1 **404**; BC soft **200**. Dropbox login+OIDC **200**; API account **400**. Inti login shells **200**.

## Auth readiness (runner-b F4)
- Browser: dropbox.com login + Inti auth/login + program detail.
- API: bearer required (400/404 unauth).

## Deltas vs P174
- app.intigriti apex **307** (was not noted); OIDC well-known on app **200**.
- api.intigriti.com/core/researcher **404** (prior external path 400 class).
- Core Inti SSoT / H1 404 / BC soft / Dropbox OIDC matrix **stable**.
