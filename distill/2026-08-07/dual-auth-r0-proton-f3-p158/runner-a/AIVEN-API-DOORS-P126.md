# AIVEN-API-DOORS-P126
UTC: 2026-08-07T18:37:13Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| URL | code | location/notes |
|-----|------|----------------|
| `https://console.aiven.io/` | 200 | - |
| `https://console.aiven.io/login` | 200 | - |
| `https://console.aiven.io/signup` | 200 | - |
| `https://api.aiven.io/` | 301 | https://api.aiven.io:443/doc/ |
| `https://api.aiven.io/v1` | 404 | - |
| `https://api.aiven.io/v1/me` | 401 | - |
| `https://api.aiven.io/v1/project` | 401 | - |
| `https://api.aiven.io/v1/userinfo` | 401 | - |
| `https://aiven.io/` | 200 | - |
| `https://aiven.io/security` | 404 | - |
| `https://aiven.io/security/bug-bounty` | 404 | - |
| `https://docs.aiven.io/` | 301 | https://aiven.io/ |
| `https://bugcrowd.com/engagements/aiven` | 404 | - |
| `https://bugcrowd.com/aiven` | 404 | - |
| `https://bugcrowd.com/engagements?search=aiven` | 200 | - |
| `https://auth.aiven.io/` | ERR | - |
| `https://identity.aiven.io/` | ERR | - |
| `https://mbb-og.aiven.io/` | ERR | - |
| `https://status.aiven.io/` | 200 | - |

## Summary
Aiven console+API+BC slug posture for runner-a; note engagements/aiven 404 from P122.
