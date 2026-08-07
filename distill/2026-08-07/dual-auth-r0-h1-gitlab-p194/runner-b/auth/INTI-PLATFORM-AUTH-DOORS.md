# Intigriti platform auth doors (passive GET only)

UTC: 2026-08-07T15:01:04Z
Policy: unauthenticated status + Location only. No login POST, no token spray, no exploit.
Ephemeral OAuth state/nonce not stored.

| URL | code0 | follow→ | notes |
|-----|-------|---------|-------|
| `https://www.intigriti.com/` | 200 | 200 | - |
| `https://intigriti.com/` | 308 | 200 | https://www.intigriti.com/ |
| `https://app.intigriti.com/` | 307 | 200 | https://www.intigriti.com |
| `https://app.intigriti.com/auth/login` | 200 | 200 | - |
| `https://app.intigriti.com/login` | 200 | 200 | - |
| `https://app.intigriti.com/researcher` | 302 | 200 | https://app.intigriti.com/auth/researcher?redirect=%2Fresearcher;https://login.intigriti.com/connect/authorize?client_id |
| `https://app.intigriti.com/profile` | 200 | 200 | - |
| `https://app.intigriti.com/programs` | 200 | 200 | - |
| `https://app.intigriti.com/programs/dropbox/dropbox` | 302 | 200 | /programs/dropbox/dropbox/detail |
| `https://app.intigriti.com/programs/dropbox/dropbox/detail` | 200 | 200 | - |
| `https://api.intigriti.com/` | 404 | 404 | - |
| `https://api.intigriti.com/core` | 404 | 404 | - |
| `https://api.intigriti.com/external/researcher` | 400 | 400 | - |
| `https://login.intigriti.com/` | 302 | 200 | /account/login |
| `https://auth.intigriti.com/` | err | - | DNS/connect fail this tick |
| `https://www.intigriti.com/researchers` | 200 | 200 | - |
| `https://www.intigriti.com/bug-bounty` | 404 | 404 | - |
| `https://blog.intigriti.com/` | 302 | 200 | https://www.intigriti.com/blog/;/blog |
| `https://intigriti.com/programs/dropbox` | 308 | 200 | https://app.intigriti.com/programs/dropbox/ |
| `https://www.intigriti.com/programs` | 308 | 200 | https://www.intigriti.com/researchers/bug-bounty-programs |

## Notes
- F4 Dropbox lives on Intigriti; platform auth is join gate for deep F4.
- Bare api.intigriti.com historically 404; app.intigriti researcher shells often 200.
- No credentials, no mutation, no customer-tenant.
