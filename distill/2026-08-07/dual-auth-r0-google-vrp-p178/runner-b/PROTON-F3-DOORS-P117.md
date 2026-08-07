# Proton F3 doors (PULSE-117)

UTC: 2026-08-07T18:19:23Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| Method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://account.proton.me/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://account.proton.me/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://account.proton.me` | 200 | `-` |
| `GET` | `https://account.proton.me` | 200 | `-` |
| `HEAD` | `https://account.proton.me/login` | 200 | `-` |
| `GET` | `https://account.proton.me/login` | 200 | `-` |
| `HEAD` | `https://account.proton.me/signup` | 200 | `-` |
| `GET` | `https://account.proton.me/signup` | 200 | `-` |
| `HEAD` | `https://proton.me/security/bug-bounty` | 200 | `-` |
| `GET` | `https://proton.me/security/bug-bounty` | 200 | `-` |
| `HEAD` | `https://proton.me/blog/bug-bounty` | 404 | `-` |
| `GET` | `https://proton.me/blog/bug-bounty` | 404 | `-` |
| `HEAD` | `https://mail.proton.me` | 200 | `-` |
| `GET` | `https://mail.proton.me` | 200 | `-` |
| `HEAD` | `https://app.intigriti.com/programs/proton` | 200 | `-` |
| `GET` | `https://app.intigriti.com/programs/proton` | 200 | `-` |
| `HEAD` | `https://app.intigriti.com` | 307 | `→ www.intigriti.com` |
| `GET` | `https://app.intigriti.com` | 307 | `→ www.intigriti.com` |
| `HEAD` | `https://login.intigriti.com/.well-known/openid-configuration` | 405 | `-` |
| `GET` | `https://login.intigriti.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://hackerone.com/proton` | 404 | `-` |
| `GET` | `https://hackerone.com/proton` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/proton` | 404 | `-` |
| `GET` | `https://bugcrowd.com/engagements/proton` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/proton` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/proton` | 200 | `-` |

## Auth chain (passive)

1. account.proton OIDC + login/signup **200**; BB policy **200**; blog path **404**.
2. Inti programs/proton **200** SSoT; app apex → www **307**.
3. login.intigriti OIDC HEAD **405** / GET **200** method split.
4. H1/BC bare proton **404**; BC `/h` soft **200**.

## Delta vs P107

- Stable OIDC+Inti SSoT; blog bug-bounty **404** confirmed.

## Notes

- Dual-account F3 still human; no secrets in distill.

## Auth readiness

- Proton account + Inti program doors mapped; H1 not used.

## Next (human / gated)

- Dual Proton accounts + Inti researcher session.
