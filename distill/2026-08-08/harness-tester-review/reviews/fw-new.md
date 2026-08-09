# Firmware/driver NEW bug hunt — B50+

**Agent:** gx-reviewer-fw-hunt  
**Date:** 2026-08-08  
**Sources:** `/tmp/harness_tester_challenge/firmware/{firmware.ino,CY8C9560.cpp,CY8C9560.h}`  
**Cross-check:** KiCad PCB nets (LED common-anode, A0/A1/A2, R4, TIMEPULSE, CY_INT)  
**Ironclad exclude (do not re-claim as new roots):**  
`B01,B03,B04,B07,B08,B09,B10,B11,B12,B14,B15,B16,B18,B20,B29,B43`  
**Also known catalog (not re-ID’d):** B17,B19,B21–B28,B44,B47,B48,…  

**Axes:** independence · show-stop vs hygiene · evidence at file:line · ironclad candidacy  

**Goal:** ≥15 new candidates with ironclad **YES** or **MAYBE**.

---

## Summary

| Metric | Count |
|--------|------:|
| New IDs assigned (B50–B69) | **20** |
| ironclad **YES** | **6** |
| ironclad **MAYBE** | **11** |
| ironclad **NO** (still documented) | **3** |
| Evaluated **NOT_A_BUG** | **3** (LED polarity, DBG vs UBX baud, drive-mode map) |
| Duplicate of ironclad / catalog | button comment→B10; CR-null facet→B20; FILE_WRITE sync→B48 |

---

## New candidates

### B50 — Compare mask never limited to 40 harness bits
- **Claim:** `values = read_inputs() & ~output_mask` keeps bits **40–63**. `EXPECTED_CONNECTIONS[i]` only uses bits 0–39 (upper zero). Any `1` in ports 5–7 / upper read data makes `values == EXPECTED` **structurally false** for every pin.
- **Evidence:** `firmware.ino:148-156`; matrix rows `firmware.ino:20-60` (max bit 39); driver always returns 8 port bytes `CY8C9560.cpp:57-58`.
- **Independence:** Not B08 (shift width), not B18 (MSB/LSB table order). Related to catalog **B47** (8-byte read / NC ports) but **firmware** omits `((1ULL<<NUM_HARNESS_PINS)-1)` (or equivalent) at the **compare** site — distinct fix line from driver `len`.
- **ironclad?** **YES**

### B51 — `~output_mask` pull-down / sense path programs bits 40–63
- **Claim:** `cy.set_pd_inputs(~output_mask)` with `output_mask` in low bits yields **all-ones in bits 40–63**, so ports 5–7 get DIR=input + PULL_DOWN drive-mode writes every pin test (even when those pads are NC on copper).
- **Evidence:** `firmware.ino:144-146`; `CY8C9560.cpp:61-66`.
- **Independence:** Call-site mask hygiene; pairs with B50; not B11/B12 (whole-port DIR constants).
- **ironclad?** **YES** (often ship as one “no 40-bit mask” with B50; keep split if staff want call-site vs compare)

### B52 — EXPECTED adjacency not reciprocal under MSB-left pin map
- **Claim:** Continuity matrices must be symmetric: edge \(i\!\leftrightarrow\!j\) in both rows. Under **MSB-left = pin 0** (the natural reading of the `0b…` literals and diagonal self-bits), there are **36 asymmetric pairs** (e.g. row0 bit for pin26 set, row26 bit for pin0 clear). A perfect undirected harness cannot match all rows after bit-order alignment.
- **Evidence:** `firmware.ino:19-61` table; offline count: `asym_msb=36`, `diag_msb=40`; examples (0,26), (1,6), (3,4), (3,12), (3,32). Under LSB=`1<<i`, `asym_lsb=0` but `diag_lsb=0` (table not authored in code order).
- **Independence:** **B18** is code vs table **bit-order**. B52 is **table content** non-graph after choosing the MSB map B18 implies. Not B17 (self-bit vs `~output_mask`).
- **ironclad?** **YES**

