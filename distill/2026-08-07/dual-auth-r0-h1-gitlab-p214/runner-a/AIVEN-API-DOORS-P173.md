# AIVEN-API-DOORS-P173
UTC: 2026-08-07T20:13:10Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Console + product

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://console.aiven.io/` | 200 | SPA shell |
| `GET` | `https://console.aiven.io/login` | 200 | login SPA |
| `GET` | `https://console.aiven.io/signup` | 200 | signup SPA |
| `GET` | `https://console.aiven.io/account/login` | 200 | account login SPA |
| `GET` | `https://console.aiven.io/.well-known/openid-configuration` | 200 | SPA HTML (not JSON OIDC) |
| `GET` | `https://aiven.io/` | 200 | marketing |
| `GET` | `https://aiven.io/security` | 404 | |
| `GET` | `https://aiven.io/bug-bounty` | 404 | BB not first-party path |
| `GET` | `https://aiven.io/docs/platform/howto/create_authentication_token` | 200 | token howto docs |
| `GET` | `https://docs.aiven.io/` | 301 | → aiven.io/ |
| `GET` | `https://identity.aiven.io/` | 000 | dead this tick |
| `GET` | `https://auth.aiven.io/` | 000 | dead this tick |

## API

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://api.aiven.io/` | 301 | → api.aiven.io/doc/ |
| `GET` | `https://api.aiven.io/v1` | 404 | bare v1 |
| `GET` | `https://api.aiven.io/v1/me` | 401 | No valid client certificate presented |
| `GET` | `https://api.aiven.io/v1/project` | 401 | same message |
| `GET` | `https://api.aiven.io/v1/userinfo` | 401 | same class |
| `GET` | `https://api.aiven.io/.well-known/openid-configuration` | 200 | real OIDC JSON; authorize=/v1/oauth2/authorize |

## Bounty platform map

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/engagements/aiven-mbb-og` | 200 | SSoT engagement |
| `GET` | `https://bugcrowd.com/engagements/aiven` | 404 | slug drift |
| `GET` | `https://hackerone.com/aiven` | 404 | not H1 |

## Summary
Console login/signup SPA **200**. API host OIDC JSON **200**; console well-known is SPA shell. Resource paths **401** client-cert class. BC SSoT **aiven-mbb-og**; bare aiven eng + H1 **404**.

## Auth readiness (runner-a)
- Human free-tier: console.aiven.io signup/login.
- API: token/cert required; public unauth closed.
- Bounty: BC aiven-mbb-og only.

## Deltas vs P163
- console OIDC well-known clarified as **SPA HTML** vs api **JSON OIDC**.
- create_authentication_token docs path **200** (was 301 hop on older ticks).
- account/login path **200** added.
- Core 401 cert message + mbb-og SSoT **stable**.
