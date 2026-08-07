# CF-BC-DOORS-P211
UTC: 2026-08-07T21:31:02Z
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
| `GET` | `https://dash.cloudflare.com/` | 403→200 | curl bare 403; -L lands 200 SPA |
| `GET` | `https://dash.cloudflare.com/login` | 200 | login shell |
| `GET` | `https://dash.cloudflare.com/.well-known/openid-configuration` | 200 | **OIDC JSON** issuer dash |
| `GET` | `https://dash.cloudflare.com/.well-known/oauth-authorization-server` | 200 | **HTML SPA class** (not RFC JSON) |
| `GET` | `https://login.cloudflareaccess.com/` | 200 | Access login shell |
| `GET` | `https://developers.cloudflare.com/` | 200 | docs |
| `GET` | `https://cloudflare.com/` | 301→200 | apex hop |

## API (unauth passive)

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://api.cloudflare.com/` | 301→200 | → developers class |
| `GET` | `https://api.cloudflare.com/client/v4/user` | 403 | unauth |
| `GET` | `https://api.cloudflare.com/client/v4/zones` | 403 | unauth |
| `GET` | `https://api.cloudflare.com/client/v4/accounts` | 403 | unauth |
| `GET` | `https://api.cloudflare.com/client/v4/user/tokens/verify` | 400 | unauth bad/missing token class |

## BC + H1 identity (platform)

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://identity.bugcrowd.com/login` | 200 | BC identity |
| `GET` | `https://bugcrowd.com/user/sign_in` | 302→200 | sign_in hop |
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | H1 OIDC |
| `GET` | `https://api.hackerone.com/v1/me` | 401 | unauth |
| `GET` | `https://hackerone.com/security` | 200 | H1 security meta |

## Summary
Cloudflare BB SSoT **H1 /cloudflare** (200). First-party bug-bounty + trust-hub BB + BC eng **404**. Dash OIDC discovery **200** JSON; oauth-authorization-server **200** HTML SPA class. API v4 user/zones/accounts **403**; tokens/verify **400**. BC identity login **200**.

## Auth readiness (runner-a)
- Program: H1 Cloudflare (browser join / policy export).
- Product: dash.cloudflare.com login + OIDC browser; Access via login.cloudflareaccess.com.
- API: Authorization Bearer / API token only after account create (not curl durable).
- BC: no CF engagement; identity still live for other Q-BC programs.

## Deltas vs P201
- tokens/verify **400** (new passive class; still unauth).
- trust-hub reporting-abuse **200**; developers policies bug-bounty path **404**.
- bugcrowd.com/cloudflare bare **404** (confirm no legacy slug).
- Core stable: H1 200 SSoT, dash OIDC 200, API 403, BC eng 404, first-party BB 404.
