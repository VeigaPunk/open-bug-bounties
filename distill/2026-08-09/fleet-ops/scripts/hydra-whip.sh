#!/usr/bin/env bash
# hydra-whip: smart 119s progress check. No CAPTCHA thrash. No fake COMPLETE.
set -euo pipefail
HYDRA="${HOME}/.xbgst/hydra-bounty"
LOG="${HYDRA}/logs/WHIP.log"
mkdir -p "${HYDRA}/logs"
ts=$(date -u +%Y-%m-%dT%H:%M:%SZ)
stamp() { echo "$ts $*"; }
# Strict: State COMPLETE only — must NOT match "not COMPLETE" / "PARTIAL"
is_complete() {
  local s="$1"
  [[ -f "$s" ]] || return 1
  rg -q '^\*\*State:\*\*[[:space:]]*COMPLETE\b|^State:[[:space:]]*COMPLETE\b' "$s" 2>/dev/null
}
{
  fresh=()
  missing=()
  for lane in stack/aiven wrap/auth0 grok/google-vrp; do
    r="${HYDRA}/lanes/${lane}/REPORT.md"
    if [[ ! -s "$r" ]]; then missing+=("$lane"); continue; fi
    age=$(( $(date +%s) - $(stat -c %Y "$r") ))
    if (( age < 300 )); then fresh+=("$lane"); fi
  done
  f="${fresh[*]:-NONE}"; f=${f// /,}
  m="${missing[*]:-NONE}"; m=${m// /,}
  stamp "fresh_REPORT_lt5m=${f} missing_or_empty=${m}"

  complete=0
  complete_lanes=()
  for lane in stack/aiven wrap/auth0 grok/google-vrp; do
    s="${HYDRA}/lanes/${lane}/STATUS.md"
    if is_complete "$s"; then
      complete=1
      complete_lanes+=("$lane")
    fi
  done
  cl="${complete_lanes[*]:-NONE}"; cl=${cl// /,}

  hydra_ok=no
  tmux has-session -t hydra 2>/dev/null && hydra_ok=ok
  sekhmet=dead
  tmux has-session -t sekhmet 2>/dev/null && sekhmet=session_ok
  for w in sekhmet-a sekhmet-b sekhmet-c; do
    tmux list-windows -t hydra -F '#{window_name}' 2>/dev/null | grep -qx "$w" && sekhmet=abc_alive
  done

  bash "${HOME}/.xbgst/scripts/hydra-pruner.sh" >/dev/null 2>&1 || true

  op_a=no; op_b=no
  op item get "Aiven BB Account A API" --fields label=username 2>/dev/null >/dev/null && op_a=yes || true
  op item get "Aiven BB Account B API" --fields label=username 2>/dev/null >/dev/null && op_b=yes || true

  actions=()
  if [[ "$m" != "NONE" ]]; then actions+=("missing_reports"); fi
  if [[ "$op_a" == "yes" && "$op_b" == "yes" ]]; then
    actions+=("aiven_tokens_ready")
    if rg -q 'BLOCKED|free-tier|PARTIAL' "${HYDRA}/lanes/stack/aiven/STATUS.md" 2>/dev/null; then
      actions+=("aiven_status_flip_needed")
    fi
  fi
  if [[ "$complete" -eq 1 ]]; then
    actions+=("complete_detected:${cl}")
  fi

  if [[ ${#actions[@]} -eq 0 ]]; then
    stamp "whip end fresh=${f} no_missing complete=0 no_spawn no_refill no_ship hydra_${hydra_ok} sekhmet_${sekhmet} no_triple_dryrun op_aivenA=${op_a} op_aivenB=${op_b}"
  else
    stamp "whip end actions=${actions[*]} fresh=${f} complete=${complete} complete_lanes=${cl} hydra_${hydra_ok} sekhmet_${sekhmet} op_aivenA=${op_a} op_aivenB=${op_b}"
  fi
} >>"$LOG" 2>&1
