# Aiven console/API + BC doors (PULSE-90)

UTC: 2026-08-07T17:20:05Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://console.aiven.io` | 200 | - | SPA shell |
| `https://console.aiven.io/login` | 200 | - | login SPA |
| `https://console.aiven.io/signup` | 200 | - | free-tier door |
| `https://aiven.io` | 200 | - | marketing |
| `https://aiven.io/security` | 404 | - | no public security hub |
| `https://status.aiven.io` | 200 | - | status |
| `https://api.aiven.io` | 301 | → /doc/ | |
| `https://api.aiven.io/doc/` | 200 | - | OpenAPI/docs shell |
| `https://api.aiven.io/v1` | 404 | - | bare v1 root |
| `https://api.aiven.io/v1/me` | **405 HEAD / 401 GET** | - | method-sensitive unauth |
| `https://api.aiven.io/v1/project` | **405 HEAD / 401 GET** | - | method-sensitive unauth |
| `https://bugcrowd.com/engagements/aiven` | 404 | - | bare |
| `https://bugcrowd.com/h/engagements/aiven` | 200 | - | **/h SSoT soft** |
| `https://bugcrowd.com/h/engagements/aiven/brief` | 200 | - | brief |
| `https://bugcrowd.com/engagements/aiven/brief` | 301 | → /h/.../brief | bare brief rewrite |
| `https://bugcrowd.com/programs/aiven` | 404 | - | retired |
| `https://tracker.bugcrowd.com/aiven` | 302 | → /user/sign_in | |

## Auth chain (passive)

1. Console SPA: root/login/signup **200**.
2. API: bare → docs; GET v1/me|project **401**; HEAD **405**.
3. BC join: bare **404**; **/h/engagements/aiven** + brief **200**.

## Delta vs P82

- Stable matrix (console 200; HEAD/GET API split; /h SSoT).
- No material path drift this tick.

## Notes

- Free-tier console + BC enroll still human.
- No credentials.

## Auth readiness

- Aiven doors stable; free-tier + BC enroll human.

## Next (human / gated)

- Console free signup; BC identity; enroll /h aiven brief.
