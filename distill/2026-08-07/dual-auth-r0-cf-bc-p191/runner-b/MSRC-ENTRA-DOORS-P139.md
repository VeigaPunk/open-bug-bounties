# MSRC-ENTRA-DOORS-P139
UTC: 2026-08-07T19:03:12Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://portal.msrc.microsoft.com/` | 302 | msrc.microsoft.com/update-guide |
| `GET` | `https://portal.msrc.microsoft.com/en-us` | 302 | msrc.microsoft.com/update-guide |
| `GET` | `https://portal.msrc.microsoft.com/en-us/researcher` | 302 | msrc.microsoft.com/en-us/researcher |
| `GET` | `https://portal.msrc.microsoft.com/en-us/report` | 302 | msrc.microsoft.com/en-us/report |
| `GET` | `https://msrc.microsoft.com/` | 302 | www.microsoft.com/en-us/msrc |
| `GET` | `https://msrc.microsoft.com/update-guide` | 200 | - |
| `GET` | `https://www.microsoft.com/en-us/msrc` | 200 | - |
| `GET` | `https://www.microsoft.com/en-us/msrc/bounty` | 200 | bounty landing |
| `GET` | `https://www.microsoft.com/en-us/msrc/opensource` | 404 | - |
| `GET` | `https://api.msrc.microsoft.com/cvrf/v3.0/updates` | 200 | public CVRF |
| `GET` | `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration` | 200 | Entra OIDC |
| `GET` | `https://login.microsoftonline.com/common/discovery/v2.0/keys` | 200 | JWKS |
| `GET` | `https://portal.azure.com/` | 200 | unauth shell |
| `GET` | `https://entra.microsoft.com/` | 200 | unauth shell |
| `GET` | `https://account.microsoft.com/` | 302 | consumers oauth2 authorize |
| `GET` | `https://login.live.com/` | 200 | - |
| `GET` | `https://www.office.com/login` | 302 | common oauth2 authorize |

## Summary
MSRC + Entra passive door refresh for runner-b (P139).
- portal.msrc root/en-us → **update-guide**; researcher/report → msrc.microsoft.com paths.
- microsoft.com/msrc + bounty **200**; opensource **404**; cvrf updates **200**.
- Entra common v2 OIDC + keys **200**; azure/entra portals **200** unauth shells.
- account.microsoft → consumers OAuth; office.com/login → AAD authorize.

## Auth readiness
MSA/AAD (browser) for MSRC researcher submit; Entra OIDC public discovery stable. No secrets in distill.
