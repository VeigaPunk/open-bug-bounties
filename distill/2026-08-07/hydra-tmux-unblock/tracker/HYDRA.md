# HYDRA bounty claimer (live)

**Top orch:** Grok session xbgst-stack / wrap / grok  
**Whip:** `~/.xbgst/scripts/hydra-whip.sh` loop 119s (`~/.local/state/hydra-whip.pid`)  
**Rule:** 1 completed → fetch 2 new  
**Updated:** 2026-08-07T23:14:00Z

| Lane | Orch | Sekhmet | Bounty | State | Ship |
|------|------|---------|--------|-------|------|
| **stack** | xbgst-stack | luna-a | **Aiven** | MAPPED (own-asset gate) | hydra-aiven-stack + tmux-unblock |
| **wrap** | workflow wrap | luna-b | **Auth0 CIC** | MAPPED (cred pending) | hydra-auth0-wrap |
| **grok** | xbgst-grok | luna-c | **Google VRP Drive** | MAPPED (A/B accounts) | hydra-google-vrp-grok |

## Active teams
| ID | Program | Lane | Out | Blocker for COMPLETE |
|----|---------|------|-----|----------------------|
| H1 | Aiven Q-BC | stack | lanes/stack/aiven/ | free-tier service + 2-member authz probe (op titles missing) |
| H2 | Auth0 CIC | wrap | lanes/wrap/auth0/ | BC Get Credentials assigned → op vault (inbox empty) |
| H3 | Google VRP | grok | lanes/grok/google-vrp/ | two research Google sessions for Drive T1–T5 |

## Completed
| ID | Program | Evidence | Ship |
|----|---------|----------|------|
| — | — | — | — |

## Ships this session (audit)
- hydra-scaffold / plan-r0 / pruner / connector / whip-tick
- **143b7d8** hydra-aiven-stack · **301911b** hydra-auth0-wrap · **2ad5517** hydra-google-vrp-grok
- **2026-08-07T23:14Z hydra-tmux-unblock:** dedup hydra clients; sekhmet GC; L3 tasks-v3 green; hydra-whip.sh installed; passive doors re-pulse; Gmail/op probes

## Substrate
- sekhmet-luna-{a,b,c}.sh → gpt-5.6-luna + fast + j=64 roots under `$XDG_RUNTIME_DIR/xbrd-spark-luna-*`
- pruner: hydra-pruner.sh (tmux `hydra:pruner` 90s loop)
- whip: hydra-whip.sh 119s (op token probe + no thrash)
- tmux server PID **1311** session `hydra` windows 1–9
- agent-pip / agent-wall: external attach sessions

## Queue refill source (when COMPLETE fires)
HUNT-NOW keep-8: aiven, auth0, okta, atlassian, openai, google-vrp, msrc, proton, dropbox-inti, shopify-h1  
**Refill rule:** each COMPLETE → enqueue 2 next not already ACTIVE

## Whip policy (smart)
- If REPORT mtime < 5m and fertile TOUCH fresh → log only
- If missing REPORT or stall → spawn lane tick / sekhmet / ship
- Never thrash Set5 Okta SPA / CAPTCHA doors on 119s loop
- COMPLETE only with evidence paths of own-asset tests

## Next top-orch errands
1. **Human:** Aiven free dual via NEXT-TICK.md → op titles `Aiven BB Account A/B API`
2. **Human:** when Auth0 email lands → op vault → flip CRED-STATE ASSIGNED
3. **Human:** second Google research login for Drive FIRST-5
4. On any COMPLETE → hydra-refill 2 + ship

## Blockers (honest)
| ID | Blocker | Agent-unblocked? |
|----|---------|------------------|
| H1 Aiven free-tier | ninja signup + dual tokens | **No** (needs mailbox + browser signup) |
| H2 Auth0 assign | BC async credential email | **No** (inbox re-probed empty) |
| H3 Google A/B | second research Google | **No** (only 1 usable Google login in op) |
| L3 namespace collide | fixed spark ids | **YES** — gc + UUID tasks-v3 |
| Missing hydra-whip.sh | M08 gap | **YES** — script + loop |
| Duplicate hydra attach | 2 clients | **YES** — killed extra |

## Rank (connector)
Closest to first submit-ready draft still: **grok/Google VRP** (if second Google session) > stack/Aiven > wrap/Auth0 (cred pending).
