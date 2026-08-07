# Google VRP + OAuth doors (PULSE-67)

UTC: 2026-08-07T16:34:24Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://bughunters.google.com` | 200 | - | home |
| `https://bughunters.google.com/report` | 200 | - | report shell |
| `https://bughunters.google.com/learn` | 200 | - | |
| `https://bughunters.google.com/about/rules` | 301 | → /about/rules/about-this-section | rules index hop |
| `https://bughunters.google.com/about/rules/google-friends/...-vrp-rules` | 200 | - | **VRP rules SSoT** |
| `https://g.co/vulnz` | 302 | → bughunters.google.com/ | shortlink |
| `https://appsecurity.google.com` | ERR | - | host down/unreachable |
| `https://appsecurity.google.com/reward-program` | ERR | - | same |
| `https://accounts.google.com` | 302 | → ServiceLogin | IdP |
| `https://www.googleapis.com/oauth2/v3/userinfo` | 401 | - | OAuth gate |
| `https://oauth2.googleapis.com/token` | 404 | - | GET not allowed / no shell |
| `https://drive.google.com` | 302 | → ServiceLogin (wise) | product |
| `https://docs.google.com` | 302 | → ServiceLogin | product |
| `https://mail.google.com` | 301 | → /mail/ | |
| `https://www.google.com/appserve/security-bugs` | 302 | → bughunters | legacy hop |
| `https://issuetracker.google.com` | 302 | → /issues | |

## Notes

- F1 SSoT: **bughunters.google.com** report + long VRP rules URL.
- appsecurity.google.com still **ERR** (do not rely; use bughunters).
- Dual own Google accounts for authz/IDOR; no appspot customer data.

## Delta vs P55

- Rules path still 200; appsecurity ERR persists.
- oauth2 token GET 404; userinfo 401 stable.

## Auth readiness

- Google account **human**; report form needs session.
- HIGH readiness once dual own accounts picked.

## Next (human / gated)

- Dual Google accounts; pick one first-party product; avoid appspot OOS.
