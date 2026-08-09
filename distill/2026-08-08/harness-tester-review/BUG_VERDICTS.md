# BUG_VERDICTS — SSoT (gx-distiller-r1)

**Date:** 2026-08-08  
**Inventory:** B01–B49 (`VeigaPunk_Harness_Tester_Bugs.csv`)  
**Inputs:** fw-batch, drv-batch, sch-batch, pcb-batch, scout-datasheets, connector-r1, overfit-B01-B03  
**Judge resolutions:** mandatory overrides applied where batches conflict  

---

## Executive summary

| Metric | Count | Notes |
|--------|------:|-------|
| **Claimed inventory** | **49** | CSV B01–B49 (README/PR often say 48; BUGS.md header stale at 40) |
| **CONFIRMED** | **32** | Factually true defects as worded (incl. hygiene/soft production) |
| **PARTIAL** | **8** | Real signal, overstated mechanism or rule not project-bound |
| **REJECTED** | **8** | Datasheet/polarity/package fiction — must not ship as Critical |
| **DUPLICATE** | **1** | B44 → primary **B08** |
| **Sum** | **49** | |

### Leaderboard-grade estimate (after dedup of strong functional bugs)

| Tier | Estimate | What it is |
|------|---------:|------------|
| **Strong functional / intentional plants** (unique roots) | **~18–22** | Board kills + FW show-stoppers after removing REJECTED plants and collapsing B44; optional merge B11∪B12 or B15∪B43 lowers toward **~18** |
| **Including PARTIAL topology (B06) + latent matrix (B17)** | **~20–24** | If staff still credit inverted RPP and self-bit-after-align |
| **Soft / hygiene / PCB DRC** (CONFIRMED but weak score) | **~10–14** | B21–B24, B26–B28, B31–B33, B35, B47, NMEA polish, thermal |
| **Staff LB historical (external)** | **~24** | Unique intentional metric — **not** raw 49 |

**Corrected score posture:**  
Do **not** claim “49 independent Critical bugs.” Prefer:

> **49 catalog rows → 32 CONFIRMED + 8 PARTIAL; 8 REJECTED; 1 DUPLICATE.  
> ~18–22 unique strong functional plants after reject + dedup.**

### Top false claims that inflate the 48/49 number

These were often listed as **Critical/High smoking guns** and would **destroy credibility** if submitted uncorrected:

| ID | Why false / inflated |
|----|----------------------|
| **B02** | CY8C9560 **XRES is active-HIGH**. `begin()` ends **LOW = deasserted**. “Permanent reset” inverted vs silicon. |
| **B05** | u-blox HIM: if USB unused, **VDD_USB must be tied to GND**. Wire is correct, not a defect. |
| **B13** | Family high nibble for **CY8C9560A is 6**, not 0x04 (that is 9540). Code `== 0x06` is correct. |
| **B42** | Infineon ships **CY8C9560A-24AXIT as PG-TQFP-100**. “68-pin only / cannot mount” is fiction. |
| **B45** | Consequence of B42’s false package premise. Prefer **REJECTED** (optional weak residual: 12×12 vs 14×14 body). |
| **B46** | **D_SEL open/high = UART+DDC** (desired). Float is correct, not undefined. |
| **B25** | Drive-mode registers are **last-1-wins**; explicit clear of prior mode **not required**. |
| **B34** | Silk labels live on **Teensy module footprint**, not phantom board connectors. |

Secondary inflation (true but not “unique intentional Critical”): NMEA hygiene **B21–B23**, PCB DRC **B36–B40**, process **B24/B26–B28/B48**, and treating **B44** as independent of **B08**.

### Cross-batch contradiction resolution (judge)

| ID | Batch drift | **Final** |
|----|-------------|-----------|
| B02 | sch/connector often “planted”; drv+scout refute | **REJECTED** |
| B05 | sch CONFIRMED “must VCC”; scout HIM GND | **REJECTED** |
| B13 | CSV/connector plant; drv+scout refute | **REJECTED** |
| B17 | fw PARTIAL; connector often Critical | **PARTIAL** |
| B25 | sometimes High; drv REJECTED | **REJECTED** |
| B34 | cosmetic; pcb REJECTED | **REJECTED** |
| B42/B45 | Critical in connector must-24; scout+pcb refute | **REJECTED** |
| B44 | fw CONFIRMED same class; judge | **DUPLICATE→B08** |
| B46 | sch CONFIRMED; scout open=UART | **REJECTED** |
| B06 | sch CONFIRMED absolute power block; scout body-diode caveat | **PARTIAL** |
| B15/B43 | related; both real | **both CONFIRMED** |
| B49 | late add; sch+judge | **CONFIRMED** |

---

## Full verdict table (B01–B49)

