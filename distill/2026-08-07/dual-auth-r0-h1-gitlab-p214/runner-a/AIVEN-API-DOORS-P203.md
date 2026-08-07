# AIVEN-API-DOORS-P203
UTC: 2026-08-07T21:14:25Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Console product

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://console.aiven.io/` | 200 | SPA shell |
| `GET` | `https://console.aiven.io/login` | 200 | login |
| `GET` | `https://console.aiven.io/signup` | 200 | signup |
| `GET` | `https://console.aiven.io/.well-known/openid-configuration` | 200 | SPA not pure JSON class |
| `GET` | `https://aiven.io/` | 200 | marketing |
| `GET` | `https://docs.aiven.io/` | 301 | → aiven.io |

## API + OIDC

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://api.aiven.io/` | 301 | → api.aiven.io/doc/ |
| `GET` | `https://api.aiven.io/.well-known/openid-configuration` | 200 | OIDC JSON |
| `GET` | `https://api.aiven.io/v1` | 404 | bare v1 |
| `GET` | `https://api.aiven.io/v1/me` | 401 | unauth |
| `GET` | `https://api.aiven.io/v1/project` | 401 | unauth |
| `GET` | `https://api.aiven.io/v1/userinfo` | 401 | unauth |
| `GET` | `https://api.aiven.io/v1/oauth2/authorization` | 404 | wrong path spelling |
| `GET` | `https://api.aiven.io/v1/oauth2/authorize` | 401 | unauth oauth entry |
| `GET` | `https://console.aiven.io/account/login` | 200 | account login |
| `GET` | `https://auth.aiven.io/` | 000 | DNS fail |

## Bounty surface

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/engagements/aiven-mbb-og` | 200 | **BC SSoT** |
| `GET` | `https://bugcrowd.com/engagements/aiven` | 404 | short slug miss |
| `GET` | `https://hackerone.com/aiven` | 404 | not H1 |

## Summary
Aiven BB SSoT **BC aiven-mbb-og**. Console login/signup **200**. API OIDC **200**; me/project/userinfo **401**. api root **301**→doc. auth.aiven **000**.

## Auth readiness (runner-a)
- Product: console.aiven.io browser signup/login.
- API: token via op:// (not curl durable); expect 401 unauth.
- Bounty: BC engagements/aiven-mbb-og only.

## Deltas vs P193
- api.aiven.io bare **301** to /doc/ (was 200 root class).
- docs.aiven.io **301** rehome to aiven.io.
- oauth2/authorization spelling **404** (use authorize path historically).
- Core stable: console 200, OIDC 200, v1 resources 401, BC mbb-og 200, eng/aiven+H1 404, auth 000.

### Extra probes this tick
- `GET /v1/oauth2/authorize` → **401**
- `GET /account/login` → **200**
