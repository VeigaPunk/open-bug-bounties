# IDLE-PLAYBOOK — overnight autonomy with doors closed

**Role:** gx-revenger-doors-r1 (observe → map → reproduce idle value)  
**UTC:** 2026-08-08  
**SSoT inputs:** lane `STATUS` / `REPORT` / `FIRST-5` / `OWN-ASSET` / `CRED-STATE` · `HUMAN-GATES.md` · `CONNECTOR.md` · `tracker/HYDRA.md` · `tracker/JUDGE-idle-tick.md` · dual-auth `AUTONOMOUS-READY.md` · `LOOP.md` · `PLAN-r0-overnight-gold-farm.md`

**Hard rule:** `MAP ≠ COMPLETE`. COMPLETE only with own-asset evidence paths.  
**Hard rule:** tasks are **`tasks.md`** (never `.txt`).  
**Hard rule:** no CAPTCHA thrash, no Okta Set5 SPA loop, no secrets in tree (`op://` titles only).

---

## Axes (name them)

| Axis | Idle win when doors closed |
|------|----------------------------|
| **substrate** | whip + pruner + luna-a/b/c roots + tmux `hydra` alive; no namespace collide |
| **audit** | STATUS/REPORT/CRED-STATE/HUMAN-GATES timestamps honest; MAP≠COMPLETE |
| **EV-QUEUE** | keep-8 ranked; single OVERFIT; gate flags match HYDRA |
| **ship hygiene** | secret-gate clean; distill sanitized; milestone-ship only on APPROVED |
| **safety** | passive/recon only; fail-closed on authz until doors open |
| **recovery latency** | first 3 steps ready the moment a human door flips |

**Overnight success with 0 COMPLETE** = improve substrate + audit + EV-QUEUE + ship hygiene, harm none of safety/recovery. Not a fake bounty.

---

## Global — what agents MAY do (doors closed)

Legal passive / durable prep only:

1. **Pulse** dual-auth dry re-gate (AUTONOMOUS-READY block) — paths, `rg` secret gate, sekhmet help, vault **titles** only.
2. **Re-stamp** passive HTTP matrices (401/200/302) on known program hosts; log under `evidence/` with no cookies.
3. **Deepen maps** — SCOPE / ATTACK-SURFACE / report skeletons / FIRST-5 templates / L3 policy checklists.
4. **Write / refresh** `tracker/EV-QUEUE.md` (rank keep-8; lock OVERFIT).
5. **Update** CONNECTOR / HYDRA / HUMAN-GATES timestamps when state changes (still MAPPED).
6. **Run** `hydra-pruner.sh` + observe `hydra-whip.sh` (log only if REPORT fresh; no CAPTCHA spawn).
7. **Sekhmet map packs** via `sekhmet-luna-{a,b,c}.sh` on **policy/own-scope text** — `tasks.md`, auto UUID, `-j` up to 64.
8. **Sanitize + secret-gate** distill/lane trees; `tmp-sanitize-bounty.sh`.
9. **Ship** only if APPROVED one-liner + secret gate green + no cookies/pem/.env (`milestone-ship.sh`).
10. **Inbox/title probes** for door-open signals (Auth0 assign mail, op title appear) — never thrash Get Credentials UI.

## Global — what agents MUST NOT do (doors closed)

- Force COMPLETE or fire `hydra-refill` without own-asset FIRST-5 evidence.
- Authenticated Aiven IDOR / CIC Management API / Drive ACL probes without dual assets + vault.
- Okta Set5 / CAPTCHA / production `manage.auth0.com` thrash.
- Paste tokens, connection strings, cookies, OAuth codes into lane or distill.
- Live exploit payloads in sekhmet tasks.
- Alphabetical crawl of 1100 listings; invent new programs mid-night without OVERFIT lock.

## Global overnight success definition (0 COMPLETE)

Success if **all** of the following hold at dawn (no bounty required):

