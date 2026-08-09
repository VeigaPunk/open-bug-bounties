# DOOR-OPEN-RECOVERY — Aiven (when human door flips)

**Owner:** orch-1 (`aiven-overfit`) · assist orch-3 (`aiven-assist`)  
**Trigger:** op titles `Aiven BB Account A API` **and** `B API` exist (titles only pulse)  
  **OR** human marks NEXT-TICK pack A+B done.

## Immediate sequence (no thrash)

1. **Pulse titles only**  
   `op item list | rg 'Aiven BB Account'` — expect both titles. Never print field values.

2. **Sanity list projects (inject via the-janitor / op run)**  
   Expect HTTP **200** per account; only own projects.  
   ```bash
   # template — resolve field labels locally; never log token
   the-janitor run -- op run -- curl -sS -o /tmp/aiven-a-proj.json -w '%{http_code}\n' \
     -H "Authorization: aivenv1 $TOKEN_A" https://api.aiven.io/v1/project
   ```

3. **Fill evidence/OWN-ASSET.md** with non-secret project_id / service_id only.

4. **Execute FIRST-5-TESTS.md** GET-first; fill both:
   - `FIRST-5-RESULTS.md`
   - `evidence/FIRST-5-RESULTS.md`

5. **Secret gate** before any ship:  
   `rg -n 'sk-|AKIA|password=|BEGIN (RSA |OPENSSH )?PRIVATE|ghp_|xox[baprs]-' "$LANE" || true`

6. **COMPLETE only** after COMPLETE-GATE.md checklist all PASS + distiller/sentinel line.  
   MAP ≠ COMPLETE. Never invent COMPLETE.

## Fail-closed

- Single account only → stay PARTIAL  
- CF / CAPTCHA → human only; stop loops  
- No op titles → passive map only  

## Notify fleet

Bus-post + BOARD note when gate_factor Aiven → 1. DM orch-3 to run dual matrix; orch-4 complete-gate-watch.
