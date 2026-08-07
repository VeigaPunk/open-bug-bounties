# Google VRP + OAuth doors (PULSE-77)

UTC: 2026-08-07T16:54:28Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://bughunters.google.com` | 200 | - | hub |
| `https://bughunters.google.com/report` | 200 | - | report shell |
| `https://bughunters.google.com/learn` | 200 | - | learn |
| `https://bughunters.google.com/about/rules` | 301 | → about/rules/about-this-section | index hop |
| `https://bughunters.google.com/about/rules/.../vrp-rules` | 200 | - | **VRP rules SSoT** |
| `https://g.co/vulnz` | 302 | → bughunters.google.com/ | shortlink |
| `https://www.google.com/appserve/security-bugs` | 302 | → bughunters.google.com/ | legacy hop |
| `https://appsecurity.google.com` | ERR | - | not SSoT |
| `https://accounts.google.com` | 302 | → ServiceLogin | |
| `https://oauth2.googleapis.com/token` | 404 | - | GET unauth |
| `https://www.googleapis.com/oauth2/v3/userinfo` | 401 | - | unauth |
| `https://drive.google.com` | 302 | → accounts ServiceLogin | |
| `https://docs.google.com` | 302 | → accounts ServiceLogin | |
| `https://www.google.com/accounts/ServiceLogin` | 302 | → accounts.google.com/ServiceLogin | |

## Auth chain (passive)

1. VRP hub/report/learn **200**; rules long path **200**.
2. Shortlinks g.co/vulnz + appserve → bughunters.
3. Unauth product surfaces Drive/Docs → Google ServiceLogin.
4. OAuth userinfo **401**; token endpoint GET **404**.

## Delta vs P67

- Stable VRP shells + rules; appsecurity still ERR.
- rules index still 301 to about-this-section.

## Notes

- F1 dual own Google accounts still human.
- No credentials.

## Auth readiness

- F1 VRP doors stable; Google session human.

## Next (human / gated)

- Dual Google accounts; pick one product for own-data authz; avoid appspot customer OOS.
