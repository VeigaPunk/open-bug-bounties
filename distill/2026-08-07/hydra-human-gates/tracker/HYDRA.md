# HYDRA bounty claimer (live)

**Top orch:** Grok session xbgst-stack / wrap / grok  
**Whip:** 119s smart godspeed (scheduler)  
**Rule:** 1 completed → fetch 2 new  
**Updated:** 2026-08-07T22:37:28Z

| Lane | Orch | Sekhmet | Bounty | State | Ship |
|------|------|---------|--------|-------|------|
| **stack** | xbgst-stack | luna-a | **Aiven** | MAPPED (own-asset gate) | `143b7d8` hydra-aiven-stack |
| **wrap** | workflow wrap | luna-b | **Auth0 CIC** | MAPPED (cred pending) | `301911b` hydra-auth0-wrap |
| **grok** | xbgst-grok | luna-c | **Google VRP Drive** | MAPPED (A/B accounts) | `2ad5517` hydra-google-vrp-grok |

## Active teams
| ID | Program | Lane | Out | Blocker for COMPLETE |
|----|---------|------|-----|----------------------|
| H1 | Aiven Q-BC | stack | lanes/stack/aiven/ | free-tier service + 2-member authz probe |
| H2 | Auth0 CIC | wrap | lanes/wrap/auth0/ | BC Get Credentials assigned → op vault |
| H3 | Google VRP | grok | lanes/grok/google-vrp/ | two research Google sessions for Drive T1–T5 |

## Completed
| ID | Program | Evidence | Ship |
|----|---------|----------|------|
| — | — | — | — |

## Ships this session (audit)
- hydra-scaffold / plan-r0 / pruner / connector / whip-tick (earlier)
- **143b7d8** hydra-aiven-stack
- **301911b** hydra-auth0-wrap  
- **2ad5517** hydra-google-vrp-grok stamp

## Substrate
- sekhmet-luna-{a,b,c}.sh → gpt-5.6-luna + fast + j=64 roots under $XDG_RUNTIME_DIR/xbrd-spark-luna-*
- pruner: hydra-pruner.sh (tmux hydra:pruner)
- tmux: `tmux attach -t hydra`
- fnm: hydra-fnm-shell.sh
- agent-pip: `agent-pip a|b|c promptfile`
- agent-wall: ~/.local/share/agent-wall (state stub)

## Queue refill source (when COMPLETE fires)
HUNT-NOW keep-8: aiven, auth0, okta, atlassian, openai, google-vrp, msrc, proton, dropbox-inti, shopify-h1  
**Refill rule:** each COMPLETE → enqueue 2 next not already ACTIVE

## Whip policy (smart)
- If REPORT mtime < 5m and fertile TOUCH fresh → log only
- If missing REPORT or stall → spawn lane tick / sekhmet / ship
- Never thrash Set5 Okta SPA / CAPTCHA doors on 119s loop
- COMPLETE only with evidence paths of own-asset tests

## Next top-orch errands
1. Aiven: provision free Postgres under ninja/op — then T1 membership matrix
2. Auth0: human redeem Get Credentials → CRED-STATE assigned
3. Google: run Drive FIRST-5 with A/B accounts locally
4. On any COMPLETE → hydra-refill 2 + new team dirs + ship

## Blockers
| ID | Blocker |
|----|--------|
| H1 Aiven | free-tier @bugcrowdninja console signup not completed — no authz probes yet |
