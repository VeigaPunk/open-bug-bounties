# Full-reach audit — Johannes von Grundherr (`Johannes-ece`)

**Date:** 2026-08-08  
**Scope:** Everything public his identity reaches: GH profile, 16 repos, 1 gist, personal site, Peptide Log app surface (pepfaq/killswitch/featureflags/peptide-db), harness challenge peer role.  
**Not in scope:** Private form payload (unknowable); closed-source iOS app binary (inferred only via public config).  
**Method:** Clone/API read + static analysis. No auth, no exploit against live systems.

---

## Reach map (n-1)

| Surface | Artifact | Risk class |
|---------|----------|------------|
| GH identity | public email `johannes.v.grundherr@tum.de` | PII |
| Site | johannes-ece.github.io | low |
| AirQ | ESP32 HV Geiger + MQTT | **safety + security** |
| kicad-auto-via | KiCad 9 plugin | quality/marketing gap |
| peptide-db + Peptide Log | health-adjacent dataset + app configs | **regulatory / content** |
| killswitch / featureflags / pepfaq | remote kill + FAQ | reliability |
| Petron | browser iTunes scraper | abuse/CORS |
| SwiftChartSmoothing | SPM library | lower |
| IbAKitchen | archived meal-plan monorepo | dead/archival |
| harness #3 comment | peer filter only | epistemic (good) |
| nand2tetris-verilog / weather-wallpaper | forks | inherited |
| LOGSEQ / HLT notes | notes dumps | hygiene |

---

## A. AirQ (`airq.ino` — 246 LOC) — **worst public engineering**

### Critical / safety

| ID | Flaw | Evidence |
|----|------|----------|
| **AQ-01** | **HV Geiger charge loop** drives FET up to **1000** pulses without hard timeout path beyond cap flag; ISRs print to Serial | `jb_HV_gen_charge__chargepules` while `chargepules < 1000` |
| **AQ-02** | **Serial.println inside ISRs** (`isr_GMZ_count`, capacitor full) — can **deadlock / stretch ISR** under load | lines ~63–71 |
| **AQ-03** | **MQTT credentials hardcoded `admin`/`admin`** | `client.connect(mqttDeviceId, "admin", "admin")` |
| **AQ-04** | `mqttPort = MQTT_SERVER_PORT` — **undefined macro/int**; port field unused; **hardcoded 1883** in `setServer` | setup |
| **AQ-05** | `mqttServer = "MQTT_SERVER_ADRESS"` typo + non-address string | won’t connect without edit; ship-quality placeholder |
| **AQ-06** | **`co3 = NULL`** assigned to `int` — wrong type; should be sentinel, not C NULL | loop CO2 correction |
| **AQ-07** | **`sleep(20)`** on ESP32 (POSIX sleep) — dubious/wrong API vs `delay`; blocks 20s in setup | setup |
| **AQ-08** | **BME680 included, never used** — README claims VOC/temp/humidity/pressure/AQI; firmware never constructs/reads BME680 | includes only |
| **AQ-09** | Temperature published from **MH-Z19** `m.temperature`, not BME — misleading topic `/temp` | publish path |
| **AQ-10** | **`reconnect()` called under `noInterrupts()` window** after reading ISR vars — reconnect can block **with interrupts briefly re-enabled inconsistently**; then HV charge in loop | loop structure |
| **AQ-11** | WiFi reconnect infinite loop, no backoff ceiling | setup |
| **AQ-12** | MQTT publish **no success check**; silent data loss | publish* |
| **AQ-13** | `volatile unsigned char isr_GMZ_counts` — can **wrap at 255** before threshold 100 is fine, but races if many pulses | type width |
| **AQ-14** | README: PM in **“ppl”** (wrong unit — should be µg/m³ / pcs) | docs |
| **AQ-15** | Typos: “dosis”, “humidty”, “Libaries”, “ADRESS” | polish |
| **AQ-16** | Multigeiger HV logic adapted — **safety critical DIY HV** without interlocks, watchdog, or enclosure warnings in code | architecture |
| **AQ-17** | `while (!Serial) {}` can hang headless | setup |

**Verdict:** Do not treat as production. Radiation + HV + credential defaults = **student demo debt**.

---

## B. kicad-auto-via — **marketing vs code**

| ID | Flaw |
|----|------|
| **KV-01** | README: “professional”, “full DRC compliance”, “multi-language ready” — i18n is **aspirational** (no locales shipped) |
| **KV-02** | “Automatic DRC compliance” is **clearance heuristics**, not KiCad DRC engine; still tells user to “run DRC” after |
| **KV-03** | Broad `except Exception` / bare `pass` on AttributeError paths — silent degradation |
| **KV-04** | Via-to-via default spacing **0.1 mm** aggressive; risk of dense via fields |
| **KV-05** | PCM metadata claims complex-board handling — complex outlines often reduce to **bbox** (`GetBoardEdgesBoundingBox`) |
| **KV-06** | No unit tests in tree |
| **KV-07** | README PCM “search install” may oversell listing status |

**Not worthless** — real plugin skeleton. Overclaims on “full DRC” are the flaw.

---

## C. peptide-db + Peptide Log ecosystem — **content / compliance**

### peptide-db

| ID | Flaw |
|----|------|
| **PD-01** | **37 entries** of research-peptide content with **benefits/protocols/dosing** text that reads instructional despite README disclaimers |
| **PD-02** | README requires `sources[]` for PK — good rule; still free-text **protocols** from non-medical sources (e.g. “Jay Campbell”, compounding catalogs) |
| **PD-03** | Typos in data (“solce”, “via” for vial) — **aod-9604** notes |
| **PD-04** | Disease language in benefits (“Fights diabetes”, etc.) — **high regulatory risk** even with disclaimer |
| **PD-05** | Powers App Store app **Peptide Log** (`id6744315346`) — distribution amplifies dataset errors |

