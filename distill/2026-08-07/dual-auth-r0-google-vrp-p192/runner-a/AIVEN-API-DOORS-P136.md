# AIVEN-API-DOORS-P136
UTC: 2026-08-07T18:57:10Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://console.aiven.io/` | 200 | console shell |
| `GET` | `https://console.aiven.io/login` | 200 | - |
| `GET` | `https://console.aiven.io/signup` | 200 | - |
| `GET` | `https://console.aiven.io/.well-known/openid-configuration` | 200 | OIDC |
| `GET` | `https://api.aiven.io/` | 301 | /doc/ |
| `GET` | `https://api.aiven.io/doc` | 301 | /doc/ |
| `GET` | `https://api.aiven.io/v1` | 404 | bare version |
| `GET` | `https://api.aiven.io/v1/me` | 401 | unauth expected |
| `GET` | `https://api.aiven.io/v1/project` | 401 | unauth expected |
| `GET` | `https://api.aiven.io/v1/userinfo` | 401 | unauth expected |
| `GET` | `https://status.aiven.io/` | 200 | - |
| `GET` | `https://aiven.io/` | 200 | - |
| `GET` | `https://aiven.io/security` | 404 | - |
| `GET` | `https://aiven.io/security/bug-bounty` | 404 | - |
| `GET` | `https://bugcrowd.com/engagements/aiven` | 404 | bare slug |
| `GET` | `https://bugcrowd.com/engagements/aiven-mbb-og` | 200 | BC SSoT this tick |
| `GET` | `https://bugcrowd.com/aiven` | 404 | - |
| `GET` | `https://bugcrowd.com/h/engagements/aiven` | 200 | soft shell |
| `GET` | `https://bugcrowd.com/engagements?search=aiven` | 200 | search shell |
| `GET` | `https://auth.aiven.io/` | ERR | - |
| `GET` | `https://identity.aiven.io/` | ERR | - |

## Summary
Aiven console+API+BC passive refresh for runner-a (P136).
- Console + login/signup **200**; console OIDC **200**.
- API root→doc; /v1 bare **404**; me/project/userinfo **401**.
- BC **aiven-mbb-og 200** SSoT (delta vs some ticks where only search shell); bare engagements/aiven **404**.
- First-party security BB paths **404**; auth/identity hosts **ERR**.

## Auth readiness
BC aiven-mbb-og + console.aiven.io login (human). API token post-auth for /v1/*.
