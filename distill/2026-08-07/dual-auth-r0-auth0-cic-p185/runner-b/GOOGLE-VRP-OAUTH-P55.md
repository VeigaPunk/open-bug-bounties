# Google VRP + OAuth passive doors (PULSE-55)

UTC: 2026-08-07T16:10:31Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (max-redirs 0)

| URL | status | location | set-cookie | notes |
|-----|--------|----------|------------|-------|
| `https://bughunters.google.com` | 200 | - | 0 |  |
| `https://bughunters.google.com/about/rules` | 301 | https://bughunters.google.com/about/rules/about-this-section | 0 |  |
| `https://bughunters.google.com/about/rules/6014893266272256` | 404 | - | 0 |  |
| `https://bughunters.google.com/report` | 200 | - | 0 |  |
| `https://bughunters.google.com/learn` | 200 | - | 0 |  |
| `https://g.co/vulnz` | 302 | https://bughunters.google.com/ | 0 |  |
| `https://appsecurity.google.com` | err | - | 0 |  |
| `https://appsecurity.google.com/reward-program` | err | - | 0 |  |
| `https://accounts.google.com` | 302 | https://accounts.google.com/ServiceLogin?passive=1209600&continue=https%3A%2F%2Faccounts.google | 1 | cookies=1 |
| `https://accounts.google.com/ServiceLogin` | 302 | https://accounts.google.com/InteractiveLogin?dsh=S-567668755:1786119034721397 | 1 | cookies=1 |
| `https://accounts.google.com/.well-known/openid-configuration` | 200 | - | 0 |  |
| `https://oauth2.googleapis.com/token` | 404 | - | 0 |  |
| `https://www.googleapis.com/oauth2/v3/userinfo` | 401 | - | 0 |  |
| `https://www.googleapis.com/oauth2/v1/userinfo` | 401 | - | 0 |  |
| `https://drive.google.com` | 302 | https://accounts.google.com/ServiceLogin?service=wise&passive=1209600&osid=1&continue=https://d | 1 | cookies=1 |
| `https://docs.google.com` | 302 | https://accounts.google.com/ServiceLogin?passive=1209600&osid=1&continue=https://docs.google.co | 1 | cookies=1 |
| `https://mail.google.com` | 301 | /mail/ | 0 |  |
| `https://www.google.com/about/appsecurity/` | 301 | https://about.google/appsecurity | 0 |  |
| `https://www.google.com/about/appsecurity/reward-program/` | 301 | https://bughunters.google.com/about/rules/6625378258649088 | 0 |  |

## Notes

- VRP policy SSoT is bughunters.google.com rules/report shells.
- OAuth userinfo 401 unauth documents API gate only.
- Product Drive/Docs/Mail redirect to Google login when unauth.
- No credentials; Google account is human path.

## Delta vs prior
- Rules id **6014893266272256 → 404**; reward-program now points at **6625378258649088**.
- appsecurity.google.com **ERR** (DNS/connect) this tick vs prior redirect maps.
- oauth2 token endpoint **GET 404** (POST-only class).
