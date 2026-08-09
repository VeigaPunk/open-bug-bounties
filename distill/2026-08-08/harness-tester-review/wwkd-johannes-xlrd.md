# Plan — Johannes × yc945 XLS (xlrd) ruthless triangulation
**Session:** harness-tester-review-20260808-johannes-xlrd | **Dispatched by:** the-judge | **Date:** 2026-08-08  
**Role:** gx-planner-phase0 | **Host:** Grok | **evidence:** none — planning artifact  

**Axes (named):** `source_truth` · `graph_depth` · `claim_kill_rate` · `non-invention` · `actionability`

---

## Phase 0 — State map

### Exists
- **Prior distill (source-of-truth for Johannes public surface):**  
  `distill/JOHANNES_DISCLOSURE.md` — **no public graded list**; only (1) LB **19** as `johannes-ece`, (2) issue **#3** one-liner *“By my count 9 of those aren't actual bugs fwiw”* on **yc945’s** thread. Form-only private submission is the strong model for the score.
- **Hard attribution prior (do not reverse):** XLS **22 → 30** attachments are **yc945**, not Johannes. H3 trap documented: commenter ≠ list author.
- **Peer reject neighborhood (partial):** JOHANNES §4.2 classes already map yc945 false Criticals → daulet reject / local B0x REJECT (XRES polarity, family 0x2, drive-mode clear, missing pull-ups, A0 nit, INPUT_PULLUP, thermal, V_BCKP, hygiene splits).
- **Local ground truth for autopsy:** `challenge-firmware/`, `challenge-kicad/`, `distill/BUG_VERDICTS.md`, `distill/IRONCLAD_LEDGER.md`, `distill/verdicts.csv`, `hunt/scout-patterns.md`, `hunt/fw-new.md`, `hunt/sch-pcb-new.md`.
- **Best public accept/reject ledger (not Johannes):** daulet `FINAL_FINDINGS_24_SUBMISSION.md` + `FINAL_COUNCIL_LEDGER.md` (LB 20).
- **Empty work dirs ready:** `graph/` (0 files), `xlrd-autopsy/` (0 files).
- **Issue anchors:** `commaai/harness_tester_challenge` issue #3; attachments named `Harness.Tester.Challenge.xls`, `30.Harness.Tester.Challenge.xls` (OLE UTF-16 extract mentioned in prior; **raw XLS not cached in workspace yet**).

### Missing
- Cached primary binaries + full row tables for **XLS-22** and **XLS-30** under `xlrd-autopsy/`.
- Machine graph artifact: Johannes → #3 → yc945 → XLS22/30 → comment → LB (depth n−1 edges + evidence URLs).
- **Per-row** autopsy (every BUG-F*/H* vs FW line / netlist / DS), not just class-level kill list.
- Ranked **top-9 kill candidates** with confidence + kill reason (reconstruction only; Johannes never named the 9).
- Ruthless distill that **shits on bad claims** (misattribution of XLS to Johannes; “he disclosed 19 named plants”; inflated Criticals; invention of form rows).
- Live re-verify of issue #3 comment id/body/timestamps and attachment SHAs (staleness risk on prior markdown alone).

### Risk
| Risk | Severity | Mitigation |
|------|----------|------------|
| **Non-invention:** claiming “Johannes killed F05, F13, …” as fact | **High** | Label every kill map `reconstruction · confidence · anchors`; never “his form rows” |
| XLS not present on disk; re-download fails or attachment URLs rotate | **Med** | Gate M02 on `gh api` download + SHA; fail closed if rows <22 |
| 22-row vs 30-row epoch ambiguity (comment timed to 22-pack era) | **Med** | Autopsy **both**; kill map primary against **22** (comment “9 of those”); 30 is inflation delta only |
| OLE/BIFF parse fragility (legacy `.xls`) | **Med** | Prefer UTF-16 string extract + `ssconvert`/`xlsx2csv` if available; record raw dump |
| Over-fit kill list to daulet without row text match | **Med** | Kill only when row claim text maps 1:1 to a known false class **and** local/DS contradict |
| Treating LB 19 reconstruction as public disclosure | **High** | Distill must open with **public surface = 2 facts only** |

---

## WWKD

