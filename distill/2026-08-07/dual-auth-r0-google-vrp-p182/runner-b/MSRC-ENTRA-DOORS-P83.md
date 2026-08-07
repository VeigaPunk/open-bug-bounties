# MSRC submit + Entra OAuth doors (PULSE-83)

UTC: 2026-08-07T17:06:05Z
Policy: recon only — no auth, no exploit, no token harvest.
OAuth query values redacted (`client_id`/`state`/`nonce` → `…`).

## Passive HEAD/GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://msrc.microsoft.com` | 302 | → microsoft.com/en-us/msrc | marketing hop |
| `https://msrc.microsoft.com/report` | 200 GET | - | report hub |
| `https://msrc.microsoft.com/report/vulnerability/new` | 200 GET | - | **submit SSoT** |
| `https://msrc.microsoft.com/create-report` | 302 | → /report/vulnerability/new | alias |
| `https://msrc.microsoft.com/en-us/researcher` | 404 GET | - | portal hop lands 404 |
| `https://www.microsoft.com/en-us/msrc` | 200 | - | MSRC hub |
| `https://www.microsoft.com/en-us/msrc/bounty` | 200 | - | bounty hub |
| `https://www.microsoft.com/en-us/msrc/bounty-online-services` | 200 | - | **OBB policy** |
| `https://portal.msrc.microsoft.com` | 302 | → msrc…/update-guide | portal rewrite |
| `https://portal.msrc.microsoft.com/en-us/researcher` | 302 | → msrc…/en-us/researcher | then 404 |
| `https://portal.msrc.microsoft.com/en-us/report/new` | 302 | → msrc…/en-us/report/new | not submit SSoT |
| `https://api.msrc.microsoft.com` | 404 | - | bare API |
| `https://api.msrc.microsoft.com/cvrf/v3.0/updates` | **405 HEAD / 200 GET** | - | public CVRF method-sensitive |
| `https://login.microsoftonline.com` | 200 | - | Entra shell |
| `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration` | 200 | - | Entra OIDC |
| `https://login.microsoftonline.com/common/oauth2/v2.0/authorize` | 200 | - | authorize shell |
| `https://graph.microsoft.com/v1.0/me` | 401 GET | - | unauth |
| `https://graph.microsoft.com/v1.0/$metadata` | 200 GET | - | public metadata |
| `https://account.microsoft.com` | 302 GET | → consumers oauth2 authorize | MSA hop (params redacted) |
| `https://login.live.com` | 200 GET | - | MSA shell (HEAD was 404) |
| `https://myaccount.microsoft.com` | 200 GET | - | shell |
| `https://portal.azure.com` | 200 GET | - | Azure portal shell (HEAD 302 UE_404 path noise) |
| `https://admin.microsoft.com` | 200 GET | - | M365 admin shell |
| `https://entra.microsoft.com` | 200 | - | Entra admin shell |
| `https://www.office.com` | 302 | → m365.cloud.microsoft | office hop |
| `https://security.microsoft.com` | 302 | → login.microsoftonline authorize | needs session |

## Auth chain (passive)

1. Submit: `/report` + `/report/vulnerability/new` **200**; create-report → new. Portal researcher path still **not** SSoT (404 after hop).
2. Policy: OBB bounty-online-services **200**.
3. Entra: OIDC discovery + authorize **200**; Graph /me **401**.
4. MSA: account.microsoft.com → consumers oauth (prompt=none pattern); login.live.com GET **200**.
5. Own-tenant surfaces: azure/admin/myaccount/entra shells **200** on GET.

## Delta vs P75

- CVRF updates: **HEAD 405 / GET 200** (same method class as Aiven P82).
- Confirmed portal `/en-us/researcher` chain ends **404** (do not use as researcher profile URL).
- login.live.com: GET **200** vs HEAD **404** — prefer GET for MSA door checks.
- Otherwise submit SSoT + OBB + Entra gates **stable**.

## Notes

- F2 profile-on-submit still human; MSOBB naming culture.
- No credentials; OAuth client_id not stored.

## Auth readiness

- F2 submit SSoT stable; researcher profile + own tenant human.

## Next (human / gated)

- MSRC profile at submit; own Entra/M365 tenant with MSOBB naming.
