# CF-BC-DOORS-P161
UTC: 2026-08-07T19:49:31Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Cloudflare product + API (curl)

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://dash.cloudflare.com/login` | 200 | public login shell |
| `GET` | `https://dash.cloudflare.com/` | 200 | dash shell |
| `GET` | `https://dash.cloudflare.com/api/v4/user` | 403 | unauth |
| `GET` | `https://api.cloudflare.com/client/v4/user` | 403 | JSON 403; api-version header present |
| `GET` | `https://api.cloudflare.com/client/v4/zones` | 403 | unauth |
| `GET` | `https://api.cloudflare.com/` | 301 | → developers.cloudflare.com/api/ |
| `GET` | `https://developers.cloudflare.com/api/` | 200 | API docs SSoT |
| `GET` | `https://developers.cloudflare.com/fundamentals/api/get-started/` | 200 | get-started |
| `GET` | `https://dash.cloudflare.com/.well-known/openid-configuration` | 200 | issuer=dash.cloudflare.com |
| `GET` | `https://dash.cloudflare.com/.well-known/oauth-authorization-server` | 200 | OAuth AS metadata |
| `GET` | `https://dash.cloudflare.com/oauth2/auth` | 200* | bare → oauth/error invalid_client (no client_id) |
| `GET` | `https://cloudflare.com/.well-known/openid-configuration` | 404 | not apex; use dash |
| `GET` | `https://one.dash.cloudflare.com/` | 301 | → dash.cloudflare.com/one/ |
| `GET` | `https://portal.cloudflare.com/` | 000 | NX/timeout this tick |
| `GET` | `https://hackerone.com/cloudflare` | 200 | H1 program shell |

OIDC issuer snippet: `issuer=https://dash.cloudflare.com`, `authorization_endpoint=.../oauth2/auth`, `token_endpoint=.../oauth2/token`, device_code grant supported.

## Bugcrowd platform + engagement matrix

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/user/sign_in` | 302 | → identity → login.hackers Okta authorize |
| `GET` | `https://bugcrowd.com/user/sign_up` | 200 | → login.bugcrowd.com/signin/register (follow) |
| `GET` | `https://bugcrowd.com/oauth/authorize` | 200 | /h/oauth/authorize shell |
| `GET` | `https://identity.bugcrowd.com/` | 403 | apex still locked |
| `GET` | `https://api.bugcrowd.com/` | 200 | bare |
| `GET` | `https://tracker.bugcrowd.com/` | 200* | with -L lands sign_in |
| `GET` | `https://bugcrowd.com/.well-known/openid-configuration` | 404 | not BC apex |
| `GET` | `https://login.hackers.bugcrowd.com/oauth2/default/.well-known/openid-configuration` | 200 | Okta OIDC SSoT |
| `GET` | `https://auth.bugcrowd.com/` | 000 | dead host this tick |
| `GET` | `https://bugcrowd.com/engagements` | 200 | matrix |
| `GET` | `https://bugcrowd.com/programs` | 301 | → engagements |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | |
| `GET` | `https://bugcrowd.com/engagements/aiven` | 404 | use aiven-mbb-og (prior claims) |
| `GET` | `https://bugcrowd.com/engagements/cloudflare` | 404 | CF bounty is H1 not BC |

## Summary
Cloudflare dash OIDC/OAuth-AS public; API v4 unauth **403**. Cloudflare program on **H1** (BC slug 404). BC IdP chain identity→login.hackers OIDC still SSoT.

## Auth readiness (runner-a)
- CF: dash login + OIDC discovery ready for browser session; API needs token (403).
- BC: hacker OIDC stable; engagement matrix okta 200; cloudflare not on BC.

## Deltas
- New axis slice CF product doors (not covered in recent P148–P160 cycle).
- BC engagement/cloudflare **404** confirms platform split vs H1.
- portal.cloudflare.com **000**; auth.bugcrowd.com **000**.
