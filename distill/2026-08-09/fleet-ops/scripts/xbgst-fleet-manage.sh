#!/usr/bin/env bash
# xbgst-fleet-manage — monitor 8 orchs, reassign, tmp GC, substrate keep-alive
set -euo pipefail
export PATH="${HOME}/.local/bin:${HOME}/.cargo/bin:${HOME}/.xbgst/scripts:${PATH}"
COMM="${HOME}/.xbgst/xbgst-orch/comm"
ROOT="${HOME}/.xbgst/xbgst-orch"
HYDRA="${HOME}/.xbgst/hydra-bounty"
LOG="$ROOT/logs/fleet-manage.log"
TS=$(date -u +%Y-%m-%dT%H:%M:%SZ)
log() { echo "$TS $*" | tee -a "$LOG"; }

mkdir -p "$COMM"/{claims,bus,inbox} "$ROOT/logs" "$ROOT/state"

# 1) Substrate
tmux has-session -t xbgst 2>/dev/null || {
  log "respawn xbgst session skeleton"
  tmux new-session -d -s xbgst -n orch-1 -c "$HOME"
  for i in 2 3 4 5 6 7 8; do tmux new-window -t xbgst -n "orch-$i" -c "$HOME"; done
  tmux new-window -t xbgst -n whip -c "$HOME"
}
tmux has-session -t hydra 2>/dev/null || {
  tmux new-session -d -s hydra -n orch
  for w in pruner stack wrap grok sekhmet-a sekhmet-b sekhmet-c; do tmux new-window -t hydra -n "$w" 2>/dev/null || true; done
  log "restored hydra"
}
bash "${HOME}/.xbgst/scripts/hydra-pruner.sh" >/dev/null 2>&1 || true
bash "${HOME}/.xbgst/scripts/hydra-whip.sh" 2>/dev/null || true

# 2) Tmp / runtime GC (safe allowlist)
# age-gated rm under known prefixes only
for d in \
  "${XDG_RUNTIME_DIR:-/tmp}/codex-fnm-"* \
  "${XDG_RUNTIME_DIR:-/tmp}/xbrd-spark-"* \
  "${XDG_RUNTIME_DIR:-/tmp}/hydra-ms-"* \
  /tmp/tmp.* \
  /tmp/xbgst-*
do
  [[ -e "$d" ]] || continue
  # skip if modified in last 2h
  if [[ -d "$d" ]]; then
    mtime=$(stat -c %Y "$d" 2>/dev/null || echo 0)
    now=$(date +%s)
    if (( now - mtime > 7200 )); then
      rm -rf "$d" 2>/dev/null || true
      log "tmp-gc removed $d"
    fi
  fi
done
# df note
df -h /tmp 2>/dev/null | tail -1 | tee -a "$LOG" >/dev/null || true

# 3) Stale claims (>45m active with no bus update)
now=$(date +%s)
for c in "$COMM"/claims/*.md; do
  [[ -f "$c" ]] || continue
  base=$(basename "$c" .md)
  mtime=$(stat -c %Y "$c")
  status=$(rg -o 'status:[[:space:]]*\S+' "$c" 2>/dev/null | head -1 | awk '{print $2}' || echo active)
  owner=$(rg -o 'owner:[[:space:]]*\S+' "$c" 2>/dev/null | head -1 | awk '{print $2}' || echo unknown)
  if [[ "$status" == "active" ]] && (( now - mtime > 2700 )); then
    {
      echo ""
      echo "## fleet-manager @ $(date -u +%Y-%m-%dT%H:%M:%SZ)"
      echo "**re:** $base"
      echo "**need:** claim stale >45m — reaffirm bus post or release"
      echo "**context:** $c"
    } >> "$COMM/inbox/${owner}.md" 2>/dev/null || true
    # soft mark
    sed -i 's/^status:.*/status: stale-nudge/' "$c" 2>/dev/null || true
    log "stale-nudge $base owner=$owner"
  fi
done

