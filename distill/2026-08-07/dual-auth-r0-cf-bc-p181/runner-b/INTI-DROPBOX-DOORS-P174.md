# INTI-DROPBOX-DOORS-P174
UTC: 2026-08-07T20:16:02Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Dropbox product + API

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://www.dropbox.com/login` | 200 | public login shell |
| `GET` | `https://www.dropbox.com/register` | 200 | signup shell |
| `GET` | `https://www.dropbox.com/oauth2/authorize` | 302 | → authorize_error missing_client_id |
| `GET` | `https://www.dropbox.com/developers` | 200 | dev portal |
| `GET` | `https://www.dropbox.com/developers/documentation/http/documentation` | 200 | HTTP docs |
| `GET` | `https://www.dropbox.com/.well-known/openid-configuration` | 200 | OIDC JSON metadata |
| `GET` | `https://api.dropboxapi.com/2/users/get_current_account` | 400 | unauth (token body required) |
| `GET` | `https://api.dropboxapi.com/` | 404 | bare |
| `GET` | `https://api.dropbox.com/` | 404 | bare |
| `GET` | `https://content.dropboxapi.com/` | 404 | bare |
| `GET` | `https://www.dropbox.com/bug-bounty` | 404 | not first-party path |
| `GET` | `https://www.dropbox.com/security` | 301 | → /features/security |
| `GET` | `https://hackerone.com/dropbox` | 404 | not H1 |
| `GET` | `https://bugcrowd.com/engagements/dropbox` | 200 | BC soft surface |

## Intigriti platform + Dropbox program

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://app.intigriti.com/auth/login` | 200 | login shell |
| `GET` | `https://app.intigriti.com/login` | 200 | alias shell |
| `GET` | `https://app.intigriti.com/researcher` | 302 | → auth/researcher |
| `GET` | `https://app.intigriti.com/programs` | 200 | programs list shell |
| `GET` | `https://login.intigriti.com/` | 302 | → /account/login |
| `GET` | `https://api.intigriti.com/` | 404 | bare |
| `GET` | `https://api.intigriti.com/external/researcher` | 400 | unauth |
| `GET` | `https://www.intigriti.com/programs/dropbox` | 308 | → app programs/dropbox/ |
| `GET` | `https://app.intigriti.com/programs/dropbox/detail` | 200 | program detail SSoT |
| `GET` | `https://app.intigriti.com/researcher/programs/dropbox/detail` | 302 | → /programs/dropbox/detail |
| `GET` | `https://www.intigriti.com/researchers` | 200 | researchers |
| `GET` | `https://www.intigriti.com/bug-bounty` | 404 | path drift |

## Summary
Dropbox login/register **200**; OAuth bare **missing_client_id**; API get_current_account **400**. BB SSoT **Intigriti Dropbox program detail 200**; H1 **404**; BC eng soft **200**. Researcher nested path canonicalizes to programs/detail.

## Auth readiness (runner-b F4)
- Browser: dropbox.com login + Inti auth/login + program detail.
- API: bearer required (400/404 unauth class).

## Deltas vs P162
- dropbox well-known OIDC path **200** added.
- researcher/programs/dropbox/detail **302**→programs/dropbox/detail (canonical).
- Core matrix stable: Inti SSoT, H1 404, BC soft 200.
