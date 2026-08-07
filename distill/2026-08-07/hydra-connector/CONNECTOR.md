# CONNECTOR — Hydra cross-lane map

**Date:** 2026-08-07  
**Role:** connector (breadth over depth)  
**Axes:** `lane_diversity` · `bounty_complete` · `substrate_fertile` · `audit_trail` · `safety_in_policy` · `hydra_throughput`  
**SSoT:** `tracker/HYDRA.md` · `plans/PLAN-r0-hydra.md` · lane `TASK.md` files  
**Rule:** 1 complete → 2 new from HUNT-NOW keep-8 · secrets only via `op://` · own assets for active tests

---

## Cross-link (live assignment)

| Hydra | Program | Lane | Orch style | L3 sekhmet | Out path | Tracker state |
|-------|---------|------|------------|------------|----------|---------------|
| **H1** | **Aiven** (BC `aiven-mbb-og`) | **stack** | xbgst-stack specialists (`the-*` fan-out) | **luna-a** → `sekhmet-luna-a.sh` | `lanes/stack/aiven/` | RUNNING |
| **H2** | **Auth0 CIC** (BC `auth0-okta`) | **wrap** | dual-bounty-auth / xbgst-wrap **workflow** (Rhai) | **luna-b** → `sekhmet-luna-b.sh` | `lanes/wrap/auth0/` | RUNNING |
| **H3** | **Google VRP** (first-party) | **grok** | xbgst-grok orch-mode team | **luna-c** → `sekhmet-luna-c.sh` | `lanes/grok/google-vrp/` | RUNNING |

**Note vs Phase-0 plan:** `PLAN-r0-hydra.md` seeded grok→**Atlassian** cloud-test. Live tracker + `lanes/grok/google-vrp/TASK.md` reassigned H3→**Google VRP**. Atlassian remains keep-8 refill / CAPTCHA-human backlog — do not thrash both; one active per lane.

**Shared distill (pre-hydra):** `~/.xbgst/bounty-distill/2026-08-07/` — ENROLL, HUNT-NOW, dual-auth-runners, BURNER-RUN patterns.  
**Ship mirror:** `~/Projects/open-bug-bounties` via `milestone-ship.sh`.

---

## Dual (triple) orch styles — do not conflate

| Style | Home | How work moves | Host concurrency | L3 |
|-------|------|----------------|------------------|-----|
| **stack** | Grok xbgst-stack specialists (scout/executor/critic/…) | Sequential specialist handoffs + STATUS under `lanes/stack/` | ≤16 host subagents | luna-a j=64 isolated root |
| **wrap** | Workflow dual-bounty-auth / xbgst-wrap Rhai | Durable workflow state machines, credential poll without thrash, TARGETS/CRED-STATE | Workflow agents (not specialist swarm) | luna-b j=64 |
| **grok** | xbgst-grok style orch team | Orch playbook cards (PRODUCT-PICK, AUTH-SURFACE, checklists) | Grok lane team | luna-c j=64 |

**Cross-style anti-patterns**

- Running wrap credential thrash under stack specialists (wrong cadence).
- Expecting Rhai workflow progress from pure sekhmet task text without wrap STATUS.
- Mixing spark roots: always `XBRD_SPARK_ROOT=$XDG_RUNTIME_DIR/xbrd-spark-luna-{a|b|c}`.
- Treating Google VRP like BC CIC (no Get Credentials; own Google account only).

---

## Substrate: 119s whip · pruner · triple luna

### Triple luna
- Wrappers: `~/.xbgst/scripts/sekhmet-luna-{a,b,c}.sh`
- Model/tier: gpt-5.6-luna + fast (fallback documented on wrappers)
- Queues dir: `hydra-bounty/sekhmet/luna-{a,b,c}/` (currently empty — need task files before swarm)
- Fertile markers: `lanes/{stack,wrap,grok}/fertile/TOUCH` (pruner rewrites)

### Pruner
- Script: `~/.xbgst/scripts/hydra-pruner.sh`
- Logs: `hydra-bounty/pruner/*.log` (green `done` observed 20260807T2232xxZ+)
- Does: /tmp GC, luna root age trim, lane TOUCH, optional `sekhmet gc`
- Ops: tmux `hydra:pruner` loop or manual; keeps substrate fertile without killing work <180m

### 119s whip (smart godspeed)
- Spec (M08): interval **119s**; progress = STATUS/tracker mtime; **whip only after 2 consecutive ticks (~238s) with no progress**
- Tracker claims whip scheduler; **script `hydra-whip.sh` not present yet** under `~/.xbgst/scripts/` (gap vs PLAN M08)
- Logs home (when live): `hydra-bounty/logs/whip-*.log`
- Never whip new recon targets — only unstick assigned lanes + re-inject godspeed

### Related helpers
- `hydra-refill.sh` — 1→2 rule stub  
- `hydra-fnm-shell.sh` — node/fnm lane shell  
- `agent-pip a|b|c` — promptfile into lane  
- tmux: `tmux attach -t hydra` (windows: orch, pruner, stack, wrap, grok, sekhmet-a/b/c)

---

## Lane readiness score (submit-ready report)

