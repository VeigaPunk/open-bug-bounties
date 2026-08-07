# H1 / Shopify OAuth passive map (PULSE-51)

UTC: 2026-08-07T16:02:45Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (status + location + server/set-cookie presence)

| URL | status | location | set-cookie | notes |
|-----|--------|----------|------------|-------|
| `https://hackerone.com` | 302 | https://www.hackerone.com/ | 2 | cookies=2 |
| `https://hackerone.com/users/sign_in` | 403 | - | 0 |  |
| `https://hackerone.com/users/sign_up` | 403 | - | 0 |  |
| `https://hackerone.com/oauth/authorize` | 302 | https://hackerone.com/users/sign_in | 2 | cookies=2 |
| `https://api.hackerone.com` | 200 | - | 0 |  |
| `https://api.hackerone.com/v1/hackers/me` | 401 | - | 0 |  |
| `https://www.shopify.com` | 302 | https://www.shopify.com/br | 4 | cookies=4 |
| `https://accounts.shopify.com` | 200 | - | 4 | cookies=4 |
| `https://accounts.shopify.com/lookup` | 200 | - | 4 | cookies=4 |
| `https://shopify.com/login` | 301 | https://www.shopify.com/login | 0 |  |
| `https://partners.shopify.com` | 301 | https://www.shopify.com/partners | 0 |  |
| `https://partners.shopify.com/organizations` | 302 | https://accounts.shopify.com/oauth/authorize?client_id=271e16d403dfa18082ffb3d19 | 2 | cookies=2 |
| `https://admin.shopify.com` | 200 | - | 2 | cookies=2 |
| `https://identity.shopify.com` | 404 | - | 0 |  |
| `https://gitlab.com/users/sign_in` | 403 | - | 0 |  |
| `https://gitlab.com/oauth/authorize` | 302 | https://gitlab.com/users/sign_in | 1 | cookies=1 |
| `https://gitlab.com/oauth/token` | 302 | https://gitlab.com/users/sign_in | 1 | cookies=1 |
| `https://gitlab.com/api/v4/user` | 401 | - | 0 |  |

## Auth-door notes (passive)

- H1: sign_in/sign_up public; oauth/authorize expected redirect or 4xx without client_id.
- H1 API me: unauth should 401/403 — documents API gate only.
- Shopify: accounts.shopify.com + partners + admin are primary identity surfaces.
- GitLab: classic OAuth authorize/token + /api/v4/user gate.

## Next (human / gated)

- H1 session via intentional login only (no automated credential use).
- Shopify free/partner trial if in-scope engagement allows.
- No secrets in distill; op:// only.