| Gate | Evidence |
|------|----------|
| **Substrate green** | `hydra-whip` pid or WHIP.log tick; `hydra-pruner` done; luna-a/b/c wrappers `--help` OK; tmux `hydra` single client; sekhmet no fixed-id collision |
| **Audit honest** | Completed table empty; each lane STATUS = MAPPED/PARTIAL with blocker one-liner; HUMAN-GATES + CRED-STATE date-stamped; JUDGE/CONNECTOR agree 0 COMPLETE |
| **EV-QUEUE present** | `~/.xbgst/hydra-bounty/tracker/EV-QUEUE.md` non-empty: score rubric, ranked keep-8, gate flags, single `OVERFIT=` line aligned with HYDRA primary |
| **Ship hygiene** | Secret `rg` clean on lanes + overnight distill root (or scrub-doc only); no new secrets in git; optional APPROVED ship of plan/status mirror to `open-bug-bounties` |
| **No thrash** | WHIP/logs show no CAPTCHA/Set5 loops; no authz Titanium spam on third-party |
| **Recovery ready** | This playbook + per-lane first-3 steps still valid; door-open detect path documented |

**Gold metric (when doors still closed):** expected $ × P(submit-ready | door opens) / agent-hours of **prep quality**, not listing count.

### Global sekhmet task shape (template)

Write under a workdir as **`tasks.md`** (never `.txt`):

```markdown
# sekhmet tasks — idle map pack
GODSPEED inject required. After durable artifacts land: run ~/.xbgst/scripts/milestone-ship.sh if gates green.

## Constraints
- Own-scope / policy / FIRST-5 text only
- No live exploit payloads; no third-party customer data
- No secrets in outputs; op:// titles only
- Prefer markdown artifacts under the lane OUT path

## Tasks
1. …
2. …
```

Invoke (example):

```bash
# pick luna by lane: a=stack/aiven, b=wrap/auth0, c=grok/google-vrp
sekhmet-luna-a.sh swarm -f tasks.md -j 64 --timeout 180 --no-keep --scope "$OUT"
```

### Global dry re-gate (copy from AUTONOMOUS-READY)

```bash
date -u +%Y-%m-%dT%H:%MZ
df -h /tmp | tail -1
test -f ~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/AUTONOMOUS-READY.md
rg -n 'DONE|finished|ok=true' \
  ~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/shared/GATES-dual.md \
  ~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/WORKFLOW-DONE.md \
  ~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/SHIP.md
ROOT=~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners
rg -n 'sk-|AKIA|password=|BEGIN (RSA |OPENSSH )?PRIVATE|cTtux|ghp_|xox[baprs]-' \
  "$ROOT" ~/.xbgst/hydra-bounty/lanes 2>/dev/null || true
test -x ~/.xbgst/scripts/milestone-ship.sh
test -x ~/.xbgst/scripts/hydra-whip.sh
test -x ~/.xbgst/scripts/hydra-pruner.sh
```

---

## H1 — stack / Aiven

| Field | Value |
|-------|--------|
| **Lane OUT** | `~/.xbgst/hydra-bounty/lanes/stack/aiven/` |
| **Orch / L3** | xbgst-stack · sekhmet-luna-a |
| **State** | MAPPED / PARTIAL — not COMPLETE |
| **Program** | Bugcrowd `aiven-mbb-og` |

### blocked_on

- Free-tier dual console accounts (`@bugcrowdninja.com` A + B) not provisioned.
- No free PG/Kafka **RUNNING** under researcher-owned projects.
- No vault titles `Aiven BB Account A API` / `Aiven BB Account B API` (op probe empty).
- No `AIVEN_*` env session → fail-closed skip of auth probes.
- OWN-ASSET G3–G7 still PENDING human (G1 join + G2 brief PASS).

### passive_only_actions (legal)

1. Re-pulse unauth: `GET api.aiven.io/v1/project` + `/v1/me` → expect **401**; console SPA **200**; BC engagement **200**. Append/refresh `evidence/PASSIVE-HTTP*` (no tokens).
2. Keep SCOPE / ATTACK-SURFACE / OWN-ASSET checkboxes / FIRST-5 / DRAFT-REPORT / NEXT-TICK consistent; fix stale UTC stamps only.
3. L3 map packs: own-asset checklist, API authz **matrix text** (not live), report skeleton, safety gates — UUID tasks, no Titanium auth thrash.
4. Title-only vault probe: list for `Aiven BB Account` — **detect door open**, never create secrets in files.
5. Secret-gate + sanitize lane tree; ship map labels only if APPROVED and clean.
6. Update STATUS blocker one-liner if op titles appear or human marks NEXT-TICK steps.

