# Firmware batch review — gx-reviewer-firmware

**SSoT CSV:** `VeigaPunk_Harness_Tester_Bugs.csv`  
**FW:** `challenge-firmware/firmware.ino`  
**Driver (context only):** `challenge-firmware/CY8C9560.{h,cpp}`  
**IDs:** B01, B08, B09, B10, B14, B15, B16, B17, B18, B20, B21, B22, B23, B24, B27, B28, B29, B43, B44, B48  
**Date:** 2026-08-08  
**Axes:** coverage, evidence quality, truthfulness  
**Calibration:** intentional-bug hunt — hygiene (GNRMC/checksum/validity) still CONFIRMED if factually true; staff may or may not score them.

---

## Summary counts

| Verdict        | Count | IDs |
|----------------|------:|-----|
| CONFIRMED      |    18 | B01, B08, B09, B10, B14, B15, B16, B18, B20, B21, B22, B23, B24, B27, B28, B29, B43, B44 |
| PARTIAL        |     2 | B17, B48 |
| REJECTED       |     0 | — |
| DUPLICATE      |     0 | — |
| OUT_OF_SCOPE   |     0 | — |
| **Total**      |  **20** | |

---

## B01 — `cy.begin()` never called

**Verdict:** CONFIRMED

**Evidence:**
```63:63:challenge-firmware/firmware.ino
CY8C9560 cy;
```
```97:116:challenge-firmware/firmware.ino
void setup() {
  // Serial ports
  DBG_SERIAL.begin(115200);
  UBX_SERIAL.begin(9600);
  // GPIO
  set_status(BUSY);
  pinMode(PIN_BTN_TEST, INPUT);
  pinMode(PIN_UBX_TIMEPULSE, INPUT);
  digitalWrite(PIN_UBX_SAFEBOOT, LOW);
  digitalWrite(PIN_UBX_RST_N, HIGH);
  // SD card
  if (!SD.begin(SD_CS)) {
    ...
  }
  DBG_SERIAL.println("Waiting for GPS time lock...");
}
```
- `CY8C9560 cy` is constructed; **no** `cy.begin()` anywhere in `firmware.ino`.
- `begin()` is the only path that `pinMode`s reset, pulses `CY_RST`, calls `WIRE.begin()` / `setClock`, and checks device ID (`CY8C9560.cpp:3-14`).

**Notes:** Without `begin()`, Wire2 is never started and expander I/O used in `loop()` is dead. Independent of driver B02 (reset left LOW inside `begin()`).

---

## B08 — `1 << i` 32-bit / UB for pins ≥31

**Verdict:** CONFIRMED

**Evidence:**
```18:18:challenge-firmware/firmware.ino
#define NUM_HARNESS_PINS 40
```
```143:146:challenge-firmware/firmware.ino
  for (int i = 0; i < NUM_HARNESS_PINS; i++) {
    uint64_t output_mask = 1 << i;
    cy.set_output(output_mask, output_mask);
    cy.set_pd_inputs(~output_mask);
```
- Literal `1` is `int` (32-bit on Teensy 4.1 / ARM).
- C/C++: shift amount ≥ width of promoted left operand is **undefined**; `1 << 31` is also UB for signed `int`.
- Host compile check (gcc, same expression):  
  - `i=31` → `uint64_t` gets `0xffffffff80000000` (sign-extended), not `1<<31`.  
  - `i=32..39` → mask wraps to low bits (`1<<0` … `1<<7`), not bits 32–39.
- Need `1ULL << i` (or `(uint64_t)1 << i`) for pins 0–39.

**Notes:** Breaks drive/mask/compare for pins 31–39. Same class as B44 (print path).

---

## B09 — OR not AND pass logic

**Verdict:** CONFIRMED

