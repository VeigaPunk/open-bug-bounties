# Driver-area review — B02, B11, B12, B13, B25, B26, B47

**Agent:** gx-reviewer-driver  
**Date:** 2026-08-08  
**Sources:**
- `challenge-firmware/CY8C9560.cpp`, `CY8C9560.h`
- `challenge-firmware/firmware.ino` (call sites)
- `VeigaPunk_Harness_Tester_Bugs.csv`
- Infineon/Cypress CY8C9520A/40A/60A datasheet (Doc 38-12036) — XRES polarity, Device ID 0x2E, Port Direction 1Ch, Drive Mode 1Dh–23h
- KiCad PCB netlist (`hardware_challenge.kicad_pcb`) for U4 NC pins

**Axes:** truth vs silicon · call-site effect · production blast radius

---

## Counts

| Verdict | N | IDs |
|---------|---|-----|
| **CONFIRMED** | **4** | B11, B12, B26, B47 |
| **REJECTED** | **3** | B02, B13, B25 |
| PARTIAL | 0 | — |
| DUPLICATE | 0 | — |
| OUT_OF_SCOPE | 0 | — |

**Total reviewed:** 7

---

## B02 — RESET left asserted (active-low)

**CSV:** `RESET_N left LOW (active-low); chip permanently in reset`  
**Verdict: REJECTED**

### Evidence
```3:14:challenge-firmware/CY8C9560.cpp
bool CY8C9560::begin() {
  pinMode(CY_IRQ_N, INPUT_PULLUP);
  pinMode(CY_RST, OUTPUT);
  digitalWrite(CY_RST, HIGH);
  delay(10);
  digitalWrite(CY_RST, LOW);
  delay(100);
  ...
  return read_id() == 0x06;
}
```

- `CY_RST` = Teensy pin 22 (`CY8C9560.h:9`); schematic net `CY_RST_N` → U4 pin labeled `RESET_N`.
- **Datasheet XRES (pin description):** *“Active high external reset with internal pull down.”* Full reset by **pulling XRES high**. Held low / open / tied GND = **not** in reset.
- Code: 10 ms **HIGH** (assert) then **LOW** (deassert) and leave LOW → **correct** active-high reset pulse and run state.
- Claim’s premise (active-low; LOW = permanent reset) is **inverted vs silicon**. Schematic `_N` naming is misleading, not a functional permanent-reset bug in `begin()`.

### Notes
- Separately: `cy.begin()` is **never called** from `firmware.ino` (CSV B01) — that gates init, but is not B02.
- If `begin()` *were* called, reset polarity would not brick the chip as claimed.

---

## B11 — `set_output()` forces ALL ports OUTPUT

**CSV:** `Forces ALL ports OUTPUT (DIR=0x00) → contention`  
**Verdict: CONFIRMED**

### Evidence
```77:84:challenge-firmware/CY8C9560.cpp
void CY8C9560::set_output(uint64_t pins, uint64_t values) {
  write_registers(REG_OUTPUT_BASE, values, 8);
  for (int i = 0; i < 8; i++) {
    write_register(REG_PORT_SELECT, i);
    write_register(REG_PIN_DIRECTION, 0x00);  // whole port → OUTPUT
    write_register(REG_PIN_DRIVE_MODE_BASE + DRIVE_MODE_STRONG, pins >> (i * 8));
  }
}
```

- Datasheet Port Direction (1Ch): bit **0 = output**, **1 = input**. `0x00` → **all 8 pins of every port 0–7 are outputs**, ignoring `pins` mask for direction.
- Only STRONG drive mode is applied to bits set in `pins`; direction is unconditional.
- Call site (`firmware.ino:145`): `cy.set_output(output_mask, output_mask)` then immediately `set_pd_inputs` — still a driver API defect: API cannot drive one pin as out while leaving others as inputs.
- Contention path: on shorted harness nets, whole-port OUTPUT + residual drive modes (STRONG/PD “strong high”) can fight before/without correct per-pin DIR.

