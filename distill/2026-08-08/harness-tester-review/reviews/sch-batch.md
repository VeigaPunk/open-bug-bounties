# Schematic batch review (gx-reviewer-schematic)

**SCH:** `challenge-kicad/hardware_challenge.kicad_sch` (KiCad 8 eeschema, version 20231120)  
**Claimed nets:** `NETLIST_EVIDENCE.md`  
**CSV:** `VeigaPunk_Harness_Tester_Bugs.csv`  
**IDs:** B03, B04, B05, B06, B07, B19, B30, B41, B46, B49  

Method: parse embedded `lib_symbols` pin geometry, instance `(at …)` placements, `(wire)`/`(junction)` graphs, `(global_label)` join-by-name, `(no_connect)`, power symbols. Cross-check `NETLIST_EVIDENCE.md` and firmware `CY8C9560` linear port model where claims span FW.

Note on coordinates: Device:R / NEO-M8N / power connectivity match standard transform. Large hierarchical symbols (Teensy4.1, CY8C9560A) match sheet wiring under **Y-mirror relative to instance origin** (`abs_y = cy − py`); pin **x** matches without mirror. Where noted, Teensy/U4 nets use that Y-mirror alignment (agrees with claimed netlist pin numbers).

---

## B03 — R3 / CY_SDA pull-down (not pull-up)

**Verdict: CONFIRMED**

**Evidence**

| Ref | Value | Placement | Pin1 net | Pin2 net |
|-----|-------|-----------|----------|----------|
| R2 | 4k7 | `(205.74, 143.51)` rot 270 | **+3.3V** (`#PWR012` at `(212.09, 143.51)`) | **CY_SDA? → CY_SCL** GL `(199.39, 143.51)` |
| R3 | 4k7 | `(205.74, 140.97)` rot 270 | **GND** (`#PWR021` at `(212.09, 140.97)`) | **CY_SDA** GL `(199.39, 140.97)` |

Wires (horizontal stubs):

- `(199.39, 143.51)→(201.93, 143.51)` and `(209.55, 143.51)→(212.09, 143.51)` → R2 between **CY_SCL** and **+3.3V** (true I²C pull-up).
- `(199.39, 140.97)→(201.93, 140.97)` and `(209.55, 140.97)→(212.09, 140.97)` → R3 between **CY_SDA** and **GND** (pull-**down**).

`NETLIST_EVIDENCE.md`:

```
### CY_SCL  → R2.2, U2.16 SCL2, U4.24 SCL
### CY_SDA  → R3.2, U2.17 SDA2, U4.28 SDA
### GND     → R3.1, …
```

**Notes:** Claim accurate. SDA is clamped/biased to GND through 4k7; SCL correctly pulled to +3.3V. Bus cannot idle high on SDA.

---

## B04 — GPS UART not crossed (TX–TX / RX–RX)

**Verdict: CONFIRMED** (connectivity broken / same-function nets; not a correct TX↔RX cross)

**Evidence**

Teensy-side global labels (x=83.82) align to U2 UART1 under Y-mirror:

| Global label | Sheet y | U2 pin (name) |
|--------------|---------|----------------|
| `UBX-RXD` | 31.75 | U2.2 `0_RX1_…` |
| `UBX-TXD` | 34.29 | U2.3 `1_TX1_…` |

`NETLIST_EVIDENCE.md` (claimed export):

```
### UBX-RXD  → U2.2 (RX1), U3.21 (RXD/SPI_MOSI)
### UBX-TXD  → U2.3 (TX1), U3.20 (TXD/SPI_MISO)
```

That pairing is **RX–RX and TX–TX** (no cross). Correct UART cross would be MCU_TX→module_RXD and MCU_RX→module_TXD.

**Geometric NEO-M8N (U3) audit (standard transform, placement `(54.61, 162.56)` rot 0):**

| U3 pin | Name | Abs pin | Sheet attachment |
|--------|------|---------|------------------|
| 20 | TXD/SPI_MISO | `(36.83, 170.18)` | **`(no_connect)`** at same point |
| 21 | RXD/SPI_MOSI | `(36.83, 167.64)` | no wire |
| 4 | EXTINT | `(36.83, 154.94)` | wire to GL **`UBX-TXD`** `(34.29, 154.94)` |
| 5 | USB_DM | `(36.83, 177.8)` | wire to GL **`UBX-RST_N`** |
| 6 | USB_DP | `(36.83, 175.26)` | wire to GL **`UBX-SAFEBOOT`** |

So either (a) netlist text is aspirational/wrong vs pin geometry, or (b) labels are on the wrong module pins **and** TXD is NC. In all readings the UART is **not** a valid crossed UART link.

