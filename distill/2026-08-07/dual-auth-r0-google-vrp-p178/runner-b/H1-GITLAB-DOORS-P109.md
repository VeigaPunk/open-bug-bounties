# H1 + GitLab doors (PULSE-109)

UTC: 2026-08-07T18:03:35Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://hackerone.com` | 302 | `https://www.hackerone.com/` |
| `GET` | `https://hackerone.com` | 302 | `https://www.hackerone.com/` |
| `HEAD` | `https://hackerone.com/users/sign_in` | 403 | `-` |
| `GET` | `https://hackerone.com/users/sign_in` | 403 | `-` |
| `HEAD` | `https://hackerone.com/users/sign_up` | 403 | `-` |
| `GET` | `https://hackerone.com/users/sign_up` | 403 | `-` |
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
| `HEAD` | `https://gitlab.com` | 301 | `https://about.gitlab.com/` |
| `GET` | `https://gitlab.com` | 301 | `https://about.gitlab.com/` |
| `HEAD` | `https://gitlab.com/users/sign_in` | 403 | `-` |
| `GET` | `https://gitlab.com/users/sign_in` | 403 | `-` |
| `HEAD` | `https://gitlab.com/users/sign_up` | 400 | `-` |
| `GET` | `https://gitlab.com/users/sign_up` | 200 | `-` |
| `HEAD` | `https://gitlab.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://gitlab.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://gitlab.com/oauth/discovery/keys` | 200 | `-` |
| `GET` | `https://gitlab.com/oauth/discovery/keys` | 200 | `-` |
| `HEAD` | `https://gitlab.com/api/v4/version` | 401 | `-` |
| `GET` | `https://gitlab.com/api/v4/version` | 401 | `-` |
| `HEAD` | `https://gitlab.com/api/v4/user` | 401 | `-` |
| `GET` | `https://gitlab.com/api/v4/user` | 401 | `-` |
| `HEAD` | `https://gitlab.com/api/v4/projects?per_page=1` | 200 | `-` |
| `GET` | `https://gitlab.com/api/v4/projects?per_page=1` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/gitlab` | 404 | `-` |
| `GET` | `https://bugcrowd.com/engagements/gitlab` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/gitlab` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/gitlab` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/gitlab/brief` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/gitlab/brief` | 200 | `-` |
| `HEAD` | `https://about.gitlab.com/security/disclosure/` | 200 | `-` |
| `GET` | `https://about.gitlab.com/security/disclosure/` | 200 | `-` |

## Auth chain (passive)

1. H1 apex → www **302**; sign_in/sign_up curl **403** (bot gate); OIDC well-known **200**.
2. H1 API root **200**; `/v1/me` **401**; SPA gitlab/shopify **200**.
3. GitLab apex → about **301**; OIDC **200**; JWKS keys **200**.
4. GitLab sign_up HEAD **400** / GET **200**; sign_in **403**.
5. API version/user **401**; public projects list **200**.
6. BC bare gitlab **404**; `/h`+brief soft **200**; about disclosure **200**.

## Delta vs P99

- H1 API root **200** (was often unprobed or similar); me **401** stable.
- GitLab method splits stable; OIDC+JWKS **200** stable; H1 login still curl-**403**.

## Notes

- H1 browser login + asset export human; own GitLab group only if unparked.
- No credentials.

## Auth readiness

- H1 OIDC+API + GitLab OIDC/JWKS mapped; sessions human.

## Next (human / gated)

- H1 browser session; Shopify asset export if path active.
