# Plan — Overnight gold bounty farm (smart pipeline)
**Session:** overnight-gold-farm | **Dispatched by:** xbgst | **Date:** 2026-08-08
**Plan paths:** `~/.xbgst/plans/2026-08-08-overnight-gold-farm.md` · mirror `~/.xbgst/hydra-bounty/plans/PLAN-r0-overnight-gold-farm.md`
**Axes (proposed for judge):** `gold_ev_per_hour↑` `time_to_first_submit↑` `substrate_fertile↑` `human_gate_throughput↑` `evidence_fidelity↑` `safety_in_policy↑` `ship_hygiene↑` `idle_utilization↑`
**Scope:** `~/.xbgst/hydra-bounty` · `~/.xbgst/bounty-distill` · `~/Projects/open-bug-bounties` · dual-auth-runners · sekhmet L3 j64 · host ≤16
**Spawn:** pure-bash-isolated · model grok · Rust for any new ranker/tooling · bash OK for hydra/ship/sekhmet
**Godspeed:** inject on every spawn. After APPROVED durable artifacts: `~/.xbgst/scripts/milestone-ship.sh`.
**Policy:** MAP ≠ COMPLETE. Own assets only. No secret leakage. No thrash on CAPTCHA/Get-Credentials. No exploit PoCs against third-party assets.

---

## Phase 0 — State map

### Exists
- **Hydra substrate (2026-08-07→08):** `~/.xbgst/hydra-bounty/` with three lanes **MAPPED**, zero **COMPLETE**:
  - **stack / Aiven** (`lanes/stack/aiven/`) — SCOPE, FIRST-5, OWN-ASSET, DRAFT-REPORT, L3 packs; ship `143b7d8`; blocked on free-tier dual ninja + op titles `Aiven BB Account A/B API`.
  - **wrap / Auth0 CIC** (`lanes/wrap/auth0/`) — TARGETS, UNAUTH-DOORS, CRED-STATE **REQUESTED**; ship `301911b`; blocked on BC Get Credentials assign.
  - **grok / Google VRP Drive** (`lanes/grok/google-vrp/`) — PRODUCT-PICK Drive, AUTH-SURFACE, FIRST-5 T1–T5; ship `2ad5517`; blocked on second research Google session (rank: closest to draft if A/B ready).
- **Orchestration scripts:** `hydra-whip.sh` (119s, no CAPTCHA thrash), `hydra-refill.sh` (1 COMPLETE → 2 from queue), `hydra-pruner.sh` (tmp GC + luna roots + fertile TOUCH), `milestone-ship.sh`, `tmp-sanitize-bounty.sh`, `sekhmet-luna-{a,b,c}.sh` (j64, gpt-5.6-luna, isolated `$XDG_RUNTIME_DIR/xbrd-spark-luna-*`).
- **Docs:** CONNECTOR.md (honest MAP/COMPLETE), HUMAN-GATES.md, tracker/HYDRA.md, pruner STATUS green (2026-08-07), prior PLAN-r0-hydra + PLAN-r0-netsshark-auditor.
- **ROI / keep-8 (SSoT membership):** Aiven → Auth0 → Atlassian → Google VRP → Proton → MSRC → Shopify H1 → GitLab XOR Dropbox Inti (`bounty-distill/2026-08-07/ROI.md`, `HUNT-NOW.md`).
- **Dual-auth race DONE:** `bounty-distill/2026-08-07/dual-auth-runners/` (AUTONOMOUS-READY, GATES-dual, runners A/B, sanitize logs) — agents may pulse/recon/ship; **must not** fake COMPLETE while human freezes hold.
- **Catalog inventory:** `open-bug-bounties/data/` platform ~768 + independent ~60 + web3 ~273 (index ~1100); refresh via `scripts/refresh-data.mjs` + GHA 12h.
- **Ship path:** `~/Projects/open-bug-bounties/distill/{2026-08-07,2026-08-08}/` already holds dual-auth + hydra labels + oauth-callback-audit (2026-08-08 hygiene: not a product bug).
- **Secrets path:** the-janitor / op titles only; never reveal into distill.

### Missing
- **EV ranker artifact** for overnight (not alphabetical page walk): single `EV-QUEUE.md` + optional Rust CLI scoring keep-8 × human-gate-open × surface × payout table.
- **Overnight loop as one durable session:** whip/pruner may exist but overnight **idle-dispatch policy** for when all three lanes are human-gated (agent-useful work only: policy refresh, sanitize, catalog refresh, negative closes, sekhmet map packs — not door thrash).
- **Any COMPLETE row** → refill never fired; queue not stress-tested live.
- **2026-08-08 bounty-distill** thin (oauth-callback-audit only) — no overnight farm run folder yet.
- **Second Google + Aiven free-tier + Auth0 assign** still human (not agent-closeable).
- **Overfit single-program execution** not finished (maps yes; live own-asset authz no).
- **Scheduled dawn rollup** (status + ship + kill thrash) not defined for this date.

