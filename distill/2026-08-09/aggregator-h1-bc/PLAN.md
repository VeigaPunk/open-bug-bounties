# Plan — Aggregator H1+BC smart rank (not 1100-page walk)
**Session:** aggregator-h1-bc | **Dispatched by:** xbgst | **Date:** 2026-08-09

## Phase 0 — State map
- **Exists:**
  - `~/Projects/open-bug-bounties` static index (GitHub Pages) — **1101** program records total.
  - Catalog files (mtime freshness 2026-08-06 inventory; H1 directory recheck stamp 2026-08-08T13:15:46Z):
    - `data/platform_programs.json` — **768** programs: HackerOne **224**, Bugcrowd **241**, HackenProof 159, Intigriti 82, YesWeHack 62.
    - `data/independent_programs.json` — **60** first-party (reward strings present; policy recheck via robots).
    - `data/web3_programs.json` — **273** (Immunefi 187, Cantina 51, Sherlock 35).
  - Schema (`platform`): `id`, `platform`, `name`, `url`, `directory_url`, `industry` only — **no min/max reward, no asset counts, no response SLAs**.
  - Normalize layer `data/programs.ts` maps seeds → UI `Program` (optional `minReward`/`maxReward` only filled for some independent/first-party, **not** H1/BC platform rows).
  - Refresh: `scripts/refresh-data.mjs` + GH Actions every 12h — rechecks eligible independent policy URLs; **directory reachability** for HackerOne + Sherlock only; **does not re-scrape program lists** for Bugcrowd (snapshot retained / permission-labeled per README).
  - Gold EV SSoT already frozen:
    - Membership: `~/.xbgst/bounty-distill/2026-08-07/ROI.md` keep-8.
    - Rank + gates: `~/.xbgst/hydra-bounty/tracker/EV-QUEUE.md` (OVERFIT=Aiven, all `gate_factor=0`).
    - COMPLETE rules: `tracker/COMPLETE-GATE.md`; burner: `tracker/BURNER-GATES.md`; human doors: `HUMAN-GATES.md`.
  - Overnight distill mirrors under `open-bug-bounties/distill/2026-08-09/overnight-gold-farm/` (explicit kill: alphabet walk of ~1100).
- **Missing:**
  - Rankable **payout / scope-depth fields** on H1+BC catalog rows (cannot gold-rank from JSON alone).
  - Live H1/BC **reward tables** or asset counts in aggregator (by design: minimal factual records).
  - Automated **H1+BC filter → join ROI keep-8 → delta report** artifact for “catalog check” without page walk.
  - Bugcrowd inventory refresh path (legal/permission; burner CDP is for eng work, not mass scrape).
- **Risk:**
  - Treating 1101-row refresh as EV work → thrash, zero gold (`gate_factor` still 0 on keep-8).
  - Promoting catalog “reachability” (refresh script) to COMPLETE / keep-list membership.
  - Scraping H1/BC program pages at scale (ToS/robots; README already freezes BC as snapshot).
  - Schema drift if someone assumes `minReward` on platform programs.

## WWKD
1. **What:** Verify aggregator catalog state for HackerOne + Bugcrowd and produce a **smart gold-EV path** that filters to H1+BC, **joins existing ROI keep-8**, and only overfits one concrete program — **success boundary:** no 1100-page walk; no fake COMPLETE; durable rank/join artifact + optional thin hygiene gate on inventory timestamps.
2. **Why:** User asked to “check 1100+ bounty aggregator” focused on H1+BC. Prior overnight farm already proved catalog has **no reward fields** and page-walk ≠ gold. Need a plan that **checks** the index (counts, freshness, H1/BC slice) without undoing EV-QUEUE freeze.
3. **Assumptions/Risks:**
  - Keep-8 membership SSoT remains `ROI.md` until judge reopens.
  - H1 directory check ≠ list re-ingest; BC list is snapshot-dated 2026-08-06.
  - Gold EV requires external evidence (live cash tables, free-tier doors, dual-auth assign) — not `platform_programs.json`.
  - Burner CDP (BC VeigaPunk) for human-door work only; not catalog spider.
