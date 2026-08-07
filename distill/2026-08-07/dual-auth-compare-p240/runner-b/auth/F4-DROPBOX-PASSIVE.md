# F4 Dropbox — passive auth prep (policy only)

**UTC:** 2026-08-07T14:18:18Z  
**XOR:** DEEP F4 · PARK H2 (see AUTH-READINESS)

## Live passive status (this tick)

| URL | Code | Note |
|-----|------|------|
| app.intigriti.com/.../dropbox/detail | see shared/PULSE-HTTP | program shell |
| Public BB listing | Inti researcher path | join + headers required for testing |

## Auth prep checklist (no live test this tick)

1. Intigriti session warm (`op://Personal/Intigriti/…` / browser profile).
2. Join program `dropbox/dropbox` if not already.
3. Free trial account + **@intigriti.me** alias.
4. Every request: UA `Intigriti - <user> - …` + header `X-Intigriti-Username`.
5. Cap **≤5 rps**; own files/shares only.
6. Tier1 interest: api.dropbox.com, dropbox.com web authz/IDOR on own objects.
7. OOS watch: replay.dropbox.com, dropboxusercontent XSS, session-24h design.

## First 2h class (after human join)

- Dual own accounts: share link / folder ACL / API path IDOR on owned objects.
- Record evidence under `runner-b/findings/` sanitized; never paste tokens.

## Blockers remaining

- Human Inti join + trial hygiene.
- No automated scanners.
