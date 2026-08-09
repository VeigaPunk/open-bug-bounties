# Sch/PCB hunt — NEW candidates (B60+)

**Role:** gx-the-revenger-sch-pcb-hunt  
**Date:** 2026-08-08  
**Sources:**  
- `/tmp/harness_tester_challenge/kicad_files/hardware_challenge.kicad_sch`  
- `/tmp/harness_tester_challenge/kicad_files/hardware_challenge.kicad_pcb`  
- `/tmp/harness_tester_challenge/firmware/{firmware.ino,CY8C9560.*}`  
- Prior catalog B01–B49 / `distill/BUG_VERDICTS.md`

**Do not re-claim REJECTED:** B02 (as sole claim — see B65 naming delta), B05, B13, B25, B34, B42, B45, B46.  
**Prior ironclad kept out of re-submit core:** B03 R3, B04 UART, B07 LED resistors (only referenced for independence).

**Method:** PCB pad→net membership is SSoT for fabricated connectivity. Schematic pin geometry requires **Y-mirror** on large symbols (Teensy, CY8, NEO-M8N, J3) to match PCB nets. Track widths / zone clearances measured from `.kicad_pcb` segments/zones.

**Axes:** (1) show-stopper electrical, (2) layout fab risk, (3) sch↔FW contract, (4) independence from catalog, (5) ironclad evidence.

---

## Summary table

| ID | One-line claim | Ironclad | Independence |
|----|----------------|----------|--------------|
| B60 | TQFP-100 **12×12 mm** footprint vs DS **14×14 mm** body | YES | Residual of REJECTED B42/B45 (different claim) |
| B61 | CBL_20–39 HW ports ≠ FW 8×8 linear bits (full pad table) | YES | Table expansion of B19 |
| B62 | **Zero mounting holes** on board | YES | New mechanical |
| B63 | **+5V has only C2=100n** — no bulk at 7805 out / Teensy VIN | YES | Distinct from B31 thermal |
| B64 | **VCC_RF / MAX2679** only **C6=1n** local | YES | Distinct from B33/B49 |
| B65 | Net `CY_RST_N` (active-low) vs FW `CY_RST` held **LOW** after pulse | YES | Naming+polarity confusion; root with B02 |
| B66 | Q1 RPP orientation **refine**: S=load D=input is **correct** P-FET RPP; B06 overstated | YES (as refine) | Corrects B06 |
| B67 | D2 = **Vgs clamp** (K→+12V, A→gate), not ideal-diode ORing controller | YES | New functional description |
| B68 | RF chain: AE1→U5→L1(12n)→C5(100n)→RF_IN — **bias-T/LNA topology odd** | YES | Extends B49 (L) + C5 role |
| B69 | **No ESD/TVS on any CBL_*** to J3 (40 exposed IO) | YES | New system-level |
| B70 | U4 **three Vdd** (32/82/83), only **two remote 100n** (~8.5 mm) | YES | Refine B33 with pad list |
| B71 | **No board tooling / fiducials** | MAYBE | Fab convenience |
| B72 | Zone **clearance 0.15 mm**, **min_thickness 0.15**; CBL tracks **0.127 mm** (measured) | YES (geometry) | Geometry of B36/B37 without false “0.2 rule” |
| B73 | **In1.Cu** pour present; one zone **net_name ""** (orphan pour) | MAYBE | Layout hygiene |
| B74 | SMAJ16A **Vr=16 V on 12 V rail is OK** — standoff hunt is **not a bug** | N/A anti-claim | Prevents bad submit |
| B75 | D1 physical: pad1 (KiCad cathode) on input, pad2 on GND — **polarity OK** if assembled to silk | MAYBE | Anti B “TVS reverse” unless silk wrong |
| B76 | Teensy **FW pin map matches PCB** (LED/BTN/GPS/CY) | N/A verified OK | Closes “pin map mismatch” hunt |
| B77 | **Wire2** pins 24/25 = U2.16/17 = CY_SCL/SDA — matches `#define WIRE Wire2` | N/A verified OK | Closes I2C pin hunt |
| B78 | MAX2679 **WLP-4 has no EN** — always on with VCC_RF; no strap pin | N/A verified | Closes EN-strap hunt |
| B79 | U3 **V_BCKP (pad22) = +3.3V** with VCC — not floating; no battery backup | MAYBE | Intentional? cold-start only |
| B80 | J3 **edge-mount** overhang past Edge.Cuts (~x 174→222); **no pin-number silk** | YES (geometry) | Refine B38 |
| B81 | **C7=10u on +12V** is only bulk on input domain; still **no µF on +5V** | YES | Pairs B63 |
| B82 | RF **C5=100n** series (decade wrong for intentional RF DC-block design; AC-short at L1) | MAYBE | With B68/B49 |
| B83 | **Courtyard cluster** U5/C6/L1/C5 (C6/U5 already B35) — RF parts stacked | YES | Extends B35 |
| B84 | Harness IO assumed **dry 3.3 V** — no series R / clamp if cable sees 12 V | MAYBE | System assumption |
| B85 | Q1 gate: **R1=1k to GND only** — no series Rg from a driven node; hard −12 V Vgs | MAYBE | RPP detail |
| B86 | **A0 (U4.30)=GND** → addr 0x20 matches `0b0100000` — OK (not a bug) | N/A | Verified |
| B87 | Ports **6–7 and P5.4–7 unconnected** on HW; FW still DIR/drive all 8 ports | YES | Pairs B47 at HW layer |
| B88 | **No fuse** on 12 V input (TVS + FET only) | MAYBE | Protection completeness |
| B89 | Board outline **~61×71 mm**; Teensy pads ~1.3 mm to edge | MAYBE | Refine B40 |
| B90 | LED **common anode +3.3V** + active-low FW — correct polarity, still **no Rs** | YES | Layer split from B07 (topology OK, Rs missing) |

