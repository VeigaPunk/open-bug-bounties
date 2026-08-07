# AIVEN-API-DOORS-P183
UTC: 2026-08-07T20:34:15Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Console + product

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://console.aiven.io/` | 200 | SPA shell |
| `GET` | `https://console.aiven.io/login` | 200 | login SPA |
| `GET` | `https://console.aiven.io/signup` | 200 | signup SPA |
| `GET` | `https://console.aiven.io/.well-known/openid-configuration` | 200 | SPA HTML (not JSON OIDC) |
| `GET` | `https://aiven.io/` | 200 | marketing |
| `GET` | `https://aiven.io/security` | 404 | |
| `GET` | `https://aiven.io/bug-bounty` | 404 | BB not first-party |
| `GET` | `https://docs.aiven.io/` | 301 | → aiven.io/ |
| `GET` | `https://help.aiven.io/` | 301 | help hop |
| `GET` | `https://auth.aiven.io/` | 000 | dead this tick |

## API

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://api.aiven.io/` | 301 | → /doc/ |
| `GET` | `https://api.aiven.io/doc/` | 200 | API docs |
| `GET` | `https://api.aiven.io/v1/me` | 401 | unauth/cert class |
| `GET` | `https://api.aiven.io/v1/project` | 401 | unauth/cert class |
| `GET` | `https://api.aiven.io/v1/userinfo` | 401 | unauth/cert class |
| `GET` | `https://api.aiven.io/.well-known/openid-configuration` | 200 | real OIDC JSON |

## Bounty platform map

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/engagements/aiven-mbb-og` | 200 | SSoT |
| `GET` | `https://bugcrowd.com/engagements/aiven` | 404 | slug drift |
| `GET` | `https://hackerone.com/aiven` | 404 | not H1 |

## Summary
Console login/signup **200**. API OIDC JSON **200**; console well-known SPA. Resource paths **401**. BC SSoT **aiven-mbb-og**; H1 **404**. auth.aiven.io **000**.

## Auth readiness (runner-a)
- Human free-tier: console.aiven.io signup/login.
- API: token/cert required.
- Bounty: BC aiven-mbb-og only.

## Deltas vs P173
- api.aiven.io/doc/ **200** confirmed without follow.
- help.aiven.io **301** noted.
- Core 401 + mbb-og + OIDC matrix **stable**.
