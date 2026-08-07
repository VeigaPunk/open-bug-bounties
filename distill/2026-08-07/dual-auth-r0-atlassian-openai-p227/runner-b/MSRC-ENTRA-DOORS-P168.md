# MSRC-ENTRA-DOORS-P168
UTC: 2026-08-07T20:02:57Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## MSRC hub + bounty

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://msrc.microsoft.com/` | 302 | → www.microsoft.com/en-us/msrc |
| `GET` | `https://www.microsoft.com/en-us/msrc` | 200 | hub |
| `GET` | `https://www.microsoft.com/en-us/msrc/bounty` | 200 | bounty hub |
| `GET` | `https://www.microsoft.com/en-us/msrc/bounty-online-services` | 200 | online services bounty |
| `GET` | `https://www.microsoft.com/en-us/msrc/opensource` | 404 | path drift |
| `GET` | `https://portal.msrc.microsoft.com/` | 302 | → msrc update-guide |
| `GET` | portal .../researcher | 302 | → msrc.microsoft.com/en-us/researcher |
| `GET` | portal .../report/vulnerability | 302 | → msrc report path |
| `GET` | `https://api.msrc.microsoft.com/` | 404 | bare |
| `GET` | `https://api.msrc.microsoft.com/cvrf/v3.0/updates` | 200 | public CVRF |

## Entra / consumer identity

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | login.microsoftonline common OIDC | 200 | |
| `GET` | login.microsoftonline organizations OIDC | 200 | |
| `GET` | `https://portal.azure.com/` | 200 | Azure portal shell |
| `GET` | `https://entra.microsoft.com/` | 200 | Entra shell |
| `GET` | `https://login.live.com/` | 200 | consumer login |
| `GET` | `https://account.microsoft.com/` | 302 | → consumers oauth2 authorize |

## Platform map

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/microsoft` | 404 | not H1 program slug |
| `GET` | `https://hackerone.com/msrc` | 404 | |
| `GET` | `https://bugcrowd.com/engagements/microsoft` | 404 | not BC |

## Summary
MSRC SSoT: microsoft.com/msrc + bounty pages **200**. Portal host redirects into msrc.microsoft.com. Entra/Azure OIDC **200**. H1/BC microsoft slugs **404** (first-party MSRC program).

## Auth readiness (runner-b F2)
- Researcher portal via msrc.microsoft.com paths (browser).
- Azure/Entra: work account OIDC; consumer account.microsoft OAuth hop.

## Deltas vs P156
- portal still 302 off-host to msrc.microsoft.com (not en-us researcher 404 class alone).
- opensource path **404**; bounty-online-services **200**.
- H1/BC still 404.
