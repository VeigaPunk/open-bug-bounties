# CRITIC — Aggregator H1+BC (M04)

**Role:** critic · **Date:** 2026-08-09 · **Session:** aggregator-h1-bc  
**SSoT rank:** `~/.xbgst/hydra-bounty/tracker/EV-QUEUE.md` (frozen 2026-08-08)  
**SSoT membership:** `~/.xbgst/bounty-distill/2026-08-07/ROI.md` keep-8  
**Plan under review:** `~/.xbgst/plans/2026-08-09-aggregator-h1-bc.md`  
**Evidence:** `inventory.json`, `h1-bc-slice.json`, live `platform_programs.json` recheck

---

## Axes

| Axis | Direction |
|------|-----------|
| gold_ev_per_hour | ↑ only via gate-open work or refill-prep; never via catalog spider |
| thrash | ↓ ban 1100 walk, CAPTCHA, empty-field rank |
| evidence_fidelity | ↑ schema truth: 0 reward keys on platform rows |
| rank_integrity | ↑ EV-QUEUE formula only; gate_factor binary |
| safety_in_policy | ↑ no mass H1/BC re-scrape |

---

## Phase 1 — UNDERSTAND (approach map)

### Problem claimed
User-facing ask: “check 1100+ bounty aggregator” with H1+BC focus. Risk: agents interpret check as **page walk** or **re-rank gold from catalog**.

### What was decided (smart plan)
1. Inventory hygiene only (counts, freshness stamps).  
2. Prove H1+BC schema has **no** min/max/reward fields.  
3. Join keep-8 → catalog URL/id for hygiene — **not** membership rewrite.  
4. Reaffirm EV-QUEUE; refuse empty-field re-score.  
5. Overfit **one** (Aiven); ship distill if gates green.

### What must stay killed
- Alphabet / breadth walk of ~1100 program pages.  
- Gold ranking from `platform_programs.json` rewards (fields do not exist).  
- Treating directory HEAD / refresh reachability as COMPLETE or keep-list signal.  
- Mass Bugcrowd re-crawl (snapshot policy).  
- Fake COMPLETE to force refill.

### Load-bearing assumptions
| # | Assumption | Attack |
|---|------------|--------|
| A1 | Keep-8 membership is closed until judge reopen | Sound — catalog cannot add OpenAI/Stripe/CF without external payout+door evidence |
| A2 | `gate_factor=0` on all keep-8 ⇒ all `gold_ev_score=0` | Sound — open-state order is readiness order only |
| A3 | Platform JSON has zero rankable payout | **Proven** — see facts below |
| A4 | Page walk discovers gold faster than gate sensors | **False** — money is behind human keys (dual free-tier, cred assign, dual Google) |
| A5 | Industry string / name sort is a weak EV proxy | **False** — 221/465 industry fill is not skill_fit or payout_proxy |

### Catalog facts (immutable for this critic)

| Metric | Value | Source |
|--------|------:|--------|
| Total aggregator records | 1101 | inventory.json |
| Platform programs | 768 | platform_programs.json |
| HackerOne | 224 | slice + live |
| Bugcrowd | 241 | slice + live |
| **H1+BC** | **465** | h1-bc-slice.json |
| Platform field set | id, platform, name, url, directory_url, industry | proven |
| **reward_key_hits / rewardish** | **0 / []** | slice + live node recheck |
| industry_fill (H1+BC) | 221 | h1-bc-slice.json |
| snapshot_at_utc | 2026-08-06T00:44:32Z | inventory |
| last_permitted_check_at_utc | 2026-08-08T13:15:46Z | H1 dir check only |

**Verdict on empty-field gold rank:** mathematically undefined. Any sort key invented from missing rewards is fiction.

---

## Phase 2 — CHALLENGE (adversarial)

### Decision D1 — “Walk ~1100 pages to check the aggregator”