1. **What:** Ruthless n−1 connection graph + full yc945 XLS row autopsy + reconstructed “9 kills” map + ship distill — **without inventing Johannes’s private form**. Success boundary: every node has a primary URL or file hash; every kill row has FW/kicad/DS counter-evidence; zero claims that Johannes authored the XLS or named the 9.
2. **Why:** Operators and prior agents collapse “comment on #3” with “XLS list” (H3). JOHANNES_DISCLOSURE already kills that at narrative level; **xlrd row work is incomplete** (`xlrd-autopsy/` empty). Claim kill rate and submission hygiene depend on knowing which **yc945** Criticals a Johannes-grade filter drops.
3. **Assumptions/Risks:** H1∧H2 (public comment + private form) remain prior. Kill map is **intersection prior**, not recovery. Primary XLS may need live GH download. Prefer daulet + local REJECT over VeigaPunk volume for truth.
4. **How:** M01 graph (immutable edges) → M02 download+parse XLS → M03 row autopsy vs sources → M04 rank 9 kills + shit-list bad claims → M05 ship distill + optional mirror. Parallel where independent (graph doc can draft from known edges while download runs).
5. **Escalation points:** (a) Attachment missing/corrupt → judge: proceed with partial cached extract vs abort. (b) Any agent wants to assert “Johannes found plant X” without form dump → **hard block**. (c) 9-kill set disagrees with JOHANNES §4.2 by >3 rows → judge re-axes before ship.

---

## Axes → milestone map

| Axis | How milestones move it |
|------|------------------------|
| **source_truth** | M01 live GH/LB edges; M02 SHA’d XLS; M03 cite FW/sch/PCB paths only |
| **graph_depth** | M01 n−1: person↔comment↔issue↔author↔files↔LB; no orphan nodes |
| **claim_kill_rate** | M03–M04: every false Critical gets KILL/KEEP/SPLIT with reason |
| **non-invention** | M04–M05 disclaimers; kill map ≠ form recovery; XLS author = yc945 only |
| **actionability** | M05: hygiene checklist for our submission; ranked kill classes for reviewers |

---

## Milestones

