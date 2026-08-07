# CF-BC-DOORS-P231
UTC: 2026-08-07T22:11:45Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Bounty SSoT

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/cloudflare` | 200 | **H1 SSoT** |
| `GET` | `https://www.cloudflare.com/bug-bounty/` | 404 | no first-party path |
| `GET` | `https://www.cloudflare.com/disclosure/` | 200 | disclosure hub |
| `GET` | `https://www.cloudflare.com/trust-hub/bug-bounty/` | 404 | trust-hub BB path dead |
| `GET` | `https://www.cloudflare.com/en-gb/trust-hub/reporting-abuse/` | 200 | abuse report shell |
| `GET` | `https://developers.cloudflare.com/fundamentals/reference/policies-compliances/bug-bounty/` | 404 | docs BB path dead |
| `GET` | `https://bugcrowd.com/engagements/cloudflare` | 404 | no BC eng |
| `GET` | `https://bugcrowd.com/cloudflare` | 404 | bare BC slug dead |

## Product auth doors

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://dash.cloudflare.com/` | 403 | bare + `-L` both **403** (curl class) |
| `GET` | `https://dash.cloudflare.com/login` | 403 | was 200 @ P211; now curl **403** |
| `GET` | `https://dash.cloudflare.com/.well-known/openid-configuration` | 200 | **OIDC JSON** `application/json` |
| `GET` | `https://dash.cloudflare.com/.well-known/oauth-authorization-server` | 200 | **HTML SPA** `text/html` |
| `GET` | `https://login.cloudflareaccess.com/` | 200 | Access login shell |
| `GET` | `https://developers.cloudflare.com/` | 200 | docs |

## API (unauth passive)

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://api.cloudflare.com/` | 200 | docs class (`-L`) |
| `GET` | `https://api.cloudflare.com/client/v4/user` | 403 | unauth |
| `GET` | `https://api.cloudflare.com/client/v4/zones` | 403 | unauth |
| `GET` | `https://api.cloudflare.com/client/v4/accounts` | 403 | unauth |
| `GET` | `https://api.cloudflare.com/client/v4/user/tokens/verify` | 400 | unauth bad/missing token class |

## BC + H1 identity (platform)

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://identity.bugcrowd.com/login` | 200 | BC identity |
| `GET` | `https://bugcrowd.com/user/sign_in` | 200 | sign_in `-L` land |
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | H1 OIDC |
| `GET` | `https://api.hackerone.com/v1/me` | 401 | unauth |
| `GET` | `https://hackerone.com/security` | 200 | H1 security meta |

## Summary
Cloudflare BB SSoT **H1 /cloudflare** (200). First-party bug-bounty + trust-hub BB + BC eng **404**. Dash OIDC discovery **200** JSON; oauth-authorization-server **200** HTML SPA. **Delta:** dash apex + `/login` now **403** even with `-L` (stricter bot/curl gate vs P211). API v4 user/zones/accounts **403**; tokens/verify **400**. BC identity **200**.

## Auth readiness (runner-a)
- Program: H1 Cloudflare (browser join / policy export).
- Product: dash OIDC well-known still public JSON; interactive login requires browser (curl 403).
- Access: login.cloudflareaccess.com shell 200.
- API: Bearer / API token after account (not curl durable).
- BC: no CF engagement; identity live for other Q-BC.

## Deltas vs P211
- dash `/` and `/login`: **403** with `-L` (P211: 403→200 SPA / login 200).
- Core stable: H1 200 SSoT, dash OIDC JSON 200, oauth-AS HTML 200, API 403/400, BC eng 404, first-party BB 404, Access 200.
