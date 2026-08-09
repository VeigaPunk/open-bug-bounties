# A/B readiness — Google Drive (research only)

**UTC:** 2026-08-09T01:36:00Z  
**Lane:** `lanes/grok/google-vrp/`  
**Claim:** `google-drive-ready` · orch-5  

## Human door (from HUMAN-GATES)

- Two research Google accounts required for Drive FIRST-5.
- op historically: one Google password; second incomplete (bughunters URL only).
- Agent must **not** thrash dual-login or OAuth loops overnight.

## Readiness checklist

| # | Item | Status | Detect without thrash |
|---|------|--------|------------------------|
| R1 | Account A research Google usable | **UNKNOWN / human** | Operator STATUS flip or local profile exists (do not store cookies) |
| R2 | Account B research Google usable | **UNKNOWN / human** | Same |
| R3 | Profiles separated (no session bleed) | **PENDING human** | Two browser profiles / containers |
| R4 | DevTools Network ready | **PENDING human** | Manual when live |
| R5 | Test objects plan (Doc + Folder) | **READY (map)** | Create only under A after R1–R3 |
| R6 | Vault titles (optional) | **optional** | Titles only if storing recovery notes — never cookies in tree |
| R7 | Live VRP rules recheck before submit | **READY (URL)** | SCOPE-NOTES + rules URL 200 passive |

## Agent sensors this tick (orch-5)

| Sensor | Value |
|--------|-------|
| passive bughunters | 200 |
| passive drive.google.com | 200 |
| passive docs.google.com | 200 |
| passive accounts.google.com | 200 |
| dual-session thrash | **forbidden** |
| COMPLETE | **0** |

## When R1–R3 go green (recovery first 3)

1. Attach A/B in **separated** profiles; confirm own-only Drive test objects.
2. Execute `FIRST-5-TESTS.md` T1→T5; fill `FIRST-5-RESULTS.md` + `evidence/` redacted.
3. On anomaly → promote REPORT finding stub immediately; on all secure → honest N/A rows; still not COMPLETE money path unless policy + COMPLETE-GATE say so.

**Phrase:** human may say accounts ready; agents re-read this file + STATUS.