**Candidate count with ironclad YES (submit-worthy new/refine):** B60,B61,B62,B63,B64,B65,B66,B67,B68,B69,B70,B72,B80,B81,B83,B87,B90 → **17**  
**Plus MAYBE:** B71,B73,B79,B82,B84,B85,B88,B89 → **8**  
**Anti-claims / verified OK (do not file as bugs):** B74,B75?,B76,B77,B78,B86  

**Total distinct hunt entries:** 31 (≥20 target).

---

## B60 — TQFP-100 footprint body 12×12 vs datasheet 14×14

**Claim:** PCB uses `Package_QFP:TQFP-100_12x12mm_P0.4mm` while CY8C9560A-24AXIT (PG-TQFP-100) is a **14×14 mm** body (pitch 0.4 mm still). Pads may not match lead landing of real package.

**Evidence:**  
- PCB footprint name + F.Fab body ≈ 12.2×12.2 (pcb-batch).  
- Infineon DS / Digi-Key: TQFP-100 **14×14**.  
- Pitch 0.4 mm correct; **outline/land pattern scale wrong**.

**Ironclad:** YES (package outline).  
**Independence:** REJECTED B42/B45 claimed “68-pin only / cannot mount” — **false**. This is the **residual true** package-outline defect.

---

## B61 — CBL_20–39 bit packing vs firmware 8×8 linear model

**Claim:** Hardware maps CBL_n to expander ports with **Port2 only 4 bits**, then Port3… Port5. Firmware treats pins as `port=i/8`, `bit=i%8` over 40 indices → **misaligned from CBL_20 upward**.

**Evidence (PCB pad → symbol pin name → FW linear):**

| CBL | U4 pad | HW | FW 8×8 | |
|-----|--------|----|--------|---|
| 0–19 | … | P0.0–P2.3 | P0.0–P2.3 | OK |
| 20 | 8 | **P3.0** | P2.4 | **MIS** |
| 21 | 9 | P3.1 | P2.5 | MIS |
| 22 | 10 | P3.2 | P2.6 | MIS |
| 23 | 11 | P3.3 | P2.7 | MIS |
| 24–27 | 16–19 | P3.4–7 | P3.0–3 | MIS |
| 28–31 | 67,66,64,63 | P4.0–3 | P3.4–7 | MIS |
| 32–35 | 59–56 | P4.4–7 | P4.0–3 | MIS |
| 36–39 | 53,52,22,23 | P5.0–3 | P4.4–7 | MIS |

J3 PCB: pad1=`CBL_0` … pad40=`CBL_39` (sequential). Connector numbering is fine; **expander packing** is not.

**Ironclad:** YES.  
**Independence:** Same root family as **B19**; this entry is the **measured full table** for submission wording.

---

## B62 — No mounting holes

