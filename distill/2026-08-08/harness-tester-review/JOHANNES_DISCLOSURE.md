# Johannes-ece (Johannes von Grundherr) — “bugs disclosure” analysis

**Date:** 2026-08-08  
**Role:** gx-planner-phase0  
**Axes:** source_truth · completeness · non-invention · actionability  
**Subject:** `johannes-ece` / Johannes von Grundherr · comma harness_tester_challenge  

---

## 1. What is actually known vs inferred

### Known (directly verified this session)

| Fact | Evidence |
|------|----------|
| GH login **`Johannes-ece`**, display name **Johannes von Grundherr** | `gh api users/Johannes-ece` → name, bio EE student, blog `https://johannes-ece.github.io/` |
| Leaderboard score **19** under display **`johannes-ece`** | Live `https://comma.ai/leaderboard` table `harness_tester_challenge`: row `19` → link `https://github.com/johannes-ece` |
| **Only** substantive public statement on the challenge is the issue comment: *“By my count 9 of those aren't actual bugs fwiw”* | `commaai/harness_tester_challenge` issue **#3** comment, user `Johannes-ece`, `2026-06-06T12:18:56Z` (API) |
| Comment targets **yc945’s** thread (“22 Defects” XLS; later “30” XLS attachment) | Issue #3 author `yc945`; comment is bare one-liner (no enumerated rejects, no attachment) |
| **No** public graded bug list from Johannes in official repo issues/PRs | `gh` issues list on challenge repo: only open issue #3 (yc945); no Johannes-authored issue |
| **No** harness bug package in his public GitHub surface | Public repos (16): Nixie/AirQA/kicad-auto-via/etc.; **zero** `harness_tester*` / challenge forks found via `gh search repos --owner Johannes-ece` |
| Personal site has **no** harness-tester write-up | `johannes-ece.github.io` posts: Nixie, Air quality, butchers menu — not challenge |
| Official grade path is **Google Form**, not GitHub | Challenge README: “send them over… for verification” via forms.gle; “handful of intentional, show-stopping bugs” |
| Peer / top scorers often **form-only** (no public list) | Local scout: AnasMalas, LK, leosteinberg, **johannes-ece** — no public graded lists |
| yc945 **did** publish lists (22 then 30) as issue attachments | Files: `Harness.Tester.Challenge.xls`, `30.Harness.Tester.Challenge.xls` |
| Best public accept/reject model is **daulet** (LB **20**), not Johannes | `github.com/daulet/harness_tester_challenge` `FINAL_FINDINGS_24_SUBMISSION.md` + `FINAL_COUNCIL_LEDGER.md` |
| Local IRONCLAD unique-root band after reject hygiene | `distill/IRONCLAD_LEDGER.md` ≈ **22–26** roots before merge; staff ceiling public ≈ **24** |

### Inferred (not proven)

| Inference | Strength | Why |
|-----------|----------|-----|
| Johannes’s **staff score 19** came from a **private form** submission (possibly with email/attachments) | **High** | README form path + LB entry + no public list; same pattern as other top private scorers |
| The issue comment is **peer review of yc945**, not his own graded list | **Certain as reading** | One sentence on #3; no IDs; no XLS |
| His mental filter rejects ~**40%** of a mixed Critical/Moderate 22-pack as non-bugs | **Medium–high** | 9/22 stated; matches false-plant classes (XRES, drive-mode clear, missing pull-ups claim, family ID myths, thermal, etc.) seen in yc945 XLS |
| His accepted plant set sits in the **universal show-stopper core** (~18–22) shared with daulet / ironclad | **Medium** | LB 19 is one below daulet 20 and inside README “handful × 3” band; no evidence of exotic private-only plants required |
| Exact ordered list of his 19 form rows | **Unknown** | **Not public**; any list below is reconstruction only |

### Explicit non-claims

- We do **not** have Johannes’s form payload, confirmation email, or staff grade sheet.  
- We do **not** know which 9 of yc945’s 22 he counted as non-bugs (he did not name them).  
- We do **not** treat reconstructed plants as “his disclosure.”

---

## 2. Competing hypotheses — what “his disclosure” is

| ID | Hypothesis | One-line |
|----|------------|----------|
| **H1** | Public comment only | The only public “disclosure” is the 9/22 comment; no bug inventory was ever published. |
| **H2** | Form-only private submission | Graded list of ~19 plants went only through Google Form; public surface is LB + optional peer comment. |
| **H3** | User confuses him with **yc945** XLS | Someone treats the 22→30 XLS on issue #3 as “Johannes’s list” because he commented there. |
| **H4** | List exists at non-obvious URL | Full list lives on gist, fork, Discord, LinkedIn, blog draft, or private repo not found in standard GH search. |

**Joint prior (this analysis):** **H1 ∧ H2** is the best joint model for *public* vs *graded* surfaces. **H3** explains many *third-party* references to “a list.” **H4** remains open but **unsupported** after bounded search.

---

## 3. Evidence for / against each hypothesis

### H1 — Public comment only (no list)

