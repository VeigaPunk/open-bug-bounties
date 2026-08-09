# overfit-B01-B03 — empirical gates

Agent: gx-labrat-overfit  
Date: 2026-08-08  
Tree: `~/.xbgst/harness-tester-review-20260808/`

---

## Gate 1 — `rg -n 'cy\.begin|CY8C9560 cy' …/firmware.ino`

**Verdict: PASS (declaration present; `cy.begin` ABSENT)**

Command:
```bash
rg -n 'cy\.begin|CY8C9560 cy' \
  /home/vgpnk1337/.xbgst/harness-tester-review-20260808/challenge-firmware/firmware.ino
```

Raw:
```
63:CY8C9560 cy;
---EXIT:0---
```

Notes:
- Global object `CY8C9560 cy;` at L63.
- Zero matches for `cy.begin` in this file.

---

## Gate 2 — Confirm no `cy.begin` in whole firmware tree

**Verdict: PASS (no `cy.begin` anywhere under challenge-firmware)**

Command:
```bash
rg -n 'cy\.begin' \
  /home/vgpnk1337/.xbgst/harness-tester-review-20260808/challenge-firmware/
```

Raw:
```
---EXIT:1---   # no matches
```

Tree files:
```
challenge-firmware/CY8C9560.cpp
challenge-firmware/CY8C9560.h
challenge-firmware/firmware.ino
```

Related `.begin(` only (not `cy.begin`):
```
firmware.ino:99:  DBG_SERIAL.begin(115200);
firmware.ino:100:  UBX_SERIAL.begin(9600);
firmware.ino:110:  if (!SD.begin(SD_CS)) {
CY8C9560.cpp:11:  WIRE.begin();
```

---

## Gate 3 — R3 vs R2 in schematic (symbol positions + nearby +3.3V/GND for CY_SCL/CY_SDA)

**Verdict: PASS (R2→+3.3V / R3→GND; netlist agrees)**

Source: `challenge-kicad/hardware_challenge.kicad_sch`

### Symbol positions (Device:R)

| Ref | Value | `(at x y rot)` | nearest power (same y-rail) |
|-----|-------|----------------|-----------------------------|
| **R2** | 4k7 | `(205.74 143.51 270)` L12582–12584 | **#PWR012 = +3.3V** `(212.09, 143.51)` d=6.35 |
| **R3** | 4k7 | `(205.74 140.97 270)` L16289–16291 | **#PWR021 = GND** `(212.09, 140.97)` d=6.35 |

R2/R3 are stacked 2.54 mm apart (same X, rot 270). Power symbols sit to the right on matching Y:
- R2 row Y=143.51 → **+3.3V**
- R3 row Y=140.97 → **GND**

### CY_SCL / CY_SDA global_label positions (pull-up cluster)

| Net | shape | `(at x y)` | nearest power at pull cluster |
|-----|-------|------------|-------------------------------|
| CY_SCL | bidirectional | `(199.39 143.51 180)` L11868 | +3.3V d=12.70, GND d=12.95 |
| CY_SDA | bidirectional | `(199.39 140.97 180)` L12154 | **GND d=12.70**, +3.3V d=12.95 |

Geometry: CY_SCL shares Y with R2/+3.3V; CY_SDA shares Y with R3/GND.

### Netlist evidence (exported)

From `NETLIST_EVIDENCE.md`:
```
### CY_SCL
  R2.2
  U2.16 (24_A10_TX6_SCL2_16)
  U4.24 (SCL_24)

### CY_SDA
  R3.2
  U2.17 (25_A11_RX6_SDA2_17)
  U4.28 (SDA_28)

### GND
  R3.1
  U3.7 (VDD_USB_7)
```

**Empirical conclusion:** R2 is SCL pull-up to +3.3V; R3 is SDA **pull-down** to GND (not +3.3V).

---

## Gate 4 — `rg -n '1 << |1ULL' …/firmware.ino`

