# Plan — HYDRA bugbounty claimer (Phase 0)
**Session:** r0 | **Dispatched by:** the-judge | **Date:** 2026-08-07
**Plan path:** `~/.xbgst/hydra-bounty/plans/PLAN-r0-hydra.md`
**Axes:** `hydra_throughput↑` `bounty_complete↑` `substrate_fertile↑` `audit_trail↑` `safety_in_policy↑` `lane_diversity↑` `tmp_headroom↑`
**Scope:** `~/.xbgst/hydra-bounty/` · read `~/.xbgst/bounty-distill/2026-08-07/` · ship `~/Projects/open-bug-bounties`
**Spawn:** fnm-multishell | pure-bash-isolated · model grok · rust-preferred for new tooling
**Godspeed:** inject required on every spawn. After APPROVED durable artifacts: `~/.xbgst/scripts/milestone-ship.sh`.

---

## Phase 0 — State map

### Exists
- **Hydra skeleton:** `~/.xbgst/hydra-bounty/` with `lanes/{stack,wrap,grok}/fertile/TOUCH`, `sekhmet/{luna-a,b,c}/`, `pruner/`, `tracker/HYDRA.md`, `plans/`, `logs/`, `tmp/`, `START.txt`.
- **Tracker seed:** H1=Aiven→stack, H2=Auth0 CIC→wrap, H3=Atlassian cloud-test→grok; all state `mapped` / team `pending`; Completed empty; refill queue = HUNT-NOW keep-8.
- **Luna wrappers (j=64, model gpt-5.6-luna, tier=fast, isolated roots):**
  - `~/.xbgst/scripts/sekhmet-luna-{a,b,c}.sh` → `XBRD_SPARK_ROOT=$XDG_RUNTIME_DIR/xbrd-spark-luna-{a,b,c}`
  - Env SSoT: `~/.xbgst/env.l3-sekhmet.sh`; binaries: `sekhmet`, `xbgst-l3-orch`, `tmux-orch`, `milestone-ship.sh`.
- **Pruner:** `~/.xbgst/scripts/hydra-pruner.sh` — /tmp GC + luna root fertility + lane TOUCH; last log green (`20260807T223233Z.log`, /tmp ~1%).
- **HUNT-NOW keep-8 (r3 hygiene):** Q-BC ACTIVE Aiven/Auth0+Okta/Atlassian + OpenAI JOINED(sec-impact only); Q-FP Google VRP / MSRC / Proton / Dropbox Inti; Q-H1 Shopify + GitLab XOR Dropbox.
- **ENROLL (BC joined):** Aiven, Auth0, Okta, Atlassian, OpenAI — all **joined** 2026-08-07; Submit report CTAs present.
- **BURNER-RUN:** Canary CDP `:9222` VeigaPunk; Auth0 credentials **REQUESTED not assigned**; Okta Get Credentials UI incomplete/flaky under CDP; Aiven free-tier + Atlassian CAPTCHA still human; Set5 Okta widget timeouts.
- **Dual-auth substrate:** `bounty-distill/.../dual-auth-runners/` (PLAN-r0, runners A/B, BURNER-RUN, ACTION-LOG) — pattern for wrap lane.
- **Ship path:** open-bug-bounties `distill/2026-08-07/` + milestone-ship helper.

### Missing
- Full plan artifact (this file — M00/Phase0).
- **tmux session `hydra`** windows: orch, pruner, stack, wrap, grok, sekhmet-a/b/c.
- **Whip protocol** script/scheduler every **119s** (godspeed inject + progress; whip only if no progress for **2 ticks**).
- **Lane execution state** beyond mapped seed (no team runs, no findings, no complete→refill yet).
- **Own free-tier assets** ready: Aiven project, Auth0 CIC creds (async BC email), Atlassian `bugbounty-test-*` (CAPTCHA).
- Per-lane task files / sekhmet swarm queues under `hydra-bounty/sekhmet/luna-*` and lane workdirs.
- Hydra refill automation (1 complete → 2 new from keep-8).

### Risk
| ID | Risk | Mitigation |
|----|------|------------|
| R1 | Auth0 creds not assigned | Wrap lane: policy map + enroll gate only until `op` holds creds; do not thrash Get Credentials. |
| R2 | Okta CDP flaky | Defer Okta active login; keep identity-day slot as Auth0-first; Okta = policy recon or alternate free path. |
| R3 | Atlassian CAPTCHA / human signup | Grok lane: scope+playbook map until site exists; human CAPTCHA unblocks active tests. |
| R4 | Aiven ninja mailbox | Stack: document free-tier gates; active authz only on **own** project after signup. |
| R5 | Policy / OOS (OpenAI model jailbreak) | Never assign OpenAI model/jailbreak to lanes; security-impact only if ever pulled. |
| R6 | Thrash recon | Whip only after **2 ticks no progress**; freeze automated scope churn; one solid report > noise. |
| R7 | Secret leakage | 1Password/`op://` only; secret gate before every ship; no creds in tracker/plans. |
| R8 | Substrate collision | Luna roots isolated a/b/c; pruner keeps fertile; host subagents ≤16; L3 j=64 per sekhmet. |

