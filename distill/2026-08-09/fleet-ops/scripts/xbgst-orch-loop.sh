#!/usr/bin/env bash
set -euo pipefail
export PATH="${HOME}/.local/bin:${HOME}/.cargo/bin:${HOME}/.xbgst/scripts:${PATH}"
ROOT="${XBGST_ORCH_ROOT:-$HOME/.xbgst/xbgst-orch}"
mkdir -p "$ROOT/logs" "$ROOT/state" "${XDG_RUNTIME_DIR:-/tmp}"
echo $$ > "$HOME/.local/state/xbgst-orch.pid"
LOG="$ROOT/logs/orch-loop.log"
SIGNAL="$ROOT/state/WHIP.signal"
echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) orch-loop start pid=$$ | godspeed" | tee -a "$LOG"
bash "$HOME/.xbgst/scripts/xbgst-orch-tick.sh" || true
while true; do
  if [[ -f "$SIGNAL" ]]; then
    rm -f "$SIGNAL"
    echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) WHIP — godspeed tick" | tee -a "$LOG"
    bash "$HOME/.xbgst/scripts/xbgst-orch-tick.sh" >>"$LOG" 2>&1 || true
  else
    sleep 5
    if [[ -f "$ROOT/state/PULSE.md" ]]; then
      age=$(( $(date +%s) - $(stat -c %Y "$ROOT/state/PULSE.md") ))
      if (( age >= 180 )); then
        bash "$HOME/.xbgst/scripts/xbgst-orch-tick.sh" >>"$LOG" 2>&1 || true
      fi
    fi
  fi
done