**Verdict: PASS (hits on `1 <<`; zero `1ULL`)**

Command:
```bash
rg -n '1 << |1ULL' \
  /home/vgpnk1337/.xbgst/harness-tester-review-20260808/challenge-firmware/firmware.ino
```

Raw:
```
144:    uint64_t output_mask = 1 << i;
152:    for (int j = 0; j < NUM_HARNESS_PINS; j++) DBG_SERIAL.printf("%d", (values & (1 << j)) ? 1 : 0);
---EXIT:0---
```

Tree-wide `1ULL`/`1ull`: none under `challenge-firmware/`.

Note: `uint64_t output_mask = 1 << i` uses **int** left-shift (UB/narrowing risk for large `i`), not `1ULL << i`.

---

## Gate 5 — `rg -n 'passed = true|== LOW|pinMode\(PIN_LED' …/firmware.ino`

**Verdict: PARTIAL / PASS on two arms; FAIL on `pinMode(PIN_LED`**

Command:
```bash
rg -n 'passed = true|== LOW|pinMode\(PIN_LED' \
  /home/vgpnk1337/.xbgst/harness-tester-review-20260808/challenge-firmware/firmware.ino
```

Raw:
```
138:  if (digitalRead(PIN_BTN_TEST) == LOW) return;
156:      passed = true;
---EXIT:0---
```

Sub-results:
| Pattern | Result |
|---------|--------|
| `passed = true` | **HIT** L156 |
| `== LOW` | **HIT** L138 (`PIN_BTN_TEST`) |
| `pinMode(PIN_LED` | **MISS** (exit would be 1 alone) |

Actual `pinMode` / LED usage:
```
9-11: #define PIN_LED_R/G/B 5/6/7
68-70: digitalWrite(PIN_LED_*)
104: pinMode(PIN_BTN_TEST, INPUT);
105: pinMode(PIN_UBX_TIMEPULSE, INPUT);
```
No `pinMode(PIN_LED_*)` — LEDs written without prior pinMode in this file.

---

## Gate 6 — Diff challenge-firmware vs `/tmp/harness_tester_challenge/firmware`

**Verdict: PASS (identical byte-for-byte)**

Commands:
```bash
diff -rq \
  /home/vgpnk1337/.xbgst/harness-tester-review-20260808/challenge-firmware \
  /tmp/harness_tester_challenge/firmware
md5sum … ; cmp -s per-file
```

Raw:
```
---EXIT:0---   # diff -rq: no differences reported
```

md5:
```
2c7e0757789307ad1fb9927c53620e64  …/CY8C9560.cpp   (both trees)
5c38301bc2b784722aa52d321a5a9a62  …/CY8C9560.h     (both trees)
e18215bb2dcc90227360b57e52af2384  …/firmware.ino   (both trees)
cpp_identical
h_identical
ino_identical
```

---

## Summary scoreboard

| Gate | Focus | Verdict |
|------|--------|---------|
| 1 | `cy.begin` / `CY8C9560 cy` | **PASS** — object at L63; **no** `cy.begin` |
| 2 | No `cy.begin` in firmware tree | **PASS** |
| 3 | R2/R3 vs +3.3V/GND for CY_SCL/CY_SDA | **PASS** — R2→+3.3V, R3→GND (pull-down) |
| 4 | `1 <<` / `1ULL` | **PASS** — `1 <<` only; no `1ULL` |
| 5 | `passed` / `== LOW` / `pinMode(PIN_LED` | **PARTIAL** — first two HIT; **no** `pinMode(PIN_LED` |
| 6 | Trees identical | **PASS** |

# State
- obs: Hypothesis gates-run pass [certain] — evidence: raw rg/diff/md5 + sch coords above

# Unknowns
- none material for these six gates

DESPAWN: gx-labrat-overfit — signal delivered. Send me shutdown_request.