### Risk
| ID | Risk | Mitigation |
|----|------|------------|
| R1 | Overnight thrash on closed human doors | Whip: log-only if REPORT&lt;5m and gates closed; never Set5/CAPTCHA loops |
| R2 | Fake COMPLETE to force refill | Connector rule: COMPLETE only with own-asset evidence paths |
| R3 | Alphabet/catalog page-walk burns hours | EV-QUEUE freezes rank to keep-8 + gate-open score; ignore full 1100 until first gold path |
| R4 | Secret leakage on ship | milestone-ship secret gate; rsync md/json only; the-janitor for op |
| R5 | Auth0 still unassigned at dawn | Swap wrap lane after 24h window → Okta policy-only or Proton/MSRC from keep-8 (judge) |
| R6 | Dual Google still single login | Prefer stack/Aiven if ninja opens first; else map-only Google negative |
| R7 | sekhmet namespace collision | pruner + UUID tasks-v3; luna roots isolated |
| R8 | Web3/KYC/contest noise | Keep ROI kill list (YWH, pure SC KYC, Sherlock races) |
| R9 | Host concurrency thrash | Host specialists ≤16; L3 j64 only on fertile task packs with scope text |

---

## WWKD

1. **What:** Autonomous overnight **gold** farm that converts dumb “walk bounty pages” into a **ranked EV pipeline**: keep-8 + human-gate state → one overfit program → dual-auth/hydra reuse → sanitize → ship open-bug-bounties; success boundary = EV-QUEUE frozen, overnight idle policy live, at least one lane advanced with evidence **or** explicit BLOCKED+recovery without thrash, dawn ship of sanitized distill if any APPROVED milestone, zero secret leakage, zero fake COMPLETE.

2. **Why:** User order is intentionally dumb (page walk + sleep farm). Substrate already proved: maps complete, dual-auth race DONE, hydra three-lane MAP, keep-8 ROI, ship path green — but **money sits behind three human keys**. Smart farm maximizes $EV/hour by (a) not re-mapping 1100 programs, (b) attacking only gate-open or nearest-open programs, (c) using idle cycles for durable prep (catalog, L3 map packs, sanitize) not CAPTCHA thrash.

3. **Assumptions/Risks:** BC/H1/Inti accounts remain usable; keep-8 still membership SSoT; human may not open doors overnight → overnight success can be **substrate + audit + nearest-open prep**, not forced payout; R1–R9 above. Gold metric = expected bounty $ × P(submit-ready overnight) / agent-hours, not listing count.

4. **How:** M01 state freeze → M02 EV-QUEUE rank → M03 overfit pick (single highest EV openable) → M04 overnight idle loop (whip+pruner+sekhmet map-only) → M05 dual-auth/hydra reuse on overfit → M06 human-gate pulse (non-thrash) → M07 sanitize+secret gate → M08 ship if APPROVED → M09 dawn rollup + refill readiness. Parallel where independent after M02.

5. **Escalation points (→ the-judge / human):**
   - Open any of: Aiven free dual, Auth0 CRED ASSIGNED, second Google research login.
   - Want COMPLETE without own-asset evidence (refuse).
   - Swap keep-8 membership mid-night (judge only).
   - Auto-claim / auto-submit money without human policy (refuse).
   - Disk `/tmp` or spark roots pressure despite pruner.
   - Both Grok host and Titanium L3 auth fail.

---

## Smarten-the-dumb-order (explicit rewrite)

| Dumb | Smart |
|------|--------|
| Walk bounty pages alphabetically / by site chrome | **EV-QUEUE:** score keep-8 only: `score = payout_band × skill_fit × (1 if gate_open else gate_proximity) / effort` |
| Farm “gold” by volume of recon | Farm **one submit-ready draft** on highest EV openable program; negative close counts if honest |
| Start new programs every hour | **Reuse** hydra H1–H3 maps + dual-auth playbooks; refill only on COMPLETE |
| Leave browser CAPTCHA loops overnight | **Idle-dispatch:** policy refresh, catalog `npm run refresh` if safe, L3 FIRST-5 packs on own-scope text, sanitize, ship hygiene — **never** Get Credentials / CAPTCHA thrash |
| Dump raw HTML + cookies into git | **Sanitize** → `milestone-ship.sh` secret gate → `distill/YYYY-MM-DD/<label>` main only |
| Treat MAP as progress theater | Connector: MAP≠COMPLETE; COMPLETE needs own-asset evidence paths |
| Parallel 1100 programs | Overfit **one** (default: Google Drive if A/B; else Aiven if free-tier; else Auth0 if assigned; else Proton/MSRC **map-only** prep) then fan-out via refill |

