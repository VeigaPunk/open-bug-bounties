# gx-connector-r1 — cross-axis on 49 harness bugs

**Role:** connector (breadth, second-order, scoreability)  
**Date:** 2026-08-08  
**Sources:** `VeigaPunk_Harness_Tester_Bugs.csv` (B01–B49), `BUGS.md`, `NETLIST_EVIDENCE.md`, `PRIORITY_25.md`, `README.md`, firmware skim (`firmware.ino`, `CY8C9560.cpp`)  
**Axes:** coverage · truthfulness · scoreability · dedup  
**Method:** cluster + dependency + staff-heuristic; **no full re-verification**.

---

# State

- **inf:** Count docs are **stale-layered** (header 40 → body 48 → CSV/B49 = 49; README stuck at 48) while **functional deadlocks stack multi-layer** (power → I2C → package → driver → pass logic). [strong] — axes: coverage, truthfulness, dedup  
- **inf:** Leaderboard top **24** is best explained as **staff unique intentional** after collapsing same-root clusters and discarding PCB hygiene — not as “only 24 bugs exist.” [strong] — axes: scoreability, dedup  
- **risk:** Claiming **49/48/40** interchangeably to staff **taxes truthfulness**; inflated count without explicit **unique-root** mapping can score *below* a tight 24.

---

## 1. Duplicate / same-root clusters

| Cluster | Members | Relationship | Unique root? |
|--------|---------|--------------|--------------|
| **Shift-overflow** | **B08** (`1 << i` in test loop), **B44** (`1 << j` debug print) | Same C UB / 32-bit shift class; different call sites | **1 root**, 2 symptoms |
| **Package fiction** | **B42** (TQFP-100 footprint; CY8C9560A is 68-pin only), **B45** (100-pin pad map ≠ 68-pin silicon → all CBL invalid) | Root (wrong package) → total pin-map invalidity | **1 root**, B45 = consequence |
| **SAFEBOOT control** | **B15** (SAFEBOOT/RST never `pinMode(OUTPUT)`), **B43** (`digitalWrite(SAFEBOOT, LOW)` holds active-low ~SAFEBOOT) | pinMode omission + permanent assert | **Closely coupled**; B43 is the intentional brick if pins can drive; B15 is incomplete GPIO setup. Staff may count **1 GPS-boot-mode** bug or **2** if they split “never configured” vs “forced safeboot” |
| **R3 SDA dead** | **B03** (schematic: R3 pull-**down** to GND on CY_SDA) | Netlist smoking gun | **1 root** |
| **B03 vs “B21 copper”** | User probe: B03 / B21 copper same? | **No for CSV IDs.** CSV **B21** = firmware `$GPRMC`-only (NMEA). The **PCB copper twin of B03** is **PRIORITY_25 #21** (“R3 copper implements pull-down”), **not** CSV B21. ID collision: PRIORITY renumber ≠ B-IDs. | Treat **PRIORITY #21 ≡ B03** (view, not new bug). Do **not** merge B03 with CSV B21. |
| **Direction fight** | **B11** `set_output` DIR=all-out, **B12** `set_pd_inputs` DIR=all-in | Sequential mutual undo; both true | **1 driver-API design fail** or **2** discrete bugs — same subsystem |
| **EXPECTED matrix** | **B17** (self-bits vs `~output_mask` ⇒ equality impossible), **B18** (MSB/LSB vs `1<<i`) | Matrix encoding vs mask semantics | **1 matrix design** with two independent encoding mistakes if both verified |
| **LED HW/SW** | **B07** (no series R), **B14** (no `pinMode(OUTPUT)` on 5/6/7) | HW damage + SW silent | Distinct layers; both real |
| **GPS float vs force** | **B30** (no external pull-ups on ~RST/~SAFEBOOT), **B15/B43** | Float at boot vs FW force-low | Related family; B30 secondary if FW holds pins |
| **NMEA quality stack** | **B21–B23** ($GPRMC only, no A/V, no checksum), **B20** (64-byte + OOB null) | B20 is crash/OOB; B21–23 hygiene | B20 higher; B21–23 often **one “weak NMEA parser”** for staff |
| **I2C soft failures** | **B13** (ID 0x06 vs 0x04), **B26** (errors ignored) | Init gate vs error handling | Distinct |
| **Power / RF chain** | **B05** VDD_USB→GND, **B41** LNA_EN float, **B46** D_SEL float, **B49** L1=12nH bias-T | GPS module power/RF partial-stack | Separate nets; related product function |