| For | Against |
|-----|---------|
| Issue #3 body is **one sentence**, no attachment, no enumeration | LB **19** requires staff accepted *something* beyond a comment |
| No Johannes issue/PR/repo package found | Comment alone cannot produce LB score |
| Site/repos silent on challenge | |

**Verdict:** **True for public inventory.** False if “disclosure” is redefined as “anything staff graded.”  
**Status:** **Supported as public-surface claim.**

### H2 — Form-only private submission (19 graded)

| For | Against |
|-----|---------|
| Official README: form is the verification path | Form contents never published by comma or Johannes |
| LB row `johannes-ece` = **19** | Could theoretically be manual staff entry from other channel (still private) |
| Same privacy pattern as other high scorers without public packs | Cannot audit row-level accepts |
| Comment date (2026-06-06) shows he was active on the challenge while yc945 list was public | |

**Verdict:** **Most likely account of the graded “19 bugs.”**  
**Status:** **Strong default for score provenance.**

### H3 — Confusion with yc945 XLS (22/30)

| For | Against |
|-----|---------|
| Only thread where Johannes appears is **yc945 #3** | Author of XLS is **`yc945`**, not Johannes-ece |
| yc945 later wrote “I Found **30** Defects” quoting Johannes’s mail notification | Johannes **disagrees** with ~9/22 of that list |
| Casual readers may collapse “commenter + list in same issue” | Different GH identities; different LB handling (yc945 not on same 19-row as Johannes in current scrape of top band) |

**Verdict:** **Plausible misattribution of the XLS.** Do not cite yc945 rows as Johannes’s accepts.  
**Status:** **Likely confusion mode for external claims; not Johannes’s list.**

### H4 — List at non-obvious URL

| For | Against |
|-----|---------|
| Always possible (private gist, Discord, email only) | GH user search / repo list / blog / issue search: **no hit** |
| ECE student + kicad-auto-via repo shows HW interest (could host privately) | No harness-named public artifact |
| | Code search under owner returned empty for harness terms (where API allowed) |

**Verdict:** **Not evidenced.** Treat as residual risk, not working assumption.  
**Status:** **Open / unsupported.** Reopen only if a concrete URL or dump appears.

---

## 4. If H1/H2: reconstruct **most likely** 19 accepted plants

> **Hard disclaimer (required):**  
> **Reconstructed ≠ his actual form list.**  
> This is an **intersection prior** for actionability (what a Johannes-style filter + LB≈19 would keep), not a recovery of private data.

### 4.1 Method (intersection filter)

1. Start from **universal / high-consensus show-stoppers** (daulet `ACCEPT` critical core, local IRONCLAD, patterns every serious public list hits).  
2. Prefer plants with **netlist / line-of-code / package** proof (README “show-stopping”).  
3. **Apply Johannes-style cut** (9/22 on yc945): drop datasheet-false and hygiene Criticals of the class present in yc945 XLS and local REJECT ledger.  
4. Cap at **19** unique roots (match LB). Prefer **one root per failure mode** (e.g. merge NMEA overflow + OOB NUL; optionally keep DIR all-out and all-in as one or two depending on staff).

### 4.2 Plants almost certainly **out** of a Johannes-grade list  
(yc945-style false Criticals / known rejects — the “9 of those aren’t bugs” neighborhood)