| | |
|--|--|
| **CURRENT (killed)** | Breadth crawl program URLs / policy pages overnight |
| **ALTERNATIVE (keep)** | One-pass `jq`/`node` filter → counts + schema proof + keep-8 join |
| **TRADE-OFF** | Walk maximizes coverage theater; filter maximizes gold_ev_per_hour and policy safety |
| **FAILURE-MODE** | Hours of ToS-risk scrapes; CAPTCHA thrash on BC; zero gate flips; zero COMPLETE; dilutes OVERFIT |
| **REVERSIBILITY** | Low once burned on burner sessions / rate limits; high if never started |
| **SEVERITY** | **RETHINK** if any executor schedules walk; **MONITOR** if only idle `refresh-data.mjs` (hygiene) |

```
CRITIQUE: Page-walking ~1100 listings confuses inventory hygiene with gold EV work.
SEVERITY: RETHINK
CURRENT: Any plan that spiders open-bug-bounties program URLs at scale
ALTERNATIVE: Filter H1+BC (465) in-process; join keep-8; rank only via EV-QUEUE external proxies
TRADE-OFF: Walk buys false progress; filter preserves CPU for gate sensors + refill-prep
FAILURE-MODE: gate_factor stays 0; agents report “checked catalog” as if COMPLETE
CONFIDENCE: high
```

### Decision D2 — “Rank gold from platform_programs.json rewards”

| | |
|--|--|
| **CURRENT (killed)** | Sort/score by minReward/maxReward/marketing ceiling from catalog |
| **ALTERNATIVE (keep)** | `gold_ev_score ≈ payout_proxy × skill_fit × gate_factor / effort` with **external** proxies already in EV-QUEUE |
| **TRADE-OFF** | Empty-field rank is free and wrong; EV-QUEUE rank is gated and honest (all 0 while doors closed) |
| **FAILURE-MODE** | Promote high-name or high-industry rows over Aiven; invent OVERFIT flip without judge |
| **REVERSIBILITY** | Medium — rank docs can be reverted; wasted human attention harder |
| **SEVERITY** | **RETHINK** |

```
CRITIQUE: Ranking gold from empty reward fields is ranking noise; schema has zero payout keys.
SEVERITY: RETHINK
CURRENT: Any score derived from platform row rewards / implied bounty size in aggregator JSON
ALTERNATIVE: Frozen EV-QUEUE; payout_proxy from live cash tables / program docs already scored for keep-8
TRADE-OFF: Catalog “rank” looks data-driven but is non-identified; EV-QUEUE is sparse but identified
FAILURE-MODE: Keep-8 pollution; thrash on programs with no free-tier dual path
CONFIDENCE: high
```

### Decision D3 — Soft residual: “Refresh / directory HEAD as progress”

| | |
|--|--|
| **CURRENT (plan allows hygiene)** | 12h Actions + H1/Sherlock directory check |
| **ATTACK** | Agents may log refresh success as farm progress |
| **ALTERNATIVE** | Label refresh **ship_hygiene only**; never increment gold_ev or COMPLETE |
| **SEVERITY** | **CONSIDER** |

```
CRITIQUE: Refresh reachability is not EV; promoting it to queue signal reopens thrash.
SEVERITY: CONSIDER
CURRENT: refresh-data.mjs / last_permitted_check stamps
ALTERNATIVE: Hygiene-only logging; gold path = op title pulse + human door flip
TRADE-OFF: Refresh keeps index fresh; misuse steals overnight focus
FAILURE-MODE: Night spent on GHA green while Aiven/Auth0/Google doors unwatched
CONFIDENCE: high
```

### Decision D4 — Plan itself (steelman)

Plan M01–M06 already bans walk and empty-field rank. **Approach is sound.** Residual risks:

1. **M03 join** treated as re-rank (join is URL hygiene only).  
2. **Industry fill 221/465** used as weak proxy.  
3. **keep8-join.json empty** at critic time — do not invent matches; fail open to ROI names only.  
4. **H1+BC filter** drops Intigriti (Dropbox Inti) — correct for slice stats; keep-8 row remains XOR refill, not catalog-driven.

