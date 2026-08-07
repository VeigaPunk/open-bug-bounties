# Dual sekhmet substrate

| Pool | Wrapper | Model | Root | j |
|------|---------|-------|------|---|
| LUNA | ~/.xbgst/scripts/sekhmet-luna.sh | gpt-5.6-luna | $XDG_RUNTIME_DIR/xbrd-spark-luna | 64 |
| SPARK | ~/.xbgst/scripts/sekhmet-spark.sh | gpt-5.3-codex-spark | $XDG_RUNTIME_DIR/xbrd-spark-spark | 64 |

Worker: codex-titanium. Host Grok subagents ≤16. Tmux: sekhmet {substrate,orch,bounty-distill,luna,spark}.

```sh
. ~/.xbgst/env.l3-sekhmet.sh
~/.xbgst/scripts/tmp-sanitize-bounty.sh
~/.xbgst/scripts/sekhmet-luna.sh swarm -j 16 -f tasks.txt --timeout 180 --no-keep
~/.xbgst/scripts/sekhmet-spark.sh swarm -j 16 -f tasks.txt --timeout 180 --no-keep
```

## STATUS (2026-08-07T22:34:49Z)

| Pool | Dry-run | Exit | Model (provenance) | result.json |
|------|---------|------|--------------------|-------------|
| LUNA | dual-luna-wf-health | 0 | gpt-5.6-luna | `/run/user/1000/xbrd-spark-luna/sp-c2b8cf9a-bb07-4af4-bd73-56dc586c02bc/out/result.json` |
| SPARK | dual-spark-wf-health | 0 | gpt-5.3-codex-spark | `/run/user/1000/xbrd-spark-spark/sp-f92f715b-cce8-4971-a8ce-cc3e55d75642/out/result.json` |

- **STATUS:** dual pools healthy (both dry-run exit 0, status=ok)
- **CODEX auth:** ChatGPT login live (`codex login status`)
- **Live microprobe:** skipped (optional; dry-run sufficient for ok=true)
