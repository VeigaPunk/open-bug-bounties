# Google VRP + OAuth doors (PULSE-85)

UTC: 2026-08-07T17:10:04Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://bughunters.google.com` | 200 | - | hub |
| `https://bughunters.google.com/report` | 200 | - | report shell |
| `https://bughunters.google.com/learn` | 200 | - | learn |
| `https://bughunters.google.com/about/rules` | 301 | → about/rules/about-this-section | index hop |
| `https://bughunters.google.com/about/rules/.../vrp-rules` | 200 | - | **VRP rules SSoT** |
| `https://www.google.com/about/appsecurity/` | 301 | → about.google/appsecurity | legacy marketing hop |
| `https://www.google.com/about/appsecurity/reward-program/` | 301 | → bughunters rules id path | legacy → VRP |
| `https://accounts.google.com` | 302 | → ServiceLogin | |
| `https://accounts.google.com/.well-known/openid-configuration` | 200 | - | Google OIDC |
| `https://oauth2.googleapis.com/` | 404 | - | bare |
| `https://www.googleapis.com/` | 404 | - | bare |
| `https://drive.google.com` | 302 | → accounts ServiceLogin | |
| `https://docs.google.com` | 302 | → accounts ServiceLogin | |
| `https://mail.google.com` | 301 | → /mail/ | |
| `https://myaccount.google.com` | 302 | → /intro | |
| `https://console.cloud.google.com` | 302 | → ServiceLogin cloudconsole | |
| `https://admin.google.com` | **204** HEAD | - | empty OK / probe soft |
| `https://hackerone.com/google` | 200 | - | H1 mirror shell (not F1 SSoT) |
| `https://security.googleblog.com` | 301 | → blog.google/security/ | |

## Auth chain (passive)

1. VRP hub/report/learn **200**; long rules path **200** (SSoT).
2. Legacy appsecurity/reward-program hop into bughunters rules.
3. Unauth product surfaces Drive/Docs/Cloud console → Google ServiceLogin.
4. OIDC discovery on accounts.google.com **200**; bare oauth2/googleapis roots **404**.
5. H1 `/google` SPA shell **200** — submit remains bughunters first-party for F1.

## Delta vs P77

- Confirmed accounts OIDC discovery **200** (new explicit check this cycle).
- Legacy reward-program → bughunters rules id path **301**.
- admin.google.com HEAD **204** (soft); Drive/Docs still ServiceLogin.
- VRP shells stable.

## Notes

- F1 dual own Google accounts still human.
- No credentials.

## Auth readiness

- F1 VRP doors stable; Google session human.

## Next (human / gated)

- Dual Google accounts; pick one product for own-data authz; avoid appspot customer OOS.
