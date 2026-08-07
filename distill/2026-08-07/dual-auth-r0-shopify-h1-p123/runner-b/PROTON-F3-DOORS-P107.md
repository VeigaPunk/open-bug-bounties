# Proton F3 dual-account doors (PULSE-107)

UTC: 2026-08-07T17:59:34Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://proton.me` | 200 | `-` |
| `GET` | `https://proton.me` | 200 | `-` |
| `HEAD` | `https://proton.me/security` | 404 | `-` |
| `GET` | `https://proton.me/security` | 404 | `-` |
| `HEAD` | `https://proton.me/security/bug-bounty` | 200 | `-` |
| `GET` | `https://proton.me/security/bug-bounty` | 200 | `-` |
| `HEAD` | `https://proton.me/support/bug-bounty` | 404 | `-` |
| `GET` | `https://proton.me/support/bug-bounty` | 404 | `-` |
| `HEAD` | `https://account.proton.me` | 200 | `-` |
| `GET` | `https://account.proton.me` | 200 | `-` |
| `HEAD` | `https://account.proton.me/login` | 200 | `-` |
| `GET` | `https://account.proton.me/login` | 200 | `-` |
| `HEAD` | `https://account.proton.me/signup` | 200 | `-` |
| `GET` | `https://account.proton.me/signup` | 200 | `-` |
| `HEAD` | `https://mail.proton.me` | 200 | `-` |
| `GET` | `https://mail.proton.me` | 200 | `-` |
| `HEAD` | `https://account.proton.me/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://account.proton.me/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://protonmail.com` | 301 | `https://proton.me/mail` |
| `GET` | `https://protonmail.com` | 301 | `https://proton.me/mail` |
| `HEAD` | `https://api.protonmail.ch` | 404 | `-` |
| `GET` | `https://api.protonmail.ch` | 404 | `-` |
| `HEAD` | `https://mail-api.proton.me` | 404 | `-` |
| `GET` | `https://mail-api.proton.me` | 404 | `-` |
| `HEAD` | `https://account-api.proton.me` | 404 | `-` |
| `GET` | `https://account-api.proton.me` | 404 | `-` |
| `HEAD` | `https://verify.proton.me` | 200 | `-` |
| `GET` | `https://verify.proton.me` | 200 | `-` |
| `HEAD` | `https://hackerone.com/proton` | 404 | `-` |
| `GET` | `https://hackerone.com/proton` | 404 | `-` |
| `HEAD` | `https://hackerone.com/protonmail` | 404 | `-` |
| `GET` | `https://hackerone.com/protonmail` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/proton` | 404 | `-` |
| `GET` | `https://bugcrowd.com/engagements/proton` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/proton` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/proton` | 200 | `-` |
| `HEAD` | `https://intigriti.com/programs/proton` | 308 | `https://app.intigriti.com/programs/proton/` |
| `GET` | `https://intigriti.com/programs/proton` | 308 | `https://app.intigriti.com/programs/proton/` |
| `HEAD` | `https://app.intigriti.com/programs/proton` | 200 | `-` |
| `GET` | `https://app.intigriti.com/programs/proton` | 200 | `-` |

## Auth chain (passive)

1. Program policy: proton.me/security/bug-bounty **200**; bare /security **404**; support/bug-bounty **404**.
2. Auth shells: account login/signup **200**; mail **200**; account OIDC well-known **200**.
3. Legacy protonmail.com → proton.me/mail **301**; api.protonmail.ch **404**; mail-api/account-api root **404**.
4. verify.proton.me **200** (verification shell).
5. Platforms: H1 proton/protonmail **404**; BC bare **404** /h soft **200**; Inti programs/proton → app **308**, app path **200** (F3 SSoT).

## Delta vs P93

- **New:** account.proton.me OIDC well-known **200**.
- **New:** Inti app.intigriti.com/programs/proton **200** (SSoT vs H1/BC bare dead).
- BB policy path **200** stable; dual signup doors **200** stable.

## Notes

- Dual own Proton accounts only for F3 authz; no third-party.
- No credentials.

## Auth readiness

- Proton policy + account OIDC + Inti program shell mapped; dual signup human.

## Next (human / gated)

- Create dual free Proton accounts; re-read Inti/Proton scope; own-account only.
