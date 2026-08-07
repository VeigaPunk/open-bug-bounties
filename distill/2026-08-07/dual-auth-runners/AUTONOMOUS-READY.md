# AUTONOMOUS-READY — dual-auth-runners

**UTC:** 2026-08-07  
**SSoT race:** DONE (GATES-dual + WORKFLOW-DONE + SHIP)  
**Winner:** A (Q-BC) · B retained for multi-program findings packs  
**Axes:** evidence_density · ship_hygiene · autonomy_without_human_blockers · safety_no_secrets  

## Verdict

Agents may **pulse, recon, re-gate, and ship sanitized distill** without a human in the loop.  
Agents must **not** claim bounty COMPLETE or invent durable sessions. Human freezes below are the only remaining blockers for instance-level hunt.

## Human freeze list (do not fake)

| # | Freeze | Why | Owner path |
|---|--------|-----|------------|
| 1 | Okta Set5 durable browser + MFA | Headless session not durable | NEXT-HUMAN · COMPARE blockers |
| 2 | Aiven free-tier + @bugcrowdninja project | Own-service instance for B1 | NEXT-HUMAN · CONTINUE parent |
| 3 | Auth0 Get Credentials → op only | Creds never in chat/repo | NEXT-HUMAN |
| 4 | Atlassian `bugbounty-test-*` + CAPTCHA | Site creation human | NEXT-HUMAN |
| 5 | H1 Shopify logged-in policy export | SPA login export PARTIAL | NEXT-HUMAN · runner-B |
| 6 | Google dual own accounts (A/B) | F1 ACL map needs two sessions | WORKFLOW-DONE hydra handoff |
| 7 | Intigriti Dropbox join / trial (optional XOR) | Policy + UA path | COMPARE followups |

**Policy freeze (always):** recon / enroll / auth maps only — no live exploit payloads in agents.

## Dry re-gate commands (no secrets, no live exploit)

Run from any host with `~/.xbgst` and `rg`/`sekhmet` on PATH. Paths only; do not `op item get --reveal`.

```bash
# 0) UTC + tmp headroom
date -u +%Y-%m-%dT%H:%MZ
df -h /tmp | tail -1

# 1) Race docs present
test -f ~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/WORKFLOW-DONE.md
test -f ~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/SHIP.md
test -f ~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/COMPARE.md
rg -n 'DONE|finished|ok=true' \
  ~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/shared/GATES-dual.md \
  ~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/WORKFLOW-DONE.md \
  ~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/SHIP.md

# 2) Secret gate (strict) — fail closed on real hits; scrub docs may name patterns
ROOT=~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners
rg -n 'sk-|AKIA|password=|BEGIN (RSA |OPENSSH )?PRIVATE|cTtux|ghp_|xox[baprs]-' \
  "$ROOT/runner-a/REPORT.md" "$ROOT/runner-b/REPORT.md" \
  "$ROOT/COMPARE.md" "$ROOT/SHIP.md" "$ROOT/WORKFLOW-DONE.md" \
  "$ROOT/shared/GATES-dual.md" "$ROOT/AUTONOMOUS-READY.md" \
  || true

# 3) Dual sekhmet dry (substrate isolation) — prefer wrappers
~/.xbgst/scripts/sekhmet-luna.sh --help >/dev/null
~/.xbgst/scripts/sekhmet-spark.sh --help >/dev/null
# optional short dry-run if env already sourced:
# sekhmet swarm -j 1 --dry-run  # only if local flag exists; else skip

# 4) Vault titles only (no reveal)
test -f "$ROOT/shared/VAULT-INVENTORY.md"
rg -n 'op://' "$ROOT/shared/VAULT-INVENTORY.md" | head

# 5) Ship hygiene reference (do not re-push unless new APPROVED milestone)
test -x ~/.xbgst/scripts/milestone-ship.sh
```

Expected dry posture: GATES race **DONE**, workflow **finished**, SHIP **ok=true**, secret gate **CLEAN** (or scrub-doc pattern names only), tmp headroom low single-digit % use.

## Next operator phrase

```
xbgst live test Aiven
```

Meaning: human has (or will complete) freeze #2 Aiven free-tier/@bugcrowdninja path and authorizes **in-scope** assist against Aiven per program brief — not off-scope prod abuse. Prefer parent `CONTINUE.md` + `ENROLL.md` + runner-a Aiven checklist after phrase.

## Links

- Plan: `PLAN-r0.md`
- Gates: `shared/GATES-dual.md`
- Compare / Scribe / Ship / Workflow: `COMPARE.md` · `SCRIBE.md` · `SHIP.md` · `WORKFLOW-DONE.md`
- Human: `shared/NEXT-HUMAN.md` · parent `../CONTINUE.md`
- Ship dest (already on main): `~/Projects/open-bug-bounties` → `distill/2026-08-07/dual-auth-runners/`

## Explicit non-actions

- No git commit from this docs closeout unless orchestrator re-approves ship  
- No secret values, cookies, or `op` reveals in distill  
- No force COMPLETE on hydra lanes while freezes remain  
