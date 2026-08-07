# Plan — dual auth bounty runners
**Session:** dual-auth | **Dispatched by:** xbgst | **Date:** 2026-08-07

## Phase 0 — State map

### Exists
- Distill SSoT under `~/.xbgst/bounty-distill/2026-08-07/`: `HUNT-NOW.md` (Q-BC / Q-FP / Q-H1 keep-8), `ACTION-LOG.md`, `ACCOUNTS.md` (BC/H1/Inti **authed**), `GATES.md`, `ENROLL.md`, `ROI.md`.
- **ENROLL (newer than HUNT-NOW narrative):** Aiven, Auth0, Okta, Atlassian, OpenAI all **joined** on Bugcrowd (Submit report UI). Remaining human: free-tier/instance setup + copy Get Creds into 1Password; same-day policy re-read before probes.
- Dual sekhmet wrappers: `~/.xbgst/scripts/sekhmet-luna.sh` (model `gpt-5.6-luna`, root `$XDG_RUNTIME_DIR/xbrd-spark-luna`, j=64), `sekhmet-spark.sh` (model `gpt-5.3-codex-spark`, root `…/xbrd-spark-spark`).
- Dual runtime dirs present (~48K each): `/run/user/1000/xbrd-spark-luna`, `…/xbrd-spark-spark`; also `xbrd-spark-rA`, `xbrd-spark-rB`, default `xbrd-spark`.
- Session artifact tree: `dual-auth-runners/{runner-a,runner-b,shared,tmp-sanitize-logs}/` + `START.txt`.
- PATH: `sekhmet` 0.1.1, `xbgst-l3-orch`, `codex-titanium` 0.147.0-alpha.11+titanium.1, `op`.
- Env: `XBRD_SPARK_JOBS=64`.
- **1Password Personal titles (names only):** Bugcrowd Org (Set 5) Okta, Bugcrowd, HackerOne, Intigriti, TinyFish API.
- Vault structure (labels only, no values):
  - `op://Personal/Bugcrowd Org (Set 5) Okta/{username,password}` — URL `https://bugcrowd-pam-5335.oktapreview.com`
  - `op://Personal/Bugcrowd/{username,password}` — `https://login.hackers.bugcrowd.com`
  - `op://Personal/HackerOne/{username,user[password]}` — hackerone.com
  - `op://Personal/Intigriti/{Input.Username,Input.Password}` — login.intigriti.com
  - `op://Personal/TinyFish API/credential` (item has username/password purpose fields)
- **Overfit probe (Okta Set5):** `curl` → HTTP **200**, effective URL includes `session_hint=AUTHENTICATED` + enduser dashboard shell (`window.okta`, adminUrl `bugcrowd-pam-5335-admin.oktapreview.com`). Login form **not** present when session cookie/hint already auth'd; SPA dashboard mapped. Probe HTML deleted after map (no secret dump).
- `/tmp` headroom: 16G tmpfs, **~1%** used; runtime user tmpfs 3.1G ~1%.
- Prior freeze: no SPA re-fetch live exploit; policy-ready recon only unless in-scope own asset confirmed.
- Scopes/playbooks exist for keep-8 programs; TinyFish used earlier for policy briefs.

### Missing
- `PLAN-r0.md` / dual competitive runner loop (this artifact starts it).
- Vault inventory file under `dual-auth-runners/shared/` with **op:// refs only** (no values).
- Documented Okta Set5 headless vs click-path runbook + session storage policy (op / browser profile only).
- Runner A/B lane playbooks + compare harness writing to `runner-a/` vs `runner-b/`.
- Proven dual-root isolation on **swarm** path (Phase-0 dry-run via `echo '[]' | sekhmet-*.sh swarm --dry-run -j 2` returned `dry_run:true` EXIT 0 but landed sparks under **default** `/run/user/1000/xbrd-spark` and both reported model `gpt-5.6-luna` — wrapper `XBRD_SPARK_ROOT` / model env may not bind on all sekhmet entrypoints).
- tmp sanitize automation + post-run gc for dual roots.
- Live OAuth microprobe gates for luna/spark (optional after dry-run green).
- Evidence gate checklist that greps ACTION-LOG / runner dirs for secret leakage patterns.

