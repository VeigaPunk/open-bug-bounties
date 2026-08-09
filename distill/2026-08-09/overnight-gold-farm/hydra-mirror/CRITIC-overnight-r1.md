# CRITIC — overnight gold farm r1 (gx-critic-r1)

**UTC:** 2026-08-08  
**Target plan:** `~/.xbgst/plans/2026-08-08-overnight-gold-farm.md` · mirror `PLAN-r0-overnight-gold-farm.md`  
**Inputs:** hydra `CONNECTOR.md`, `HUMAN-GATES.md`, lane `STATUS.md` (Aiven/Auth0/Google), dual-auth `AUTONOMOUS-READY.md` + `CONNECTOR.md`, distill `STATUS.md` (2026-08-07), `hydra-whip.sh`  
**Posture:** attack the approach (thrash, fake COMPLETE, policy breach, secret leak, dumb page-walk revival) — not syntax.  
**Axes:** `gold_ev_per_hour` · `safety_in_policy` · `evidence_fidelity` · `idle_utilization` · `ship_hygiene` · `human_gate_throughput` · `substrate_fertile`

---

## Phase 1 — Approach map (steelman)

**Problem claimed:** Convert dumb “walk bounty pages + sleep farm” into a ranked EV overnight pipeline that advances gold EV without thrashing closed human doors.

**Decisions (explicit):**
1. Freeze keep-8 + hydra H1–H3 → write `EV-QUEUE.md` → lock single OVERFIT.
2. Concurrent whip (119s) + pruner while overfit executes or map-deepens.
3. Success can be substrate/idle prep if all three human keys stay closed — not forced COMPLETE.
4. Ship only after APPROVED + secret gate; MAP ≠ COMPLETE.
5. Default rank Aiven → Google Drive → Auth0 → Proton refill → keep-8 tail.

**Assumptions load-bearing:**
- A1: Three human doors remain the only COMPLETE blockers (CONNECTOR + HUMAN-GATES agree).
- A2: Whip/pruner “log only when gates closed” prevents CAPTCHA/Get-Credentials thrash.
- A3: `score = payout × skill × gate_factor / effort` on keep-8 is better than catalog crawl.
- A4: sekhmet j64 map packs on own-scope text are agent-useful overnight work (not theater).
- A5: dual-auth race DONE implies agents may pulse/ship without inventing COMPLETE.
- A6: Fake COMPLETE is preventable by connector rule alone (no mechanical gate).
- A7: Overnight “gold” metric tolerates zero money if EV-QUEUE + idle policy land.

**Rejected alternatives (plan text):** alpha page-walk of ~1100 listings; multi-program thrash; CAPTCHA loops; volume recon as progress.

---

## ACH — competing failure hypotheses