### Notes
- Severity Critical is justified for a continuity tester that must never multi-drive a net.

---

## B12 — `set_pd_inputs()` forces ALL ports INPUT (undoes drive)

**CSV:** `Forces ALL ports INPUT (DIR=0xFF) undoing drive pin`  
**Verdict: CONFIRMED**

### Evidence
```61:66:challenge-firmware/CY8C9560.cpp
void CY8C9560::set_pd_inputs(uint64_t pins) {
  for (int i = 0; i < 8; i++) {
    write_register(REG_PORT_SELECT, i);
    write_register(REG_PIN_DIRECTION, 0xFF);  // whole port → INPUT
    write_register(REG_PIN_DRIVE_MODE_BASE + DRIVE_MODE_PULL_DOWN, pins >> (i * 8));
  }
}
```

Call site:
```145:146:challenge-firmware/firmware.ino
    cy.set_output(output_mask, output_mask);
    cy.set_pd_inputs(~output_mask);
```

- `set_pd_inputs` writes **DIR=0xFF for every port**, not `pins` only. Direction for the driven pin is wiped to input even when that pin is **cleared** in `~output_mask` for drive-mode bits.
- Wait — `~output_mask` has 0 at the drive pin → PD mode not applied to drive pin; **but** DIR is still 0xFF for the whole port → drive pin becomes **input** regardless.
- Net effect of the intended “drive one, sense rest” sequence: after the pair of calls, **no pin remains an output**. Continuity stimulus is structurally broken.

### Notes
- Same-root cluster with B11 (direction API design), but **independent defect** (all-in vs all-out). Both should stand for scoring unless staff merge.

---

## B13 — Device ID check 0x06 vs family 0x04

**CSV:** `Device ID check 0x06 vs CY8C9560A family 0x04`  
**Verdict: REJECTED**

### Evidence
```14:14:challenge-firmware/CY8C9560.cpp
  return read_id() == 0x06;
```
```53:55:challenge-firmware/CY8C9560.cpp
uint8_t CY8C9560::read_id() {
  return (read_register(REG_DEVICE_ID_STATUS) >> 4) & 0x0F;
}
```

- `REG_DEVICE_ID_STATUS = 0x2E` (`CY8C9560.h:17`).
- **Datasheet Device ID/Status (2Eh):** high nibble is family: **2 = CY8C9520A, 4 = CY8C9540A, 6 = CY8C9560A**. Register values described as `2xh/4xh/6xh`.
- Code extracts high nibble and compares to **0x06** → **correct for CY8C9560A**.
- Claim that family is **0x04** confuses **9540** with **9560**. Schematic part is `CY8C9560A-24AXIT`.

### Notes
- If begin were called on a real 9560 with I2C alive, ID check would pass (FD/UD low nibble is masked off by `>> 4`).
- Do not treat as init-fail root.

---

## B25 — Drive-mode bits not cleared when switching STRONG/PULL_DOWN

**CSV:** `Drive-mode bits not cleared when switching STRONG/PULL_DOWN`  
**Verdict: REJECTED**

### Evidence
- Code writes only the target drive-mode register (STRONG at `0x1D+4=0x21`, PULL_DOWN at `0x1D+1=0x1E`) with a bit mask of pins to change.
- **Datasheet Drive Mode Registers (1Dh–23h):** *“Each ‘1’ written to this register changes the corresponding line drive mode.”* Registers have **last-register priority**: the last register written with a bit high wins. Reading reflects actual mode.
- Explicit clear of the previous mode register is **not required** by the architecture. Writing `1` to STRONG or PULL_DOWN for a pin overrides the prior mode for that pin.

### Notes
- Residual risk is **direction** (B11/B12) and pins not covered by the `1` bits — not missing clears of sibling drive-mode regs.
- Linux pinctrl comment agrees: drive mode changes on writing `1`.

---

