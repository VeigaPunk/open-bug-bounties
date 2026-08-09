# DISTILL-r1 — overnight-gold-farm

**Role:** distiller (gx-distiller-r2)  
**UTC write:** 2026-08-08 / session overnight-gold-farm  
**Out:** `~/.xbgst/bounty-distill/2026-08-08/overnight-gold-farm/DISTILL-r1.md`  
**Axes:** `gold_ev_per_hour↑` `time_to_first_submit↑` `substrate_fertile↑` `human_gate_throughput↑` `evidence_fidelity↑` `safety_in_policy↑` `ship_hygiene↑` `idle_utilization↑` `thrash↓`

## Sources (read; no invented COMPLETE)

| Artifact | Path |
|----------|------|
| Plan SSoT | `~/.xbgst/plans/2026-08-08-overnight-gold-farm.md` (+ mirror PLAN-r0) |
| Connector | `~/.xbgst/hydra-bounty/CONNECTOR-overnight-r1.md` |
| EV-QUEUE | `~/.xbgst/hydra-bounty/tracker/EV-QUEUE.md` |
| Overnight loop | `~/.xbgst/hydra-bounty/tracker/OVERNIGHT-LOOP.md` |
| Scout EV | `~/.xbgst/hydra-bounty/tracker/SCOUT-EV-r1.md` |
| Critic | `~/.xbgst/hydra-bounty/plans/CRITIC-overnight-r1.md` |
| Sentinel | `~/.xbgst/hydra-bounty/plans/SENTINEL-overnight-r1.md` |
| Idle playbook | `~/.xbgst/hydra-bounty/lanes/IDLE-PLAYBOOK.md` |

**Duplicates collapsed:** ~90 role-level findings → **22 unique claims** below (obs/inf/gap + conflicts + keep/drop).

---

# State

## Substrate & policy

- **obs:** Hydra H1–H3 all **MAPPED / PARTIAL**, **zero COMPLETE**, refill never fired live. Ships: Aiven `143b7d8`, Auth0 `301911b`, Google Drive `2ad5517`. [certain] — connector, plan Phase 0, idle-playbook, scout, critic
- **obs:** Dual-auth race **DONE** (AUTONOMOUS-READY); freezes #2/#3/#6 **are** hydra H1/H2/H3 (Aiven / Auth0 CIC / Google). Re-race or re-map doors = thrash. [certain] — connector, idle-playbook, critic
- **obs:** Keep-8 membership SSoT frozen in ROI.md; catalog ~1100 has **no reward fields** — page-walk ≠ gold. [certain] — scout, plan, connector, EV-QUEUE kill list
- **obs:** `MAP ≠ COMPLETE`. COMPLETE requires own-asset evidence paths (OWN-ASSET + FIRST-5-RESULTS + REPORT links + STATUS machine block). String flip / grep-only COMPLETE is forgeable. [certain] — connector, critic, OVERNIGHT-LOOP, idle-playbook
- **obs:** Whip **live** (119s; ticks class `no_COMPLETE no_spawn no_refill`; op A/B titles-only). Pruner fertile/GC OK. No CAPTCHA/Get-Credentials in whip code. [certain] — connector, OVERNIGHT-LOOP, sentinel
- **obs:** Secret scan on hydra-bounty + bounty-distill/2026-08-08: **scrub-doc only**, 0 real keys/pem/env/cookie files. oauth-callback-audit uses REDACTED codes. [certain] — sentinel
- **inf:** Whip uses bare `op item get` (username existence → /dev/null), not the-janitor — policy WARN, not live leak under current code. [moderate] — sentinel
- **inf:** open-bug-bounties `.gitignore` thinner than distill 2026-08-07 baseline (missing `*.key`, credentials*, cookies, `.op/`). [moderate] — sentinel

## EV / OVERFIT (M02 landed post-connector note)

- **obs:** `tracker/EV-QUEUE.md` **exists** (frozen 2026-08-08): keep-8 ranked, binary gate_factor all **0**, single **OVERFIT=y → Aiven (stack H1)**. Open-state EV order Aiven ~24 > Auth0 ~21 > Google ~18 > Proton ~16 > Atlassian ~11 > tail. [certain] — EV-QUEUE (connector earlier claimed MISSING — superseded)
- **obs:** Overnight agent work when closed: Aiven NEXT-TICK/FIRST-5 pack fidelity + op title pulse; Auth0 CRED-STATE poll only; Google negative-close pack if no A/B; refill-prep Proton/Atlassian/MSRC map-only. [certain] — EV-QUEUE, OVERNIGHT-LOOP, connector
- **inf:** Public payout re-verify: Aiven BC avg ~$4.1k / range $50–$25k; Proton max $100k; Google Drive contents still IT1-class on VRP rules; Auth0 engagement live. [moderate–high] — scout
- **inf:** Connector continuous gate_factor (0.05 dual-missing / 0.15 async) still useful for mid-night recompute; EV-QUEUE binary 0/1 is overnight freeze. [moderate] — connector rubric vs EV-QUEUE

