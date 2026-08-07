# Aiven console/API + BC doors (PULSE-74)

UTC: 2026-08-07T16:48:07Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://console.aiven.io` | 200 | - | SPA shell |
| `https://console.aiven.io/login` | 200 | - | login SPA |
| `https://console.aiven.io/signup` | 200 | - | free-tier door |
| `https://aiven.io` | 200 | - | marketing |
| `https://aiven.io/security` | 404 | - | no public security hub path |
| `https://api.aiven.io` | 301 | → /doc/ | |
| `https://api.aiven.io/doc/` | 200 | - | OpenAPI/docs shell |
| `https://api.aiven.io/v1` | 404 | - | bare v1 root |
| `https://api.aiven.io/v1/me` | 401 | - | unauth |
| `https://api.aiven.io/v1/project` | 401 | - | unauth |
| `https://docs.aiven.io` | 301 | → aiven.io/ | docs bounce |
| `https://help.aiven.io` | 301 | → docs.aiven.io/ | help→docs chain |
| `https://bugcrowd.com/engagements/aiven` | 404 | - | bare |
| `https://bugcrowd.com/h/engagements/aiven` | 200 | - | **/h SSoT soft** |
| `https://bugcrowd.com/h/engagements/aiven/brief` | 200 | - | brief shell |
| `https://bugcrowd.com/engagements/aiven/brief` | 301 | → /h/.../brief | bare brief rewrite |
| `https://bugcrowd.com/programs/aiven` | 404 | - | retired alias |
| `https://tracker.bugcrowd.com/aiven` | 302 | → /user/sign_in | |
| `https://identity.bugcrowd.com/login` | 200 | - | BC IdP |

## Auth chain (passive)

1. Console SPA: root/login/signup all **200** (client-side auth).
2. API: bare → docs; v1/me + v1/project **401** without token.
3. BC join path: bare engagements/aiven **404**; **/h/engagements/aiven** + brief **200**; bare brief → /h.

## Delta vs P64

- Stable matrix: console 200; API me/project 401; /h SSoT; bare 404.
- Confirmed bare `/engagements/aiven/brief` **301→/h**; security path still 404.

## Notes

- Free-tier console still human; no API token in distill.
- No credentials.

## Auth readiness

- Aiven doors stable; free-tier + BC enroll human.

## Next (human / gated)

- Console free signup; BC identity login; enroll /h aiven brief.
