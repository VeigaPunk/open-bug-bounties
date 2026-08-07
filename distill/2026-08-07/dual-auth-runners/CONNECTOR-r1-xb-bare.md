# CONNECTOR-r1-xb-bare — post dual-auth autonomous readiness

**UTC:** 2026-08-07 (scan)  
**Role:** gx-connector-r1  
**Intent:** Inquiry — cross-axis scan of `~/.xbgst/plan-r0.md` (post dual-auth hygiene)  
**Axes:** operational_readiness · evidence_density · ship_hygiene · safety_no_secrets · autonomy_without_human_blockers  
**Scope:** dual-auth-runners · plan-r0 · sekhmet wrappers · open-bug-bounties · private bounty-distill  
**No commits. No live enroll.**

---

# State

- **inf:** **SSoT fork across three stores** — (1) hot `~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/` has WORKFLOW-DONE + SHIP ok=true; (2) public `open-bug-bounties` `distill/.../dual-auth-runners/` **missing** WORKFLOW-DONE (lives only under sibling label `dual-auth-workflow-done/`); (3) private git root `bounty-distill/2026-08-07` has `?? dual-auth-runners/` + `M ACTION-LOG.md`, last commit TAC docs, not race. Agents reading any one store get different “done?” answers. Axes: ship_hygiene, evidence_density, operational_readiness. **[strong]**

- **inf:** **GATES-dual is the poison pill** — still `race IN PROGRESS` / `workflow LAUNCHED` while WORKFLOW-DONE + SCRIBE + SHIP contradict. Public mirror carries the same stale GATES. Any bare `/xb` or L3 task that greps GATES first will re-open the race (autonomy regress). Closing GATES (M06) is higher leverage than re-dry (M02) for autonomy_without_human_blockers. Axes: autonomy, evidence_density. **[strong]**

- **inf:** **Private push path ≠ public ship path** — private origin is **HTTPS** `github.com/VeigaPunk/bounty-distill.git`; public milestone-ship uses **SSH** `open-bug-bounties`. Unknowns in handoff (“private git push auth”) are structural: credential helper / gh auth for HTTPS is a different failure mode than SSH agent. E3 in plan is correct; M07 should not block M06/M08. Axes: ship_hygiene, operational_readiness. **[strong]**

- **inf:** **Dual-pool health is root-isolated, model-collapsed** (prior CONNECTOR + SUBSTRATE + GATES spark DEGRADED). Plan M02 dry-run both exit 0 can pass while live spark is still luna-fallback. Dry green ≠ dual-model diversity; treat M02 as **job isolation / PATH** gate only. Axes: operational_readiness, evidence_density. **[strong]**

- **inf:** **Extra luna-a/b/c wrappers** (`sekhmet-luna-{a,b,c}.sh` → roots `xbrd-spark-luna-{a,b,c}`) used by hydra swarms are **outside** plan M02 (only luna + spark). Runtime shows populated luna-a/b/spark roots. Second-order: dual-pool “green” while lane-a/b share no dry stamp in GATES/SUBSTRATE. Axes: operational_readiness. **[medium]**

- **inf:** **Human freeze is documented but hydra is still MAPPED×3 COMPLETE=0** — WORKFLOW-DONE hands off to hydra; SCRIBE says no fake COMPLETE. Plan freezes Join/MFA/CAPTCHA correctly, but does not stamp a **hydra freeze / no-enroll** line. Hungry bare `/xb` can refill hydra tasks against Aiven/Auth0/Google human gates. Axes: autonomy_without_human_blockers. **[strong]**

- **inf:** **Evidence pack gap is calendar-real** — `~/.xbgst/evidence/` has 2026-08-04/06 sekhmet gates; **no** `dual-auth-ready-*` post WORKFLOW-DONE. SUBSTRATE dry stamp (22:34Z) predates workflow terminal (22:42Z) only slightly but is not copied into host evidence. M08 is the missing “judge can re-verify offline” artifact. Axes: evidence_density. **[medium]**

- **inf:** **Ship bulk surface** — CLAIMS.md ~104KB; GODSPEED-PULSE.log 64KB; tmp-sanitize-logs ~1MB; runner trees ~1.4MB each. Private M07 should exclude pulse log + sanitize logs (plan already says lean). Public rsync filters md/txt/json/ndjson yet public tree still has GODSPEED-PULSE.log (prior ship path / copy). Axes: ship_hygiene, safety (noise hides signal). **[medium]**

- **inf:** **Two ACTION-LOG files** — private root `ACTION-LOG.md` (modified, ~297 lines) vs `dual-auth-runners/ACTION-LOG.md` (~575, pulse-heavy). Parent public ship used HUNT-NOW+ACTION-LOG under label `bounty-distill-2026-08-07/`. Staging both without merge note confuses “what advanced.” Axes: ship_hygiene, evidence_density. **[medium]**

