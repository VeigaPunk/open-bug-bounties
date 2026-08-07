# INTI-DROPBOX-DOORS-P216
UTC: 2026-08-07T21:42:34Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Intigriti platform

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://www.intigriti.com/` | 200 | marketing |
| `GET` | `https://app.intigriti.com/` | 307→200 | → www |
| `GET` | `https://app.intigriti.com/auth/login` | 200 | login |
| `GET` | `https://app.intigriti.com/programs` | 200 | programs |
| `GET` | `https://www.intigriti.com/programs/dropbox` | 308→200 | public program hop |
| `GET` | `https://app.intigriti.com/researcher/programs/dropbox` | 302→200 | researcher path |
| `GET` | `https://app.intigriti.com/.well-known/openid-configuration` | 200 | SPA/OIDC shell |
| `GET` | `https://api.intigriti.com/` | 404 | bare API miss |

## Dropbox product

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://www.dropbox.com/` | 200 | apex |
| `GET` | `https://www.dropbox.com/login` | 200 | login |
| `GET` | `https://www.dropbox.com/developers` | 200 | developers |
| `GET` | `https://www.dropbox.com/.well-known/openid-configuration` | 200 | OIDC JSON |
| `GET` | `https://www.dropbox.com/oauth2/authorize` | 302→200 | missing_client_id class |
| `GET` | `https://api.dropboxapi.com/2/users/get_current_account` | 400 | unauth/body class |
| `GET` | `https://www.dropbox.com/bug-bounty` | 404 | not first-party BB |

## Other program hosts

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/dropbox` | 404 | not H1 |
| `GET` | `https://bugcrowd.com/engagements/dropbox` | 200 | soft BC surface |
| `GET` | `https://bugcrowd.com/dropbox` | 302→200 | bare slug hop |

## Summary
Dropbox BB SSoT **Intigriti** program paths (www/app). Product login/dev/OIDC **200**. OAuth bare **302** missing_client_id class. API get_current_account **400**. H1 **404**; BC eng soft **200**. First-party bug-bounty **404**.

## Auth readiness (runner-b)
- Inti: app.intigriti.com auth/login browser.
- Dropbox: login + developers OAuth app (op:// tokens not curl durable).
- Bounty: Intigriti Dropbox program primary.

## Deltas vs P206
- www.intigriti.com/programs/dropbox **308→200** (public marketing hop).
- bugcrowd.com/dropbox bare **302→200** (in addition to eng soft 200).
- Core stable: Inti login/programs 200, Dropbox login/OIDC 200, H1 404, bug-bounty 404, API 400.
