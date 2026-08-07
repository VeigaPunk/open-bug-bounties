# AIVEN-API-DOORS-P153
UTC: 2026-08-07T19:32:52Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://console.aiven.io/` | 200 | - |
| `GET` | `https://console.aiven.io/login` | 200 | - |
| `GET` | `https://api.aiven.io/` | 301 | → https://api.aiven.io:443/doc/ |
| `GET` | `https://api.aiven.io/v1/me` | 401 | - |
| `GET` | `https://api.aiven.io/v1/project` | 401 | - |
| `GET` | `https://api.aiven.io/doc/` | 200 | - |
| `GET` | `https://aiven.io/` | 200 | - |
| `GET` | `https://aiven.io/docs` | 301 | → https://aiven.io/docs/ |
| `GET` | `https://aiven.io/security` | 404 | - |
| `GET` | `https://aiven.io/security/report` | 404 | - |
| `GET` | `https://status.aiven.io/` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/aiven-mbb-og` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/aiven` | 404 | - |
| `GET` | `https://bugcrowd.com/h/aiven` | 200 | - |
| `GET` | `https://bugcrowd.com/programs/aiven` | 404 | - |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | - |
| `GET` | `https://tracker.bugcrowd.com/aiven` | 302 | → https://tracker.bugcrowd.com/user/sign_in |
| `GET` | `https://help.aiven.io/` | 301 | → https://docs.aiven.io/ |
| `GET` | `https://console.aiven.io/account/login` | 200 | - |
| `GET` | `https://api.aiven.io/v1/userinfo` | 401 | - |

## Summary
Aiven console+API+BC SSoT passive refresh (P153 runner-a). Policy recon only.

## Auth readiness
- BB SSoT: Bugcrowd **aiven-mbb-og** (bare aiven often 404).
- Console login shell + API unauth 401 expected.

## Deltas vs P146
- console + login + account/login **200** stable; API root **301→doc**; v1 me/project/userinfo **401**.
- BC **aiven-mbb-og 200** SSoT; bare aiven + programs **404**; /h soft **200**.
- aiven.io/security(+report) still **404**; status **200**; help→docs.aiven.io **301**.
- Matrix stable vs P146 (no curl-gate flip this tick).
