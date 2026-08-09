# N-1 connection graph — Johannes + XLS (harness_tester_challenge)

**Date:** 2026-08-08  
**Role:** gx-the-revenger  
**Axes:** connectivity · source_truth · separation_of_identity  
**Depth:** n-1 (core nodes + direct neighbors only; no infinite crawl)

---

## Thesis (hard locks)

| Claim | Status |
|-------|--------|
| **Johannes → critiques XLS** | **VERIFIED** — issue #3 comment on yc945’s 22-pack |
| **XLS → yc945** | **VERIFIED** — attachments authored/posted by `yc945` |
| **Johannes ↛ owns XLS** | **VERIFIED negative** — different GH identities; he rejects ~9/22; no attachment from him |

**H3 trap:** treating the issue-#3 XLS as “Johannes’s list” because he commented there. That collapses author and critic. Do not.

---

## Core node map (n-1)

```
                    yangchaochao@gmail.com
                              │ (issue body mailto)
                              ▼
  bugs22.xls ◄──attach── issue#3 ◄──author── yc945 ──repos── (CN tooling; no harness fork)
  bugs30.xls ◄──attach──    │
                            │ comments
              ┌─────────────┼──────────────────┐
              ▼             │                  │
        Johannes-ece    (yc945 reply       (yc945 30-row
        critiques 9/22   quoting GH mail)   follow-up)
              │
              │ LB score 19 (form path; no public list)
              ▼
         leaderboard ◄── AnasMalas(24), LK(24)👑, daulet(20), …
              │
              │ challenge host
              ▼
   commaai/harness_tester_challenge ──README── forms.gle verification

  daulet ──public pack── FINAL_* (best accept/reject model)
  VeigaPunk ──public pack── gist / local 40–49 catalog
  AnasMalas / LK ──LB only── no public graded bug list found
```

---

## CORE expansions

### 1. Johannes-ece

| Field | Value |
|-------|--------|
| **Identity** | GH `Johannes-ece` · display **Johannes von Grundherr** · bio EE @TUM · blog `johannes-ece.github.io` · public email `johannes.v.grundherr@tum.de` (GH profile) |
| **LB** | **19** under `johannes-ece` → `https://github.com/johannes-ece` |

#### Edges (verified)

| Neighbor | Edge type | Evidence |
|----------|-----------|----------|
| **issue#3** | commented | `Johannes-ece` @ `2026-06-06T12:18:56Z`: *“By my count 9 of those aren't actual bugs fwiw”* |
| **bugs22.xls / yc945 list** | peer critique (not ownership) | Comment on 22-defect thread; **no** enumerated rejects; **no** attachment |
| **leaderboard** | scored entrant | Live comma LB harness table: score **19** |
| **commaai/harness_tester_challenge** | community participant | Comment on official issue; no owned issue/PR found |
| **yc945** | asymmetric reply graph | yc945 later pasted GH notification quoting “Johannes von Grundherr” when bumping to 30 |

#### Inferred

| Inference | Conf | Note |
|-----------|------|------|
| Graded **19** via **Google Form** (private), not GH | high | README form path; same pattern as other top private scorers |
| Mental filter ≈ **~40% reject** on mixed Critical/Moderate 22-pack | med–high | 9/22 stated; matches known false-plant classes (XRES, drive-mode, pull-up myths, family ID, …) |
| Accepted set overlaps universal show-stopper core (~18–22) | medium | LB 19 sits next to daulet 20; no exotic public proof |
| Exact form rows | **unknown** | not public — reconstruction ≠ disclosure |

#### Dead ends / no public artifact

- No Johannes-authored issue or PR on the challenge repo  
- No `harness_tester*` public repo / fork under owner (bounded search)  
- Blog silent on challenge  
- **Does not** attach or co-author bugs22/bugs30 XLS  
- **Does not** appear as XLS OLE “Author” string (SummaryInformation present; no yang/johannes author text recovered in stream skim)

---

