# F4 XOR Dropbox DEEP / GitLab STUB (P240)

**XOR decision:** Dropbox depth (Intigriti). GitLab deep blocked intentionally.

## Dropbox — FULL (public)

- security.txt: Bug Bounty Program `https://app.intigriti.com/programs/dropbox/dropbox`
- VDP: `https://app.intigriti.com/programs/dropbox/dropbox-vdp`
- Contact: bugbounty@dropbox.com; acknowledgements on Intigriti leaderboard.
- Vault title: Intigriti (labels: Input.Username, Input.Password, notesPlain).

### Authz readiness language

- Own Dropbox account(s) only; free trial as needed for paid feature doors.
- Own-file sharing / API token scoped to researcher files — no third-party data.
- Confirm program join + any required UA/header when human session available.
- sekhmet: `sp-rb-p240-f4-dropbox` status=ok (spark pool → luna fallback, rate_limit note).

## GitLab — STUB

- Not deep this lane while Dropbox XOR holds.
- Resume only if Dropbox depth complete or XOR flips in shared claims.

## Next

Intigriti login (op run) → join Dropbox program → export scope table → UA/header notes.