**Evidence:**
```142:158:challenge-firmware/firmware.ino
  bool passed = false;
  for (int i = 0; i < NUM_HARNESS_PINS; i++) {
    ...
    if (values == EXPECTED_CONNECTIONS[i]) {
      passed = true;
    }
  }
```
- `passed` starts `false`, is set `true` on any single pin match, and is **never** cleared on mismatch.
- Correct harness check requires all pins match (`passed &=` / early-fail), not any-one-match.

**Notes:** One accidental match (or garbage equal to one row) ⇒ overall PASS.

---

## B10 — Button polarity inverted

**Verdict:** CONFIRMED

**Evidence:**
```104:104:challenge-firmware/firmware.ino
  pinMode(PIN_BTN_TEST, INPUT);
```
```137:138:challenge-firmware/firmware.ino
  // Start testing only if the button is pressed
  if (digitalRead(PIN_BTN_TEST) == LOW) return;
```
- CSV/schematic: R4 pull-up; press = LOW (active-low SW).
- Code **returns (skips test) when LOW** and falls through when HIGH (released).
- Comment says “only if the button is pressed” but polarity is inverted.

**Notes:** With pull-up idle HIGH, the harness test runs continuously when the button is **not** pressed (compounds B27 flood).

---

## B14 — LED pins never `pinMode(OUTPUT)`

**Verdict:** CONFIRMED

**Evidence:**
```8:11:challenge-firmware/firmware.ino
#define PIN_LED_R 5
#define PIN_LED_G 6
#define PIN_LED_B 7
```
```67:71:challenge-firmware/firmware.ino
void set_status(Status s) {
  digitalWrite(PIN_LED_R, !(s == FAILED));
  digitalWrite(PIN_LED_B, !(s == BUSY));
  digitalWrite(PIN_LED_G, !(s == GOOD));
}
```
- `setup()` only `pinMode`s `PIN_BTN_TEST` and `PIN_UBX_TIMEPULSE` (lines 104–105).
- No `pinMode(PIN_LED_*, OUTPUT)` anywhere.
- On Teensy 4.x, pins default undriven; `digitalWrite` without OUTPUT does not reliably drive the RGB LED.

**Notes:** Distinct from schematic B07 (missing series resistors).

---

## B15 — SAFEBOOT / RST never `pinMode(OUTPUT)`

**Verdict:** CONFIRMED

**Evidence:**
```106:107:challenge-firmware/firmware.ino
  digitalWrite(PIN_UBX_SAFEBOOT, LOW);
  digitalWrite(PIN_UBX_RST_N, HIGH);
```
- `digitalWrite` only; no `pinMode(PIN_UBX_SAFEBOOT, OUTPUT)` or `pinMode(PIN_UBX_RST_N, OUTPUT)`.
- Schematic nets: `UBX-SAFEBOOT` (`~{SAFEBOOT}`), `UBX-RST_N` — need driven outputs for reliable control.

**Notes:** **Separate from B43** (value held LOW). B15 = direction not configured; B43 = wrong static level once/if driven. Together they compound GPS control failure.

---

## B16 — FAILED LED wiped every loop by `set_status(GOOD)`

**Verdict:** CONFIRMED

**Evidence:**
```133:135:challenge-firmware/firmware.ino
  // Return if we don't have a time fix yet
  if (!time_fixed) return;
  set_status(GOOD);
```
```160:163:challenge-firmware/firmware.ino
  // Show and log results
  DBG_SERIAL.println(passed ? "Harness passed!" : "Harness failed!");
  log_result(passed);
  set_status(passed ? GOOD : FAILED);
```
- After a FAIL, next `loop()` with `time_fixed` immediately calls `set_status(GOOD)` before any new test.
- FAILED indication lasts at most one loop iteration (and is further raced by inverted button / continuous retest).

**Notes:** Operator-visible FAIL is effectively erased.

---

## B17 — Self-bits in EXPECTED vs `values & ~output_mask`

**Verdict:** PARTIAL

