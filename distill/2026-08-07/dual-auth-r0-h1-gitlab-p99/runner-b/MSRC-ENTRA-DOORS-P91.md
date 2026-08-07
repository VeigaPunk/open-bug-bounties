# MSRC submit + Entra OAuth doors (PULSE-91)

UTC: 2026-08-07T17:22:07Z
Policy: recon only — no auth, no exploit, no token harvest.
OAuth query values redacted (`client_id`/`state`/`nonce` → `…`).

## Passive HEAD/GET (max-redirs 0)

| method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://msrc.microsoft.com` | 302 | `https://www.microsoft.com/en-us/msrc` |
| `GET` | `https://msrc.microsoft.com` | 302 | `https://www.microsoft.com/en-us/msrc` |
| `HEAD` | `https://msrc.microsoft.com/report` | 200 | `-` |
| `GET` | `https://msrc.microsoft.com/report` | 200 | `-` |
| `HEAD` | `https://msrc.microsoft.com/report/vulnerability/new` | 200 | `-` |
| `GET` | `https://msrc.microsoft.com/report/vulnerability/new` | 200 | `-` |
| `HEAD` | `https://msrc.microsoft.com/create-report` | 302 | `/report/vulnerability/new` |
| `GET` | `https://msrc.microsoft.com/create-report` | 302 | `/report/vulnerability/new` |
| `HEAD` | `https://msrc.microsoft.com/en-us/researcher` | 404 | `-` |
| `GET` | `https://msrc.microsoft.com/en-us/researcher` | 404 | `-` |
| `HEAD` | `https://www.microsoft.com/en-us/msrc` | 200 | `-` |
| `GET` | `https://www.microsoft.com/en-us/msrc` | 200 | `-` |
| `HEAD` | `https://www.microsoft.com/en-us/msrc/bounty` | 200 | `-` |
| `GET` | `https://www.microsoft.com/en-us/msrc/bounty` | 200 | `-` |
| `HEAD` | `https://www.microsoft.com/en-us/msrc/bounty-online-services` | 200 | `-` |
| `GET` | `https://www.microsoft.com/en-us/msrc/bounty-online-services` | 200 | `-` |
| `HEAD` | `https://portal.msrc.microsoft.com` | 302 | `https://msrc.microsoft.com/update-guide` |
| `GET` | `https://portal.msrc.microsoft.com` | 302 | `https://msrc.microsoft.com/update-guide` |
| `HEAD` | `https://portal.msrc.microsoft.com/en-us/researcher` | 302 | `https://msrc.microsoft.com/en-us/researcher` |
| `GET` | `https://portal.msrc.microsoft.com/en-us/researcher` | 302 | `https://msrc.microsoft.com/en-us/researcher` |
| `HEAD` | `https://portal.msrc.microsoft.com/en-us/report/new` | 302 | `https://msrc.microsoft.com/en-us/report/new` |
| `GET` | `https://portal.msrc.microsoft.com/en-us/report/new` | 302 | `https://msrc.microsoft.com/en-us/report/new` |
| `HEAD` | `https://api.msrc.microsoft.com` | 404 | `-` |
| `GET` | `https://api.msrc.microsoft.com` | 404 | `-` |
| `HEAD` | `https://api.msrc.microsoft.com/cvrf/v3.0/updates` | 405 | `-` |
| `GET` | `https://api.msrc.microsoft.com/cvrf/v3.0/updates` | 200 | `-` |
| `HEAD` | `https://login.microsoftonline.com` | 200 | `-` |
| `GET` | `https://login.microsoftonline.com` | 302 | `https://www.office.com/login#` |
| `HEAD` | `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://login.microsoftonline.com/common/oauth2/v2.0/authorize` | 200 | `-` |
| `GET` | `https://login.microsoftonline.com/common/oauth2/v2.0/authorize` | 200 | `-` |
| `HEAD` | `https://graph.microsoft.com/v1.0/me` | 405 | `-` |
| `GET` | `https://graph.microsoft.com/v1.0/me` | 401 | `-` |
| `HEAD` | `https://graph.microsoft.com/v1.0/$metadata` | 405 | `-` |
| `GET` | `https://graph.microsoft.com/v1.0/$metadata` | 200 | `-` |
| `HEAD` | `https://account.microsoft.com` | 404 | `-` |
| `GET` | `https://account.microsoft.com` | 302 | `https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?scope=https:%2F%2Faccount.microsoft.com%2FMBI openid p` |
| `HEAD` | `https://login.live.com` | 404 | `-` |
| `GET` | `https://login.live.com` | 200 | `-` |
| `HEAD` | `https://myaccount.microsoft.com` | 200 | `-` |
| `GET` | `https://myaccount.microsoft.com` | 200 | `-` |
| `HEAD` | `https://portal.azure.com` | 302 | `/Error/UE_404?aspxerrorpath=/` |
| `GET` | `https://portal.azure.com` | 200 | `-` |
| `HEAD` | `https://admin.microsoft.com` | 200 | `-` |
| `GET` | `https://admin.microsoft.com` | 200 | `-` |
| `HEAD` | `https://entra.microsoft.com` | 302 | `/Error/UE_404?aspxerrorpath=/` |
| `GET` | `https://entra.microsoft.com` | 200 | `-` |
| `HEAD` | `https://www.office.com` | 302 | `https://m365.cloud.microsoft:443/?origindomain=Office` |
| `GET` | `https://www.office.com` | 302 | `https://m365.cloud.microsoft:443/?origindomain=Office` |
| `HEAD` | `https://security.microsoft.com` | 302 | `https://login.microsoftonline.com/common/oauth2/authorize?client_id=…&response_type=code%20id_token&scope=openid%20profi` |
| `GET` | `https://security.microsoft.com` | 302 | `https://login.microsoftonline.com/common/oauth2/authorize?client_id=…&response_type=code%20id_token&scope=openid%20profi` |

## Auth chain (passive)

1. Submit: `/report` + `/report/vulnerability/new` **200** GET; create-report → `/report/vulnerability/new`.
2. Policy: OBB bounty + bounty-online-services **200**.
3. Portal researcher chain still **404** after hop (not SSoT).
4. CVRF updates: **HEAD 405 / GET 200** (stable).
5. Entra OIDC discovery + authorize **200**; Graph `/me` **401** GET / **405** HEAD; `$metadata` **200** GET / **405** HEAD.
6. MSA: account.microsoft.com GET → consumers oauth (redacted); login.live.com GET **200** / HEAD **404**.
7. Shells: azure/admin/myaccount/entra GET **200** (HEAD may UE_404 path noise on azure/entra).
8. office.com → m365.cloud.microsoft; security.microsoft.com → Entra authorize (needs session).

## Delta vs P83

- login.microsoftonline.com: GET now **302** → office.com/login# (HEAD still **200** shell).
- Graph HEAD method-not-allowed class explicit on `/me` and `$metadata` (405).
- entra.microsoft.com HEAD → UE_404 path noise (same class as portal.azure HEAD); prefer GET for shell checks.
- Submit SSoT + OBB + CVRF method split + OIDC gates **stable**.

## Notes

- F2 profile-on-submit still human; MSOBB naming culture.
- No credentials; OAuth client_id not stored.

## Auth readiness

- F2 submit SSoT stable; researcher profile + own tenant human.

## Next (human / gated)

- MSRC profile at submit; own Entra/M365 tenant with MSOBB naming.