### Risk
- **Wrapper isolation incomplete:** dual roots exist but swarm dry-run used shared `xbrd-spark`; model override for spark lane not observed on dry-run JSON. Escalate if live runs collide.
- **Okta Set5 headless:** curl sees AUTHENTICATED hint (likely residual cookie env) — may not equal durable researcher session; MFA/plugin SPA may block pure headless. Prefer browser profile + `op run` / the-janitor CDP; never plaintext session dump to distill.
- **ENROLL vs HUNT-NOW drift:** joins done; HUNT-NOW still says "human joins frontier" for Aiven/Auth0/Atlassian — executors must prefer ENROLL.md + same-day brief re-read.
- **Auth0/Okta program credentials:** may still sit in modal / need 1Password copy — not in git.
- **Policy freeze:** no live exploit / no out-of-scope; dual sekhmet must not Titanium-spam bounty hosts.
- **Secret hygiene:** op field names include `user[password]` / `Input.Password` — scripts must use `op://` refs, never expand to chat/files.
- **Competitive dual runners sharing both pools:** risk of thrash / duplicate findings without shared claim lock in `shared/`.

## WWKD
1. **What:** Stand up dual competitive bounty runners (A=Q-BC auth chain, B=Q-FP+Q-H1 authz surfaces) on dual sekhmet (luna+spark), with vault-safe auth plumbing and tmp hygiene — success = dry-run green dual, vault ref map written, Okta Set5 path documented, both runners emit comparable evidence under `runner-{a,b}/` without secret leakage.
2. **Why:** User offline; ENROLL joins already green; auth creds vaulted (incl. Okta Set5); prior distill frozen on exploit; remaining leverage is autonomous dual-substrate recon + enroll automation that is policy-safe and races models for throughput.
3. **Assumptions/Risks:** Platforms remain session-valid in browser; Okta Set5 URL reachable (confirmed 200); sekhmet wrappers intended to isolate roots/models (verify before load); own-asset testing only after instance free-tier created; no secrets in repo.
4. **How:** M01 health/tmp → M02 vault map → M03 Okta Set5 path (overfit) → M04 Runner A → M05 Runner B → M06 dual competitive loop → M07 evidence/ACTION-LOG gates. Parallelize M04/M05 after M01–M03; M06 depends on both lanes bootstrapped.
5. **Escalation points:** Wrapper root/model not isolated → judge/patch wrappers before j=64 load; Okta MFA blocks headless → human click-path only; any program still not joined live → stop probe; secret appears in file → janitor scrub + halt push; live exploit request → hard refuse (policy).

## Axes (Godspeed)
| Axis | Direction | Plan lever |
|---|---|---|
| auth_ready | ↑ | M02–M03 vault + Okta Set5 |
| dual_substrate_up | ↑ | M01 dual dry-run + isolation fix |
| hunt_throughput | ↑ | M04–M06 dual competitive sekhmet |
| evidence_fidelity | ↑ | M07 gates + FIDELITY tags |
| safety_in_policy | ↑ | recon/enroll only; freeze exploit |
| tmp_headroom | ↑ | M01 sanitize + gc |
| secret_hygiene | ↑ | op:// only; leakage greps |

## Overfit case (do first)
**Bugcrowd Okta Set5 URL reachable + login/session surface mapped (no credential dump).**
- URL: `https://bugcrowd-pam-5335.oktapreview.com`
- Observed: HTTP 200 → `/app/UserHome?...session_hint=AUTHENTICATED`; SPA enduser assets; admin dashboard URL host mapped; no password fields in response when already authed.
- Next (M03): if unauthenticated browser sees login form, map `#okta-signin-username` / password selectors via **profile browser only**; store session only via op item / browser profile — never distill plaintext cookies.