| ID | Hypothesis | Evidence FOR | Evidence AGAINST | Likelihood overnight |
|----|------------|--------------|------------------|----------------------|
| **H1** | **Idle thrash** — whip/orch/sekhmet re-spawns map work, re-probes unauth doors, or burns L3 quota on re-map despite “log only” | CONNECTOR risk line; dual-auth history of SPA shell + model_fallback; whip still runs `op item get` every 119s; sekhmet “fertilize” is open-ended | whip source: no CAPTCHA spawn; fertile REPORT &lt;5m → no_spawn; HUMAN-GATES “no fake COMPLETE” | **High** if M05+L3 runs without hard task budget |
| **H2** | **Fake COMPLETE** — STATUS flipped to force refill / ship theater | Refill never stress-tested live; M05 gate command greps COMPLETE\|BLOCKED loosely; pressure to show “gold” at dawn | Connector + plan non-goals; dual-auth AUTONOMOUS-READY freezes; critic + connector dissent | **Medium** under ego/ship pressure; **low** if COMPLETE requires evidence path checklist (not yet coded) |
| **H3** | **Zero real EV** — plan “succeeds” on docs (EV-QUEUE, rollup) while all lanes stay MAPPED; gold_ev_per_hour ≈ 0 | All three lanes PARTIAL; freezes #2/#3/#6 still human; EV-QUEUE **missing** at critic time; distill 2026-08-08 thin | Plan admits success boundary includes BLOCKED+recovery; prep has shipped value before | **High** for money; **medium** for honest substrate win |
| **H4** | **Page-walk revival** — EV-QUEUE absent or soft → agents fall back to catalog refresh / keep-8 re-recon / open-bug-bounties crawl | Plan still schedules `npm run refresh` in idle; catalog ~1100 exists; M02 not done | Smart rewrite freezes keep-8; non-goals ban alpha crawl | **Medium** if M02 skipped or OVERFIT poorly locked |
| **H5** | **Policy / third-party exploitation** — FIRST-5 or L3 tasks cross into live exploit payloads, wrong tenants, or customer Okta | Dual-auth trap: AUTHENTICATED ≠ session; Set5 vs public Okta confusion; “live test Aiven” phrase tempts off-scope; sekhmet can ignore STOP briefs | Plan: own assets only; no exploit PoCs third-party; M05 tasks.md constraints | **Medium** under hungry L3 without STOP brief |
| **H6** | **Secret leak on ship** — op reveal, SPA HTML, cookies, API tokens in distill/git | Dual-auth residual SPA/NDJSON risk; oauth-callback-audit already warned paste hygiene; whip uses `op` (values not logged, but spawn risk elsewhere) | milestone-ship secret gate; the-janitor rule; rsync md/json only | **Medium-low** if ship always dry-run+rg first; **high** if agent dumps HTML |
| **H7** | **OVERFIT mis-rank** — Aiven ranked #1 while free-tier dual is **hardest** overnight human; burns map-only cycles; Google A/B might be closer if accounts exist locally | HUMAN-GATES: Aiven free-tier+2 members; Auth0 still REQUESTED; Google needs two sessions — rank table optimizes cash table not openability | Plan gate_factor in rubric; secondary passive pulse | **Medium** — ranking confuses “best bounty” with “best overnight agent move” |
| **H8** | **Refill cascade fantasy** — COMPLETE never fires → refill untested → dawn invents COMPLETE to “prove” M09 | Plan admits zero COMPLETE historically; hydra-refill only on COMPLETE | Non-goal forbids fake COMPLETE | **Medium** if M09 wording read as “must show COMPLETE” |
| **H9** | **Host/L3 concurrency thrash** — host specialists + j64 luna-a/b/c collide, usage_limit, namespace GC storm | Dual-auth model_collapse; rate_limit on swarm-v3; R7/R9 in plan | Pruner + UUID tasks-v3; isolated luna roots | **Medium** if three swarms + overnight farm specialists stack |

**ACH synthesis:** Dominant overnight failure modes are **H1 + H3** (busywork without money) and **H4** if EV-QUEUE is not frozen early. Safety failures **H5/H6** are lower base-rate but **asymmetric severity**. Fake COMPLETE (**H2/H8**) is the integrity killshot — treat as hard red line, not style.

---

## Structured critiques

```
CRITIQUE: Plan sells “gold farm” while all COMPLETE paths are human-gated — overnight EV is mostly document theater unless doors open.
SEVERITY: RETHINK (metric) | CONSIDER (execution still useful if honesty-bound)
CURRENT: Success = EV-QUEUE + idle policy + “lane advanced or BLOCKED+recovery”
ALTERNATIVE: Rename overnight success to substrate_idle_green + human_gate_pulse_only; reserve “gold” for post-door FIRST-5 with evidence paths
TRADE-OFF: Honest naming loses hype; fake gold burns trust and invites COMPLETE theater
FAILURE-MODE: Dawn ship of EV-QUEUE claimed as bounty progress; refill still never real
CONFIDENCE: high
```