| ID | Verdict | Area | Severity (CSV) | One-line (corrected) | Primary evidence |
|----|---------|------|----------------|----------------------|------------------|
| B01 | **CONFIRMED** | Firmware | Critical | `cy.begin()` never called | `firmware.ino` object only; labrat: no `cy.begin` in tree |
| B02 | **REJECTED** | Driver | Critical | Not permanent reset; XRES active-HIGH, ends LOW | DS XRES; `CY8C9560.cpp` pulse HIGH then LOW |
| B03 | **CONFIRMED** | Schematic | Critical | R3 = SDA pull-**down** to GND | sch geometry + netlist R3.1=GND; labrat gate 3 |
| B04 | **CONFIRMED** | Schematic | Critical | GPS UART not correctly crossed / miswired | netlist TX–TX RX–RX; U3 geometry worse (TXD NC) |
| B05 | **REJECTED** | Schematic | Critical | VDD_USB→GND correct when USB unused | u-blox HIM §1.3.3 |
| B06 | **PARTIAL** | Schematic | Critical | S/D inverted vs classic RPP; “blocks all power” overstated | netlist S on +12V load; body diode D→S can conduct |
| B07 | **CONFIRMED** | Schematic | Critical | RGB LED no series resistors | LED_* = D3 + GPIO only |
| B08 | **CONFIRMED** | Firmware | Critical | `1 << i` 32-bit/UB; pins ≥31 broken | `firmware.ino:144`; need `1ULL` |
| B09 | **CONFIRMED** | Firmware | Critical | OR not AND pass logic | any match sets `passed=true` |
| B10 | **CONFIRMED** | Firmware | Critical | Button polarity inverted | return on LOW vs active-low SW |
| B11 | **CONFIRMED** | Driver | Critical | `set_output` DIR=0x00 all ports | `CY8C9560.cpp` port loop |
| B12 | **CONFIRMED** | Driver | Critical | `set_pd_inputs` DIR=0xFF undoes drive | call site after `set_output` leaves 0 outs |
| B13 | **REJECTED** | Driver | High | Family nibble **6** for 9560; `0x06` correct | DS reg 2Eh; 0x04 is 9540 |
| B14 | **CONFIRMED** | Firmware | High | LED pins never `pinMode(OUTPUT)` | setup omits LED pinModes |
| B15 | **CONFIRMED** | Firmware | High | SAFEBOOT/RST never `pinMode(OUTPUT)` | digitalWrite only — distinct from B43 |
| B16 | **CONFIRMED** | Firmware | High | FAIL LED wiped by `set_status(GOOD)` | every `loop` while `time_fixed` |
| B17 | **PARTIAL** | Firmware | Critical | Self-bit claim false under live `1<<i`; latent under MSB | 0/40 self at bit *i*; diagonal = B18 map |
| B18 | **CONFIRMED** | Firmware | High | EXPECTED MSB-left vs LSB `1<<i` | matrix vs drive index |
| B19 | **CONFIRMED** | Schematic | Critical | Port2 nibble + linear index breaks CBL_20+ | P2 bits0–3 only; FW 8×8 model |
| B20 | **CONFIRMED** | Firmware | High | NMEA 64B overflow + OOB null | unbounded `nmea_idx`; `buf[len]=0` |
| B21 | **CONFIRMED** | Firmware | Medium | Only `$GPRMC` (hygiene) | misses `$GNRMC` |
| B22 | **CONFIRMED** | Firmware | Medium | No A/V validity (hygiene) | status discarded |
| B23 | **CONFIRMED** | Firmware | Medium | No NMEA checksum (hygiene) | no XOR check |
| B24 | **CONFIRMED** | Firmware | Medium | No settle after expander reconfig | immediate `read_inputs` |
| B25 | **REJECTED** | Driver | High | Drive-mode clear not required | DS last-1-wins |
| B26 | **CONFIRMED** | Driver | High | I2C errors ignored | helpers discard status |
| B27 | **CONFIRMED** | Firmware | Medium | No debounce / single-shot | flood with B10 |
| B28 | **CONFIRMED** | Firmware | Medium | Time frozen after first fix | `!time_fixed` gate |
| B29 | **CONFIRMED** | Firmware | High | SD fail `while(1)` before LED outputs | silent brick |
| B30 | **CONFIRMED** | Schematic | High | True RST/SAFEBOOT float NC; no pulls | pins 1/8 NC; MCU on USB pads |
| B31 | **CONFIRMED** | PCB/Power | High | L7805 ~7 V drop, weak thermal | DPAK continuous 12→5 |
| B32 | **CONFIRMED** | PCB/Power | High | +3.3 V only Teensy LDO budget risk | multi loads, no discrete LDO |
| B33 | **CONFIRMED** | PCB | Medium | Weak U4 local decoupling | distant 100n, no bulk |
| B34 | **REJECTED** | PCB | Low | Not phantom connectors — Teensy silk | U2 `fp_text` |
| B35 | **CONFIRMED** | PCB | High | C6 / MAX2679 courtyard overlap | measured AABB |
| B36 | **PARTIAL** | PCB | Medium | 0.127 mm CBL tracks; 0.2 rule not in file | geometry yes, rule no |
| B37 | **PARTIAL** | PCB | Medium | Zone clear 0.15; 0.2 rule not enforced | same caveat |
| B38 | **PARTIAL** | PCB | High | Edge-mount real; pin silk clip weak | no pin-number silk found |
| B39 | **PARTIAL** | PCB | Medium | Fragmentation possible, unproven | many fills ≠ net split |
| B40 | **PARTIAL** | PCB | Medium | Edge clearance fab-dependent | no copper-edge rule |
| B41 | **CONFIRMED** | Schematic | High | LNA_EN/ANT_ON open vs external MAX2679 | pin 14 open |
| B42 | **REJECTED** | PCB/Sch | Critical | Part **is** TQFP-100 | Infineon PG-TQFP-100 OPN |
| B43 | **CONFIRMED** | Firmware | Critical | SAFEBOOT held LOW → Safe Boot | HIM; `digitalWrite` LOW static |
| B44 | **DUPLICATE** | Firmware | High | Same `1<<` class as **B08** (print path) | primary **B08** |
| B45 | **REJECTED** | PCB | High | 68-pin map fiction | follows B42; optional 12×12 vs 14×14 only |
| B46 | **REJECTED** | Schematic | Medium | D_SEL open = UART (desired) | NEO-M8 DS Table 6 |
| B47 | **CONFIRMED** | Driver | Medium | 8-port read; NC ports 5–7 pollute | mask not limited to 40 pins |
| B48 | **PARTIAL** | Firmware | Medium | No explicit fsync; `close()` usually flushes | wording overstates happy path |
| B49 | **CONFIRMED** | Schematic | High | L1=12 nH wrong decade for bias-T choke | sch Value `12n`; want ~µH |

