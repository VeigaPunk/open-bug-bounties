# Operator card — Drive T1–T5 (orch-5)

**UTC:** 2026-08-09T01:36:00Z  
**Use when:** dual Google sessions ready · separated profiles · low volume  

## Preflight (2 min)

1. Profiles: **A-owner** and **B-peer** only — no shared cookies.  
2. DevTools → Network on both.  
3. Re-open live VRP rules (bookmark in SCOPE-NOTES).  
4. Create under **A only**: private Doc `bb-t1`, Folder `bb-f` + child Doc `bb-d`.  
5. Record redacted fileIds in local operator notes (not git if sensitive).

## T1 — Private direct object (5 min)

- B opens Docs URL + Drive preview for `bb-t1` fileId.  
- **Pass:** deny / request access; no body.  
- Log status class → FIRST-5-RESULTS T1.

## T2 — Share then revoke (5 min)

- A shares Viewer to B → B opens → A removes → B retries URL + recent + export if any.  
- Immediate + ~60s recheck.  
- **Pass:** consistent deny.

## T3 — Stale link (5 min)

- A: Anyone-with-link Viewer → B uses link → A: Restricted → B retries old link.  
- **Pass:** stale fails.

## T4 — Viewer elevation (5 min)

- A: B as Viewer. B tries Share / role change / link widen via UI only (one-off).  
- **Pass:** cannot mutate ACL.

## T5 — Folder/file ACL (5 min)

- Share folder vs child variants per FIRST-5-TESTS.  
- **Pass:** no over-reach to siblings/parent.

## Abort

- Non-owned data appears → stop.  
- High volume / automation urge → stop.  
- appspot customer surfaces → OOS stop.

## After anomaly

1. Fill RESULTS row + `evidence/` redacted status only.  
2. Stub REPORT finding (title, steps, expected vs actual, IT1/IT2/IA).  
3. Do **not** COMPLETE until COMPLETE-GATE E1–E8 + dual-session evidence.
