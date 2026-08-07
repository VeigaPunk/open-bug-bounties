# MSRC-ENTRA-DOORS-P149
UTC: 2026-08-07T19:24:58Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://msrc.microsoft.com/` | 302 | → www.microsoft.com/en-us/msrc |
| `GET` | `https://msrc.microsoft.com/report/vulnerability` | 200 | report portal shell |
| `GET` | `https://www.microsoft.com/en-us/msrc` | 200 | MSRC hub |
| `GET` | `https://www.microsoft.com/en-us/msrc/bounty` | 200 | bounty SSoT |
| `GET` | `https://login.microsoftonline.com/` | 302 | → office.com/login |
| `GET` | `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration` | 200 | Entra common OIDC |
| `GET` | `https://login.microsoftonline.com/organizations/v2.0/.well-known/openid-configuration` | 200 | Entra orgs OIDC |
| `GET` | `https://login.live.com/` | 200 | MSA login |
| `GET` | `https://account.live.com/` | 301 | → account.microsoft.com |
| `GET` | `https://portal.azure.com/` | 200 | Azure portal shell |
| `GET` | `https://entra.microsoft.com/` | 200 | Entra admin shell |
| `GET` | `https://hackerone.com/microsoft` | 404 | not H1 program |
| `GET` | `https://hackerone.com/msrc` | 404 | - |
| `GET` | `https://bugcrowd.com/engagements/microsoft` | 404 | not BC engagement |
| `GET` | `https://bugcrowd.com/h/microsoft` | 200 | soft shell |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | BC IdP |
| `GET` | `https://api.msrc.microsoft.com/` | 404 | bare API |
| `GET` | `https://www.microsoft.com/en-us/security` | 200 | - |

## Summary
MSRC+Entra passive door refresh for runner-b (P149). MSRC hub/bounty/report **200**; msrc apex **302→www**. Entra common+orgs OIDC **200**; login.microsoftonline apex→office login; Azure+Entra portals **200**. H1/BC microsoft not engaged. Auth readiness: MSA/Entra browser + MSRC report portal (not H1/BC).

## Deltas vs P139
- Core MSRC bounty + Entra OIDC **stable**.
- H1/BC microsoft still **404**.
