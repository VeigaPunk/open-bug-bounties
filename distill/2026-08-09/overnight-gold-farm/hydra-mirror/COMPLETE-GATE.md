# COMPLETE-GATE — mechanical rules before STATUS=COMPLETE and hydra-refill

**Session:** overnight-gold-farm · **Landed:** 2026-08-08 (connector R2)  
**Axes:** evidence_fidelity↑ safety_in_policy↑ ship_hygiene↑ gold_ev_per_hour↑ thrash↓  
**SSoT peers:** `EV-QUEUE.md` · `OVERNIGHT-LOOP.md` · `HUMAN-GATES.md` · `HYDRA.md` · lane `STATUS.md`/`REPORT.md`

## Hard rule

```
MAP ≠ COMPLETE
```

- **MAPPED / PARTIAL / BLOCKED(human)** may ship audit trails without money path.
- **COMPLETE** is allowed only when this gate checklist is **all PASS** for that lane.
- Whip today greps `COMPLETE` in `STATUS.md` and may invoke `hydra-refill.sh` — **do not set that string** until this file’s checklist is satisfied and a distiller/sentinel line is logged.

## Who may flip COMPLETE

| Role | May flip STATUS → COMPLETE? |
|------|-----------------------------|
| Lane orch / sekhmet L3 | **No** alone — may propose + attach evidence |
| Distiller / sentinel | **Yes** after checklist PASS (timestamped note in STATUS) |
| Human operator | **Yes** (overrides agent veto only if evidence still real) |
| Whip / pruner / idle tick | **Never** invent COMPLETE |

## Required evidence paths (must exist and be non-empty)

Paths are relative to the **lane workdir** (e.g. `lanes/stack/aiven/`).

| # | Path | Must contain | Fail closed if |
|---|------|--------------|----------------|
| E1 | `STATUS.md` | Explicit human-gate open note; **no** COMPLETE until E2–E8 pass | COMPLETE string present without GATE-PASS block |
| E2 | `REPORT.md` | Findings summary with **links to evidence files** (not prose-only) | Report claims impact with zero path citations |
| E3 | `FIRST-5-TESTS.md` (or lane equiv) | Ordered own-scope tests; status per test | Only map/unauth matrix labeled as complete bounty |
| E4 | `evidence/OWN-ASSET.md` | Asset IDs owned by research accounts (project/site/tenant/mailbox) — **no secrets** | Missing file or third-party-only targets |
| E5 | `evidence/FIRST-5-RESULTS.md` | Redacted outcomes per test (HTTP codes, IDs, not tokens) | Empty or “TBD” for all rows while claiming COMPLETE |
| E6 | `SCOPE.md` or `SCOPE-NOTES.md` | In-scope assertion + out-of-scope avoid list | Scope silent or contradicts program policy |
| E7 | `evidence/` ≥1 passive or active **own-asset** artifact (`.md` preferred; pre-existing `.txt` OK read-only) | Timestamp + command class + redacted result | Only unauth public spider dumps |
| E8 | Secret gate log line (local, not secrets) | `rg` secret-gate clean on lane + distill paths before ship | Secrets found → BLOCKED, never COMPLETE |

### Optional but preferred (when class fits)

| Path | When |
|------|------|
| `OWN-ASSET.md` (root) | Aiven-style dual free-tier |
| `CRED-STATE.md` | Auth0/BC credentialed programs — must say **ASSIGNED** not REQUESTED |
| `DRAFT-REPORT.md` | Submit-ready skeleton with impact + repro without secrets |
| `l3/` checklist outs | Policy/authz matrices that cite **own** assets only |

## Program-specific gates (H1–H3 live + refill keep-8)

### H1 Aiven (`lanes/stack/aiven/`)

| Check | PASS criteria |
|-------|----------------|
| Dual research access | op **titles only** pulse: `Aiven BB Account A API` + `B API` present (values via the-janitor never in files) |
| Own project | Free-tier (or allowed ninja) service IDs in `evidence/OWN-ASSET.md` |
| Authz path | At least one cross-member / multi-tenant test result under own project in `FIRST-5-RESULTS.md` |
| Kill | No dual tokens → stay MAPPED; do not COMPLETE on unauth console map alone |

### H2 Auth0 CIC (`lanes/wrap/auth0/`)

| Check | PASS criteria |
|-------|----------------|
| CRED | `CRED-STATE.md` = **ASSIGNED** (BC email/assign evidence timestamp) |
| Tenants | CIC tenants from assigned pack only; no personal Auth0 tenant as “bounty” |
| Dual-auth | Reuse dual-auth race playbook only on assigned assets |
| Kill | CRED REQUESTED / empty inbox → never COMPLETE; no CAPTCHA thrash |

### H3 Google VRP Drive (`lanes/grok/google-vrp/`)