## Human doors (all closed at R1)

| Door | Lane | Detect (no thrash) | Blocker |
|------|------|--------------------|---------|
| **Aiven free dual** | stack H1 | op titles `Aiven BB Account A/B API` (titles only); OWN-ASSET G3–G7 | dual `@bugcrowdninja` + free projects RUNNING + tokens |
| **Auth0 CIC ASSIGNED** | wrap H2 | CRED-STATE → ASSIGNED; Gmail/BC assign; vault titles User1/2/3 | Get Credentials still **REQUESTED** |
| **Google research A/B** | grok H3 | operator: two separated browser sessions ready | second research Google incomplete |

**Kill / non-goals (do not promote overnight):** YWH passport · pure SC+KYC · Sherlock race · OpenAI jailbreak-only · alphabet/1100 crawl · fake COMPLETE · CAPTCHA / Get-Credentials / Set5 SPA loops · prod `manage.auth0.com` / customer Okta · secrets in git.

---

# SYNTHESIS (deduped bullets)

1. **Money is three human keys, not more recon.** Maps shipped; overnight value = rank once → overfit ready → idle prep → door-open recovery in minutes. [certain]
2. **OVERFIT lock = Aiven** for open-state gold_ev (cash table + playbook readiness + lowest effort when dual lands). Secondary passive = Google if A/B appears first; tertiary async = Auth0 CRED. [certain for membership; see CONFLICTS on openability]
3. **Idle-green success ≠ bounty COMPLETE.** Dawn win = EV-QUEUE + OVERNIGHT-LOOP live + whip/pruner green + thrash=0 + secret CLEAN + honest BLOCKED(human) + recovery packs — not fake gold language. [certain] — critic rename, idle-playbook, OVERNIGHT-LOOP, connector success boundary
4. **Mechanical COMPLETE-GATE still missing.** Critic RETHINK: require evidence paths before STATUS COMPLETE and before hydra-refill; prose alone is weak. [high confidence gap]
5. **Map-deepen after H1–H3 ships is thrash.** Prefer negative-close templates, NEXT-TICK quality, policy re-read if brief >7d — not third unauth spider wave / open-ended j64 map packs. [certain] — connector, critic K6, idle recovery first-3
6. **Refill unproven** until true COMPLETE; forcing COMPLETE to exercise refill is integrity killshot (K1/K8). [certain]
7. **Idle allowlist (Pareto keep):** whip observe · pruner · EV-QUEUE/OVERFIT lock · title-only gate pulse · secret-gate + sanitize · one OVERFIT tasks.md own-scope pack · Proton/Atlassian/MSRC map-only refill prep · dawn rollup template. [certain]
8. **Idle ban (Pareto drop):** catalog full refresh as “EV work” · 1100 crawl · multi-program fan-out · CAPTCHA/cred modal · fake COMPLETE · live exploit L3 · map rewrites >2× without door open · host >1 OVERFIT + passive. [certain]
9. **Security posture GREEN for ship** of scrubbed plans/distill if owner APPROVED + checklist; residual WARN = bare op on whip + public .gitignore depth. [certain] — sentinel
10. **Door-open priority (execute FIRST-5 only on that lane):** any of Aiven dual / Auth0 ASSIGNED / Google A/B → recovery first-3 → evidence → COMPLETE only with paths → then refill+ship. Scout order Auth0→Aiven→Google differs from EV gold_ev order — treat as **signal priority vs rank**; connector: execute whoever opens first without re-ranking membership. [certain with conflict note]

---

# CONFLICTS (do not pick a side — surface for judge)

| ID | Conflict | Sources | Affects |
|----|----------|---------|---------|
| **C1 OVERFIT openability** | Connector/EV-QUEUE/plan: OVERFIT=Aiven (cash + readiness). Critic: Aiven dual may be **hardest** overnight; rank by gate_factor-first (Google if two local sessions, Proton dual free, Aiven after op titles). Scout: closest draft if unlock = Google ≥ Aiven ≥ Auth0. | connector, EV-QUEUE, critic H7, scout | M03 lock; overnight agent CPU allocation |
| **C2 Unlock priority vs gold rank** | Scout mid-night unlock order: Auth0 assign → Aiven dual → Google A/B. Connector: Aiven primary gold_ev; execute Google **if** A/B opens first without membership flip. | scout, connector | M05 handoff when first door opens |
| **C3 Map packs when doors closed** | Plan M05 + idle-playbook allow sekhmet map deepen. Connector + critic: maps already shipped → deepen = thrash; ban third map wave; allowlist templates only. | plan, IDLE-PLAYBOOK vs connector/critic | M04/M05 sekhmet scope |
| **C4 Catalog refresh** | Plan idle mentions `npm run refresh`. Critic/connector: hygiene only, not EV; ban full refresh overnight unless one program policy delta required. | plan vs critic/connector | idle CPU |
| **C5 Rubric scale** | Plan/connector continuous gate_factor (0.05–1.0) + 0–2 fields. EV-QUEUE binary gate 0/1 + 1–10 bands → all scores 0 while closed (rank = open-state order). | plan, connector, EV-QUEUE | recompute at dawn / door flip |
| **C6 Auth0 overnight push** | Scout: Auth0 identity-day high ceiling, passive until creds. Connector: async 0.15; after ~24h empty → wrap passive, refill-prep Proton/Atlassian. | scout, connector R5 | wrap lane attention |