```
CRITIQUE: COMPLETE detection is string-grep on STATUS — no evidence-path schema — fake COMPLETE is a one-line edit.
SEVERITY: RETHINK
CURRENT: Connector prose MAP≠COMPLETE; whip greps COMPLETE in STATUS.md; refill on complete=1
ALTERNATIVE: COMPLETE only if `evidence/OWN-ASSET.md` + `evidence/FIRST-5-RESULTS.md` (redacted) + `REPORT.md` cite paths + connector checklist file `COMPLETE-GATE.md` signed by distiller/sentinel
TRADE-OFF: Friction vs integrity; slows honest COMPLETE by minutes, blocks fake by design
FAILURE-MODE: Ego ship at dawn flips STATUS → hydra-refill spawns two empty lanes → thrash multiplies
CONFIDENCE: high
```

```
CRITIQUE: Default OVERFIT Aiven optimizes published cash, not overnight openability; contradicts “nearest-open.”
SEVERITY: CONSIDER
CURRENT: Rank 1 Aiven free-tier dual (still absent op A/B); Google #2; Auth0 #3
ALTERNATIVE: Rank by gate_factor first: (a) Google if two local research sessions possible without BC assign, (b) Proton map-only dual free accounts (Runner B lesson), (c) Aiven only after op titles exist or human NEXT-TICK done
TRADE-OFF: Lower ceiling short-term; higher P(agent-useful own-asset work)
FAILURE-MODE: All night on Aiven NEXT-TICK checklists while Google A/B sits unused
CONFIDENCE: medium-high
```

```
CRITIQUE: Idle loop still includes catalog refresh and open-ended L3 “map packs” — soft revival of page-walk/volume thrash.
SEVERITY: CONSIDER
CURRENT: Idle = policy refresh, npm refresh, L3 FIRST-5 packs, sanitize, ship hygiene
ALTERNATIVE: Idle allowlist only: (1) whip/pruner, (2) secret-gate scan, (3) CRED-STATE/HUMAN-GATES timestamp pulse titles-only, (4) one fixed OVERFIT tasks.md ≤N sekhmet jobs, (5) negative-close pack for OVERFIT only. Ban full catalog refresh overnight unless EV-QUEUE explicitly requires one program’s policy delta.
TRADE-OFF: Staler catalog vs zero walk revival
FAILURE-MODE: `refresh-data.mjs` + 1100 index becomes the night’s main CPU story
CONFIDENCE: medium
```

```
CRITIQUE: Whip polls `op item get` every 119s — thrash-adjacent vault load; not CAPTCHA but not free.
SEVERITY: MONITOR
CURRENT: op A/B username field existence checks in whip
ALTERNATIVE: Gate poll every 15–30m or on connector pulse only; cache last-seen mtime of CRED-STATE/HUMAN-GATES
TRADE-OFF: Slightly slower door detection vs less op chatter / SA noise
FAILURE-MODE: 1Password rate or desktop unlock nags overnight
CONFIDENCE: medium
```

```
CRITIQUE: M05 sekhmet “deepen map pack” after maps already COMPLETE reopens map thrash CONNECTOR already killed.
SEVERITY: RETHINK (for map-deepen) | CONSIDER (for own-asset FIRST-5 only)
CURRENT: If own-asset not ready → deepen map via sekhmet-luna j64
ALTERNATIVE: If own-asset not ready → **stop product map**; only (a) negative-close template, (b) human NEXT-TICK checklist quality, (c) policy re-read of program brief if &gt;7d old. No new unauth spidering.
TRADE-OFF: Less L3 utilization vs CONNECTOR “stop map thrash”
FAILURE-MODE: Third REPORT rewrite wave; zero COMPLETE still; quota burn
CONFIDENCE: high
```

```
CRITIQUE: Secret hygiene depends on human-remembered rg + ship script; overnight agents still produce NDJSON/HTML.
SEVERITY: CONSIDER
CURRENT: M07 rg patterns + tmp-sanitize + milestone-ship
ALTERNATIVE: Pre-ship hook: refuse any `*.htm`, `cookie`, raw HAR in src; NDJSON strip task text with password field names; ban `op item get --reveal` in all overnight prompts
TRADE-OFF: More false positives on scrub docs
FAILURE-MODE: SPA shell or OAuth code in distill (oauth-callback-audit class event)
CONFIDENCE: medium-high
```

