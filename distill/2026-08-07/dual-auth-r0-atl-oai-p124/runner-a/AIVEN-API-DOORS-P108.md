# Aiven console/API + BC doors (PULSE-108)

UTC: 2026-08-07T18:01:32Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://console.aiven.io` | 200 | `-` |
| `GET` | `https://console.aiven.io` | 200 | `-` |
| `HEAD` | `https://console.aiven.io/login` | 200 | `-` |
| `GET` | `https://console.aiven.io/login` | 200 | `-` |
| `HEAD` | `https://console.aiven.io/signup` | 200 | `-` |
| `GET` | `https://console.aiven.io/signup` | 200 | `-` |
| `HEAD` | `https://console.aiven.io/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://console.aiven.io/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://api.aiven.io` | 301 | `https://api.aiven.io:443/doc/` |
| `GET` | `https://api.aiven.io` | 301 | `https://api.aiven.io:443/doc/` |
| `HEAD` | `https://api.aiven.io/doc/` | 200 | `-` |
| `GET` | `https://api.aiven.io/doc/` | 200 | `-` |
| `HEAD` | `https://api.aiven.io/v1/me` | 405 | `-` |
| `GET` | `https://api.aiven.io/v1/me` | 401 | `-` |
| `HEAD` | `https://api.aiven.io/v1/project` | 405 | `-` |
| `GET` | `https://api.aiven.io/v1/project` | 401 | `-` |
| `HEAD` | `https://aiven.io` | 200 | `-` |
| `GET` | `https://aiven.io` | 200 | `-` |
| `HEAD` | `https://status.aiven.io` | 200 | `-` |
| `GET` | `https://status.aiven.io` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/aiven` | 404 | `-` |
| `GET` | `https://bugcrowd.com/engagements/aiven` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/aiven` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/aiven` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/aiven/brief` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/aiven/brief` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/aiven-mbb-og` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/aiven-mbb-og` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/aiven-mbb-og` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/aiven-mbb-og` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/aiven-mbb-og/brief` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/aiven-mbb-og/brief` | 200 | `-` |
| `HEAD` | `https://tracker.bugcrowd.com/aiven` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `GET` | `https://tracker.bugcrowd.com/aiven` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `HEAD` | `https://api.aiven.io/v1` | 404 | `-` |
| `GET` | `https://api.aiven.io/v1` | 404 | `-` |

## Auth chain (passive)

1. Console root/login/signup **200**; console OIDC well-known **200**.
2. API → doc **301**; docs **200**; v1 root **404**; me/project HEAD **405** / GET **401**.
3. BC: bare aiven **404**; `/h` aiven + brief **200**; **aiven-mbb-og** bare+`/h`+brief **200** (joined SSoT).
4. tracker aiven → sign_in **302**.

## Delta vs P100

- **New:** explicit `aiven-mbb-og` engagement bare **200** (joined program slug).
- Stable: console OIDC **200**; API me/project method split; bare aiven **404** vs `/h` soft **200**.

## Notes

- Free-tier + @bugcrowdninja still human.
- No credentials.

## Auth readiness

- Aiven console/API + BC mbb-og SSoT mapped; enroll/instance human.

## Next (human / gated)

- Free console org dual ninja; own-project authz only.
