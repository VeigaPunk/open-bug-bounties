# BC platform OIDC doors (PULSE-116)

UTC: 2026-08-07T18:17:22Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| Method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://login.hackers.bugcrowd.net/.well-known/openid-configuration` | 000 | `-` |
| `GET` | `https://login.hackers.bugcrowd.net/.well-known/openid-configuration` | 000 | `-` |
| `HEAD` | `https://login.bugcrowd.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://login.bugcrowd.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://identity.bugcrowd.com/.well-known/openid-configuration` | 403 | `-` |
| `GET` | `https://identity.bugcrowd.com/.well-known/openid-configuration` | 403 | `-` |
| `HEAD` | `https://auth.bugcrowd.com/.well-known/openid-configuration` | 000 | `-` |
| `GET` | `https://auth.bugcrowd.com/.well-known/openid-configuration` | 000 | `-` |
| `HEAD` | `https://identity.bugcrowd.com/login` | 200 | `-` |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/user/sign_in` | 302 | `→ identity…/login?user_hint=researcher` |
| `GET` | `https://bugcrowd.com/user/sign_in` | 302 | `→ identity…/login?user_hint=researcher` |
| `HEAD` | `https://bugcrowd.com/h` | 404 | `-` |
| `GET` | `https://bugcrowd.com/h` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com` | 301 | `→ www.bugcrowd.com` |
| `GET` | `https://bugcrowd.com` | 301 | `→ www.bugcrowd.com` |
| `HEAD` | `https://docs.bugcrowd.com` | 200 | `-` |
| `GET` | `https://docs.bugcrowd.com` | 200 | `-` |
| `HEAD` | `https://docs.bugcrowd.com/researchers/onboarding/getting-started/` | 404 | `-` |
| `GET` | `https://docs.bugcrowd.com/researchers/onboarding/getting-started/` | 404 | `-` |
| `HEAD` | `https://docs.bugcrowd.com/api/` | 404 | `-` |
| `GET` | `https://docs.bugcrowd.com/api/` | 404 | `-` |
| `HEAD` | `https://docs.bugcrowd.com/researchers/getting-started/welcome/` | 404 | `-` |
| `GET` | `https://docs.bugcrowd.com/researchers/getting-started/welcome/` | 404 | `-` |
| `HEAD` | `https://tracker.bugcrowd.com` | 302 | `→ /user/sign_in` |
| `GET` | `https://tracker.bugcrowd.com` | 302 | `→ /user/sign_in` |
| `HEAD` | `https://tracker.bugcrowd.com/user/sign_in` | 200 | `-` |
| `GET` | `https://tracker.bugcrowd.com/user/sign_in` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/programs` | 301 | `→ /engagements` |
| `GET` | `https://bugcrowd.com/programs` | 301 | `→ /engagements` |
| `HEAD` | `https://bugcrowd.com/engagements` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements` | 200 | `-` |

## Auth chain (passive)

1. **OIDC SSoT shift:** `login.bugcrowd.com` discovery **200**; `login.hackers.bugcrowd.net` **000** this tick.
2. identity.bugcrowd.com login **200**; bare OIDC on identity **403**.
3. researcher sign_in → identity with user_hint **302**.
4. bare `/h` **404**; `/h/engagements` **200**; engagements list **200**.
5. docs root **200**; legacy researcher path strings still **404**.
6. tracker apex → sign_in **302**; sign_in page **200**.

## Delta vs P106

- **Material:** login.hackers.bugcrowd.net OIDC **200→000**; prefer **login.bugcrowd.com** OIDC **200**.
- identity login + researcher hop + /h/engagements stable.
- docs legacy paths remain 404 (relocation ongoing).

## Notes

- BC session still human; no secrets in distill.

## Auth readiness

- Platform identity + OIDC host map refreshed; researcher door via identity.

## Next (human / gated)

- Browser BC identity login; re-check login.hackers if DNS returns.
