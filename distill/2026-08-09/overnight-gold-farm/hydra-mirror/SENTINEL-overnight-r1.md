# SENTINEL overnight-r1 — farm path security audit

**Role:** gx-sentinel-r1  
**Date:** 2026-08-08 (scan ~2026-08-09T01:00Z class)  
**Scope:** `~/.xbgst/hydra-bounty`, `~/.xbgst/bounty-distill/2026-08-08`, ship path `~/Projects/open-bug-bounties`, `hydra-whip.sh` thrash surface  
**Posture:** adversarial · proof over theory · **never print secret values**

## Axes

| Axis | Overnight target |
|------|------------------|
| `secret_hygiene↑` | Zero real secrets in farm/distill paths |
| `ship_gate↑` | .gitignore + secret rg before milestone-ship |
| `no_thrash↑` | Whip/pruner idle-only when gates closed |
| `janitor_compliance↑` | Secrets via `the-janitor`, not bare `op` |
| `scope_discipline↑` | No out-of-scope door/CAPTCHA loops |

---

## Phase 1 — SURFACE

| Surface | Boundary | Risk class |
|---------|----------|------------|
| hydra plans/tracker/lanes | local md → ship via milestone-ship | scrub-doc vs real secrets |
| bounty-distill/2026-08-08 | local mirror → open-bug-bounties/distill | OAuth code paste history |
| open-bug-bounties git | public push | incomplete ignore patterns |
| hydra-whip 119s loop (pid live) | tmux/op/filesystem | thrash + bare `op` |
| hydra-pruner | `/tmp` + luna runtime dirs `rm -rf` | over-delete if mis-aged |
| START.txt under hydra-bounty | pre-existing `.txt` | policy debt (no-txt rule) |

**Trust:** agents write distill → secret gate → rsync/copy to `open-bug-bounties/distill/` → commit+push. Fail closed on real secrets.

---

## Phase 2 — SECRET GATE (counts/paths only)

### Pattern set

`sk-` · `AKIA` · `password=` · `BEGIN (RSA\|OPENSSH)? PRIVATE` · `cTtux` · `ghp_` · `xox[baprs]-`

### hydra-bounty

| Metric | Value |
|--------|-------|
| Files with hits | **2** |
| Total line hits | **2** (1 per file) |
| Paths | `plans/PLAN-r0-overnight-gold-farm.md` · `plans/PLAN-r0-hydra.md` |
| Classification | **scrub-doc only** — pattern strings inside secret-gate / M0x command examples |
| Real material (`sk-[…]{16,}`, `AKIA…`, `ghp_…{20,}`, PEM blocks) | **0** |

### bounty-distill/2026-08-08

| Metric | Value |
|--------|-------|
| Files with hits | **2** |
| Total line hits | **2** |
| Paths | `oauth-callback-audit/REPORT.md` · `oauth-callback-audit/PLAN.md` |
| Classification | **scrub-doc only** — e.g. `` `ghp_…` `` negation text; gate command in PLAN |
| Real material | **0** |
| OAuth `code=` | distill uses `REDACTED` / `REDACTED_CODE` only (spot-check); FINDINGS claim no raw codes stored |

### High-risk file types

| Class | Count under scope |
|-------|-------------------|
| `*.pem` / `*.key` / `.env*` / `*cookie*` / `*credentials*` | **0** |

**Verdict secret scan:** GREEN (documentation patterns only).

---

## Phase 3 — .gitignore REVIEW

### `~/Projects/open-bug-bounties/.gitignore`

**Present (good):** `/node_modules`, `*.pem`, `.env*`, `/outputs/`, `/work/`, `/dist/`, `.vercel`, debug logs.

**Gaps (WARN — defense in depth if agents drop junk into worktree):**

| Pattern | Status |
|---------|--------|
| `*.key` | MISS |
| `id_rsa*` | MISS |
| `credentials*` | MISS |
| `**/secrets/` | MISS |
| `.op/` | MISS |
| `*.cookie` / cookie dumps | MISS |

**Note:** Ship helper should still stage project distill only; gaps matter if someone `git add -A` from repo root after dumping cookies/keys.

### bounty-distill

| Path | Git | .gitignore |
|------|-----|------------|
| `~/.xbgst/bounty-distill/2026-08-07/` | **yes** (standalone `.git`) | **yes** — strong: `.env*`, `*.pem`, `*.key`, `id_rsa*`, `credentials*`, `.op/`, `**/secrets/` |
| `~/.xbgst/bounty-distill/2026-08-08/` | **no** | **no** |
| `~/.xbgst/hydra-bounty/` | **no** | n/a |

**INFO:** 2026-08-08 is not a git repo (correct for local SSoT + ship-only mirror). Lack of local `.gitignore` is low risk unless someone later `git init` without copying 08-07 rules. Prefer symlink/copy of 2026-08-07 `.gitignore` into 2026-08-08 before any local git init.

