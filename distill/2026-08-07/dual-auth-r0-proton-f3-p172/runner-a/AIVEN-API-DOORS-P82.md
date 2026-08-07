# Aiven console/API + BC doors (PULSE-82)

UTC: 2026-08-07T17:04:02Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://console.aiven.io` | 200 | - | SPA shell |
| `https://console.aiven.io/login` | 200 | - | login SPA |
| `https://console.aiven.io/signup` | 200 | - | free-tier door |
| `https://aiven.io` | 200 | - | marketing |
| `https://aiven.io/docs` | 301 | → /docs/ | |
| `https://aiven.io/security` | 404 | - | no public security hub |
| `https://aiven.io/blog` | 200 | - | blog shell |
| `https://api.aiven.io` | 301 | → /doc/ | |
| `https://api.aiven.io/doc/` | 200 GET | - | OpenAPI/docs shell |
| `https://api.aiven.io/v1` | 404 | - | bare v1 root |
| `https://api.aiven.io/v1/me` | **405 HEAD / 401 GET** | - | method-sensitive unauth |
| `https://api.aiven.io/v1/project` | **405 HEAD / 401 GET** | - | method-sensitive unauth |
| `https://api.aiven.io/v1/userinfo` | **405 HEAD / 401 GET** | - | method-sensitive unauth |
| `https://docs.aiven.io` | 301 | → aiven.io/ | docs bounce |
| `https://help.aiven.io` | 301 | → docs.aiven.io/ | help→docs chain |
| `https://status.aiven.io` | 200 | - | status shell |
| `https://bugcrowd.com/engagements/aiven` | 404 | - | bare |
| `https://bugcrowd.com/h/engagements/aiven` | 200 | - | **/h SSoT soft** |
| `https://bugcrowd.com/h/engagements/aiven/brief` | 200 | - | brief shell |
| `https://bugcrowd.com/engagements/aiven/brief` | 301 | → /h/.../brief | bare brief rewrite |
| `https://bugcrowd.com/programs/aiven` | 404 | - | retired alias |
| `https://tracker.bugcrowd.com/aiven` | 302 | → /user/sign_in | |
| `https://identity.bugcrowd.com/login` | 200 GET | - | BC IdP |

## Auth chain (passive)

1. Console SPA: root/login/signup all **200** (client-side auth).
2. API: bare → docs; GET v1/me|project|userinfo **401** without token; HEAD on same paths **405** (method not allowed).
3. BC join path: bare engagements/aiven **404**; **/h/engagements/aiven** + brief **200**; bare brief → /h.

## Delta vs P74

- Material: HEAD vs GET split on API auth endpoints (**405** vs **401**) — document for recon tooling (prefer GET for auth gate signal).
- Console + /h SSoT + bare 404 matrix otherwise **stable**.
- status.aiven.io **200** noted.

## Notes

- Free-tier console still human; no API token in distill.
- No credentials.

## Auth readiness

- Aiven doors stable; free-tier + BC enroll human; API still token-gated (401 GET).

## Next (human / gated)

- Console free signup; BC identity login; enroll /h aiven brief.