## Milestones
| # | Title | Gate command | Expected output | Executor |
|---|---|---|---|---|
| M01 | tmp sanitize + dual sekhmet health | `df -h /tmp; find /tmp -user "$(id -un)" -mtime +1 -type f 2>/dev/null \| wc -l; echo '[]' \| ~/.xbgst/scripts/sekhmet-luna.sh swarm --dry-run -j 2; echo '[]' \| ~/.xbgst/scripts/sekhmet-spark.sh swarm --dry-run -j 2; # optional: sekhmet-luna.sh run --dry-run -- true; sekhmet-spark.sh run --dry-run -- true; verify XBRD_SPARK_ROOT in provenance root field | `/tmp` use% ≤20; both swarm dry-run `"dry_run":true` status ok exit 0; **roots** under `xbrd-spark-luna` and `xbrd-spark-spark` (if not → Status:blocked escalate wrapper); optional live microprobe only if OAuth works and **not** aimed at bounty hosts | executor (labrat/substrate) |
| M02 | vault inventory + op:// refs | `op item list --vault Personal \| rg -i 'bugcrowd\|hackerone\|intigriti\|okta\|tinyfish'`; write `shared/VAULT-REFS.md` with refs only | File lists titles + `op://Personal/…/{field}` paths; **zero** secret values; `rg -i 'password\|token\|secret' shared/VAULT-REFS.md` shows labels/refs only | executor (janitor-aware) |
| M03 | Okta Set5 auth probe path | `curl -sI -A 'Mozilla/5.0' --max-time 15 'https://bugcrowd-pam-5335.oktapreview.com' \| head -5`; write `shared/OKTA-SET5-PATH.md` (click-path + headless limits); never `op read` into files | HTTP 2xx/3xx; path doc: login selectors **or** AUTHENTICATED dashboard map; session store rule = op/browser only; no cookies/passwords in artifact | executor (auth) |
| M04 | Runner A — Q-BC auth chain (Aiven/Auth0/Okta/Atlassian) policy recon+enroll | mkdir -p runner-a; policy re-read from `scopes/{aiven,auth0,okta,atlassian}.md` + ENROLL; write `runner-a/LANE.md` + recon notes only; automation scripts Rust-only under `~/.xbgst/scripts/` if needed | `runner-a/` has lane plan; enroll status mirrored from ENROLL (joined); free-tier/instance steps listed as human or op-safe; **no** live exploit; same-day scope stamp | executor A |
| M05 | Runner B — Q-FP + Q-H1 (Google/MS/Proton/Shopify) policy recon | mkdir -p runner-b; scopes google-vrp / microsoft / proton / shopify; write `runner-b/LANE.md` | `runner-b/` lane plan; policy-safe recon surfaces only; H1 Shopify session assumed; XOR note F4 Dropbox vs H2 GitLab if touched | executor B |
| M06 | dual competitive loop | Both runners may invoke `sekhmet-luna.sh` **and** `sekhmet-spark.sh`; findings → `runner-a/findings/` vs `runner-b/findings/`; `shared/COMPARE.md` diff titles only; claim lock `shared/CLAIMS.md` | ≥1 structured finding-or-recon artifact per runner; both pools usable; no cross-write; compare table filled | dual executors |
| M07 | evidence gates + ACTION-LOG append | `rg -n 'op://\|AKIA\|sk-\|password=\|cookie:' dual-auth-runners/ \|\| true`; append row to `../ACTION-LOG.md`; `shared/GATES-dual.md` checklist | Leakage scan clean (or only intentional op:// refs); ACTION-LOG entry dual-auth-r0; gates pass | executor (critic/gate) |

### Milestone detail (handoff-ready)

#### M01 — tmp + dual health
- Sanitize: remove stale agent probes under `/tmp/*okta*`, large caches; log to `tmp-sanitize-logs/$(date -u +%Y%m%dT%H%M%SZ).txt`.
- `sekhmet gc` on old spark ids if runtime dirs grow.
- Fix check: if dry-run root ≠ dual path, patch wrappers or pass explicit root flags **before** j=64 hunts (escalate to judge).
- Optional microprobe: `run` with noop / local rustc check — **not** bounty URL.

#### M02 — vault map template (names only)
```markdown
# VAULT-REFS (no secrets)
| Item | Refs | URL (public) |
| Bugcrowd Org (Set 5) Okta | op://Personal/Bugcrowd Org (Set 5) Okta/username · …/password | https://bugcrowd-pam-5335.oktapreview.com |
| Bugcrowd | op://Personal/Bugcrowd/username · …/password | https://login.hackers.bugcrowd.com |
| HackerOne | op://Personal/HackerOne/username · …/user[password] | https://hackerone.com |
| Intigriti | op://Personal/Intigriti/Input.Username · …/Input.Password | https://login.intigriti.com |
| TinyFish API | op://Personal/TinyFish API/… | n/a |
```
Runtime: `op run -- curl …` or the-janitor; never expand.

#### M03 — Okta Set5
- Document: open profile browser → org URL → if login, fill via 1Password desktop/CLI integrate → land UserHome.
- Headless: only if existing session_hint path stable; else mark `needs_human_click`.
- Store: update op item notes **via op**, not markdown bodies with session tokens.

#### M04 — Runner A (Q-BC)
- Order: Aiven free tier + ninja email → Auth0 Get Creds (1P) → Okta Get Creds → Atlassian `bugbounty-test-*`.
- Allowed: public policy, scope tables, own-instance recon after provision.
- Forbidden: exploit payloads, OOS OpenAI jailbreak noise, credential paste into git.

#### M05 — Runner B (Q-FP + Q-H1)
- Google VRP one product authz/IDOR class (docs + own test accounts).
- Microsoft MSRC web/cloud policy + MSOBB notes.
- Proton dual-own-account IDOR class (policy).
- Shopify via H1 criteria/rewards + dev store plan.
- Slot-8: do not deep both Dropbox Inti and GitLab.

#### M06 — competitive loop
- Each runner may call **both** sekhmet pools (diversity).
- Tasks files under `runner-{a,b}/tasks/*.json` (NDJSON/JSON sekhmet swarm format).
- Shared claim lock prevents duplicate program thrash.
- Compare axes: evidence_fidelity, policy_safety, novelty — not exploit severity theater.

#### M07 — evidence / hygiene
- Append ACTION-LOG dual-auth section.
- Grep gate for secrets; fail closed.
- No commit of `.env`, cookies, or op reveals.

## Dependencies
```
M01 → M02 → M03 → (M04 ∥ M05) → M06 → M07
M01 also → M06 (substrate)
M03 overfit unblocks auth_ready before heavy M04 identity-day automation
```

## Policy / safety (non-negotiable)
- Own assets / in-scope only after same-day brief.
- No live exploit automation while freeze holds.
- No secrets in `bounty-distill` git tree.
- Rust-only for new tooling/scripts under `~/.xbgst/scripts/`.
- sekhmet j=64 default; Grok host subagents ≤16.

## Recovery
| Block | Status | Recovery |
|---|---|---|
| Wrapper root not dual | blocked | Patch sekhmet-*.sh / env bind; re-gate M01 |
| Okta MFA | risk | Click-path doc; human offline → park Set5 live login |
| Session expired BC/H1/Inti | risk | Browser re-auth via op; do not invent creds files |
| Leakage hit | blocked | scrub file; rotate via op if exposed; halt publish |

## Artifact paths
| Path | Role |
|---|---|
| `~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/PLAN-r0.md` | This plan |
| `…/runner-a/` | Q-BC lane |
| `…/runner-b/` | Q-FP + Q-H1 lane |
| `…/shared/` | vault refs, Okta path, claims, compare, gates |
| `…/tmp-sanitize-logs/` | hygiene evidence |
| `~/.xbgst/scripts/sekhmet-{luna,spark}.sh` | dual substrate |

**Planner gate:** advisory — risks open on wrapper isolation + headless Okta durability. Executors may proceed with `[planner-gate: advisory, risks-open]` after reading this file.

evidence: files written — PLAN-r0.md only (Phase 0 no redesign/implement beyond plan).