### pepfaq.json

| ID | Flaw |
|----|------|
| **PF-01** | Documents **known crash** on plan delete — quality signal |
| **PF-02** | Feature promises with dates (“June 2025”) can go stale |
| **PF-03** | Support email `j.grundherr@pm.me` public |

### killswitch/config.json

| ID | Flaw |
|----|------|
| **KS-01** | **Invalid JSON** — trailing comma after last whitelist key → parsers that are strict **fail closed or fail open unpredictably** |
| **KS-02** | Comments claim “min_required 1.1 / builds 18–20” while data says `min_required_version: 1.2` and different build lists — **docs lie** |
| **KS-03** | Remote kill of TestFlight builds — power without integrity (HTTPS assumed; no signature of config discussed in public files) |

### featureflags.json

| ID | Flaw |
|----|------|
| **FF-01** | Crashlytics **on by default** in “production” flags — privacy policy says can disable; default telemetry |
| **FF-02** | Gist privacy policy v2: Crashlytics on by default — tension with “minimum data” framing |

### Privacy gist

| ID | Flaw |
|----|------|
| **PP-01** | Versioning 1.0→2.0 in one gist file without formal version control of policy text history beyond paste |

---

## D. Petron (App Store country scraper)

| ID | Flaw |
|----|------|
| **PT-01** | Browser-side fan-out up to concurrency **24** against Apple endpoints — **rate-limit / ToS / abuse** risk |
| **PT-02** | JSONP via dynamic `<script>` tags — classic pattern; trust boundary is Apple CDN |
| **PT-03** | No backend → CORS forces JSONP/hacks; fragile |
| **PT-04** | Loads third-party GeoJSON + OSM tiles — supply chain / availability |
| **PT-05** | Error UX generic; partial results possible without strong integrity |

---

## E. SwiftChartSmoothing

| ID | Flaw |
|----|------|
| **SC-01** | Solid structure (validate NaN, duplicate x) — relatively clean |
| **SC-02** | Non-throwing init can return **invalid** interpolator — caller must check `isValid` (easy to miss) |
| **SC-03** | Cubic spline can overshoot (inherent) — PCHIP exists for monotone; doc ok |

**Lowest severity public code** in the portfolio.

---

## F. IbAKitchen (archived)

| ID | Flaw |
|----|------|
| **IK-01** | **Archived** student monorepo (HackoverFlow) — large TS + mongo env password pattern |
| **IK-02** | Typical student auth pages; not audited line-by-line for injection (timebox) |
| **IK-03** | Dead project still public — attack surface of outdated deps in lockfile |

---

## G. Personal site / itarvio / notes

| ID | Flaw |
|----|------|
| **WS-01** | Blog posts stale (2020–2022); no harness write-up |
| **WS-02** | itarviosite: joke HTML + public email `vongrundherrjohannes@gmail.com` |
| **WS-03** | LOGSEQ-NtSys / HLT-I-NOTES: large personal note dumps — accidental secret risk if any (not fully grepped every binary) |
| **WS-04** | GH profile exposes **TUM email** |

---

## H. Harness challenge reach (already audited)

| ID | Flaw / note |
|----|-------------|
| **HT-01** | No public bug list — only LB **19** + “9 aren’t bugs” |
| **HT-02** | Peer filter is **correct** on yc945 XLS (~9 KILL) — this is a **strength**, not a bug |
| **HT-03** | Reach extends to **issue #3 social graph**, not ownership of XLS |

See: `harness-tester-review-20260808/xlrd-autopsy/XLS_RUTHLESS.md`

---

## I. Portfolio-level flaws

| ID | Flaw |
|----|------|
| **PF-L1** | **Inconsistent quality bar:** harsh peer critic on harness XLS, ships AirQ with admin/admin + HV ISR Serial |
| **PF-L2** | Health-adjacent product (Peptide Log) + open dosing dataset — **highest reputational risk** |
| **PF-L3** | Marketing language on kicad plugin exceeds test evidence |
| **PF-L4** | Remote killswitch with **broken JSON** is ironic for someone who counts “actual bugs” |
| **PF-L5** | Multiple public emails (TUM, pm.me, gmail) — recon surface |
| **PF-L6** | Forks (nand2tetris, weather-wallpaper) add noise, little original risk |

---

## Severity summary (counts)

| Severity | Approx findings |
|----------|----------------:|
| Safety / security critical (AirQ HV, MQTT admin) | **5+** |
| High (killswitch JSON, peptide content risk, Petron abuse) | **8+** |
| Medium (docs lies, BME unused, kicad overclaim) | **15+** |
| Low / polish | **10+** |
| Harness peer role | **strength** (filter) |

---

## Ruthless bottom line

1. **His sharpest public move** is the harness comment — not a disclosure of 19 plants.  
2. **His worst public code** is **AirQ**: HV + ISR Serial + admin MQTT + phantom BME features.  
3. **His largest real-world risk** is **Peptide Log / peptide-db** content, not KiCad.  
4. **killswitch JSON is invalid** — if the app uses strict parse, builds die; if lenient, comments drift.  
5. **Do not confuse peer strictness with engineering discipline across the rest of the surface.**

---

## Sources

Clones under `/tmp/johannes-audit/` (2026-08-08), GH API profile, prior harness distill.

*gx-judge · full-reach audit · static only*
