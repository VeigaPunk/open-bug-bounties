#!/usr/bin/env bash
# the-revenger route: kimi-k3 HIGH via codex-fnm-instance (fnm multishell)
# Usage: xask-kimi-revenger.sh 'RECON / surface map…'
set -euo pipefail
id="gx-revenger-$$"
if [[ $# -gt 0 ]]; then
  exec "$HOME/.xbgst/scripts/codex-kimi-effort.sh" high --id "$id" -- "$@"
else
  exec "$HOME/.xbgst/scripts/codex-kimi-effort.sh" high --id "$id"
fi