4. **How:** M01 inventory gate → M02 H1+BC slice + schema proof → M03 join keep-8 / name-resolve → M04 rank hygiene (reaffirm EV-QUEUE, do not re-score from empty rewards) → M05 optional overfit one (Aiven) scope-link check → M06 ship distill if APPROVED.
5. **Escalation points:**
  - Judge if catalog membership should **change** keep-8 (e.g. promote OpenAI/Stripe/CF).
  - Judge if BC/H1 **re-scrape** is ever authorized (currently killed for mass walk).
  - Gate flip on human doors (Aiven dual API titles, Auth0 ASSIGNED, Google dual) → recompute `gold_ev_score`, not catalog walk.

## Milestones
| # | Title | Gate command | Expected output | Executor |
|---|---|---|---|---|
| M01 | Catalog inventory counts + freshness | `node -e '…' <platform/indep/web3>` or `jq '.programs\|length' data/platform_programs.json` + print `snapshot_at_utc` / `last_permitted_check_at_utc` | Total ~1101; platform 768; H1=224 BC=241; snapshot ≤2026-08-06 inventory; H1 check stamp present | scout |
| M02 | H1+BC-only slice schema proof | `node` filter `platform in (HackerOne,Bugcrowd)`; assert fields ⊆ `{id,platform,name,url,directory_url,industry}`; assert **0** reward keys | 465 rows; write `h1-bc-slice-stats.md` (counts + industry fill rate only) | scout |
| M03 | Join keep-8 names to catalog URLs | Resolve ROI keep-8 ↔ `id`/`url` for H1/BC/FP; table of matched/unmatched | 8-row join table (Aiven/Auth0/Atlassian on BC; Shopify/GitLab on H1; Google/Proton/MSRC FP) — gaps logged, no invent | executor |
| M04 | EV rank reaffirm (no empty-field rank) | Diff plan against `tracker/EV-QUEUE.md` + `ROI.md`; refuse re-rank from catalog rewards | `gold_ev_score` still gate-driven; OVERFIT=Aiven; kill list includes 1100 walk | critic |
| M05 | Overfit one concrete case (Aiven) | Confirm catalog URL for Aiven BC + lane map path; pulse op **titles only** (no reveal) | Single program: URL + `lanes/stack/aiven` NEXT-TICK still SSoT; gate_factor still 0 unless titles appear | labrat / stack lane |
| M06 | Distill + ship if APPROVED | Secret gate `rg` on distill paths; `milestone-ship.sh` local-first | Sanitized distill under `open-bug-bounties/distill/2026-08-09/aggregator-h1-bc/` + mirror if needed | distiller |

## Dependencies
M01 → M02 → M03 → M04 → M05 (M05 may parallel M04 after M03). M06 after M04 (M05 optional for ship of rank hygiene alone).

## Smarten-the-dumb-order
- **Dumb:** Walk ~1100 aggregator program pages overnight; treat refresh reachability as gold; invent rewards from empty fields; thrash BC CAPTCHA / Auth0 Get-Credentials; fake COMPLETE to force refill.
- **Smart:**  
  1. **Filter** platform JSON → H1+BC (465) in one `node`/`jq` pass.  
  2. **Prove** non-rankable schema (no rewards) so catalog cannot replace ROI.  
  3. **Join** keep-8 SSoT (ROI + EV-QUEUE) for URL/id hygiene only.  
  4. **Rank** only via existing formula: `payout_proxy × skill_fit × gate_factor / effort` with external payout proxies already in EV-QUEUE.  
  5. **Overfit** Aiven when gate opens; otherwise refill-prep + idle fertility.  
  6. Refresh catalog = **hygiene** (12h Actions), not hunt.