### B53 — I2C address hard-coded `0x20` while A1/A2 not strapped to GND
- **Claim:** `CY8C9560_ADDR 0b0100000` (= `0x20`) requires address pins A2=A1=A0=0. PCB: **A0 → GND** (OK), but **A1** is `GPort2_Bit3_PWM11/A1` → **CBL_19**, **A2** is `GPort2_Bit1_PWM12/A2` → **CBL_17** — not hardwired low. At reset, address nibble can follow floating/harness levels ≠ 0 → bus address mismatch vs driver.
- **Evidence:** `CY8C9560.h:8,31`; PCB U4 pad30 A0=GND; pad29 A1 dual → CBL_19; pad46 A2 dual → CBL_17.
- **Independence:** Not B01 (`begin` never called), not B03 (SDA pull-down), not B19 (linear pin map vs Port2 nibble). Address strapping is separate from GPIO indexing.
- **ironclad?** **YES**

### B54 — `set_output` writes output latches before direction / drive mode
- **Claim:** `write_registers(REG_OUTPUT_BASE, values, 8)` runs **before** per-port DIR=output and STRONG mode. Combined with B11 (all pins become outputs), non-selected pins take **stale latch + prior drive mode** when direction flips — glitch/contention window on harness nets.
- **Evidence:** `CY8C9560.cpp:77-83` order: output data → DIR `0x00` → STRONG mask.
- **Independence:** Ordering bug vs B11’s “DIR ignores pins mask” (same function, different defect). Datasheet allows pre-loading latches; severity is contention **with** whole-port DIR.
- **ironclad?** **MAYBE**

### B55 — `set_pu_inputs` is dead code; only pull-down sense path exists
- **Claim:** `set_pu_inputs` is fully implemented but **never called**. Continuity only uses strong-high + pull-down sense (`set_output` + `set_pd_inputs`). No alternate PU-sense path; dead API hides missing high-side open detection patterns.
- **Evidence:** `CY8C9560.cpp:69-75` definition; `firmware.ino` call sites only `set_output` / `set_pd_inputs` / `read_inputs` (lines 145-148).
- **Independence:** Not B12 (DIR=0xFF body of pd path).
- **ironclad?** **MAYBE** (hygiene / dead code; weak show-stop alone)

### B56 — `begin()` success return never checked (latent)
- **Claim:** `begin()` returns `read_id()==0x06` but firmware never calls it (**B01**). If/when called, return is unchecked → silent proceed on wrong/missing silicon.
- **Evidence:** `CY8C9560.cpp:3-14`; no `cy.begin` in `firmware.ino`.
- **Independence:** Latent vs B01 root; still a second defect in the API contract.
- **ironclad?** **MAYBE**

### B57 — TIMEPULSE configured, never used
- **Claim:** `PIN_UBX_TIMEPULSE` is `pinMode(INPUT)` but never `digitalRead` / ISR. No PPS-disciplined time; only brittle NMEA parse path.
- **Evidence:** `firmware.ino:6,105`; no other TIMEPULSE references.
- **Independence:** Not B43/B15 (SAFEBOOT/RST). Not B28 (frozen time after first RMC).
- **ironclad?** **MAYBE** (feature dead; low plant score)

### B58 — CY IRQ line set up in `begin`, never used
- **Claim:** `pinMode(CY_IRQ_N, INPUT_PULLUP)` in `begin()`; no `attachInterrupt`, no poll of pin 23 / `CY_INT` net. Expander interrupt path dead.
- **Evidence:** `CY8C9560.h:10`; `CY8C9560.cpp:4`; firmware never references IRQ.
- **Independence:** Distinct from B01 (not calling begin) — even after begin, IRQ unused.
- **ironclad?** **MAYBE**

### B59 — Button `pinMode(INPUT)` without `INPUT_PULLUP`
- **Claim:** Relies entirely on external R4. If R4 DNP/tombstoned, pin floats; reads nondeterministic (compounds inverted polarity B10).
- **Evidence:** `firmware.ino:104`; PCB R4 pad1=+3.3V, pad2=BTN_TEST (10k present on design).
- **Independence:** Not B10 (sense polarity). Soft given R4 is populated in the design.
- **ironclad?** **MAYBE**

### B60 — `process_nmea` length includes CR/LF terminator
- **Claim:** On `\r`/`\n`, `nmea_idx` already counts the delimiter; `process_nmea(buf, nmea_idx)` then `buf[len]=0` writes **after** the terminator (or OOB when len==64). Parser also feeds terminator-inclusive length into `strncmp`/`sscanf` (usually OK if null placed after `\r`).
- **Evidence:** `firmware.ino:123-125,73-74`.
- **Independence:** Overlaps ironclad **B20** (overflow + OOB null). Keep as **facet** only if staff want delimiter/off-by-one wording separate.
- **ironclad?** **NO** (merge into B20; not a new root)