**None of these are COMPLETE contradictions** — membership keep-8 and “no fake COMPLETE / no thrash” agree everywhere.

---

# Overnight success definition (idle-green, not fake gold)

Success at dawn if **all** hold — **no bounty required**:

| Gate | Evidence |
|------|----------|
| **EV frozen** | `EV-QUEUE.md` non-empty: rubric, ranked keep-8, gate flags, single `OVERFIT=` (Aiven) aligned with HYDRA |
| **Idle policy live** | `OVERNIGHT-LOOP.md` + idle-playbook contract; whip log-only when doors closed |
| **Substrate green** | whip pid/ticks healthy; pruner done; tmux hydra fertile; sekhmet no collision storm |
| **Audit honest** | Completed empty unless real evidence; STATUS MAPPED/PARTIAL + blocker one-liner; CRED-STATE/HUMAN-GATES stamped |
| **No thrash** | WHIP: no CAPTCHA/Set5/spawn storm; no multi-program gold fan-out; no REPORT rewrite >2× without door |
| **Ship hygiene** | Secret real-material gate empty; no cookies/pem/.env staged; optional APPROVED ship as **overnight-idle** / plan+EV mirror — **not** bounty COMPLETE language |
| **Recovery ready** | Per-lane first-3 steps valid; door-open detect = titles/inbox only |
| **If door opened** | FIRST-5 evidence path started on **that** lane only; COMPLETE only with full evidence set |

**K10 (critic):** Dawn narrative that calls docs-only night “gold farm success” without gate movement → relabel **substrate-idle-green** only.

**Gold metric when doors closed:**  
`prep_quality × P(submit-ready | door opens) / agent-hours` — not listing count, not map rewrite count.

---

# Pareto keep / drop

## KEEP (improve ≥1 axis, harm none)

| Keep | Axes |
|------|------|
| EV-QUEUE + OVERFIT=Aiven lock | gold_ev, time_to_first_submit, thrash↓ |
| OVERNIGHT-LOOP + whip observe + pruner | substrate, idle_utilization, safety |
| Title-only human-gate pulse (op / CRED / Gmail) | human_gate_throughput, thrash↓ |
| Aiven NEXT-TICK + FIRST-5/DRAFT fidelity (no fake probes) | time_to_first_submit when door opens |
| Google negative-close pack (templates) | evidence_fidelity |
| Auth0 CRED poll only (no modal thrash) | safety, thrash↓ |
| Proton + Atlassian map-only refill prep | substrate_fertile, idle |
| Secret-gate + tmp-sanitize + milestone-ship dry-run | ship_hygiene, safety |
| Critic COMPLETE evidence checklist (adopt mechanical gate) | evidence_fidelity |
| Sentinel ship checklist + .gitignore harden backlog | ship_hygiene |
| Dual-auth freeze pointer index (paths only) | evidence_fidelity, thrash↓ |
| Dawn rollup: doors · EV hash · thrash=0 · COMPLETE count (expect 0) | audit honesty |

## DROP / KILL overnight

| Drop | Why |
|------|-----|
| 1100-program / alpha catalog walk | R3; zero reward fields |
| Fake COMPLETE / refill theater | K1, K8; integrity killshot |
| CAPTCHA · Get Credentials · Set5 SPA loops | R1; safety |
| Unauth re-spider Aiven/Auth0/Google maps | maps already shipped |
| Open-ended L3 j64 without own-scope STOP brief | K7; quota thrash |
| Multi-OVERFIT / ceiling-max ranking alone | alphabet thrash |
| YWH · pure SC KYC · Sherlock · OpenAI jailbreak | kill list |
| Secrets / OAuth codes / cookies in distill or chat | R4; janitor |
| Brand zero-door night as bounty gold COMPLETE | critic K10 |

---

# Confidence board