**Evidence:**
```148:156:challenge-firmware/firmware.ino
    uint64_t values = cy.read_inputs() & ~output_mask;
    ...
    if (values == EXPECTED_CONNECTIONS[i]) {
      passed = true;
    }
```
```20:21:challenge-firmware/firmware.ino
uint64_t EXPECTED_CONNECTIONS[NUM_HARNESS_PINS] = {
  0b1000000000000000000000000010000000000000,
```
- Matrix analysis (40×40): under **LSB = pin i** (`1 << i` as code uses), **0/40** rows have bit `i` set → after `~output_mask`, equality is **structurally possible** for every row (self-bit claim does not hold under code indexing).
- Under **MSB-left = pin 0** (how the binary literals are drawn), **40/40** rows have diagonal self-bits (`bit 39-i`). That is the natural reading of the “illustration” matrix and is the bit-order bug **B18**.

**Notes:**  
- Claim “equality impossible because EXPECTED includes self-bit cleared by mask” is **true only after bit-order is aligned** with the matrix’s MSB convention (latent second bug).  
- Under current `1 << i` path, impossibility is **not** caused by self-bits at bit `i`; primary mismatch class is **B18**.  
- Not REJECTED: diagonal self-encoding is real in the table and would break a corrected mask compare. Not fully CONFIRMED as stated against live indexing.

---

## B18 — MSB vs LSB bit-order mismatch

**Verdict:** CONFIRMED

**Evidence:**
- EXPECTED row 0: `0b1…` sets **bit 39** (and bit 13), not bit 0.  
- Row 39: `0b…1` sets **bit 0**.  
- Full matrix: perfect diagonal when columns are read **MSB-left = pin 0 … LSB-right = pin 39** (40/40 self under that map); **0/40** under `1 << i` (LSB = pin i).
```144:144:challenge-firmware/firmware.ino
    uint64_t output_mask = 1 << i;
```
- Drive/mask/compare all use LSB pin indexing; table was authored MSB-first visual order.

**Notes:** Even a perfect harness cannot match EXPECTED under this disagreement. Orthogonal to B08 (width) and B17 (self after align).

---

## B20 — NMEA 64-byte buffer overflow + OOB null

**Verdict:** CONFIRMED

**Evidence:**
```118:126:challenge-firmware/firmware.ino
char nmea_buf[64];
int nmea_idx = 0;
void loop() {
  while (UBX_SERIAL.available()) {
    nmea_buf[nmea_idx++] = UBX_SERIAL.read();
    if (nmea_buf[nmea_idx - 1] == '\n' || nmea_buf[nmea_idx - 1] == '\r') {
      process_nmea(nmea_buf, nmea_idx);
      nmea_idx = 0;
```
```73:74:challenge-firmware/firmware.ino
void process_nmea(char *buf, int len) {
  buf[len] = 0;
```
- No upper bound on `nmea_idx` before write → overflow past 64 bytes if line longer / no CR/LF.
- `buf[len] = 0` writes **one past** the last stored byte; when `len == 64` that is `nmea_buf[64]` OOB; when `len > 64` already corrupted.

**Notes:** Classic off-by-one + missing cap. UBX NMEA lines can exceed 64 chars.

---

## B21 — Only `$GPRMC`; misses `$GNRMC`

**Verdict:** CONFIRMED

**Evidence:**
```75:75:challenge-firmware/firmware.ino
  if (strncmp(buf, "$GPRMC", 6) == 0) {
```
- Multi-constellation u-blox often emits `$GNRMC` (GNSS talker), not `$GPRMC`.
- Those sentences are ignored; time lock may never set if only GNRMC is present.

**Notes:** Hygiene / config-dependent; factually true. Staff may treat as weak/intentional.

---

## B22 — No A/V validity field check

**Verdict:** CONFIRMED