## Axes (godspeed)
| Axis | Direction |
|------|-----------|
| gold_ev_per_hour | ↑ (filter+join, not spider) |
| thrash | ↓ (no 1100 walk, no CAPTCHA) |
| evidence_fidelity | ↑ (schema truth: no fake rewards) |
| ship_hygiene | ↑ (plan + slice stats + distill) |
| safety_in_policy | ↑ (robots/snapshot policy retained) |

## Catalog facts (immutable inputs for executors)
| Metric | Value |
|--------|------:|
| Total records | 1101 |
| HackerOne | 224 |
| Bugcrowd | 241 |
| H1+BC | 465 |
| Other platforms (HP+Inti+YWH) | 303 |
| Independent FP | 60 |
| Web3 | 273 |
| Platform fields | id, platform, name, url, directory_url, industry |
| Reward fields on platform rows | **0** |
| Inventory snapshot_at_utc (platform) | 2026-08-06T00:44:32Z |
| last_permitted_check_at_utc (platform/H1 dir) | 2026-08-08T13:15:46Z |
| Refresh behavior | independent policy + H1/Sherlock directory HEAD; **no** BC list re-crawl |

## Keep-8 × platform (membership; not re-ranked here)
| Keep-8 | Queue | Catalog expectation |
|--------|-------|---------------------|
| Aiven MBB | BC | bugcrowd engagement URL |
| Auth0 by Okta | BC | bugcrowd engagement |
| Atlassian Cloud | BC | bugcrowd engagement |
| Google VRP | FP | independent / first-party |
| Proton | FP | independent |
| Microsoft M365/web | FP | independent / MSRC |
| Shopify | H1 | hackerone.com/… |
| GitLab.com \| Dropbox Inti | H1 / Inti | H1 or Intigriti (Inti outside H1+BC filter) |

## Non-goals
- Rebuilding open-bug-bounties scrapers for full H1/BC scope text.
- Changing ROI keep-8 without judge evidence + reopen triggers.
- Setting STATUS=COMPLETE without COMPLETE-GATE E1–E8.
- Python for stats (xbgst wall) — use **node** or **jq** / Rust.

## Artifact paths
- Plan (this): `~/.xbgst/plans/2026-08-09-aggregator-h1-bc.md`
- Mirror: `~/.xbgst/hydra-bounty/plans/PLAN-r0-aggregator-h1-bc.md`
- Future slice stats (M02): `~/.xbgst/bounty-distill/2026-08-09/aggregator-h1-bc/h1-bc-slice-stats.md` (executor)
- Future join (M03): same dir `keep8-catalog-join.md`

## Executor handoff (cold start)
```bash
# M01/M02 one-shot
cd ~/Projects/open-bug-bounties/data && node -e '
const fs=require("fs");
const pp=JSON.parse(fs.readFileSync("platform_programs.json","utf8"));
const by={}; for (const p of pp.programs) by[p.platform]=(by[p.platform]||0)+1;
const h1bc=pp.programs.filter(p=>p.platform==="HackerOne"||p.platform==="Bugcrowd");
const fields=new Set(); h1bc.forEach(p=>Object.keys(p).forEach(k=>fields.add(k)));
const rewardish=h1bc.filter(p=>"minReward" in p||"maxReward" in p||"reward" in p).length;
console.log(JSON.stringify({by,h1bc:h1bc.length,fields:[...fields],rewardish,snapshot:pp.snapshot_at_utc,last:pp.last_permitted_check_at_utc},null,2));
'
# Expected: h1bc=465, rewardish=0, by.HackerOne=224, by.Bugcrowd=241
```

**Status:** Phase 0 complete — plan only, no implement.  
**evidence:** data-walk 2026-08-09 — open-bug-bounties data/*.json, refresh-data.mjs, ROI.md, EV-QUEUE.md, COMPLETE-GATE.md  
**planner-gate:** advisory if judge silent one cycle — executors may proceed with `[planner-gate: advisory, risks-open]` on keep-8 membership only (must not invent COMPLETE).

GODSPEED inject required. After durable artifacts land: run `~/.xbgst/scripts/milestone-ship.sh` if gates green.
