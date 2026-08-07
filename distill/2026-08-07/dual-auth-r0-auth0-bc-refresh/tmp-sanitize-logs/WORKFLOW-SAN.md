# WORKFLOW-SAN — tmp sanitize + disk headroom

**Date:** 2026-08-07T14:06:50+00:00  
**ok:** true

## 1) tmp-sanitize-bounty.sh

- Path: `~/.xbgst/scripts/tmp-sanitize-bounty.sh`
- Exit: **0**
- Banner: `=== tmp sanitize 2026-08-07T14:06:50+00:00 ===`
- Pre/post `df -h /tmp` (from script): tmpfs 16G, 222M used, 16G avail, 2%

## 2) Disk headroom

```
Filesystem      Size  Used Avail Use% Mounted on
tmpfs            16G  222M   16G   2% /tmp
```

Runtime dirs (`XDG_RUNTIME_DIR=/run/user/1000`):

| path | size |
|------|------|
| xbrd-spark-luna | 67M |
| xbrd-spark-spark | 48K |

## 3) sekhmet gc

- Binary: `/home/vgpnk1337/.cargo/bin/sekhmet`
- Command: `sekhmet gc --max-age 1`
- Exit: **0**

## Verdict

- Sanitize exit 0: yes  
- `/tmp` free space: yes (~16G avail, 2% use)  
- **ok=true**