| Claim | Conf |
|-------|------|
| H1–H3 MAPPED, 0 COMPLETE, three human doors closed | **high** |
| Keep-8 membership + kill list stable | **high** |
| OVERFIT=Aiven file lock in EV-QUEUE | **high** |
| Whip no CAPTCHA/spawn on closed gates (code + log class) | **high** |
| Secret surface scrub-doc only in scoped paths | **high** |
| Idle success = substrate/EV/hygiene not forced payout | **high** |
| Map-deepen diminishing / thrash after ships | **high** |
| COMPLETE-as-string is forgeable without evidence schema | **high** |
| Aiven best **open-state** gold_ev among keep-8 | **high** (cash+effort) |
| Aiven best **overnight openability** | **medium** (critic C1) |
| Google closest to draft if A/B exists locally | **medium** (scout; unproven session inventory) |
| Auth0 assign ETA / CIC reward row freshness | **low–gap** (scout gap) |
| Refill script correctness under real COMPLETE | **unverified** — needs labrat when first COMPLETE lands |
| Bare op → the-janitor rewrite | **high** as policy debt; **unverified** fix until executor lands |

---

# Human doors list (operator morning page)

1. **Aiven (primary cash path):** provision dual free-tier `@bugcrowdninja` projects; vault titles `Aiven BB Account A API` + `B API` (labels only in git); flip OWN-ASSET G3–G7 → PASS → agent FIRST-5.  
2. **Auth0 CIC:** wait/assign BC Get Credentials → CRED-STATE **ASSIGNED** → vault User1/2/3 titles only → CIC tenants only (never prod manage.auth0.com).  
3. **Google VRP Drive:** second research Google login + two separated browser profiles → agent T1–T5.  
4. **Optional next human doors (refill prep, not OVERFIT):** Atlassian free `bugbounty-test-*` site create (CAPTCHA human); Proton dual free accounts if not held; Shopify H1 store/staff; MSRC tenant.  
5. **Never overnight human-spam:** CAPTCHA farms, credential modal hammering, 1100 listing walks.

---

# Gaps (labrat / executor probes)

- **gap:** Mechanical `hydra-complete-gate.sh` (or COMPLETE-GATE.md checklist) before refill — critic RETHINK.  
- **gap:** Whip Aiven probe via the-janitor metadata only.  
- **gap:** Align open-bug-bounties .gitignore with distill 2026-08-07 secret block.  
- **gap:** Confirm whether two Google research sessions already exist locally (affects C1 execution).  
- **gap:** Auth0 assign SLA / inbox empty duration → wrap passive swap rule after 24h.  
- **gap:** Live stress of hydra-refill only after real COMPLETE + evidence set.

---

# R1 milestone status (distiller view)

| M | Item | Status at distill |
|---|------|-------------------|
| M01 | Substrate freeze | **met** (paths + whip/pruner class green) |
| M02 | EV-QUEUE | **met** (file present, OVERFIT=Aiven) |
| M03 | OVERFIT lock vs HYDRA | **advisory** — EV says Aiven; resolve C1 with judge if Google A/B ready |
| M04 | Idle loop policy | **met** (OVERNIGHT-LOOP + playbook) |
| M05 | Overfit execute | **blocked human** unless door opens; no fake advance |
| M06 | Gate pulse | **policy ready**; titles-only |
| M07–M08 | Sanitize + ship | **ready** for idle-green distill; sentinel GREEN + owner APPROVED |
| M09 | Dawn rollup | **pending** window end |

**planner residual:** Do not APPROVE “gold COMPLETE” language without evidence set. Prefer APPROVED: `overnight-idle-green` / EV-QUEUE freeze / thrash=0 / secret CLEAN.

---

# Evidence pointers (no secrets)

- Plan: `~/.xbgst/plans/2026-08-08-overnight-gold-farm.md`  
- EV-QUEUE / LOOP: `~/.xbgst/hydra-bounty/tracker/{EV-QUEUE,OVERNIGHT-LOOP,SCOUT-EV-r1}.md`  
- Connector overnight: `~/.xbgst/hydra-bounty/CONNECTOR-overnight-r1.md`  
- Critic / Sentinel: `~/.xbgst/hydra-bounty/plans/{CRITIC,SENTINEL}-overnight-r1.md`  
- Idle: `~/.xbgst/hydra-bounty/lanes/IDLE-PLAYBOOK.md`  
- Gates: `HUMAN-GATES.md` · `lanes/wrap/auth0/CRED-STATE.md` · dual-auth `AUTONOMOUS-READY.md`  
- ROI keep-8: `bounty-distill/2026-08-07/ROI.md`  
- Whip log: `~/.xbgst/hydra-bounty/logs/WHIP.log`  

---

**Duplicates collapsed:** multi-role restatements of MAP≠COMPLETE, three closed doors, keep-8, no CAPTCHA thrash, Aiven OVERFIT, idle-green success, kill lists → single claims above.  
**This distill invents no COMPLETE.**