- **risk:** M07 private push fail (HTTPS auth) → operator retries with token in env / paste → **safety_no_secrets** hit. Condition: push fails + ad-hoc `gh auth` / PAT in shell history. Prefer SSH remote rewrite or `gh` keychain only; never embed token in distill.
- **risk:** M06 edits GATES without public re-ship → hot/private green, public still IN PROGRESS → next public clone re-launches race. Condition: M08 public branch skipped “no delta” incorrectly (GATES delta is the delta).
- **risk:** M02–M05 burn wall-clock while GATES still wrong → autonomy_without_human_blockers stays red for any concurrent agent. Condition: strict serial M01→…→M06.
- **risk:** Secret gate on `password=` scrub docs already known clean; over-tightening to match scrub phrases blocks ship. Condition: expanding rg without allowlist for “password=” demo lines.
- **risk:** Re-running dual A/B content pulses (out of scope) under “readiness” label — CLAIMS merge thrash + human-gate pressure. Condition: judge confuses race redo with GATES stamp.

---

# Dissent

| Expectation | Who | Why wrong / right |
|-------------|-----|-------------------|
| “Private ship first = ship_hygiene max” | executor / ship role | Public already has race body; **stale GATES on public** is the higher hygiene bug. Private untracked is backup lag, not the SSoT operators clone. |
| “M02 dual dry is the readiness bottleneck” | labrat | Dry already green in SUBSTRATE ~22:34Z; re-run is cheap confirmation, not discovery. **GATES lie + missing evidence pack + hydra freeze** move more axes. |
| “Skip public re-ship if only docs” | ship_hygiene minimalists | GATES-dual + WORKFLOW-DONE under **canonical dual-auth-runners label** is the doc delta that prevents re-race; sibling `dual-auth-workflow-done` is easy to miss. |
| “Spark DEGRADED blocks autonomous ready” | dual-model purists | Roots isolated + dry ok + luna fallback is acceptable for freeze phase; model diversity is not an axis this plan owns. |
| “UPAFAG or new product if residual closed” | E5 tempt | Human gates still open; residual is hygiene only — E5 correctly non-default. |

---

# Rationale (strange angle)

The race is **finished in narrative stamps** (WORKFLOW-DONE, SCRIBE, SHIP ok=true, public e46fd83) but **unfinished in the gate table agents actually poll** (GATES-dual). That is a classic distributed-systems split brain: the write path (workflow) advanced; the read path (GATES) did not. Autonomous readiness is not “can sekhmet dry-run?” — it is “will the next agent invent work?” With GATES saying IN PROGRESS and hydra MAPPED×3, bare `/xb` will invent work against frozen human surfaces.

Second non-obvious link: **transport asymmetry** (HTTPS private vs SSH public) means “private ship hygiene” can fail for reasons orthogonal to secret gate cleanliness. Plan correctly escalates E3; connector adds: do not serialize M07 ahead of M06, and treat public GATES closeout as mandatory if M06 mutates shared/GATES-dual.md.

Third: **label fragmentation** on public mirror (`dual-auth-runners` vs `dual-auth-workflow-done` vs `dual-auth-ship-terminal`) optimizes for workflow phase artifacts but **breaks single-directory truth**. Prefer re-ship WORKFLOW-DONE + closed GATES into the primary label rather than inventing a fourth label.

---

# Connections (bullets for judge)

1. **GATES-dual ↔ WORKFLOW-DONE ↔ public primary label** — stale gate is the cross-store re-race attractor; fix once, mirror to public dual-auth-runners/.
2. **Private HTTPS origin ↔ E3 ↔ safety** — push auth failure is not a sekhmet problem; wrong fix (PAT in clear) is.
3. **SUBSTRATE dry green ↔ M02 redundancy ↔ M08 value** — re-dry is optional smoke; **evidence pack** is the missing durable proof.
4. **luna-a/b/c roots ↔ plan M02 scope hole** — hydra used multi-root luna lanes; dual-wrapper check incomplete for full substrate map (document, don’t block).
5. **Hydra MAPPED×3 ↔ human freeze docs** — freeze is incomplete without “no hydra enroll / no Get Creds automation” in AUTONOMOUS-READY.
6. **SHIP ok public ↔ private ?? dual-auth-runners** — public-ahead private-lag is inverted from usual “private first”; private is archival parity, not readiness gate.
7. **CLAIMS 104KB + pulse log ↔ lean private stage** — exclude bulk; keep REPORT/COMPARE/GATES/NEXT-HUMAN/SUBSTRATE/WORKFLOW-DONE/SHIP/SCRIBE.
8. **Parent ACTION-LOG M vs dual ACTION-LOG** — stage with explicit path note or single “pointer” line to avoid double SSoT.
9. **spark usage_limit ↔ dual diversity narrative** — already demystified mid-race; don’t re-litigate in readiness plan.
10. **milestone-ship rsync filters ↔ GODSPEED-PULSE.log on public** — prior ship may have different include set; next ship: verify log not re-added; pulse noise ≠ evidence.

