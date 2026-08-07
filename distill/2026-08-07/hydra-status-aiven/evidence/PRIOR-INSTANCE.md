# PRIOR-INSTANCE — non-secret status from dual-auth runners

**Copied:** 2026-08-07T22:38Z  
**Source tree:** `~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/`  
**Lane:** hydra `stack/aiven`  
**Secrets:** none — titles / status only  

---

## Source artifacts (paths)

| Role | Path under dual-auth-runners |
|------|------------------------------|
| Free-tier enroll runbook | `runner-a/AIVEN-INSTANCE.md` |
| Passive HTTP / API boundary | `runner-a/AIVEN-PASSIVE-HTTP.md` |
| Okta/auth doors (do not thrash) | `runner-a/AIVEN-OKTA-AUTH-DOORS.md` |
| Public API door series | `runner-a/AIVEN-API-DOORS-P*.md` |
| BC path recovery | `runner-a/AIVEN-BC-PATH-RECOVERY.md` |
| Shared TF note | `shared/TF-AIVEN.md` |
| L3 checklists | `runner-a/l3/checklist-aiven.md`, `checklist-aiven-r2.md` |

---

## Instance readiness (from AIVEN-INSTANCE.md)

| Fact | Status |
|------|--------|
| Engagement | `aiven-mbb-og` only (`/engagements/aiven` 404) |
| BC join | Done (parent ENROLL) |
| Dual ninja free-tier accounts A/B | **Not created** (human browser gate) |
| Own project/service IDs | **Empty** |
| API tokens in 1Password | **Absent** (suggested titles only: `Aiven BB Account A API`, `Aiven BB Account B API`) |
| Auth header form | `Authorization: aivenv1 <token>` (documented; not exercised with token) |
| Card policy | **No credit card** |
| Email policy | `@bugcrowdninja.com` only; B via `+aiven2` / `+account2` |

**Blocker quote (source):** documentation/join high; instance **blocked on human browser**. No findings claimed.

---

## Passive HTTP boundary (from AIVEN-PASSIVE-HTTP + lane evidence)

| Host/path | Code | Note |
|-----------|------|------|
| `https://console.aiven.io/` | 200 | SPA login shell |
| `https://api.aiven.io/` | 200 | API root |
| `https://api.aiven.io/v1/project` | **401** | Needs client cert / aivenv1 (unauth deny) |
| `https://api.aiven.io/v1/me` | **401** | Lane `evidence/PASSIVE-HTTP.txt` |
| `https://bugcrowd.com/engagements/aiven-mbb-og` | 200 | Engagement live |
| `https://docs.aiven.io/` | 200 | Public docs |

Lane recheck file: `evidence/PASSIVE-HTTP.txt`.

---

## Local session gate (this tick, non-secret)

| Check | Result |
|-------|--------|
| Env vars named AIVEN / TOKEN_ for Aiven | **None set** |
| `op account list` | Signed in (vault reachable) |
| `op item list` titles matching “Aiven” | **Zero items** |
| Authenticated API probe | **Skipped** — no token, fail-closed |

**Conclusion:** No already-authenticated Aiven session available to agents. COMPLETE remains blocked on human free-tier provision under research ninja mail.

---

## Explicit non-actions (this tick)

- No Okta Set5 thrash  
- No CAPTCHA grinding  
- No signup automation  
- No authz IDOR against foreign or unowned hosts  
- No token mint / secret write into distill  

---

## What “instance complete” means (exit criteria for next human tick)

1. Account A ninja signup + free PG (or Kafka) **RUNNING**  
2. Account B ninja signup + free service **RUNNING**  
3. Tokens only under op item titles `Aiven BB Account A API` / `Aiven BB Account B API`  
4. Non-secret `project_id` / `service_id` labels filled in operator notes (not git if sensitive)  
5. Then run `FIRST-5-TESTS.md` with `op run` inject only  
