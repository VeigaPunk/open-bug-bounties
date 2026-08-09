#!/usr/bin/env bash
set -euo pipefail
export PATH="${HOME}/.local/bin:${HOME}/.cargo/bin:${HOME}/.xbgst/scripts:${PATH}"
. "${HOME}/.xbgst/env.l3-sekhmet.sh" 2>/dev/null || true
ROOT="${XBGST_ORCH_ROOT:-$HOME/.xbgst/xbgst-orch}"
HYDRA="${HOME}/.xbgst/hydra-bounty"
mkdir -p "$ROOT/state" "$ROOT/logs"
ts=$(date -u +%Y-%m-%dT%H:%M:%SZ)
LOG="$ROOT/logs/orch-tick.log"
log() { echo "$ts $*" | tee -a "$LOG"; }

hydra=no; tmux has-session -t hydra 2>/dev/null && hydra=yes
xbgst_sess=no; tmux has-session -t xbgst 2>/dev/null && xbgst_sess=yes
if [[ "$hydra" == "no" ]]; then
  tmux new-session -d -s hydra -n orch
  for w in pruner stack wrap grok sekhmet-a sekhmet-b sekhmet-c; do
    tmux new-window -t hydra -n "$w" 2>/dev/null || true
  done
  hydra=yes
fi
bash "${HOME}/.xbgst/scripts/hydra-pruner.sh" >/dev/null 2>&1 || true

op_a=no; op_b=no
op item get "Aiven BB Account A API" --fields label=username >/dev/null 2>&1 && op_a=yes || true
op item get "Aiven BB Account B API" --fields label=username >/dev/null 2>&1 && op_b=yes || true
cred=unknown
if [[ -f "$HYDRA/lanes/wrap/auth0/CRED-STATE.md" ]]; then
  rg -q 'ASSIGNED' "$HYDRA/lanes/wrap/auth0/CRED-STATE.md" 2>/dev/null && cred=ASSIGNED
  rg -q 'REQUESTED' "$HYDRA/lanes/wrap/auth0/CRED-STATE.md" 2>/dev/null && cred=REQUESTED
fi
complete=0
for s in "$HYDRA"/lanes/*/*/STATUS.md; do
  [[ -f "$s" ]] || continue
  rg -q '^\*\*State:\*\*[[:space:]]*COMPLETE\b|^State:[[:space:]]*COMPLETE\b' "$s" 2>/dev/null && complete=1
done

tick_n=0
[[ -f "$ROOT/state/tick.n" ]] && tick_n=$(cat "$ROOT/state/tick.n")
tick_n=$((tick_n + 1))
echo "$tick_n" > "$ROOT/state/tick.n"

connector_ran=no
if [[ $((tick_n % 10)) -eq 0 ]] && command -v xask-kimi-connector >/dev/null 2>&1; then
  Q="xbgst orch tick ${tick_n}: op_a=${op_a} op_b=${op_b} auth0=${cred} complete=${complete}. 3 cheap moves gold_ev no page-walk no CAPTCHA. OVERFIT=Aiven | godspeed"
  timeout 90 xask-kimi-connector "$Q" >>"$ROOT/logs/connector.log" 2>&1 && connector_ran=yes || connector_ran=fail
fi

{
  echo "# PULSE — xbgst orch"
  echo "**UTC:** $ts · **tick:** $tick_n · **godspeed**"
  echo
  echo "| Sensor | Value |"
  echo "|--------|-------|"
  echo "| hydra | $hydra |"
  echo "| xbgst tmux | $xbgst_sess |"
  echo "| op_aivenA | $op_a |"
  echo "| op_aivenB | $op_b |"
  echo "| auth0 | $cred |"
  echo "| COMPLETE | $complete |"
  echo "| connector | $connector_ran |"
  echo
  if [[ "$op_a" == "yes" && "$op_b" == "yes" ]]; then
    echo "Next: EXECUTE Aiven FIRST-5"
  elif [[ "$cred" == "ASSIGNED" ]]; then
    echo "Next: EXECUTE Auth0 CIC FIRST-5"
  else
    echo "Next: idle-green hold OVERFIT=Aiven"
  fi
} > "$ROOT/state/PULSE.md"
log "tick=$tick_n complete=$complete op_a=$op_a op_b=$op_b auth0=$cred connector=$connector_ran"
echo "OK tick=$tick_n"
