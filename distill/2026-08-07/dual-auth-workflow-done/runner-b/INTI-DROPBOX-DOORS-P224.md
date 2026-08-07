# INTI-DROPBOX-DOORS-P224
UTC: 2026-08-07T21:58:11Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Intigriti platform

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://www.intigriti.com/` | 200 | marketing |
| `GET` | `https://app.intigriti.com/` | 307→200 | → www |
| `GET` | `https://login.intigriti.com/` | 200 | → account/login |
| `GET` | `https://login.intigriti.com/.well-known/openid-configuration` | 200 | **IdP OIDC JSON** |
| `GET` | `https://app.intigriti.com/.well-known/openid-configuration` | 200 | SPA/OIDC shell |
| `GET` | `https://app.intigriti.com/auth/login` | 200 | app login shell |
| `GET` | `https://app.intigriti.com/programs` | 200 | programs |
| `GET` | `https://app.intigriti.com/researcher/programs` | 302→200 | → login.intigriti OIDC authorize class |
| `GET` | `https://app.intigriti.com/programs/dropbox/dropbox` | 301→200 | → detail |
| `GET` | `https://app.intigriti.com/researcher/programs/dropbox/dropbox` | 302→200 | → programs/.../detail |
| `GET` | `https://api.intigriti.com/` | 404 | bare API miss |

## Dropbox product

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://www.dropbox.com/` | 200 | apex |
| `GET` | `https://www.dropbox.com/login` | 200 | login |
| `GET` | `https://www.dropbox.com/developers` | 200 | developers |
| `GET` | `https://www.dropbox.com/.well-known/openid-configuration` | 200 | OIDC JSON |
| `GET` | `https://www.dropbox.com/oauth2/authorize` | 302 | missing_client_id class (bare) |
| `GET` | `https://api.dropboxapi.com/2/users/get_current_account` | 400 | unauth/body class |
| `GET` | `https://www.dropbox.com/bug-bounty` | 404 | not first-party BB |

## Other program hosts

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/dropbox` | 404 | not H1 |
| `GET` | `https://bugcrowd.com/engagements/dropbox` | 200 | soft BC surface |
| `GET` | `https://bugcrowd.com/dropbox` | 302→200 | → eng/dropbox |

## Summary
Dropbox BB SSoT **Intigriti** dropbox/dropbox detail **200**. login.intigriti **OIDC 200** (IdP). Product login/dev/OIDC **200**. OAuth bare **302**. API get_current_account **400**. H1 **404**; BC eng soft **200**. First-party bug-bounty **404**.

## Auth readiness (runner-b)
- Inti: login.intigriti.com OIDC + app.intigriti.com auth/login browser (op:// Intigriti).
- Dropbox: login + developers OAuth app (tokens not curl durable).
- Bounty: Intigriti Dropbox primary (F4 XOR H2).

## Deltas vs P216
- login.intigriti.com OIDC discovery **200** (new IdP row).
- researcher/programs unauth lands **login.intigriti OIDC authorize** class.
- programs/dropbox/dropbox → **detail** 200 confirmed.
- Core stable: Dropbox OIDC/login 200, H1 404, bug-bounty 404, API 400, BC eng 200.