**Claim:** Board has **no** mounting-hole footprints (M2/M3/etc.).

**Evidence:** Full footprint inventory of PCB — no `MountingHole*` / `Hole_*`. Outline only Edge.Cuts rectangle ~61×71 mm + edge connectors.

**Ironclad:** YES (mechanical).  
**Independence:** New; not in B01–B49 as confirmed.

---

## B63 — Missing bulk capacitance on +5V

**Claim:** +5V rail has **only C2=100n** (0402) at U1 output / Teensy VIN path. No 10µF-class bulk for load steps / 7805 stability margin under Teensy current pulses.

**Evidence:** PCB nets: `+5V` → C2.1, U1.3, U2.48 only. C1=1u and C7=10u are on **+12V**, not +5V.

**Ironclad:** YES.  
**Independence:** B31 is thermal drop; this is **PDN bulk on 5V**.

---

## B64 — VCC_RF / LNA supply under-decoupled (C6=1n only)

**Claim:** Net `Net-(U3-VCC_RF)` powers U3.9 and MAX2679 A1 with **only C6=1n** to GND.

**Evidence:** PCB: C6.1=VCC_RF, C6.2=GND, value **1n**; U5.A1 and U3.9 on same net. No 100n/1u on that net.

**Ironclad:** YES.  
**Independence:** B33 is U4 3V3; B49 is L1 value.

---

## B65 — CY_RST_N naming vs firmware polarity

**Claim:** Schematic/PCB net is **`CY_RST_N`** → U4.62 `RESET_N` (active-**low**). Firmware define is **`CY_RST`** (no `_N`); `begin()` drives HIGH 10 ms then **leaves LOW** → chip held in reset forever if `begin()` runs.

**Evidence:**  
- PCB: `CY_RST_N`: U2.44, U4.62.  
- `CY8C9560.h`: `#define CY_RST 22`.  
- `CY8C9560.cpp`: `digitalWrite(CY_RST, HIGH); delay(10); digitalWrite(CY_RST, LOW);` — never releases.

**Ironclad:** YES (behavior).  
**Independence:** Overlaps **B02** (driver holds reset). **New angle for sch/FW contract:** correct `_N` net name vs misleading `CY_RST` and final LOW. Submit as **naming + polarity confusion** only if B02 already filed — or merge into one staff bug.

---

## B66 — Q1 reverse-polarity FET orientation (B06 refine)

**Claim (refined):** SiSS27DN **P-FET** with **Source on +12V (load side)** and **Drain on raw jack** is the **standard high-side reverse-polarity** orientation. Body diode cathode at source (load), anode at drain (input): blocks reverse input; conducts on correct polarity until channel enhances. **B06 “S/D swapped blocks +12V” is overstated/likely wrong** for RPP intent.

**Evidence:**  
- PCB: Q1.1–3 = `+12V`, Q1.5 = `Net-(D1-A1)` (J1 center), Q1.4 gate = `Net-(D2-A)`.  
- R1=1k gate→GND → Vgs≈−12 V when rail up → channel ON.  
- README design goal: reverse polarity protection.

**Ironclad:** YES as **refine / possible reject of B06**.  
**Independence:** Corrective finding.

---

## B67 — D2 PMEG10020ELR role (gate clamp)

**Claim:** D2 cathode on `+12V`, anode on gate net with R1 to GND → **clamps gate to source rail** (Vgs protection / anti-overvoltage), **not** a series ideal-diode power path.

**Evidence:** PCB: D2.1=`+12V`, D2.2=`Net-(D2-A)` shared with Q1.4 and R1.1.

**Ironclad:** YES.  
**Independence:** New clarity; residual risk if someone “removes D2 as redundant diode.”

---

## B68 — Antenna RF chain topology (C5/L1/U5)

**Claim:** RF path is **AE1 → MAX2679 RFIN → RFOUT → L1 (12 nH) → C5 (100 nF) → U3 RF_IN**, with LNA VCC from module **VCC_RF**. L1 is wrong decade for a bias-T choke (see B49); C5 is a **series** element at 100 nF (RF short, not a typical pF matching/DC-block design); external LNA not controlled by LNA_EN (B41).

