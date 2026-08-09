# OVERNIGHT-LOOP — idle dispatch policy (overnight-gold-farm)

**Session:** overnight-gold-farm · **Date:** 2026-08-08  
**Axes:** idle_utilization↑ thrash↓ evidence_fidelity↑ safety_in_policy↑ gold_ev_per_hour↑

## Goal

Keep hydra substrate fertile overnight **without** CAPTCHA/Get-Credentials thrash, fake COMPLETE, or catalog page-walk of ~1100 programs. Work only the **EV-QUEUE** keep-8 and existing H1–H3 maps.

## Components

| Component | Cadence | Role |
|-----------|---------|------|
| **hydra-whip.sh** | 119s loop (`~/.local/state/hydra-whip.pid`) | Observe REPORT age, COMPLETE scan, op **title** presence, sekhmet window health; **log-only** when doors closed |
| **hydra-pruner.sh** | ~90s (tmux `hydra:pruner`) + on-demand | `/tmp` GC, luna roots, fertile TOUCH, `sekhmet gc` |
| **sekhmet-a/b/c** | on-demand | L3 j64 only on **own-scope checklist** `tasks.md` under lane workdirs |
| **hydra-refill.sh** | only on COMPLETE | 1 COMPLETE → 2 from EV-QUEUE / HUNT-NOW keep-8 |

## Idle policy (doors closed)

1. **Whip = log only** when human gates closed and REPORT fresh (&lt;5m) or stall is human-only. No spawn storms. No Set5/Okta SPA/CAPTCHA loops on the 119s tick.  
2. **Pruner always OK** — disk fertility, not recon thrash.  
3. **sekhmet only** when a lane has a written own-scope / policy / FIRST-5 checklist in `tasks.md` (never `.txt`). Include godspeed + milestone-ship line. No live exploit payloads against third-party.  
4. **No page-walk of ~1100** open-bug-bounties listings. EV-QUEUE freezes rank.  
5. **No fake COMPLETE.** COMPLETE requires own-asset evidence paths in lane STATUS/REPORT. MAP ≠ COMPLETE.  
6. **Human-gate pulse** = timestamps + CRED-STATE / HUMAN-GATES title checks only; secrets via the-janitor; never write op reveals into distill.  
7. **OVERFIT** work only (see `EV-QUEUE.md`): Aiven prep path unless a gate opens elsewhere — then recompute, do not thrash losers.  
8. **Distill hygiene:** `~/.xbgst/bounty-distill/2026-08-08/overnight-gold-farm/`; secret-gate before any ship.

## When a door opens

| Signal | Action |
|--------|--------|
| Aiven op titles A+B present | Flip stack STATUS path; FIRST-5 own-asset; evidence → COMPLETE only if real |
| Auth0 CRED ASSIGNED | wrap CRED-STATE; dual-auth reuse; no CAPTCHA retry loops |
| Second Google research usable | grok Drive T1–T5; else stay map/negative-close |
| Any COMPLETE | `hydra-refill` 2 + `milestone-ship.sh` if APPROVED + secret gate green |

## Forbidden overnight

- CAPTCHA / Get Credentials button spam  
- Fake COMPLETE to exercise refill  
- Alphabetical or full-catalog recon  
- Killing tmux session `0` or protected panes  
- Printing secrets or writing credentials into repo/distill  
- Client-side CAPTCHA “bypass” tooling  

## Substrate check (ops)

```sh
tmux list-windows -t hydra -F '#{window_name}'
# expect: orch pruner stack wrap grok sekhmet-a sekhmet-b sekhmet-c
test -x ~/.xbgst/scripts/hydra-whip.sh
cat ~/.local/state/hydra-whip.pid; kill -0 "$(cat ~/.local/state/hydra-whip.pid)"
bash ~/.xbgst/scripts/hydra-pruner.sh   # expect: done
tail -5 ~/.xbgst/hydra-bounty/logs/WHIP.log
```

## Success boundary (dawn)

- EV-QUEUE + this policy live  
- Whip pid healthy; pruner green; zero thrash evidence in WHIP.log  
- At least one lane advanced **or** honest BLOCKED(human)+recovery notes  
- Zero secrets in distill; zero fake COMPLETE  

**evidence:** policy artifact for M04; execution measured by whip/pruner logs + tracker timestamps.
