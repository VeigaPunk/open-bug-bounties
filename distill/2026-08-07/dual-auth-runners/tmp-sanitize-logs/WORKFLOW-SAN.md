# WORKFLOW-SAN — tmp sanitize + disk headroom

**When:** 2026-08-07T22:34:27+00:00  
**Operator:** labrat (godspeed)

## 1) tmp-sanitize-bounty.sh

- **Command:** `~/.xbgst/scripts/tmp-sanitize-bounty.sh`
- **Exit:** `0`
- **Script banner:** `=== tmp sanitize 2026-08-07T22:34:27+00:00 ===`
- **Log artifact:** `tmp-sanitize-logs/20260807T223427Z.log` (script-side)

## 2) Disk headroom

### /tmp

```
Filesystem      Size  Used Avail Use% Mounted on
tmpfs            16G  109M   16G   1% /tmp
```

- Free space: **~16G available** (1% used) — OK

### Root / run

```
/dev/nvme1n1p2  930G  119G  810G  13% /
run              16G  2.0M   16G   1% /run
```

### XDG_RUNTIME_DIR spark namespaces

- `XDG_RUNTIME_DIR=/run/user/1000`
- `du -sh …/xbrd-spark-luna` → **0** (empty / absent content)
- `du -sh …/xbrd-spark-spark` → **0** (empty / absent content)

### Memory (context)

- Mem available ~21Gi; swap 0 used

## 3) sekhmet gc

- **Binary:** `/home/vgpnk1337/.cargo/bin/sekhmet`
- **Command:** `sekhmet gc --max-age 1` (hours; CLI default root `XBRD_SPARK_ROOT=/run/user/1000/xbrd-spark`)
- **Exit:** `0`
- **Stdout:** empty (no namespaces aged out / nothing to report)

## Verdict

| Check | Result |
|-------|--------|
| sanitize exit 0 | yes |
| /tmp free space | yes (~16G avail) |
| **ok** | **true** |