### 2. yc945

| Field | Value |
|-------|--------|
| **Identity** | GH `yc945` · no display name · no public GH email · CN-language repos (hydraulic, 山洪, K-line) |
| **LB** | **not present** on live harness table scrape (`yc945` absent from leaderboard HTML) |

#### Edges (verified)

| Neighbor | Edge type | Evidence |
|----------|-----------|----------|
| **issue#3** | author | Title: “Supply Chain Engineer Application – I Found **22** Defects…”; opened `2026-06-06` |
| **bugs22.xls** | attached | `Harness.Tester.Challenge.xls` → user-attachments/files/28661979 |
| **bugs30.xls** | attached (follow-up) | `30.Harness.Tester.Challenge.xls` → files/29174371 @ `2026-06-21` |
| **yangchaochao@gmail.com** | contact in issue body | mailto in issue #3 body |
| **Johannes-ece** | received critique; quoted in reply | Email-style paste of GH notify; then 30-defect claim |
| **commaai/harness_tester_challenge** | sole open issue author | Only issue #3 open on repo at probe time |

#### Inferred

| Inference | Conf | Note |
|-----------|------|------|
| `yangchaochao@gmail.com` is yc945 contact identity | high | co-located on issue body with attachment |
| Bilingual EN + 中文 columns in XLS | certain | CSV extract: Summary + `描述(中文)` |
| Not staff-scored on public LB (or scored under other name / zero-grade / form not counted) | medium | login absent from LB; could be form never verified |
| Supply-chain job framing | certain | issue title |

#### Dead ends

- No public harness bug **repo** under yc945 (repos are hydraulic/stock tools)  
- No LB row under `yc945`  
- No link to Johannes beyond issue thread  
- OLE author property not recovered as plain “yc945” string

---

### 3. issue#3

| Field | Value |
|-------|--------|
| **URL** | https://github.com/commaai/harness_tester_challenge/issues/3 |
| **Title** | Supply Chain Engineer Application – I Found 22 Defects in Your Harness Tester |
| **State** | open · comments: 3 |
| **Created** | 2026-06-06T08:36:19Z · updated 2026-06-21 (30-XLS) |

#### Edges (verified)

| Neighbor | Edge type | Evidence |
|----------|-----------|----------|
| **yc945** | author | API `user.login=yc945` |
| **bugs22.xls** | body attachment | Harness.Tester.Challenge.xls |
| **yangchaochao@gmail.com** | body mailto | same body |
| **Johannes-ece** | commenter | 9/22 critique |
| **bugs30.xls** | later comment attachment | yc945 |
| **challenge repo** | hosts issue | only substantive public GH discussion found |

#### Thread chronology

1. **yc945** posts 22-XLS + gmail  
2. **Johannes-ece** critiques (9 non-bugs)  
3. **yc945** pastes mail notification + claims 30  
4. **yc945** attaches 30-XLS  

#### Dead ends

- No staff/comma employee reply on the issue  
- No grade / accept list published on the thread  
- GH issues are **not** the official grade path (form is)

---

### 4. bugs22.xls

| Field | Value |
|-------|--------|
| **Public name** | `Harness.Tester.Challenge.xls` |
| **Local mirror** | `/tmp/harness-xls/bugs22.xls` (= `/tmp/yc945-22.xls`) · 28160 B |
| **Rows** | 22 bugs (CSV 23 lines incl. header) |
| **Severity mix** | 8 Critical · 10 Moderate · 4 Minor |
| **Schema** | ID, Location, Severity, Summary, 描述(中文) |

#### Edges (verified)

| Neighbor | Edge type | Evidence |
|----------|-----------|----------|
| **yc945** | publisher/author | issue #3 body attachment |
| **issue#3** | attached artifact | user-attachments/28661979 |
| **Johannes-ece** | critique target | “9 of those aren't actual bugs” |
| **bugs30.xls** | predecessor / superset seed | same author, later expansion |
| **challenge firmware/sch** | claim surface | IDs like BUG-F01 `cy.begin()`, `1 << i`, DIR overwrite |