**Notes:** CONFIRMED as critical UART wiring defect. Claimed “TX–TX / RX–RX” matches Teensy+claimed U3 netlist; pure geometry shows even worse mis-labeling on U3 left edge.

---

## B05 — U3 pin7 VDD_USB tied to GND

**Verdict: CONFIRMED**

**Evidence**

- Lib pin: `VDD_USB` number **7** at relative `(0, 22.86)` on `RF_GPS:NEO-M8N`.
- Instance U3 `(54.61, 162.56)` → pin at **`(54.61, 185.42)`**.
- Wire `(54.61, 185.42)→(54.61, 187.96)` into power **`GND`** `#PWR011` at `(54.61, 187.96)`.

`NETLIST_EVIDENCE.md`:

```
### GND
  R3.1
  U3.7 (VDD_USB_7)
```

**Notes:** VDD_USB must be tied to VCC (or valid USB 3.3 V rail) per u-blox; grounding disables USB PHY and is a hard schematic error. CONFIRMED.

---

## B06 — Q1 SiSS27DN P-FET Source/Drain orientation

**Verdict: CONFIRMED**

**Evidence**

- Q1 `SiSS27DN` at `(59.69, 97.79)` rot **90**, lib pins: S=1/2/3, G=4, D=5.
- `NETLIST_EVIDENCE.md`:

```
### +12V
  Q1.1 (S_1), Q1.2 (S_2), Q1.3 (S_3), …
### Net-(D1-A1)
  D1.1 (A1), J1.1, Q1.5 (D_5)
```

Sheet topology (power path y≈95.25):

- `+12V` `#PWR04` `(78.74, 93.98)` → wire through `(64.77, 95.25)` on **source side** of Q1 symbol.
- Barrel / surge path through `(54.61, 95.25)` / D1 / J1 on **drain side**.

**Notes:** Claim: for reverse-polarity P-FET, body-diode orientation is wrong when sources sit on the protected `+12V` rail and drain on the raw jack (blocks correct polarity via diode sense). Netlist + symbol pin names match the claim (`+12V=Q1.S*`, raw=`Q1.D`). CONFIRMED as drawn.

---

## B07 — D3 RGB LED missing series resistors

**Verdict: CONFIRMED**

**Evidence**

- D3 `ASMB-KTF0-0A306` / `Device:LED_ABGR` at `(36.83, 30.48)` rot 90; pins A, BK, GK, RK — **no series R\* on LED nets**.
- `NETLIST_EVIDENCE.md`:

```
### LED_B → D3.2 (BK) + U2.9 (7_RX2_OUT1A)
### LED_G → D3.3 (GK) + U2.8 (6_OUT1D)
### LED_R → D3.4 (RK) + U2.7 (5_IN2)
```

- Teensy globals (Y-mirror): `LED_R`→U2.7, `LED_G`→U2.8, `LED_B`→U2.9 — GPIO only.
- No resistor refs appear on LED_R / LED_G / LED_B nets (graph: labels + LED pins + MCU pins only).

Firmware drives LEDs as push-pull GPIO (`PIN_LED_R/G/B` 5/6/7) without external current limit.

**Notes:** CONFIRMED. (Separate anode/cathode topology quirks exist on the LED symbol wiring; claim scope is missing series R — holds.)

---

## B19 — U4 Port2 bits4–7 / linear index vs CBL_20+

**Verdict: CONFIRMED**

**Evidence (schematic pin ↔ CBL map, U4 Y-mirror):**

| CBL | U4 pin | Function |
|-----|--------|----------|
| CBL_0..7 | Port0 bit0..7 | GPIO |
| CBL_8..15 | Port1 bit0..7 | GPIO |
| CBL_16..19 | **Port2 bit0..3 only** | GPIO (P2 has 4 bits) |
| CBL_20..27 | Port3 bit0..7 | GPIO |
| (after) | U4.28 **SDA**, U4.24 **SCL** | I²C, not harness GPIO |

Port2 lib pins present: `GPort2_Bit0`…`Bit3` only (nums 47,46,44,29). **No GPort2_Bit4–7.**

Firmware (`CY8C9560.cpp`): treats expander as **8 ports × 8 bits** linear `uint64_t` (`pins >> (i * 8)`, `REG_PORT_SELECT` 0..7). Harness loop uses `NUM_HARNESS_PINS 40` with `1 << i`.

Naive linear map: bit 16–23 ⇒ Port2 bits 0–7, but:

- HW Port2 only implements bits 0–3;
- SCH `CBL_20` is **Port3 bit0** (linear bit **24** in an 8-bit-wide port model), not Port2 bit4;
- Driving “bit 20” as Port2.4 does not toggle the net labeled CBL_20.

