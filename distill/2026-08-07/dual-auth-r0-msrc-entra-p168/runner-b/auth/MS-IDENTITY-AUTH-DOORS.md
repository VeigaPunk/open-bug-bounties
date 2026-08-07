# Microsoft account / Entra public auth doors (passive GET only)

UTC: 2026-08-07T15:09:01Z
Policy: unauthenticated status + Location hosts only. No login POST, no spray, no exploit.
Own-tenant testing only when live; this map is public shells.

| URL | code0 | follow→ | notes |
|-----|-------|---------|-------|
| `https://login.microsoftonline.com/` | 302 | 200 | https://www.office.com/login#;https://login.microsoftonline.com/common/oauth2/v2.0/authorize&respons |
| `https://login.microsoftonline.com/common/oauth2/v2.0/authorize` | 200 | 200 | - |
| `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration` | 200 | 200 | - |
| `https://login.live.com/` | 200 | 200 | - |
| `https://account.microsoft.com/` | 302 | 302 | https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize;https://login.live.com/oauth20_aut |
| `https://account.live.com/` | 301 | 302 | https://account.microsoft.com/?lang=en-US&refd=account.live.com&refp=landing;https://login.microsoft |
| `https://signup.live.com/` | 302 | 200 | https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=201&checkda=1&ct=1786115348&rver=7.5.2211.0&wp= |
| `https://portal.azure.com/` | 200 | 200 | - |
| `https://entra.microsoft.com/` | 200 | 200 | - |
| `https://myaccount.microsoft.com/` | 200 | 200 | - |
| `https://admin.microsoft.com/` | 200 | 200 | - |
| `https://portal.office.com/` | 302 | 200 | https://www.microsoft365.com/login?ru=%2F%3Ffrom%3DPortalHome;https://login.microsoftonline.com/comm |
| `https://www.office.com/` | 302 | 200 | - |
| `https://portal.msrc.microsoft.com/` | 302 | 200 | https://msrc.microsoft.com/update-guide |
| `https://msrc.microsoft.com/` | 302 | 200 | https://www.microsoft.com/en-us/msrc |
| `https://www.microsoft.com/en-us/msrc/bounty` | 200 | 200 | - |
| `https://www.microsoft.com/en-us/msrc/bounty-online-services` | 200 | 200 | - |
| `https://graph.microsoft.com/v1.0/me` | 401 | 401 | - |
| `https://graph.microsoft.com/v1.0/$metadata` | 200 | 200 | - |
| `https://login.microsoft.com/` | 302 | 200 | https://www.office.com/login#;https://login.microsoftonline.com/common/oauth2/v2.0/authorize&respons |

## Notes
- F2 OBB: own tenant only; MSOBB naming culture.
- graph /me expected 401 unauth.
- No credentials, no tenant enumeration spray.
