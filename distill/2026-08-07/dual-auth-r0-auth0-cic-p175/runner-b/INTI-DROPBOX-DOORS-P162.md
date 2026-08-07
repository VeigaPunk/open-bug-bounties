# INTI-DROPBOX-DOORS-P162
UTC: 2026-08-07T19:51:22Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Dropbox product + API

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://www.dropbox.com/login` | 200 | public login shell |
| `GET` | `https://www.dropbox.com/register` | 200 | signup shell |
| `GET` | `https://www.dropbox.com/oauth2/authorize` | 302 | → authorize_error missing_client_id |
| `GET` | `https://www.dropbox.com/developers` | 200 | dev portal |
| `GET` | `https://www.dropbox.com/developers/documentation/http/documentation` | 200 | HTTP docs |
| `GET` | `https://api.dropboxapi.com/2/users/get_current_account` | 400 | unauth (token body required) |
| `GET` | `https://api.dropboxapi.com/` | 404 | bare |
| `GET` | `https://api.dropbox.com/` | 404 | bare |
| `GET` | `https://content.dropboxapi.com/` | 404 | bare |
| `GET` | `https://www.dropbox.com/bug-bounty` | 404 | not first-party path |
| `GET` | `https://www.dropbox.com/security` | 301 | → /features/security |
| `GET` | `https://hackerone.com/dropbox` | 404 | not H1 |
| `GET` | `https://bugcrowd.com/engagements/dropbox` | 200 | BC soft/program surface |

## Intigriti platform + Dropbox program

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://app.intigriti.com/auth/login` | 200 | login shell |
| `GET` | `https://app.intigriti.com/login` | 200 | alias shell |
| `GET` | `https://app.intigriti.com/researcher` | 302 | → auth/researcher then IdP |
| `GET` | `https://app.intigriti.com/programs` | 200 | programs list shell |
| `GET` | `https://login.intigriti.com/` | 302 | → /account/login |
| `GET` | `https://api.intigriti.com/` | 404 | bare |
| `GET` | `https://api.intigriti.com/external/researcher` | 400 | unauth |
| `GET` | `https://www.intigriti.com/programs/dropbox` | 308 | → app.intigriti.com/programs/dropbox/ |
| `GET` | `https://app.intigriti.com/programs/dropbox/detail` | 200 | program detail shell |
| `GET` | `https://www.intigriti.com/researchers` | 200 | researchers |
| `GET` | `https://www.intigriti.com/bug-bounty` | 404 | path drift |

### Follow redirects (-L)
| Start | final | code |
|-------|-------|------|
| app/researcher | login.intigriti.com Account/Login + connect/authorize callback | 200 |
| www/programs/dropbox | app.intigriti.com/programs/dropbox/ | 200 |
| dropbox oauth2/authorize | authorize_error missing_client_id | 200 |

## Summary
Dropbox auth doors stable: login/register 200; OAuth bare missing_client_id; API get_current_account 400. BB SSoT remains **Intigriti Dropbox program** (detail 200); H1 dropbox 404; BC engagements/dropbox 200 soft. Inti researcher hop → login.intigriti connect/authorize.

## Auth readiness (runner-b F4)
- Browser session: dropbox.com login + Inti auth/login + program detail.
- API: needs bearer (400/404 unauth class unchanged).

## Deltas vs prior INTI-DROPBOX cycle
- BC engagements/dropbox **200** this tick (soft presence; Inti remains primary SSoT).
- H1 dropbox still **404**.
- www bug-bounty **404**; security → features/security.
- Inti connect/authorize chain via researcher still green.
