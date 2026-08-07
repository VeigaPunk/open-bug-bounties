# Hydra pruner STATUS

**UTC:** 2026-08-07T22:34:30+00:00  
**Role:** HYDRA PRUNER + WILDFIRE PROPAGATOR  
**Host:** vgpnk1337 · `XDG_RUNTIME_DIR=/run/user/1000`

## 1. Triple pruner runs (5s gaps)

| # | log | result |
|---|-----|--------|
| 1 | `20260807T223403Z.log` | done |
| 2 | `20260807T223408Z.log` | done |
| 3 | `20260807T223413Z.log` | done |

Pruner actions: `/tmp` stale file/dir GC; ensure `xbrd-spark-luna-{a,b,c}` roots; `sekhmet gc --max-age 1`; lane fertile `TOUCH` refresh.

## 2. Triple luna roots

| root | exists |
|------|--------|
| `/run/user/1000/xbrd-spark-luna-a` | yes |
| `/run/user/1000/xbrd-spark-luna-b` | yes |
| `/run/user/1000/xbrd-spark-luna-c` | yes |

## 3. sekhmet-luna dry-run (once each)

Scripts: `~/.xbgst/scripts/sekhmet-luna-{a,b,c}.sh`

- `bash -n` OK for a/b/c
- No-arg invoke → sources `env.l3-sekhmet.sh`, sets model `gpt-5.6-luna`, fallback `gpt-5.3-codex-spark`, `service_tier=fast`, `XBRD_SPARK_JOBS=64`, `XBRD_SPARK_ROOT=…/xbrd-spark-luna-{a,b,c}`, `exec sekhmet` → help printed (exit 0 path via sekhmet CLI usage)
- Explicit GC pass: `sekhmet gc --max-age 1` against each luna root (last GC signal)

## 4. Fertile markers (wildfire)

Touched under `~/.xbgst/hydra-bounty/lanes/{stack,wrap,grok}/fertile/`:

- `marker-20260807T223422Z` (zero-byte stamp)
- `TOUCH` (pruner refreshes with `ok <unix>`)

## 5. Disk / inode / last GC

### df -h

```
Filesystem      Size  Used Avail Use% Mounted on
/dev/nvme1n1p2  930G  119G  810G  13% /
tmpfs            16G  109M   16G   1% /tmp
/dev/nvme1n1p2  930G  119G  810G  13% /home
tmpfs           3.1G  2.8M  3.1G   1% /run/user/1000
```

### df -i

```
Filesystem      Inodes IUsed   IFree IUse% Mounted on
/dev/nvme1n1p2       0     0       0     - /          # btrfs-style, no inode accounting
tmpfs          1048576   551 1048025    1% /tmp
/dev/nvme1n1p2       0     0       0     - /home
tmpfs           804317   375  803942    1% /run/user/1000
```

### Last GC

- **Pruner last triple:** 2026-08-07T22:34:03 / 08 / 13 UTC (`~/.xbgst/hydra-bounty/pruner/*.log`)
- **In-pruner GC:** `sekhmet gc --max-age 1` (default root from env; max-age 1h)
- **Post-verify GC:** `sekhmet gc --max-age 1` with `XBRD_SPARK_ROOT` set to each luna root a/b/c at ~22:34:30Z
- Luna roots currently empty (no aged namespaces to delete)

## 6. agent-wall (present)

**Path:** `~/.local/share/agent-wall/`  
**State:** `state.json` → `{"x":0,"y":0,"w":0,"h":0}` (window geometry placeholder)

### What it is

- Cargo crate / release binary name for **plazir18** (multi-panel agent terminal wall: up to 18 tmux session tiles, 6×3).
- Product CLI install name is **`plazir18`**, not `agent-wall`.
- Data dir under XDG share stores UI geometry only.

### How to use

```bash
# build + install product command
git clone https://github.com/VeigaPunk/plazir18.git
cd plazir18
cargo build --release --locked
install -Dm755 target/release/agent-wall ~/.local/bin/plazir18

# launch (requires tmux sessions; Omarchy/UWSM)
uwsm-app -- plazir18
# or
plazir18
plazir18 --strip          # legacy strip
plazir18 --toggle         # show/hide
plazir18 --tui            # ratatui grid
plazir18 --status-json    # Waybar
```

**Constraints:** panels only for live **tmux** sessions (`capture-pane`). Not an L3 install target / not `agent-wall@ds4cc` plugin. Hydra pruner does not GC this dir.

## 7. Axes

| axis | move |
|------|------|
| capacity | triple luna roots ready; fertile markers on stack/wrap/grok |
| hygiene | 3× pruner + sekhmet gc |
| evidence | this STATUS + pruner logs |
| secrets | none written |

## APPROVED

Triple pruner + triple luna + dry-run luna wrappers + fertile touch + STATUS — ship substrate.
