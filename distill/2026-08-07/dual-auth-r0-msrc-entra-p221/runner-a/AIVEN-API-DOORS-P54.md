# Aiven console + API passive doors (PULSE-54)

UTC: 2026-08-07T16:08:33Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (max-redirs 0)

| URL | status | location | set-cookie | notes |
|-----|--------|----------|------------|-------|
| `https://aiven.io` | 200 | - | 0 |  |
| `https://aiven.io/security` | 404 | - | 0 |  |
| `https://aiven.io/developers` | 404 | - | 0 |  |
| `https://console.aiven.io` | 200 | - | 0 |  |
| `https://console.aiven.io/login` | 200 | - | 0 |  |
| `https://console.aiven.io/signup` | 200 | - | 0 |  |
| `https://console.aiven.io/account` | 200 | - | 0 |  |
| `https://api.aiven.io` | 301 | https://api.aiven.io:443/doc/ | 0 |  |
| `https://api.aiven.io/` | 301 | https://api.aiven.io:443/doc/ | 0 |  |
| `https://api.aiven.io/doc/` | 200 | - | 0 |  |
| `https://api.aiven.io/v1` | 404 | - | 0 |  |
| `https://api.aiven.io/v1/` | 404 | - | 0 |  |
| `https://api.aiven.io/v1/me` | 401 | - | 0 |  |
| `https://api.aiven.io/v1/project` | 401 | - | 0 |  |
| `https://api.aiven.io/v1/userinfo` | 401 | - | 0 |  |
| `https://bugcrowd.com/engagements/aiven` | 404 | - | 0 |  |
| `https://bugcrowd.com/engagements/aiven/brief` | 301 | https://bugcrowd.com/h/engagements/aiven/brief | 0 |  |
| `https://bugcrowd.com/h/engagements/aiven` | 200 | - | 0 |  |
| `https://bugcrowd.com/h/engagements/aiven/brief` | 200 | - | 0 |  |
| `https://bugcrowd.com/h/engagements/aiven/announcements` | 200 | - | 0 |  |
| `https://tracker.bugcrowd.com/aiven` | 302 | https://tracker.bugcrowd.com/user/sign_in | 1 | cookies=1 |
| `https://docs.aiven.io` | 301 | https://aiven.io/ | 0 |  |
| `https://help.aiven.io` | 301 | https://docs.aiven.io/ | 0 |  |
| `https://status.aiven.io` | 200 | - | 0 |  |

## Notes

- BC SSoT remains /h/engagements/aiven (bare engagements/aiven often 404).
- API /v1/me and /v1/project 401 unauth = token gate.
- Free-tier console signup is human path; no secrets in distill.

## Delta vs prior
- Added **/v1/userinfo 401** (same token gate class as me/project).
- console **/account 200** unauth SPA shell this tick.
- docs.aiven.io **301 → aiven.io/** (not a separate docs host surface).