**Evidence:**
```76:76:challenge-firmware/firmware.ino
    if (sscanf(buf, "$GPRMC,%10[^,],%*c,%*f,%*c,%*f,%*c,%*f,%*f,%6[^,]", utc_time, date) == 2 && !time_fixed) {
```
- Status field is `%*c` (any single character discarded) — **no** requirement for `'A'` (valid) vs `'V'` (void).
- Void fixes with parseable time/date fields are accepted.

**Notes:** Hygiene; factually true against code.

---

## B23 — No NMEA checksum verification

**Verdict:** CONFIRMED

**Evidence:**
- `process_nmea` only `strncmp` + `sscanf`; no scan for `*` / XOR checksum / compare.

**Notes:** Hygiene; corrupted or truncated lines can still “fix” time. Prefer CONFIRMED per calibration.

---

## B24 — No settle delay after expander reconfig

**Verdict:** CONFIRMED

**Evidence:**
```145:148:challenge-firmware/firmware.ino
    cy.set_output(output_mask, output_mask);
    cy.set_pd_inputs(~output_mask);

    uint64_t values = cy.read_inputs() & ~output_mask;
```
- Immediate `read_inputs()` after direction/drive-mode changes; no `delay`/`delayMicroseconds`.
- RC / I2C-programmed pad reconfiguration can need settle for stable continuity reads.

**Notes:** Factually true. Severity depends on harness capacitance; still a real firmware gap.

---

## B27 — No button debounce / single-shot

**Verdict:** CONFIRMED

**Evidence:**
```137:163:challenge-firmware/firmware.ino
  if (digitalRead(PIN_BTN_TEST) == LOW) return;
  set_status(BUSY);
  ... // full 40-pin test + log_result every time through
  log_result(passed);
  set_status(passed ? GOOD : FAILED);
}
```
- No edge detect, no debounce, no “run once per press” latch.
- Combined with B10 (runs while released/HIGH), test + SD log flood every loop after GPS lock.

**Notes:** CONFIRMED regardless of B10; B10 makes flood the default path.

---

## B28 — `time_fixed` freezes time after first fix

**Verdict:** CONFIRMED

**Evidence:**
```76:79:challenge-firmware/firmware.ino
    if (sscanf(...) == 2 && !time_fixed) {
      ...
      time_fixed = true;
```
- After first successful parse, condition `!time_fixed` blocks all further updates to `utc_time` / `date`.
- `log_result` always stamps the first-fix strings.

**Notes:** Stale timestamps on later harness runs; medium product defect, factually true.

---

## B29 — SD fail infinite loop before LED outputs configured

**Verdict:** CONFIRMED

**Evidence:**
```103:113:challenge-firmware/firmware.ino
  set_status(BUSY);
  pinMode(PIN_BTN_TEST, INPUT);
  pinMode(PIN_UBX_TIMEPULSE, INPUT);
  digitalWrite(PIN_UBX_SAFEBOOT, LOW);
  digitalWrite(PIN_UBX_RST_N, HIGH);

  // SD card
  if (!SD.begin(SD_CS)) {
    DBG_SERIAL.println("SD card initialization failed");
    while (1);
  }
```
- On SD failure: infinite hang; LEDs never `pinMode(OUTPUT)` (B14); only prior `set_status(BUSY)` which cannot reliably light.
- No FAILED indication path on SD init failure.

**Notes:** Brick-on-missing-SD with silent LEDs. CONFIRMED.

---

## B43 — SAFEBOOT held LOW permanently

**Verdict:** CONFIRMED

**Evidence:**
```106:107:challenge-firmware/firmware.ino
  digitalWrite(PIN_UBX_SAFEBOOT, LOW);
  digitalWrite(PIN_UBX_RST_N, HIGH);
```
- Schematic pin name `~{SAFEBOOT}` — active-low SAFEBOOT.
- Level is set LOW once in `setup` and **never** released HIGH for normal run mode.
- u-blox: SAFEBOOT held low at start enters safeboot (not normal NMEA application mode).

