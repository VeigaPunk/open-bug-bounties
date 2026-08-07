# BC platform OIDC + docs doors (PULSE-106)

UTC: 2026-08-07T17:57:35Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://bugcrowd.com` | 301 | `https://www.bugcrowd.com/` |
| `GET` | `https://bugcrowd.com` | 301 | `https://www.bugcrowd.com/` |
| `HEAD` | `https://bugcrowd.com/user/sign_in` | 302 | `https://identity.bugcrowd.com/login?user_hint=researcher&returnTo=https%3A%2F%2Fbugcrowd.c` |
| `GET` | `https://bugcrowd.com/user/sign_in` | 302 | `https://identity.bugcrowd.com/login?user_hint=researcher&returnTo=https%3A%2F%2Fbugcrowd.c` |
| `HEAD` | `https://bugcrowd.com/user/sign_up` | 301 | `https://login.bugcrowd.com/signin/register` |
| `GET` | `https://bugcrowd.com/user/sign_up` | 301 | `https://login.bugcrowd.com/signin/register` |
| `HEAD` | `https://bugcrowd.com/login` | 404 | `-` |
| `GET` | `https://bugcrowd.com/login` | 404 | `-` |
| `HEAD` | `https://identity.bugcrowd.com` | 403 | `-` |
| `GET` | `https://identity.bugcrowd.com` | 403 | `-` |
| `HEAD` | `https://identity.bugcrowd.com/login` | 200 | `-` |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | `-` |
| `HEAD` | `https://identity.bugcrowd.com/login/hacker` | 302 | `https://identity.bugcrowd.com/login/hacker/oauth2/authorization/hacker` |
| `GET` | `https://identity.bugcrowd.com/login/hacker` | 302 | `https://identity.bugcrowd.com/login/hacker/oauth2/authorization/hacker` |
| `HEAD` | `https://login.hackers.bugcrowd.com` | 302 | `https://identity.bugcrowd.com/login/hacker` |
| `GET` | `https://login.hackers.bugcrowd.com` | 302 | `https://identity.bugcrowd.com/login/hacker` |
| `HEAD` | `https://login.hackers.bugcrowd.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://login.hackers.bugcrowd.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/.well-known/openid-configuration` | 404 | `-` |
| `GET` | `https://bugcrowd.com/.well-known/openid-configuration` | 404 | `-` |
| `HEAD` | `https://docs.bugcrowd.com` | 200 | `-` |
| `GET` | `https://docs.bugcrowd.com` | 200 | `-` |
| `HEAD` | `https://docs.bugcrowd.com/researchers/onboarding/getting-started/` | 404 | `-` |
| `GET` | `https://docs.bugcrowd.com/researchers/onboarding/getting-started/` | 404 | `-` |
| `HEAD` | `https://docs.bugcrowd.com/researchers/onboarding/bugcrowd-ninja-email/` | 404 | `-` |
| `GET` | `https://docs.bugcrowd.com/researchers/onboarding/bugcrowd-ninja-email/` | 404 | `-` |
| `HEAD` | `https://docs.bugcrowd.com/researchers/api/getting-started/` | 404 | `-` |
| `GET` | `https://docs.bugcrowd.com/researchers/api/getting-started/` | 404 | `-` |
| `HEAD` | `https://docs.bugcrowd.com/researchers/reporting/bugcrowd-ninja-email/` | 404 | `-` |
| `GET` | `https://docs.bugcrowd.com/researchers/reporting/bugcrowd-ninja-email/` | 404 | `-` |
| `HEAD` | `https://tracker.bugcrowd.com` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `GET` | `https://tracker.bugcrowd.com` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `HEAD` | `https://api.bugcrowd.com` | 200 | `-` |
| `GET` | `https://api.bugcrowd.com` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h` | 404 | `-` |
| `GET` | `https://bugcrowd.com/h` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/programs` | 301 | `https://bugcrowd.com/engagements` |
| `GET` | `https://bugcrowd.com/programs` | 301 | `https://bugcrowd.com/engagements` |
| `HEAD` | `https://bugcrowd.com/engagements` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements` | 200 | `-` |
| `HEAD` | `https://docs.bugcrowd.com/researchers/onboarding/welcome` | 302 | `/researchers/onboarding/welcome/` |
| `GET` | `https://docs.bugcrowd.com/researchers/onboarding/welcome` | 302 | `/researchers/onboarding/welcome/` |
| `HEAD` | `https://docs.bugcrowd.com/api/getting-started` | 302 | `/api/getting-started/` |
| `GET` | `https://docs.bugcrowd.com/api/getting-started` | 302 | `/api/getting-started/` |
| `HEAD` | `https://docs.bugcrowd.com/api/latest` | 302 | `/api/latest/` |
| `GET` | `https://docs.bugcrowd.com/api/latest` | 302 | `/api/latest/` |
| `HEAD` | `https://docs.bugcrowd.com/researchers/changelog` | 302 | `/researchers/changelog/` |
| `GET` | `https://docs.bugcrowd.com/researchers/changelog` | 302 | `/researchers/changelog/` |
| `HEAD` | `https://www.bugcrowd.com/hackers/` | 200 | `-` |
| `GET` | `https://www.bugcrowd.com/hackers/` | 200 | `-` |
| `HEAD` | `https://login.bugcrowd.com/signin/register` | 200 | `-` |
| `GET` | `https://login.bugcrowd.com/signin/register` | 200 | `-` |

## Auth chain (passive)

1. Apex bugcrowd.com → www **301**; engagements list **200**; programs → engagements **301**.
2. sign_in → identity login researcher hint **302**; identity apex **403**; identity `/login` **200**.
3. login.hackers → identity `/login/hacker` **302** → oauth2 authorization **302**.
4. OIDC: `login.hackers.bugcrowd.com/.well-known/openid-configuration` **200**; marketing host well-known **404**.
5. sign_up → login.bugcrowd.com/signin/register **301** (register **200**).
6. Docs root **200**; legacy onboarding/ninja/api researcher paths **404** — new SSoT: `/researchers/onboarding/welcome`, `/api/getting-started`.
7. tracker → sign_in **302**; api.bugcrowd.com **200**; bare `/h` **404** (program shells need full slug).

## Delta vs P98

- **Breaking docs:** prior ninja-email + researchers/api/getting-started paths now **404**.
- **New SSoT:** docs `/researchers/onboarding/welcome` + `/api/getting-started` (linked from docs root).
- sign_up hop to `login.bugcrowd.com/signin/register` (was often identity path).
- OIDC login.hackers **200** stable; identity researcher chain stable.

## Notes

- Browser BC session still human.
- No credentials.

## Auth readiness

- BC OIDC + identity chain mapped; docs SSoT refreshed after path break.

## Next (human / gated)

- Browser identity login; re-bookmark welcome + API getting-started docs.