### recovery_when_door_opens (first 3 steps)

1. **Confirm assets:** OWN-ASSET G3–G7 → PASS; projects/services RUNNING; vault titles `Aiven BB Account A API` + `B API` exist (titles only in STATUS).
2. **Sanity inject:** `op run` / the-janitor inject → `GET /v1/project` with each token → **200**, only own projects; record non-secret project names in evidence notes.
3. **Execute FIRST-5-TESTS.md** (GET-first, own projects only): baseline isolation → cross-project GET → members/ACL → invite mutation → console/API parity; fill evidence table; only then COMPLETE + BC report if finding.

### sekhmet task shapes (`tasks.md`)

```markdown
# Aiven idle — luna-a map pack
GODSPEED inject required. After durable artifacts land: run ~/.xbgst/scripts/milestone-ship.sh if gates green.

## Constraints
- No authenticated API calls; no customer aivencloud.com
- Fail-closed until OWN-ASSET G3–G7 green
- Outputs: markdown under lane OUT only; no secrets

## Tasks
1. Refresh own-asset pre-gate table text from OWN-ASSET.md; list remaining human click-path packs A/B only.
2. Expand API authz matrix as a **text matrix** (endpoint × token A/B × expected status) matching FIRST-5-TESTS — do not call live API with forged tokens.
3. Tighten DRAFT-REPORT skeleton: impact classes for IDOR on free-tier only; empty evidence rows ready for post-door fill.
4. Safety gates doc: restate rate, ninja-only, no CC, no bulk delete; abort conditions.
```

---

## H2 — wrap / Auth0 CIC

| Field | Value |
|-------|--------|
| **Lane OUT** | `~/.xbgst/hydra-bounty/lanes/wrap/auth0/` |
| **Orch / L3** | workflow wrap · sekhmet-luna-b |
| **State** | MAPPED / PARTIAL — not COMPLETE |
| **Program** | Bugcrowd `auth0-okta` (CIC env only) |

### blocked_on

- BC **Get Credentials** still **REQUESTED** (not ASSIGNED); no 3×3 user/tenant secrets in vault or Gmail.
- Expected vault titles `Auth0 CIC BB User1/2/3` absent.
- No `*.auth0app.com` / CIC cookies; no authenticated CIC testing performed.
- Do not confuse with production `manage.auth0.com` or Okta Set5 PAM.

### passive_only_actions (legal)

1. Re-pulse UNAUTH-DOORS: CIC manage → OIDC PKCE hop; config OIDC discovery **200**; FGA API **401** unauth; bare host non-entry; SSoT slug `engagements/auth0-okta` **200**.
2. CRED-STATE poll: Gmail/BC for assign mail; op title search for Auth0 CIC — update table timestamps; stay REQUESTED until assign.
3. Deepen TARGETS / FIRST-5 post-cred plan / EV rank (cross-tenant → OAuth misbinding → member priv-esc → SAML own IdP → FGA).
4. L3 checklist/vault-label/door-summary/EV-order packs (text only).
5. Secret-gate; ship map-only if APPROVED.
6. Explicitly **do not** open Get Credentials modal thrash overnight.

### recovery_when_door_opens (first 3 steps)

1. **CRED-STATE → ASSIGNED:** store 3 users + 3 tenants in 1Password (`op://` only); vault titles User1/2/3; never paste secrets into CRED-STATE.
2. **Tenant prep:** login User1 → Tenant1 on `manage.cic-bug-bounty.auth0app.com`; invite User2/User3 with distinct roles; confirm each opens own tenant; labels only in private op note.
3. **Execute FIRST-5-TESTS.md** on own CIC tenants: cross-tenant isolation → in-tenant priv-esc → OAuth misbinding → SAML own IdP (or defer) → FGA store isolation; ≤5 rps; then COMPLETE only with evidence paths.