| # | Title | Gate command | Expected output | Executor |
|---|-------|--------------|-----------------|----------|
| **M01** | **Graph nodes:** Johannes → #3 → yc945 → XLS22/30 → comment → LB | `test -s graph/johannes-yc945-n1.md && rg -n 'Johannes-ece|yc945|XLS|leaderboard|9 of those' graph/johannes-yc945-n1.md` | Markdown graph: **nodes** (identity, issue, comment, XLS22, XLS30, LB row, daulet anchor, local ironclad) + **edges** with evidence URL/API + depth labels n−1; explicit **broken edges** (no form payload, no named 9). Kill claim: “Johannes list = XLS” marked **FALSE**. | scout + connector |
| **M02** | **Acquire + parse XLS-22 and XLS-30** into `xlrd-autopsy/` | `ls -la xlrd-autopsy/*.{xls,md,csv,json} 2>/dev/null; test -f xlrd-autopsy/xls22-rows.md && test -f xlrd-autopsy/xls30-rows.md; rg -c 'BUG-|ID|Critical|Moderate' xlrd-autopsy/xls22-rows.md` | Both binaries (or documented fail) with SHA256; row tables (≥22 / ≥30) with stable IDs (BUG-F*/H* or sheet cols); delta 22→30 listed; parse method logged (OLE UTF-16 / ssconvert / rust parse). **No invention of missing cells.** | executor (rust preferred for parse) |
| **M03** | **Full XLS row autopsy** vs firmware + kicad + DS | `test -s xlrd-autopsy/row-autopsy.md && rg -c 'KILL\|KEEP\|SPLIT\|UNKNOWN' xlrd-autopsy/row-autopsy.md; test $(rg -c '^(KILL|KEEP|SPLIT|UNKNOWN)' xlrd-autopsy/row-autopsy.md \|\| rg -c '\| (KILL\|KEEP\|SPLIT\|UNKNOWN) \|' xlrd-autopsy/row-autopsy.md) -ge 22` | Every **22** primary rows + **30** delta rows: claim text, severity claimed, counter-evidence path (`challenge-firmware/*`, `challenge-kicad/*`, daulet #, local Bxx), verdict **KILL/KEEP/SPLIT/UNKNOWN**, confidence. Unknowns listed for judge — no silent KEEP. | labrat + critic (parallel FW/sch batches) |
| **M04** | **Map which 9 Johannes likely killed** (reconstruction) | `test -s xlrd-autopsy/johannes-9-kill-map.md && rg -n 'confidence|reconstruction|non-invention' xlrd-autopsy/johannes-9-kill-map.md; test $(rg -c '^\| *[0-9]+ *\|' xlrd-autopsy/johannes-9-kill-map.md) -ge 9` | Ranked **exactly 9** (or 9+runners-up) KILL candidates from the **22-pack**, scored by: (1) datasheet-false certainty, (2) daulet REJECT match, (3) local B REJECT match, (4) hygiene/split class. Explicit banner: **not his named set**. Bad-claim shitlist: misattribution, “19 public bugs”, treating 30 as stronger, inventing form rows. | critic + distiller |
| **M05** | **Ship ruthless distill** | `test -s distill/JOHANNES_XLS_RUTHLESS.md && rg -n 'yc945|not Johannes|9 of those|KILL' distill/JOHANNES_XLS_RUTHLESS.md; rg -n 'sk-\|AKIA\|password=\|ghp_' distill/JOHANNES_XLS_RUTHLESS.md xlrd-autopsy graph \|\| true` | Single distill: graph summary + autopsy density + 9-kill map + **do/don’t** for submission hygiene; secrets gate clean; if APPROVED, `milestone-ship.sh` to open-bug-bounties distill mirror (sanitized). Update JOHANNES_DISCLOSURE pointer to new file (no contradictory claims). | distiller + executor ship |

---

## Dependencies

```
M01 ──┬──► M04 (graph edges constrain narrative)
      │
M02 ──► M03 ──► M04 ──► M05
      │
      └──► M01 attachment SHA nodes (can patch graph after M02)
```

- **M01 ∥ M02** start together (graph draft from known public facts; XLS download independent).  
- **M03** blocked on **M02** row tables.  
- **M04** blocked on **M03** verdicts (+ M01 for edge language).  
- **M05** blocked on **M04**.  
- **none** blocked on implementing FW fixes or refiling form — plan-only scope for Phase 0 dispatch; executors implement artifacts only.

---

## M01 detail — required nodes & edges (n−1)

| Node | Type | Primary source |
|------|------|----------------|
| N1 `Johannes-ece` | identity | `gh api users/Johannes-ece` |
| N2 LB row score **19** | staff grade | `comma.ai/leaderboard` harness_tester_challenge |
| N3 issue `#3` | issue | `commaai/harness_tester_challenge/issues/3` |
| N4 author `yc945` | identity | issue author field |
| N5 XLS-22 | artifact | attachment `Harness.Tester.Challenge.xls` |
| N6 XLS-30 | artifact | attachment `30.Harness.Tester.Challenge.xls` |
| N7 comment “9 aren’t bugs” | peer review | Johannes-ece comment `2026-06-06T12:18:56Z` |
| N8 form (opaque) | private grade path | README forms.gle — **no payload** |
| N9 daulet ledger | public model | `daulet/harness_tester_challenge` |
| N10 local ironclad/REJECT | our ground | `distill/*` |

**Edges (must state direction + meaning):**
- N1 —authored→ N7 —reviews→ N5 (not N8 contents)
- N4 —authored→ N3, N5, N6
- N1 —scored_via→ N8 —appears_as→ N2 (**inferred**, high)
- N5 —inflated_to→ N6 (yc945 claim growth; not Johannes)
- N7 —does_not_enumerate→ kills (dead end — **honest graph depth**)
- N9/N10 —proxy_filter_for→ reconstructed kills (labeled reconstruction)

**Shit on:** any edge `N1 —authored→ N5`. **Kill it.**

---

## M02–M03 detail — autopsy columns (executor schema)

Per row minimum:

```text
row_id | pack(22|30) | severity_claimed | claim_one_liner | fw_path:line | sch/pcb_ref | ds_or_daulet | verdict | conf | notes
```

**Default KILL seeds (from prior — re-verify text match, do not rubber-stamp):**  
BUG-F05 XRES “permanent reset”; BUG-F17 family `0x2`; BUG-F13/F21 drive-mode clear; BUG-H04 missing SDA/SCL pull-ups; BUG-H05 A0 unconfirmed; BUG-F14 INPUT vs PULLUP; BUG-H02 L7805 thermal show-stop; V_BCKP/VDD_USB class; settle/debounce/checksum splits; D1/D2 refdes hygiene; “68-pin only” if present in 30.

**Default KEEP seeds (show-stopper core — still re-check):**  
`cy.begin` never; NMEA 64B/OOB; `1<<i` 32-bit; DIR all-out/all-in; pass OR; FAILED wipe; GPS UART same-dir; R3 SDA pull-down; RGB no series R; D3 anode island; button polarity; MAX2679 VCC_RF; `$GPRMC` only; Port2 nibble map; LED pinMode; R/B die swap; Schottky-as-Zener; TQFP pitch/body.

---

## M04 detail — 9-kill selection rule (deterministic enough)

Score each KILL row:

`S = 3*ds_false + 2*daulet_reject + 2*local_B_reject + 1*hygiene_only − 2*if_split_of_true_root`

Take **top 9 by S** on the **22-pack**. If ties, prefer rows Johannes-style EE would trash (polarity/ID myths > thermal speculation > pure nits).

**Output tables:**
1. Top 9 with S and one-line kill reason  
2. Runners-up 10–14  
3. **Anti-table:** claims we refuse (Johannes authored XLS; exact form list; “all 30 are bugs”; conflating LB 19 with row count of any public file)

---

## M05 ship criteria

- **APPROVED** only if: graph has dead-end honesty on the 9; autopsy ≥22 rows; kill map has reconstruction banner; secrets `rg` clean; no claim that private form was recovered.
- Ship path (if green):  
  `~/.xbgst/scripts/milestone-ship.sh --label "johannes-yc945-xlrd" --src "$HOME/.xbgst/harness-tester-review-20260808/distill" --msg "Ship Johannes×yc945 XLS ruthless distill and autopsy pointers."`  
  Prefer also mirroring `xlrd-autopsy/*.md` + `graph/*.md` under bounty distill tree (sanitized, no secrets).
- **BLOCKED** if XLS unparseable or <22 rows recovered without judge waiver.

---

## Ruthless claim kills (pre-register — distill must keep)

| Bad claim | Verdict | Why |
|-----------|---------|-----|
| “Johannes’s bug list is the XLS on #3” | **KILLED** | Author = yc945; he said 9 aren’t bugs |
| “We know his 19 form rows” | **KILLED** | Non-public; reconstruction ≠ disclosure |
| “Comment proves he found 13 of 22” | **WEAK / overclaim** | 9 non-bugs ⇒ at most 13 survivors of **that list**, not proof of his form set |
| “30 XLS is stronger than 22” | **USUALLY FALSE** | Inflation often adds hygiene/splits; staff reward unique roots |
| “Family ID 0x06 is wrong / must be 0x2” | **KILLED** | CY8C9560 family nibble 6 correct (daulet/local REJECT) |
| “XRES active-low permanent reset” | **KILLED** | Active-**HIGH** XRES; HIGH then LOW releases |
| “Must clear drive mode before STRONG” | **KILLED** | DS last-write-wins |
| “No I2C pull-ups” | **KILLED as stated** | R2 pull-up exists; real bug is **R3 SDA pull-down** |
| “Filing 48 Criticals doubles score” | **KILLED** | Johannes/daulet-style mass reject; unique-root ceiling |

---

## Explicit non-goals (scope lock)

- Do not implement firmware/PCB fixes.  
- Do not re-open form submission in this plan.  
- Do not spawn `general-purpose` / `explore`.  
- Do not use Honcho as memory substrate.  
- Do not author `.txt` — all artifacts `.md`/`.csv`/`.json`.  
- Do not print secrets; use the-janitor for any op:// material (none expected here).

---

## Executor assignment summary

| Who | Owns |
|-----|------|
| **scout** | M01 live re-verify GH/LB; fill graph edges |
| **executor** | M02 XLS download + parse (Rust if writing tooling) |
| **labrat** | M03 FW/sch row evidence |
| **critic** | M03/M04 verdicts + shitlist |
| **distiller** | M05 ruthless distill + pointer from JOHANNES_DISCLOSURE |
| **the-judge** | Escalations on missing XLS, invention pressure, kill-map clash |

---

## Status

`Status: ready for dispatch` · `[planner-gate: advisory, risks-open: XLS-on-disk, exact-9-unknowable]`  

**Prior locked:** JOHANNES_DISCLOSURE — no public list; **XLS is yc945**. This plan deepens **xlrd** and **graph_depth**; it does **not** reopen private form recovery as a success criterion.

---

*gx-planner-phase0 · axes: source_truth, graph_depth, claim_kill_rate, non-invention, actionability · evidence: none — planning artifact*
