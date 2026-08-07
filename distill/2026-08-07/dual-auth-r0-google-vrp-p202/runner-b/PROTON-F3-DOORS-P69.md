# Proton F3 BB + account doors (PULSE-69)

UTC: 2026-08-07T16:38:18Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (max-redirs 0)

| URL | status | location | notes |
|-----|--------|----------|-------|
| `https://proton.me` | 200 | - | marketing |
| `https://proton.me/security` | 404 | - | not a hub |
| `https://proton.me/security/bug-bounty` | 200 | - | **first-party BB SSoT** |
| `https://proton.me/support/bug-bounty-program` | 404 | - | old path |
| `https://account.proton.me` | 200 | - | account shell |
| `https://account.proton.me/login` | 200 | - | dual free door |
| `https://account.proton.me/signup` | 200 | - | dual free door |
| `https://mail.proton.me` | 200 | - | product shell |
| `https://drive.proton.me` | 200 | - | product shell |
| `https://calendar.proton.me` | 200 | - | product shell |
| `https://account.proton.me/mail` | 200 | - | |
| `https://proton.me/mail` | 200 | - | product marketing |
| `https://proton.me/drive` | 200 | - | |
| `https://api.proton.me` | ERR | - | no public apex |
| `https://mail-api.proton.me` | 404 | - | |
| `https://bugcrowd.com/engagements/proton` | 404 | - | bare |
| `https://bugcrowd.com/h/engagements/proton` | 200 | - | soft shell only |
| `https://hackerone.com/proton` | 404 | - | not H1 program |

## Notes

- F3 report channel per **proton.me/security/bug-bounty** (email/first-party), not H1/BC join.
- Dual free proton.me accounts via account login/signup **200**.
- BC /h soft-200 without bare engagement — do not treat as enrollment SSoT.

## Delta vs prior Proton pulses

- BB path still 200; support path still 404; security hub still 404.
- H1/proton 404; BC bare 404 /h soft-200 confirmed this tick.

## Auth readiness

- HIGH once dual free accounts created (human).
- Own→own IDOR Mail/Drive/API only.

## Next (human / gated)

- Dual free signup; read BB page for email report path; no secrets in distill.
