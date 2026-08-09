#!/usr/bin/env bash
set -euo pipefail
export PATH="${HOME}/.local/bin:${HOME}/.cargo/bin:${HOME}/.xbgst/scripts:${PATH}"
ROOT="${XBGST_ORCH_ROOT:-$HOME/.xbgst/xbgst-orch}"
mkdir -p "$ROOT/logs" "$ROOT/state" "$ROOT/logs"

if ! tmux has-session -t xbgst 2>/dev/null; then
  tmux new-session -d -s xbgst -n orch -c "$HOME"
fi
ensure_win() {
  local w="$1"
  tmux list-windows -t xbgst -F '#{window_name}' 2>/dev/null | grep -qx "$w" \
    || tmux new-window -t xbgst -n "$w" -c "$HOME"
}
ensure_win orch
ensure_win whip
ensure_win status
ensure_win connector

# orch loop — detect by pidfile written by loop itself
ORCH_PIDF="$HOME/.local/state/xbgst-orch.pid"
NEED_ORCH=1
if [[ -f "$ORCH_PIDF" ]] && kill -0 "$(cat "$ORCH_PIDF")" 2>/dev/null; then
  NEED_ORCH=0
fi
if [[ "$NEED_ORCH" -eq 1 ]]; then
  tmux send-keys -t xbgst:orch "" C-c Enter 2>/dev/null || true
  sleep 0.2
  tmux send-keys -t xbgst:orch "bash $HOME/.xbgst/scripts/xbgst-orch-loop.sh; echo orch-exit" Enter
fi

WHIP_PIDF="$HOME/.local/state/xbgst-whip.pid"
NEED_WHIP=1
if [[ -f "$WHIP_PIDF" ]] && kill -0 "$(cat "$WHIP_PIDF")" 2>/dev/null; then
  NEED_WHIP=0
fi
if [[ "$NEED_WHIP" -eq 1 ]]; then
  tmux send-keys -t xbgst:whip "" C-c Enter 2>/dev/null || true
  sleep 0.2
  # write pidfile from inside loop
  tmux send-keys -t xbgst:whip "bash -c 'echo \$\$ > $HOME/.local/state/xbgst-whip.pid; while true; do bash $HOME/.xbgst/scripts/xbgst-whip.sh; sleep 119; done'" Enter
fi

tmux send-keys -t xbgst:status "" C-c Enter 2>/dev/null || true
sleep 0.15
tmux send-keys -t xbgst:status "watch -n 15 'date -u; echo; cat $ROOT/state/PULSE.md 2>/dev/null | head -35; echo; tail -8 $ROOT/logs/WHIP.log 2>/dev/null'" Enter

tmux send-keys -t xbgst:connector "" C-c Enter 2>/dev/null || true
sleep 0.15
tmux send-keys -t xbgst:connector "touch $ROOT/logs/connector.log; tail -F $ROOT/logs/connector.log" Enter

tmux list-windows -t xbgst
echo "xbgst ensured"