| Class | Example claims (yc945 / inflated packs) | Why cut |
|-------|----------------------------------------|---------|
| **XRES / RST polarity inverted** | yc945 BUG-F05 “permanent reset” | CY8C9560 XRES is **active-HIGH**; HIGH then LOW = release (daulet #45; local B02 REJECT) |
| **Family / `read_id()==0x06` wrong** | yc945 BUG-F17 claims family `0x2` for all parts | Family nibble **6** is correct for 60-I/O part (daulet #46; B13 REJECT) |
| **Drive-mode must clear before STRONG** | yc945 BUG-F13 / F21 | DS last-write-wins (daulet #49; B25 REJECT) |
| **SDA/SCL pull-ups absent** | yc945 BUG-H04 | R2 is real pull-up; **R3 is pull-down on SDA** (different bug) |
| **A0 unconfirmed / address nit without CBL map** | yc945 BUG-H05 | Weak vs true A1/A2 on harness nets |
| **INPUT vs INPUT_PULLUP alone** | yc945 BUG-F14 | Nit once external R4 exists |
| **VDD_USB→GND is a bug** | common false plant | u-blox: tie to GND when USB unused (daulet #44; B05 REJECT) |
| **L7805 thermal as hard show-stop** | yc945 BUG-H02 | Unproven θJA / load (daulet #32) |
| **V_BCKP→3V3 invalid** | yc945 BUG-H13 style | Allowed by HIM (daulet #43) |
| **Settle delay / debounce / checksum-only splits** | yc945 F12/F23/F25… | Hygiene / merge / warning tier |
| **“68-pin only / cannot mount TQFP-100”** | other packs | Part ships TQFP-100; score **pitch/body** instead |
| **Q1 S/D “blocks all power” absolute** | common | Council reject as classic RPP (daulet #36) |

### 4.3 Most likely **19** (reconstructed acceptance set)

Numbering is **ours**, not his. Anchors: daulet 24-submission criticals + local IRONCLAD IDs.

| # | Plant (unique root) | Consensus anchors | Notes for Johannes-style |
|--:|---------------------|-------------------|--------------------------|
| 1 | **`cy.begin()` never called** | universal; daulet #1; IRONCLAD I01 | Core |
| 2 | **NMEA 64B unbounded + OOB `buf[len]=0`** | daulet #2; I02 | Count as **one** root (yc945 split F09/F10) |
| 3 | **`1 << i` / `1 << j` 32-bit for pins→39** | daulet #3; I03 | Core |
| 4 | **`set_output` DIR=0x00 all ports** | daulet #4; I04 | Often paired with #5 |
| 5 | **`set_pd_inputs` DIR=0xFF all ports** | daulet #5; I04 | May **staff-merge** with #4 → free a slot |
| 6 | **Pass is OR of rows, not AND** | daulet #6; I05 | Core |
| 7 | **FAILED wiped by GOOD next loop** | daulet #7; I06 | Core |
| 8 | **GPS UART same-direction (TX–TX / RX–RX)** | daulet #8; I07 | Core |
| 9 | **R3 = SDA pull-down to GND** | daulet #9; I08 | Core (not “missing pull-ups”) |
| 10 | **RGB channels lack series resistors** | daulet #10; I09 | Core |
| 11 | **D3 common anode copper island / open** | daulet #11; I10 ★ | High-skill PCB; under-listed in many packs |
| 12 | **Button polarity inverted** | daulet #12; I11 | Core |
| 13 | **MAX2679 VCC = VCC_RF over abs max** | daulet #13; I12 ★ | Often missed |
| 14 | **Only `$GPRMC`; default multi-GNSS `$GNRMC`** | daulet #14; I13 | Core |
| 15 | **Port2 nibble / linear index ≠ CBL_20+** | daulet #15; I14 | Core FW/HW map |
| 16 | **LED GPIOs never `pinMode(OUTPUT)`** | daulet #16; I15 | Core |
| 17 | **Physical R/B LED die pad swap** | daulet #18; I16 ★ | Datasheet pad table |
| 18 | **D2 Schottky on Q1 G–S (not VGS Zener)** | daulet #20; I17 ★ | Part-class plant |
| 19 | **U4 land 12×12/0.4 vs real 14×14/0.5 TQFP-100** | daulet #21; I18 ★ | Geometry plant — **not** “68-pin” |

**If staff merges #4+#5:** replace freed slot with one of:

| Alt | Plant | Anchor |
|-----|-------|--------|
| A | **EXPECTED matrix / passive-closure wrong** | daulet #17; I19 |
| B | **SAFEBOOT held LOW if pin driven** | local B43; scout |
| C | **I2C addr 0x20 vs A1/A2 on CBL_*** | local B53; I22 |
| D | **~RST/~SAFEBOOT float (no pull)** when not driven | many lists; I23 |
| E | **RF input network / LNA path cluster** | daulet #19 rewrite |

**Score fit:** 19 unique show-stopper roots ≈ **Johannes LB 19**. daulet’s public pack is 18 critical + warnings → staff **20** — one notch denser or luckier on merge boundaries.

### 4.4 What this reconstruction is for (actionability)

- **Do** use it as a **hygiene prior** for our own submission: Johannes-style cut + ironclad core.  
- **Do not** claim “Johannes found X, Y, Z” in public or form text.  
- **Do not** substitute this for daulet’s published ledger when citing a real public list.

---

## 5. Bottom line

| Question | Answer |
|----------|--------|
| Is there a public Johannes bug list? | **No** (bounded search). |
| What is public? | **(1)** LB **19** as `johannes-ece`; **(2)** issue #3 comment on **yc945** (“9 … aren't actual bugs”). |
| How did he score 19? | **Almost certainly form-only private submission (H2)**. |
| Is “his disclosure” the yc945 XLS? | **No** — that is **yc945**; he **criticized** it (H3 trap). |
| Can we recover exact form rows? | **No** without private data (**reconstructed ≠ actual**). |
| Best peer model for accepts/rejects? | **daulet** ledger + local REJECT set (XRES, VDD_USB, ID, drive-mode, …). |

### Sources (primary)

- https://comma.ai/leaderboard#harness_tester_challenge  
- https://github.com/commaai/harness_tester_challenge/issues/3  
- https://github.com/Johannes-ece · https://johannes-ece.github.io/  
- https://github.com/daulet/harness_tester_challenge (`FINAL_FINDINGS_24_SUBMISSION.md`, `FINAL_COUNCIL_LEDGER.md`)  
- yc945 attachments (issue #3): 22- and 30-row XLS (parsed via OLE UTF-16 extract)  
- Local: `hunt/scout-patterns.md`, `distill/IRONCLAD_LEDGER.md`, `distill/BUG_VERDICTS.md`

---

*gx-planner-phase0 · evidence: public API + live LB + local distill · non-invention lock on private form contents*
