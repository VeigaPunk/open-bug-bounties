# PCB batch review — B31–B40, B42, B45

Sources:
- `challenge-kicad/hardware_challenge.kicad_pcb`
- `challenge-kicad/hardware_challenge.kicad_sch`
- `VeigaPunk_Harness_Tester_Bugs.csv`
- Infineon/Cypress DS 38-12036 Rev *I (CY8C9520A/40A/60A) + Infineon product page CY8C9560A-24AXIT

Method: direct parse of `.kicad_pcb` geometry/nets; schematic power tree; datasheet package/pinout cross-check. No full KiCad DRC GUI run.

---

## B31 — L7805 thermal (~7 V drop; DPAK no heatsink) — **CONFIRMED**

| Field | Evidence |
|-------|----------|
| Ref | U1 `L7805`, footprint `Package_TO_SOT_SMD:TO-252-2` @ (146.0, 41.5) |
| Nets | pad1=`+12V`, pad2(tab)=`GND`, pad3=`+5V` |
| Load on +5V | U2 Teensy4.1 Vin + C2 100n only |
| Drop | 12 V → 5 V ⇒ **7 V** continuous when barrel-jack powered |
| Heatsink | Tab is GND only; no dedicated thermal pad/heatsink island beyond pour. DPAK θJA typically ~30–50 °C/W with copper; continuous Teensy draw 0.2–0.5 A ⇒ **1.4–3.5 W** |

**Verdict CONFIRMED** — real continuous dissipation risk on DPAK without explicit thermal design. Severity remains design/power (not a logic short).

---

## B32 — +3.3 V only from Teensy LDO (~250 mA) — **CONFIRMED**

| Rail consumers (PCB pads on `+3.3V`) | Role |
|--------------------------------------|------|
| U2 Teensy4.1 | On-board 3.3 V LDO source for external rail |
| U4 CY8C9560A-24AXIT | I/O expander (multi-Vdd, up to tens of mA + IOL budget) |
| U3 NEO-M8N | GNSS (acquisition tens of mA class) |
| D3 LED, R2/R4 pull-ups, C3/C4 | Minor |

No independent 3.3 V regulator on board. Teensy 4.1 external 3.3 V budget is commonly cited ~250 mA. Expander + GPS simultaneous load is a **real budget risk** under cold-start GPS + GPIO activity (LNA is via `VCC_RF`/module path, not a separate +3.3 V pad — claim slightly overstates LNA as a direct +3.3 V pad, but total 3V3 domain still constrained).

**Verdict CONFIRMED** as design risk from schematic/PCB loads.

---

## B33 — U4 weak Vdd decoupling (100 n only; no bulk near multi-Vdd) — **CONFIRMED**

Datasheet 100-pin Vdd: **32, 82, 83**; Vss: **15, 34, 65, 84, 85** (DS Table 5).

PCB:
- `+3.3V` caps near-ish U4: **C3=100n** @ (169.5, 90) ≈ **8.5 mm** from U4 center; **C4=100n** @ (174.05, 73.42) ≈ **8.8 mm**
- No bulk (µF-class) on +3.3 V adjacent to U4 (C7=10u / C1=1u are on **+12V** near L7805)
- Three Vdd pins, only two remote 100 n caps

**Verdict CONFIRMED** — multi-Vdd IC with only distant 100 n and no local bulk is a real PDN weakness (not necessarily “won’t boot,” but design defect).

---

## B34 — Ethernet/USB Host silk without connectors — **REJECTED**

Silk strings `USB`, `Ethernet`, `USB Host`, `Micro SD` live on the **Teensy41 footprint** (U2 user `fp_text`), labeling ports **on the Teensy module itself**, not phantom board-level connectors.

**Verdict REJECTED** — not a board fabrication/assembly defect; module courtyard labeling.

---

## B35 — C6 / U5 (MAX2679) courtyard overlap — **CONFIRMED**

| Ref | Footprint | Position | Courtyard abs approx |
|-----|-----------|----------|----------------------|
| C6 | `C_0402_1005Metric` | (148.201, 67.222) | x 147.29–149.11, y **66.76–67.68** |
| U5 | `WLP-4_0.83x0.83mm_P0.4mm` | (148.198, 68.444) | x 146.78–149.62, y **67.02–69.86** |

Overlap region ≈ **1.82 mm × 0.66 mm** (centers ~1.22 mm apart on Y). Classic F.CrtYd collision.

**Verdict CONFIRMED** (geometry measured; full DRC not required for courtyard AABB overlap).

---

## B36 — CBL nets sub-min track width ~0.127 mm vs 0.2 mm rule — **PARTIAL**

Measured segment widths on PCB:
- **542** segments @ **0.127 mm** (includes **all CBL_*** routes sampled — CBL nets exclusively 0.127)
- Others: 0.2032 / 0.508 / 0.8128 (few)

Board file has **no embedded custom rule** stating min 0.2 mm (`rule` / `constraint track_width` empty). Zone `min_thickness`/`clearance` = 0.15. Claim vs “0.2 mm rule” is industry/default assumption, not project-enforced in this file.

**Verdict PARTIAL** — width fact confirmed; rule violation only if manufacturer/project min is ≥0.2 mm.

---

## B37 — Zone clearance 0.15 mm vs 0.2 mm design rule — **PARTIAL**

