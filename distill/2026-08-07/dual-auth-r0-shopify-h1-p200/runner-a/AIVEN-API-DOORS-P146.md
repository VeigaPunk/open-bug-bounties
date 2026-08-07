# AIVEN-API-DOORS-P146
UTC: 2026-08-07T19:18:56Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://aiven.io/` | 200 | - |
| `GET` | `https://console.aiven.io/` | 200 | console shell |
| `GET` | `https://console.aiven.io/login` | 200 | login shell |
| `GET` | `https://api.aiven.io/` | 301 | → /doc/ |
| `GET` | `https://api.aiven.io/v1/me` | 401 | unauth expected |
| `GET` | `https://api.aiven.io/v1/project` | 401 | unauth expected |
| `GET` | `https://docs.aiven.io/` | 301 | → aiven.io/ |
| `GET` | `https://aiven.io/security` | 404 | first-party path |
| `GET` | `https://aiven.io/security/report` | 404 | - |
| `GET` | `https://status.aiven.io/` | 200 | - |
| `GET` | `https://help.aiven.io/` | 301 | → docs.aiven.io |
| `GET` | `https://bugcrowd.com/engagements/aiven` | 404 | bare handle missing this tick |
| `GET` | `https://bugcrowd.com/engagements/aiven-mbb-og` | 200 | BC SSoT engagement |
| `GET` | `https://bugcrowd.com/h/aiven` | 200 | soft shell |
| `GET` | `https://bugcrowd.com/h/aiven-mbb-og` | 200 | soft shell |
| `GET` | `https://bugcrowd.com/programs/aiven` | 404 | programs era gone |
| `GET` | `https://tracker.bugcrowd.com/aiven` | 302 | → user/sign_in |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | BC IdP shell |

## Summary
Aiven+BC passive door refresh for runner-a (P146). Console+login **200**; API root **301→doc**; v1 me/project **401**. First-party security paths **404**. BC **aiven-mbb-og 200** SSoT; bare engagements/aiven **404** this tick; /h soft 200. Auth readiness: console login + BC aiven-mbb-og join.

## Deltas vs P136
- bare engagements/aiven still **404** (mbb-og remains SSoT).
- console/login + API 401 **stable**.
