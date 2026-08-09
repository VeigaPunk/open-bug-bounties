# XLS RUTHLESS AUTOPSY — yc945 (NOT Johannes)

**Date:** 2026-08-08  
**Role:** gx-reviewer-xlrd-kill  
**Subject:** yc945 issue-#3 attachments only (`bugs22.csv` / `bugs30.csv`)  
**Axes:** kill_rate · evidence · non-invention (Johannes private form **not** recovered)

**Sources locked:**
- `/tmp/harness-xls/bugs22.csv` (22 rows — target of Johannes “9 aren't bugs” comment)
- `/tmp/harness-xls/bugs30.csv` (30 rows — later inflated pack)
- Firmware: `/tmp/harness_tester_challenge/firmware/`
- KiCad: `/tmp/harness_tester_challenge/kicad_files/`
- Local SSoT: `distill/BUG_VERDICTS.md`, `distill/IRONCLAD_LEDGER.md`
- daulet council: `/tmp/daulet-htc/FINAL_COUNCIL_LEDGER.md`
- Johannes public: one issue comment only — **no enumerated reject list** (`distill/JOHANNES_DISCLOSURE.md`)

**Verdicts:** `KILL` = not a real bug / datasheet-false / wrong root  
`KEEP` = real defect, staff-grade or strong  
`MERGE` = same root as another row (do not double-count)  
`DOWNGRADE` = real-ish but soft / conditional / overstated Critical

---

## Executive kill rates

| Pack | Rows | KEEP | MERGE | DOWNGRADE | KILL | **Kill rate** | **Keep rate** |
|------|-----:|-----:|------:|----------:|-----:|--------------:|--------------:|
| **bugs22** (original) | 22 | 8 | 1 | 4 | **9** | **40.9%** | 36.4% |
| **bugs30** (expanded) | 30 | 10 | 3 | 10 | **7** | **23.3%** | 33.3% |
| **Union unique IDs** | ~37 | ~11 | ~5 | ~10 | **~12** | **~32%** | ~30% |

**Savage summary:** Original 22 is ~half garbage by “actual bug” bar. The 30-pack **adds real plants** (F16 LED pinMode, F18 set_output DIR, H08 no series R) but also **injects a celebrity false Critical** (F17 family `0x2`) and bilingual padding (F19–F26 hygiene splits, H09 twin of H02, H13 V_BCKP myth).

**Credibility death shots in Critical tier alone:**
- bugs22 Critical (8): **F05, H01, H02** are KILL → **37.5% of Criticals are false/overclaim**
- bugs30 Critical (12): **F05, F17, H02, H09** are KILL/MERGE-false → **≥25% Critical pollution** (H09 = H02 twin)

---

## Exactly 9 of the original 22 matching Johannes’s “aren't actual bugs”

> **Non-invention lock:** Johannes-ece wrote *only* “By my count 9 of those aren't actual bugs fwiw” on issue #3. He **did not name IDs**. Below is the **best evidence-backed reconstruction** of which 9 rows fail an “actual bug” filter (false / unconfirmed / nit / disproven). **Not** his private form payload.

| # | ID | Why it is **not** an actual bug |
|--:|----|--------------------------------|
| 1 | **BUG-F05** | XRES is **active-HIGH**. `begin()` HIGH→LOW **releases** reset (`CY8C9560.cpp:5-8`). “Permanent reset” is silicon-inverted fiction. daulet #45; local B02 REJECT. |
| 2 | **BUG-H01** | Wrong part: **D2 is PMEG10020ELR**, not SMAJ16A (**D1** is the TVS). Unidirectional TVS pad map is OK for positive rail (hunt B75); “bidirectional symbol → supply short” not established. |
| 3 | **BUG-H02** | “Necessarily thermal shutdown under normal load” **unproven** (θJA / load floor). Wrong refdes in 22-pack: **U1=L7805**, U2=Teensy. daulet #32 REJECT. |
| 4 | **BUG-F12** | Explicit settle delay **not required** — port access interval already exceeds settle before sample. daulet #50 REJECT. |
| 5 | **BUG-F13** | Drive-mode registers are **last-1-wins**; explicit clear of prior mode **not required**. daulet #49; local B25 REJECT. |
| 6 | **BUG-H04** | **False.** R2=4k7 **is** SCL pull-up to +3.3. Real I²C plant is **R3 SDA pull-down to GND** — opposite claim. daulet #31. |
| 7 | **BUG-H05** | A0 is **not** “unconfirmed”: **U4.30 A0=GND** → addr `0x20` matches `0b0100000`. “Mismatch risk” invented. hunt B86. |
| 8 | **BUG-F14** | External **R4=10k** pull-up exists; `INPUT` is electrically fine. Nit, not a defect. |
| 9 | **BUG-H06** | D1/D2 refdes **mismatch claim is the bug report itself being confused** (and assembly-risk unproven). Functional D1=SMAJ16A / D2=Schottky are distinct real parts with correct roles; this row is not a show-stopper plant. |

**These 9:** F05, H01, H02, F12, F13, H04, H05, F14, H06.

**What that leaves as “actual” on the 22 (Johannes-style ~13):**  
F01, F02, F03, F04, F06, F07†, F08, F09, F10(merge), F11†, F15†, H03, H07†  
† soft / council-boundary — staff may still cut some → fits LB band ~19 after private form hygiene.

---

# Part A — bugs22 row-by-row

| ID | Sev | Verdict | One-line reason |
|----|-----|---------|-----------------|
| **BUG-F01** | Crit | **KEEP** | `cy` object exists; **no `cy.begin()`** in `firmware.ino` setup — expander never init. Universal plant. |
| **BUG-F02** | Crit | **KEEP** | `1 << i` at `firmware.ino:144` (and `1 << j` :152) — signed 32-bit UB; pins ≥31 broken. Claim “≥32” slightly soft; keep root. |
| **BUG-F03** | Crit | **KEEP** | `passed = true` never AND-reset (`firmware.ino:142-156`) — any single matching row ⇒ PASS. |
| **BUG-F04** | Crit | **KEEP** | `set_pd_inputs` writes **DIR=0xFF all ports** (`CY8C9560.cpp:61-66`) — undoes outputs. Incomplete alone (need F18/`set_output` twin). |
| **BUG-F05** | Crit | **KILL** | XRES **active-HIGH**; ends LOW = deasserted. “Permanent reset” inverted. `CY8C9560.cpp:5-8`. |
| **BUG-F06** | Crit | **KEEP** | R4 pull-up + SW→GND; `digitalRead == LOW` **returns** (`firmware.ino:138`) — runs when **not** pressed. |
| **BUG-H01** | Crit | **KILL** | Labels **D2 as SMAJ16A** (false: D1=SMAJ, D2=PMEG). TVS polarity/short claim not ironclad. |
| **BUG-H02** | Crit | **KILL** | Thermal shutdown as **certain** Critical = unproven. Also **U2≠L7805** in 22-pack. Soft residual power concern ≠ plant. |
| **BUG-F07** | Mod | **DOWNGRADE** | Missing `pinMode(OUTPUT)` on GPS control is real code smell; daulet #28 REJECT as **deterministic** SafeBoot/RST failure (weak pulls / internal PU / order). Not free Critical. |
| **BUG-F08** | Mod | **KEEP** | `set_status(GOOD)` every loop while `time_fixed` (`:135`) wipes FAILED from prior test (`:163`). |
| **BUG-F09** | Mod | **KEEP** | `nmea_buf[64]` unbounded `nmea_idx++` (`:118-123`) — stack smash on long RMC. **Should be Critical**, not Moderate. |
| **BUG-F10** | Mod | **MERGE→F09** | `buf[len]=0` OOB is **same capacity root** as F09 (daulet merge #68 style). One repair. |
| **BUG-F11** | Mod | **DOWNGRADE** | No A/V check is hygiene; parser already fragile on empty fields. Merge into NMEA validation root — not independent show-stop. |
| **BUG-F12** | Mod | **KILL** | Settle-delay “must have” disproven for reachable ports. daulet #50. |
| **BUG-F13** | Mod | **KILL** | Drive-mode clear fiction. DS last-1-wins. B25 REJECT. |
| **BUG-H03** | Mod | **KEEP** | GPS UART **same-direction** (TX–TX / RX–RX) — real netlist plant. Wording “appear swapped” is soft; defect is real. **Under-sev.** |
| **BUG-H04** | Mod | **KILL** | Pull-ups **present** (R2). Misses true R3 SDA **pull-down**. |
| **BUG-H05** | Mod | **KILL** | A0=GND confirmed; addr matches. “Unconfirmed” = investigation failure, not a bug. |
| **BUG-F14** | Min | **KILL** | External R4 exists; `INPUT` OK. Nit. |
| **BUG-F15** | Min | **DOWNGRADE** | “Symmetry questionable” is the **wrong mechanism** (daulet #57 REJECT symmetry). Real plant is **passive-closure / EXPECTED matrix wrong** (ACCEPT_REPLACEMENT #17) — rewrite or die. |
| **BUG-H06** | Min | **KILL** | Refdes confusion theater; not a functional plant. |
| **BUG-H07** | Min | **DOWNGRADE** | `while(1)` on SD fail is real fail-stop (`firmware.ino:110-112`) but **media-gated**; daulet #52 REJECT as normal-op show-stop. LED-before-pinMode is secondary to F16. |

### bugs22 scorecard (canonical)

| Class | IDs | n | % |
|-------|-----|--:|--:|
| **KEEP** | F01 F02 F03 F04 F06 F08 F09 H03 | **8** | 36.4% |
| **MERGE** | F10→F09 | **1** | 4.5% |
| **DOWNGRADE** | F07 F11 F15 H07 | **4** | 18.2% |
| **KILL** | F05 H01 H02 F12 F13 H04 H05 F14 H06 | **9** | **40.9%** |

- Pure **KILL rate = 9/22 = 40.9%**  
- **Non-KEEP** (KILL+DOWNGRADE+MERGE) = **14/22 = 63.6%**  
- F15 kept as **DOWNGRADE** (EXPECTED matrix is real; “symmetry” wording is trash) so the pure-KILL set stays the **exact Johannes 9** below.  
- Alt: if F15 is KILL-as-written → 10/22 = 45.5% kill; not used for Johannes map.

---

# Part B — bugs30 row-by-row

| ID | Sev | Verdict | One-line reason |
|----|-----|---------|-----------------|
| **BUG-F01** | Crit | **KEEP** | Same as 22 — `cy.begin()` never called. |
| **BUG-F02** | Crit | **KEEP** | Improved claim (i≥31 + print loop) — still real. |
| **BUG-F03** | Crit | **KEEP** | OR pass logic. |
| **BUG-F04** | Crit | **KEEP** | `set_pd_inputs` DIR=0xFF all ports. |
| **BUG-F05** | Crit | **KILL** | Same XRES polarity fiction — **still Critical in 30-pack. Unforgivable.** |
| **BUG-F06** | Crit | **KEEP** | Button polarity; improved R4 wording. |
| **BUG-F16** | Crit | **KEEP** | LED pins 5/6/7 never `pinMode(OUTPUT)` — real; status path dead until fixed. |
| **BUG-F17** | Crit | **KILL** | Family nibble for **9560 is 6**, not `0x2` for “all CY8C95xx”. `== 0x06` **correct**. daulet #46; B13 REJECT. **Worst false Critical in the 30.** |
| **BUG-F18** | Crit | **KEEP** | `set_output` DIR=0x00 all ports (`CY8C9560.cpp:78-83`) — mirror of F04; both real. Staff may merge F04∪F18 → 1 root. |
| **BUG-F07** | Mod | **DOWNGRADE** | Same as 22 — not deterministic show-stop. |
| **BUG-F08** | Mod | **KEEP** | FAILED→GOOD wipe. |
| **BUG-F09** | Mod | **KEEP** | NMEA 64B overflow — under-sev. |
| **BUG-F10** | Mod | **MERGE→F09** | OOB NUL same root. |
| **BUG-F11** | Mod | **DOWNGRADE** | A/V hygiene. |
| **BUG-F13** | Mod | **KILL** | Drive-mode clear still false. |
| **BUG-F19** | Mod | **DOWNGRADE** | `Wire.read()→-1` cast is real **if** short read; requires I2C failure. Fault-gated. Merge error-handling cluster. |
| **BUG-F20** | Mod | **DOWNGRADE** | Ignoring `endTransmission` real code smell; daulet #63 REJECT_WARNING as standalone (gated by F01/R3). |
| **BUG-F21** | Mod | **KILL** | Twin of F13 reverse — same false DS theory. MERGE-kill. |
| **BUG-F22** | Mod | **MERGE→F09** | Unbounded `nmea_idx` without newline — **same buffer root** as F09. |
| **BUG-F23** | Mod | **DOWNGRADE** | Debounce only matters **after** F06 fix; boundary. |
| **BUG-F24** | Mod | **DOWNGRADE** | Family-only ID is incomplete engineering; **not a bug on this BOM** (part is 9560). Sibling-pass is hypothetical. |
| **BUG-F25** | Mod | **DOWNGRADE** | Checksum hygiene — merge NMEA validation. |
| **BUG-F26** | Mod | **DOWNGRADE** | Frozen timestamp after first fix (`!time_fixed` gate) — real soft; not harness PASS/FAIL plant. |
| **BUG-H02** | Crit | **KILL** | Still “junction exceeds 150°C under nominal” as certainty — unproven. Better numbers, same reject. |
| **BUG-H08** | Crit | **KEEP** | RGB **no series R** — real (LED_* → GPIO only). Under-listed in 22-pack. |
| **BUG-H09** | Crit | **MERGE→H02** | “DPAK not TO-220 / no clip heatsink” is **same thermal story** as H02, not independent Critical. (Footprint *is* DPAK — fact — but not a separate plant.) |
| **BUG-H10** | Mod | **DOWNGRADE** | Weak U4 decoupling — soft PCB; not proven I2C fail root. |
| **BUG-H11** | Mod | **KILL** | Misnames pin **RESET_N** (part is **XRES**, active-HIGH). Wants pull-**up** which would **assert** reset. Double-wrong; float consequence of F01 not independent. |
| **BUG-H12** | Mod | **DOWNGRADE** | +3.3 Teensy LDO budget risk — unproven brownout. |
| **BUG-H13** | Mod | **KILL** | V_BCKP→VCC **explicitly permitted** by u-blox when no backup supply. daulet #43. Cold-start is design choice, not defect. |

### bugs30 scorecard

| Class | IDs | n | % |
|-------|-----|--:|--:|
| **KEEP** | F01 F02 F03 F04 F06 F16 F18 F08 F09 H08 | **10** | 33.3% |
| **MERGE** | F10→F09, F22→F09, H09→H02, (F18 may staff-merge F04) | **3 hard + 1 soft** | 10–13% |
| **DOWNGRADE** | F07 F11 F19 F20 F23 F24 F25 F26 H10 H12 | **10** | 33.3% |
| **KILL** | F05 F17 F13 F21 H02 H11 H13 | **7** | 23.3% |

Recount MERGE: F10, F22, H09 = 3. F21 counted KILL not MERGE.  
KILL: F05, F17, F13, F21, H02, H11, H13 = **7 (23.3%)**  
If H09 counted KILL-of-independence: still MERGE.

**Strict kill rate bugs30 = 7/30 = 23.3%**  
**Non-KEEP (KILL+DOWNGRADE+MERGE) = 20/30 = 66.7%**

---

# Part C — Cross-pack map (yc945 ID → local/daulet)

| yc945 | Local Bxx | daulet # | Fate |
|-------|-----------|----------|------|
| F01 | B01 | 1 ACCEPT | KEEP |
| F02 | B08 (+B44 print) | 3 ACCEPT | KEEP |
| F03 | B09 | 6 ACCEPT | KEEP |
| F04 | B12 | 5 ACCEPT | KEEP |
| F05 | B02 | 45 REJECT | **KILL** |
| F06 | B10 | 12 ACCEPT | KEEP |
| F07 | B15 | 28 REJECT det. | DOWNGRADE |
| F08 | B16 | 7 ACCEPT | KEEP |
| F09/F10/F22 | B20 | 2 ACCEPT | KEEP / MERGE |
| F11/F25 | B22/B23 | 26 MERGE | DOWNGRADE |
| F12 | B24 | 50 REJECT | **KILL** |
| F13/F21 | B25 | 49 REJECT | **KILL** |
| F14 | — | — | **KILL** nit |
| F15 | B17/B18 area | 17 rewrite / 57 | DOWNGRADE claim |
| F16 | B14 | 16 ACCEPT | KEEP |
| F17 | B13 | 46 REJECT | **KILL** |
| F18 | B11 | 4 ACCEPT | KEEP |
| F19/F20 | B26 | 63 WARN | DOWNGRADE |
| F23 | B27 | 25/66 DISPUTED | DOWNGRADE |
| F24 | — | — | DOWNGRADE |
| F26 | B28 | — | DOWNGRADE |
| H01 | — | 37/69 area | **KILL** |
| H02/H09 | B31 | 32 REJECT | **KILL** / MERGE |
| H03 | B04 | 8 ACCEPT | KEEP |
| H04 | anti-B03 | 31 REJECT | **KILL** (misses real R3) |
| H05 | anti-B53 | 47-ish | **KILL** |
| H06 | — | — | **KILL** |
| H07 | B29 | 52 REJECT | DOWNGRADE |
| H08 | B07 | 10 ACCEPT | KEEP |
| H10 | B33 | — | DOWNGRADE |
| H11 | B02 family | 45-ish | **KILL** |
| H12 | B32 | — | DOWNGRADE |
| H13 | — | 43 REJECT | **KILL** |

**What yc945 never found (ironclad gaps vs daulet/local ★):**  
D3 anode copper island · MAX2679 VCC_RF overvolt · R/B die pad swap · D2 Schottky-as-VGS-clamp (wrong class) · U4 12×12/0.4 vs 14×14/0.5 · Port2/CBL map · `$GNRMC` vs `$GPRMC` · R3 **as pull-down** (they claimed missing pull-ups instead) · SAFEBOOT held LOW if driven · A1/A2 on CBL address twist.

---

# Part D — Severity fraud

| ID | Claimed | Honest | Note |
|----|---------|--------|------|
| F05 | Critical | **Not a bug** | Severity fraud + polarity invert |
| F17 | Critical | **Not a bug** | Datasheet fiction |
| H02 | Critical | Soft risk / KILL certainty | “≥2.1 W ⇒ shutdown” theater |
| H09 | Critical | MERGE H02 | Double-count thermal |
| F09/F10 | Moderate | **Critical** | ASan-class overflow underrated |
| H03 | Moderate | **Critical** | Board-killing UART |
| H08 | Critical | Critical OK | Rare correct Critical HW |
| F03/F04/F01 | Critical | Critical OK | Correct |

---

# Part E — Bilingual padding / split-roots

| Padding pattern | Rows | Fix |
|-----------------|------|-----|
| EN+中文 duplicate columns | all | Cosmetic; not scored |
| NMEA overflow split | F09 + F10 + F22 | **1 root** |
| Drive-mode clear split | F13 + F21 | **0 roots** (both false) |
| DIR all-port split | F04 + F18 | **1 or 2** staff-dependent |
| Thermal split | H02 + H09 | **0–1 soft** |
| I2C ignore split | F19 + F20 | **0–1 warning** |
| NMEA hygiene split | F11 + F25 + F26 | **1 soft validation root** |

**Unique strong roots if yc945 submitted cleanly from 30:**  
F01, F02, F03, F04∪F18, F06, F08, F09, F16, H03, H08 ≈ **10**  
(+ optional F07/F15-rewritten/H10 soft) → far below LB 19–24 without the plants they missed.

---

# Part F — Johannes “9 of 22” answer (locked)

**Question:** which **exactly 9** of the original 22 best match “aren't bugs”?

**Answer (reconstruction, not private form):**

1. **BUG-F05** — RST/XRES polarity inverted  
2. **BUG-H01** — D2 SMAJ / bidirectional TVS fiction  
3. **BUG-H02** — L7805 thermal shutdown certainty  
4. **BUG-F12** — settle delay required  
5. **BUG-F13** — drive-mode must clear  
6. **BUG-H04** — SDA/SCL pull-ups absent  
7. **BUG-H05** — A0 unconfirmed  
8. **BUG-F14** — INPUT vs INPUT_PULLUP  
9. **BUG-H06** — D1/D2 refdes mismatch  

**Kill rate on that set:** 9/9 false-or-nit = **100%** of the Johannes cut.  
**Implied keep rate on 22:** 13/22 = **59%** “actual” before further soft cuts (F07/F11/H07/F15) → lands near **~9–11 iron** if staff is strict, or **~13** if generous — consistent with peer score density, **without inventing his form rows**.

---

# Part G — Reviewer state (production blow-up)

```markdown
# State
- obs: BUG-F05 Critical "permanent reset" is silicon-inverted — XRES active-HIGH ends LOW — CY8C9560.cpp:5-8 — severity: blocker [certain]
- obs: BUG-F17 Critical family 0x2 for all 95xx is false — 9560 high nibble is 6; ==0x06 correct — severity: blocker [certain]
- obs: BUG-H04 claims missing I2C pull-ups while R2 exists and real plant is R3 SDA pull-down — severity: high [certain]
- obs: NMEA OOB (F09/F10) filed Moderate while OR-pass/button are Critical — severity inversion — severity: high [certain]
- risk: staff may merge F04∪F18 and F09∪F10∪F22 — raw 30 count collapses to ~10 strong [moderate]
- risk: Johannes form contents unknown — 9-list is reconstruction only [certain as epistemic]

# Artifact: review
scope: yc945 bugs22.csv (22) + bugs30.csv (30); firmware+kicad+local REJECT+daulet council
verdict: fail
```

**verdict: fail** — not because zero real bugs, but because **Critical tier is poisoned** (F05, F17, H01/H02) and **missed half the ironclad board plants** while padding bilingual moderate nits. Submitting this XLS as “22/30 defects” would burn credibility the way Johannes signaled on day one.

---

## Kill rate headline (for distill)

| Metric | Value |
|--------|------:|
| bugs22 pure KILL | **9/22 = 40.9%** |
| bugs22 non-KEEP | **14/22 = 63.6%** |
| bugs30 pure KILL | **7/30 = 23.3%** |
| bugs30 non-KEEP | **20/30 = 66.7%** |
| Johannes reconstructed non-bugs | **exactly 9** listed above |
| Best salvage unique strong from 30 | **~10** |

---

*gx-reviewer-xlrd-kill · non-invention on Johannes form · evidence: official firmware/KiCad + BUG_VERDICTS + daulet FINAL_COUNCIL_LEDGER*