**Tight unique-root estimate after collapse:** ~**35–38** if generous; ~**28–32** if aggressive (merge B08/B44, B42/B45, B11/B12, B15/B43, B17/B18, NMEA trio). Still **above 24** without dropping real show-stoppers.

---

## 2. Dependency chains

### A. Board / assembly dead even if firmware perfect

These **cannot be software-fixed** on a stock fab of the challenge design:

| ID | Why board stays dead |
|----|----------------------|
| **B03** | SDA pulled to GND → I2C bus electrically broken |
| **B04** | UART TX–TX / RX–RX → no NMEA path |
| **B05** | VDD_USB shorted to GND → u-blox power/USB rail wrong |
| **B06** | Q1 S/D swapped → body diode blocks protected +12V path |
| **B42/B45** | Wrong package / pin map → part won’t mount / nets fiction |
| **B07** | LED cathodes no series R → risk of GPIO/LED damage (status path) |
| **B19** | Port2 bits 4–7 are SCL/SDA not GPIO → linear CBL index wrong in HW truth |
| **B41** | LNA_EN unconnected with external MAX2679 → RF enable path incomplete |
| **B49** | L1 12 nH vs µH-class choke → bias-T / RF isolation weak |
| **B31/B32** | Thermal / 3v3 budget — reliability under continuous duty |

**Chain (power → I2C → package):**  
`B06 (no +12 rail as designed) → U1/Teensy domain still may boot → B03 kills expander bus → even correct FW never talks → B42 means real silicon pinout never matches schematic CBL.`

### B. Firmware / test logic dead even if board perfect

| ID | Why FW stays dead on good copper |
|----|----------------------------------|
| **B01** | `cy.begin()` never called → expander never inited |
| **B02** | `begin()` ends RESET_N **LOW** (active-low) → permanent reset if begin used |
| **B13** | ID check `0x06` vs family `0x04` → begin returns false even if alive |
| **B11+B12** | Direction reprogramming → contention / undoes drive pin |
| **B08** | Pins ≥31 broken (`1 << i` 32-bit) |
| **B09** | OR not AND → false PASS on any single pin match |
| **B10** | Button polarity inverted (return on LOW; idle HIGH runs test) |
| **B17 (+B18)** | EXPECTED vs mask → structural non-match / bit-order |
| **B43 (+B15)** | SAFEBOOT held LOW → module not in normal NMEA (gates whole product flow) |
| **B16** | FAIL LED wiped every loop while `time_fixed` |
| **B20** | NMEA buffer OOB |
| **B29** | SD fail infinite loop before LEDs are outputs |

**Chain (GPS gate → harness test):**  
`B43/B15/B04/B05 → time_fixed never true → loop returns early → harness path never runs`  
Independently:  
`B01/B02/B03 → expander dead → even if time_fixed, connectivity read is garbage`  
Independently:  
`B09/B17 → with live expander, pass/fail still wrong`

### C. Cross-layer “both must be right”

| Pair | Effect |
|------|--------|
| B03 (board) + B01/B02 (FW) | Either alone kills I2C expander path |
| B04 (board) + B43 (FW) | Either alone kills usable NMEA time gate |
| B42 (board) + B19 (schematic pin roles) | Physical mount + logical pin index both wrong |
| B07 (board) + B14/B16 (FW) | Status LEDs useless / dangerous |

---

## 3. Staff-scoreability heuristic

### Looks intentional “find me” (challenge planted)

Criteria: **netlist-provable**, **single-character / polarity flip**, **contradicts datasheet**, **breaks primary function**, **comment/example smells** (“illustration” matrix).

| Tier | IDs | Why “planted” |
|------|-----|----------------|
| **A — smoking gun** | B03, B04, B05, B06, B42, B01, B02, B43, B09, B10, B11, B12, B08, B17 | Netlist or few-line FW; product cannot work as specified |
| **B — strong intentional** | B13, B07, B19, B15, B18, B20, B41, B16, B14 | Datasheet/family ID, LED, port map, buffer, LNA_EN, status wipe |
| **C — borderline intentional** | B45 (dup of B42), B44 (dup of B08), B30, B46, B49, B25, B29 | Real but secondary / consequence / RF subtlety |

### Inflated hygiene / DRC / reliability (likely zero or soft staff credit)