### B61 — `break` after first NMEA line ends UART drain early
- **Claim:** After one `\r`/`\n`, `break` leaves remaining FIFO bytes for later loops. Under burst NMEA, **only one sentence processed per `loop()`**, delaying time fix and interleaving with test logic. Comment claims button fairness; cost is parse latency / partial drain.
- **Evidence:** `firmware.ino:122-130`.
- **Independence:** Not B20/B21. Design tradeoff with real latency effect.
- **ironclad?** **MAYBE**

### B62 — `nmea_idx` is signed `int` with no cap → overflow UB on endless garbage
- **Claim:** Continuous non-terminated UART noise increments `nmea_idx` past 63 (buffer OOB = B20) and without reset can approach `INT_MAX` → signed overflow **UB**, then negative index writes.
- **Evidence:** `firmware.ino:118-123`.
- **Independence:** Mechanism beyond fixed 64-byte OOB (B20): **unbounded signed counter**.
- **ironclad?** **YES** (or strong MAYBE if staff collapse into B20)

### B63 — No wait-timeout for GPS lock
- **Claim:** Until `time_fixed`, `loop` returns after UART service; **no timeout**, no FAILED LED path for “no GPS ever”. Device stays BUSY/waiting forever (compounded by UART/SAFEBOOT bricks).
- **Evidence:** `firmware.ino:115,133-134`.
- **Independence:** Not B29 (SD hang). Product logic gap.
- **ironclad?** **MAYBE**

### B64 — Expander left in last pin-test electrical state
- **Claim:** After the 40-pin for-loop, no restore to safe Hi-Z / all inputs. Last iteration’s `set_pd_inputs` / residual modes remain driven into the harness until next press.
- **Evidence:** `firmware.ino:143-158` — no cleanup after loop.
- **Independence:** Not B11/B12 (during test); post-test hygiene.
- **ironclad?** **MAYBE**

### B65 — Drive-mode 0-bits leave prior mode (no Hi-Z for “off” pins)
- **Claim:** STRONG/PD registers only change pins with `1` bits (datasheet last-1-wins). Pins with `0` in the mask **retain previous drive mode**. API never writes `DRIVE_MODE_HIGH_IMPEDANCE` (`0x06` defined but unused). Non-selected pins can stay STRONG while DIR is forced en masse (B11/B12).
- **Evidence:** `CY8C9560.h:19-25`; `CY8C9560.cpp:65,73,82` — no Hi-Z writes.
- **Independence:** Catalog **B25** (must clear old mode) was **REJECTED** (last-1-wins). B65 is **missing explicit Hi-Z for deselected pins**, different claim.
- **ironclad?** **MAYBE**

### B66 — RMC `sscanf` brittle on empty lat/lon fields
- **Claim:** Format requires multiple `%*f` between time and date. Classic void RMC with empty coordinates (`,,`) makes `%*f` fail mid-scan → return ≠ 2 → time never latched even when time/date present. Interacts with “no A/V check” (B22): void is not freely accepted if empties break `%f`.
- **Evidence:** `firmware.ino:76`.
- **Independence:** Not B21 (talker ID). Not B22 (validity char). Parser robustness.
- **ironclad?** **MAYBE**

### B67 — `digitalWrite` on SAFEBOOT/RST before any `pinMode`
- **Claim:** Lines 106-107 write levels with pins still default input; on Teensy 4.x behavior is platform-dependent until OUTPUT. Distinct from “never pinMode” (B15) and “held LOW forever” (B43) as **ordering**/first-edge issue at boot.
- **Evidence:** `firmware.ino:104-107` (TIMEPULSE/BTN get pinMode; SAFEBOOT/RST only digitalWrite).
- **Independence:** Thin slice vs B15 — staff may merge.
- **ironclad?** **NO** (prefer fold into B15)

### B68 — SD log opens `FILE_WRITE` only (no explicit append/sync flags in app code)
- **Claim:** `SD.open("results.txt", FILE_WRITE)` depends on core defining WRITE as create+append; no `O_SYNC` / `flush` before close. Power-loss / multi-open races.
- **Evidence:** `firmware.ino:87-91`.
- **Independence:** Catalog **B48** PARTIAL. Not new root.
- **ironclad?** **NO** (re-tier B48 only)

### B69 — Button comment vs polarity (wording trap)
- **Claim:** Comment “Start testing only if the button is pressed” vs `if (digitalRead == LOW) return` inverts active-low SW.
- **Evidence:** `firmware.ino:137-138`.
- **Independence:** **Same root as ironclad B10** — comment is evidence, not a second bug.
- **ironclad?** **NO** (duplicate B10)