**Concrete overnight pipeline (ordered):**

```
1) Freeze ROI keep-8 + HYDRA H1–H3 gate flags → write EV-QUEUE.md
2) Pick OVERFIT = argmax EV among gate_open ∪ gate_proximity>threshold
3) Ensure substrate: hydra-pruner + luna roots + tmux hydra/sekhmet present (repair if dead)
4) Loop 119s whip (observe only if gates closed) + 90s pruner
5) On OVERFIT workdir: execute FIRST-5 if own-asset ready; else deepen map pack via sekhmet-luna-* j64 tasks.md (policy/own-scope only)
6) On COMPLETE: hydra-refill 2 + milestone-ship
7) Continuous: secret-gate scan distill paths; tmp-sanitize
8) Dawn: CONNECTOR + HYDRA tracker update + ship plan/distill if APPROVED
```

**Default OVERFIT ranking (Phase 0 judgment, re-score at M02):**

| Rank | Program | EV driver | Gate | Overnight agent move if gate closed |
|------|---------|-----------|------|-------------------------------------|
| 1 | **Aiven** | avg rewarded cash table + free tier authz class | free-tier dual | NEXT-TICK checklist only; no fake project probes |
| 2 | **Google VRP Drive** | high ceiling + clear web classes; map done | dual Google | FIRST-5 if A/B; else negative close pack |
| 3 | **Auth0 CIC** | identity classes; dual-auth pattern | BC creds | CRED-STATE poll; map only |
| 4 | **Proton** (refill) | $100k; email submit; dual own accounts | own accounts | scope extract FULL into playbook |
| 5 | **MSRC / Atlassian / Shopify** | keep-8 tail | tenant/CAPTCHA/H1 export | map-only; no thrash |

---

## Milestones

| # | Title | Gate command | Expected output | Executor |
|---|---|---|---|---|
| **M01** | Substrate freeze (hydra + dual-auth + ship path) | `test -f ~/.xbgst/hydra-bounty/CONNECTOR.md && test -f ~/.xbgst/bounty-distill/2026-08-07/ROI.md && test -x ~/.xbgst/scripts/hydra-whip.sh && test -x ~/.xbgst/scripts/milestone-ship.sh && test -f ~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/AUTONOMOUS-READY.md && df -h /tmp \| tail -1` | All paths present; `/tmp` headroom high; AUTONOMOUS-READY exists | gx-executor-ops |
| **M02** | Write EV-QUEUE (rank by gold/hour, not alpha) | `test -s ~/.xbgst/hydra-bounty/tracker/EV-QUEUE.md && rg -n 'OVERFIT\|Rank\|gate_' ~/.xbgst/hydra-bounty/tracker/EV-QUEUE.md` | EV-QUEUE.md with ranked keep-8, gate flags, single OVERFIT line, score rubric | gx-scribe + gx-planner residual |
| **M03** | Lock overnight OVERFIT + lane assignment | `rg -n 'OVERFIT\|H[123]' ~/.xbgst/hydra-bounty/tracker/HYDRA.md ~/.xbgst/hydra-bounty/tracker/EV-QUEUE.md` | HYDRA + EV-QUEUE agree on one primary; secondary = passive gate pulse only | the-judge ack or advisory proceed |
| **M04** | Overnight idle loop green (whip + pruner + no thrash) | `~/.xbgst/scripts/hydra-pruner.sh; test -x ~/.xbgst/scripts/hydra-whip.sh; rg -n 'CAPTCHA\|no thrash\|no_spawn\|fresh_REPORT' ~/.xbgst/scripts/hydra-whip.sh; tail -5 ~/.xbgst/hydra-bounty/logs/WHIP.log 2>/dev/null \|\| true` | Pruner `done`; whip policy forbids CAPTCHA thrash; log tick without refill spam | gx-executor-ops |
| **M05** | Overfit execute (reuse dual-auth/hydra map) | `LANE=$(rg -o 'OVERFIT=.*' ~/.xbgst/hydra-bounty/tracker/EV-QUEUE.md); test -s ~/.xbgst/hydra-bounty/lanes/stack/aiven/STATUS.md; rg -n 'COMPLETE\|BLOCKED\|FIRST-5\|evidence\|own' ~/.xbgst/hydra-bounty/lanes/*/*/STATUS.md` | STATUS advanced (finding draft **or** BLOCKED(human) with recovery); no secrets | gx-executor-lane + sekhmet-luna-{a\|b\|c} |
| **M06** | Human-gate pulse (non-thrash, titles only) | `rg -n 'REQUESTED\|ASSIGNED\|BLOCKED\|free-tier' ~/.xbgst/hydra-bounty/lanes/wrap/auth0/CRED-STATE.md ~/.xbgst/hydra-bounty/HUMAN-GATES.md; # vault titles only via the-janitor if needed` | CRED-STATE / HUMAN-GATES timestamped; no op reveal in files | gx-connector |
| **M07** | Sanitize distill for ship | `ROOT=~/.xbgst/bounty-distill/2026-08-08; mkdir -p "$ROOT/overnight-gold-farm"; rg -n 'sk-\|AKIA\|password=\|BEGIN (RSA \|OPENSSH )?PRIVATE\|cTtux\|ghp_\|xox[baprs]-' "$ROOT" ~/.xbgst/hydra-bounty/lanes 2>/dev/null \|\| true; ~/.xbgst/scripts/tmp-sanitize-bounty.sh "$ROOT/overnight-gold-farm/sanitize.log"` | Secret gate clean (or scrub-doc only); sanitize log | gx-distiller |
| **M08** | Ship APPROVED artifacts to open-bug-bounties | `~/.xbgst/scripts/milestone-ship.sh --label overnight-gold-farm-r0 --src "$HOME/.xbgst/bounty-distill/2026-08-08/overnight-gold-farm" --msg "Ship overnight gold farm plan, EV-QUEUE, and sanitized hydra status." --dry-run` then live if green | dry-run clean; live push `distill/2026-08-08/overnight-gold-farm-r0` on APPROVED | gx-executor-ship |
| **M09** | Dawn rollup + refill readiness | `rg -n 'Completed\|COMPLETE\|Queue\|OVERFIT' ~/.xbgst/hydra-bounty/tracker/HYDRA.md ~/.xbgst/hydra-bounty/CONNECTOR.md; test -x ~/.xbgst/scripts/hydra-refill.sh` | CONNECTOR + HYDRA updated; refill dry-path documented; if COMPLETE then refill 2 fired | gx-connector + the-planner |

