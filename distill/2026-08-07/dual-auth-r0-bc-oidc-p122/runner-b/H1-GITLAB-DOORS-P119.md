# H1 + GitLab doors (PULSE-119)

UTC: 2026-08-07T18:23:20Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| Method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://hackerone.com` | 302 | `→ www.hackerone.com` |
| `GET` | `https://hackerone.com` | 302 | `→ www.hackerone.com` |
| `HEAD` | `https://hackerone.com/users/sign_in` | 403 | `-` |
| `GET` | `https://hackerone.com/users/sign_in` | 403 | `-` |
| `HEAD` | `https://hackerone.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://api.hackerone.com` | 200 | `-` |
| `GET` | `https://api.hackerone.com` | 200 | `-` |
| `HEAD` | `https://api.hackerone.com/v1/me` | 401 | `-` |
| `GET` | `https://api.hackerone.com/v1/me` | 401 | `-` |
| `HEAD` | `https://hackerone.com/gitlab` | 200 | `-` |
| `GET` | `https://hackerone.com/gitlab` | 200 | `-` |
| `HEAD` | `https://hackerone.com/shopify` | 200 | `-` |
| `GET` | `https://hackerone.com/shopify` | 200 | `-` |
| `HEAD` | `https://gitlab.com` | 301 | `→ about.gitlab.com` |
| `GET` | `https://gitlab.com` | 301 | `→ about.gitlab.com` |
| `HEAD` | `https://gitlab.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://gitlab.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://gitlab.com/oauth/discovery/keys` | 200 | `-` |
| `GET` | `https://gitlab.com/oauth/discovery/keys` | 200 | `-` |
| `HEAD` | `https://gitlab.com/users/sign_in` | 403 | `-` |
| `GET` | `https://gitlab.com/users/sign_in` | 403 | `-` |
| `HEAD` | `https://gitlab.com/users/sign_up` | 400 | `-` |
| `GET` | `https://gitlab.com/users/sign_up` | 200 | `-` |
| `HEAD` | `https://gitlab.com/explore/projects` | 200 | `-` |
| `GET` | `https://gitlab.com/explore/projects` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/gitlab` | 404 | `-` |
| `GET` | `https://bugcrowd.com/engagements/gitlab` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/gitlab` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/gitlab` | 200 | `-` |

## Auth chain (passive)

1. H1 OIDC **200**; login curl **403**; API root **200**; `/v1/me` **401**; SPA gitlab/shopify **200**.
2. GitLab OIDC+JWKS **200**; sign_in curl **403** both methods; sign_up HEAD **400** / GET **200**; explore **200**.
3. BC bare gitlab **404**; `/h` soft **200**.

## Delta vs P109

- GitLab sign_in now dual **403** (curl bot gate tighter than older mixed responses).
- H1 map stable.

## Notes

- H1/GitLab browser sessions still human; no secrets in distill.

## Auth readiness

- H1+GitLab unauth doors mapped; login human-only via browser.

## Next (human / gated)

- H1 session for Shopify/GitLab export; GitLab researcher account browser.
