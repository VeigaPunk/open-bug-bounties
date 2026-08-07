# Proton F3 BB + account doors (PULSE-87)

UTC: 2026-08-07T17:14:17Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://proton.me/security/bug-bounty` | 200 | - | **F3 first-party SSoT** |
| `https://proton.me/security` | 404 | - | no hub index |
| `https://proton.me` | 200 | - | marketing |
| `https://proton.me/support` | 200 | - | support hub |
| `https://proton.me/support/bug-bounty-program` | 404 | - | support BB path dead |
| `https://proton.me/blog` | 200 | - | blog |
| `https://account.proton.me` | 200 | - | account shell |
| `https://account.proton.me/login` | 200 | - | free login door |
| `https://account.proton.me/signup` | 200 | - | free signup door |
| `https://mail.proton.me` | 200 | - | product shell |
| `https://drive.proton.me` | 200 | - | product shell |
| `https://calendar.proton.me` | 200 | - | product shell |
| `https://account.proton.me/api/core/v4/domains/available` | **400** HEAD | - | unauth/bad call (not 401) |
| `https://mail.proton.me/api/core/v4/users` | **400** HEAD | - | unauth/bad call |
| `https://account.protonvpn.com` | 200 | - | VPN account shell |
| `https://account.protonvpn.com/login` | 200 | - | VPN login |
| `https://bugcrowd.com/engagements/proton` | 404 | - | bare not SSoT |
| `https://hackerone.com/proton` | 404 | - | not H1 primary |

## Auth chain (passive)

1. Report channel: first-party `proton.me/security/bug-bounty` **200**.
2. Dual free accounts: account login+signup **200**.
3. Product shells mail/drive/calendar **200** (client auth).
4. Sample unauth API paths return **400** (session/body required) — not public enumeration surfaces.
5. BC/H1 not join paths for F3 (bare/H1 **404**).

## Delta vs P79

- Stable F3 SSoT + dual free doors + product shells.
- New: account/mail API sample paths **400** unauth HEAD.
- VPN account login **200**; support hub **200** (BB path still 404).

## Notes

- Dual free proton.me accounts still human.
- No credentials.

## Auth readiness

- F3 first-party BB; dual free accounts human.

## Next (human / gated)

- Create dual free accounts; bookmark report channel; own→own IDOR class.
