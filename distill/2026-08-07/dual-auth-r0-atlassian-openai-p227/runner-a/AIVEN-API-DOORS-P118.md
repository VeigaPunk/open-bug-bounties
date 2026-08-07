# Aiven console/API doors (PULSE-118)

UTC: 2026-08-07T18:21:22Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| Method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://console.aiven.io/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://console.aiven.io/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://console.aiven.io` | 200 | `-` |
| `GET` | `https://console.aiven.io` | 200 | `-` |
| `HEAD` | `https://console.aiven.io/login` | 200 | `-` |
| `GET` | `https://console.aiven.io/login` | 200 | `-` |
| `HEAD` | `https://console.aiven.io/signup` | 200 | `-` |
| `GET` | `https://console.aiven.io/signup` | 200 | `-` |
| `HEAD` | `https://api.aiven.io` | 301 | `→ /doc/` |
| `GET` | `https://api.aiven.io` | 301 | `→ /doc/` |
| `HEAD` | `https://api.aiven.io/v1/me` | 405 | `-` |
| `GET` | `https://api.aiven.io/v1/me` | 401 | `-` |
| `HEAD` | `https://aiven.io` | 200 | `-` |
| `GET` | `https://aiven.io` | 200 | `-` |
| `HEAD` | `https://aiven.io/security` | 404 | `-` |
| `GET` | `https://aiven.io/security` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/aiven` | 404 | `-` |
| `GET` | `https://bugcrowd.com/engagements/aiven` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/aiven` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/aiven` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/aiven-mbb-og` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/aiven-mbb-og` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/aiven-mbb-og` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/aiven-mbb-og` | 200 | `-` |
| `HEAD` | `https://hackerone.com/aiven` | 404 | `-` |
| `GET` | `https://hackerone.com/aiven` | 404 | `-` |

## Auth chain (passive)

1. console OIDC + login/signup **200**.
2. api root → docs **301**; `/v1/me` HEAD **405** / GET **401**.
3. BC bare aiven **404**; /h soft **200**; aiven-mbb-og bare+/h **200** SSoT.
4. H1 aiven **404**; marketing /security **404**.

## Delta vs P108

- Stable OIDC+API+mbb-og SSoT; no material regression.

## Notes

- Console session still human; no secrets in distill.

## Auth readiness

- Aiven console/API unauth gates + BC SSoT mapped.

## Next (human / gated)

- BC aiven-mbb-og session; console enroll if in-scope.
