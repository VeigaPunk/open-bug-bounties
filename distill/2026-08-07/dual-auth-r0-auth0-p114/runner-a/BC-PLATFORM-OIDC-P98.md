# Bugcrowd platform OIDC + docs (PULSE-98)

UTC: 2026-08-07T17:38:03Z
Policy: recon only — no auth, no exploit, no token harvest.
OAuth query values redacted.

## Passive HEAD/GET (max-redirs 0)

| method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://bugcrowd.com` | 301 | `https://www.bugcrowd.com/` |
| `GET` | `https://bugcrowd.com` | 301 | `https://www.bugcrowd.com/` |
| `HEAD` | `https://bugcrowd.com/user/sign_in` | 302 | `https://identity.bugcrowd.com/login?user_hint=…&returnTo=https%3A%2F%2Fbugcrowd.com%2Fdashboard` |
| `GET` | `https://bugcrowd.com/user/sign_in` | 302 | `https://identity.bugcrowd.com/login?user_hint=…&returnTo=https%3A%2F%2Fbugcrowd.com%2Fdashboard` |
| `HEAD` | `https://bugcrowd.com/user/sign_up` | 301 | `https://login.bugcrowd.com/signin/register` |
| `GET` | `https://bugcrowd.com/user/sign_up` | 301 | `https://login.bugcrowd.com/signin/register` |
| `HEAD` | `https://bugcrowd.com/engagements` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/programs` | 301 | `https://bugcrowd.com/engagements` |
| `GET` | `https://bugcrowd.com/programs` | 301 | `https://bugcrowd.com/engagements` |
| `HEAD` | `https://identity.bugcrowd.com` | 403 | `-` |
| `GET` | `https://identity.bugcrowd.com` | 403 | `-` |
| `HEAD` | `https://identity.bugcrowd.com/login` | 200 | `-` |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | `-` |
| `HEAD` | `https://login.hackers.bugcrowd.com` | 302 | `https://identity.bugcrowd.com/login/hacker` |
| `GET` | `https://login.hackers.bugcrowd.com` | 302 | `https://identity.bugcrowd.com/login/hacker` |
| `HEAD` | `https://login.hackers.bugcrowd.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://login.hackers.bugcrowd.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://login.hackers.bugcrowd.com/oauth2/default/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://login.hackers.bugcrowd.com/oauth2/default/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://login.bugcrowd.com` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `GET` | `https://login.bugcrowd.com` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `HEAD` | `https://tracker.bugcrowd.com` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `GET` | `https://tracker.bugcrowd.com` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `HEAD` | `https://tracker.bugcrowd.com/user/sign_in` | 200 | `-` |
| `GET` | `https://tracker.bugcrowd.com/user/sign_in` | 200 | `-` |
| `HEAD` | `https://api.bugcrowd.com` | 200 | `-` |
| `GET` | `https://api.bugcrowd.com` | 200 | `-` |
| `HEAD` | `https://api.bugcrowd.com/v2` | 404 | `-` |
| `GET` | `https://api.bugcrowd.com/v2` | 404 | `-` |
| `HEAD` | `https://docs.bugcrowd.com` | 200 | `-` |
| `GET` | `https://docs.bugcrowd.com` | 200 | `-` |
| `HEAD` | `https://docs.bugcrowd.com/api` | 404 | `-` |
| `GET` | `https://docs.bugcrowd.com/api` | 404 | `-` |
| `HEAD` | `https://docs.bugcrowd.com/api/getting-started/` | 200 | `-` |
| `GET` | `https://docs.bugcrowd.com/api/getting-started/` | 200 | `-` |
| `HEAD` | `https://docs.bugcrowd.com/researchers/participating-in-program/your-bugcrowdninja-email-address/` | 200 | `-` |
| `GET` | `https://docs.bugcrowd.com/researchers/participating-in-program/your-bugcrowdninja-email-address/` | 200 | `-` |
| `HEAD` | `https://docs.bugcrowd.com/researchers/onboarding/your-bugcrowdninja-email-address/` | 404 | `-` |
| `GET` | `https://docs.bugcrowd.com/researchers/onboarding/your-bugcrowdninja-email-address/` | 404 | `-` |
| `HEAD` | `https://docs.bugcrowd.com/researchers/using-email-aliases/` | 404 | `-` |
| `GET` | `https://docs.bugcrowd.com/researchers/using-email-aliases/` | 404 | `-` |
| `HEAD` | `https://docs.bugcrowd.com/docs/getting-started-with-the-bugcrowd-api/` | 404 | `-` |
| `GET` | `https://docs.bugcrowd.com/docs/getting-started-with-the-bugcrowd-api/` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/h` | 404 | `-` |
| `GET` | `https://bugcrowd.com/h` | 404 | `-` |
| `HEAD` | `https://www.bugcrowd.com` | 200 | `-` |
| `GET` | `https://www.bugcrowd.com` | 200 | `-` |

## Auth chain (passive)

1. sign_in **302** → `https://identity.bugcrowd.com/login?user_hint=…&returnTo=https%3A%2F%2Fbugcrowd.com%2Fdash`.
2. identity login **200**; bare identity **403**.
3. hackers OIDC root **200**; oauth2/default **200**.
4. Docs API SSoT **200**; ninja email SSoT **200**.
5. Onboarding ninja path **404** (expect 404).
6. api.bugcrowd bare **200**; /v2 **404**; /h soft **404**.

## Delta vs P88

- Auth chain + OIDC discovery (root + oauth2/default) **200** stable.
- Docs SSoT: api/getting-started + participating-in-program ninja email **200**; onboarding/* still **404**.
- **New explicit:** bare `bugcrowd.com/h` **404** (soft shells live under `/h/engagements/...` only).
- api.bugcrowd bare **200**; /v2 **404** stable.

## Notes

- Q-BC enroll still human.
- No credentials.

## Auth readiness

- BC identity + OIDC + ninja/API docs SSoT mapped; enroll human.

## Next (human / gated)

- BC researcher login; enroll target engagements; ninja email for programs that require it.