### sekhmet task shapes (`tasks.md`)

```markdown
# Auth0 CIC idle — luna-b map pack
GODSPEED inject required. After durable artifacts land: run ~/.xbgst/scripts/milestone-ship.sh if gates green.

## Constraints
- Unauth / policy text only until CRED-STATE ASSIGNED
- Never target production manage.auth0.com
- No secrets; vault titles as placeholders only

## Tasks
1. CIC target checklist: map manage / config OIDC / FGA / SDK surfaces from TARGETS.md; OOS list explicit.
2. Vault label schema: expected op titles + which fields are secret vs label-only after assign.
3. Unauth door summary: refresh status code matrix from UNAUTH-DOORS without exploit language.
4. FIRST-5 risk order: re-rank post-cred tests with discoverability notes for private program dupe risk.
```

---

## H3 — grok / Google VRP Drive

| Field | Value |
|-------|--------|
| **Lane OUT** | `~/.xbgst/hydra-bounty/lanes/grok/google-vrp/` |
| **Orch / L3** | xbgst-grok · sekhmet-luna-c |
| **State** | MAPPED / PARTIAL — not COMPLETE |
| **Program** | Google VRP — product lock **Drive** authz/IDOR |

### blocked_on

- Two research-owned Google sessions (A owner / B peer) not both usable (op: one Google password; second incomplete).
- No live browser-separated T1–T5 results; finding log empty by design.
- Cannot validate revoke residual / stale-link without human-run accounts.

### passive_only_actions (legal)

1. Passive reachability only (`evidence/PASSIVE-HTTP.txt`); no OAuth thrash.
2. Keep PRODUCT-PICK / AUTH-SURFACE / SCOPE-NOTES / FIRST-5 / REPORT submission skeleton aligned with live VRP rules URL (text recheck notes, not login).
3. L3 policy fragments: IT1/IT2/IA impact mapping, redaction checklist, abort if appspot customer apps.
4. Negative-close pack draft: what “secure” looks like per T1–T5 for honest N/A if tests pass.
5. Secret-gate; no cookies in evidence; ship map if APPROVED.
6. Connector rank: closest to draft **after** human T1–T5 — do not fake anomalies.

### recovery_when_door_opens (first 3 steps)

1. **Attach A/B:** two research Google accounts in **separated** browser profiles; DevTools Network; confirm own-only Drive test objects.
2. **Run FIRST-5-TESTS.md T1→T5** in order: private direct object → share-then-revoke → link downgrade/stale → viewer self-elevate → folder/file ACL; log pass/fail with redacted `fileId`/status only under `evidence/`.
3. **On anomaly:** promote REPORT finding stub (repro, expected vs actual, IT1/IT2/IA) immediately; stop expansion; recheck live VRP rules before submit. On all secure: honest N/A evidence rows — still not COMPLETE unless program policy treats negative as done (default: keep MAPPED with test logs).

### sekhmet task shapes (`tasks.md`)

```markdown
# Google VRP Drive idle — luna-c map pack
GODSPEED inject required. After durable artifacts land: run ~/.xbgst/scripts/milestone-ship.sh if gates green.

## Constraints
- No live Google account sessions from workers
- Own-asset policy only; no third-party docs
- No cookies/tokens in outputs

## Tasks
1. Distill AUTH-SURFACE endpoint families into a one-page operator card for T1–T5 (labels only).
2. Expand SCOPE-NOTES: VRP exclusions that kill Drive ACL reports; IT1 vs IT2 decision table.
3. Evidence templates: redacted screenshot/HTTP status fields per test; empty tables ready to fill.
4. REPORT submission skeleton: preconditions, repro, impact mapping — leave finding body blank until live anomaly.
```

---

## Overnight loop (doors closed) — cheap ordered

