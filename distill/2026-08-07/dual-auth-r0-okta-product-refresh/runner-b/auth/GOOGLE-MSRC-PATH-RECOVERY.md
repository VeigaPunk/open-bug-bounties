# Google VRP + MSRC path recovery (passive GET only)

UTC: 2026-08-07T15:22:54Z
Context: PULSE-33 H1/Inti doors; extend F1+F2 public portal map.

| URL | code0 | follow→ | notes |
|-----|-------|---------|-------|
| `https://bughunters.google.com/` | 200 | 200 | - |
| `https://bughunters.google.com/about/rules/google-friends/google-and-alphabet-vulnerability-reward-program-vrp-rules` | 200 | 200 | - |
| `https://bughunters.google.com/report` | 200 | 200 | - |
| `https://bughunters.google.com/learn` | 200 | 200 | - |
| `https://accounts.google.com/` | 302 | 200 | https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Faccounts.google.com%2F&dsh=S1547316176%3A1786116178382816&followup=https%3A%2F%2Faccounts.google.com%2F&passive=1209600&flowName=WebLiteSignIn&flowEntry=ServiceLogin&ifkv=Ac50bxsuovwfUpXqzZF1ktvDJ_N0Rv_WZxzNwwjClu00xNEXtqXo3iz0bZyuXqwqEChLo_JYq-2s |
| `https://accounts.google.com/ServiceLogin` | 302 | 200 | https://accounts.google.com/v3/signin/identifier?dsh=S-1021776892%3A1786116180227467&flowName=WebLiteSignIn&flowEntry=ServiceLogin&ifkv=Ac50bxv09jJ44WmZq8kA8kCDCaqyTsZlNrQ_wjqHUYk-CEq-P6acPiiLbs5dh9GlhOK0O8rXl9SwYw |
| `https://www.google.com/about/appsecurity/` | 301 | 200 | https://about.google/company-info/appsecurity/ |
| `https://issuetracker.google.com/` | 302 | 200 | https://issuetracker.google.com/issues |
| `https://portal.msrc.microsoft.com/` | 302 | 200 | https://msrc.microsoft.com/update-guide |
| `https://portal.msrc.microsoft.com/en-us` | 302 | 200 | https://msrc.microsoft.com/update-guide |
| `https://portal.msrc.microsoft.com/en-us/researcher` | 302 | 404 | https://msrc.microsoft.com/en-us/researcher |
| `https://portal.msrc.microsoft.com/en-us/report` | 302 | 404 | https://msrc.microsoft.com/en-us/report |
| `https://www.microsoft.com/en-us/msrc/bounty` | 200 | 200 | - |
| `https://www.microsoft.com/en-us/msrc/bounty-online-services` | 200 | 200 | - |
| `https://api.msrc.microsoft.com/` | 404 | 404 | - |
| `https://api.msrc.microsoft.com/cvrf/v3.0/updates` | 200 | 200 | - |
| `https://login.microsoftonline.com/` | 302 | 200 | https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=4765445b-32c6-49b0-83e6-1d93765276ca&redirect_uri=https%3A%2F%2Fwww.office.com%2Flandingv2&response_type=code%20id_token&scope=openid%20profile%20https%3A%2F%2Fwww.office.com%2Fv2%2FOfficeHome.All&response_mode=form_post&nonce=639217129926463870.YWY1NTFhZDEtZDg4OC00NDk4LWI3MDctZDU3ZWViMTg1ZWFlZjkyZTI1N2ItMjg0Ni00NTFjLTllOTAtY2FlNDI3Njk0NzAw&ui_locales=en-US&mkt=en-US&client-request-id=16c65395-1aae-4e53-a8bd-604e2e386904&state=5r3Lo9iU2wwRSbgCoK0YC5_AdkLgU8oe6N2vIUGRskpea1cJ4Mh8TtYTsRRXQtfIp9PpDgJyI35puoEyuxyxCwnWs6rlGN1PuermZ0QZSapF5jaZDdvl5s_mVnONfHQmFgiwutXALEPGSHFtREThQoOBRYDL4GHATn1OY8-AkVXwa6HfJoWyNC4WW8p3BRuVIaB4fRhPPTMM6eU1rSY_3SAIj2EbUb9sCmLinud3v_rfnPuKjcwELEPKyT08YZsbBI6WpCwfk8CxBD5oT8WCh2p1fDYs6WA3npO0AKFXBXH08gfKjeauMU4EpHEaUbs5jbIpqo7_EyVynRShcr3WKvHEl2_nY9QjWiFtxcXGrFfAGECS_CIrLiOTHI5scHgMLUfs_Up6IIM_EA0WXIFmTW2mKImeV-C5TBzD8lLH6jI&x-client-SKU=ID_NET8_0&x-client-ver=8.16.0.0 |
| `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration` | 200 | 200 | - |
| `https://graph.microsoft.com/v1.0/me` | 401 | 401 | - |
| `https://proton.me/security/bug-bounty` | 200 | 200 | - |
| `https://account.proton.me/login` | 200 | 200 | - |
| `https://account.proton.me/signup` | 200 | 200 | - |

## Notes
- F1 bughunters + accounts shells; researcher path may 404 (prior MSRC claim).
- Graph /me 401 unauth expected.
- Proton dual free accounts human-only; no signup automation.
- No credentials, no spray.