---

## Evaluated NOT_A_BUG (hunt targets closed)

### LED `set_status` polarity vs common-anode hardware
- **Code:** active-low per channel: `digitalWrite(pin, !(s == STATE))` → selected color driven **LOW** (`firmware.ino:67-71`).
- **HW:** D3 ASMB-KTF0-0A306 **common anode** to **+3.3V**; RK/GK/BK → GPIO (`LED_R/G/B` nets). LOW = LED ON. **Matches.**
- **Not independent of B07/B14** (resistors / pinMode) — polarity itself is correct.

### DBG_SERIAL 115200 vs UBX_SERIAL 9600
- Different UARTs (`Serial` vs `Serial1`). NEO-M8N default 9600 is appropriate. **Not a bug.**

### Drive-mode register base map vs datasheet
- `REG_PIN_DRIVE_MODE_BASE 0x1D` + `{PU=0, PD=1, …, STRONG=4, HiZ=6}` → `0x1D…0x23`. Matches CY8C95xxA drive-mode register block. **Not a bug** (unlike rejected B25 “must clear”).

---

## Priority for ironclad expansion (suggested order)

| Pri | ID | One-liner | ironclad |
|----:|----|-----------|----------|
| 1 | **B50** | No 40-bit mask on compare | YES |
| 2 | **B51** | `~output_mask` upper bits into PD config | YES |
| 3 | **B52** | EXPECTED non-symmetric under MSB map | YES |
| 4 | **B53** | I2C addr 0x20 vs A1/A2 on CBL | YES |
| 5 | **B62** | `nmea_idx` signed unbounded overflow | YES |
| 6 | **B54** | Output latch before DIR/mode | MAYBE |
| 7 | **B66** | sscanf empty-field brittleness | MAYBE |
| 8 | **B65** | No Hi-Z for deselected pins | MAYBE |
| 9 | **B61** | break after first NMEA line | MAYBE |
| 10 | **B63** | No GPS wait timeout | MAYBE |
| 11 | **B64** | Post-test expander state | MAYBE |
| 12 | **B59** | INPUT w/o PULLUP (R4-dependent) | MAYBE |
| 13 | **B56** | begin() return ignored | MAYBE |
| 14 | **B57** | TIMEPULSE unused | MAYBE |
| 15 | **B58** | IRQ unused | MAYBE |
| 16 | **B55** | set_pu_inputs dead | MAYBE |

**YES+MAYBE count = 6+11 = 17 ≥ 15.**

---

## Cross-links (do not double-count)

| New | Touches old | Rule |
|-----|-------------|------|
| B50/B51 | B47, B08 | New = firmware mask; old = driver 8-byte / shift |
| B52 | B17, B18 | New = graph asymmetry; old = self-bit / bit-order |
| B53 | B01, B19 | Addr strap ≠ init call ≠ port2 index |
| B54/B65 | B11, B12, B25rej | Order / Hi-Z ≠ DIR blanket ≠ clear-required |
| B60/B62 | B20 | Prefer single NMEA buffer epic unless counter sold separate |
| B69 | B10 | Comment is evidence only |
| B67 | B15, B43 | Fold into pinMode / level plants |
| B68 | B48 | Re-tier only |

---

## Reviewer state

```
# State
- obs: values==EXPECTED never masks bits 40-63 — firmware.ino:148-156 — severity: high [certain]
- obs: EXPECTED under MSB-left has 36 non-reciprocal edges — firmware.ino:20-60 — severity: high [certain]
- obs: I2C 0x20 assumes A2A1A0=000 but A1/A2 on CBL_19/CBL_17 — CY8C9560.h:8 + PCB U4 — severity: high [certain]
- obs: set_status LED polarity CORRECT for common-anode D3 — firmware.ino:67-71 + PCB D3 pad A=+3.3V — not a bug [certain]
- risk: staff may merge B50∪B51∪B47 into one “upper port pollution” plant [moderate]
- risk: B53 needs datasheet quote that A1/A2 sampled at reset on dual-function pins [moderate]

# Artifact: review
scope: firmware+driver NEW hunt B50+ vs ironclad set; sources firmware.ino CY8C9560.{h,cpp}
verdict: concerns
```

**Artifact path:** `/home/vgpnk1337/.xbgst/harness-tester-review-20260808/hunt/fw-new.md`