```
CRITIQUE: If M04 is skipped, soft executors may reintroduce walk or empty rank despite plan text.
SEVERITY: CONSIDER (process) / RETHINK (if walk reappears)
CURRENT: Smart filter+join+reaffirm
ALTERNATIVE: Same, with hard kill criteria enforced in CRITIC (this file)
TRADE-OFF: Extra critic doc cost vs one thrash night
FAILURE-MODE: Advisory planner-gate ignored; catalog becomes fake SSoT
CONFIDENCE: high
```

### ACH (competing hypotheses for “what should agents do next”)

| H | Hypothesis | For | Against | Ruling |
|---|------------|-----|---------|--------|
| H1 | Spider 1100 for undiscovered high-EV | Coverage urge | 0 rewards in JSON; keep-8 frozen; human doors dominate | **KILL** |
| H2 | Re-score keep-8 from catalog metadata | Feels like data work | No payout fields; industry ≠ skill_fit | **KILL** |
| H3 | Hygiene inventory + join + hold EV-QUEUE; overfit Aiven on gate | Plan + overnight farm evidence; all gate_factor=0 | Feels “idle” when doors closed | **KEEP** |
| H4 | Expand keep-8 from H1+BC name list | Many famous brands in 465 | No door evidence; judge-only membership | **KILL** without reopen |

---

## Kill criteria (hard)

Any of the following ⇒ **BLOCKED** / refuse APPROVED for gold-EV work:

1. **K-WALK:** Task list, swarm line, or agent prompt that iterates program pages toward ~1100 (or “all H1+BC 465 pages”) for recon/rank.  
2. **K-EMPTY-RANK:** Any `gold_ev_score`, OVERFIT flip, or keep-list change computed from `platform_programs.json` reward fields (including imputed zeros, name-length, industry string, or directory_url presence).  
3. **K-COMPLETE-FAKE:** STATUS=COMPLETE without `COMPLETE-GATE` E1–E8.  
4. **K-MEMBERSHIP:** Adding programs to keep-8 solely because they appear in H1+BC slice.  
5. **K-BC-SPIDER:** Mass Bugcrowd engagement re-crawl contrary to snapshot/permission policy.  
6. **K-CAPTCHA-THRASH:** Get-Credentials / BC CAPTCHA loops as “progress.”  
7. **K-REFRESH-AS-GOLD:** Treating `refresh-data.mjs` green or `last_permitted_check_at_utc` bump as gold_ev_per_hour win.  
8. **K-MULTI-OVERFIT:** More than one OVERFIT=y without judge swap from Aiven default.

---

## Keep criteria (hard)

All of the following must hold for **APPROVED** rank-hygiene / distill ship:

1. **C-SCHEMA:** Documented proof that H1+BC fields ⊆ `{id,platform,name,url,directory_url,industry}` and `reward_key_hits=[]` / `rewardish=0`.  
2. **C-SSOT:** Rank table remains EV-QUEUE formula; all current `gate_factor=0` ⇒ scores 0; open-state order Aiven > Auth0 > Google > Proton > Atlassian > MSRC > Shopify > GitLab|Dropbox.  
3. **C-OVERFIT:** Exactly one OVERFIT=y → **Aiven** until judge.  
4. **C-JOIN-ONLY:** Catalog join maps keep-8 → URL/id only; unmatched rows logged, not invented.  
5. **C-FILTER-NOT-CRAWL:** H1+BC work is in-memory filter of existing JSON (or equivalent), not HTTP page walk of 465/1100.  
6. **C-GOLD-SOURCE:** payout_proxy / skill_fit from external program evidence already frozen in EV-QUEUE/ROI — not aggregator.  
7. **C-GATE-SENSOR:** Overnight action limited to op **titles** pulse, CRED-STATE poll, map/refill-prep — no door minting by agents.  
8. **C-HYGIENE-LABEL:** Inventory/refresh artifacts labeled hygiene; do not alter EV rank.  
9. **C-SHIP-SAFE:** Secret gate clean; no op reveals; milestone-ship only after APPROVED on axes above.

