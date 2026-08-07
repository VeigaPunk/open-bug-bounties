# SCRIBE — dual-auth-runners

**Status:** COMPLETE | **Date:** 2026-08-07 | **Session:** dual-auth race (~14:06–14:20Z)

## Does

Parallel Q-BC (runner-A) vs Q-FP/H1 (runner-B) auth-readiness race under dual sekhmet substrate; sanitize + vault hygiene; COMPARE winner locked — no live exploit, no secrets in distill.

---

## 1) Sanitize

| Step | Path / cmd | Result |
|------|------------|--------|
| tmp sanitize | `~/.xbgst/scripts/tmp-sanitize-bounty.sh` | exit **0** |
| sekhmet gc | `sekhmet gc --max-age 1` | exit **0** |
| /tmp headroom | post-sanitize | ~1–2% used, ~16G avail |
| Workflow log | `tmp-sanitize-logs/WORKFLOW-SAN.md` | ok=true |
| Runtime roots | `$XDG_RUNTIME_DIR/xbrd-spark-{luna,spark}` | isolated dirs present |

Secret scan: **PASS** — titles/`op://` refs only; no password values in tree.

---

## 2) Substrate

| Pool | Wrapper | Primary model | Root |
|------|---------|---------------|------|
| LUNA | `~/.xbgst/scripts/sekhmet-luna.sh` | gpt-5.6-luna | `$XDG_RUNTIME_DIR/xbrd-spark-luna` |
| SPARK | `~/.xbgst/scripts/sekhmet-spark.sh` | gpt-5.3-codex-spark | `$XDG_RUNTIME_DIR/xbrd-spark-spark` |

- Worker host: **codex-titanium**; default `-j 64`; host Grok ≤16
- Env: `~/.xbgst/env.l3-sekhmet.sh`
- SSoT crate: `~/Projects/xbrd-spark` (not sekhmetalt)
- Dry-run dual roots: **PASS** (both exit 0)
- Live: luna **PASS**; spark **DEGRADED** (`usage_limit` → luna fallback; roots still isolated)
- Detail: `shared/SUBSTRATE.md`, `shared/GATES-dual.md`

---

## 3) A/B race

| Lane | Queue | Focus | Key artifacts |
|------|-------|-------|---------------|
| **A** | Q-BC | Join matrix, Okta Set5 SPA map, L3 checklists, dual-pool swarm harvest | `runner-a/REPORT.md`, `AUTH-READINESS.md`, `Q-BC-JOIN-READINESS.md`, `OKTA-FORM-MAP.md`, `l3/checklist-*.md`, `SEKHMET-HARVEST.md` |
| **B** | Q-FP + Q-H1 | Multi-platform findings packs, XOR F4, scrub attestation | `runner-b/REPORT.md`, `auth/AUTH-READINESS.md`, `findings/F{1-4}-*.md`, `H1-shopify-criteria.md`, `SCRUB.md`, `l3/*-swarm*.ndjson` |

### Shared wins
- Dual wrappers + dual runtime roots
- Vault discipline (`shared/VAULT-INVENTORY.md`)
- Policy freeze (recon/auth maps only)
- Okta Set5 non-durable `session_hint` documented (`shared/OKTA-SET5-PROBE.md`)

### A-only highlights
- Q-BC 5/5 **joined**; engagement HTTP 200 doors
- Okta form/session map + Set5 runbook
- Higher sekhmet auth-swarm volume + L3 checklists (Aiven, identity-day, Atlassian+OpenAI STOP)

### B-only highlights
- F1 Google / F2 MSRC / F3 Proton / F4 Dropbox + H1 Shopify packs
- Hard XOR Dropbox DEEP vs GitLab STUB
- Explicit `SCRUB.md` + leakage `rg` gate

---

## 4) Compare winner

**Source:** `COMPARE.md` (ts 2026-08-07T14:20Z)

| Axis | A | B |
|------|---|---|
| auth_ready | **5** | 4 |
| actionable_evidence | 4 | **5** |
| sekhmet_dual_pool | **5** | 4 |
| secret_hygiene | 4 | **5** |
| policy_safety | **5** | **5** |
| **Total** | **23** | **23** |

**Winner: A (Q-BC)** — tie broken by **auth_ready + sekhmet volume**.

- Mid-race / content co-win: **B** (faster findings packs + XOR F4)
- Final race (auth-progress package): **A**
- Pareto keep: A substrate + Okta map; B XOR + F1–F4/H1 packs

**Status:** COMPARE complete · winner **A** · B first-class for multi-program hunt packs.

---

## Gates (rollup)

| Gate | Status |
|------|--------|
| tmp headroom | PASS |
| sekhmet dry-run dual roots | PASS |
| sekhmet luna live | PASS |
| sekhmet spark live | DEGRADED (usage_limit → luna; roots OK) |
| vault / secret scan | PASS |
| Okta Set5 map (non-durable) | PASS |
| dual race / COMPARE | DONE |

---

## Human remaining (paths only — no secrets)

1. Set5 Okta browser + MFA (durable session)
2. Aiven free-tier + ninja mail
3. Auth0 Get Credentials → op vault
4. Atlassian `bugbounty-test-*` CAPTCHA
5. H1 Shopify logged-in export (lift PARTIAL)
6. Intigriti Dropbox only if XOR holds Dropbox

---

## Evidence paths

| Role | Path |
|------|------|
| Root | `~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/` |
| This SCRIBE | `dual-auth-runners/SCRIBE.md` |
| COMPARE | `dual-auth-runners/COMPARE.md` |
| CONNECTOR | `dual-auth-runners/CONNECTOR.md` |
| PLAN | `dual-auth-runners/PLAN-r0.md` |
| Substrate | `dual-auth-runners/shared/SUBSTRATE.md` |
| Gates | `dual-auth-runners/shared/GATES-dual.md` |
| Sanitize log | `dual-auth-runners/tmp-sanitize-logs/WORKFLOW-SAN.md` |
| Runner A | `dual-auth-runners/runner-a/REPORT.md` |
| Runner B | `dual-auth-runners/runner-b/REPORT.md` |
| Action log | `~/.xbgst/bounty-distill/2026-08-07/ACTION-LOG.md` |
| Wrappers | `~/.xbgst/scripts/sekhmet-{luna,spark}.sh` |
| Sanitize script | `~/.xbgst/scripts/tmp-sanitize-bounty.sh` |

## Policy

Recon / auth-readiness only. No secrets in tree. Own/test assets language. OpenAI security-impact only. **Next:** human click pack — not more swarm volume.