**Evidence:** PCB nets:  
- `Net-(AE1-A)`: AE1.1, U5.B1  
- `Net-(L1-Pad2)`: U5.A2, L1.2  
- `Net-(C5-Pad2)`: L1.1, C5.2  
- `Net-(U3-RF_IN)`: C5.1, U3.11  
- `Net-(U3-VCC_RF)`: U3.9, U5.A1, C6.1  
- L1 value **12n**, C5 **100n**

**Ironclad:** YES (topology + values).  
**Independence:** Combines RF path; L1 value already B49 — cite together or submit as **RF front-end chain**.

---

## B69 — No protection on harness pins

**Claim:** All 40 `CBL_*` nets go **U4 GPIO ↔ J3** with no series R, TVS, or clamp. External cable faults can destroy expander / inject voltage into 3.3 V domain.

**Evidence:** PCB membership: each CBL_* only J3.n + U4.pad (no R/D on those nets).

**Ironclad:** YES as design gap (severity design vs “Monday bug” TBD).  
**Independence:** New.

---

## B70 — Missing per-Vdd decoupling on U4 (pad-level)

**Claim:** U4 Vdd pads **32, 82, 83** all on +3.3V; only **C3 and C4** (100n each) exist on +3.3V near board, **~8.5 mm** from U4 center — not one cap per Vdd pin, no bulk.

**Evidence:** PCB distances U4–C3≈8.45 mm, U4–C4≈8.78 mm; +3.3V caps list: C3, C4 only (plus far C for other parts).

**Ironclad:** YES.  
**Independence:** Pad-explicit form of **B33**.

---

## B71 — No fiducials / tooling holes

**Claim:** No fiducial footprints for SMT alignment.

**Evidence:** Footprint list has no Fiducial_*.

**Ironclad:** MAYBE (process, not functional).  
**Independence:** New.

---

## B72 — Measured track/zone geometry (no false rule claim)

**Claim:**  
- Essentially all `CBL_*` segments **width = 0.127 mm**.  
- Zones: **clearance = 0.15 mm**, **min_thickness = 0.15 mm**.  
- Power: +12V/+5V segments **0.8128 mm**; raw input **0.8128 mm**.

**Evidence:** Segment width histogram from PCB file (see probe run).

**Ironclad:** YES for numbers.  
**Independence:** Same facts as B36/B37 but **without** inventing a 0.2 mm project rule (those were PARTIAL).

---

## B73 — Empty-net zone

**Claim:** At least one zone has `net_name ""` (unassigned pour).

**Evidence:** PCB zone block with `(net_name "")`.

**Ironclad:** MAYBE (may be intentional keep-out fill).  
**Independence:** New hygiene.

---

## B74 — SMAJ16A standoff vs 12 V (**not a bug**)

**Claim:** SMAJ16A **VRWM = 16 V** is **above** 12 V operating — correct selection for standoff. Do **not** file “16 V TVS on 12 V is wrong.”

**Ironclad:** N/A anti-claim.  
**Independence:** Hunt kill.

---

## B75 — D1 TVS pad polarity

**Claim:** Symbol pin1 `A1` → footprint pad1 on `Net-(D1-A1)`; pad2 on GND. KiCad `D_SMA` pad1 is **cathode** end → cathode on protected node, anode on GND = **correct** unidirectional TVS for positive rail. Silk stripe on pad1 side supports this.

**Ironclad:** MAYBE (depends on symbol pin naming quirks A1/A2). Prefer **not** claiming reverse TVS without bench.  
**Independence:** Hunt kill / weak.

---

## B76 — Teensy pin map vs firmware (**verified match**)

| Function | FW define | Teensy dig. pin | PCB U2 pad net |
|----------|-----------|-----------------|----------------|
| UBX RX | Serial1 | 0 | pad2 `UBX-RXD` |
| UBX TX | Serial1 | 1 | pad3 `UBX-TXD` |
| TIMEPULSE | 2 | 2 | pad4 |
| SAFEBOOT | 3 | 3 | pad5 |
| RST_N | 4 | 4 | pad6 |
| LED_R/G/B | 5/6/7 | 5/6/7 | pad7/8/9 |
| BTN | 8 | 8 | pad10 |
| CY_RST | 22 | 22 | pad44 `CY_RST_N` |
| CY_IRQ | 23 | 23 | pad45 `CY_INT` |

**Ironclad:** N/A — **no pin-number mismatch bug**.  
**Independence:** Closes hunt axis.

---

## B77 — I2C Wire2 vs SCL2/SDA2 nets (**verified match**)

