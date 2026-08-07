# Runner A lane — Q-BC auth chain

**Queue:** Aiven → Identity-day (Auth0+Okta) → Atlassian → OpenAI (security-impact).  
**Artifacts:** `AUTH-READINESS.md`, `OKTA-MAP.md`, `SEKHMET.md`, `l3/*`, `REPORT.md`.  
**Substrate:** both sekhmet-luna and sekhmet-spark (spark model may fallback).  
**Safety:** policy recon + enroll readiness; no live third-party exploit automation.

## Godspeed inject + ship (mandatory)

Every spawn/prompt must include full godspeed inject (`~/.xbgst/rules/godspeed-inject-ship.md`).
After each APPROVED milestone: `~/.xbgst/scripts/milestone-ship.sh --label <slug> --src <dir> --msg '...'` → commit + push `origin main`.