| Class | IDs | Why soft |
|-------|-----|----------|
| PCB DRC / layout hygiene | B33–B40, B35 courtyard, B36 tracks, B37 zones, B38 silk, B39 GND, B40 edge | Real fab notes; rarely “puzzle bugs” |
| Thermal / current budget | B31, B32 | Design-risk not hard functional plant |
| NMEA polish | B21, B22, B23 | Modern modules use GNRMC; checksum best practice — often collapsed |
| Process / robustness | B24 settle, B26 I2C errors, B27 debounce, B28 time freeze, B47 ports 5–7 r/w, B48 fsync | Production quality, not show-stopper plant |
| Silk without connectors | B34 | Cosmetic |

**PRIORITY_25 vs CSV:** PRIORITY mixes **B03 twice** (schematic + “R3 copper”) as #14 and #21 — **scoreability inflation inside our own shortlist**. Staff who dedupe will not pay twice.

---

## 4. Count reconciliation (40 / 48 / 49)

| Artifact | Number | What it actually is |
|----------|--------|---------------------|
| **BUGS.md header** | **40** | **Stale.** Early table length; never updated when body grew. |
| **BUGS.md body list** | **1…48** | Forty-eight numbered prose bugs in main sections. |
| **BUGS.md “Added after top-24”** | **+1 → #49** | L1 12 nH bias-T; explicitly post-recheck. |
| **CSV / XLSX** | **B01–B49 = 49** | Canonical machine count of rows. |
| **README** | **48** | Pre-B49 or excludes the late RF choke; website PR “@48”. |
| **PRIORITY_25** | **25 + 10b + 26** | Shortlist, not full inventory; numbering ≠ B-IDs. |
| **LB top (external)** | **24** | Staff-graded unique intentional (AnasMalas / LK); VeigaPunk not yet graded per `SUBMISSION_STATUS.md`. |

**Arithmetic truth:**

1. First pass narrative: “~40 show-stoppers + PCB.”  
2. Full write-up expanded PCB/package/soft FW → **48** prose items (header left at 40).  
3. Recheck vs top-24 added **B49** → **CSV = 49**.  
4. README/PR branding lagged at **48**.

**No missing row in CSV.** The contradiction is **documentation drift**, not two different bug universes.

```
stale header 40  ──┐
body 1..48         ├──→ README 48  ──→ PR preview @48
B49 add-on         └──→ CSV 49 (truth of inventory size)
staff unique       ──→ LB 24 (different metric)
```

---

## 5. Risk: top = 24 means unique intentional — best 24 “must count”

Hypothesis: staff score ≈ **unique intentional functional defects**, not raw submission length. Below: **must-count 24** for leaderboard competition, then **rest** (support / hygiene / dup).

### Must-count 24 (order ≈ plant strength + independence)

| # | ID | One-liner |
|---|-----|-----------|
| 1 | **B03** | R3 SDA pull-down (netlist) |
| 2 | **B04** | GPS UART not crossed TX–TX/RX–RX |
| 3 | **B05** | VDD_USB → GND |
| 4 | **B06** | Q1 reverse polarity S/D swap |
| 5 | **B42** | TQFP-100 footprint; part is 68-pin only |
| 6 | **B01** | `cy.begin()` never called |
| 7 | **B02** | RESET_N left asserted LOW in `begin()` |
| 8 | **B43** | SAFEBOOT held LOW permanently |
| 9 | **B09** | Pass = OR of pin matches (any match ⇒ PASS) |
| 10 | **B10** | Button polarity inverted |
| 11 | **B11** | `set_output` forces all ports OUTPUT |
| 12 | **B12** | `set_pd_inputs` forces all ports INPUT (undoes drive) |
| 13 | **B08** | `1 << i` overflow pins ≥31 |
| 14 | **B17** | EXPECTED self-bits vs `~output_mask` impossible match |
| 15 | **B13** | Device ID 0x06 vs family 0x04 |
| 16 | **B19** | Port2.4–7 SCL/SDA not GPIO → wrong CBL index |
| 17 | **B07** | RGB LED no series resistors |
| 18 | **B20** | NMEA 64-byte buffer overflow / OOB null |
| 19 | **B18** | EXPECTED bit-order MSB/LSB vs `1<<i` |
| 20 | **B16** | FAILED LED wiped by `set_status(GOOD)` while fixed |
| 21 | **B41** | LNA_EN unconnected with MAX2679 present |
| 22 | **B15** | SAFEBOOT/RST never `pinMode(OUTPUT)` *(if staff split from B43; else swap for B25)* |
| 23 | **B14** | LED pins never `pinMode(OUTPUT)` |
| 24 | **B29** or **B49** | SD fail hang-before-LED **or** L1 12 nH bias-T (staff taste: boot UX vs RF plant) |