---

## Cluster map (dedup for scoring)

| Cluster | Members | Score as |
|---------|---------|----------|
| Shift overflow | B08, **B44** | **1 root** (B08); B44 DUPLICATE |
| Package fiction | B42, B45 | **0** (both REJECTED) |
| SAFEBOOT GPIO | B15, B43 | **2** independent (mode vs level) — staff may merge to 1 |
| Direction API | B11, B12 | **2** or **1** subsystem — both real defects |
| EXPECTED matrix | B17, B18 | B18 strong; B17 PARTIAL latent |
| LED HW/SW | B07, B14 | **2** layers |
| NMEA stack | B20–B23 | B20 strong; B21–23 hygiene (often 1 staff bucket) |
| GPS control family | B15/B43 + B30 + B04 | distinct nets/layers |

---

## Strong functional shortlist (leaderboard posture)

Prefer lead with these **after** reject list (order ≈ plant strength + independence):

1. B03 R3 SDA pull-down  
2. B04 GPS UART miswire  
3. B01 `cy.begin` never called  
4. B43 SAFEBOOT held LOW  
5. B09 OR pass logic  
6. B10 button polarity  
7. B11 + B12 direction fight  
8. B08 `1 << i` (covers B44)  
9. B18 bit-order matrix  
10. B19 Port2 / CBL linear map  
11. B07 LED no series R  
12. B20 NMEA buffer OOB  
13. B15 pinMode missing (if split from B43)  
14. B14 LED pinMode  
15. B16 FAIL LED wipe  
16. B29 SD hang  
17. B30 RST/SAFEBOOT float NC  
18. B41 LNA_EN open  
19. B49 L1 12 nH  
20. B06 PARTIAL RPP topology  

**Do not lead with:** B02, B05, B13, B25, B34, B42, B45, B46.

---

## Count reconciliation (40 / 48 / 49)

| Artifact | Number | Meaning |
|----------|--------|---------|
| BUGS.md header | 40 | Stale early count |
| BUGS.md body | 1…48 | Pre-B49 prose |
| CSV / this distill | **49** | Canonical inventory size |
| README/PR | 48 | Lagged branding |
| This SSoT CONFIRMED | **32** | Truthful positives |
| Leaderboard-grade unique strong | **~18–22** | After reject + dedup |

---

## Source confidence

| Claim class | Confidence |
|-------------|------------|
| B02/B13/B42/B45/B05/B46/B25 REJECTED | **high** — multi-source datasheet + driver/pcb batches |
| B01/B03/B08 labrat-gated | **high** |
| B11/B12 call-site brick | **high** |
| B17 PARTIAL mechanism | **high** (fw matrix analysis) |
| B06 PARTIAL body-diode wording | **medium–high** (scout + sch topology) |
| PCB PARTIAL rule claims | **medium** (geometry yes; project rules absent) |
| Staff will award exactly N points | **unverified** (scoreability heuristic only) |

---

## Artifacts

| File | Role |
|------|------|
| `distill/BUG_VERDICTS.md` | This SSoT narrative + table |
| `distill/verdicts.csv` | Machine rows: ID,Verdict,Area,OneLine,PrimaryEvidence |

**Duplicates collapsed:** batch findings + connector clusters → **49 unique IDs** with **1 explicit DUPLICATE** (B44→B08) and **8 REJECTED** false plants.

---

*gx-distiller-r1 complete. Judge resolutions override batch conflicts.*