# 4) Orch liveness: if pane not running grok, relaunch with mission pointer
for i in 1 2 3 4 5 6 7 8; do
  pane_txt=$(tmux capture-pane -t "xbgst:orch-$i" -p 2>/dev/null | tail -5 || true)
  if ! tmux list-windows -t xbgst -F '#{window_name}' 2>/dev/null | grep -qx "orch-$i"; then
    tmux new-window -t xbgst -n "orch-$i" -c "$HOME"
    log "created missing orch-$i"
  fi
  # if dead shell prompt only and no grok in pane title area — heuristic: "command not found" or empty after long idle
  if echo "$pane_txt" | rg -q 'command not found|No such file|session ended|error:'; then
    log "relaunch grok orch-$i after error"
    tmux send-keys -t "xbgst:orch-$i" C-c Enter 2>/dev/null || true
    sleep 0.2
    tmux send-keys -t "xbgst:orch-$i" "grok --always-approve --cwd $HOME 'Continue as orch-${i}/8 hydra bounty. Read ~/.xbgst/xbgst-orch/comm/PROTOCOL.md BOARD.md inbox/orch-${i}.md claims. Claim if free, bus-post, help peers. | godspeed'" Enter
  fi
done

# 5) Gate sensors
op_a=no; op_b=no
op item get "Aiven BB Account A API" --fields label=username >/dev/null 2>&1 && op_a=yes || true
op item get "Aiven BB Account B API" --fields label=username >/dev/null 2>&1 && op_b=yes || true
if [[ "$op_a" == "yes" && "$op_b" == "yes" ]]; then
  for i in 1 3; do
    {
      echo ""
      echo "## fleet-manager DOOR-OPEN @ $(date -u +%Y-%m-%dT%H:%M:%SZ)"
      echo "**re:** aiven-overfit"
      echo "**need:** op A/B titles present — execute FIRST-5 own-asset only; fill FIRST-5-RESULTS; no fake COMPLETE"
      echo "**context:** ~/.xbgst/hydra-bounty/lanes/stack/aiven/"
    } >> "$COMM/inbox/orch-$i.md"
  done
  log "DOOR aiven tokens ready — nudged orch-1,3"
fi

# 6) BOARD refresh from claims
{
  echo "# Orch fleet BOARD (managed)"
  echo "**Updated:** $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "**OVERFIT:** Aiven · **op_aivenA/B:** $op_a/$op_b"
  echo
  echo "| Claim | Owner | Status | mtime UTC |"
  echo "|-------|-------|--------|-----------|"
  for c in "$COMM"/claims/*.md; do
    [[ -f "$c" ]] || continue
    slug=$(basename "$c" .md)
    owner=$(rg -o 'owner:[[:space:]]*\S+' "$c" 2>/dev/null | head -1 | awk '{print $2}' || echo ?)
    status=$(rg -o 'status:[[:space:]]*\S+' "$c" 2>/dev/null | head -1 | awk '{print $2}' || echo ?)
    mt=$(date -u -d "@$(stat -c %Y "$c")" +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || echo ?)
    echo "| $slug | $owner | $status | $mt |"
  done
  echo
  echo "## Bus (last 8)"
  ls -1t "$COMM"/bus 2>/dev/null | head -8 | while read -r f; do echo "- $f"; done
  echo
  echo "## Policy"
  echo "MAP≠COMPLETE · no CAPTCHA thrash · no 1100 walk · peer bus after engage"
} > "$COMM/BOARD.md"

# 7) Manager pulse
{
  echo "# FLEET PULSE"
  echo "**UTC:** $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "- claims: $(ls "$COMM"/claims 2>/dev/null | wc -l)"
  echo "- bus msgs: $(ls "$COMM"/bus 2>/dev/null | wc -l)"
  echo "- op_aiven: $op_a/$op_b"
  echo "- /tmp: $(df -h /tmp | tail -1 | awk '{print $5" used "$3"/"$2}')"
  echo "- sessions: $(tmux list-sessions -F '#{session_name}' 2>/dev/null | tr '\n' ' ')"
} > "$ROOT/state/FLEET-PULSE.md"

log "manage ok claims=$(ls "$COMM"/claims 2>/dev/null | wc -l) bus=$(ls "$COMM"/bus 2>/dev/null | wc -l) op=$op_a/$op_b"