#### Inferred

| Inference | Conf | Note |
|-----------|------|------|
| Inflated / mixed-quality pack | high | Johannes 9/22; scout hygiene samples (RST polarity, drive-mode clear, missing pull-ups, family 0x2 myth, …) |
| Chinese dual column → author language signal | high | aligns with yc945 repos |

#### Dead ends

- Not Johannes’s file  
- Staff accept/reject of individual rows **not public**  
- No cryptographic/authorship proof beyond GH upload account

---

### 5. bugs30.xls

| Field | Value |
|-------|--------|
| **Public name** | `30.Harness.Tester.Challenge.xls` |
| **Local mirror** | `/tmp/harness-xls/bugs30.xls` · 39936 B |
| **Rows** | 30 bugs |
| **Severity mix** | 12 Critical · 18 Moderate |
| **Posted** | 2026-06-21 by yc945 (after critique) |

#### Edges (verified)

| Neighbor | Edge type | Evidence |
|----------|-----------|----------|
| **yc945** | publisher | comment attachment |
| **issue#3** | hosted | comment 4761620479 |
| **bugs22.xls** | evolved from | same schema; more rows; some wording refined (e.g. F02 pin range) |
| **Johannes-ece** | motivational context only | reply quotes his critique; **he did not review 30 publicly** |

#### Inferred

| Inference | Conf | Note |
|-----------|------|------|
| Response to criticism: expand count rather than publish hygiene cut | medium | 22→30 after “9 aren’t bugs”; no public reconciliation of which 9 |
| Still not LB-scored under yc945 | medium | still absent from LB |

#### Dead ends

- No Johannes comment on the 30-pack  
- No staff verdict on 30  
- Johannes ownership remains **false**

---

### 6. commaai/harness_tester_challenge

| Field | Value |
|-------|--------|
| **URL** | https://github.com/commaai/harness_tester_challenge |
| **Role** | Official challenge host (firmware + KiCad + README) |

#### Edges (verified)

| Neighbor | Edge type | Evidence |
|----------|-----------|----------|
| **leaderboard** | scoreboard link | README + comma.ai/leaderboard#harness_tester_challenge |
| **forms.gle** | verification path | README: send bugs via form for verification |
| **issue#3** | only open issue (probe) | yc945 thread |
| **daulet, VeigaPunk, …** | forks / external packs | peer public models |
| **Johannes-ece, AnasMalas, LK** | LB + optional GH surface | LB links to GH profiles |

#### Inferred

- Intentional “handful of show-stopping bugs” per part; grade ≠ improvements/fixes  
- Public GH is **discussion**, not grade SSoT  

#### Dead ends

- Staff plant key not published  
- No official accept list  

---

### 7. leaderboard (harness_tester_challenge)

| Field | Value |
|-------|--------|
| **URL** | https://comma.ai/leaderboard#harness_tester_challenge |
| **Prize line** | “first >21” **CLAIMED by LK** 👑 |

#### Edges (verified) — n-1 neighbors of interest

| Neighbor | Score | Notes |
|----------|------:|-------|
| **AnasMalas** | 24 | top band; GH only |
| **LK** | 24 | 👑 prize claimer |
| **daulet** | 20 | best **public** accept/reject pack |
| **Johannes-ece** | 19 | form-likely; public critique only |
| **yc945** | — | **absent** |
| **VeigaPunk** | — | not in top scrape band (≥15 shown); local package exists outside LB row (or below cut) |

#### Dead ends

- LB shows score + GH handle only — **no** bug IDs  
- Cannot reverse form payloads from scores  

---

### 8. yangchaochao@gmail.com

#### Edges (verified)

| Neighbor | Edge type | Evidence |
|----------|-----------|----------|
| **issue#3** | body mailto | sole public occurrence in this graph |
| **yc945** | likely same person | co-located with issue author + XLS |

