# Orch peer communication (xbgst fleet)

**Root:** `~/.xbgst/xbgst-orch/comm/`  
**Rule:** after you engage a task, you **must** write a claim + bus message so peers coordinate. No silent parallel thrash.

## Files

| Path | Purpose |
|------|---------|
| `BOARD.md` | live claims table (who owns what) |
| `bus/YYYYMMDD-HHMMSS-orch-N.md` | append-only task engagement reports |
| `inbox/orch-N.md` | peer messages **to** you (read every tick) |
| `outbox/orch-N.md` | your outbound drafts (optional) |
| `claims/<slug>.md` | exclusive lock for a work item |

## Engage protocol (mandatory)

1. **Read** `BOARD.md` + your `inbox/orch-N.md` + last 5 files in `bus/`.
2. **Claim** before deep work: write `claims/<slug>.md` with owner=orch-N, task, started UTC.  
   If claim exists and not stale (>30m), **do not steal** — pick another task or assist.
3. **Update BOARD.md** row for your claim (status: active|blocked|done).
4. **Work** under hydra posture (see HYDRA-POSTURE.md).
5. **After engage / each meaningful progress:** write `bus/<utc>-orch-N.md` with:
   - task, claim slug, status, evidence paths, ask-for-help (optional orch ids)
6. **DM peer:** append to `inbox/orch-K.md` if you need orch-K (format below).
7. **Release claim** when done or blocked-human: status=done|blocked in claim file + BOARD.

### Inbox message format

```markdown
## from orch-N @ UTC
**re:** <claim-slug>
**need:** <one line>
**context:** <paths>
```

### Claim file format

```markdown
# claim <slug>
owner: orch-N
task: <one line>
status: active|blocked|done
started: UTC
updated: UTC
evidence: <paths or none>
```

## Anti-collision
- One owner per claim slug.
- OVERFIT Aiven primary: orch-1,3 own stack/aiven deep; others assist only via claim `aiven-assist`.
- Auth0 wrap: orch-2,4 primary.
- Google grok: orch-5,6 primary.
- Catalog/hygiene/refill-prep: orch-7,8.
- Never CAPTCHA thrash. Never fake COMPLETE.
