# REPORT — Hydra grok lane · Google VRP hunt card

**ID:** hydra-google-vrp-grok  
**Date:** 2026-08-07  
**Lane:** grok · sekhmet luna-c  
**Status:** **MAPPED** — product + auth surface + first-5 tests + scope notes ready; **no live finding** this ship (policy map / own-account gate)

## Executive summary

Comma-fast Google VRP card locked on **one product: Google Drive** (Docs-as-Drive-objects), class **authz/IDOR/ACL residual**, **two research-owned accounts only**. Scope distilled from public VRP rules (TinyFish + prior full extract). Five manual tests defined. L3 sekhmet-luna-c tasks authored under `l3/`.

## Deliverables

| Artifact | Path |
|----------|------|
| Product pick | `PRODUCT-PICK.md` |
| Auth surface | `AUTH-SURFACE.md` |
| First 5 tests | `FIRST-5-TESTS.md` |
| Scope notes | `SCOPE-NOTES.md` |
| L3 tasks | `l3/tasks.txt` (ids `sp-gvrp-l3-0{1..4}`) |
| L3 results | `l3/sp-gvrp-l3-0{1..4}-result.md` · all **status=ok** (gpt-5.6-luna) |
| This report | `REPORT.md` |

## Scope sources

- https://bughunters.google.com/about/rules/google-friends/google-and-alphabet-vulnerability-reward-program-vrp-rules  
- Distill mirror: `~/.xbgst/bounty-distill/2026-08-07/scopes/google-vrp.md`  
- Submit: https://bughunters.google.com/

## Finding log

| # | Title | Result |
|---|-------|--------|
| — | — | **None filed** — active PoC deferred until human A/B sessions complete FIRST-5-TESTS |

## Gates

| Gate | State |
|------|-------|
| Own A/B Google accounts for live Drive tests | **Human / local** (not in repo) |
| Live re-verify VRP table before submit | Required |
| Secrets in lane files | Forbidden; secret-gate before ship |
| Cross-tenant / appspot customer | Out of scope |

## Next actions (cheap)

1. Run T1–T5 in FIRST-5-TESTS.md with two burner/research Google accounts.  
2. On anomaly: map IT1/IA vs IT2; draft Bug Hunters report with full repro.  
3. Prefer single high-quality report over recon thrash.  
4. Sekhmet L3: expand only policy/checklist polish — no exploit automation, no high-volume traffic.

## Safety

- Own assets only  
- No DoS, phishing employees, physical, high-volume scanners  
- No secrets/cookies/tokens in git or distill  

## Ship

Label: `hydra-google-vrp-grok` via `milestone-ship.sh` after secret gate.

**APPROVED:** Google VRP Drive authz hunt card complete for grok lane (map + tests + scope + sekhmet tasks).