---

# Keep / drop moves (Pareto for judge)

## KEEP (improve ≥1 axis, harm none)

| Move | Axes ↑ | Cost |
|------|--------|------|
| **K1** M06: stamp GATES-dual race=DONE, workflow=finished, ship_ok; list human freeze | evidence, autonomy | minutes, doc only |
| **K2** Write AUTONOMOUS-READY.md with freeze list + dry re-gate cmds + phrase `xbgst live test Aiven` + **hydra no-enroll** | autonomy, evidence | minutes |
| **K3** M05 secret gate as written (fail closed high-signal only) | safety | seconds |
| **K4** M08 evidence pack: M02–M05 stdout + GATE_OK under `~/.xbgst/evidence/dual-auth-ready-*` | evidence | minutes |
| **K5** Public re-ship **only** after M06: primary label gets closed GATES + WORKFLOW-DONE (+ AUTONOMOUS-READY) | ship_hygiene, autonomy | one milestone-ship |
| **K6** M07 private stage **lean**: dual-auth-runners minus GODSPEED-PULSE.log, tmp-sanitize-logs; if HTTPS push fails → local commit only (E3) | ship_hygiene, safety | low; non-blocking |
| **K7** M01 freeze doc verify (CONTINUE + NEXT-HUMAN exist) | autonomy | seconds |
| **K8** M03 PATH + cli_smoke if cheap (parallel M02) | operational_readiness | low if already green |
| **K9** Optional M02 dual dry **once** for fresh stamp into evidence pack | operational_readiness, evidence | low |

## DROP / DEFER (harm or zero gain)

| Move | Why drop |
|------|----------|
| **D1** Full dual A/B race re-run / content pulses | Out of scope; CLAIMS thrash; human-gate pressure |
| **D2** Live enroll, CAPTCHA, MFA, Auth0 Get Creds, H1 SPA export | Human frozen; autonomy false |
| **D3** Blocking autonomous-ready on spark non-fallback live | Model diversity not this plan’s axis; dry+roots enough |
| **D4** Expanding secret rg to generic `password=` | Blocks on scrub docs; no safety gain |
| **D5** UPAFAG / empty product (E5) | Residual is hygiene; human gates open |
| **D6** Force private HTTPS push with new PAT in shell | Safety risk; E3 local commit sufficient |
| **D7** Serializing M07 before M06/M08 | Wrong dependency; GATES/public truth first |
| **D8** Requiring luna-a/b/c dry in M02 gate | Nice-to-have note only; don’t fail readiness |
| **D9** Shipping full tmp-sanitize-logs / pulse log to private or public | Bulk, low signal |
| **D10** sekhmetalt / general-purpose / explore | Anti-pattern |

## Dependency reorder (cheap win)

```
M01 ∥ (M05 probe) 
M06 (GATES + AUTONOMOUS-READY)  ← pull forward after M05 clean; don’t wait M02–M04 if time-boxed
M02 ∥ M03 ∥ M04   (smoke → evidence)
M08 evidence pack
M07 private lean ship (non-blocking)
K5 public GATES closeout if M06 changed files
```

Original M01→…→M08 serial is safe but **delays the only stamp that stops re-race** (GATES).

---

# Second-order checklist (if plan executes)

1. After M06: `diff` public vs hot GATES-dual — must be non-empty until K5 ships.  
2. After M07: if `git push` HTTPS fails, **stop** — do not write credentials into repo; optional later `git remote set-url origin git@github.com:VeigaPunk/bounty-distill.git`.  
3. AUTONOMOUS-READY must name hydra lanes (Aiven/Auth0/Google) as **human-gated**, not “next swarm.”  
4. Do not treat sibling public labels as substitutes for updating `dual-auth-runners/`.

---

# Return summary (for dispatcher)

- **Strongest non-obvious:** GATES-dual is read-path SSoT still mid-race while write-path is DONE → autonomy leak.  
- **Strongest risk:** private HTTPS push auth + token temptation; public stale GATES if M06 without re-ship.  
- **Best cheap wins:** K1+K2+K3+K4+K5; M07 non-blocking lean; drop D1–D10.  
- **Axes:** operational_readiness already mostly green (SUBSTRATE); evidence_density + autonomy + ship_hygiene are the live frontier.

**planner-gate residual:** advisory connections only; no commits this turn.
