# Runner A — sekhmet dual substrate

**When:** 2026-08-07T14:10Z  
**Lane:** Q-BC auth/bounty  
**Wrappers patched:** unconditional `XBRD_SPARK_ROOT` + model after sourcing `env.l3-sekhmet.sh` (prior bug: env default clobbered dual roots).

## Dry-run (isolation green)

| Pool | Wrapper | Model (provenance) | spark_id | root |
|------|---------|-------------------|----------|------|
| LUNA | `~/.xbgst/scripts/sekhmet-luna.sh` | **gpt-5.6-luna** | `sp-56d42110-0025-4bae-8ec6-12bad88de9dc` | `/run/user/1000/xbrd-spark-luna/...` |
| SPARK | `~/.xbgst/scripts/sekhmet-spark.sh` | **gpt-5.3-codex-spark** | `sp-2e8765e5-1372-4fda-817b-9b384cd95342` | `/run/user/1000/xbrd-spark-spark/...` |

Evidence: `l3/luna-dry.json`, `l3/spark-dry.json` — `dry_run:true`, exit 0.

## Live microprobe (local noop; no bounty hosts)

| Pool | Requested model | Effective model | spark_id | status | note |
|------|-----------------|-----------------|----------|--------|------|
| LUNA | gpt-5.6-luna | gpt-5.6-luna | `sp-03b3c453-de71-4592-88d7-d5ee363647c8` | ok (~3.3s, ~9900 tok) | OAuth/worker OK |
| SPARK | gpt-5.3-codex-spark | **gpt-5.6-luna** (fallback) | `sp-e2e12d32-50ce-4f69-b53f-e4f21abbd5e0` | ok (~12s) | **usage_limit** on codex-spark → fallback luna; root still `xbrd-spark-spark` |

Evidence: `l3/luna-micro.json`, `l3/spark-micro.json`.

## Fan-out recon/checklist (2 luna + 2 spark)

| Pool | spark_id | Artifact | Model effective |
|------|----------|----------|-----------------|
| LUNA | `sp-4a889319-1410-48fc-bd8a-3d0b9a9a1e62` | `l3/checklist-aiven.md` | gpt-5.6-luna |
| LUNA | `sp-87b44661-fa17-4335-80cb-db91ebef4ec5` | `l3/checklist-identity-day.md` | gpt-5.6-luna |
| SPARK root | `sp-b5d2237b-932b-4406-ab64-0ab2caf6428b` | `l3/checklist-atlassian-openai.md` | luna fallback (spark usage_limit) |
| SPARK root | `sp-d32f7b5e-8ad3-43cc-bf9e-17ed79835282` | `l3/runbook-okta-set5.md` | luna fallback (spark usage_limit) |

NDJSON: `l3/luna-swarm-out.ndjson`, `l3/spark-swarm-out.ndjson`.  
Tasks: `tasks/*.md`, `tasks/*-swarm.jsonl`.  
Note: swarm JSON `id` must match `sp-*` or omit; custom `ra-*` ids rejected.

## Blockers

1. **gpt-5.3-codex-spark usage_limit** — pool isolation works; model diversity degraded until quota resets.
2. Pre-patch dry-runs landed under shared `/run/user/1000/xbrd-spark` — **fixed** in wrappers (this session).

## Operator invoke

```sh
. ~/.xbgst/env.l3-sekhmet.sh
~/.xbgst/scripts/sekhmet-luna.sh swarm -j 16 -f tasks.jsonl --timeout 180
~/.xbgst/scripts/sekhmet-spark.sh swarm -j 16 -f tasks.jsonl --timeout 180
```
