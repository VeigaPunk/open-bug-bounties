# Aiven console/API + BC doors (PULSE-100)

UTC: 2026-08-07T17:42:04Z
Policy: recon only — no auth, no exploit, no token harvest.
Century pulse: reaffirm Aiven doors for dual-auth r0.

## Passive HEAD/GET (max-redirs 0)

| method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://console.aiven.io` | 200 | `-` |
| `GET` | `https://console.aiven.io` | 200 | `-` |
| `HEAD` | `https://console.aiven.io/login` | 200 | `-` |
| `GET` | `https://console.aiven.io/login` | 200 | `-` |
| `HEAD` | `https://console.aiven.io/signup` | 200 | `-` |
| `GET` | `https://console.aiven.io/signup` | 200 | `-` |
| `HEAD` | `https://aiven.io` | 200 | `-` |
| `GET` | `https://aiven.io` | 200 | `-` |
| `HEAD` | `https://aiven.io/security` | 404 | `-` |
| `GET` | `https://aiven.io/security` | 404 | `-` |
| `HEAD` | `https://status.aiven.io` | 200 | `-` |
| `GET` | `https://status.aiven.io` | 200 | `-` |
| `HEAD` | `https://api.aiven.io` | 301 | `https://api.aiven.io:443/doc/` |
| `GET` | `https://api.aiven.io` | 301 | `https://api.aiven.io:443/doc/` |
| `HEAD` | `https://api.aiven.io/doc/` | 200 | `-` |
| `GET` | `https://api.aiven.io/doc/` | 200 | `-` |
| `HEAD` | `https://api.aiven.io/v1` | 404 | `-` |
| `GET` | `https://api.aiven.io/v1` | 404 | `-` |
| `HEAD` | `https://api.aiven.io/v1/me` | 405 | `-` |
| `GET` | `https://api.aiven.io/v1/me` | 401 | `-` |
| `HEAD` | `https://api.aiven.io/v1/project` | 405 | `-` |
| `GET` | `https://api.aiven.io/v1/project` | 401 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/aiven` | 404 | `-` |
| `GET` | `https://bugcrowd.com/engagements/aiven` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/aiven` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/aiven` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/aiven/brief` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/aiven/brief` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/aiven/brief` | 301 | `https://bugcrowd.com/h/engagements/aiven/brief` |
| `GET` | `https://bugcrowd.com/engagements/aiven/brief` | 301 | `https://bugcrowd.com/h/engagements/aiven/brief` |
| `HEAD` | `https://bugcrowd.com/programs/aiven` | 404 | `-` |
| `GET` | `https://bugcrowd.com/programs/aiven` | 404 | `-` |
| `HEAD` | `https://tracker.bugcrowd.com/aiven` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `GET` | `https://tracker.bugcrowd.com/aiven` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `HEAD` | `https://console.aiven.io/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://console.aiven.io/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://api.aiven.io/v1/projectauth` | 404 | `-` |
| `GET` | `https://api.aiven.io/v1/projectauth` | 404 | `-` |

## Auth chain (passive)

1. Console SPA root/login/signup GET **200/200/200**.
2. API docs **200**; v1/me HEAD/GET **405/401**.
3. BC /h SSoT **200** + brief **200**; bare **404**.
4. console OIDC well-known **200**.
5. projectauth probe **404** (expect unauth class).

## Delta vs P90

- **New:** `console.aiven.io/.well-known/openid-configuration` **200** (console host OIDC discovery).
- projectauth path **404** (not a public door).
- Stable: console login/signup **200**; API me/project **HEAD 405 / GET 401**; BC `/h` SSoT **200**; bare **404**.

## Notes

- Free-tier Aiven + BC enroll still human.
- No credentials.

## Auth readiness

- Aiven console/API + BC /h SSoT mapped; enroll human.

## Next (human / gated)

- BC enroll aiven; free console org; own-project authz only.