```
CRITIQUE: Dual-auth DONE is misread as “hunt free” — AUTONOMOUS-READY only allows pulse/recon/ship, not COMPLETE.
SEVERITY: MONITOR
CURRENT: Plan cites dual-auth DONE + agents may pulse
ALTERNATIVE: Every overnight spawn prompt includes freeze table rows 1–6 + “no COMPLETE without OWN-ASSET evidence”
TRADE-OFF: None material
FAILURE-MODE: Agent claims live finding without dual accounts
CONFIDENCE: high
```

---

## Kill criteria (abort or rewrite the move)

| Kill ID | Trigger | Action |
|---------|---------|--------|
| **K1** | Any agent/script marks lane COMPLETE without `evidence/` own-asset paths listed in STATUS | Revert STATUS; no refill; incident note in CONNECTOR; severity RETHINK |
| **K2** | CAPTCHA / Get Credentials / Set5 SPA login loop in logs or browser automation overnight | Kill spawn; whip remains log-only; update HUMAN-GATES timestamp only |
| **K3** | Alphabetical or full-catalog “walk” task appears in tasks.md / sekhmet packs | Delete task pack; re-lock OVERFIT to keep-8 ∩ gate_open |
| **K4** | Live exploit payload, scanner against non-own asset, or customer `*.okta.com` / prod Auth0 outside CIC tenants | Hard stop L3; sentinel review; no ship |
| **K5** | Secret patterns (sk-, AKIA, PEM, ghp_, xox*, raw password=) in distill or hydra lanes destined for git | Fail closed; scrub; do not ship; janitor audit |
| **K6** | Same REPORT rewritten &gt;2× overnight without new human door open | Ban further map deepen for that lane |
| **K7** | sekhmet j64 with empty/vague tasks or missing GODSPEED + own-scope STOP brief | Do not launch; rewrite tasks.md |
| **K8** | hydra-refill fires without COMPLETE evidence checklist | Block refill script path until COMPLETE-GATE green |
| **K9** | Host specialist fan-out &gt;16 or parallel multi-program “gold” beyond one OVERFIT + passive pulse | Collapse to single OVERFIT |
| **K10** | Dawn narrative claims “gold farm success” solely from EV-QUEUE/docs with zero gate movement and no negative-close | Relabel as substrate-idle ship only; no bounty COMPLETE language |

---

## Required evidence for COMPLETE

**Rule:** `MAP ≠ COMPLETE`. Dual-auth AUTONOMOUS-READY freezes still bind. Money-path COMPLETE is **not** “map + L3 packs + ship label.”

### Minimum evidence set (all required)

1. **Own asset existence**
   - Aiven: two member-capable projects/services under research ninja accounts; op titles `Aiven BB Account A/B API` exist (labels only in git).
   - Auth0: CRED-STATE **ASSIGNED** + op:// vault labels only; tests only on CIC bug-bounty tenants.
   - Google VRP Drive: two research-owned Google sessions used for T1–T5; no third-party Drive abuse.

2. **FIRST-5 (or equivalent) results file**
   - Path: `lanes/<lane>/evidence/FIRST-5-RESULTS.md` (or program-named).
   - Redacted: no cookies, tokens, passwords; include test IDs, expected vs observed, timestamps UTC.
   - Pass **or** clean negative allowed if methodology was in-scope and dual/authz matrix actually ran.

3. **REPORT.md** that:
   - Links to evidence paths (not prose-only).
   - States scope/program brief version or URL + same-day re-read note.
   - Explicitly says own-asset / authorized research only.

