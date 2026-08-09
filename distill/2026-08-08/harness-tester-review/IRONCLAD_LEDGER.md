# IRONCLAD LEDGER — 2× first-place campaign (xbgst)

**Date:** 2026-08-08  
**Target:** 2 × LB #1 = **48** staff-scored unique bugs (current #1 = **24**)  
**Sources:** official `commaai/harness_tester_challenge` firmware + KiCad; local reaudit; public **daulet** council ledger (LB 20)

---

## Judge ruling on “2× first place”

| Claim | Verdict |
|-------|---------|
| Staff unique show-stopper ceiling (public evidence) | **~21–24** (two independent #1s at 24; daulet council strict core ~21) |
| README intent | “handful of intentional show-stoppers” per schematic / PCB / firmware — **not** 40–50 hygiene nits |
| **2× = 48 unique intentional plants** | **Not achievable under published staff metric** without inventing rejects (B02/B05/B13/68-pin/etc.) |
| What *is* achievable | **(A)** Max out **≥24 ironclad unique roots** with zero false Criticals (beat #1 on **truth density**); **(B)** File **48 catalog rows** only if clearly tiered so staff can accept ~24 without credibility death |

**Axes kept:** ironclad_count · truthfulness · uniqueness · evidence density  
**Pareto:** Prefer truthfulness over inflated count. A clean **24–26** beats a dirty **48**.

---

## Tier definitions

| Tier | Meaning | Counts toward “2× staff score”? |
|------|---------|----------------------------------|
| **IRONCLAD** | Netlist/PCB/firmware + datasheet; independent root; show-stop or hard functional lie | **YES** (primary) |
| **STRONG** | Real defect; may merge with another root or soft severity | Partial credit |
| **SOFT** | Hygiene / conditional / improvement-shaped | Usually **NO** |
| **REJECT** | False or datasheet-disproved | **NEVER file as Critical** |

---

## IRONCLAD unique roots (truth-locked) — **26**

These are independently evidenced on the official tree. Merge rules noted.

| # | ID | One-line | Evidence anchor |
|--:|----|----------|-----------------|
| 1 | **I01** / B01 | `cy.begin()` never called | `firmware.ino` object only; no `cy.begin` |
| 2 | **I02** / B20 | NMEA 64B unbounded + OOB `buf[len]=0` | `firmware.ino:118-126,73-74` |
| 3 | **I03** / B08 | `1 << i` / `1 << j` 32-bit for pins→39 | `firmware.ino:144,152` |
| 4 | **I04** / B11∪B12 | DIR all-OUT then all-IN destroys stimulus | `CY8C9560.cpp:61-84` + call site |
| 5 | **I05** / B09 | OR pass: any row match ⇒ harness PASS | `firmware.ino:142-156` |
| 6 | **I06** / B16 | FAILED wiped by `set_status(GOOD)` next loop | `firmware.ino:133-135,163` |
| 7 | **I07** / B04 | GPS UART same-direction (TX–TX / RX–RX) | PCB/sch nets Teensy Serial1 ↔ U3 TXD/RXD |
| 8 | **I08** / B03 | R3 = **SDA pull-down** to GND | PCB R3 pad1=GND pad2=CY_SDA; R2 OK to +3.3 |
| 9 | **I09** / B07 | RGB channels no series resistors | LED_* = D3 cathodes + GPIO only |
| 10 | **I10** / **B70★** | **D3 common anode island** — pad1 net +3.3V but only 3-node copper island, not main rail | PCB D3 pad1; BFS net5: component size 3 vs rail 6+ |
| 11 | **I11** / B10 | Button polarity inverted (return on LOW) | R4 pull-up + SW to GND; `== LOW` return |
| 12 | **I12** / **B71★** | **MAX2679 VCC = VCC_RF (~3.2 V) over abs max (~2.2 V)** | PCB U5 A1 = `Net-(U3-VCC_RF)`; C6 also on that net |
| 13 | **I13** / B21 | Only `$GPRMC`; default NEO multi-GNSS is `$GNRMC` | `process_nmea`; no UBX reconfig |
| 14 | **I14** / B19 | Port2 only 4 GPIOs; linear `i` ≠ CBL_20+ packing | FW 8×8 packing vs U4 Port2 nibble / CBL map |
| 15 | **I15** / B14 | LED pins never `pinMode(OUTPUT)` | setup omits 5/6/7 |
| 16 | **I16** / **B72★** | **Physical R/B dies swapped** — pad2=`LED_B`, pad4=`LED_R` vs ASMB-KTF0 red=pad2 blue=pad4 | PCB D3 pads 2/4 nets |
| 17 | **I17** / **B73★** | **D2 is Schottky PMEG10020ELR on Q1 G–S**, not VGS Zener clamp | sch value; PCB D2 between +12V and gate net |
| 18 | **I18** / **B74★** | **U4 land = TQFP-100_12×12_P0.4** vs real AXI/T **14×14 / 0.50 pitch** | footprint string; Infineon package (≠ rejected “68-pin only”) |
| 19 | **I19** / B18∪B52 | EXPECTED matrix vs `1<<i` bit-order **and/or** non-closure under MSB map | matrix + offline asymmetry/diag |
| 20 | **I20** / B50 | Compare never masks to 40 bits; upper port bits poison `==` | `values & ~output_mask` vs 40-bit EXPECTED |
| 21 | **I21** / B43 | `digitalWrite(SAFEBOOT, LOW)` holds Safe Boot if pin is driven | `firmware.ino:106` + u-blox HIM |
| 22 | **I22** / B53 | I2C addr `0x20` assumes A1/A2=0 but A1→CBL_19 A2→CBL_17 | `CY8C9560.h` + U4 pads |
| 23 | **I23** / B30 | True ~RST/~SAFEBOOT float NC (no external pull) | sch NC on module control pads (when not MCU-driven) |
| 24 | **I24** | RF front-end chain bugs cluster: L1=**12n** bias-T (B49) + weak RF path | sch L1 value `12n`; LNA path |
| 25 | **I25** / B61 detail | Quantified CBL_20–39 ↔ wrong expander bits (table form of I14) | PCB CBL nets vs port packing |
| 26 | **I26** | `set_status` active-low OK for common-anode **only if anode powered** — anode island (I10) makes LED path double-fault | D3 pad1 island + no series R |

**★ = newly promoted / previously missing vs VeigaPunk CSV**

**Ironclad unique count (merge I04 as one, I19 as one, I14∪I25 as one, I26 folds into I10/I09): ~22–24**  
**Expanded without merge: 26**

This lands **at or just above #1**, not 2×.

---

## Strong but not free ironclad (do not count as free +1 each toward 48)

| ID | Note |
|----|------|
| B15 pinMode GPS | daulet council **REJECT** as deterministic failure |
| B29 SD `while(1)` | **REJECT** as show-stop (requires failed media) |
| B22/B23 RMC validity/checksum | often **merged** into one validation root |
| B27 held button re-test | boundary / after polarity fix |
| B31 L7805 thermal | council **REJECT** (load/Rθ unproven) |
| B32 3V3 budget | risk, not proven brownout |
| B35 courtyard C6/U5 | council: copper OK, courtyard only |
| B06 Q1 S/D “blocks power” | council **REJECT** — topology is correct RPP |
| B48/B61 SD write ignore / UART starve | warning tier in daulet 24-pack |

---

## Forever REJECT (do not refile Critical)

B02 XRES polarity · B05 VDD_USB→GND · B13 family 0x04 · B25 drive-mode clear · B34 phantom silk · B42/B45 “68-pin only” · B46 D_SEL float · V_BCKP→3V3 invalid · Q1 “backwards kills all power”

---

## Path options to “look like 48”

| Option | How | Risk |
|--------|-----|------|
| **A. Honest #1 hunt** | Submit **24–26 IRONCLAD only**, evidence-perfect | Max staff score ≈24; may tie/win prize band |
| **B. Tiered 48** | 24 IRONCLAD + 12 STRONG + 12 SOFT clearly labeled | Staff grades ~24; credibility OK if tiers explicit |
| **C. Fake 48 Critical** | Re-inflate rejects + splits | **Loses** (Johannes-style 9/22 cut; daulet 44 rejects) |

**xbgst pick: A + optional B.** Do **not** do C.

---

## Gap to 2× under staff metric

```
staff_ceiling ≈ 24
our_ironclad  ≈ 22–26  (after merge discipline)
2× target     = 48
gap           = ~22–26 plants that do not exist as independent show-stoppers
```

Further hunting should **verify residual PCB RF / ESD / power-bulk** items as STRONG, not force IRONCLAD.

---

## Next execution (if continue)

1. Rewrite public `BUGS.md` / CSV: kill REJECT rows; add ★ plants B70–B74.  
2. One evidence paragraph per IRONCLAD (daulet style).  
3. Form resubmit with **count = ironclad unique**, not 49.  
4. Optional secondary sheet “soft findings” for completeness.

---

*gx-judge · campaign 2× · truth-locked*
