# LABRAT-r2 — gx-labrat-r2 empirical probe

**UTC:** 2026-08-09T01:05Z (approx)  
**Role:** labrat single-shot  
**No CAPTCHA / no login / no secrets printed**

---

## Probes

| # | Check | Result |
|---|--------|--------|
| 1 | `kill -0 $(cat ~/.local/state/hydra-whip.pid)` | **whip=0** (alive). pid=218570 `bash -c while true; do bash hydra-whip.sh; sleep 119; done` |
| 2 | tmux `hydra` / `sekhmet` / `janitor` | **all present** (exit 0 each) |
| 3 | `test -s` EV-QUEUE / OVERNIGHT-LOOP / IDLE-PLAYBOOK | **under distill path: FAIL** (not present in `overnight-gold-farm/`). **Canonical hydra paths: OK** — EV-QUEUE.md 3927 B, OVERNIGHT-LOOP.md 3521 B, IDLE-PLAYBOOK.md 17457 B |
| 4 | op item existence titles `Aiven A` / `Aiven B` | **no / no** (also no for Aiven-A/B, aiven-a/b, "Aiven account A/B") |
| 5 | WHIP.log last 3 lines | path `~/.xbgst/hydra-bounty/logs/WHIP.log` — see below |
| 6 | `rg COMPLETE` in lane STATUS | **3 files / 3 lines** — all `MAPPED / PARTIAL — not COMPLETE` (google-vrp, aiven, auth0). **Zero true COMPLETE** |
| 7 | secret rg under overnight-gold-farm | **0 hits** (empty of real material) |
| 8 | `curl -sI` api.aiven.io/v1/me | HEAD → **HTTP/2 405** (Allow: GET,OPTIONS,PATCH). GET → **401** unauth (expected) |
| 9 | `df /tmp` | tmpfs 16G total, ~636M used, **4%**, plenty free |

### WHIP.log tail (last 3)

```
2026-08-09T01:02:40Z whip end fresh=NONE no_missing no_COMPLETE no_spawn no_refill no_ship hydra_ok sekhmet_abc_alive no_triple_dryrun op_aivenA=no op_aivenB=no
2026-08-09T01:03:34Z fresh_REPORT_lt5m=NONE missing_or_empty=NONE
2026-08-09T01:03:34Z whip end fresh=NONE no_missing no_COMPLETE no_spawn no_refill no_ship hydra_ok sekhmet_abc_alive no_triple_dryrun op_aivenA=no op_aivenB=no
```

### Distill tree note

`~/.xbgst/bounty-distill/2026-08-08/overnight-gold-farm/` holds only: `DAWN-ROLLUP.md`, `STATUS.md`, empty `refill-prep/`. Queue/loop/playbook live under `~/.xbgst/hydra-bounty/`.

---

# State

- obs: Hypothesis **pass** [strong] — whip loop alive; hydra/sekhmet/janitor tmux up; lane STATUS none COMPLETE; op Aiven A/B absent; Aiven API unauth 401 on GET; secret scan clean; /tmp healthy
- obs: Hypothesis **fail** [certain] for “EV-QUEUE etc non-empty *in* overnight-gold-farm distill” — files are elsewhere under hydra-bounty
- obs: Hypothesis **unclear→resolved** Aiven HEAD vs GET — HEAD 405 is method-not-allowed, not auth; GET confirms 401

# Unknowns

- op_aiven_titles: vault may use different item names than “Aiven A/B” — affects: auth lane readiness (whip already logs op_aivenA=no)
- COMPLETE_gate: lanes still PARTIAL; whip correctly no_spawn/no_refill — affects: overnight gold progress rate
- distill_vs_hydra_SSoT: overnight-gold-farm distill thin vs hydra-bounty tracker — affects: labrat path assumptions next round

---

DESPAWN: gx-labrat-r2 — signal delivered. Send me shutdown_request.
