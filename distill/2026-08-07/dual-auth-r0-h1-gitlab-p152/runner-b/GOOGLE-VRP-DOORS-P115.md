# Google VRP doors (PULSE-115)

UTC: 2026-08-07T18:15:38Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| Method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://bughunters.google.com` | 200 | `-` |
| `GET` | `https://bughunters.google.com` | 200 | `-` |
| `HEAD` | `https://bughunters.google.com/learn` | 200 | `-` |
| `GET` | `https://bughunters.google.com/learn` | 200 | `-` |
| `HEAD` | `https://g.co/vulnz` | 302 | `→ bughunters.google.com` |
| `GET` | `https://g.co/vulnz` | 302 | `→ bughunters.google.com` |
| `HEAD` | `https://accounts.google.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://accounts.google.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://www.googleapis.com/oauth2/v3/certs` | 200 | `-` |
| `GET` | `https://www.googleapis.com/oauth2/v3/certs` | 200 | `-` |
| `HEAD` | `https://accounts.google.com/o/oauth2/v2/auth` | 302 | `→ signin/oauth/error (missing params)` |
| `GET` | `https://accounts.google.com/o/oauth2/v2/auth` | 302 | `→ signin/oauth/error (missing params)` |
| `HEAD` | `https://admin.google.com` | 204 | `-` |
| `GET` | `https://admin.google.com` | 302 | `→ google.com/sorry (bot gate)` |
| `HEAD` | `https://hackerone.com/google` | 200 | `-` |
| `GET` | `https://hackerone.com/google` | 200 | `-` |
| `HEAD` | `https://hackerone.com/googlevrp` | 404 | `-` |
| `GET` | `https://hackerone.com/googlevrp` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/google` | 404 | `-` |
| `GET` | `https://bugcrowd.com/engagements/google` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/google` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/google` | 200 | `-` |
| `HEAD` | `https://www.google.com/about/appsecurity/` | 301 | `→ about.google/appsecurity` |
| `GET` | `https://www.google.com/about/appsecurity/` | 301 | `→ about.google/appsecurity` |
| `HEAD` | `https://issuetracker.google.com` | 302 | `→ /issues` |
| `GET` | `https://issuetracker.google.com` | 302 | `→ /issues` |

## Auth chain (passive)

1. VRP portal bughunters **200**; g.co/vulnz → portal **302**.
2. accounts OIDC **200**; JWKS certs **200**; bare oauth2/v2/auth → invalid_request **302**.
3. admin.google HEAD **204** / GET sorry-gate **302**.
4. H1 google **200**; googlevrp **404**; BC bare **404** /h soft **200**.

## Delta vs P105

- Stable VRP portal + OIDC/JWKS + H1/BC map; admin sorry gate still present.

## Notes

- Google account session still human; no secrets in distill.

## Auth readiness

- VRP public doors + Google OIDC/JWKS mapped; platform auth human.

## Next (human / gated)

- Browser Google account for bughunters submit path.
