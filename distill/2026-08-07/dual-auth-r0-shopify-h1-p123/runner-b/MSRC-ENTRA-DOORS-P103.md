# MSRC + Entra/Microsoft identity doors (PULSE-103)

UTC: 2026-08-07T17:49:42Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://msrc.microsoft.com` | 302 | `https://www.microsoft.com/en-us/msrc` |
| `GET` | `https://msrc.microsoft.com` | 302 | `https://www.microsoft.com/en-us/msrc` |
| `HEAD` | `https://msrc.microsoft.com/report/vulnerability` | 200 | `-` |
| `GET` | `https://msrc.microsoft.com/report/vulnerability` | 200 | `-` |
| `HEAD` | `https://msrc.microsoft.com/update-guide` | 200 | `-` |
| `GET` | `https://msrc.microsoft.com/update-guide` | 200 | `-` |
| `HEAD` | `https://www.microsoft.com/en-us/msrc` | 200 | `-` |
| `GET` | `https://www.microsoft.com/en-us/msrc` | 200 | `-` |
| `HEAD` | `https://www.microsoft.com/en-us/msrc/bounty` | 200 | `-` |
| `GET` | `https://www.microsoft.com/en-us/msrc/bounty` | 200 | `-` |
| `HEAD` | `https://portal.msrc.microsoft.com` | 302 | `https://msrc.microsoft.com/update-guide` |
| `GET` | `https://portal.msrc.microsoft.com` | 302 | `https://msrc.microsoft.com/update-guide` |
| `HEAD` | `https://api.msrc.microsoft.com` | 404 | `-` |
| `GET` | `https://api.msrc.microsoft.com` | 404 | `-` |
| `HEAD` | `https://login.microsoftonline.com` | 200 | `-` |
| `GET` | `https://login.microsoftonline.com` | 302 | `https://www.office.com/login#` |
| `HEAD` | `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://login.microsoftonline.com/common/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://login.microsoftonline.com/common/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://login.live.com` | 404 | `-` |
| `GET` | `https://login.live.com` | 200 | `-` |
| `HEAD` | `https://account.live.com` | 302 | `https://account.live.com/error.aspx?e=404` |
| `GET` | `https://account.live.com` | 301 | `https://account.microsoft.com/?lang=en-US&refd=account.live.com&refp=landing` |
| `HEAD` | `https://account.microsoft.com` | 404 | `-` |
| `GET` | `https://account.microsoft.com` | 302 | `https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?scope=https:%2F%2Faccoun` |
| `HEAD` | `https://portal.azure.com` | 302 | `/Error/UE_404?aspxerrorpath=/` |
| `GET` | `https://portal.azure.com` | 200 | `-` |
| `HEAD` | `https://entra.microsoft.com` | 302 | `/Error/UE_404?aspxerrorpath=/` |
| `GET` | `https://entra.microsoft.com` | 200 | `-` |
| `HEAD` | `https://graph.microsoft.com` | 405 | `-` |
| `GET` | `https://graph.microsoft.com` | 301 | `https://developer.microsoft.com/graph` |
| `HEAD` | `https://graph.microsoft.com/v1.0/me` | 405 | `-` |
| `GET` | `https://graph.microsoft.com/v1.0/me` | 401 | `-` |
| `HEAD` | `https://graph.microsoft.com/.well-known/openid-configuration` | 405 | `-` |
| `GET` | `https://graph.microsoft.com/.well-known/openid-configuration` | 401 | `-` |
| `HEAD` | `https://www.office.com` | 302 | `https://m365.cloud.microsoft:443/?origindomain=Office` |
| `GET` | `https://www.office.com` | 302 | `https://m365.cloud.microsoft:443/?origindomain=Office` |
| `HEAD` | `https://security.microsoft.com` | 302 | `https://login.microsoftonline.com/common/oauth2/authorize?client_id=80ccca67-54bd-44ab-862` |
| `GET` | `https://security.microsoft.com` | 302 | `https://login.microsoftonline.com/common/oauth2/authorize?client_id=80ccca67-54bd-44ab-862` |
| `HEAD` | `https://bugcrowd.com/engagements/microsoft` | 404 | `-` |
| `GET` | `https://bugcrowd.com/engagements/microsoft` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/microsoft` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/microsoft` | 200 | `-` |
| `HEAD` | `https://hackerone.com/microsoft` | 404 | `-` |
| `GET` | `https://hackerone.com/microsoft` | 404 | `-` |
| `HEAD` | `https://hackerone.com/msrc` | 404 | `-` |
| `GET` | `https://hackerone.com/msrc` | 404 | `-` |
| `HEAD` | `https://aka.ms/opensource` | 301 | `https://docs.opensource.microsoft.com` |
| `GET` | `https://aka.ms/opensource` | 301 | `https://docs.opensource.microsoft.com` |
| `HEAD` | `https://github.com/microsoft/MSRC-Microsoft-Security-Updates-API` | 200 | `-` |
| `GET` | `https://github.com/microsoft/MSRC-Microsoft-Security-Updates-API` | 200 | `-` |

## Auth chain (passive)

1. MSRC apex → marketing msrc **302**; report/vulnerability **200**; update-guide **200**; bounty page **200**.
2. portal.msrc → update-guide **302**; api.msrc root **404**.
3. Entra/AAD: login.microsoftonline HEAD **200** / GET → office login **302**; common OIDC v1+v2 well-known **200**.
4. login.live HEAD **404** / GET **200**; account.microsoft → consumers oauth authorize **302** (unauth).
5. Graph: root HEAD **405** / GET **301**→developer; `/v1.0/me` HEAD **405** / GET **401**; graph well-known GET **401**.
6. Azure/Entra portals: HEAD path-error **302**, GET shell **200**; security.microsoft → AAD authorize **302** (client_id present, not harvested).
7. BC bare microsoft **404**, `/h` soft **200**; H1 microsoft/msrc **404** (first-party MSRC SSoT).
8. GitHub MSRC API repo **200**; aka.ms/opensource → docs **301**.

## Delta vs P91

- **New:** graph `/v1.0/me` method split **405/401**; graph well-known GET **401**.
- **New:** BC `/h/engagements/microsoft` soft-**200** vs bare **404**.
- **New:** account.microsoft consumers authorize hop; security.microsoft AAD authorize hop.
- OIDC common v2 **200** stable; msrc report path **200** stable; H1 microsoft **404** stable.

## Notes

- MSOBB / own-tenant only; no third-party tenant probing.
- OAuth query params observed but not stored in full.

## Auth readiness

- MSRC submit + AAD OIDC + Graph unauth class mapped; researcher portal human.

## Next (human / gated)

- MSRC account; own Entra test tenant only if program rules allow.
