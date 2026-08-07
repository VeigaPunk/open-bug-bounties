# Proton F3 BB + account doors (PULSE-93)

UTC: 2026-08-07T17:28:02Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://proton.me/security/bug-bounty` | 200 | `-` |
| `GET` | `https://proton.me/security/bug-bounty` | 200 | `-` |
| `HEAD` | `https://proton.me/security` | 404 | `-` |
| `GET` | `https://proton.me/security` | 404 | `-` |
| `HEAD` | `https://proton.me` | 200 | `-` |
| `GET` | `https://proton.me` | 200 | `-` |
| `HEAD` | `https://proton.me/support` | 200 | `-` |
| `GET` | `https://proton.me/support` | 200 | `-` |
| `HEAD` | `https://proton.me/support/bug-bounty-program` | 404 | `-` |
| `GET` | `https://proton.me/support/bug-bounty-program` | 404 | `-` |
| `HEAD` | `https://proton.me/blog` | 200 | `-` |
| `GET` | `https://proton.me/blog` | 200 | `-` |
| `HEAD` | `https://account.proton.me` | 200 | `-` |
| `GET` | `https://account.proton.me` | 200 | `-` |
| `HEAD` | `https://account.proton.me/login` | 200 | `-` |
| `GET` | `https://account.proton.me/login` | 200 | `-` |
| `HEAD` | `https://account.proton.me/signup` | 200 | `-` |
| `GET` | `https://account.proton.me/signup` | 200 | `-` |
| `HEAD` | `https://mail.proton.me` | 200 | `-` |
| `GET` | `https://mail.proton.me` | 200 | `-` |
| `HEAD` | `https://drive.proton.me` | 200 | `-` |
| `GET` | `https://drive.proton.me` | 200 | `-` |
| `HEAD` | `https://calendar.proton.me` | 200 | `-` |
| `GET` | `https://calendar.proton.me` | 200 | `-` |
| `HEAD` | `https://account.proton.me/api/core/v4/domains/available` | 400 | `-` |
| `GET` | `https://account.proton.me/api/core/v4/domains/available` | 400 | `-` |
| `HEAD` | `https://mail.proton.me/api/core/v4/users` | 400 | `-` |
| `GET` | `https://mail.proton.me/api/core/v4/users` | 400 | `-` |
| `HEAD` | `https://account.protonvpn.com` | 200 | `-` |
| `GET` | `https://account.protonvpn.com` | 200 | `-` |
| `HEAD` | `https://account.protonvpn.com/login` | 200 | `-` |
| `GET` | `https://account.protonvpn.com/login` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/proton` | 404 | `-` |
| `GET` | `https://bugcrowd.com/engagements/proton` | 404 | `-` |
| `HEAD` | `https://hackerone.com/proton` | 404 | `-` |
| `GET` | `https://hackerone.com/proton` | 404 | `-` |
| `HEAD` | `https://account.proton.me/api/core/v4/auth/sessions` | 404 | `-` |
| `GET` | `https://account.proton.me/api/core/v4/auth/sessions` | 404 | `-` |
| `HEAD` | `https://proton.me/pass` | 200 | `-` |
| `GET` | `https://proton.me/pass` | 200 | `-` |
| `HEAD` | `https://pass.proton.me` | 200 | `-` |
| `GET` | `https://pass.proton.me` | 200 | `-` |

## Auth chain (passive)

1. Report channel: first-party `proton.me/security/bug-bounty` GET **200** (F3 SSoT).
2. Dual free doors: login **200**, signup **200**.
3. Product shells mail/drive/calendar GET **200/200/200**.
4. Sample unauth API: domains/available **400**, users **400**, auth/sessions **404** (expect 4xx without session).
5. Pass product: marketing pass **200**, pass.proton.me **200**.
6. BC/H1 not join paths: BC proton **404**, H1 proton **404**.

## Delta vs P87

- **New:** Pass product doors — `proton.me/pass` + `pass.proton.me` **200** (own→own Pass in-scope class later).
- **New:** `api/core/v4/auth/sessions` **404** unauth (not a public session enum surface).
- domains/available + users still **400** unauth (session/body required).
- F3 BB SSoT + login/signup + mail/drive/calendar **200** stable; BC/H1 proton **404**.

## Notes

- Dual free proton.me accounts still human.
- No credentials.

## Auth readiness

- F3 first-party BB; dual free accounts human.

## Next (human / gated)

- Create dual free accounts; bookmark report channel; own→own IDOR class.