| Check | PASS criteria |
|-------|----------------|
| Sessions | Two research Google sessions usable for Drive FIRST-5 **or** explicit **negative-close** pack (not COMPLETE money path) |
| Tests | Drive T1–T5 results in evidence with own docs/shared files |
| Kill | Single-account map-only → MAPPED/PARTIAL; COMPLETE only with dual-session evidence **or** accepted negative-close is **not** COMPLETE (use BLOCKED/PARTIAL) |

### Refill programs (when spawned by hydra-refill)

Same E1–E8. Map stubs live under:

`~/.xbgst/bounty-distill/2026-08-08/overnight-gold-farm/refill-prep/{PROTON,ATLASSIAN,MSRC}.md`

## Mechanical checklist block (paste into STATUS.md)

When all PASS, append **exactly** this shape (edit paths):

```markdown
## GATE-PASS (COMPLETE allowed)

- gate_version: COMPLETE-GATE.md@2026-08-08
- program: <name>
- evidence:
  - STATUS.md
  - REPORT.md
  - FIRST-5-TESTS.md
  - evidence/OWN-ASSET.md
  - evidence/FIRST-5-RESULTS.md
  - SCOPE.md | SCOPE-NOTES.md
  - evidence/<artifact>
- human_door: <what opened>
- secret_gate: PASS <ISO-UTC> paths=<list>
- distiller_or_sentinel: <role> <ISO-UTC>
- State: COMPLETE
```

**Order:** write GATE-PASS + evidence first → then set `State: COMPLETE` → only then run refill.

## hydra-refill preconditions

`~/.xbgst/scripts/hydra-refill.sh` may run **only if**:

1. Target lane STATUS has `GATE-PASS` block **and** `State: COMPLETE` (or `COMPLETE` with GATE-PASS above it).
2. E2–E7 paths listed in GATE-PASS **exist and are non-empty** (`test -s`).
3. Secret gate PASS within last 24h for that lane tree.
4. `tracker/EV-QUEUE.md` still SSoT for which 2 next to prefer (script queue is fallback; prefer keep-8 not already ACTIVE).
5. Operator or distiller explicitly invokes refill (whip may auto-call only when complete=1 **and** future whip should verify GATE-PASS — until whip is patched, **human/distiller must not leave COMPLETE without GATE-PASS**).

### Refill post-conditions

| # | Action |
|---|--------|
| R1 | `tracker/REFILL.log` gains UTC line with program + 2 spawned lanes |
| R2 | New dirs get `TASK.md` only (map phase); **State not COMPLETE** |
| R3 | `HYDRA.md` Completed table gains row with evidence path column |
| R4 | If APPROVED ship: `milestone-ship.sh` after secret gate; never ship secrets |
| R5 | Recompute EV-QUEUE gate_factor if human door still open elsewhere |

## Forbidden (auto-FAIL COMPLETE)

- Setting COMPLETE to “exercise refill” or dawn theater  
- COMPLETE with only unauth/public map evidence  
- COMPLETE while HUMAN-GATES door still closed for that program  
- CAPTCHA / Get-Credentials spam as evidence  
- Writing op reveals, API tokens, passwords into STATUS/REPORT/evidence/distill  
- Page-walk of ~1100 catalog programs as substitute for keep-8 depth  
- Client-side CAPTCHA bypass tooling  
- Honcho / banned-substrate side paths as bounty evidence  

## Agent states (allowed without COMPLETE)

| State | Meaning |
|-------|---------|
| MAPPED | Recon + FIRST-5 plan; human door may still be closed |
| PARTIAL | Some own-asset steps done; not submit-ready |
| BLOCKED(human) | Named door + recovery pointer (NEXT-TICK / CRED-STATE / HUMAN-GATES) |
| NEGATIVE-CLOSE | Honest no-find or dual-session impossible — **not** COMPLETE |

## Verification one-liner (before refill)

```sh
LANE="$HOME/.xbgst/hydra-bounty/lanes/<lane>/<prog>"
for f in STATUS.md REPORT.md FIRST-5-TESTS.md evidence/OWN-ASSET.md evidence/FIRST-5-RESULTS.md; do
  test -s "$LANE/$f" || echo "FAIL missing $f"
done
rg -q 'GATE-PASS \(COMPLETE allowed\)' "$LANE/STATUS.md" || echo "FAIL no GATE-PASS"
rg -n 'sk-|AKIA|password=|BEGIN (RSA |OPENSSH )?PRIVATE|ghp_|xox[baprs]-' "$LANE" || true
# then only if all green: bash ~/.xbgst/scripts/hydra-refill.sh <prog>
```

## Change control

- Edits to this gate: connector or planner with critic pass; bump date in header.  
- Whip COMPLETE detect should eventually require GATE-PASS (track as follow-up; **policy is binding now** even if script is string-only).

**evidence:** critic H2/H8 mitigation; EV-QUEUE freeze 2026-08-08; zero historical COMPLETE under hydra.
