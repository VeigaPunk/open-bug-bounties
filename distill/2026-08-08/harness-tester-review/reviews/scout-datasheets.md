# Scout datasheet cross-check — harness tester bugs

**Role:** gx-scout-cy8  
**Date:** 2026-08-08  
**Scope:** External datasheet truth for B13, B42, B45, B05, B43, B41, B46, B06  
**Method:** Infineon/Cypress CY8C95xxA DS 38-12036 Rev. *I, u-blox NEO-M8 DS UBX-13003366 + HIM UBX-13003557, Vishay SiSS27DN DS Doc 62847; Exa + PDF extract.

---

## Summary table

| bug_id | claim (short) | datasheet_support | verdict on claim |
|--------|---------------|-------------------|------------------|
| **B13** | Device ID check `0x06` wrong; CY8C9560A family is `0x04` | **NO** | **REFUTE** — family high-nibble is **6** for CY8C9560A; `0x04` is CY8C9540A |
| **B42** | CY8C9560A only ships 68-pin; TQFP-100 footprint is fiction | **NO** | **REFUTE** — official OPN **CY8C9560A-24AXI/T = PG-TQFP-100** |
| **B45** | 100-pin symbol pin map ≠ real 68-pin silicon → all CBL invalid | **NO** | **REFUTE** root “68-pin only”; 100-pin pinout is real. **PARTIAL** side note: PCB uses `TQFP-100_12x12mm` vs real **14×14 mm** body |
| **B05** | VDD_USB→GND wrong; must be VCC | **NO** | **REFUTE** — if USB unused, **must** tie VDD_USB to **GND** |
| **B43** | SAFEBOOT held LOW → Safe Boot, no GNSS | **YES** | **SUPPORT** — active-low at startup; leave OPEN for normal boot |
| **B41** | LNA_EN/ANT_ON unconnected while external LNA path present | **PARTIAL** | **PARTIAL** — pin 14 **ANT_ON** is external-LNA control; float is legal but no module control of MAX2679 EN |
| **B46** | D_SEL float = undefined interface | **NO** | **REFUTE** — open/high selects **UART + DDC** (desired for UART) |
| **B06** | SiSS27DN S/D swapped for reverse-polarity ideal diode | **YES** / **PARTIAL** | **SUPPORT** pinout + classic RPP topology (S=input); **PARTIAL** on “body diode blocks all power” (D→S body diode still forward-biases input→load) |

Legend: **YES** = datasheet supports the bug claim as written; **NO** = datasheet refutes the claim; **PARTIAL** = mixed/conditional.

---

## 1. CY8C9560A packages (B42 / B45)

### Finding

**TQFP-100 is a real, preferred package for CY8C9560A**, not a 68-pin-only part.

### Sources / quotes

1. Infineon product page CY8C9560A-24AXIT:  
   - https://www.infineon.com/part/CY8C9560A-24AXIT  
   - *“Infineon Package: **PG-TQFP-100** … Package Name: **TQFP-100 (51-85048)**”*

2. Family datasheet (38-12036 Rev. *I), contents / pinouts:  
   - https://www.infineon.com/assets/row/public/documents/30/49/infineon-cy8c9520a-cy8c9540a-cy8c9560a-20--40--and-60-bit-i-o-expander-with-eeprom-datasheet-en.pdf?fileId=8ac78c8c7d0d8da4017d0ebd16ae2f29  
   - TOC: *“28-Pin Part Pinout … 48-Pin Part Pinout … **100-Pin Part Pinout**”*  
   - *“Table 5. **100-Pin Part Pinout (TQFP)** … Figure 4. **CY8C9560A 100-Pin Device**”*  
   - Packaging: *“**100-pin TQFP (14 × 14 × 1.0 mm)** … Package Outline **51-85048**”* (also cited via distributor mirrors of same DS).

3. DigiKey / catalog: *“Supplier Device Package: **100-TQFP (14x14)**”*  
   - https://www.digikey.ie/en/products/detail/infineon-technologies/CY8C9560A-24AXI/1640248

Family also has smaller packages for **fewer GPIO** siblings (e.g. 28-pin CY8C9520A, 48-pin CY8C9540A). **No datasheet statement that CY8C9560A is “68-pin only.”** Challenge schematic already uses `CY8C9560A-24AXIT` (correct OPN for TQFP-100).

### Footprint nuance (not the submitted B42/B45 text)

