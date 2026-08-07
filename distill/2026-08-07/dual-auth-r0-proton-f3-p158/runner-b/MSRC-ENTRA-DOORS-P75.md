# MSRC submit + Entra OAuth doors (PULSE-75)

UTC: 2026-08-07T16:50:11Z
Policy: recon only — no auth, no exploit, no token harvest.
OAuth query values redacted (`client_id`/`state`/`nonce` → `…`).

## Passive GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://msrc.microsoft.com` | 302 | → microsoft.com/en-us/msrc | marketing hop |
| `https://msrc.microsoft.com/report` | 200 | - | report hub |
| `https://msrc.microsoft.com/report/vulnerability/new` | 200 | - | **submit SSoT** |
| `https://msrc.microsoft.com/create-report` | 302 | → /report/vulnerability/new | alias |
| `https://www.microsoft.com/en-us/msrc/bounty` | 200 | - | bounty hub |
| `https://www.microsoft.com/en-us/msrc/bounty-online-services` | 200 | - | **OBB policy** |
| `https://portal.msrc.microsoft.com` | 302 | → msrc…/update-guide | portal rewrite |
| `https://api.msrc.microsoft.com` | 404 | - | bare API |
| `https://api.msrc.microsoft.com/cvrf/v3.0/updates` | 200 | - | public CVRF |
| `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration` | 200 | - | Entra OIDC |
| `https://login.microsoftonline.com/common/oauth2/v2.0/authorize` | 200 | - | authorize shell |
| `https://graph.microsoft.com/v1.0/me` | 401 | - | unauth |
| `https://graph.microsoft.com/v1.0/$metadata` | 200 | - | public metadata |
| `https://account.microsoft.com` | 302 | → consumers oauth2 authorize | MSA hop |
| `https://myaccount.microsoft.com` | 200 | - | shell |
| `https://portal.azure.com` | 200 | - | Azure portal shell |
| `https://admin.microsoft.com` | 200 | - | M365 admin shell |

## Auth chain (passive)

1. Submit: `/report` + `/report/vulnerability/new` **200**; create-report → new.
2. Policy: OBB bounty-online-services **200**.
3. Entra: OIDC discovery + authorize **200**; Graph /me **401**.
4. MSA: account.microsoft.com → consumers oauth (prompt=none pattern).
5. Own-tenant surfaces: azure/admin/myaccount shells **200**.

## Delta vs P65

- Stable submit SSoT + OBB + Entra gates.
- portal.msrc still → update-guide (not report path).
- api bare 404; cvrf updates 200.

## Notes

- F2 profile-on-submit still human; MSOBB naming culture.
- No credentials; OAuth client_id not stored.

## Auth readiness

- F2 submit SSoT stable; researcher profile + own tenant human.

## Next (human / gated)

- MSRC profile at submit; own Entra/M365 tenant with MSOBB naming.
