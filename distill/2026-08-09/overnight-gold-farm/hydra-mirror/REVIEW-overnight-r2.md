# REVIEW — overnight gold farm r2 (gx-reviewer-r2)

**UTC:** 2026-08-09 (local ~2026-08-08 22:0x)  
**Scope:** `tracker/EV-QUEUE.md` · `tracker/OVERNIGHT-LOOP.md` · lane `STATUS` · `hydra-whip.sh` · `hydra-refill.sh` · `COMPLETE-GATE.md` · WHIP.log · `.txt` policy · distill overnight STATUS  
**Posture:** production blow-ups only. No style nits.

---

# State

## Blockers

- **obs:** COMPLETE detection is substring `rg … COMPLETE` — **matches the honest line `not COMPLETE` on all three live lanes.**  
  - whip: `~/.xbgst/scripts/hydra-whip.sh:25` — `rg -q 'COMPLETE|State:.*COMPLETE'` → **MATCH** on every `STATUS.md` that says `MAPPED / PARTIAL — not COMPLETE` (proved live: aiven/auth0/google-vrp all MATCH).  
  - refill: `~/.xbgst/scripts/hydra-refill.sh:17` — same class: `rg -q "COMPLETE"` treats **not COMPLETE** as COMPLETE.  
  - doc gate: `tracker/COMPLETE-GATE.md:27` — operator check copies the broken pattern.  
  - severity: **blocker** [certain]  
  - blast: any future wiring of `complete=1` → refill / ship / dawn narrative will **false-fire COMPLETE** on every current honest lane. Gate is inverted-safe-fail.

- **obs:** `hydra-refill.sh` COMPLETE-GATE is **optional and bypassable**. Evidence checks only run when `$1` is an existing directory (`:15–26`). Call with **zero args** (as docs imply “on COMPLETE”) → skips STATUS + FIRST-5 entirely; only requires `COMPLETE-GATE.md` **file existence**.  
  - severity: **blocker** [certain]  
  - blast: one-line ego invoke `hydra-refill.sh` spawns two empty lane dirs + TASK.md regardless of real COMPLETE.

## High

- **obs:** Whip computes `complete` then **never reads it**. Quiet path hardcodes `no_COMPLETE` (`hydra-whip.sh:56`). Logs claim truth; detector is dead code. When someone “fixes” logging by printing `$complete`, logs flip to COMPLETE=yes for all three lanes (see blocker).  
  - severity: **high** [certain]

- **obs:** OVERNIGHT-LOOP / HYDRA **policy ≠ whip behavior**.  
  | Claim | Reality |  
  |-------|---------|  
  | Whip COMPLETE scan drives refill | Whip never calls `hydra-refill` |  
  | Missing REPORT / stall → spawn lane tick | `actions` only logged; no spawn |  
  | 119s log-only when doors closed | True today (good) — but docs over-claim agency |  
  - severity: **high** (ops false confidence) [certain]

- **obs:** EV-QUEUE rank order **violates its own open-state formula**.  
  | Program | open = p×s/e | Table rank |  
  |---------||---------------|------------|  
  | Aiven | 24.0 | 1 OK |  
  | Auth0 | 21.0 | 2 OK |  
  | **Google** | **18.0** | **4 WRONG** |  
  | Proton | 15.8 | 5 |  
  | **Atlassian** | **11.2** | **3 WRONG** (above Google/Proton) |  
  EV-QUEUE §score notes: “rank order is open-state EV + map readiness” — Atlassian #3 is not that. Plan/CONNECTOR preferred Google ≥ Auth0 for openability; table frozen wrong.  
  - severity: **high** (mis-dispatch when any gate flips) [certain]

