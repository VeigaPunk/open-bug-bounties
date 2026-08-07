# Aiven console/API + BC doors (PULSE-64)

UTC: 2026-08-07T16:28:21Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (max-redirs 0)

| URL | status | location | notes |
|-----|--------|----------|-------|
| `https://console.aiven.io` | 200 | - | SPA shell |
| `https://console.aiven.io/login` | 200 | - | free-tier door |
| `https://console.aiven.io/signup` | 200 | - | free-tier door |
| `https://api.aiven.io` | 301 | → /doc/ | |
| `https://api.aiven.io/doc/` | 200 | - | large OpenAPI UI |
| `https://api.aiven.io/v1` | 404 | - | bare version root |
| `https://api.aiven.io/v1/me` | 401 | - | token gate |
| `https://api.aiven.io/v1/project` | 401 | - | token gate |
| `https://aiven.io` | 200 | - | marketing |
| `https://aiven.io/security` | 404 | - | no first-party security page |
| `https://docs.aiven.io` | 301 | → aiven.io/ | docs host collapsed |
| `https://help.aiven.io` | 301 | → docs.aiven.io/ | chain → marketing |
| `https://status.aiven.io` | 200 | - | status |
| `https://www.aiven.io/pricing` | 301 | → aiven.io/pricing | |
| `https://bugcrowd.com/engagements/aiven` | 404 | - | bare |
| `https://bugcrowd.com/engagements/aiven/brief` | 301 | → /h/…/brief | |
| `https://bugcrowd.com/h/engagements/aiven` | 200 | - | **BC SSoT** |
| `https://bugcrowd.com/h/engagements/aiven/brief` | 200 | - | |
| `https://bugcrowd.com/programs/aiven` | 404 | - | retired programs path |
| `https://tracker.bugcrowd.com/aiven` | 302 | → /user/sign_in | unauth |

## Notes

- Product auth: console login/signup **200** unauth shells; API needs token (**401** me/project).
- Bounty SSoT: **BC /h/engagements/aiven** (+brief); bare engagements 404; programs 404.
- aiven.io/security still **404** — policy via BC brief only.
- docs/help host redirects collapse toward aiven.io marketing this tick.

## Delta vs P54

- Stable: console 200, api me/project 401, /h SSoT, bare 404.
- docs.aiven.io → aiven.io (confirm marketing collapse).

## Auth readiness

- Free Aiven account + BC join still **human**.
- No tokens in distill.

## Next (human / gated)

- Console signup free-tier; enroll Q-BC aiven via /h brief; ninja email hygiene.