### Handoff notes (cold-start executors)

**M02 EV rubric (copy):**
```
score = payout_proxy(0-2) * skill_fit(0-2) * gate_factor * surface(0-2) / max(effort,1)
gate_factor: 1.0 open | 0.4 human_one_click | 0.15 async_email | 0.05 hard_captcha_or_second_acct_missing
payout_proxy: use published ceilings / Aiven avg rewarded table from ROI — not marketing max alone
Kill: YWH passport, pure SC+KYC, Sherlock contest race, OpenAI jailbreak-only
```

**M05 sekhmet task constraints:**
- Write `tasks.md` (never `.txt`) under lane workdir.
- Include: `GODSPEED inject required. After durable artifacts land: run ~/.xbgst/scripts/milestone-ship.sh if gates green.`
- Own-scope / policy / FIRST-5 only; no live exploit payloads; no Titanium spam on third-party.

**M08 ship only if:** APPROVED reason one-liner + secret gate exit 0 + no cookie/pem/.env.

---

## Dependencies

```
M01 ──► M02 ──► M03 ──┬──► M05 ──► M07 ──► M08
                      │              ▲
                      ├──► M06 ──────┤
                      │              │
                      └──► M04 (idle loop concurrent after M01; observes M05–M06)
                                         │
                                         └──► M09 (after overnight window / any COMPLETE)
```

- **M01 → all:** freeze before rank or loop.
- **M02 → M03 → M05:** no execute without OVERFIT lock.
- **M04 ∥ M05/M06:** whip/pruner continuous; does not invent targets.
- **M06** can unblock M05 mid-night if human opens door (connector pulse).
- **M07 → M08:** never ship unsanitized.
- **M09** after window or on COMPLETE → refill.

---

## Specialist assignment (Phase 2 hint for judge)

| Milestone | Primary | Support |
|-----------|---------|---------|
| M01 | gx-executor-ops | sentinel (safety) |
| M02 | gx-scribe | scout (ROI re-read only) |
| M03 | the-judge / planner residual | connector |
| M04 | gx-executor-ops | pruner loop |
| M05 | gx-executor-lane + sekhmet-luna-* | critic on draft |
| M06 | gx-connector | the-janitor (titles only) |
| M07 | gx-distiller | labrat secret gate |
| M08 | gx-executor-ship | scribe |
| M09 | gx-connector | planner |

---

## Non-goals (overnight)

- Alphabetical crawl of open-bug-bounties 1100 listings.
- YesWeHack / passport / pure SC KYC / Sherlock races.
- Fake COMPLETE to exercise refill.
- Storing Auth0/Aiven/Google passwords or OAuth codes in distill (oauth-callback-audit already warns: paste = hygiene event, not product CRIT).
- Force-push or non-main ship paths.

---

## Evidence

evidence: none — planning artifact (Phase 0 data-walk of hydra, bounty-distill 2026-08-07/08, open-bug-bounties data+distill, dual-auth AUTONOMOUS-READY, scripts whip/refill/pruner/ship/sanitize).

**planner-gate:** advisory · risks-open: R1–R9 · human doors H1–H3 still closed as of data-walk.
