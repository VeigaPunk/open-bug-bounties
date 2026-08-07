# Proton F3 BB + account doors (PULSE-79)

UTC: 2026-08-07T16:58:28Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://proton.me/security/bug-bounty` | 200 | - | **F3 first-party SSoT** |
| `https://proton.me/security` | 404 | - | no hub index |
| `https://proton.me` | 200 | - | marketing |
| `https://proton.me/support/bug-bounty` | 404 | - | support path dead |
| `https://account.proton.me/login` | 200 | - | free login door |
| `https://account.proton.me/signup` | 200 | - | free signup door |
| `https://mail.proton.me` | 200 | - | product shell |
| `https://drive.proton.me` | 200 | - | product shell |
| `https://calendar.proton.me` | 200 | - | product shell |
| `https://api.proton.me` | ERR | - | not public bare |
| `https://mail-api.proton.me` | 404 | - | |
| `https://bugcrowd.com/engagements/proton` | 404 | - | bare not SSoT |
| `https://bugcrowd.com/h/engagements/proton` | 200 | - | soft shell only |
| `https://hackerone.com/proton` | 404 | - | not H1 primary |

## Auth chain (passive)

1. Report channel: first-party `proton.me/security/bug-bounty` **200**.
2. Dual free accounts: account login+signup **200**.
3. Product shells mail/drive/calendar **200** (client auth).
4. BC/H1 not join paths for F3 (bare 404; H1 404).

## Delta vs P69

- Stable F3 SSoT + dual free doors + product shells.
- support/bug-bounty still 404; api bare ERR; /h soft-200.

## Notes

- Dual free proton.me accounts still human.
- No credentials.

## Auth readiness

- F3 first-party BB; dual free accounts human.

## Next (human / gated)

- Create dual free accounts; bookmark report channel; own→own IDOR class.