**Claim:** `WIRE Wire2` is correct for Teensy 4.1 pins 24/25; PCB U2.16=`CY_SCL`, U2.17=`CY_SDA`, pull-up R2 on SCL to +3.3V (R3 wrong on SDA = B03).

**Ironclad:** N/A verified OK (bus still dead from B03).  
**Independence:** Closes hunt axis.

---

## B78 — MAX2679 EN strapping (**N/A**)

**Claim:** MAX2679 WLP-4 pins are VCC, RFOUT, RFIN, GND only — **no EN**. Always on when VCC_RF present. No strap bug.

**Ironclad:** N/A.  
**Independence:** Closes hunt axis.

---

## B79 — V_BCKP not floating

**Claim:** U3 pad22 (`V_BCKP`) is on **+3.3V** with VCC (pad23). Not floating. No backup battery → loses hot-start/time across power loss (design choice / weak bug).

**Evidence:** PCB U3.22 and U3.23 both `+3.3V`.

**Ironclad:** MAYBE (spec hygiene).  
**Independence:** New; kills “V_BCKP floating” false claim.

---

## B80 — J3 edge overhang + no pin silk

**Claim:** J3 `PinHeader_2x20_P2.54mm_Horizontal` placed for **edge hang-off** past right Edge.Cuts; footprint has **no pin-number silkscreen** (only reference/fab).

**Evidence:** pcb-batch geometry; `J3 texts []` for pin numbers; Edge.Cuts x≈119.5–180.5 vs header extending outboard.

**Ironclad:** YES (geometry).  
**Independence:** Strengthens PARTIAL B38 without false “clipped labels.”

---

## B81 — Only bulk on 12 V domain (C7)

**Claim:** Sole electrolytic-class bulk is **C7=10u on +12V**; +5V still starved (see B63). 7805 input has C1=1u + C7=10u — input OK-ish; output not.

**Ironclad:** YES.  
**Independence:** Complements B63.

---

## B82 — C5 value decade for RF series path

**Claim:** C5=**100n** as series RF element is not a conventional GNSS matching/DC-block (usually **tens of pF**). At 1.575 GHz it is ~0 Ω AC, so chain “works” as near-short + wrong L1 — design looks copy-paste passive values.

**Ironclad:** MAYBE (functional RF still couples).  
**Independence:** With B68/B49.

---

## B83 — RF courtyard density (extends B35)

**Claim:** U5, C6, L1, C5 packed within ~few mm; **C6/U5 courtyard overlap already B35**. Additional risk: L1/C5 0402 vs WLP-4 assembly.

**Evidence:** Positions: U5 (148.20, 68.44), C6 (148.20, 67.22), L1 (150.90, 68.22), C5 (152.90, 68.22).

**Ironclad:** YES (cluster).  
**Independence:** B35 is C6∩U5 only.

---

## B84 — Harness voltage domain assumption

**Claim:** Expander IO is 3.3 V CMOS to J3; car harness environments may present **12 V / load dump** if miswired — no series protection (see B69).

**Ironclad:** MAYBE.  
**Independence:** System-level.

---

## B85 — Q1 gate drive network minimal

**Claim:** Gate only **R1=1k→GND** + D2 clamp; no series gate resistor from a controlled driver, no RC soft-start. Vgs goes to −12 V (within ±20 V abs max typical for SiSS27DN) but inrush/EMI not managed.

**Ironclad:** MAYBE.  
**Independence:** RPP detail under B66.

---

## B86 — I2C address strapping OK

**Claim:** U4.30 A0 = GND → 7-bit address **0x20** matches `CY8C9560_ADDR 0b0100000`.

**Ironclad:** N/A verified OK.

---

## B87 — Unused expander ports still in FW width

**Claim:** PCB leaves Port6 (pads 86–93), Port7 (36–43), Port5 bits4–7 (20,21,54,55) **unconnected**. Driver still selects ports 0–7 and uses 8-byte registers — noise/contention risk on floating inputs when set as inputs without defined pulls on those bits.

**Evidence:** PCB `unconnected-(U4-GPort6_*)`, `GPort7_*`, GPort5 bits4–7; `read_registers(..., 8)`.

**Ironclad:** YES (HW+driver contract).  
**Independence:** HW side of **B47**.

---

## B88 — No input fuse