#### Inferred

- Contact for “Supply Chain Engineer Application” framing  
- Not linked to Johannes / TUM email  

#### Dead ends

- No other public harness artifacts under this address in bounded search  
- Do not harvest / spam; treat as identity edge only  

---

### 9. daulet

| Field | Value |
|-------|--------|
| **GH** | `daulet` · Daulet Zhanguzin · @nvidia  
| **LB** | **20** |
| **Public pack** | https://github.com/daulet/harness_tester_challenge (`FINAL_FINDINGS_24_SUBMISSION.md`, `FINAL_COUNCIL_LEDGER.md`) |

#### Edges (verified)

| Neighbor | Edge type | Evidence |
|----------|-----------|----------|
| **leaderboard** | score 20 | live LB |
| **challenge repo** | fork / solution package | public findings + council ledger |
| **Johannes-ece** | **peer band only** | both LB; **no** direct GH interaction found |
| **XLS / yc945** | **no direct edge** | independent public model; used as hygiene prior against XLS false plants |

#### Inferred

- Best **source_truth** public accept/reject taxonomy for reimplementation of staff-like filter  
- Overlap with Johannes-style cut is methodological (shared rejects), not a social link  

#### Dead ends

- Not author of XLS  
- Not a commenter on issue #3  

---

### 10. VeigaPunk

| Field | Value |
|-------|--------|
| **GH** | `VeigaPunk` · João Pedro Veiga  
| **Local distill** | `~/.xbgst/harness-tester-review-20260808/` (BUGS.md, xlsx/csv, form confirmation artifacts) |
| **Public catalog** | gist + `VeigaPunk/harness-tester-bugs-veigapunk` (per local docs) |

#### Edges (verified)

| Neighbor | Edge type | Evidence |
|----------|-----------|----------|
| **challenge** | competitor package | public bugs inventory (40+ claimed) |
| **Johannes / XLS** | **no ownership edge** | separate identity; local work uses XLS only as peer pattern input |
| **leaderboard** | not in ≥15 scrape band | may be unscored / lower / form pending |

#### Dead ends

- No edge to Johannes-ece or yc945 beyond shared challenge topic  
- Local form artifacts are **VeigaPunk** track, not Johannes  

---

### 11. AnasMalas / LK (LB only)

| Node | LB | GH | Public graded list |
|------|---:|----|--------------------|
| **AnasMalas** | 24 | https://github.com/AnasMalas | **none found** (form-only pattern) |
| **LK** | 24 👑 | https://github.com/LK · Lenny Khazan | **none found**; prize “first >21” claimed |

#### Edges (verified)

| Neighbor | Edge type | Evidence |
|----------|-----------|----------|
| **leaderboard** | top scores | live table |
| **challenge** | competitors | implied by LB + prize line |
| **Johannes / XLS / yc945** | **no direct edge** | different people; no issue #3 comments |

#### Dead ends

- Private form payloads  
- Cannot use them as plant lists  
- n-1 stops here (no public artifact to expand)

---

## Edge ledger (compact)