**Policy stance (immutable):** own assets only for active testing; policy recon until free-tier ready; no exploits against third-party assets; Bugcrowd/H1/Intigriti program rules govern.

---

## WWKD

1. **What:** Top orch + 3 lanes (stack / wrap / grok) + 3 sekhmet luna L3 + pruner + 119s whip + 1-complete→2-new refill, so comma-style easy/fast bounty completion ships with audit trail — success boundary = three concrete programs assigned, substrate green, first executable gates without thrash or secret leakage.
2. **Why:** User wants easy/fast completion not recon thrash; HUNT-NOW + ENROLL already joined BC Q0; dual-auth showed async-cred and CDP limits; hydra skeleton exists but no plan, tmux, whip, or lane execution.
3. **Assumptions/Risks:** BC+H1+Inti authed; keep-8 membership SSoT; Auth0/Okta/Atlassian human gates may block active probes — map+enroll still counts as progress if tracker advances; R1–R8 above.
4. **How:** M01 substrate dry-run → M02 tmux persist → M03 lock first 3 programs → M04–M06 parallel lane execute (gated) → M07 refill rule live → M08 whip non-thrash → M09 ship audit.
5. **Escalation points:** Judge if Auth0 still unassigned after 24h (swap H2→Okta policy-only or Dropbox Inti); if all free-tier blocked, pivot one lane to Google VRP/MSRC first-party own-tenant; if sekhmet luna model/tier fails, fall back `gpt-5.3-codex-spark` already set on wrappers.

---

## First 3 concrete (comma-style / easy classes)

Prefer public easy classes: misconfig / info disclosure / authz on **own free tier** — not deep recon thrash.

| Hydra ID | Program | Lane | Easy class | Gate to active test | Why first |
|----------|---------|------|------------|---------------------|-----------|
| **H1** | **Aiven** `aiven-mbb-og` (BC) | **stack** | Console/API **authz on own project**; free tier + `@bugcrowdninja` | Free-tier project exists | FULL scope; published P1 bands; joined; self-serve console |
| **H2** | **Auth0** CIC / `auth0-okta` (BC) | **wrap** | Tenant/config **authz / misconfig** on program CIC once creds land | Auth0 creds in 1Password + login manage.cic-bug-bounty.auth0app.com | Joined; Get Credentials **requested**; dual-auth wrap pattern; identity-day ROI |
| **H3** | **Atlassian** cloud (BC) | **grok** | SaaS **authz/IDOR** on `bugbounty-test-*.atlassian.net` | Site created (CAPTCHA human) | Joined; dense SaaS; explicit test subdomain pattern |

**Refill candidates (after first complete):** Okta (identity-day second), OpenAI (sec-impact only), Google VRP, MSRC, Proton, Dropbox Inti XOR Shopify/GitLab per HUNT-NOW rules.

---

## Milestones

