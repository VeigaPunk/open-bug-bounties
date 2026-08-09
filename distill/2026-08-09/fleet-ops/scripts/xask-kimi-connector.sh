#!/usr/bin/env bash
# Connector route: kimi-k3 LOW via codex-fnm-instance (fnm multishell)
# Usage: xask-kimi-connector.sh 'cross-axis pattern question…'
#        echo '…' | xask-kimi-connector.sh
set -euo pipefail
id="gx-connector-$$"
if [[ $# -gt 0 ]]; then
  exec "$HOME/.xbgst/scripts/codex-kimi-effort.sh" low --id "$id" -- "$@"
else
  exec "$HOME/.xbgst/scripts/codex-kimi-effort.sh" low --id "$id"
fi