KiCad instance footprint: `Package_QFP:TQFP-100_12x12mm_P0.4mm`  
Real silicon outline: **14×14 mm** TQFP-100.  
→ Mechanical land-pattern body size may be wrong even though **100-pin part is valid**. That is a **weaker, separate** packaging issue—not “part does not exist in 100-pin.”

### Bug mapping

| ID | Support | Note |
|----|---------|------|
| B42 | **NO** | Claim “only 68-pin” is false. |
| B45 | **NO** (root) / **PARTIAL** (12×12 vs 14×14) | 100-pin pin map exists for this OPN; body size mismatch is separate. |

---

## 2. Device ID register 0x2E family nibble (B13)

### Finding

Firmware check `read_id() == 0x06` with `read_id = (REG_DEVICE_ID_STATUS >> 4) & 0x0F` is **correct for CY8C9560A**.  
Claimed “family `0x04`” matches **CY8C9540A**, not 9560A.

### Source / quote

Datasheet **Device ID/Status Register (2Eh)** (same Infineon DS / mirrors, e.g. https://by.infinite-electronic.net/datasheet/ca-CY8C9560A-24AXIT.pdf):

> *“This register stores device identifiers (2xh/4xh/6xh) … The **high nibble is always equal to 2 for CY8C9520A, 4 for CY8C9540A, and 6 for CY8C9560A**. This register is read-only.”*

> *Table 13 … Bit 7–4: **Device Family (2, 4, or 6)** … Bit 0: FD/UD*

### Firmware (challenge)

```text
// CY8C9560.h
#define REG_DEVICE_ID_STATUS 0x2E
// CY8C9560.cpp
return read_id() == 0x06;
return (read_register(REG_DEVICE_ID_STATUS) >> 4) & 0x0F;
```

Expected high-nibble after shift: **0x6** (often written 0x06). Low nibble is FD/UD status, not family.

### Bug mapping

| ID | Support | Note |
|----|---------|------|
| B13 | **NO** | **REFUTE** — 0x06 is right; 0x04 is wrong family. |

---

## 3. NEO-M8N: VDD_USB, SAFEBOOT, ANT_ON/LNA_EN, D_SEL (B05, B43, B41, B46)

### Sources

- Data sheet: https://content.u-blox.com/sites/default/files/NEO-M8_DataSheet_%28UBX-13003366%29.pdf (UBX-13003366)  
- Hardware Integration Manual: https://content.u-blox.com/sites/default/files/NEO-M8_HardwareIntegrationManual_%28UBX-13003557%29.pdf (UBX-13003557 R08)

### 3.1 VDD_USB (B05)

**HIM §1.3.3:**

> *“**VDD_USB** supplies the USB interface. **If the USB interface is not used, the VDD_USB pin must be connected to GND.**”*

Netlist evidence: `GND` includes `U3.7 (VDD_USB_7)`. Design uses UART (pins 20/21), not USB → **GND is datasheet-correct**.  
Claim “must be VCC not GND” is **false** for non-USB use (VCC only if USB powered).

| ID | Support |
|----|---------|
| B05 | **NO** — **REFUTE** |

### 3.2 SAFEBOOT_N (B43)

**DS Table 5 pin 1:**

> *“SAFEBOOT_N (for future service, updates and reconfiguration, **leave OPEN**)”*

**HIM I/O:**

> *“If the **SAFEBOOT_N** pin is **“low” at start up**, the u-blox M8 module **starts in Safe Boot Mode and doesn’t begin GNSS operation**.”*

Firmware (`firmware.ino`): `digitalWrite(PIN_UBX_SAFEBOOT, LOW);` with pin never forced high for normal run → holds active-low safeboot condition.

| ID | Support |
|----|---------|
| B43 | **YES** — **SUPPORT** |

### 3.3 Pin 14 ANT_ON / LNA_EN (B41)

**DS Table 5 pin 14 (NEO-M8N):** *“**ANT_ON** … Antenna control”* (KiCad symbol names this **LNA_EN** — same pad).

**HIM:**

> *“**ANT_ON: Antenna ON (LNA enable)** … system can turn on/off an **optional external LNA** using the ANT_ON signal … **A pull-down resistor (10 kOhm) is required** to ensure correct operation in backup mode…”*  
> *“ANT_ON (antenna on) can be used to turn on and off an optional external LNA.”*

Leaving pad open: allowed as a bare pin state, but **module cannot drive external MAX2679 enable**. Severity depends on whether MAX2679 EN is hard-tied high elsewhere (schematic review, not pure datasheet). Datasheet **supports** that this pin is the intended external-LNA control.

| ID | Support |
|----|---------|
| B41 | **PARTIAL** |

### 3.4 D_SEL (B46)

**DS §3.1 / Table 6:**

> *“If **D_SEL is set high or left open**, **UART and DDC become available**. If D_SEL is set low … SPI.”*

Open is the **defined default for UART**. Floating is not “undefined” for interface select (internal pull / open = UART).

| ID | Support |
|----|---------|
| B46 | **NO** — **REFUTE** |

---

## 4. SiSS27DN P-channel pinout & reverse-polarity (B06)

### Pinout (datasheet)

Vishay Siliconix **SiSS27DN**, Document Number **62847**  
URL: https://www.vishay.com/docs/62847/siss27dn.pdf  
(KiCad symbol datasheet property matches this doc number.)

**PowerPAK 1212-8S bottom view labels:**

| Pins | Terminal |
|------|----------|
| **1, 2, 3** | **S** (Source) |
| **4** | **G** (Gate) |
| **5, 6, 7, 8** | **D** (Drain) |

Graphic on page 1: S on left pads 1–3, G pad 4, D pads 5–8 + drain tab.

### Challenge netlist

- `+12V` (protected rail into LDO etc.): **Q1.1/2/3 = S_1/S_2/S_3**  
- Raw input `Net-(D1-A1)` / J1: **Q1.5 = D_5**  
- Gate via R1 to GND (per bug write-up)

### Topology vs datasheet + classic RPP

**Classic P-channel reverse-polarity (gate to GND):**  
**Source = VIN (raw)**, **Drain = load**, **Gate = 0 V** so \(V_{GS}<0\) when VIN present; body diode (anode=D, cathode=S) oriented with cathode toward input.

**As drawn:** Source on protected `+12V`, Drain on raw J1 → **S/D inverted vs classic gate-to-GND RPP**.

**Body-diode caveat:** P-FET body diode is **Drain → Source**. With D=raw, S=load, diode **can forward-conduct raw → load**, so “body diode blocks all +12V” is **overstated**. FET channel orientation / ideal-diode intent may still be wrong; absolute “no power” is not guaranteed by body-diode alone.

| ID | Support |
|----|---------|
| B06 | **YES** on S/D vs classic RPP + pin identity; **PARTIAL** on “blocks power” wording |

---

## 5. Axes (godspeed)

| Axis | Result |
|------|--------|
| Package existence (100 vs 68) | **TQFP-100 real** → B42/B45 primary claims fall |
| Family ID nibble | **6 = 9560** → B13 falls |
| USB pin when unused | **GND required** → B05 falls |
| GPS boot / interface | SAFEBOOT LOW bad (B43 up); D_SEL open OK (B46 down); ANT_ON optional control (B41 partial) |
| FET pin map | S=1–3, D=5–8; netlist S on load side → B06 largely up |

---

## 6. Primary URLs (bookmark)

| Part | URL |
|------|-----|
| CY8C95xxA DS | https://www.infineon.com/assets/row/public/documents/30/49/infineon-cy8c9520a-cy8c9540a-cy8c9560a-20--40--and-60-bit-i-o-expander-with-eeprom-datasheet-en.pdf?fileId=8ac78c8c7d0d8da4017d0ebd16ae2f29 |
| CY8C9560A-24AXIT | https://www.infineon.com/part/CY8C9560A-24AXIT |
| NEO-M8 DS | https://content.u-blox.com/sites/default/files/NEO-M8_DataSheet_%28UBX-13003366%29.pdf |
| NEO-M8 HIM | https://content.u-blox.com/sites/default/files/NEO-M8_HardwareIntegrationManual_%28UBX-13003557%29.pdf |
| SiSS27DN | https://www.vishay.com/docs/62847/siss27dn.pdf |

---

## 7. Gaps

- Full mechanical drawing of Infineon TQFP-100 **pitch/body** vs KiCad `12x12 P0.4` not dimension-checked pad-by-pad (only body 14×14 catalog claim).  
- Whether MAX2679 EN is hard-wired elsewhere → modulates B41 severity.  
- Gate drive network completeness for Q1 (only R1 to GND claimed) not re-verified beyond netlist S/D.

---

**Scout complete.** Table §Summary is authoritative for dispatcher / package-reviewer merge.
