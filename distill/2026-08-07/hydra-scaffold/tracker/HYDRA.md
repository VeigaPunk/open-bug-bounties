# HYDRA bounty claimer (live)

**Top orch:** Grok session xbgst-stack  
**Whip:** 119s smart godspeed (scheduler)  
**Rule:** 1 completed → fetch 2 new  

| Lane | Orch | Sekhmet | Bounty | State |
|------|------|---------|--------|-------|
| **stack** | xbgst-stack specialists | luna-a | **Aiven** | RUNNING |
| **wrap** | workflow dual-bounty-auth + wrap style | luna-b | **Auth0 CIC** | RUNNING |
| **grok** | xbgst-grok style team | luna-c | **Google VRP** | RUNNING |

## Active teams
| ID | Program | Lane | Out |
|----|---------|------|-----|
| H1 | Aiven Q-BC | stack | lanes/stack/aiven/ |
| H2 | Auth0 CIC | wrap | lanes/wrap/auth0/ |
| H3 | Google VRP | grok | lanes/grok/google-vrp/ |

## Completed
| ID | Program | Evidence | Ship |
|----|---------|----------|------|
| — | — | — | — |

## Substrate
- sekhmet-luna-{a,b,c}.sh → gpt-5.6-luna + fast + j=64
- pruner: hydra-pruner.sh (tmux hydra:pruner)
- tmux: `tmux attach -t hydra`
- fnm: hydra-fnm-shell.sh
- agent-pip: `agent-pip a|b|c promptfile`
- agent-wall: ~/.local/share/agent-wall (state only stub)

## Queue refill source
HUNT-NOW keep-8: aiven, auth0, okta, atlassian, openai, google-vrp, msrc, proton, dropbox-inti, shopify-h1