---

## Keep-8 reaffirm (membership — not re-scored here)

| Keep-8 | Platform expectation | Catalog role |
|--------|----------------------|--------------|
| Aiven MBB | BC | URL join only; OVERFIT |
| Auth0 by Okta | BC | URL join; CRED poll |
| Atlassian Cloud | BC | URL join; refill queue |
| Google VRP | FP | independent JSON; not H1+BC filter |
| Proton | FP | independent |
| Microsoft M365/web | FP | independent / MSRC |
| Shopify | H1 | URL join |
| GitLab.com \| Dropbox Inti | H1 / Inti | H1 in slice; Inti outside H1+BC |

**Do not re-rank.** When a gate flips to 1, recompute `gold_ev_score` in EV-QUEUE — still not from catalog rewards.

---

## Devil’s advocacy (strongest case *for* walking)

“Maybe payout tables live only on live pages; JSON is stale; one crawl updates proxies.”

**Rebuttal:**  
- Crawl cost is O(n) HTTP + ToS risk; EV is O(1) human door opens on **already ranked** keep-8.  
- BC list re-crawl is policy-killed; H1 directory check ≠ program bounty table ingest.  
- Prior overnight farm already proved: maps DONE, dual-auth race DONE, thrash kills defined — bottleneck is **gate_factor**, not missing catalog rows.  
- If a single program needs live cash table, fetch **that** program (Aiven) — not 1100.

## What-if (reversible failure modes)

| If wrong… | Cost | Revert |
|-----------|------|--------|
| Missed high-EV program outside keep-8 | Deferred until judge reopen with evidence | Add via ROI reopen triggers only |
| Schema later gains rewards | Re-evaluate rank **after** fields exist and are validated | Then consider catalog as **one** payout_proxy input — still not page walk |
| Gate never opens | Farm stays score-0; hygiene still ships | Idle fertility: sanitize, L3 pack, NEXT-TICK — not walk |

---

## Concrete counter-proposals

| Bad move | Do this instead |
|----------|-----------------|
| `for url in all_programs: fetch(url)` | `node`/`jq` filter platform ∈ {HackerOne,Bugcrowd}; write slice stats |
| `sort_by(maxReward)` on platform JSON | Read EV-QUEUE; refuse |
| “Check 1100” as swarm tasks.md lines | One inventory task + one join task + Aiven overfit |
| Promote industry=Crypto as gold | Ignore industry for EV |
| Expand keep-8 from famous H1 names | Judge + ROI reopen only |

---

## M04 gate result

| Check | Result |
|-------|--------|
| Plan bans 1100 walk | **PASS** (explicit dumb/smart + non-goals) |
| Plan bans empty-field rank | **PASS** (M04 + schema proof) |
| Live schema rewardish=0 | **PASS** |
| EV-QUEUE SSoT intact | **PASS** (all gate_factor=0; OVERFIT=Aiven) |
| keep8-join complete | **GAP** — `keep8-join.json` empty; M03 incomplete; does not unblock walk |
| Any RETHINK residual in plan text | **None** on D1/D2; **CONSIDER** on refresh-as-progress |

**APPROVED (critic M04):** Rank hygiene path = filter + schema proof + EV-QUEUE reaffirm + single OVERFIT.  
**BLOCKED forever without new judge evidence:** 1100-page walk; gold rank from empty `platform_programs.json` rewards.

---

## One-line summary

**Catalog is a phone book without prices; gold EV is a locked door — walk neither the phone book nor invent prices.**

GODSPEED inject required. After durable artifacts land: run `~/.xbgst/scripts/milestone-ship.sh` if gates green.

**evidence:** 2026-08-09 critic — inventory.json, h1-bc-slice.json, live platform_programs.json, EV-QUEUE.md, plan 2026-08-09-aggregator-h1-bc.md  
**status:** CRITIC.md written · kill/keep criteria frozen