```
1) Dry re-gate dual-auth + hydra scripts (AUTONOMOUS-READY)
2) Write/refresh tracker/EV-QUEUE.md → OVERFIT lock (default: Aiven if free-tier nearest; else Google if A/B; else Auth0 map-only)
3) hydra-pruner + whip observe (no CAPTCHA spawn)
4) Per-lane passive pulse + STATUS stamp (parallel H1/H2/H3)
5) Sekhmet map packs tasks.md on OVERFIT + one secondary (j64 luna-*)
6) CRED-STATE / op title / inbox door-open detect (titles only)
7) Secret-gate lanes + distill; tmp sanitize
8) If APPROVED hygiene artifacts → milestone-ship; else stay local
9) Dawn: CONNECTOR + HYDRA + JUDGE rollup; Completed still empty unless door opened mid-night
```

**If any door opens mid-night:** stop map thrash on that lane → execute that lane’s **recovery first 3** → evidence → COMPLETE only with paths → then `hydra-refill` 2 + ship.

---

## Door-open detect (agent, non-thrash)

| Door | Detect without thrash |
|------|------------------------|
| Aiven free dual | `op` title list contains `Aiven BB Account A API` and `B API`; or human flips OWN-ASSET G3–G7 |
| Auth0 CIC | Gmail/BC assign; CRED-STATE human edit → **ASSIGNED**; vault titles User1/2/3 |
| Google A/B | Operator confirms two profiles; optional STATUS flip “A/B sessions ready” |

Phrase for Aiven live assist after human freeze clear: `xbgst live test Aiven` (from AUTONOMOUS-READY).

---

## Explicit non-goals (overnight)

- YesWeHack / pure SC KYC / Sherlock race / OpenAI jailbreak-only.
- Fake COMPLETE to exercise refill.
- Alphabetical open-bug-bounties crawl.
- Storing Auth0/Aiven/Google passwords or OAuth codes in distill.
- Force-push / non-main ship paths.

---

## Findings (revenger)

```
FINDING: All three hydra lanes are MAPPED with ship-clean maps; money is human-gated the same way dual-auth freezes are.
SOURCE: CONNECTOR.md + HYDRA.md + HUMAN-GATES.md
CONFIDENCE: high
IMPLICATION: Overnight value = substrate + audit + EV-QUEUE + recovery packs, not COMPLETE theater.

FINDING: Dual-auth AUTONOMOUS-READY already defines agent-allowed pulse/recon/ship vs human freezes 1–7.
SOURCE: dual-auth-runners/AUTONOMOUS-READY.md
CONFIDENCE: high
IMPLICATION: Idle playbook reuses that contract; hydra H1–H3 are freezes #2, #3, #6 specialized.

FINDING: Whip policy already forbids CAPTCHA/Set5 thrash; COMPLETE requires own-asset evidence.
SOURCE: tracker/HYDRA.md · JUDGE-idle-tick.md
CONFIDENCE: high
IMPLICATION: Idle agents observe whip/pruner; do not invent targets or refill.

FINDING: EV-QUEUE.md missing at data-walk; overnight gold-farm plan still requires M02 write.
SOURCE: tracker/ empty of EV-QUEUE; PLAN-r0-overnight-gold-farm.md
CONFIDENCE: high
IMPLICATION: First durable idle win is writing EV-QUEUE + OVERFIT lock.

FINDING: L3 fixed-id collision and missing whip were agent-cleared; remaining blockers are human-only.
SOURCE: HUMAN-GATES.md agent-cleared table
CONFIDENCE: high
IMPLICATION: Do not re-burn cycles on GC/whip install theater; spend on EV-QUEUE + passive + recovery docs.
```

---

## APPROVED readiness (this artifact)

**APPROVED: idle playbook** — durable reverse-map of doors-closed overnight value; no secrets; enables 0-COMPLETE success definition + per-lane recovery.

Ship optional:

```bash
rg -n 'sk-|AKIA|password=|BEGIN (RSA |OPENSSH )?PRIVATE|cTtux|ghp_|xox[baprs]-' \
  ~/.xbgst/hydra-bounty/lanes/IDLE-PLAYBOOK.md || true
# if packaging overnight-gold-farm distill, include this file as lanes mirror
```