**Swap candidates if staff merge B15∪B43 or B11∪B12:** promote **B25** (drive-mode bits not cleared), **B30** (no GPS pull-ups), **B46** (D_SEL float), **B49** (L1).

### Rest (25) — do not expect full staff points

| Bucket | IDs | Notes |
|--------|-----|--------|
| **Dup / consequence** | B44 (≡B08), B45 (≡B42), PRIORITY “R3 copper” (≡B03) | Cite as evidence, not second score |
| **NMEA hygiene** | B21, B22, B23 | Collapse under weak parser with B20 if needed |
| **Driver soft** | B24, B26, B47 | Robustness |
| **UX / log** | B27, B28, B48 | Debounce, frozen time, fsync |
| **Power reliability** | B31, B32, B33 | Thermal, 3v3, decoupling |
| **PCB DRC / silk** | B34–B40 | Courtyard, tracks, zones, silk, GND islands, edge |
| **Borderline plant** | B46, B49 (if not in top 24), B25, B30 | Keep in package; mark secondary |

**If staff count unique roots only from must-count list with merges (B08 only, B42 only, B15∪B43, B11∪B12):**  
24 → **~20–21** hard unique — **below** current LB 24 → need **B25, B41, B20, B18, B49** kept as independent.

**Strategic implication (scoreability):** Lead with **must-count 24 + netlist block**; present full 49 as **appendix inventory** with **cluster map** so graders do not punish “padding.” Truthfulness axis: say **“49 catalog / ~24 unique intentional show-stoppers”** not “49 independent planted bugs.”

---

# Dissent

- **Depth reviewers** may insist B44 and B45 are **separately scoreable** (different files / different failure modes); connector treats them as **one root each** for LB math.  
- **Firmware purists** may rank B17/B18 above B06/Q1 if they never open the netlist; **hardware purists** reverse that.  
- **PCB engineers** may defend B35–B40 as real fab blockers; **challenge staff** historically ignore pure DRC for puzzle scoring (hypothesis from top=24).  
- **B15 vs B43:** some count only B43 (forced safeboot is the plant); others count only B15 (classic missing pinMode). Double-counting is the trap.  
- **B03/B21 copper:** anyone using PRIORITY_25 numbering without remapping to B-IDs will **false-merge** B03 with CSV B21 ($GPRMC).

---

# Rationale (strange angle)

The **non-obvious signal** is not “more bugs = higher score.” It is **metric mismatch**:

1. **Inventory size (49)** = thoroughness + documentation lag.  
2. **Staff metric (~24)** ≈ **unique intentional kill-switches** after collapsing same-root pairs.  
3. The product is a **series reliability chain**: any one of {power Q1, SDA R3, package U4, cy.begin, SAFEBOOT, pass OR} kills the demo — so **parallel plants** look like “many bugs” but **field failure is overdetermined**. Overdetermined systems inflate raw counts while **unique intentional** plateaus near the number of **independent plant sites**, not symptoms.

**Second-order:** shipping **49 without a dedup map** risks staff reading the submission as **hygiene inflation** and awarding **≤24** even when the catalog contains **more than 24 real independent plants**. The winning move on scoreability is **explicit cluster collapse + must-24**, not a larger CSV.

**Coverage residual (honest):** netlist-proven board kills are high-confidence; some FW matrix (B18 bit-order) and RF (B49) need deeper re-check for absolute truthfulness — connector did not re-prove every line.

---

## Axis scores (connector self-grade)

| Axis | Score | Note |
|------|-------|------|
| coverage | high | All 49 IDs placed in cluster / must / rest |
| truthfulness | med-high | Count drift explained; no claim every soft bug is planted |
| scoreability | high | Explicit 24 vs rest + LB hypothesis |
| dedup | high | B08/B44, B42/B45, B15/B43, B03≠B21(CSV), B11/B12 |

---

*End connector-r1. Ship path: `reviews/connector-r1.md` only (review artifact; no secret paths).*
