# Aiven BC path recovery + product shells (passive GET only)

UTC: 2026-08-07T15:14:58Z
Context: PULSE-28 bare /engagements/aiven 404; brief path worked.

| URL | code0 | follow→ | notes |
|-----|-------|---------|-------|
| `https://bugcrowd.com/engagements/aiven` | 404 | 404 | - |
| `https://bugcrowd.com/engagements/aiven/brief` | 301 | 200 | https://bugcrowd.com/h/engagements/aiven/brief |
| `https://bugcrowd.com/h/engagements/aiven` | 200 | 200 | - |
| `https://bugcrowd.com/h/engagements/aiven/brief` | 200 | 200 | - |
| `https://bugcrowd.com/h/engagements/aiven/announcements` | 200 | 200 | - |
| `https://bugcrowd.com/h/engagements/aiven/crowdstream` | 200 | 200 | - |
| `https://bugcrowd.com/engagements?category=bug_bounty&search=aiven` | 200 | 200 | - |
| `https://bugcrowd.com/search?q=aiven` | 301 | 200 | https://bugcrowd.com/h/search?q=aiven |
| `https://www.aiven.io/` | 301 | 200 | https://aiven.io/ |
| `https://aiven.io/` | 200 | 200 | - |
| `https://console.aiven.io/` | 200 | 200 | - |
| `https://console.aiven.io/login` | 200 | 200 | - |
| `https://console.aiven.io/signup` | 200 | 200 | - |
| `https://api.aiven.io/` | 301 | 200 | https://api.aiven.io:443/doc/ |
| `https://api.aiven.io/v1/me` | 401 | 401 | - |
| `https://api.aiven.io/v1/project` | 401 | 401 | - |
| `https://docs.aiven.io/` | 301 | 200 | https://aiven.io/ |
| `https://aiven.io/security` | 404 | 404 | - |
| `https://aiven.io/blog` | 200 | 200 | - |
| `https://help.aiven.io/` | 301 | 200 | https://docs.aiven.io/;https://aiven.io/ |

## Notes
- Prefer working /h/engagements/aiven/* paths as BC SSoT until bare slug returns 200.
- API me/project 401 unauth expected.
- No credentials, no free-tier account creation this tick.
