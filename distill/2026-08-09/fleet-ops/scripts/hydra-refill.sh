#!/usr/bin/env bash
# 1 completed -> fetch 2 new from queue into hydra lanes
# Soft COMPLETE-GATE: refuse refill without checklist + non-empty evidence.
set -euo pipefail
HYDRA="${HOME}/.xbgst/hydra-bounty"
LOG="${HYDRA}/tracker/REFILL.log"
GATE="${HYDRA}/tracker/COMPLETE-GATE.md"
QUEUE=(proton atlassian msrc shopify-h1 dropbox-inti okta openai aiven auth0 google-vrp)
mkdir -p "${HYDRA}/tracker" "${HYDRA}/lanes/stack" "${HYDRA}/lanes/wrap" "${HYDRA}/lanes/grok"
echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) REFILL after complete: $*" >> "$LOG"

# --- soft COMPLETE-GATE (no fake COMPLETE cascade) ---
# Require tracker checklist AND lane evidence (FIRST-5-RESULTS.md or EVIDENCE.md non-empty).
# Soft: exit 0 so existing callers / cron do not hard-fail.
lane_has_evidence() {
  local base="$1"
  [[ -n "$base" && -d "$base" ]] || return 1
  local f
  for f in \
    FIRST-5-RESULTS.md EVIDENCE.md \
    evidence/FIRST-5-RESULTS.md evidence/EVIDENCE.md \
    FIRST-5-RESULTS.md; do
    [[ -s "${base}/${f}" ]] && return 0
  done
  return 1
}

if [[ ! -s "$GATE" ]]; then
  msg="SOFT-GATE refuse: missing or empty ${GATE}"
  echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) ${msg}" >> "$LOG"
  echo "refill blocked: ${msg}"
  exit 0
fi

evidence_ok=0
if [[ $# -gt 0 ]]; then
  for arg in "$@"; do
    # accept absolute path, lanes/stack/foo, stack/foo, or bare program name under any lane style
    if lane_has_evidence "$arg"; then evidence_ok=1; continue; fi
    if lane_has_evidence "${HYDRA}/lanes/${arg}"; then evidence_ok=1; continue; fi
    for style in stack wrap grok; do
      if lane_has_evidence "${HYDRA}/lanes/${style}/${arg}"; then evidence_ok=1; break; fi
    done
  done
  if [[ "$evidence_ok" -eq 0 ]]; then
    msg="SOFT-GATE refuse: no non-empty FIRST-5-RESULTS.md or EVIDENCE.md for args: $*"
    echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) ${msg}" >> "$LOG"
    echo "refill blocked: ${msg}"
    exit 0
  fi
else
  # no lane args: require at least one STATUS COMPLETE lane with evidence
  for lane in stack/aiven wrap/auth0 grok/google-vrp; do
    s="${HYDRA}/lanes/${lane}/STATUS.md"
    if [[ -f "$s" ]] && rg -q '^\*\*State:\*\*[[:space:]]*COMPLETE\b|^State:[[:space:]]*COMPLETE\b' "$s" 2>/dev/null; then
      if lane_has_evidence "${HYDRA}/lanes/${lane}"; then
        evidence_ok=1
      else
        msg="SOFT-GATE refuse: COMPLETE without evidence under lanes/${lane}"
        echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) ${msg}" >> "$LOG"
        echo "refill blocked: ${msg}"
        exit 0
      fi
    fi
  done
  # also scan any other lane STATUS under stack|wrap|grok
  if [[ "$evidence_ok" -eq 0 ]]; then
    while IFS= read -r s; do
      [[ -f "$s" ]] || continue
      rg -q '^\*\*State:\*\*[[:space:]]*COMPLETE\b|^State:[[:space:]]*COMPLETE\b' "$s" 2>/dev/null || continue
      d=$(dirname "$s")
      if lane_has_evidence "$d"; then evidence_ok=1; else
        msg="SOFT-GATE refuse: COMPLETE without evidence under ${d}"
        echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) ${msg}" >> "$LOG"
        echo "refill blocked: ${msg}"
        exit 0
      fi
    done < <(find "${HYDRA}/lanes" -mindepth 3 -maxdepth 3 -type f -name STATUS.md 2>/dev/null || true)
  fi
  if [[ "$evidence_ok" -eq 0 ]]; then
    msg="SOFT-GATE refuse: no COMPLETE lane with evidence (and no lane args)"
    echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) ${msg}" >> "$LOG"
    echo "refill blocked: ${msg}"
    exit 0
  fi
fi
echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) SOFT-GATE pass (COMPLETE-GATE + evidence)" >> "$LOG"
# --- end soft gate ---

# pick 2 not already present as lane dirs
n=0
for b in "${QUEUE[@]}"; do
  if [ -d "${HYDRA}/lanes/stack/${b}" ] || [ -d "${HYDRA}/lanes/wrap/${b}" ] || [ -d "${HYDRA}/lanes/grok/${b}" ]; then
    continue
  fi
  # assign to free lane style rotating
  case $((n % 3)) in
    0) lane=stack; orch=xbgst-stack; sekhmet=luna-a ;;
    1) lane=wrap; orch=workflow-wrap; sekhmet=luna-b ;;
    2) lane=grok; orch=xbgst-grok; sekhmet=luna-c ;;
  esac
  dest="${HYDRA}/lanes/${lane}/${b}"
  mkdir -p "$dest/l3" "${HYDRA}/lanes/${lane}/fertile"
  touch "${HYDRA}/lanes/${lane}/fertile/TOUCH"
  cat > "$dest/TASK.md" <<TASK
# TASK — hydra refill ${b}
- Lane: ${lane} (${orch})
- Sekhmet: ${sekhmet}
- Program: ${b}
- Produce REPORT.md + FIRST-5-TESTS.md + SCOPE notes
- Own assets only; no secrets; COMPLETE only with evidence
TASK
  echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) spawned ${lane}/${b}" >> "$LOG"
  n=$((n+1))
  [ "$n" -ge 2 ] && break
done
echo "refilled $n new teams"