| # | Title | Gate command | Expected output | Executor |
|---|---|---|---|---|
| **M01** | Triple-luna dry-run + pruner green | `~/.xbgst/scripts/hydra-pruner.sh && for s in a b c; do ~/.xbgst/scripts/sekhmet-luna-$s.sh help 2>&1 \| head -3; done; test -f ~/.xbgst/hydra-bounty/lanes/stack/fertile/TOUCH && echo FERTILE_OK; df -h /tmp \| tail -1` | Pruner `done`; sekhmet help prints; three fertile TOUCH files; /tmp headroom high | executor (bash) |
| **M02** | tmux `hydra` session windows | `tmux has-session -t hydra 2>/dev/null \|\| tmux new-session -d -s hydra -n orch; for w in pruner stack wrap grok sekhmet-a sekhmet-b sekhmet-c; do tmux list-windows -t hydra -F '#{window_name}' \| grep -qx $w \|\| tmux new-window -t hydra -n $w; done; tmux list-windows -t hydra` | Windows: orch, pruner, stack, wrap, grok, sekhmet-a, sekhmet-b, sekhmet-c | executor (tmux) |
| **M03** | Pick first 3 bounties (easy) one per lane | `rg -n '^\| H[123]' ~/.xbgst/hydra-bounty/tracker/HYDRA.md; test -f ~/.xbgst/bounty-distill/2026-08-07/ENROLL.md` | H1 Aiven/stack, H2 Auth0/wrap, H3 Atlassian/grok locked in tracker; enroll evidence joined | the-planner + scribe |
| **M04** | STACK team bounty H1 Aiven | Map→cheap valid findings **or** enroll/free-tier gates. Work: scope re-read, free-tier checklist, authz map on own project only when live. Artifacts under `lanes/stack/`. Gate: `test -s ~/.xbgst/hydra-bounty/lanes/stack/STATUS.md && rg -n 'Aiven\|gate\|finding\|BLOCKED' ~/.xbgst/hydra-bounty/lanes/stack/STATUS.md` | STATUS.md with progress timestamp + either finding note or explicit BLOCKED(human free-tier) | stack specialists (scout→executor→critic) + sekhmet-luna-a |
| **M05** | WRAP workflow bounty H2 Auth0 | Rhai/xbgst-wrap or dual-bounty-auth style; poll credential assignment without thrash; policy map until GO. Gate: `test -s ~/.xbgst/hydra-bounty/lanes/wrap/STATUS.md && rg -n 'Auth0\|creds\|gate\|finding\|BLOCKED' ~/.xbgst/hydra-bounty/lanes/wrap/STATUS.md` | STATUS: REQUESTED→ASSIGNED transition tracked; no secrets in files | wrap workflow + sekhmet-luna-b |
| **M06** | GROK lane bounty H3 Atlassian | Orch mode: playbook map, site signup checklist, authz classes on own cloud site when ready. Gate: `test -s ~/.xbgst/hydra-bounty/lanes/grok/STATUS.md && rg -n 'Atlassian\|bugbounty-test\|gate\|finding\|BLOCKED' ~/.xbgst/hydra-bounty/lanes/grok/STATUS.md` | STATUS + CAPTCHA/human blockers explicit | xbgst-grok lane + sekhmet-luna-c |
| **M07** | Hydra refill: 1 complete → 2 new | On COMPLETE of any Hn: append 2 from HUNT-NOW keep-8 not already active/completed; update tracker Active+Queue. Gate: `rg -n 'Completed\|Queue\|Active' ~/.xbgst/hydra-bounty/tracker/HYDRA.md; # after complete: count Active+pending ≥ previous+1` | Tracker shows completed row + two new Active/queue rows; rule doc in tracker | the-planner / orch |
| **M08** | 119s whip protocol (non-thrash) | Scheduler every 119s: godspeed inject reminder + progress check; **whip only if no progress for 2 consecutive ticks**. Gate: `test -x ~/.xbgst/scripts/hydra-whip.sh && rg -n '2 tick\|119\|godspeed' ~/.xbgst/scripts/hydra-whip.sh; # or scheduler_list shows hydra-whip` | Whip script or durable scheduler id; logs under `hydra-bounty/logs/whip-*.log`; no whip when STATUS mtime advanced within 2×119s | executor + scheduler |
| **M09** | Ship audit trail | Secret gate + milestone-ship to open-bug-bounties / hydra distill mirror. Gate: `rg -n 'sk-\|AKIA\|password=\|BEGIN (RSA \|OPENSSH )?PRIVATE\|ghp_\|xox[baprs]-' ~/.xbgst/hydra-bounty/plans ~/.xbgst/hydra-bounty/tracker ~/.xbgst/hydra-bounty/lanes 2>/dev/null \|\| true; ~/.xbgst/scripts/milestone-ship.sh --label hydra-plan-r0 --src $HOME/.xbgst/hydra-bounty --msg 'Ship hydra bounty plan Phase 0.'` | No real secrets; commit+push recorded; tracker links ship commit when bounties complete | distiller / ship helper |

### Milestone notes (executor handoff)

#### M01 — Triple-luna dry-run + pruner
- **Command:** see table.
- **Pass:** pruner tee log ends `done`; each luna wrapper invokes `sekhmet help`; fertile TOUCH rewritten.
- **Fail:** `Status: blocked` — fix PATH/`env.l3-sekhmet.sh` or sekhmet install; re-run pruner.
- **Do not:** run real bounty swarm until M03 assign locked.

#### M02 — tmux hydra
- Prefer `tmux-orch` if skeleton supports named session `hydra`; else pure tmux as in gate.
- Windows are **views** not daemons: pruner window can loop `while true; do hydra-pruner; sleep 300; done` later.
- Never kill protected session `0`.

