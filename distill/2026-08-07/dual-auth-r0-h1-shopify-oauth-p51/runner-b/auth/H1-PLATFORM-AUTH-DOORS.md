# HackerOne platform auth doors (passive GET only)

UTC: 2026-08-07T15:05:00Z
Policy: unauthenticated status + Location only. No login POST, no token spray, no exploit.
Ephemeral OAuth state/nonce not stored.

| URL | code0 | follow→ | notes |
|-----|-------|---------|-------|
| `https://www.hackerone.com/` | 200 | 200 | - |
| `https://hackerone.com/` | 302 | 200 | https://www.hackerone.com/ |
| `https://hackerone.com/users/sign_in` | 403 | 403 | - |
| `https://hackerone.com/users/sign_up` | 403 | 403 | - |
| `https://hackerone.com/users/password/new` | 200 | 200 | - |
| `https://hackerone.com/hacktivity` | 301 | 200 | https://hackerone.com/hacktivity/overview |
| `https://hackerone.com/directory/programs` | 200 | 200 | - |
| `https://hackerone.com/opportunities/all` | 200 | 200 | - |
| `https://hackerone.com/bugs` | 302 | 403 | https://hackerone.com/users/sign_in |
| `https://hackerone.com/settings` | 404 | 404 | - |
| `https://api.hackerone.com/` | 200 | 200 | - |
| `https://api.hackerone.com/v1/hackers/me` | 401 | 401 | - |
| `https://api.hackerone.com/v1/hackers/programs` | 401 | 401 | - |
| `https://api.hackerone.com/docs` | 404 | 404 | - |
| `https://docs.hackerone.com/` | 302 | 200 | https://docs.hackerone.com/en/ |
| `https://hackerone.com/shopify` | 200 | 200 | - |
| `https://hackerone.com/gitlab` | 200 | 200 | - |
| `https://hackerone.com/security` | 200 | 200 | - |
| `https://www.hackerone.com/product/security` | 404 | 404 | - |
| `https://hackerone.com/.well-known/change-password` | 404 | 404 | - |

## Notes
- Curl often gets 403 on H1 app routes (bot challenge); browser session required for export.
- Hacker API me/programs expected 401 unauth when not challenged.
- Programs Shopify/GitLab public shells previously 200 — re-check this tick.
- No credentials, no mutation.
