# MSRC + Entra auth doors (PULSE-65)

UTC: 2026-08-07T16:30:22Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://msrc.microsoft.com` | 302 | → www.microsoft.com/en-us/msrc | hub hop |
| `https://msrc.microsoft.com/report` | 200 | - | **submit SSoT** |
| `https://msrc.microsoft.com/report/vulnerability/new` | 200 | - | create form shell |
| `https://msrc.microsoft.com/update-guide` | 200 | - | |
| `https://msrc.microsoft.com/create-report` | 302 | → /report/vulnerability/new | alias |
| `https://portal.msrc.microsoft.com` | 302 | → msrc…/update-guide | portal collapsed |
| `https://portal.msrc.microsoft.com/en-us/researcher` | 302 | → msrc…/en-us/researcher | host rewrite |
| `https://portal.msrc.microsoft.com/en-us/report` | 302 | → msrc…/en-us/report | host rewrite |
| `https://www.microsoft.com/en-us/msrc/bounty` | 200 | - | policy hub |
| `https://www.microsoft.com/en-us/msrc/bounty-online-services` | 200 | - | OBB SSoT |
| `https://api.msrc.microsoft.com` | 404 | - | bare |
| `https://api.msrc.microsoft.com/cvrf/v3.0/updates` | 200 | - | public CVRF |
| `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration` | 200 | - | Entra OIDC |
| `https://login.microsoftonline.com/common/oauth2/v2.0/authorize` | 200 | - | authorize shell |
| `https://graph.microsoft.com/v1.0/me` | 401 | - | Graph gate |
| `https://graph.microsoft.com/v1.0/$metadata` | 200 | - | public metadata |
| `https://portal.azure.com` | 200 | - | Azure shell |
| `https://myaccount.microsoft.com` | 200 | - | tiny shell |
| `https://admin.microsoft.com` | 200 | - | M365 admin shell |
| `https://account.microsoft.com` | 302 | → consumers oauth2 authorize | MSA |

## Notes

- Submit UI SSoT remains **msrc.microsoft.com/report** (+ `/vulnerability/new`).
- portal.msrc host only rewrites to msrc.microsoft.com; old researcher/report paths not primary.
- F2 OBB policy: microsoft.com/msrc/bounty-online-services **200**.
- Identity: Entra common OIDC + Graph /me **401**; own-tenant testing only.

## Delta vs P57

- Stable submit 200; portal→update-guide; Graph/OIDC unchanged.
- msrc root → marketing msrc hub (not update-guide).

## Auth readiness

- **needs_profile_on_submit** still applies (human MSA/AAD).
- Own Entra/M365 tenant with MSOBB naming when possible.

## Next (human / gated)

- Create MSRC profile at submit; dual own tenants; no third-party tenant testing.

## Follow-on (same tick)

| URL | status | notes |
|-----|--------|-------|
| `https://msrc.microsoft.com/en-us/researcher` | 404 | after portal rewrite |
| `https://msrc.microsoft.com/en-us/report` | 404 | use /report not en-us |