#### M03 — Assign first 3
- Already seeded in HYDRA.md — confirm + write lane `ASSIGN.md` each:
  - stack → Aiven
  - wrap → Auth0
  - grok → Atlassian
- Overfit: do **not** start OpenAI/Stripe/CF this wave.

#### M04–M06 — Parallel lanes (after M01–M03)
- **Progress definition:** STATUS.md mtime + new evidence line (gate closed, finding draft, or BLOCKED with recovery).
- **Valid cheap outcomes:**
  1. Policy-confirmed in-scope authz checklist on own asset, or
  2. Sanitized finding draft ready for BC submit, or
  3. Explicit human gate with next action (mailbox, CAPTCHA, BC email).
- **Invalid:** endless recon, cross-tenant probing, secret material in repo.
- Sekhmet: tasks go to lane-specific luna root; `sekhmet swarm -j 64` only with **own-scope / policy** task text; GODSPEED inject line in tasks.

#### M07 — Refill
- Trigger: tracker Completed gains a row with ship commit or BC submission id.
- Action: pick 2 from keep-8 ordered preference: Okta → Google VRP → MSRC → Proton → Dropbox|Shopify (XOR) → OpenAI-sec-only.
- Update Active table; leave old Hn in Completed.

#### M08 — Whip (anti-thrash)
- Interval: **119s**.
- Each tick: read three STATUS.md + HYDRA.md; if all three show newer progress than last tick, log `PROGRESS` only.
- Whip (nudge orch / re-inject godspeed / re-queue sekhmet idle) **only if** no STATUS or tracker change across **2 ticks** (~238s).
- Never force new recon targets on whip; only unstick stalled assigned lanes.

#### M09 — Ship
- Always secret-gate first.
- Plan-only ship: label `hydra-plan-r0`.
- Later bounty ships: per-program labels under open-bug-bounties distill; update Completed.Evidence + Ship commit.

---

## Dependencies

```
M01 ──┬──► M02 ──► M03 ──┬──► M04 ──┐
      │                  ├──► M05 ──┼──► M07 ──► M09
      │                  └──► M06 ──┘       ▲
      │                                     │
      └──────────────────────────────────── M08 (runs concurrent after M02; observes M04–M07)
```

- **M01 → M02, M04–M06:** substrate must be green before heavy sekhmet use.
- **M02 → M08:** whip needs session/logs home.
- **M03 → M04, M05, M06:** no lane execute without locked assignment.
- **M04 ∥ M05 ∥ M06:** parallel after M03.
- **M07** after any of M04–M06 reaches COMPLETE.
- **M09** after plan land (this file) and again after each COMPLETE.
- **M08** concurrent observer; does not block M04–M06 start.

---

## Lane ↔ sekhmet matrix

| Lane | Orch | Sekhmet wrapper | Spark root | Primary bounty |
|------|------|-----------------|------------|----------------|
| stack | xbgst-stack `the-*` specialists | `sekhmet-luna-a.sh` | `…/xbrd-spark-luna-a` | H1 Aiven |
| wrap | xbgst-wrap / dual-bounty-auth Rhai | `sekhmet-luna-b.sh` | `…/xbrd-spark-luna-b` | H2 Auth0 |
| grok | xbgst-grok / orch mode | `sekhmet-luna-c.sh` | `…/xbrd-spark-luna-c` | H3 Atlassian |

Host Grok subagents: **max_concurrent=16**. L3 sekhmet: **j=64** each luna process.

---

## Safety & audit (non-negotiable)

1. Own free-tier / program credentials only for active tests.
2. Secrets: `op://` / 1Password; never chat, tracker, or git.
3. Secret gate before every ship; fail closed on real secrets.
4. OpenAI: security-impact only if queued; model/jailbreak OOS.
5. No force-push; milestone-ship SSH to main.
6. Distill stays policy-first until assets ready — map and enroll gates are first-class progress.

---

## Immediate next dispatch (Phase 1+)

1. **executor** → M01 then M02.
2. **scribe** → M03 ASSIGN.md ×3 + tracker state `assigned`.
3. Parallel **stack / wrap / grok** executors → M04–M06.
4. **executor** → M08 whip script + 119s schedule.
5. On first COMPLETE → M07 refill + M09 ship.

**Marker:** `[planner-gate: advisory, risks-open: R1-Auth0-unassigned, R3-Atlassian-CAPTCHA, R4-Aiven-ninja]`

---

evidence: data-walk 2026-08-07 — HUNT-NOW, ENROLL, HYDRA.md, BURNER-RUN, sekhmet-luna-*, hydra-pruner, dual-auth-runners, fertile TOUCH, sekhmet CLI present.
