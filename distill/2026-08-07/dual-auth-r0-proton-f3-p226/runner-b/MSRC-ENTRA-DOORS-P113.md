# MSRC + Entra/Microsoft identity doors (PULSE-113)

UTC: 2026-08-07T18:11:26Z
Policy: recon only — no auth, no exploit, no token harvest.
Note: AAD authorize client_id in Location is public app id; not stored as secret.

## Passive HEAD/GET (max-redirs 0)

| Method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://login.microsoftonline.com/common/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://login.microsoftonline.com/common/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://graph.microsoft.com/v1.0/me` | 405 | `-` |
| `GET` | `https://graph.microsoft.com/v1.0/me` | 401 | `-` |
| `HEAD` | `https://msrc.microsoft.com` | 302 | `→ www.microsoft.com/en-us/msrc` |
| `GET` | `https://msrc.microsoft.com` | 302 | `→ www.microsoft.com/en-us/msrc` |
| `HEAD` | `https://msrc.microsoft.com/report/vulnerability` | 200 | `-` |
| `GET` | `https://msrc.microsoft.com/report/vulnerability` | 200 | `-` |
| `HEAD` | `https://www.microsoft.com/en-us/msrc` | 200 | `-` |
| `GET` | `https://www.microsoft.com/en-us/msrc` | 200 | `-` |
| `HEAD` | `https://portal.msrc.microsoft.com` | 302 | `→ msrc…/update-guide` |
| `GET` | `https://portal.msrc.microsoft.com` | 302 | `→ msrc…/update-guide` |
| `HEAD` | `https://security.microsoft.com` | 302 | `→ AAD oauth2/authorize (public client_id)` |
| `GET` | `https://security.microsoft.com` | 302 | `→ AAD oauth2/authorize` |
| `HEAD` | `https://bugcrowd.com/engagements/microsoft` | 404 | `-` |
| `GET` | `https://bugcrowd.com/engagements/microsoft` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/microsoft` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/microsoft` | 200 | `-` |
| `HEAD` | `https://hackerone.com/microsoft` | 404 | `-` |
| `GET` | `https://hackerone.com/microsoft` | 404 | `-` |
| `HEAD` | `https://login.live.com` | 404 | `-` |
| `GET` | `https://login.live.com` | 200 | `-` |
| `HEAD` | `https://account.microsoft.com` | 404 | `-` |
| `GET` | `https://account.microsoft.com` | 302 | `→ consumers oauth2/v2.0/authorize` |
| `HEAD` | `https://portal.azure.com` | 302 | `→ Error/UE_404` |
| `GET` | `https://portal.azure.com` | 200 | `-` |

## Auth chain (passive)

1. AAD common OIDC v1+v2 **200**; Graph `/v1.0/me` HEAD **405** / GET **401**.
2. MSRC apex → marketing **302**; report/vulnerability **200**; portal → update-guide **302**.
3. security.microsoft → AAD authorize **302**; account.microsoft GET → consumers authorize **302**.
4. BC bare microsoft **404**; **/h/engagements/microsoft 200** soft SSoT; H1 microsoft **404**.
5. login.live HEAD404/GET200; azure portal HEAD302/GET200 method split.

## Delta vs P103

- Stable: AAD OIDC, Graph unauth, MSRC report, BC /h soft-200, H1 404.
- No material regression this tick.

## Notes

- MSOBB/MSRC submit still human portal; no secrets in distill.

## Auth readiness

- Entra OIDC + Graph unauth + MSRC report doors mapped; BC soft path only.

## Next (human / gated)

- MSRC researcher identity if required; BC /h microsoft brief when engaged.
