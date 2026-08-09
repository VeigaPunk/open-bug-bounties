# Scout: harness_tester_challenge — accepted vs rejected bug patterns

**Role:** gx-scout-lb-patterns  
**Date:** 2026-08-08  
**Axes:** scoreability (staff accept) · plant truth · false-plant risk · uniqueness vs LB top  
**Repo:** https://github.com/commaai/harness_tester_challenge  
**LB:** https://comma.ai/leaderboard#harness_tester_challenge  

---

## State

### Leaderboard shape (public, website SSoT)

| bugs | names (selected) | note |
|-----:|------------------|------|
| **24** | AnasMalas, **LK** 👑 | first >21 prize claimed by LK |
| 23 | Milind220 | |
| 22 | BradyMeighan | second prize was >22 by 6/22 |
| 21 | leosteinberg 👑, ProtonDev-sys, DoubleGate | |
| 20 | probablyanasian (comma), delat, i2cjak, kumpulak, **daulet**, maddiedreese | |
| 19 | **johannes-ece**, everythingapplejj, MichaelIbrahim-GaTech | |
| 18–15 | long tail (1kuna **16**, epowell40 **15**, …) | |

Source: `commaai/website` `static/leaderboard.html` (live mirror of https://comma.ai/leaderboard).

**No public graded bug lists from AnasMalas, LK, leosteinberg, or johannes-ece.** Top scorers kept lists private (form-only). Public pattern evidence is:

- Official README grading philosophy  
- Issue #3 peer comment (johannes-ece)  
- Full public package: **daulet** (LB **20**) with accept/reject **council ledger**  
- Public submissions: yc945 XLS (22→30), 1kuna PR list (40 claimed / LB 16), sivamacharla (25-style), VeigaPunk (48/49)  
- Local reaudit: `distill/BUG_VERDICTS.md`

---

### Official intent (what counts)

From README (certain):

- Three surfaces: **Schematic · PCB · Firmware**  
- **“A handful of intentional, show-stopping bugs hidden in each part.”**  
- **“We're not looking for improvements or fixes; just submit a list of bugs.”**  
- Submit via Google Form for verification  

**Implication:** staff score **unique show-stoppers** (board won’t work / test lies / can’t fab mount), not polish catalogs. LB top **24** ≈ upper band of intentional plants after staff merge/reject — not raw claim count.

---

### Estimated intentional plant count range

| Estimate | Range | Basis |
|----------|------:|-------|
| **Staff-scored unique plants (LB ceiling)** | **~21–24** | Two independent #1s at **24**; prize thresholds >21 then >22 |
| **Strong functional roots (council / reaudit)** | **~18–22** | daulet council + local `BUG_VERDICTS` after reject/dedup |
| **README “handful × 3 parts”** | **~15–30** | qualitative “handful” per schematic/PCB/FW |
| **Raw catalog before hygiene cut** | **30–50+** | public over-submits (yc945 30, 1kuna 40, VeigaPunk 48/49) |

**Working estimate for hunt:** **intentional plants ≈ 20–26; staff accept tops out at 24 unique roots.** Claiming 40–48 without reject-list hygiene is inconsistent with every published score ≥20 who left a paper trail.

---

## Categories that **score** (show-stoppers / hard functional)

Consensus across daulet ACCEPT list, 1kuna strong FW/sch subset, yc945 Critical, local CONFIRMED strong shortlist, and LB density:

### Firmware / driver (high density of plants)

| Pattern | Why it scores | Public anchors |
|---------|---------------|----------------|
| **`cy.begin()` never called** | Expander never reset/I2C-started | universal |
| **`set_output` DIR=0x00 all ports** + **`set_pd_inputs` DIR=0xFF all ports** | Stimulus destroyed; contention / undrive | daulet #4, most lists |
| **`1 << i` / `1 << j` 32-bit UB** | Pins ≥31 broken | universal |
| **Pass OR not AND** | One good row → whole harness PASS | universal |
| **Button polarity inverted** | Runs when idle, stops when pressed | universal |
| **FAIL LED wiped by GOOD next loop** | Failures invisible | universal |
| **LED GPIOs never `pinMode(OUTPUT)`** | Status dead | most lists |
| **NMEA 64B unbounded + OOB NUL** | Real stack smash on normal RMC length | daulet #2, universal |
| **EXPECTED matrix wrong** (bit-order / passive closure) | Correct harness fails | daulet #17/replacement, local B18 |
| **Port2 nibble / linear index** | CBL_20+ wrong physical bits | daulet #14, sivamacharla #4, local B19 |
| **SAFEBOOT held LOW** (if pin driven) | Module forced Safe Boot, not normal NMEA | 1kuna #26, local B43 |
| **`$GPRMC` only vs default `$GNRMC`** | Multi-GNSS never locks time | daulet #13, 1kuna #35 |

### Schematic (smoking-gun netlist)

| Pattern | Why it scores | Public anchors |
|---------|---------------|----------------|
| **R3 = SDA pull-down to GND** | I2C dead (R2 SCL pull-up correct) | universal |
| **GPS UART not crossed** (TX–TX / RX–RX) | No NMEA | universal |
| **RGB LED no series resistors** | Overcurrent / damage | universal |
| **GPS ~RST/~SAFEBOOT float (no pull)** | Boot state undefined | many lists |
| **D2 Schottky as VGS clamp** (wrong part class for Q1 G–S) | Transient can kill FET | daulet #17, 1kuna #7 |
| **MAX2679 VCC fed from NEO `VCC_RF` (~3.2 V > abs max)** | LNA overvolt | daulet #12 — **under-represented in VeigaPunk inventory** |
| **Address pins A1–A3 on CBL nets** (if treated as fixed addr) | Address floats with DUT | 1kuna #4 — **check if still true; possible plant** |

### PCB (connectivity / package geometry — not mass DRC)

| Pattern | Why it scores | Public anchors |
|---------|---------------|----------------|
| **D3 common anode open** (island / no copper to +3.3V) | LED unpowered independent of series-R | daulet #10 — **missed or soft in many lists** |
| **R/B LED die pad swap** (ASMB pad 2/4 vs LED_R/LED_B) | Status colors inverted | daulet #16 |
| **U4 land pattern body/pitch mismatch** (12×12 / 0.4 mm vs real 14 mm / 0.5 mm TQFP-100) | Part won’t sit correctly | daulet #18; **not** “68-pin only” |
| **C6 / U5 courtyard collision** (assembly) | Real placement conflict | many lists (weak alone; stronger with DRC) |
| **J3 hang-off / pad-off-board** (if geometry true) | Connector unmateable | 1kuna #12 — **verify vs current official board** |

---

## Categories staff / peers **reject** (hygiene, fiction, improvements)

### Confirmed false plants (datasheet / topology) — **do not submit as Critical**

| Claim | Why rejected | Sources |
|-------|--------------|---------|
| **XRES “inverted” / permanent reset** (`begin` ends LOW) | CY8C9560 **XRES is active-HIGH**; HIGH pulse then LOW = **release** | daulet ledger #45; local B02 REJECTED |
| **`read_id() == 0x06` wrong** | Family nibble **6** = 60-I/O part; 0x04 is other family | daulet #46; local B13 REJECTED |
| **VDD_USB→GND is a bug** | u-blox HIM: **tie VDD_USB to GND when USB unused** | daulet #44; local B05 REJECTED |
| **CY8C9560 only 68-pin / cannot mount TQFP-100** | Part **ships PG-TQFP-100**; wrong claim kills credibility | local B42/B45 REJECTED; score **pitch/body** not “68-pin only” |
| **D_SEL floating = wrong interface** | Open/high = UART+DDC (desired) | local B46 REJECTED |
| **Must clear drive-mode bits before STRONG** | DS last-1-wins | daulet #49; local B25 REJECTED |
| **SCL missing pull-up** | R2 is 4.7k to +3.3V | daulet #31 |
| **Q1 S/D “blocks all power” as absolute** | Daulet REJECTS classic RPP inversion as plant (#36); local PARTIAL (wording overclaims) | dispute — **do not lead** |
| **L7805 thermal show-stopper** | Load / θJA not established | daulet #32 |
| **Courtyard-only C6/U5 as hard short** | Clearance may remain; assembly risk ≠ unbuildable | daulet #39 |
| **Phantom Ethernet/USB connectors** | Teensy **module silkscreen**, not board features | local B34 REJECTED |
| **V_BCKP to VCC invalid** | Explicitly allowed | daulet #43 |

### Hygiene / process / “improvements” (often 0 or 1 merged point)

- Debounce / edge detect / held-button multi-log (daulet DISPUTED_WARNING)  
- NMEA checksum / A/V status / `$GNRMC` **split three ways** → staff often **one** parser-validation root  
- I2C `endTransmission` ignored as **standalone** (fault-gated; merges into dead bus plants)  
- No settle delay (daulet REJECT as current-port access interval OK)  
- SD init `while(1)` alone, fsync, partial `print` failure  
- Mass DRC: “199 track widths”, “510 clearances”, “83 silk clips” as **dozens of bugs**  
- Thermal/copper, keepouts, “improvements for production stats”  
- Teensy VIN/VUSB backfeed (ACCEPT_WARNING only — service condition)

**Peer signal:** johannes-ece on [issue #3](https://github.com/commaai/harness_tester_challenge/issues/3): *“By my count 9 of those aren't actual bugs fwiw”* on yc945’s 22-item XLS → ~40% reject rate on a mixed Critical/Moderate list. Johannes himself sits at **19** on LB.

**yc945 XLS hygiene samples that match reject pattern:** RST polarity inverted; drive-mode not cleared; “SCL/SDA pull-ups absent/unconfirmed”; A0 unconfirmed; INPUT vs INPUT_PULLUP nit; D1/D2 refdes mismatch; family code 0x2 for all CY8C95xx (wrong).

---

## Pattern rules of thumb (score vs nit)

| Score if… | Reject / nit if… |
|-----------|------------------|
| Breaks **power, I2C, UART, expander init, pass/fail truth, mountability** with netlist/line proof | “Could be better”, DRC flood, missing feature |
| **Independent root** (new net or control flow) | Same root restated (e.g. `1<<i` print path = DUPLICATE of drive mask) |
| Matches **device truth** (HIM / DS / OPN) | Contradicts DS (XRES, VDD_USB, family ID, package family) |
| One sentence: *what fails in operation* | Catalog of IPC recommendations |

README framing again: **show-stopping intentional**, not continuous improvement.

---

## Public high-quality list profiles

### daulet (LB **20**) — best public accept/reject model

- **24** organizer-facing findings + large **REJECT** ledger  
- Heavy on **FW show-stoppers + netlist + unique PCB/RF** (D3 open anode, MAX2679 overvolt, R/B swap, D2 clamp, U4 pitch)  
- Explicitly rejects XRES, VDD_USB, ID nibble, Q1 “backwards”, L7805 thermal, drive-mode clear, mass PCB myths  
- Source: https://github.com/daulet/harness_tester_challenge (`FINAL_FINDINGS_24_SUBMISSION.md`, `FINAL_COUNCIL_LEDGER.md`)

### 1kuna (LB **16**) — 40 claims, heavy PCB theory

- Strong overlap on UART, R3, LED, cy.begin, OR pass, button, shifts, SAFEBOOT  
- Inflators: **zero copper / unrouted board** (contradicted by others’ Gerber/copper audits), many production/ESD “improvements”, XRES polarity  
- Source: PR #1 `SUBMISSION.md` on official repo history  

### sivamacharla — good FW map + false package plant

- Excellent Port2 / CBL_20+ explanation  
- Still carries **RESET polarity**, **VDD_USB**, **68-pin only** — same trap set as inflated VeigaPunk Criticals  
- Rules **out** L1=12 nH as matching MAX2679 EVKit (conflicts with local B49 plant theory)

### VeigaPunk local distill

- **49** rows → **32** CONFIRMED (incl. soft) · **8** REJECTED · **1** DUPLICATE · **~18–22** LB-grade strong  
- Aligns with LB top **24** only after reject + dedup  

---

## Concrete bug ideas **still true / underweighted** vs common 24-lists

Prioritize re-verification on **official** `commaai/harness_tester_challenge` master (netlist + footprint + datasheet). High upside if not already in staff’s private plant set:

1. **D3 common-anode open copper / island** (PCB connectivity plant independent of missing series R) — daulet #10.  
2. **MAX2679 VCC tied to NEO `VCC_RF` over-abs-max** — daulet #12.  
3. **ASMB RGB R/B cathode pad swap** — daulet #16.  
4. **D2 is Schottky, not VGS zener, on Q1 gate–source** — daulet #17 / 1kuna #7.  
5. **U4 footprint body/pitch wrong for CY8C9560A-24AXIT OPN** (score **geometry**, never “68-pin only”).  
6. **EXPECTED_CONNECTIONS passive-closure / matrix wrongness** as one hard plant (daulet replacement wording).  
7. **CY address pins on CBL_*** (1kuna #4) — if netlist still shows A1–A3 on harness nets.  
8. **SAFEBOOT static LOW** as separate from missing pinMode (local B43 vs B15).  
9. **`$GNRMC` talker** if not already merged into NMEA hygiene bucket.  
10. **Port2 SCL/SDA hole in linear map** (half harness mis-addressed) — often under-counted next to pure `1<<i`.  
11. **LNA_EN / ANT_ON open** while external MAX2679 present (local B41) — RF path incomplete.  
12. **Blocking 40-pin scan starves Serial1** (daulet warning #23) — only if staff counts operational GPS loss after other GPS plants fixed.  

**Avoid re-submitting as Critical:** B02 XRES, B05 VDD_USB, B13 ID 0x06, B25 drive clear, B34 silk phantoms, B42/B45 68-pin fiction, B46 D_SEL, Q1 absolute power-block, L7805 alone, DRC mass lists, L1=12nH if EVKit-aligned (sivamacharla ruled out).

---

## Staff grading mechanics (inferred)

1. **Unique roots only** — duplicates and “same bug twice” collapse.  
2. **Truth gate** — datasheet-false claims cost credibility and points.  
3. **Show-stopper bias** — FAIL LED wipe and OR-pass score; debounce often doesn’t.  
4. **Three surfaces** — pure-FW or pure-DRC lists underperform; top 24 span **sch + pcb + fw**.  
5. **Form verification** — public GH issues are not the grade path; epowell40 / VeigaPunk issues closed or ignored for LB.  
6. **Inflation punished** — 40→16 (1kuna), 22 with “9 not bugs” peer note, 48 pending staff.

---

## Sources

| Source | Use |
|--------|-----|
| https://comma.ai/leaderboard | scores top ~24 |
| https://github.com/commaai/website/blob/master/static/leaderboard.html | HTML SSoT |
| https://github.com/commaai/harness_tester_challenge/README.md | intentional show-stoppers; no improvements |
| https://github.com/commaai/harness_tester_challenge/issues/3 | johannes-ece reject rate on yc945 list; XLS attachments |
| https://github.com/daulet/harness_tester_challenge | FINAL_FINDINGS_24 + FINAL_COUNCIL_LEDGER (best public taxonomy) |
| https://github.com/sivamacharla/harness_tester_challenge | BUGS_SUBMISSION / bugs.txt |
| 1kuna PR #1 SUBMISSION.md (historical ref on official repo) | 40-claim profile / LB 16 |
| https://gist.github.com/VeigaPunk/7818884e21add4e89ff224609fae9833 | public 48 catalog |
| Local `distill/BUG_VERDICTS.md` | reaudit CONFIRMED/REJECTED/PARTIAL |

### Gaps / unknowns

- **AnasMalas / LK / leosteinberg private graded lists** — unverified; cannot prove exact plant set behind 24/21.  
- **Exact staff rubric weights** (is PCB island D3 always counted?) — unverified.  
- **Whether official board revision differs** from forks’ “zero copper” claims — treat current master Gerbers as truth.  
- **L1=12 nH** plant vs EVKit match — disputed between local B49 and sivamacharla rule-out.  

---

## Hunt posture (actionable)

1. **Target scoreable unique set ≈ 22–26**, not 48.  
2. Lead with **consensus 15** (begin, R3, UART, DIR fight, OR-pass, button, shift UB, LED R missing, FAIL wipe, NMEA OOB, Port2 map, matrix, SAFEBOOT level, series R, package geometry).  
3. Differentiator plants from daulet **PCB/RF** cluster if still true on official files.  
4. Ship a **REJECT appendix** (XRES, VDD_USB, ID, 68-pin myth) so graders trust the Critical list.  
5. Merge hygiene (NMEA A/V+checksum+talker; debounce) into **≤2** buckets if included at all.

---

*gx-scout-lb-patterns complete.*
