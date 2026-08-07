# MSRC + Entra + Proton account auth doors — passive (Runner B)

**UTC:** 2026-08-07T14:45:51Z  
**Policy recon only** — no login, no report submit, no exploit.

## MSRC / Online Services bounty

| URL | Code | Role |
|-----|------|------|
| https://msrc.microsoft.com | 200 | MSRC hub |
| https://msrc.microsoft.com/report/vulnerability | 200 | Report entry |
| https://www.microsoft.com/en-us/msrc | 200 | Marketing MSRC |
| https://www.microsoft.com/en-us/msrc/bounty | 200 | Bounty hub |
| https://www.microsoft.com/en-us/msrc/bounty-online-services | 200 | OBB scope page |
| https://portal.msrc.microsoft.com | 200 | Portal shell |
| https://portal.msrc.microsoft.com/en-us | 200 | Portal locale |
| https://api.msrc.microsoft.com | **404** | Bare API root not public |
| https://api.msrc.microsoft.com/cvrf/v3.0/updates | 200 | Public CVRF feed (not auth) |

## Microsoft identity / Entra shells

| URL | Code | Role |
|-----|------|------|
| https://login.microsoftonline.com | 200 | AAD/Entra login |
| https://login.microsoft.com | 200 | Login alias |
| https://login.live.com | 200 | MSA live login |
| https://entra.microsoft.com | 200 | Entra admin shell |
| https://portal.azure.com | 200 | Azure portal shell |
| https://account.microsoft.com | 200 | MSA account |
| https://account.live.com | 200 | Live account |

## Proton (F3 channel)

| URL | Code | Role |
|-----|------|------|
| https://account.proton.me | 200 | Account shell |
| https://account.proton.me/login | 200 | Login |
| https://account.proton.me/signup | 200 | Signup (own dual-account only) |
| https://mail.proton.me | 200 | Mail shell |

## Auth-ready implications

1. **F2 MSRC:** portal + report + OBB pages **200**; researcher profile still **on first submit** (AUTH-READINESS). Bare `api.msrc.microsoft.com` **404** — use CVRF path or portal, not root.
2. Entra/Azure/MSA login doors are public shells — bounty tests only on **in-scope OBB** assets with program rules; no tenant spray.
3. **F3 Proton:** account login/signup **200**; report channel remains email/PGP per prior F3 map (no platform join).
4. Do not confuse public CVRF API with researcher auth.

## Related

- `F2-MSRC-PASSIVE.md`, `F3-PROTON-PASSIVE.md`, `AUTH-READINESS.md`

## Axes

- auth_ready_b↑ (MSRC/Entra/Proton doors)
- evidence_fidelity↑ (api.msrc root 404 vs CVRF 200)
- safety_in_policy↑
