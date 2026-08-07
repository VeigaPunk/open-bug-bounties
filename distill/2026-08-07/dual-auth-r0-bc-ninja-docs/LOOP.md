# Godspeed 119s self-inject loop

**Status:** ACTIVE  
**Interval:** 119 seconds  
**Scheduler task id:** `019fdc95c8c8` (durable)  
**First fire:** immediate on create  

## Inject block (every tick)

Full godspeed 4-rules + no secrets + milestone-ship after APPROVED.

## Tick work

1. Pulse log line → `GODSPEED-PULSE.log`
2. `tmp-sanitize-bounty.sh`
3. One cheap axis move (A or B or shared)
4. Optional dual sekhmet dry health
5. Secret-gate + `milestone-ship.sh` if durable artifacts

## Stop

```text
# only if user cancels
scheduler_delete id=019fdc95c8c8
```

## Ship target

`~/Projects/open-bug-bounties` → `distill/YYYY-MM-DD/<label>/` → `origin main`
