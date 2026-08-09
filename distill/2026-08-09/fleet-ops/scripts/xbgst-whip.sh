#!/usr/bin/env bash
# 119s godspeed whip for tmux session xbgst
set -euo pipefail
export PATH="${HOME}/.local/bin:${HOME}/.cargo/bin:${HOME}/.xbgst/scripts:${PATH}"
ROOT="${XBGST_ORCH_ROOT:-$HOME/.xbgst/xbgst-orch}"
mkdir -p "$ROOT/logs" "$ROOT/state"
LOG="$ROOT/logs/WHIP.log"
ts=$(date -u +%Y-%m-%dT%H:%M:%SZ)
{
  echo "$ts === xbgst-whip godspeed ==="
  xbgst_ok=no; orch_ok=no
  tmux has-session -t xbgst 2>/dev/null && xbgst_ok=yes
  tmux list-windows -t xbgst -F '#{window_name}' 2>/dev/null | grep -qx orch && orch_ok=yes
  pulse_age=99999
  [[ -f "$ROOT/state/PULSE.md" ]] && pulse_age=$(( $(date +%s) - $(stat -c %Y "$ROOT/state/PULSE.md") ))
  hydra_ok=no; tmux has-session -t hydra 2>/dev/null && hydra_ok=yes
  sekhmet_ok=no; tmux has-session -t sekhmet 2>/dev/null && sekhmet_ok=yes

  if [[ "$xbgst_ok" == "no" ]]; then
    bash "$HOME/.xbgst/scripts/xbgst-tmux-ensure.sh" || true
  fi
  touch "$ROOT/state/WHIP.signal"
  if (( pulse_age > 150 )); then
    bash "$HOME/.xbgst/scripts/xbgst-orch-tick.sh" || true
  fi
  bash "${HOME}/.xbgst/scripts/hydra-whip.sh" 2>/dev/null || true
  echo "$ts end xbgst=$xbgst_ok orch=$orch_ok hydra=$hydra_ok sekhmet=$sekhmet_ok pulse_age=${pulse_age}s | godspeed"
} >>"$LOG" 2>&1
