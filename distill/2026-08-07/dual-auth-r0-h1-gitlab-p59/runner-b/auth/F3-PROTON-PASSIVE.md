# F3 Proton Bug Bounty — passive product HTTP map (Runner B)

**UTC:** 2026-08-07T14:29:39Z  
**Policy recon only** — dual free accounts later; own→own IDOR class; no exploit this tick.

## Live status

| URL | Code | Role |
|-----|------|------|
| proton.me/security/bug-bounty | 200 | Official program SSoT |
| proton.me/security | **404** | Hub path gone; use /security/bug-bounty |
| proton.me/support/bug-bounty-program | **404** | Stale support slug |
| proton.me/blog | 200 | Blog |
| account.proton.me | 200 | Account shell |
| account.proton.me/mail | 200 | Account product route |
| account.proton.me/signup | 200 | Free signup entry |
| mail.proton.me | 200 | Mail app shell |
| drive.proton.me | 200 | Drive app shell |
| calendar.proton.me | 200 | Calendar app shell |

## Auth-ready implications

1. No platform join friction — dual free proton.me accounts sufficient.
2. Report channel per program page (email/PGP) — see `findings/F3-proton-dual-account.md`.
3. First 2h class: own→own Mail/Drive/API authz after dual signup (human).
4. Do not use 404 paths in reports as primary URLs.

## Related

- AUTH-READINESS matrix F3 HIGH
- findings/F3-SETUP.md · F3-proton-dual-account.md

## Axes

- evidence_fidelity↑ (404s documented)
- auth_ready↑ (signup + product shells live)
- safety_in_policy↑ (passive)
