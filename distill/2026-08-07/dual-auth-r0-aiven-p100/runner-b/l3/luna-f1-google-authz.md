# L3 LUNA — F1 Google VRP authz/IDOR readiness
**pool:** sekhmet-luna · **spark_id:** sp-rb-luna-f1-google · **root:** /run/user/1000/xbrd-spark-luna  
**host_note:** codex reported `code-mode host is disabled` — content host-materialized from dual-pool task + AUTH-READINESS + TinyFish VRP rules fetch.  
**policy:** recon only · no exploit

## Checklist
- [ ] Dual **own** Google accounts only (never other-user data)
- [ ] One product surface with private object IDs (authz/IDOR class)
- [ ] Confirm domain under main VRP: `*.google.com`, `*.youtube.com`, `*.blogger.com`, `*.deepmind.com`, `*.waymo.com`, `*.wing.com`
- [ ] **OOS:** `*.appspot.com` / `*.bc.googleusercontent.com` customer apps; sandbox XSS without sensitive impact
- [ ] Qualifying: authentication/authorization flaws (VRP rules); IDOR ≈ logic/DOR **S2a–S2c** × domain tier
- [ ] Quality multiplier **0.8 / 1.0 / 1.2** — complete repro + impact
- [ ] Submit: https://bughunters.google.com/ (Bug Hunters form)
- [ ] Local scope **FIDELITY: FULL** (`scopes/google-vrp.md`) — re-verify live before test
- [ ] No DoS / high-volume scanners / employee phishing

## Next human
Pick one product; create dual own accounts; policy re-read same day.

Status: done