- **obs:** `hydra-refill.sh` QUEUE ≠ EV-QUEUE keep-8.  
  - refill: `okta, atlassian, openai, msrc, proton, dropbox-inti, shopify-h1, aiven, auth0, google-vrp`  
  - EV keep-8: Aiven, Auth0, Atlassian, Google, Proton, MSRC, Shopify, GitLab\|Dropbox  
  - **okta + openai** still refill-first; **GitLab** absent; active aiven/auth0/google skipped by dir-exists so first live refill pulls **okta+atlassian** (or openai…) — not EV-ranked.  
  - severity: **high** [certain]

- **obs:** Overnight whip **dead ~24h** (`WHIP.log` `2026-08-08T00:40:31Z hydra_no sekhmet_dead` → next tick `2026-08-09T01:01:29Z`). “Overnight farm” observe loop was absent most of the night; restore is session-time, not continuous overnight. OVERNIGHT-LOOP success boundary “whip pid healthy” is post-hoc.  
  - severity: **high** [certain]

## Medium

- **obs:** HYDRA.md self-contradicts OVERFIT lock. Lane table marks Aiven **OVERFIT**; §Rank still: “Closest … **grok/Google VRP** > stack/Aiven > wrap/Auth0” (`HYDRA.md:72`). Agents reading Rank section undoes EV-QUEUE.  
  - severity: **medium** [certain]

- **obs:** COMPLETE-GATE not enforced by whip; not required for default refill path. Critic K1/K8 “mechanical gate” is documentation theater until refill **always** requires lane path + strict State line + evidence files.  
  - severity: **medium** [certain]

- **obs:** OVERNIGHT-LOOP mandates sekhmet `tasks.md` (never `.txt`). Live L3 packs are **only** `tasks.txt` / `tasks-v3.txt` under all three lanes; **zero** `tasks.md`. Policy vs substrate diverge; L3 launch path still .txt.  
  - severity: **medium** [certain]

- **obs:** Whip bare `op item get` every 119s (`hydra-whip.sh:41–42`) — not the-janitor (sentinel WARN). Values discarded today; still policy + future-log leak surface.  
  - severity: **medium** [certain]

- **obs:** Distill claims “Refill-prep stubs (Proton/Atlassian/MSRC)” — `overnight-gold-farm/refill-prep/` is **empty directory**. STATUS overclaims.  
  - severity: **medium** [certain]

- **obs:** REFILL.log sole entry `2026-08-07T22:42:19Z dual-auth-2 complete` is **workflow** COMPLETE, not bounty lane COMPLETE. Pollutes COMPLETE/refill audit trail.  
  - severity: **medium** [certain]

- **obs:** CONNECTOR-overnight continuous `gate_factor` (0.05–1.0) vs EV-QUEUE binary 0\|1 — same name, different scale. Dawn recompute without scale note will desync scores.  
  - severity: **medium** [certain]

## Low

- **obs:** Pre-existing `.txt` under hydra (START.txt, l3/tasks*.txt, PASSIVE-HTTP*.txt, swarm-lines.txt). **No new overnight-authored `.txt`** after 2026-08-08 (new farm artifacts are `.md`). Debt remains; rule violated historically, not by r2 overnight writers.  
  - severity: **low** (policy debt) [certain]

- **obs:** `WHIP-LOOP.log` always empty (0B); real ticks only in `WHIP.log`. Substrate check naming noise.  
  - severity: **low** [certain]

- **obs:** Pruner STATUS still 2026-08-07 triple-run snapshot; not overnight-fresh rollup (pruner logs continue). Stale STATUS, live GC OK.  
  - severity: **low** [certain]

## COMPLETE false-positive audit (money path)

| Lane STATUS | Declared state | Fake COMPLETE in STATUS? | Whip would set complete=1 (regex)? | Refill evidence files? |
|-------------|---------------|---------------------------|------------------------------------|------------------------|
| stack/aiven | MAPPED / PARTIAL — not COMPLETE | **No** (honest) | **Yes (FP)** | No FIRST-5-RESULTS / EVIDENCE |
| wrap/auth0 | MAPPED / PARTIAL — not COMPLETE | **No** | **Yes (FP)** | No |
| grok/google-vrp | MAPPED / PARTIAL — not COMPLETE | **No** | **Yes (FP)** | No |
| HYDRA Completed table | empty | OK | n/a | n/a |
| distill overnight STATUS | COMPLETE count **0** | OK | n/a | n/a |