**Claim:** 12 V path: barrel → TVS → P-FET → 7805; **no fuse/PTC**.

**Ironclad:** MAYBE.  
**Independence:** New.

---

## B89 — Edge clearance / outline

**Claim:** Board ~**61×71 mm**; Teensy copper ~1.3 mm inside left/right edges; J1 flush to corner (edge-mount). Fab-dependent.

**Ironclad:** MAYBE.  
**Independence:** B40 refine.

---

## B90 — LED topology vs missing resistors

**Claim:** D3 common **anode on +3.3V**, cathodes `LED_R/G/B` to Teensy — correct for active-low FW (`digitalWrite(..., !(s==…))`). Bug remains **missing series resistors** (B07), not anode/cathode swap.

**Evidence:** PCB D3.1=`+3.3V`, D3.2/3/4 = LED_B/G/R → U2.9/8/7.

**Ironclad:** YES (topology OK + B07 still critical).  
**Independence:** Prevents wrong “LED reverse” claim; keeps B07.

---

## Cross-checks closed (do not invent)

| Hunt item | Result |
|-----------|--------|
| UBX labels on wrong U3 pads | **False on PCB** (Y-mirror sch matches: pad1 SAFEBOOT, pad8 RST, pad20 TXD, pad21 RXD). UART still **uncrossed** = B04. |
| USB pins for MCU control | **False on PCB** — USB_DM/DP unconnected; control on true RST/SAFEBOOT. |
| V_BCKP floating | **False** — tied to +3.3V (B79). |
| Teensy 5V IO to expander | **False** — I2C/LED domain 3.3V; expander Vdd +3.3V. |
| Wire2 vs SCL2/SDA2 | **Match** (B77). |
| MAX2679 EN strap | **No EN pin** (B78). |
| SMAJ16A vs 12V standoff | **OK** (B74). |

---

## Recommended NEW submit set (sch/PCB, avoid rejects)

Priority order for staff “Monday bugs”:

1. **B61/B19** — CBL port packing (table)  
2. **B60** — 12×12 vs 14×14 TQFP outline  
3. **B63+B81** — +5V bulk missing  
4. **B64** — VCC_RF 1n only  
5. **B68+B49** — RF chain L1/C5  
6. **B62** — no mounting holes  
7. **B69** — no harness ESD  
8. **B70/B33** — U4 decoupling pad-level  
9. **B80** — J3 silk/edge  
10. **B66** — only if correcting prior B06 language  
11. **B65** — only as merge with B02, not duplicate  

**Still critical from prior (do not drop):** B03, B04, B07, B05 (VDD_USB), B41.

---

## FINDINGS log (revenger format)

```
FINDING: TQFP land pattern 12x12 vs real 14x14 body
SOURCE: PCB footprint Package_QFP:TQFP-100_12x12mm_P0.4mm; Infineon PG-TQFP-100
CONFIDENCE: high
IMPLICATION: B60 submit; do not revive B42 68-pin fiction

FINDING: CBL_20 maps to Port3.0 not linear bit20 Port2.4
SOURCE: PCB U4.8=CBL_20; symbol GPort3_Bit0; FW i/8 model
CONFIDENCE: high
IMPLICATION: B61 table; show-stopper harness map

FINDING: +5V only C2=100n
SOURCE: PCB net +5V members C2,U1.3,U2.48
CONFIDENCE: high
IMPLICATION: B63

FINDING: Zero mounting holes
SOURCE: PCB footprint inventory
CONFIDENCE: high
IMPLICATION: B62

FINDING: Q1 S on +12V / D on jack is valid P-FET RPP
SOURCE: PCB Q1 pads; SiSS27DN P-channel
CONFIDENCE: high
IMPLICATION: Soften/reject B06 “blocks power” narrative

FINDING: MCU GPS control nets on correct NEO pads on PCB
SOURCE: U3.1/8/20/21 nets UBX-*
CONFIDENCE: high
IMPLICATION: Kill USB-miswire geometric false positive; keep B04 UART cross

FINDING: CY_RST_N net correct; FW leaves RESET asserted
SOURCE: PCB CY_RST_N; CY8C9560.cpp digitalWrite LOW sticky
CONFIDENCE: high
IMPLICATION: B65 naming note + B02 behavior
```

---

## File path

`/home/vgpnk1337/.xbgst/harness-tester-review-20260808/hunt/sch-pcb-new.md`
