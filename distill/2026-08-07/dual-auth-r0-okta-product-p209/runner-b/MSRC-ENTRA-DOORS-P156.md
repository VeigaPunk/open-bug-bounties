# MSRC-ENTRA-DOORS-P156
UTC: 2026-08-07T19:39:25Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://msrc.microsoft.com/` | 302 | → https://www.microsoft.com/en-us/msrc |
| `GET` | `https://www.microsoft.com/en-us/msrc` | 200 | - |
| `GET` | `https://www.microsoft.com/en-us/msrc/bounty` | 200 | - |
| `GET` | `https://www.microsoft.com/en-us/msrc/report` | 404 | - |
| `GET` | `https://msrc.microsoft.com/update-guide` | 200 | - |
| `GET` | `https://api.msrc.microsoft.com/` | 404 | - |
| `GET` | `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration` | 200 | - |
| `GET` | `https://login.microsoftonline.com/organizations/v2.0/.well-known/openid-configuration` | 200 | - |
| `GET` | `https://login.microsoft.com/` | 302 | → https://www.office.com/login (auth hop) |
| `GET` | `https://portal.azure.com/` | 200 | - |
| `GET` | `https://entra.microsoft.com/` | 200 | - |
| `GET` | `https://login.live.com/` | 200 | - |
| `GET` | `https://account.microsoft.com/` | 302 | → https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize (auth hop) |
| `GET` | `https://hackerone.com/microsoft` | 404 | - |
| `GET` | `https://hackerone.com/msrc` | 404 | - |
| `GET` | `https://bugcrowd.com/engagements/microsoft` | 404 | - |
| `GET` | `https://bugcrowd.com/h/microsoft` | 200 | - |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | - |
| `GET` | `https://portal.msrc.microsoft.com/` | 302 | → https://msrc.microsoft.com/update-guide |

## Summary
MSRC portal + Entra OIDC passive refresh (P156 runner-b).

## Auth readiness
- BB SSoT: MSRC first-party bounty/report; H1/BC often 404 soft.
- Entra common/orgs OIDC for cloud auth map.

## Deltas vs P149
- msrc apex **302→www** hub **200**; bounty **200**; **report path 404** (was 200 on P149 — path flip).
- update-guide **200**; api.msrc bare **404**; portal.msrc → update-guide.
- Entra common+orgs OIDC **200**; Azure+Entra portals **200**; login.msft→office.
- account.microsoft → consumers oauth authorize; login.live **200**.
- H1 microsoft/msrc **404**; BC engagements/microsoft **404**; /h soft **200**.