All pour zones parsed: **clearance = 0.15** (one zone clearance 0). Same caveat as B36: no project rule object forcing 0.2 mm.

**Verdict PARTIAL** — clearance value real; “vs 0.2 rule” not evidenced in board file.

---

## B38 — J3 silkscreen pin labels clipped by board edge — **PARTIAL**

- J3 = `PinHeader_2x20_P2.54mm_Horizontal` @ (174.125, 94.35) **rot −90°**
- Edge.Cuts outer bbox ≈ **x 119.5–180.5, y 30–101**
- Header long axis runs **off-board** (edge-mount): pad row to x≈222 (outside 180.5) — intentional cable connector hang-off
- Footprint silk/user texts: essentially **`${REFERENCE}` on F.Fab only** — **no pin-number silk** found to “clip”

**Verdict PARTIAL** — edge-mounted connector is real; “pin labels clipped” not evidenced (no pin-number silk). Would need DRC silk-to-edge or visual gerber to elevate.

---

## B39 — Fragmented GND copper islands — **PARTIAL**

- **7** zones; **44** `filled_polygon` (F.Cu **25**, In1.Cu **14**, B.Cu **4**, In2.Cu **1**)
- High F.Cu fill count is **consistent with** islanding/fragmentation but not proof of net-splitting or high-impedance GND without island net analysis / DRC.

**Verdict PARTIAL** — qualitative structure supports concern; not fully proven.

---

## B40 — J1 / Teensy board-edge clearance violations — **PARTIAL**

| Item | Geometry |
|------|----------|
| Edge.Cuts | ≈ (119.5, 30)–(180.5, 101) |
| J1 barrel jack | courtyard abs ≈ (119.5, 30)–(135.2, 45) — **flush to corner** (edge-mount jack, intentional) |
| U2 Teensy pads | abs ≈ x 120.78–179.20, y 47.38–62.62 → ~**1.3 mm** to left/right edges |

Copper-to-edge min not declared in file. Edge-mount jack touching outline is normal; Teensy pad clearance ~1.3 mm may pass or fail depending on fab (often 0.25–0.5 mm min). **No full DRC.**

**Verdict PARTIAL**.

---

## B42 — U4 footprint TQFP-100_12x12; “real part 68-pin only” — **REJECTED**

### What the design has
- Sch + PCB: `Package_QFP:TQFP-100_12x12mm_P0.4mm`, Value `CY8C9560A-24AXIT`, **100 pads** (1–100)
- F.Fab body ≈ **12.2 × 12.2 mm**

### What the datasheet / vendor actually ship
| Source | Fact |
|--------|------|
| DS 38-12036 Rev *I Ordering Table 30 | **CY8C9560A-24AXI / -24AXIT = 100 Pin TQFP** (60 I/O, 27K EEPROM) |
| Same DS pinouts | Packages: **28-SSOP** (9520), **48-SSOP** (9540), **100-TQFP** (9560) — **no 68-pin** |
| Same DS Fig. 12 | **100-pin TQFP (14 × 14 × 1.0 mm)** package outline |
| Infineon product page | CY8C9560A-24AXIT → **PG-TQFP-100** / TQFP-100 (51-85048) |
| Digi-Key listing | 100-TQFP **(14×14)** |

**Claim “68-pin only / cannot mount” is false.** Part is a 100-pin TQFP; design pin count matches family.

### Residual (not the claimed bug)
Body size mismatch: design **12×12 mm** footprint vs datasheet/Digi-Key **14×14 mm**. Pitch 0.4 mm is correct for 100-TQFP; land pattern may still need 14×14 library (e.g. `TQFP-100_14x14mm_P0.5mm` is wrong pitch — need correct 0.4 mm 14×14 if available). Flag as separate medium package-outline issue if pursued — **does not resurrect B42 as stated**.

**Verdict REJECTED** (stated defect false).

---

## B45 — 100-pin symbol map ≠ 68-pin pinout → CBL invalid — **REJECTED**

Depends entirely on B42’s false premise (68-pin-only silicon). CY8C9560A-24AXIT **is** the 100-pin device; 100-pin symbol/footprint family is correct.

Note (out of claim scope): spot-check of PCB nets vs DS Table 5 shows some **symbol/net oddities** (e.g. +3.3 V also on pad 31 which DS marks **DNU**; SDA appears on pads 25+28; RST on 60+62). Those would be separate pin-map bugs if confirmed in the symbol — **not** “68-pin vs 100-pin.”

**Verdict REJECTED** as filed.

---

## Counts

| Verdict | IDs | Count |
|---------|-----|------:|
| **CONFIRMED** | B31, B32, B33, B35 | **4** |
| **PARTIAL** | B36, B37, B38, B39, B40 | **5** |
| **REJECTED** | B34, B42, B45 | **3** |
| **Total reviewed** | B31–B40, B42, B45 | **12** |

(No ID left unreviewed in the assigned set; B41/B43/B44 not in scope.)

---

## Reviewer note (production blow-up)

The **one claim that would blow up if submitted as-is** is **B42/B45**: vendor + datasheet unambiguously list CY8C9560A-24AXIT as **100-TQFP**, not 68-pin. Filing that as Critical would be an own-goal on credibility. Prefer B31/B32/B35 (measured) for power/PCB findings; keep DRC-width claims as PARTIAL without project rules + DRC log.