**Axes for “first submit-ready”:** unblocked_active_test · easy_class_clarity · enroll_complete · asset_in_hand · draft_skeleton_depth · human_gate_depth  

Scale 0–5 (higher = closer to a policy-valid BC/VRP report draft).

| Rank | Lane | Score | Why |
|------|------|------:|-----|
| **1** | **grok / Google VRP** | **3.2** | No CIC credential queue; own Google account is the asset; TASK asks PRODUCT-PICK + AUTH-SURFACE + 5 cases — can produce in-scope test card + evidence **today**. VRP bar is high (valid impact) so submit-ready finding still non-trivial, but **path is open**. |
| **2** | **stack / Aiven** | **2.6** | BC joined, FULL scope, published severity bands, clear authz-on-own-project class. **Blocked on free-tier project / ninja mailbox (human)**. Once project exists, fastest high-ROI path among BC lanes. Empty `l3/` + no STATUS.md yet. |
| **3** | **wrap / Auth0 CIC** | **1.8** | Joined + dual-auth wrap pattern ready; **creds REQUESTED not assigned** (BURNER-RUN). Unauth door matrix + CRED-STATE are valid progress but not submit-ready vuln. Do not thrash Get Credentials. |

**Verdict:** **grok/Google-VRP is closest to first submit-ready report path** (unblocked own-tenant testing + clear artifact ladder). **stack/Aiven is closest after one human free-tier unlock** (better BC pay table). **wrap/Auth0 is farthest until `op` holds CIC creds.**

None of three have STATUS.md / finding draft yet — all still TASK-seed only. First durable STATUS with checklist or blocked gate wins whip progress definition.

---

## Strange angle (second-order)

1. **Plan/tracker H3 drift (Atlassian → Google VRP)** is a feature: CAPTCHA-blocked Atlassian would freeze grok; VRP keeps lane moving. Risk: Atlassian never re-enters Active unless refill fires — encode Atlassian as **explicit refill #1 after first COMPLETE** if identity-day still wants SaaS density.
2. **Three orch styles × empty l3 queues** = RUNNING in tracker is **aspirational**. Pruner keeps TOUCH green while no worker has written evidence — whip without STATUS will thrash. Priority: STATUS.md ×3 before 119s scheduler.
3. **Wrap’s dual-auth knowledge is the only lane with prior distill** (`dual-auth-runners/`). Stack/grok under-index that pattern — steal CRED-STATE / unauth matrix templates without stealing Auth0 thrash.

---

## Risk register (connector view)

| ID | Effect | If |
|----|--------|-----|
| C1 | Whip fires on empty STATUS → recon thrash | hydra-whip live before STATUS scaffolding |
| C2 | Luna roots collide or pruner deletes warm work | age <180m ignored; always isolated a/b/c |
| C3 | Auth0 still unassigned after 24h | H2 stalls; swap to Okta policy-only or Dropbox Inti per plan escalation |
| C4 | Aiven tests without own project | OOS / third-party — policy fail |
| C5 | Secret in lane md | fail ship gate; janitor/op only |

---

## 5 next moves (Pareto)

1. **STATUS.md ×3** under `lanes/stack/aiven/`, `lanes/wrap/auth0/`, `lanes/grok/google-vrp/` with timestamp + gate/finding/BLOCKED line (unlocks whip progress definition and M04–M06 gates).
2. **grok first content sprint:** `PRODUCT-PICK.md` + `AUTH-SURFACE.md` + 5 own-account authz/IDOR cases for one Google product (closest submit path).
3. **stack free-tier gate card:** `OWN-ASSET.md` + SCOPE bullets from BC brief; human checklist for Aiven project; no cross-tenant probes.
4. **wrap CRED-STATE only:** poll assignment once (CDP/op), write REQUESTED|ASSIGNED without thrash; unauth door matrix; secrets stay in 1Password.
5. **Close substrate gaps:** implement `hydra-whip.sh` (119s / 2-tick) + seed one sekhmet taskfile per luna from TASK.md with GODSPEED inject line; confirm tmux `hydra` windows; ship on next APPROVED durable batch.

---

## # State
- **inf:** Triple-orch hydra is substrate-green (pruner+luna+fertile) but evidence-empty; live H3=Google-VRP diverged from plan Atlassian to keep grok unblocked [strong] — axes: substrate_fertile, lane_diversity, bounty_complete
- **risk:** Declaring RUNNING without STATUS invites 119s whip thrash and fake throughput under second-order audit

## # Dissent
- Stack specialists will rank **Aiven** first (BC ROI / FULL scope). Connector ranks **Google VRP** first for **unblocked time-to-first-draft**. Both correct on different axes; do not serialize — parallel STATUS, human unblocks Aiven async.
- Wrap may claim dual-auth maturity equals lead; without assigned CIC creds it cannot produce authz finding — map is not submit.

## # Rationale
The non-obvious signal is not “which program pays” — it is **which orch style + gate geometry yields the first policy-valid report file under whip progress rules**. Empty l3 + missing whip script + H3 reassignment all point to: ship map artifacts now, unlock Aiven human gate offline, freeze Auth0 thrash.

---

**Godspeed inject required on every spawn.** After durable APPROVED artifacts: `~/.xbgst/scripts/milestone-ship.sh`.