---

## Phase 4 — hydra-whip thrash vectors

**Script:** `~/.xbgst/scripts/hydra-whip.sh`  
**Loop:** `while true; do bash hydra-whip.sh; sleep 119; done` — **LIVE** (pid file `~/.local/state/hydra-whip.pid`).

### Behavior map (code)

| Step | Action | Thrash? |
|------|--------|---------|
| Lane REPORT age | stat only | no |
| COMPLETE detect | `rg` STATUS.md only | no |
| tmux session probe | `has-session` / window names | no |
| fertility | calls `hydra-pruner.sh` | GC only |
| op gate | `op item get … --fields label=username` discard stdout | **janitor policy debt** |
| spawn/refill/ship | **explicitly not invoked** when quiet | good |
| CAPTCHA / login HTTP | **none** | good |

### Log posture (WHIP.log sample class)

Ticks of form: `no_missing no_COMPLETE no_spawn no_refill no_ship` + `op_aivenA=no|yes` — **observe-only**, matches overnight plan R1.

### Findings — whip / automation

```
FINDING: Bare `op item get` in hydra-whip (not the-janitor)
SEVERITY: WARN
VECTOR: 119s loop invokes CLI `op` for existence of "Aiven BB Account A/B API" username field. Values discarded to /dev/null, so no secret land in WHIP.log under current code. Violates janitor rule (always the-janitor for secret material paths); increases CLI surface / session dependency; future edit that logs fields would leak.
AFFECTED: ~/.xbgst/scripts/hydra-whip.sh:41-42
FIX: Probe via `the-janitor` boolean/metadata API only (or drop probe until human gate open); never log field values.
CONFIDENCE: high
```

```
FINDING: hydra-pruner age-gated rm -rf under /tmp and XDG runtime luna roots
SEVERITY: INFO
VECTOR: Called every whip tick. Deletes /tmp files (html/png/recon/obb) mmin+60 and named dirs mmin+120; luna-* children mmin+180. Mis-set clock or wrong name match could delete in-flight agent work — not remote RCE; local availability thrash.
AFFECTED: ~/.xbgst/scripts/hydra-pruner.sh:10-18; invoked from hydra-whip.sh:37
FIX: Keep name allowlists tight; log deleted paths to pruner log; never widen to $HOME or bounty-distill.
CONFIDENCE: high
```

```
FINDING: Overnight plan + whip correctly ban CAPTCHA/door thrash; live loop matches policy
SEVERITY: INFO (green evidence)
VECTOR: Code paths have no curl/wget to bounty hosts; actions array never spawns agents or refill. Risk of thrash is social/process (future script edit adding door probes on 119s), not present in current whip.
AFFECTED: hydra-whip.sh; PLAN-r0-overnight-gold-farm.md R1/M04
FIX: Keep dual thrash ban with netsshark auditor; any “health check” PR that hits Aiven/Auth0/Google login must be CRIT blocked.
CONFIDENCE: high
```

```
FINDING: open-bug-bounties .gitignore incomplete vs bounty-distill 2026-08-07 baseline
SEVERITY: WARN
VECTOR: If ship workflow or human stages non-distill artifacts (cookies, ssh keys, credentials dumps) under repo root, only .env* / *.pem are ignored — *.key / credentials* / cookies may commit.
AFFECTED: ~/Projects/open-bug-bounties/.gitignore
FIX: Align with bounty-distill 2026-08-07 .gitignore secret block; ship scripts continue project-files-only staging.
CONFIDENCE: high
```

```
FINDING: Pre-existing START.txt under hydra-bounty (no-txt policy debt)
SEVERITY: INFO
VECTOR: Policy forbids authoring .txt; file is 21B pre-existing. Not a secret leak.
AFFECTED: ~/.xbgst/hydra-bounty/START.txt
FIX: Rename to START.md when next touch; do not create new .txt.
CONFIDENCE: high
```

**Out-of-scope thrash:** No evidence whip or 2026-08-08 distill runs CAPTCHA loops or multi-program page thrash overnight. Idle policy in PLAN is map/sanitize/catalog only.

---

## Green / Red scoreboard

| Gate | Status | Evidence |
|------|--------|----------|
| Secret rg hydra-bounty | **GREEN** | 2 scrub-doc hits; 0 real |
| Secret rg bounty-distill/2026-08-08 | **GREEN** | 2 scrub-doc hits; 0 real |
| No pem/key/env/cookie files in scope | **GREEN** | find empty |
| OAuth codes not stored raw | **GREEN** | REDACTED_CODE discipline in oauth-callback-audit |
| Whip no CAPTCHA / no spawn / no refill on closed gates | **GREEN** | code + WHIP.log |
| Bare `op` vs the-janitor | **RED (policy)** | whip L41–42 |
| open-bug-bounties ignore depth | **YELLOW** | missing key/cookie/credentials patterns |
| 2026-08-08 local gitignore | **YELLOW** | absent; no git root yet |
| Pruner safety | **GREEN with INFO** | allowlisted paths only |

