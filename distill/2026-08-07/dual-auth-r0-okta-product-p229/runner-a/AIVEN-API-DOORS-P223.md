# AIVEN-API-DOORS-P223
UTC: 2026-08-07T21:56:00Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Console product

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://console.aiven.io/` | 200 | SPA shell |
| `GET` | `https://console.aiven.io/login` | 200 | login |
| `GET` | `https://console.aiven.io/signup` | 200 | signup |
| `GET` | `https://console.aiven.io/.well-known/openid-configuration` | 200 | SPA HTML class |
| `GET` | `https://aiven.io/` | 200 | marketing |
| `GET` | `https://docs.aiven.io/` | 301→200 | rehome |

## API + OIDC

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://api.aiven.io/` | 301→200 | → /doc/ class |
| `GET` | `https://api.aiven.io/.well-known/openid-configuration` | 200 | **OIDC JSON** |
| `GET` | `https://api.aiven.io/v1` | 404 | bare v1 |
| `GET` | `https://api.aiven.io/v1/me` | 401 | unauth |
| `GET` | `https://api.aiven.io/v1/project` | 401 | unauth |
| `GET` | `https://api.aiven.io/v1/userinfo` | 401 | unauth |
| `GET` | `https://api.aiven.io/v1/oauth2/authorize` | 401 | unauth oauth entry |
| `GET` | `https://auth.aiven.io/` | 000 | DNS fail |

## Bounty surface

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/engagements/aiven-mbb-og` | 200 | **BC SSoT** |
| `GET` | `https://bugcrowd.com/engagements/aiven` | 404 | short slug miss |
| `GET` | `https://hackerone.com/aiven` | 404 | not H1 |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | BC identity |
| `GET` | `https://bugcrowd.com/user/sign_in` | 302 | sign_in hop class |

## Summary
Aiven BB SSoT **BC aiven-mbb-og** **200**. Console login/signup **200**. API OIDC **200**; me/project/userinfo/oauth2 **401**. api root **301**→doc. auth.aiven **000**. H1 + eng short **404**.

## Auth readiness (runner-a)
- Product: console.aiven.io browser signup/login.
- API: Authorization aivenv1 token via op:// after free tier (not curl durable).
- Bounty: BC engagements/aiven-mbb-og only; @bugcrowdninja email class.

## Deltas vs P213
- Matrix **stable**: console 200, OIDC 200, v1 endpoints 401/404, BC SSoT 200, auth DNS 000, H1 404.
- BC user/sign_in **302** noted (platform hop class).
