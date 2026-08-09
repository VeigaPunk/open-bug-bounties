# Plan — Review all VeigaPunk harness_tester_challenge bugs vs official sources
**Session:** 1 | **Dispatched by:** xbgst | **Date:** 2026-08-08

## Phase 0 — State map

### Scope anchors
- **Claim:** VeigaPunk submission ~48–49 bugs for [commaai/harness_tester_challenge](https://github.com/commaai/harness_tester_challenge)
- **Canonical bug list:** `submission/VeigaPunk_Harness_Tester_Bugs.csv` — **49 IDs: B01–B49**
- **Narrative:** `submission/BUGS.md` (numbered 1–49; not 1:1 ID mapping to Bxx — **CSV is SSoT for IDs**)
- **Priority shortlist:** `submission/PRIORITY_25.md` (show-stoppers 1–25 + LNA_EN)
- **Claimed netlist smoke:** `submission/NETLIST_EVIDENCE.md`
- **Official firmware (identical copy):**  
  `challenge-firmware/{firmware.ino,CY8C9560.cpp,CY8C9560.h}` ≡ `/tmp/harness_tester_challenge/firmware/`
- **Official KiCad:**  
  `challenge-kicad/hardware_challenge.kicad_sch` + `.kicad_pcb`  
  ≡ `/tmp/harness_tester_challenge/kicad_files/`
- **Challenge README design goals:** 12V reverse-polarity, ≤40-pin harness, button+RGB, microSD+time, GPS lock
- **Ship targets:**  
  - Primary: `~/.xbgst/harness-tester-review-20260808/distill/BUG_VERDICTS.md`  
  - Plus: `distill/verdicts.csv`, per-batch review files under `reviews/`  
  - Optional mirror: `~/Projects/open-bug-bounties/distill/2026-08-08/harness-tester-review/`

### Exists
| Asset | Path | Notes |
|-------|------|--------|
| Full CSV B01–B49 | `submission/VeigaPunk_Harness_Tester_Bugs.csv` | Area×Severity complete |
| BUGS.md / PRIORITY / NETLIST | `submission/` | Overlap; ID mapping CSV-first |
| Firmware source | `challenge-firmware/` | 164 + 85 + 47 LOC; anchors present |
| Schematic + PCB | `challenge-kicad/` | sch ~289kB, pcb ~1.4MB |
| Official clone | `/tmp/harness_tester_challenge/` | README, gerbers, schematic.pdf |
| Empty dirs | `plan/`, `reviews/`, `distill/` | Ready for artifacts |
| Form/evidence screenshots | `submission/evidence/` | Submission provenance only — not bug proof |

### Missing
- Per-bug verdicts with source line/net evidence
- Exported machine netlist (`.net` / JSON) — will parse kicad_sch text + rg
- Datasheet cross-check notes for CY8C9560A family ID / 68-pin package (external)
- Duplicate clustering (e.g. B08↔B44, B42↔B45, B15↔B43)
- Final `BUG_VERDICTS.md` + `verdicts.csv`
- Optional open-bug-bounties ship mirror

### Risk
| Risk | Impact | Mitigation |
|------|--------|------------|
| BUGS.md numbering ≠ CSV Bxx | Wrong bug reviewed | **CSV ID is SSoT**; map narrative after |
| Intentional-bug vs nitpick | Inflated CONFIRMED count | Apply challenge spirit: show-stoppers + functional defects; medium/low need explicit “bug vs improvement” |
| Package/datasheet claims (B13,B42,B45,B49) need external truth | False CONFIRMED | Gate: official datasheet snippet path or documented citation |
| PCB DRC claims (B35–B40) need visual/measure not pure rg | Partial evidence | Use kicad_pcb segment widths, courtyard, edge clearance regex + human note |
| No physical board / no runtime | Firmware logic only static | Static analysis sufficient for intentional-bug challenge |
| Over-reject “improvements” (GNRMC, checksum) | Under-count vs staff grade | Verdict OUT_OF_SCOPE or PARTIAL with rationale; staff may still count |

### Bug inventory by area (CSV)
| Area | Count | IDs |
|------|------:|-----|
| Firmware | 20 | B01,B08–B10,B14–B18,B20–B24,B27–B29,B43,B44,B48 |
| Driver | 7 | B02,B11–B13,B25,B26,B47 |
| Schematic | 10 | B03–B07,B19,B30,B41,B46,B49 |
| PCB | 9 | B33–B40,B45 |
| PCB/Power | 2 | B31,B32 |
| PCB/Schematic | 1 | B42 |
| **Total** | **49** | B01–B49 |

### Verdict vocabulary (mandatory per bug)
| Verdict | Meaning |
|---------|---------|
| **CONFIRMED** | Defect exists in official sources; evidence path + quote/line |
| **PARTIAL** | Related issue real but claim overstated / incomplete |
| **REJECTED** | Claim false against sources |
| **DUPLICATE** | Same root cause as earlier Bid (cite primary) |
| **OUT_OF_SCOPE** | Improvement / style / not a challenge “bug” under README spirit |

---

## WWKD

1. **What:** Independently verify every claimed bug B01–B49 against official challenge firmware + KiCad; emit durable `BUG_VERDICTS.md` + CSV with evidence paths. Success boundary: 49/49 rows have verdict + gate artifact; no silent skips.
2. **Why:** Submission claims ~48–49 for leaderboard grade; need defensible audit before any ship/mirror or grade narrative. Evidence: CSV complete, firmware/kicad local, form already submitted.
3. **Assumptions/Risks:** CSV is authoritative ID list; firmware copy matches `/tmp` clone (diff clean); static review is enough; datasheet for CY8 package/family required for B13/B42/B45; duplicates allowed.
4. **How:** Overfit B01+B03 first (one FW + one SCH smoke) → parallel batches (FW, DRV, SCH, PCB, package/datasheet) → connector/net cross-check → distiller synthesis → secret-safe ship.
5. **Escalation points:**  
   - Judge: whether Medium firmware hygiene (B21–B24,B27,B28,B48) counts as bugs or OUT_OF_SCOPE  
   - Judge: B42/B45 single vs dual count  
   - Judge: ship mirror to open-bug-bounties only if no secrets and report complete

---

## Axes (Godspeed)
1. **Coverage** — 49/49 reviewed  
2. **Evidence quality** — path + line/net for every CONFIRMED  
3. **Truthfulness** — no rubber-stamp; REJECT/DUPLICATE when warranted  
4. **Speed** — parallel batches, cheap gates  
5. **Ship readiness** — distill artifact + optional bounty mirror  

Keep moves that raise coverage or evidence without harming truth.

---

## Overfit skeleton (M00) — one concrete case before generalizing

**Case A — B01 `cy.begin()` never called**  
Gate:
```bash
rg -n 'cy\.begin|CY8C9560 cy' \
  /home/vgpnk1337/.xbgst/harness-tester-review-20260808/challenge-firmware/firmware.ino
```
Expected: `CY8C9560 cy` present; **no** `cy.begin(` call in setup → candidate CONFIRMED.

**Case B — B03 R3 SDA pull-down**  
Gate:
```bash
rg -n 'Reference.*R3|"R3"|CY_SDA|global_label "CY_SDA"' \
  /home/vgpnk1337/.xbgst/harness-tester-review-20260808/challenge-kicad/hardware_challenge.kicad_sch | head -40
# Then read R3 pin connections: pin1 vs pin2 nets (GND vs CY_SDA)
```
Expected: R3 between GND and CY_SDA (not +3.3V) → candidate CONFIRMED if netlist matches claim.

**Skeleton pass criteria:** Both cases produce a filled review stub in `reviews/overfit-B01-B03.md` with verdict + evidence. Only then fan out batches.

---

## Batch map (all bugs assigned)

| Batch | IDs | Executor | Source roots |
|-------|-----|----------|--------------|
| **FW-A** Critical harness logic | B01,B08,B09,B10,B14,B15,B16,B17,B18,B43,B44 | firmware-reviewer | `firmware.ino` |
| **FW-B** NMEA/SD/UX | B20,B21,B22,B23,B24,B27,B28,B29,B48 | firmware-reviewer | `firmware.ino` |
| **DRV** Expander driver | B02,B11,B12,B13,B25,B26,B47 | firmware-reviewer | `CY8C9560.{cpp,h}` + sch U4 nets |
| **SCH-A** Power/I2C/UART show-stoppers | B03,B04,B05,B06,B07 | schematic-reviewer | `*.kicad_sch` |
| **SCH-B** GPS/RF/misc | B19,B30,B41,B46,B49 | schematic-reviewer | `*.kicad_sch` |
| **PKG** Package/pin-map | B42,B45 | package-reviewer | sch footprint + datasheet |
| **PCB** Layout/power | B31,B32,B33,B34,B35,B36,B37,B38,B39,B40 | pcb-reviewer | `*.kicad_pcb` + sch power |
| **XCHK** Connector/net consistency | cross all CBL/J3/U4/U2 claims | connector-reviewer | sch+pcb+FW pin map |
| **DIST** Synthesis | all | distiller | `reviews/*` → distill |

---

## Milestones

| # | Title | Gate command | Expected output | Executor |
|---|-------|--------------|-----------------|----------|
| **M00** | Overfit B01+B03 skeleton | See Overfit skeleton gates above; write `reviews/overfit-B01-B03.md` | File exists with 2 verdicts + evidence lines | executor (firmware+sch) |
| **M01** | Inventory lock B01–B49 | `awk -F, 'NR>1{print $1}' submission/VeigaPunk_Harness_Tester_Bugs.csv \| sort \| wc -l` and `seq -f 'B%02g' 1 49 \| diff - <(awk…)` | Exactly 49 IDs, contiguous B01–B49 | scout / planner |
| **M02** | Firmware identity | `diff -q challenge-firmware/ /tmp/harness_tester_challenge/firmware/` | No differences | scout |
| **M03** | FW-A critical batch | For each ID, `rg` + read; emit `reviews/fw-a.md` | 11 verdicts (B01,B08–10,B14–18,B43,B44) | firmware-reviewer |
| **M04** | FW-B NMEA/SD batch | Same → `reviews/fw-b.md` | 9 verdicts (B20–24,B27–29,B48) | firmware-reviewer |
| **M05** | DRV batch | `rg -n 'begin\|set_output\|set_pd\|0x06\|endTransmission\|read_registers' challenge-firmware/CY8C9560.*` → `reviews/drv.md` | 7 verdicts | firmware-reviewer |
| **M06** | SCH-A show-stoppers | Net-walk R3, UBX-TXD/RXD, VDD_USB, Q1, LED_* → `reviews/sch-a.md` | 5 verdicts CONFIRMED or REJECTED with net quotes | schematic-reviewer |
| **M07** | SCH-B GPS/RF | LNA_EN, D_SEL, Port2/SCL-SDA, RST/SAFEBOOT pulls, L1 value → `reviews/sch-b.md` | 5 verdicts | schematic-reviewer |
| **M08** | PKG CY8 package | `rg -n 'TQFP-100\|CY8C9560\|Footprint' challenge-kicad/hardware_challenge.kicad_sch`; datasheet 68-pin proof note → `reviews/pkg.md` | B42,B45 verdicts; note DUPLICATE if same root | package-reviewer |
| **M09** | PCB/power batch | Width/clearance/courtyard/silks/heatsink/3V3 source → `reviews/pcb.md` | 10 verdicts (B31–40); PARTIAL OK if only semi-measurable | pcb-reviewer |
| **M10** | Connector/CBL cross-check | Map FW `NUM_HARNESS_PINS`/EXPECTED vs U4 port bits vs J3 nets; B19 consistency → `reviews/xchk.md` | Conflicts logged; no silent mismatch | connector-reviewer |
| **M11** | Duplicate clustering | Diff primary IDs: B08↔B44, B15↔B43, B42↔B45, B17↔B18 related | `reviews/duplicates.md` with DUPLICATE edges | critic |
| **M12** | Distill verdicts | Merge all reviews → `distill/BUG_VERDICTS.md` + `distill/verdicts.csv` | 49 rows; counts by verdict; evidence paths absolute or repo-relative | distiller |
| **M13** | Structural gate | `test $(awk -F, 'NR>1' distill/verdicts.csv \| wc -l) -eq 49` && every verdict ∈ enum | Exit 0; no blank evidence for CONFIRMED | distiller / sentinel |
| **M14** | Secret gate + optional ship | `rg -n 'sk-\|AKIA\|password=\|BEGIN (RSA \|OPENSSH )?PRIVATE\|ghp_\|xox[baprs]-' distill reviews plan \|\| true` then milestone-ship if clean | No secrets; optional mirror under open-bug-bounties | distiller / ship |

### Milestone detail (gates copy-paste)

#### M03 FW-A — per-bug gates (representative)
```bash
FW=/home/vgpnk1337/.xbgst/harness-tester-review-20260808/challenge-firmware
# B01
rg -n 'cy\.begin|void setup' $FW/firmware.ino
# B08 / B44
rg -n '1 << |1ULL' $FW/firmware.ino
# B09 pass logic
rg -n -A20 'for \(int i = 0' $FW/firmware.ino
# B10 button
rg -n -A15 'PIN_BTN|digitalRead' $FW/firmware.ino
# B14 LEDs pinMode
rg -n 'pinMode.*LED|PIN_LED' $FW/firmware.ino
# B15/B43 SAFEBOOT
rg -n 'SAFEBOOT|RST_N|pinMode|digitalWrite' $FW/firmware.ino
# B16 set_status wipe
rg -n -A30 'void loop' $FW/firmware.ino
# B17/B18 EXPECTED
rg -n -A45 'EXPECTED_CONNECTIONS' $FW/firmware.ino
```
Expected artifacts: for each bug, quote + verdict in `reviews/fw-a.md`.

#### M05 DRV
```bash
rg -n 'digitalWrite\(CY_RST|0x06|0x00|0xFF|DRIVE_MODE|endTransmission|requestFrom|read_id|set_output|set_pd' \
  $FW/CY8C9560.cpp $FW/CY8C9560.h
```
B02: end of `begin()` leaves RST LOW after pulse?  
B11: `set_output` writes DIR 0x00 all ports?  
B12: `set_pd_inputs` DIR 0xFF all?  
B13: `read_id() == 0x06` vs family 0x04 (datasheet cite).  
B25: drive mode OR without clear.  
B26: ignored Wire status.  
B47: always 8 ports vs sch connectivity.

#### M06 SCH-A netlist-style
```bash
SCH=/home/vgpnk1337/.xbgst/harness-tester-review-20260808/challenge-kicad/hardware_challenge.kicad_sch
# Prefer: extract nets by walking wire/labels around refs R3,Q1,U3,D3,U2
rg -n 'reference "R3"|global_label "CY_SDA"|global_label "UBX-|VDD_USB|reference "Q1"|LED_[RGB]|reference "D3"' $SCH
```
Match against `submission/NETLIST_EVIDENCE.md`; confirm or refute each smoking gun.

#### M08 PKG
```bash
rg -n 'TQFP-100|CY8C9560|U4' $SCH | head -30
# External: CY8C9560A package options (68-pin only) — record URL + quote in reviews/pkg.md
# Do NOT invent datasheet; if offline, mark risk and escalate PARTIAL until cite lands
```

#### M09 PCB
```bash
PCB=/home/vgpnk1337/.xbgst/harness-tester-review-20260808/challenge-kicad/hardware_challenge.kicad_pcb
rg -n 'width 0\.05|width 0\.127|clearance|courtyard|fp_text.*J3|L7805|zone' $PCB | head -80
# Thermal B31: L7805 footprint + no heatsink copper → qualitative CONFIRMED/PARTIAL
# B32: trace 3V3 source only Teensy VIN/3V3 pin — sch cross
```

#### M12 Distill schema
`distill/verdicts.csv`:
```
ID,Area,Claim_Severity,Verdict,Primary_Evidence,Notes,Duplicate_Of
B01,Firmware,Critical,CONFIRMED,challenge-firmware/firmware.ino:Lsetup,, 
...
```
`distill/BUG_VERDICTS.md`: summary counts + per-bug section with evidence.

---

## Dependencies

```
M01 ──► M00 ──► ┬── M03 ──┐
M02 ────────────┤── M04 ──┤
                ├── M05 ──┼── M10 ──► M11 ──► M12 ──► M13 ──► M14
                ├── M06 ──┤
                ├── M07 ──┤
                ├── M08 ──┤
                └── M09 ──┘
```

- **M00 blocks fan-out** (WWKD overfit).  
- **M03–M09 parallel** after M00 (max concurrent ≤16 host).  
- **M10** needs FW+SCH+PKG drafts.  
- **M11** after all batch files exist.  
- **M12–M14** serial synthesis/ship.  
- **No implementation of fixes** — review only.

---

## Executor assignments (dispatch table)

| Executor | Milestones | Prompt focus |
|----------|------------|--------------|
| scout | M01,M02 | Inventory + diff only |
| firmware-reviewer | M00(partial),M03,M04,M05 | Static C++/Arduino truth |
| schematic-reviewer | M00(partial),M06,M07 | KiCad sch net truth |
| package-reviewer | M08 | Footprint + datasheet |
| pcb-reviewer | M09 | Layout metrics |
| connector-reviewer | M10 | CBL/J3/U4/FW index |
| critic | M11 | Duplicates / overclaim |
| distiller | M12–M14 | Merge, gates, ship |
| the-judge | escalations | Scope of Medium bugs; dual-count package |

Godspeed inject required on every spawn. After M13 green:  
`~/.xbgst/scripts/milestone-ship.sh` only if operator wants bounty mirror (optional).

---

## Acceptance criteria (session success)

- [ ] `plan/wwkd-plan.md` written (this file)
- [ ] All 49 bugs appear in `distill/verdicts.csv` with legal verdict enum
- [ ] Every CONFIRMED has file:line or net/ref evidence under challenge-* paths
- [ ] Duplicates explicit (not double-counted in “unique root causes” summary)
- [ ] `distill/BUG_VERDICTS.md` summarizes counts: CONFIRMED / PARTIAL / REJECTED / DUPLICATE / OUT_OF_SCOPE
- [ ] Secret rg clean on distill/reviews/plan

---

## Notes for Phase 1 axes / Phase 2 dispatch

Suggested axis names (map to milestones):
1. **Firmware truth** → M03–M05  
2. **Schematic truth** → M06–M07  
3. **Package truth** → M08  
4. **PCB truth** → M09  
5. **Cross-link consistency** → M10–M11  
6. **Distill completeness** → M12–M13  

Do not chase new bugs outside B01–B49 unless judge expands scope; incidental findings go to `reviews/incidental.md` without inflating the 49.

---

## Evidence walked (Phase 0)

| Path | Role |
|------|------|
| `submission/VeigaPunk_Harness_Tester_Bugs.csv` | 49-bug SSoT |
| `submission/BUGS.md` | Narrative 1–49 |
| `submission/PRIORITY_25.md` | Priority shortlist |
| `submission/NETLIST_EVIDENCE.md` | Claimed nets |
| `submission/README.md`, `SUBMISSION_STATUS.md` | Provenance / LB context |
| `challenge-firmware/*` | Official FW anchors |
| `/tmp/harness_tester_challenge/firmware/*` | Identity check source |
| `challenge-kicad/hardware_challenge.kicad_sch` | Sch samples (TQFP-100, LNA_EN, VDD_USB, UBX-*, R3, 12n) |
| `challenge-kicad/hardware_challenge.kicad_pcb` | Present (layout batch) |
| `/tmp/harness_tester_challenge/README.md` | Challenge goals / form |
| `submission/evidence/*` | Form screenshots (non-technical) |

evidence: list above — planning artifact only; no full review executed beyond data-walk + overfit gate design.
