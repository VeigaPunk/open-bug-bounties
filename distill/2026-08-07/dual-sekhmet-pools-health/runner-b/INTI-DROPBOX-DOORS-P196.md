# INTI-DROPBOX-DOORS-P196
UTC: 2026-08-07T21:00:28Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Intigriti platform

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://app.intigriti.com/` | 200 | app shell |
| `GET` | `https://app.intigriti.com/auth/login` | 200 | login |
| `GET` | `https://app.intigriti.com/programs` | 200 | programs |
| `GET` | `https://app.intigriti.com/programs/dropbox/detail` | 200 | **F4 SSoT** |
| `GET` | `https://app.intigriti.com/.well-known/openid-configuration` | 200 | OIDC |
| `GET` | `https://api.intigriti.com/` | 404 | bare API miss |

## Dropbox product

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://www.dropbox.com/` | 200 | apex |
| `GET` | `https://www.dropbox.com/login` | 200 | login |
| `GET` | `https://www.dropbox.com/register` | 200 | register |
| `GET` | `https://www.dropbox.com/developers` | 200 | developers |
| `GET` | `https://www.dropbox.com/oauth2/authorize` | 200 | OAuth (missing_client_id class) |
| `GET` | `https://www.dropbox.com/.well-known/openid-configuration` | 200 | OIDC |
| `GET` | `https://www.dropbox.com/bug-bounty` | 404 | not first-party BB path |
| `GET` | `https://api.dropboxapi.com/` | 404 | bare |
| `GET` | `https://api.dropboxapi.com/2/users/get_current_account` | 400 | unauth/body class |

## Other program hosts

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/dropbox` | 404 | not H1 |
| `GET` | `https://bugcrowd.com/engagements/dropbox` | 200 | soft BC surface |

## Summary
Dropbox BB SSoT **Intigriti programs/dropbox/detail**. Product login/dev/OIDC **200**. API get_current_account **400**. H1 **404**; BC eng soft **200**. First-party bug-bounty **404**.

## Auth readiness (runner-b)
- Inti: app.intigriti.com auth/login browser.
- Dropbox: login + developers OAuth app (op:// tokens not curl durable).
- Bounty: Intigriti Dropbox program primary.

## Deltas vs P186
- Matrix **stable**: Inti detail 200, OIDC 200, Dropbox login/OIDC 200, H1 404, BC soft 200, bug-bounty 404.
