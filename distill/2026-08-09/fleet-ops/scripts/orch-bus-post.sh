#!/usr/bin/env bash
# orch-bus-post.sh <orch-N> <slug> <status> <message...>
set -euo pipefail
COMM="${HOME}/.xbgst/xbgst-orch/comm"
orch="${1:?orch-N}"; slug="${2:?slug}"; status="${3:?status}"; shift 3
msg="${*:-}"
ts=$(date -u +%Y-%m-%dT%H:%M:%SZ)
fn="$COMM/bus/$(date -u +%Y%m%d-%H%M%S)-${orch}-${slug}.md"
mkdir -p "$COMM/bus" "$COMM/claims"
cat > "$fn" <<EOM
# bus ${orch} · ${slug}
**UTC:** $ts
**status:** $status
**msg:** $msg
EOM
# upsert claim
cat > "$COMM/claims/${slug}.md" <<EOM
# claim ${slug}
owner: ${orch}
task: ${msg}
status: ${status}
started: $ts
updated: $ts
evidence: none
EOM
echo "posted $fn"
