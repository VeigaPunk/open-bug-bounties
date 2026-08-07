# Aiven console + API path refresh (passive GET only)

UTC: 2026-08-07T15:38:41Z
Context: Q-BC /h/aiven SSoT; re-verify free-tier entry shells + API auth boundary.

| URL | code0 | follow→ | notes |
|-----|-------|---------|-------|
| `https://aiven.io/` | 200 | 200 | - |
| `https://console.aiven.io/` | 200 | 200 | - |
| `https://console.aiven.io/login` | 200 | 200 | - |
| `https://console.aiven.io/signup` | 200 | 200 | - |
| `https://api.aiven.io/` | 301 | 200 | https://api.aiven.io:443/doc/ |
| `https://api.aiven.io/v1` | 404 | 404 | - |
| `https://api.aiven.io/v1/me` | 401 | 401 | - |
| `https://api.aiven.io/v1/project` | 401 | 401 | - |
| `https://api.aiven.io/doc/` | 200 | 200 | - |
| `https://docs.aiven.io/` | 301 | 200 | https://aiven.io/ |
| `https://help.aiven.io/` | 301 | 200 | https://aiven.io/ |
| `https://aiven.io/blog` | 200 | 200 | - |
| `https://aiven.io/security` | 404 | 404 | - |
| `https://bugcrowd.com/h/engagements/aiven` | 200 | 200 | - |
| `https://bugcrowd.com/h/engagements/aiven/brief` | 200 | 200 | - |
| `https://bugcrowd.com/engagements/aiven` | 404 | 404 | - |

## Notes
- Free-tier human signup only; no automation.
- API me/project 401 unauth expected; v1 bare may 404.
- BC bare aiven 404; use /h.