**Verdict on fake COMPLETE theater:** no agent flipped STATUS to COMPLETE overnight. Integrity currently held by **non-wiring** of detector → refill, not by correct detection. That is a landmine.

## EV-QUEUE vs STATUS lanes

| EV program | Lane claim | STATUS | Align? |
|------------|------------|--------|--------|
| Aiven OVERFIT gate=0 | stack H1 | MAPPED PARTIAL; dual op absent | **yes** |
| Auth0 gate=0 | wrap H2 | MAPPED; CRED REQUESTED | **yes** |
| Google gate=0 | grok H3 | MAPPED; no A/B | **yes** |
| Atlassian/Proton/MSRC/Shopify/GitLab refill | no live lane dirs | n/a | rank order wrong (above) |

## OVERNIGHT-LOOP vs whip (summary)

- Cadence 119s + pid live **now**: OK after restore.  
- Log-only closed doors: **matches code**.  
- COMPLETE → refill: **not implemented** in whip; refill script independent and soft-gated.  
- sekhmet tasks.md: **policy only**; files are `.txt`.  
- Zero thrash CAPTCHA in WHIP.log: **green**.

## .md not .txt (overnight new files)

| Path class | Ext | OK? |
|------------|-----|-----|
| EV-QUEUE, OVERNIGHT-LOOP, IDLE-PLAYBOOK, COMPLETE-GATE, CONNECTOR-overnight, CRITIC/SENTINEL, PLAN, distill STATUS/DAWN | `.md` | yes |
| New overnight authoring | no new `.txt` found | pass for r2 writers |
| Legacy l3/evidence START | `.txt` | residual debt |

---

# Fixes (ordered — fix production bomb first)

1. **Strict COMPLETE matcher** (all of whip / refill / COMPLETE-GATE):
   ```bash
   rg -q '^\*\*State:\*\*[[:space:]]*COMPLETE\b|^State:[[:space:]]*COMPLETE\b' STATUS.md
   ```
   Reject lines containing `not COMPLETE` / `PARTIAL` / `MAPPED`.
2. **refill hard-require** lane dir arg + FIRST-5-RESULTS|EVIDENCE non-empty + REPORT non-empty + COMPLETE-GATE checklist; **exit non-zero** if argc&lt;1.
3. Wire whip `$complete` only after (1); never hardcode `no_COMPLETE` while computing the opposite.
4. Align `hydra-refill.sh QUEUE` to EV-QUEUE keep-8 order (drop okta/openai as auto-refill head unless judge reopens).
5. Re-rank EV-QUEUE rows by open-state: Google #3, Proton #4, Atlassian #5 (or document override axes).
6. Resolve HYDRA §Rank vs OVERFIT=Aiven.
7. Migrate L3 packs to `tasks.md` or rewrite OVERNIGHT-LOOP to accept `tasks-v3.md` only.
8. Refill-prep: write real stubs or stop claiming them in distill STATUS.
9. Route whip gate probe through `the-janitor` (or drop to ≤1/30m).

---

# Artifact: review

```
scope: overnight-gold-farm EV-QUEUE + OVERNIGHT-LOOP + lane STATUS + whip/refill/COMPLETE-GATE + WHIP.log + .txt policy + distill overnight STATUS
verdict: fail
primary_bomb: COMPLETE substring matches "not COMPLETE" on all live lanes; refill gate optional without lane arg
complete_false_positives_in_STATUS: none (honest MAP); detector false-positive: all three
ev_rank_math: broken (Atlassian above Google)
whip_vs_policy: observe-only code vs refill/spawn docs
txt_overnight_new: clean; legacy .txt remain
```

**No APPROVED ship of farm claims until COMPLETE matcher + refill hard-gate fixed.**