4. **STATUS.md** machine-readable block:
   ```
   State: COMPLETE
   Evidence: <paths>
   Human-gates-cleared: <list>
   Secret-gate: CLEAN <UTC>
   ```

5. **Connector / COMPLETE-GATE**
   - `CONNECTOR.md` Completed table row non-empty with program + evidence + ship commit.
   - Prefer new `tracker/COMPLETE-GATE.md` checklist signed (distiller or sentinel) before `hydra-refill`.

6. **What is NOT COMPLETE**
   - Passive 401/200 matrices alone.
   - DRAFT-REPORT without live dual/authz run.
   - “Ready for human” / PARTIAL / MAPPED.
   - EV-QUEUE rank #1.
   - Ship of overnight plan folder.

### Negative close (honest non-COMPLETE or COMPLETE-negative)

- Allowed: document “no anomaly on T1–T5 with own A/B” with results file → lane may stay MAPPED or mark **NEGATIVE-CLOSED** (not fake gold COMPLETE unless program process treats clean negative as done work package — still **not** refill trigger unless policy says so).
- Refill triggers only on **true COMPLETE** (finding-ready or program-defined done with evidence), never on negative theater.

---

## Red lines (non-negotiable)

1. **No exploitation of third-party assets**  
   Own research accounts, program-provided CIC/labs, free-tier under ninja mailbox only. No customer tenants, no random internet targets, no exploit PoCs / weaponized payloads in agents (policy freeze). Sentinel owns security edge; critic flags approach that invites breach.

2. **No secrets in git**  
   op:// titles and field *names* only. Never passwords, API tokens, OAuth codes, cookies, PEM, `.env`. Ship path: secret-gate `rg` + `milestone-ship.sh` only after APPROVED. the-janitor for vault; no bare `op ... --reveal` in overnight prompts.

3. **No CAPTCHA thrash / Get-Credentials thrash / Set5 SPA login loops**  
   Whip stays observe/log when gates closed. No headless MFA fantasy. Auth0 CRED-STATE poll = status files + human email, not credential hammering. Atlassian site CAPTCHA remains human-only.

4. **No fake COMPLETE**  
   String flip forbidden. Refill forbidden without evidence set above.

5. **No dumb page-walk revival**  
   No alpha crawl of open-bug-bounties ~1100. No “recon all keep-8 deeply” overnight. Single OVERFIT + passive secondary pulse only.

6. **No MAP theater as money progress**  
   CONNECTOR dissent stands: only human door-opens move COMPLETE. Map deepen after H1–H3 maps exist is kill-adjacent (K6).

---

## Counter-proposal (concrete overnight approach)

**Name:** `overnight-idle-green` (not gold theater)

1. **M02 first hour hard gate:** Write `tracker/EV-QUEUE.md` with scores; set `OVERFIT=` using **gate_factor-primary** sort (openability before payout ceiling).
2. **Mechanical COMPLETE gate:** Add `scripts/hydra-complete-gate.sh` requiring evidence paths before STATUS may contain COMPLETE and before refill.
3. **Idle allowlist** (above) — ban catalog full refresh; ban third map wave.
4. **If all doors closed:** Run only whip/pruner + HUMAN-GATES pulse + secret scan + optional **one** negative-close template fill for OVERFIT methodology (no live third-party). Ship distill as `overnight-idle-r0` if APPROVED hygiene — **not** bounty COMPLETE.
5. **If one door opens mid-night:** Connector pulse unlocks M05 FIRST-5 only on that lane; still no multi-program fan-out.
6. **Dawn rollup:** Honest table — doors still closed | EV-QUEUE hash | whip thrash=0 | secret-gate CLEAN | COMPLETE count (expect 0).

**Strongest rejected alternative to entire farm:** Do not run overnight agent farm; human spends 30–60m on Aiven free dual + Auth0 assign + Google A/B, then daytime FIRST-5. Higher gold_ev_per_hour if human is available; overnight farm only justified for **substrate honesty + zero thrash**, not fake EV.

---

## Key assumptions check

