# H1 + GitLab auth doors (PULSE-99)

UTC: 2026-08-07T17:40:04Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://hackerone.com/users/sign_in` | 403 | `-` |
| `GET` | `https://hackerone.com/users/sign_in` | 403 | `-` |
| `HEAD` | `https://hackerone.com/users/sign_up` | 403 | `-` |
| `GET` | `https://hackerone.com/users/sign_up` | 403 | `-` |
| `HEAD` | `https://hackerone.com/users/password/new` | 200 | `-` |
| `GET` | `https://hackerone.com/users/password/new` | 200 | `-` |
| `HEAD` | `https://hackerone.com/directory/programs` | 200 | `-` |
| `GET` | `https://hackerone.com/directory/programs` | 200 | `-` |
| `HEAD` | `https://hackerone.com/gitlab` | 200 | `-` |
| `GET` | `https://hackerone.com/gitlab` | 200 | `-` |
| `HEAD` | `https://hackerone.com/shopify` | 200 | `-` |
| `GET` | `https://hackerone.com/shopify` | 200 | `-` |
| `HEAD` | `https://api.hackerone.com` | 200 | `-` |
| `GET` | `https://api.hackerone.com` | 200 | `-` |
| `HEAD` | `https://api.hackerone.com/v1/hackers/me` | 401 | `-` |
| `GET` | `https://api.hackerone.com/v1/hackers/me` | 401 | `-` |
| `HEAD` | `https://gitlab.com/users/sign_in` | 403 | `-` |
| `GET` | `https://gitlab.com/users/sign_in` | 403 | `-` |
| `HEAD` | `https://gitlab.com/users/sign_up` | 400 | `-` |
| `GET` | `https://gitlab.com/users/sign_up` | 200 | `-` |
| `HEAD` | `https://gitlab.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://gitlab.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://gitlab.com/oauth/discovery/keys` | 200 | `-` |
| `GET` | `https://gitlab.com/oauth/discovery/keys` | 200 | `-` |
| `HEAD` | `https://gitlab.com/oauth/authorize` | 302 | `https://gitlab.com/users/sign_in` |
| `GET` | `https://gitlab.com/oauth/authorize` | 302 | `https://gitlab.com/users/sign_in` |
| `HEAD` | `https://gitlab.com/api/v4/version` | 401 | `-` |
| `GET` | `https://gitlab.com/api/v4/version` | 401 | `-` |
| `HEAD` | `https://gitlab.com/api/v4/user` | 401 | `-` |
| `GET` | `https://gitlab.com/api/v4/user` | 401 | `-` |
| `HEAD` | `https://gitlab.com/api/v4/projects?per_page=1` | 200 | `-` |
| `GET` | `https://gitlab.com/api/v4/projects?per_page=1` | 200 | `-` |
| `HEAD` | `https://about.gitlab.com/security/disclosure/` | 200 | `-` |
| `GET` | `https://about.gitlab.com/security/disclosure/` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/gitlab` | 404 | `-` |
| `GET` | `https://bugcrowd.com/engagements/gitlab` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/gitlab` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/gitlab` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/gitlab/brief` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/gitlab/brief` | 200 | `-` |
| `HEAD` | `https://hackerone.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | `-` |

## Auth chain (passive)

1. H1 sign_in/sign_up GET **403/403** (bot gate expected).
2. H1 SPA gitlab/shopify **200/200**; API me **401**.
3. GitLab OIDC **200**; JWKS **200**.
4. GitLab sign_up HEAD/GET **400/200**; sign_in **403**.
5. Public projects list **200**; version/user **401/401**.
6. BC bare gitlab **404**; /h soft **200**.

## Delta vs P89

- **New:** `hackerone.com/.well-known/openid-configuration` **200** (platform OIDC discovery).
- GitLab sign_up still **HEAD 400 / GET 200**; sign_in **403** curl gate.
- H1 login still **403** curl; SPA gitlab/shopify **200**; API me **401** stable.
- BC bare gitlab **404**; /h soft **200** stable.

## Notes

- H1 session + asset export still human; browser preferred over curl for login.
- No credentials.

## Auth readiness

- H1 SPA + GitLab OIDC mapped; H2 parked; H1 authed export human.

## Next (human / gated)

- H1 browser login; export Shopify assets if H1 path; own GitLab group only if unparked.
