# MSRC-ENTRA-DOORS-P180
UTC: 2026-08-07T20:29:04Z
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
| `GET` | `https://msrc.microsoft.com/update-guide/researcher` | 200 | researcher update-guide |
| `GET` | `https://msrc.microsoft.com/report/vulnerability` | 200 | report shell |
| `GET` | `https://api.msrc.microsoft.com/` | 404 | bare |
| `GET` | `https://api.msrc.microsoft.com/cvrf/v3.0/updates` | 200 | public CVRF |

## Entra / consumer identity

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | login.microsoftonline common v2 OIDC | 200 | |
| `GET` | login.microsoftonline organizations v2 OIDC | 200 | |
| `GET` | `https://portal.azure.com/` | 200 | Azure portal shell |
| `GET` | `https://entra.microsoft.com/` | 200 | Entra shell |
| `GET` | `https://login.live.com/` | 200 | consumer login |
| `GET` | `https://account.microsoft.com/` | 302 | → consumers OAuth2 authorize |

## Platform map

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/microsoft` | 404 | not H1 program slug |
| `GET` | `https://hackerone.com/msrc` | 404 | |
| `GET` | `https://bugcrowd.com/engagements/microsoft` | 404 | not BC |

## Summary
MSRC SSoT first-party microsoft.com/msrc + bounty **200**. Portal hops into msrc.microsoft.com (researcher/report **200**). Entra/Azure OIDC **200**. H1/BC microsoft slugs **404**.

## Auth readiness (runner-b F2)
- Researcher: msrc.microsoft.com update-guide/report (browser).
- Azure/Entra work OIDC; consumer account.microsoft OAuth hop.

## Deltas vs P168
- msrc update-guide/researcher + report/vulnerability direct **200** confirmed.
- Core hub/OIDC/H1/BC matrix **stable**.
