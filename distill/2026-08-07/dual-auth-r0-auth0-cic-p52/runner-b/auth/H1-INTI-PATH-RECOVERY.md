# H1 Shopify + Intigriti Dropbox path recovery (passive GET only)

UTC: 2026-08-07T15:20:55Z
Context: PULSE-32 Q-BC atlassian/openai bare 200; balance runner-b platform doors.

| URL | code0 | follow→ | notes |
|-----|-------|---------|-------|
| `https://hackerone.com/shopify` | 200 | 200 | - |
| `https://hackerone.com/shopify?type=team` | 200 | 200 | - |
| `https://hackerone.com/gitlab` | 200 | 200 | - |
| `https://hackerone.com/directory/programs` | 200 | 200 | - |
| `https://hackerone.com/opportunities/all` | 200 | 200 | - |
| `https://hackerone.com/users/sign_in` | 403 | 403 | - |
| `https://hackerone.com/users/sign_up` | 403 | 403 | - |
| `https://hackerone.com/users/password/new` | 200 | 200 | - |
| `https://api.hackerone.com/` | 200 | 200 | - |
| `https://api.hackerone.com/v1/hackers/me` | 401 | 401 | - |
| `https://www.shopify.com/bugbounty` | 200 | 200 | - |
| `https://www.shopify.com/bugbounty/criteria` | 200 | 200 | https://www.shopify.com/br/bugbounty/criteria |
| `https://www.shopify.com/bugbounty/scope` | 404 | 404 | - |
| `https://app.intigriti.com/programs/dropbox/dropbox/detail` | 200 | 200 | - |
| `https://app.intigriti.com/auth/login` | 200 | 200 | - |
| `https://app.intigriti.com/login` | 200 | 200 | - |
| `https://login.intigriti.com/` | 302 | 200 | https://login.intigriti.com/account/login |
| `https://www.intigriti.com/programs/dropbox` | 308 | 200 | https://app.intigriti.com/programs/dropbox/ |
| `https://intigriti.com/programs/dropbox` | 308 | 200 | https://app.intigriti.com/programs/dropbox/ |
| `https://www.intigriti.com/researchers` | 200 | 200 | - |
| `https://api.intigriti.com/` | 404 | 404 | - |
| `https://api.intigriti.com/external/researcher` | 400 | 400 | - |
| `https://www.dropbox.com/developers` | 200 | 200 | - |
| `https://www.dropbox.com/oauth2/authorize` | 302 | 200 | https://www.dropbox.com/oauth2/authorize_error?error_detail=Missing+client_id.&error_name=missing_client_id |

## Notes
- H1 sign_in often 403 to curl; browser profile required.
- Shopify criteria public; scope path may 404 (prior claim).
- Inti Dropbox detail + login shells; no join/submit this tick.
- No credentials, no spray.
