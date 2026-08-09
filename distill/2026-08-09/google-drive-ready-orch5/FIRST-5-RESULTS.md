# FIRST-5-RESULTS — Google VRP Drive (grok) — SCAFFOLD ONLY

**UTC stamp:** 2026-08-09T01:36:00Z  
**Owner orch:** orch-5 · **Assist:** orch-6  
**State:** NOT EXECUTED — fill only after dual research Google sessions exist  
**Policy:** own assets only. Redact `fileId`/URLs. No cookies/tokens. **MAP ≠ COMPLETE.**

| # | Test | Account roles | HTTP / result | Evidence path | Notes |
|---|------|---------------|---------------|---------------|-------|
| T1 | Unshared private file direct-object | A owner / B peer | | | blocked: dual session |
| T2 | Share-then-revoke residual | A→B viewer then revoke | | | |
| T3 | Link downgrade / stale-link | A link→restricted | | | |
| T4 | Viewer self-elevate / reshare | B viewer only | | | |
| T5 | Folder/file ACL mismatch | F + child D | | | |

## Gate (all required before COMPLETE proposal)

- [ ] Two research Google sessions usable (separated browser profiles)
- [ ] Operator confirms A/B ready in `AB-READINESS.md`
- [ ] Rows above have real status codes + redacted IDs
- [ ] `evidence/OWN-ASSET.md` lists only research-owned docs (no secrets)
- [ ] Secret gate clean on lane tree
- [ ] Distiller/sentinel may flip COMPLETE only per `tracker/COMPLETE-GATE.md` H3

## Negative path

If dual Google never opens: use `NEGATIVE-CLOSE.md` — stay **MAPPED/PARTIAL**, never COMPLETE for money path.

**Do not** set STATUS to COMPLETE from this scaffold alone.
