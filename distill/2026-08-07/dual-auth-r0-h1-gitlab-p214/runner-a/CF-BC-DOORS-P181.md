# CF-BC-DOORS-P181
UTC: 2026-08-07T20:30:10Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Cloudflare product + API (curl, max-redirs 0)

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://dash.cloudflare.com/login` | 200 | public login shell |
| `GET` | `https://dash.cloudflare.com/` | 200 | dash shell |
| `GET` | `https://dash.cloudflare.com/api/v4/user` | 403 | unauth |
| `GET` | `https://api.cloudflare.com/client/v4/user` | 403 | unauth |
| `GET` | `https://api.cloudflare.com/` | 301 | → developers.cloudflare.com/api/ |
| `GET` | `https://developers.cloudflare.com/api/` | 200 | API docs SSoT |
| `GET` | `https://developers.cloudflare.com/fundamentals/api/get-started/` | 200 | get-started |
| `GET` | `https://dash.cloudflare.com/.well-known/openid-configuration` | 200 | issuer=dash.cloudflare.com |
| `GET` | `https://dash.cloudflare.com/.well-known/oauth-authorization-server` | 200 | OAuth AS metadata |
| `GET` | `https://dash.cloudflare.com/oauth2/auth` | 302 | bare (no client_id) redirect class |
| `GET` | `https://www.cloudflare.com/` | 200 | marketing |
| `GET` | `https://www.cloudflare.com/bug-bounty/` | 404 | not first-party BB path |
| `GET` | `https://www.cloudflare.com/disclosure/` | 200 | disclosure page |
| `GET` | `https://www.cloudflare.com/trust-hub/` | 200 | trust hub |
| `GET` | `https://cloudflare.com/.well-known/openid-configuration` | 404 | use dash |
| `GET` | `https://www.cloudflare.com/.well-known/openid-configuration` | 404 | use dash |

OIDC issuer: `https://dash.cloudflare.com`; authz=`/oauth2/auth`; token=`/oauth2/token`; device_code supported.

## Bounty matrix + BC platform

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/cloudflare` | 200 | **H1 SSoT** program shell |
| `GET` | `https://bugcrowd.com/engagements/cloudflare` | 404 | CF not on BC |
| `GET` | `https://bugcrowd.com/cloudflare` | 404 | no short slug |
| `GET` | `https://bugcrowd.com/user/sign_in` | 302 | → identity/hackers IdP |
| `GET` | `https://identity.bugcrowd.com/` | 403 | apex locked |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | login shell |
| `GET` | `https://api.bugcrowd.com/` | 200 | bare |
| `GET` | `https://api.bugcrowd.com/v2` | 404 | not public v2 root |
| `GET` | `https://docs.bugcrowd.com/api/` | 404 | docs path churn this tick |
| `GET` | `https://docs.bugcrowd.com/` | 200 | docs root |
| `GET` | login.hackers oauth2/default well-known | 200 | BC hacker OIDC |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | control |
| `GET` | `https://bugcrowd.com/engagements/aiven` | 404 | use aiven-mbb-og |
| `GET` | `https://bugcrowd.com/engagements/aiven-mbb-og` | 200 | Aiven BC SSoT |

## Summary
Cloudflare BB **H1** (BC engagement **404**). First-party `/bug-bounty/` **404**; disclosure+trust-hub **200**. Dash OIDC/OAuth-AS public; API v4 unauth **403**. BC IdP chain still login.hackers OIDC.

## Auth readiness (runner-a)
- CF: dash browser login + public OIDC discovery; API needs token (403).
- Bounty: H1 cloudflare program shell only (not BC).
- BC platform: identity login + hackers OIDC for non-CF Q-BC work.

## Deltas vs P161
- `www.cloudflare.com/bug-bounty/` **404** and `/disclosure/` **200** confirmed this tick.
- `oauth2/auth` bare **302** (P161 noted 200*→error page with follow).
- `docs.bugcrowd.com/api/` **404** this tick (docs root still 200) — path churn vs older SSoT claim.
- Product/H1/BC matrix otherwise **stable** (H1 200, BC cloudflare 404, API 403, OIDC 200).