## B26 — I2C helpers ignore errors

**CSV:** `endTransmission/requestFrom/read errors ignored`  
**Verdict: CONFIRMED**

### Evidence
```17:51:challenge-firmware/CY8C9560.cpp
uint8_t CY8C9560::read_register(uint8_t reg) {
  WIRE.beginTransmission(addr);
  WIRE.write(reg);
  WIRE.endTransmission(false);   // return code discarded
  WIRE.requestFrom(addr, 1U);    // count / success ignored
  return WIRE.read();              // 0xFF-ish on empty
}
// read_registers / write_register / write_registers same pattern
```

- No check of `endTransmission()` status, `requestFrom` received length, or NACK.
- Failures surface as silent `0xFF` / no-op writes. With board I2C already fragile (e.g. R3 SDA), driver reports garbage as valid GPIO data.
- `begin()`’s ID compare can false-fail or false-pass on bus errors (read returns 0xFF → high nibble 0x0F ≠ 0x06).

### Notes
- Real reliability defect; severity High is fair. Not the unique root of a dead bus (schematic/power dominate) but driver is fail-open.

---

## B47 — `read_registers` always 8 port bytes; ports 5–7 largely NC

**CSV:** `Assumes 8 port bytes always valid; ports 5-7 largely unconnected on schematic`  
**Verdict: CONFIRMED**

### Evidence
```57:58:challenge-firmware/CY8C9560.cpp
uint64_t CY8C9560::read_inputs() {
  return read_registers(REG_INPUT_BASE, 8);
}
```

```147:156:challenge-firmware/firmware.ino
    uint64_t values = cy.read_inputs() & ~output_mask;
    ...
    if (values == EXPECTED_CONNECTIONS[i]) {
      passed = true;
    }
```

- Driver always transfers **8** input/output port bytes (GPort0–7).
- PCB nets (U4): **GPort6_Bit0–7** and **GPort7_Bit0–7** all `unconnected-(U4-…)`; **GPort5_Bit4–7** also NC (GPort5 lower bits may be used). “Ports 5–7 largely unconnected” matches copper.
- Factory default drive is **pull-up** → NC inputs tend to read **1**.
- Firmware mask is only `~output_mask` (drive pin cleared), **not** a 40-bit harness mask. For pin index `< 40`, upper bits of `~output_mask` stay 1 → NC high bits survive into `values`.
- `EXPECTED_CONNECTIONS[i]` patterns use only lower ~40 bits (upper zeros) → equality can fail solely due to ports 5–7 noise/pull-ups even if lower CBL is perfect.

### Notes
- Medium severity OK; compounds B11/B12/B09 rather than sole show-stopper. Fix: limit len to used ports and/or mask to `NUM_HARNESS_PINS`.

---

## Cross-links (driver batch)

| Topic | Takeaway |
|-------|----------|
| B02 vs B01 | B02 claim false on polarity; B01 (`begin` never called) still real |
| B13 vs B02 | Both often listed as init bricks; **both REJECTED** here |
| B11↔B12 | Sequential mutual destruction of pin direction; call site in `loop` makes B12 fatal to stimulus |
| B25 vs B11/B12 | Drive-mode “no clear” is **not** the bug; direction blanket writes are |
| B47 | Upper-byte read pollution; mask/len hygiene |

---

## State (reviewer)

- **obs:** B02 permanent-reset claim is polarity-inverted vs CY8C9560 XRES (active-high) — `CY8C9560.cpp:5-8` — severity: claim-blocker [certain]
- **obs:** B13 family ID 0x04 is wrong; 9560 high nibble is 6 — datasheet 2Eh + `read_id` — [certain]
- **obs:** B12 + call site leaves **zero** outputs after each pin test — `set_pd_inputs` DIR=0xFF — production logic brick [certain]
- **risk:** Staff may still plant-score B02/B13 from schematic `_N` / tribal “0x04” — document datasheet rebuttal [moderate]
