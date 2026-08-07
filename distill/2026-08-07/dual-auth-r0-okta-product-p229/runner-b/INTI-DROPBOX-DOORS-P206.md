# INTI-DROPBOX-DOORS-P206
UTC: 2026-08-07T21:20:30Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Intigriti platform

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://app.intigriti.com/` | 307 | → www.intigriti.com |
| `GET` | `https://app.intigriti.com/auth/login` | 200 | login |
| `GET` | `https://app.intigriti.com/programs` | 200 | programs |
| `GET` | `https://app.intigriti.com/programs/dropbox/detail` | (extra) | **F4 SSoT candidate** |
| `GET` | `https://app.intigriti.com/researcher/programs/dropbox/dropbox` | 302 | → /programs/dropbox/dropbox |
| `GET` | `https://app.intigriti.com/.well-known/openid-configuration` | 200 | SPA/OIDC shell class |
| `GET` | `https://api.intigriti.com/` | 404 | bare API miss |
| `GET` | `https://www.intigriti.com/` | 200 | marketing |

## Dropbox product

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://www.dropbox.com/login` | 200 | login |
| `GET` | `https://www.dropbox.com/developers` | 200 | developers |
| `GET` | `https://www.dropbox.com/oauth2/authorize` | 302 | → authorize_error missing_client_id |
| `GET` | `https://www.dropbox.com/.well-known/openid-configuration` | 200 | OIDC JSON |
| `GET` | `https://www.dropbox.com/bug-bounty` | 404 | not first-party BB path |
| `GET` | `https://api.dropboxapi.com/2/users/get_current_account` | 400 | unauth/body class |

## Other program hosts

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/dropbox` | 404 | not H1 |
| `GET` | `https://bugcrowd.com/engagements/dropbox` | 200 | soft BC surface |

## Summary
Dropbox BB SSoT **Intigriti Dropbox program paths**. Product login/dev/OIDC **200**. OAuth bare **302** missing_client_id. API get_current_account **400**. H1 **404**; BC eng soft **200**. First-party bug-bounty **404**.

## Auth readiness (runner-b)
- Inti: app.intigriti.com auth/login browser.
- Dropbox: login + developers OAuth app (op:// tokens not curl durable).
- Bounty: Intigriti Dropbox program primary.

## Deltas vs P196
- app.intigriti apex **307**→www (was 200 shell).
- oauth2/authorize **302** error_detail missing_client_id (was 200 page class).
- researcher program path **302** rewrite to programs/dropbox/dropbox.
- Core stable: Inti login/programs 200, Dropbox login/OIDC 200, H1 404, BC soft 200, bug-bounty 404.

### Extra probes this tick
- programs/dropbox/detail → **200**
- programs/dropbox/dropbox → **302**
- dropbox register → **200**
- dropbox apex → **200**
