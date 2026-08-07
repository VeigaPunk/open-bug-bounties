# SHIP — dual-auth-runners milestone

**Status:** APPROVED + pushed  
**Date:** 2026-08-07  
**Repo:** `~/Projects/open-bug-bounties` → `origin/main` (`git@github.com:VeigaPunk/open-bug-bounties.git`)

## Preflight

| Check | Result |
|-------|--------|
| COMPARE.md | present |
| runner-a/REPORT.md | present |
| runner-b/REPORT.md | present |
| Secret gate (strict sk-/AKIA/ghp_/xox/private key) | CLEAN |
| Parent HUNT-NOW.md + ACTION-LOG.md gate | CLEAN |

## APPROVED

`APPROVED: dual-auth race substrate + reports`

## Ship 1 — dual-auth-runners

```
~/.xbgst/scripts/milestone-ship.sh \
  --label dual-auth-runners \
  --src /home/vgpnk1337/.xbgst/bounty-distill/2026-08-07/dual-auth-runners \
  --msg 'Ship dual-auth bounty race: reports, compare, claims, dual sekhmet substrate.'
```

- **Commit:** `e46fd83` — Ship dual-auth bounty race: reports, compare, claims, dual sekhmet substrate.
- **Push:** `afe4cb8..e46fd83  main -> main` (succeeded)
- **Dest:** `distill/2026-08-07/dual-auth-runners/`

## Ship 2 — parent distill key files

```
~/.xbgst/scripts/milestone-ship.sh \
  --label bounty-distill-2026-08-07 \
  --src <tmp with HUNT-NOW.md + ACTION-LOG.md> \
  --msg 'Ship bounty-distill 2026-08-07 HUNT-NOW and ACTION-LOG (secret-clean).'
```

- **Commit:** `c508f20` — Ship bounty-distill 2026-08-07 HUNT-NOW and ACTION-LOG (secret-clean).
- **Push:** `3fc941b..c508f20  main -> main` (succeeded)
- **Dest:** `distill/2026-08-07/bounty-distill-2026-08-07/`

## git log -1 (after both ships)

```
commit c508f20f387e424e67803a0b3ee0c6226847c942
Author:     Joao Pedro Veiga <jpveigao10@gmail.com>
AuthorDate: Fri Aug 7 19:41:49 2026 -0300
Commit:     Joao Pedro Veiga <jpveigao10@gmail.com>
CommitDate: Fri Aug 7 19:41:49 2026 -0300

    Ship bounty-distill 2026-08-07 HUNT-NOW and ACTION-LOG (secret-clean).
    
    Milestone label: bounty-distill-2026-08-07
    Source: /tmp/tmp.XpgIPO9Z3n
    Godspeed: axes improved; secret gate clean; direct-to-main ship.
```

## HEAD / tracking

```
HEAD=c508f20f387e424e67803a0b3ee0c6226847c942
## main...origin/main
```

## ok

`ok=true` — both pushes to origin/main succeeded.
