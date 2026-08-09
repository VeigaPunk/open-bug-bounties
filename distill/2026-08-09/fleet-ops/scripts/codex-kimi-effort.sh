#!/usr/bin/env bash
# codex-kimi-effort — kimi-k3 via codex-fnm-instance (fnm multishell) + effort
# Usage:
#   codex-kimi-effort.sh low  'prompt…'
#   codex-kimi-effort.sh high 'prompt…'
#   codex-kimi-effort.sh low --keep --id gx-connector-r1 -- 'prompt…'
# Always appends | godspeed if missing.
set -euo pipefail
export PATH="${HOME}/.local/bin:${HOME}/.cargo/bin:${HOME}/.xbgst/scripts:${PATH}"

effort="${1:?effort required: low|medium|high}"
shift
case "$effort" in
  low|medium|high) ;;
  *) echo "effort must be low|medium|high" >&2; exit 2 ;;
esac

keep_args=()
id_args=()
while [[ $# -gt 0 ]]; do
  case "$1" in
    --keep) keep_args+=(--keep); shift ;;
    --id) id_args+=(--id "$2"); shift 2 ;;
    --) shift; break ;;
    -*) echo "unknown flag: $1" >&2; exit 2 ;;
    *) break ;;
  esac
done

prompt="${*:-}"
if [[ -z "$prompt" ]]; then
  if [[ ! -t 0 ]]; then
    prompt="$(cat)"
  else
    echo "usage: codex-kimi-effort.sh <low|medium|high> [--id NAME] [--keep] 'prompt'" >&2
    exit 2
  fi
fi

# append | godspeed (idempotent)
p="$(printf '%s' "$prompt" | sed 's/[[:space:]]*$//')"
if ! printf '%s' "$p" | grep -Eqi '\|[[:space:]]*godspeed[[:space:]]*$'; then
  p="${p} | godspeed"
fi

exec "$HOME/.xbgst/scripts/codex-fnm-instance.sh" kimi \
  "${id_args[@]}" \
  "${keep_args[@]}" \
  -- exec \
  -m kimi-k3 \
  -c "model_reasoning_effort=${effort}" \
  --ephemeral \
  --skip-git-repo-check \
  --color never \
  --sandbox danger-full-access \
  -c approval_policy=never \
  "$p"
