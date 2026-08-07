# Secret scrub — runner-b

**UTC:** 2026-08-07  
**Policy:** fail closed on live secrets; allow intentional `op://` labels and the word password in policy prose.

## Commands (executed)

```sh
rg -n 'AKIA[0-9A-Z]{16}|sk-[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{20,}|xox[baprs]-' runner-b/ || true
rg -n 'password=|api_key=|secret=|Bearer [A-Za-z0-9._-]{20,}|cookie:' runner-b/ || true
rg -n 'op://' runner-b/ || true
```

## Result

- Cloud key / sk- / ghp_ / slack token patterns: **none**
- `password=` / `Bearer …` assignment dumps: **none**
- `op://` refs: only inventory-style paths (no expanded secrets)
- No `.env` files under runner-b

Status: **clean**
