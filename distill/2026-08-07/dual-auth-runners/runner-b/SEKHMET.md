# Runner B — dual sekhmet substrate

**UTC:** 2026-08-07T14:07Z  
**Lane:** Q-FP + Q-H1 auth readiness  
**Wrappers:** `~/.xbgst/scripts/sekhmet-luna.sh` · `sekhmet-spark.sh`

## Dry-run results

| Pool | Command | dry_run | exit | root observed | model in provenance |
|------|---------|---------|------|---------------|---------------------|
| LUNA (env only) | `echo '[]' \| sekhmet-luna.sh swarm --dry-run -j 2` | true | 0 | **`/run/user/1000/xbrd-spark`** (default — isolation miss) | gpt-5.6-luna |
| SPARK (env only) | `echo '[]' \| sekhmet-spark.sh swarm --dry-run -j 2` | true | 0 | **`/run/user/1000/xbrd-spark`** (default — isolation miss) | gpt-5.6-luna (spark model env not bound on dry-run) |
| LUNA + `--root` | `… swarm --dry-run -j 2 --root $XDG_RUNTIME_DIR/xbrd-spark-luna` | true | 0 | **`/run/user/1000/xbrd-spark-luna/sp-…`** | gpt-5.6-luna |
| SPARK + `--root` | `… swarm --dry-run -j 2 --root $XDG_RUNTIME_DIR/xbrd-spark-spark` | true | 0 | **`/run/user/1000/xbrd-spark-spark/sp-…`** | gpt-5.6-luna (model override still weak on dry-run) |

## Isolation verdict

- **Gate M01 dual-root:** **PASS only when callers pass `--root`** (or sekhmet binds `XBRD_SPARK_ROOT` — currently env set by wrapper is **not** reflected in swarm dry-run root).
- Dual dirs exist and accept sparks: `xbrd-spark-luna`, `xbrd-spark-spark`.
- **Model bind:** spark wrapper exports `gpt-5.3-codex-spark` but dry-run provenance still shows `gpt-5.6-luna` — escalate for live model diversity; use live swarm evidence to confirm.
- **Runner B convention:** always invoke with explicit root:

```sh
LROOT="${XDG_RUNTIME_DIR}/xbrd-spark-luna"
SROOT="${XDG_RUNTIME_DIR}/xbrd-spark-spark"
~/.xbgst/scripts/sekhmet-luna.sh  swarm -j 2 -f tasks/luna-tasks.ndjson  --root "$LROOT" --timeout 180 --no-keep
~/.xbgst/scripts/sekhmet-spark.sh swarm -j 2 -f tasks/spark-tasks.ndjson --root "$SROOT" --timeout 180 --no-keep
```

## Live swarm (runner-b l3 writers)

| Pool | tasks file | jobs | timeout | outputs under `runner-b/l3/` |
|------|------------|------|---------|------------------------------|
| LUNA | `tasks/luna-tasks.ndjson` | 2 | 180s | `luna-f1-google-authz.md`, `luna-h1-shopify-ready.md` + swarm NDJSON |
| SPARK | `tasks/spark-tasks.ndjson` | 2 | 180s | `spark-f2-msrc-obb.md`, `spark-f3-f4-xor.md` + swarm NDJSON |

Raw dry-run logs: `SEKHMET-dry-run.raw.txt`, `SEKHMET-dry-run-root.raw.txt`.

## Policy for L3 tasks

- Recon / policy fidelity maps only  
- No live exploit, no bounty-host spam, no secret expansion  
- Own assets only after human account prep  

## Substrate env

- `XBRD_SPARK_JOBS=64` (default)  
- Worker host: codex-titanium  
- Host Grok subagents ≤16  
- tmp sanitize: green (~2% /tmp)
## Live swarm outcome (2026-08-07T14:10Z)

| spark_id | pool | status | root | model |
|----------|------|--------|------|-------|
| sp-rb-luna-f1-google | luna | ok | xbrd-spark-luna | gpt-5.6-luna |
| sp-rb-luna-h1-shopify | luna | ok | xbrd-spark-luna | gpt-5.6-luna |
| sp-rb-spark-f2-msrc | spark | ok | xbrd-spark-spark | fallback luna (spark usage_limit) |
| sp-rb-spark-f3-f4-xor | spark | ok | xbrd-spark-spark | fallback luna |

**FS write from spark:** blocked (`code-mode host is disabled`). Host materialized `l3/*.md` + copied `*-result.json`. Dual dispatch + dual root still **green**.

## Pulse advance swarm (2026-08-07T14:18–14:20Z)

| spark_id | pool | status | root | model | notes |
|----------|------|--------|------|-------|-------|
| sp-rb-luna-f1-first-target | luna | ok | xbrd-spark-luna | gpt-5.6-luna | ~30s; F1 Drive first-target confirm |
| sp-rb-spark-h1-export | spark | ok | xbrd-spark-spark | fallback luna (spark usage_limit) | ~66s; H1 export checklist |

**Tasks:** `tasks/pulse-luna.ndjson`, `tasks/pulse-spark.ndjson`  
**Logs:** `l3/pulse-luna-20260807T141831Z.log`, `l3/pulse-spark-20260807T141831Z.log`  
**Host files:** `l3/luna-f1-first-target.md`, `l3/spark-h1-export-steps.md`  
**Dual root dispatch:** green. Prefer `--keep` next pulse if artifact harvest needed before GC.
