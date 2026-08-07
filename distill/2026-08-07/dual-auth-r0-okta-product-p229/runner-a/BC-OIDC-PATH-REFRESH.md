# BC login.hackers + platform OIDC path refresh (passive GET only)

UTC: 2026-08-07T15:24:52Z
Context: PULSE-34 MSRC portal drift; re-verify BC hacker auth chain shells.

| URL | code0 | follow→ | notes |
|-----|-------|---------|-------|
| `https://bugcrowd.com/` | 301 | 200 | https://www.bugcrowd.com/ |
| `https://bugcrowd.com/user/sign_in` | 302 | 200 | https://login.hackers.bugcrowd.com/oauth2/default/v1/authorize?response_type=code&client_id=0oa20esd61y2ACBLf1d8&scope=openid%20profile%20email… |
| `https://bugcrowd.com/user/sign_up` | 301 | 200 | https://login.bugcrowd.com/signin/register |
| `https://bugcrowd.com/engagements` | 200 | 200 | - |
| `https://bugcrowd.com/h/engagements` | 200 | 200 | - |
| `https://tracker.bugcrowd.com/` | 302 | 200 | https://tracker.bugcrowd.com/user/sign_in |
| `https://tracker.bugcrowd.com/user/sign_in` | 200 | 200 | - |
| `https://identity.bugcrowd.com/` | 403 | 403 | - |
| `https://login.hackers.bugcrowd.com/` | 302 | 200 | https://login.hackers.bugcrowd.com/oauth2/default/v1/authorize?response_type=code&client_id=0oa20esd61y2ACBLf1d8&scope=openid%20profile%20email… |
| `https://login.hackers.bugcrowd.com/oauth2/default/.well-known/openid-configuration` | 200 | 200 | - |
| `https://login.hackers.bugcrowd.com/.well-known/openid-configuration` | 200 | 200 | - |
| `https://login.bugcrowd.com/` | 302 | 200 | https://tracker.bugcrowd.com/user/sign_in |
| `https://login.bugcrowd.com/register` | 404 | 404 | - |
| `https://api.bugcrowd.com/` | 200 | 200 | - |
| `https://api.bugcrowd.com/v2` | 404 | 404 | - |
| `https://docs.bugcrowd.com/` | 200 | 200 | - |
| `https://docs.bugcrowd.com/api` | 404 | 404 | - |
| `https://docs.bugcrowd.com/researchers/participating-in-program/your-bugcrowdninja-email-address/` | 200 | 200 | - |
| `https://docs.bugcrowd.com/researchers/participating-in-program/using-email-aliases/` | 404 | 404 | - |

## Notes
- OIDC discovery 200 is SSoT for hacker login; identity bare often 403.
- Docs path drift: ninja-email vs using-email-aliases.
- No credentials, no Okta password probe, no spray.