| Assumption | Attack | Hold? |
|------------|--------|-------|
| Whip prevents thrash | Prevents CAPTCHA spawn; does not prevent L3 map thrash or vault poll noise | **Partial** |
| Connector rule blocks fake COMPLETE | Prose only; grep-based complete=1 is forgeable | **Weak** |
| EV-QUEUE prevents page-walk | File missing at critic time; idle still mentions catalog refresh | **Unproven until M02** |
| sekhmet map packs are useful when doors closed | CONNECTOR says stop map thrash; diminishing returns after three ships | **Mostly false for deepen** |
| dual-auth DONE ⇒ overnight autonomy | Autonomy for pulse/ship only; freezes list remains | **True with caveat** |
| Aiven is best OVERFIT overnight | Cash yes; openability no | **Questionable** |

---

## Devil’s advocacy (steelman of plan)

The plan already encodes the main lessons of hydra + dual-auth: MAP≠COMPLETE, keep-8, no CAPTCHA on whip, secret gate on ship, success without forced payout. That is stronger than naive page-walk. If M02 freezes EV-QUEUE, M04 stays log-only, and M05 refuses map-deepen, overnight can be a **net positive hygiene session**. The critique is not “do nothing” — it is “do not brand zero-door nights as gold, do not deepen maps, do not leave COMPLETE as a string.”

---

## What-if (reversible failures)

| If wrong… | Cost to reverse |
|-----------|-----------------|
| OVERFIT wrong program | Edit EV-QUEUE + HYDRA; low |
| Too much L3 map | Kill tasks; pruner GC; medium quota already spent |
| Fake COMPLETE shipped | Revert STATUS, reverse refill dirs, public git history fix is **high** (no force-push culture) → prevent, don’t reverse |
| Secret in main | High; scrub commit + rotate; prevent with gate |
| Catalog refresh started | Stop job; ignore data delta; low |

---

## Verdict for the-judge

| Item | Severity |
|------|----------|
| COMPLETE as forgeable string / refill unguarded | **RETHINK** |
| Map-deepen as default when doors closed | **RETHINK** |
| “Gold farm” success metric when doors closed | **RETHINK** (naming/metric) |
| OVERFIT Aiven-first vs openability-first | **CONSIDER** |
| Idle catalog refresh / soft page-walk | **CONSIDER** |
| Whip op poll frequency | **MONITOR** |
| Secret/HTML residual risk | **CONSIDER** (process), **RETHINK** if any live dump path remains |
| Policy third-party exploit risk under hungry L3 | **CONSIDER** → kill K4/K7 |

**Overall:** Approach direction (ranked keep-8, no CAPTCHA thrash, MAP≠COMPLETE) is **sound**. Overnight **implementation gaps** make thrash + fake COMPLETE + map theater the expected failure modes unless COMPLETE-GATE is mechanical and map-deepen is banned.

**planner residual:** Do not APPROVE “gold COMPLETE” language at dawn without evidence set. Prefer APPROVED: `overnight-idle-green` / EV-QUEUE freeze / thrash=0.

---

## Evidence (critic)

- Plan Phase 0: three lanes MAPPED, zero COMPLETE; human doors Aiven/Auth0/Google.
- CONNECTOR: MAP≠COMPLETE; stop map thrash; money behind three keys.
- HUMAN-GATES: COMPLETE needs human doors; no fake COMPLETE.
- Lane STATUS: all PARTIAL; blockers unchanged pattern.
- dual-auth AUTONOMOUS-READY: pulse/ship OK; freezes 1–6 bind; no invent COMPLETE.
- distill STATUS: active testing BLOCKED until human joins.
- `hydra-whip.sh`: log-only when no actions; COMPLETE via STATUS grep; op title existence poll.
- `tracker/EV-QUEUE.md`: **missing** at critic write time.

---

**Return path:** `/home/vgpnk1337/.xbgst/hydra-bounty/plans/CRITIC-overnight-r1.md`
