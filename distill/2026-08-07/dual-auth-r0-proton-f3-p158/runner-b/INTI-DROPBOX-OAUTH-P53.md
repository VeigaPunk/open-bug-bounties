# Intigriti + Dropbox OAuth passive map (PULSE-53)

UTC: 2026-08-07T16:06:36Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (max-redirs 0)

| URL | status | location | set-cookie | notes |
|-----|--------|----------|------------|-------|
| `https://www.intigriti.com` | 200 | - | 0 |  |
| `https://www.intigriti.com/researchers` | 200 | - | 0 |  |
| `https://www.intigriti.com/bug-bounty-programs` | 308 | https://www.intigriti.com/researchers/bug-bounty-programs | 0 |  |
| `https://www.intigriti.com/bug-bounty` | 404 | - | 0 |  |
| `https://intigriti.com/programs/dropbox` | 308 | https://app.intigriti.com/programs/dropbox/ | 0 |  |
| `https://app.intigriti.com` | 307 | https://www.intigriti.com | 0 |  |
| `https://app.intigriti.com/login` | 200 | - | 0 |  |
| `https://app.intigriti.com/auth/login` | 200 | - | 0 |  |
| `https://app.intigriti.com/researcher` | 302 | https://app.intigriti.com/auth/researcher?redirect=%2Fresearcher | 0 |  |
| `https://app.intigriti.com/programs` | 200 | - | 0 |  |
| `https://app.intigriti.com/profile` | 200 | - | 0 |  |
| `https://app.intigriti.com/programs/dropbox` | 200 | - | 0 |  |
| `https://login.intigriti.com` | 302 | /account/login | 0 |  |
| `https://login.intigriti.com/.well-known/openid-configuration` | 200 | - | 0 |  |
| `https://api.intigriti.com` | 404 | - | 0 |  |
| `https://api.intigriti.com/core` | 404 | - | 0 |  |
| `https://api.intigriti.com/external/researcher` | 400 | - | 0 |  |
| `https://www.dropbox.com` | 200 | - | 5 | cookies=5 |
| `https://www.dropbox.com/login` | 200 | - | 5 | cookies=5 |
| `https://www.dropbox.com/oauth2/authorize` | 302 | /oauth2/authorize_error?error_detail=Missing+client_id.&error_name=missing_client_id | 5 | cookies=5 |
| `https://www.dropbox.com/developers` | 200 | - | 5 | cookies=5 |
| `https://www.dropbox.com/developers/documentation/http/documentation` | 200 | - | 4 | cookies=4 |
| `https://api.dropboxapi.com` | 404 | - | 1 | cookies=1 |
| `https://api.dropboxapi.com/2/users/get_current_account` | 400 | - | 0 |  |
| `https://api.dropbox.com` | 404 | - | 1 | cookies=1 |
| `https://content.dropboxapi.com` | 404 | - | 0 |  |
| `https://www.dropbox.com/security` | 301 | /features/security | 5 | cookies=5 |
| `https://www.dropbox.com/bug-bounty` | 404 | - | 0 |  |

## Notes

- XOR lane: F4 Dropbox deep vs H2 GitLab park — this tick maps Inti+Dropbox doors only.
- API unauth boundaries document gates; no tokens.

## Next (human)

- Inti researcher login browser-only; Dropbox free account if in-scope.

## Delta vs prior
- app.intigriti bare was often 200 shell; this tick **307 → www.intigriti.com**.
- Dropbox oauth2/authorize no longer soft-200: explicit **missing_client_id** error redirect.
- researcher entry now **auth/researcher** intermediate.