**Notes:** Claim text (“SCL/SDA not GPIO; linear pin index wrong for CBL_20+”) is slightly compressed but directionally correct: Port2 is nibble-wide; FW linear 8-bit ports mis-align CBL indices from CBL_20 upward vs actual Port3 wiring; SCL/SDA are distinct non-GPIO pins adjacent on the sheet after P2. CONFIRMED.

---

## B30 — UBX-RST / SAFEBOOT missing external pull-ups

**Verdict: CONFIRMED**

**Evidence**

| U3 pin | Name | Attachment |
|--------|------|------------|
| 1 | `~{SAFEBOOT}` | **`no_connect`** at `(36.83, 149.86)` — floating |
| 8 | `~{RESET}` | **`no_connect`** at `(36.83, 147.32)` — floating |

No pull-up resistors to VCC on these pins. No nets named with RST/SAFEBOOT reaching pins 1/8.

Sheet globals `UBX-SAFEBOOT` / `UBX-RST_N` attach instead to **USB_DP / USB_DM** (pins 6/5) — so MCU “control” lines are also on the wrong module pins (compounding B04-class miswire).

Firmware: `digitalWrite(PIN_UBX_SAFEBOOT, LOW); digitalWrite(PIN_UBX_RST_N, HIGH);` without enabling module internal guarantees.

**Notes:** CONFIRMED — true SAFEBOOT/RESET pads are NC (float at boot); no external pulls.

---

## B41 — U3 LNA_EN unconnected (external MAX2679 present)

**Verdict: CONFIRMED**

**Evidence**

- U3 pin **14** `LNA_EN` at abs `(72.39, 167.64)`: **size-1 net, no wire, no label, no no_connect marker** (true open).
- U5 **`MAX2679`** placed at `(105.41, 162.56)` on RF path with **L1** between RF chain nodes (`L1.1`↔`C5`, `L1.2`↔`U5.B1`).
- External LNA exists while module LNA_EN is left floating (undefined enable for internal LNA vs external).

**Notes:** CONFIRMED. Claim netlist string `unconnected-(U3-LNA_EN-Pad14)` matches geometry.

---

## B46 — U3 D_SEL float

**Verdict: CONFIRMED**

**Evidence**

- U3 pin **2** `D_SEL` at abs `(36.83, 144.78)`: **no wire, no power, no no_connect**, floating.
- u-blox D_SEL selects UART vs SPI at boot; left open ⇒ interface select undefined (not forced UART).

**Notes:** CONFIRMED (medium severity as claimed). Prefer hard tie to D_SEL level that selects UART for this design.

---

## B49 — L1 = 12 nH (bias-T RF choke value)

**Verdict: CONFIRMED**

**Evidence**

- L1 instance: `(property "Value" "12n")`, `lib_id "Device:L"`, at `(91.44, 162.56)` rot 90.
- In-path between RF coupling (C5 side) and U5 MAX2679 input (`L1.1`↔`C5.2`, `L1.2`↔`U5.B1`).
- **12 nH** is RF decoupling-scale inductance, **not** a GNSS active-antenna bias-T choke (typical **~1–10 µH** class for DC feed with RF block).

**Notes:** Value confirmed in SCH. Judgment that this is a **bug** for bias-T / antenna DC feed: **CONFIRMED** (wrong decades for choke). If L1 were only a trivial RF bead on a non-bias path, severity could be debated — presence of MAX2679 + RF_IN chain supports choke intent.

---

## Counts

| Verdict | IDs | Count |
|---------|-----|------:|
| **CONFIRMED** | B03, B04, B05, B06, B07, B19, B30, B41, B46, B49 | **10** |
| PARTIAL | — | **0** |
| REJECTED | — | **0** |
| NEEDS_DATA | — | **0** |

**Batch total: 10 / 10 CONFIRMED**

---

## Cross-check artifacts

| Source | Role |
|--------|------|
| `hardware_challenge.kicad_sch` | Primary geometry / labels / NC |
| `NETLIST_EVIDENCE.md` | Claimed nets for R3, UART, VDD_USB, Q1, LEDs |
| `firmware/CY8C9560.cpp` + `firmware.ino` | Linear 8×8 port model vs Port2 nibble / CBL_20+ |
| CSV rows B03–B07, B19, B30, B41, B46, B49 | Claim text |

## Incidental (out of ID list, observed while probing)

- U3 `UBX-RST_N` / `UBX-SAFEBOOT` globals land on **USB_DM/USB_DP**, not RESET/SAFEBOOT pads.
- U3 TXD has explicit **no_connect** while EXTINT carries `UBX-TXD` label.
- These strengthen B04/B30 but are not separate CSV IDs in this batch.