**Overall overnight farm security posture:** **GREEN for ship of scrubbed plans/distill** · **WARN residual** on janitor compliance + public-repo ignore hardening.

---

## Ship gate checklist (mandatory before milestone-ship)

Copy/paste operator checklist — fail any → **BLOCKED**, do not push.

- [ ] `APPROVED: <one-line reason>` emitted by owner (not sentinel alone)
- [ ] Secret gate (paths only; expect scrub-doc or empty):

```bash
rg -n 'sk-|AKIA|password=|BEGIN (RSA |OPENSSH )?PRIVATE|cTtux|ghp_|xox[baprs]-' \
  "$HOME/.xbgst/bounty-distill/2026-08-08" \
  "$HOME/.xbgst/hydra-bounty/plans" \
  "$HOME/.xbgst/hydra-bounty/lanes" \
  "$HOME/.xbgst/hydra-bounty/tracker" 2>/dev/null || true
```

- [ ] Real-material gate must be **empty** (fail closed if any hit):

```bash
rg -n 'sk-[A-Za-z0-9]{16,}|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{20,}|xox[baprs]-[A-Za-z0-9-]{20,}|BEGIN (RSA |OPENSSH )?PRIVATE KEY' \
  "$HOME/.xbgst/bounty-distill/2026-08-08" \
  "$HOME/.xbgst/hydra-bounty" 2>/dev/null
# expected: no output
```

- [ ] OAuth paste hygiene (if shipping oauth-callback-audit or overnight that references it):

```bash
rg -nE 'code=[A-Za-z0-9._/-]{12,}' "$HOME/.xbgst/bounty-distill/2026-08-08" 2>/dev/null || true
# only REDACTED / doc patterns; no long raw codes
```

- [ ] No `.env`, cookies, `op item get --reveal`, raw HTML login dumps, `*.pem` in **staged** tree
- [ ] Stage **project distill paths only** under `open-bug-bounties/distill/…` — never `~/.xbgst` wholesale
- [ ] Prefer: `~/.xbgst/scripts/milestone-ship.sh --label <label> --src <sanitized> --msg '…'`
- [ ] Post-ship: no force-push; secret gate on committed tree if doubt
- [ ] Whip remains no_spawn / no door probe while human gates closed

### Optional hardening (executor backlog, not ship blockers)

1. Rewrite whip Aiven probes through `the-janitor` (WARN → GREEN).  
2. Extend `open-bug-bounties/.gitignore` with `*.key`, `id_rsa*`, `credentials*`, `**/secrets/`, `.op/`, `*.cookie`.  
3. Copy `bounty-distill/2026-08-07/.gitignore` → `2026-08-08/.gitignore`.  
4. Rename `hydra-bounty/START.txt` → `START.md`.

---

## Exploit scenarios (proof obligation)

| ID | Scenario | Exploitable now? |
|----|----------|------------------|
| E1 | Public git history of open-bug-bounties contains raw OAuth code or ghp_ | **No evidence** in 2026-08-08 local distill; ship must re-run gates |
| E2 | WHIP.log accumulates Aiven API tokens | **No** — only username field existence, discarded; still policy wrong channel |
| E3 | 119s whip hammers Auth0 Get Credentials / CAPTCHA | **No** — no HTTP client in whip |
| E4 | Pruner deletes live spark root mid-job | **Unlikely** if jobs &lt;180m under luna roots; residual INFO |
| E5 | `git add -A` in open-bug-bounties after cookie dump | **Possible** if ignore gaps + human error — WARN |

---

## Verdict for judge / ship

**APPROVED (sentinel): secret surface clean for overnight farm paths — scrub-doc only.**  
Ship of **plans + sanitized overnight-gold-farm / oauth hygiene md** may proceed if owner APPROVED + checklist green.

**Do not claim CRIT secret leakage** from this scan.  
**Do claim WARN:** bare `op` on whip loop; incomplete public-repo gitignore vs distill baseline.

**BLOCKED conditions (if any appear later):** real key match in real-material gate · raw OAuth code length ≥12 · cookie/env in staged ship tree · whip edit that curls bounty login doors on interval.

---

## Tooling notes

- Scan method: `rg` only; values never echoed (redact if re-run with broader regex).  
- Live whip pid observed; no process kill performed.  
- No remediation edits this pass (report-only per task).

**GODSPEED:** After durable fix of WARN items, re-run this gate; ship via `milestone-ship.sh` if green.