| From | Rel | To | Verified? |
|------|-----|-----|-----------|
| yc945 | authors | issue#3 | yes |
| issue#3 | attaches | bugs22.xls | yes |
| issue#3 | lists | yangchaochao@gmail.com | yes |
| Johannes-ece | critiques | bugs22.xls (via #3) | yes |
| yc945 | attaches | bugs30.xls | yes |
| yc945 | quotes-mail-of | Johannes-ece | yes (notify paste) |
| Johannes-ece | scored-on | leaderboard (19) | yes |
| daulet | scored-on | leaderboard (20) | yes |
| AnasMalas | scored-on | leaderboard (24) | yes |
| LK | scored-on + prize | leaderboard (24) | yes |
| leaderboard | hosts | challenge scores | yes |
| challenge | verifies-via | Google Form | yes |
| **Johannes-ece** | **owns** | **bugs22/30.xls** | **NO** |
| **Johannes-ece** | **authors** | **issue#3** | **NO** |
| yc945 | scored-on | leaderboard | **NO (absent)** |
| Johannes-ece | interacts | daulet / AnasMalas / LK | **NO public** |
| VeigaPunk | co-authors | XLS | **NO** |

---

## Separation of identity (axis scorecard)

| Identity | Public list | LB | Relation to XLS |
|----------|-------------|-----|-----------------|
| **Johannes-ece** | none (comment only) | **19** | **Critic** of 22-pack |
| **yc945** | **22 + 30 XLS** | none found | **Owner/publisher** of XLS |
| **yangchaochao@gmail.com** | via issue | — | Contact on same issue as XLS |
| **daulet** | council ledger | **20** | Independent public model |
| **VeigaPunk** | own xlsx/gist | not in top scrape | Independent |
| **AnasMalas / LK** | private | **24** | LB-only |

**Anti-confusion rules for distill / submissions:**

1. Never cite bugs22/30 rows as “Johannes found …”  
2. Cite Johannes only for: LB 19, 9/22 critique, identity metadata  
3. Cite XLS only as **yc945** artifacts  
4. For accept/reject ground truth models, prefer **daulet ledger** + local IRONCLAD/REJECT, not XLS raw  

---

## Source truth ranking (for this graph)

| Rank | Source | Use for |
|-----:|--------|---------|
| 1 | GH API issue #3 + comments | social/ownership edges |
| 2 | Live comma leaderboard HTML | scores / handles |
| 3 | Local XLS/CSV mirrors | content of lists |
| 4 | Challenge README | form grade path |
| 5 | GH user profiles | identity fields |
| 6 | daulet FINAL_* | accept/reject taxonomy (peer) |
| 7 | Local JOHANNES_DISCLOSURE / scout-patterns | synthesis (secondary) |

---

## Findings

```
FINDING: Johannes-ece publicly rejects ~9/22 of yc945’s XLS; does not publish his own list
SOURCE: commaai/harness_tester_challenge#3 comment 4638535119
CONFIDENCE: high
IMPLICATION: XLS ≠ Johannes disclosure; use as negative-example hygiene only

FINDING: bugs22.xls and bugs30.xls are yc945 attachments; contact yangchaochao@gmail.com on issue body
SOURCE: issue #3 body + comments; local /tmp/harness-xls
CONFIDENCE: high
IMPLICATION: ownership edge XLS → yc945 only

FINDING: Johannes LB 19 with no public graded inventory
SOURCE: comma.ai/leaderboard harness table; GH search empty for harness package
CONFIDENCE: high
IMPLICATION: form-only score; reconstruct plants only as prior, never as his list

FINDING: yc945 absent from live harness leaderboard despite 22→30 public claims
SOURCE: leaderboard HTML scrape 2026-08-08
CONFIDENCE: high
IMPLICATION: public GH volume ≠ staff score; form/staff filter diverges from raw XLS

FINDING: Best public accept/reject peer model is daulet (LB 20), not Johannes or yc945
SOURCE: github.com/daulet/harness_tester_challenge FINAL_*
CONFIDENCE: high
IMPLICATION: separate identity; methodological neighbor only

FINDING: AnasMalas and LK are LB-only cores (24); no public artifact to expand at n-1
SOURCE: leaderboard; scout-patterns
CONFIDENCE: high
IMPLICATION: dead-end for plant recovery; prize path is private form
```

---

## Explicit non-edges (do not invent)

- Johannes ↔ owns / co-authors XLS  
- Johannes ↔ yangchaochao@gmail.com  
- Johannes ↔ daulet / VeigaPunk / AnasMalas / LK (beyond co-presence on LB)  
- yc945 ↔ LB score under that handle  
- Staff accept list for any private form  
- Which exact 9 of 22 Johannes rejected  

---

*gx-the-revenger · n-1 · axes: connectivity · source_truth · separation_of_identity · 2026-08-08*