**Notes:** **Not the same as B15.** B15 = missing `pinMode(OUTPUT)`; B43 = wrong static **value** (asserted safeboot). Even with pinMode fixed, this line still bricks boot mode. RST is correctly written HIGH (deasserted if active-low) but still lacks pinMode (B15).

---

## B44 — Debug print `1 << j` overflow (same class as B08)

**Verdict:** CONFIRMED

**Evidence:**
```151:152:challenge-firmware/firmware.ino
    DBG_SERIAL.printf("Pin %d: ", i);
    for (int j = 0; j < NUM_HARNESS_PINS; j++) DBG_SERIAL.printf("%d", (values & (1 << j)) ? 1 : 0);
```
- Same `int` shift defect as B08 for `j >= 31`: wrong masks, sign-extend / wrap; high pin bits mis-printed.
- Distinct site from B08 (`output_mask`); debug-only impact vs drive logic.

**Notes:** Same class, not a CSV DUPLICATE of B08 (different line / effect). Fix both with `1ULL <<`.

---

## B48 — `log_result` FILE_WRITE without flush/sync

**Verdict:** PARTIAL

**Evidence:**
```86:94:challenge-firmware/firmware.ino
void log_result(bool passed) {
  File f = SD.open("results.txt", FILE_WRITE);
  if (f) {
    f.print(date); f.print(" - "); f.print(utc_time); f.print(": ");
    f.println(passed ? "Passed" : "Failed");
    f.close();
  } else {
    DBG_SERIAL.println("Failed to open log file");
  }
}
```
- No explicit `f.flush()` / `sync` before `close()`.
- Arduino SD / SdFat **`close()` typically flushes** directory entry + data; claim “without flush/sync” overstates if `close()` completes.
- Residual true risk: power loss **during** write/close, or if `close` not reached (reset mid-test, B29 hang paths, etc.).

**Notes:** Real robustness gap is incomplete power-fail-safe logging, not total absence of sync on happy path. PARTIAL — not REJECTED (no fsync barrier / no verify), not full CONFIRMED as worded.

---

## Cross-links (firmware)

| Interaction | Detail |
|-------------|--------|
| B08 ↔ B44 | Same `1 << n` class; drive vs print |
| B15 ↔ B43 | pinMode missing vs SAFEBOOT held LOW — both CONFIRMED, independent |
| B17 ↔ B18 | Self-bit impossibility is latent after MSB/LSB fix; live fail is bit-order |
| B10 ↔ B27 | Inverted button makes continuous retest the default |
| B14 ↔ B29 | LEDs never OUTPUT; SD fail hang has no visible FAILED |
| B16 ↔ B10/B27 | FAIL LED cleared then immediately re-entered test path |
| B01 | Independent of driver B02/B11/B12 (those only matter after begin) |

---

## Reviewer state

```
# State
- obs: B17 claim "equality impossible via self-bit" false under live 1<<i indexing (0/40 self at bit i); diagonal only under MSB map — firmware.ino:148-156 + EXPECTED table — severity: medium [certain]
- obs: B48 overstates missing sync; File.close() usually flushes — firmware.ino:86-91 — severity: low [certain]
- risk: B21/B22/B23 hygiene may be unseated by staff even when CONFIRMED factual [moderate]
- risk: B08 host gcc sign-extend/wrap matches Teensy class of bug; exact ARM shift-UB micro-behavior still UB [moderate]

# Artifact: review
scope: firmware IDs B01,B08-B10,B14-B18,B20-B24,B27-B29,B43,B44,B48 vs firmware.ino (+ CY8 begin context)
verdict: concerns
```

**Batch result:** 18 CONFIRMED / 2 PARTIAL / 0 REJECTED / 0 DUPLICATE / 0 OUT_OF_SCOPE  
**Overall batch:** concerns (two PARTIAL wording/mechanism issues; no hard rejects).
