# NEXT-TICK — free-tier Aiven under research account

**UTC:** 2026-08-07T22:38Z  
**Lane:** `~/.xbgst/hydra-bounty/lanes/stack/aiven/`  
**Mode:** human browser provision · own-asset only · no secrets in this file  
**Vault refs:** item **titles only** (create if missing) — never paste tokens here  

Suggested 1Password titles:

- `Aiven BB Account A API`
- `Aiven BB Account B API`
- Optional note field on each: non-secret `project_id`, `service_id`, cloud, plan  

---

## Axes

- `bounty_complete↑` only after dual free services + FIRST-5 evidence  
- `auth_ready↑` after op titles hold tokens  
- `safety_in_policy↑` — ninja only, no CC, no thrash Okta/CAPTCHA  

---

## Preflight (confirm before clicks)

1. BC session live; engagement **joined** `aiven-mbb-og`.  
2. Primary mailbox receives `@bugcrowdninja.com` (login BC; wait ≤10 min if lag).  
3. Fresh profile or clean window for Account B (no shared cookies with A).  
4. **Do not** open paid upgrade with a card.  
5. **Do not** thrash Okta Set5, Auth0 researcher host spam, or CAPTCHA farms.  

---

## Step pack A — Account A free tier

| # | Action | Done? |
|---|--------|-------|
| A1 | Sign into Bugcrowd (refresh ninja alias). | [ ] |
| A2 | Open https://console.aiven.io/signup | [ ] |
| A3 | Register with **primary** `…@bugcrowdninja.com` only. | [ ] |
| A4 | Verify email via ninja forward → primary inbox. | [ ] |
| A5 | Dismiss paid upsell; remain free / trial credits. | [ ] |
| A6 | Create project name e.g. `bb-a-<handle>-free` (no secrets). | [ ] |
| A7 | **Create service:** PostgreSQL free-eligible plan (primary). Optional second: Kafka free. | [ ] |
| A8 | Wait until service status **RUNNING**. | [ ] |
| A9 | Record **non-secret** labels only: project name/id, service name/id, cloud, plan → op note or local operator note. | [ ] |
| A10 | Console → Authentication / API tokens → create least-privilege read token. | [ ] |
| A11 | Store token in 1Password title **`Aiven BB Account A API`** (password/API field). URL `https://api.aiven.io/`. | [ ] |
| A12 | Sanity (local only, no log of token): `op run --env-file=<(echo 'AIVEN_TOKEN=op://…/Aiven BB Account A API/…') -- curl -sS -o /dev/null -w '%{http_code}\n' -H "Authorization: aivenv1 $AIVEN_TOKEN" https://api.aiven.io/v1/project` → expect **200**. | [ ] |

---

## Step pack B — Account B free tier (dual-account IDOR class)

| # | Action | Done? |
|---|--------|-------|
| B1 | Logout or new browser profile. | [ ] |
| B2 | Signup with `…+aiven2@bugcrowdninja.com` (or `…+account2@…` per brief). | [ ] |
| B3 | Verify email; free tier only. | [ ] |
| B4 | Project e.g. `bb-b-<handle>-free` + free PG (or small free service). | [ ] |
| B5 | Status **RUNNING**; non-secret IDs in op notes for B. | [ ] |
| B6 | Separate token → 1Password title **`Aiven BB Account B API`**. | [ ] |
| B7 | Sanity list projects with B token → **200**, only B projects. | [ ] |

---

## Step pack C — gates → tests (only after A+B green)

| # | Action | Done? |
|---|--------|-------|
| C1 | Flip OWN-ASSET.md G3–G7 to PASS with evidence pointers (paths, not secrets). | [ ] |
| C2 | Execute `FIRST-5-TESTS.md` Tests 1–5 with `op run` inject; GET-first. | [ ] |
| C3 | Fill evidence table per test (status codes; redact bodies). | [ ] |
| C4 | File BC report **only** if impact proven on own assets. | [ ] |
| C5 | Update REPORT.md → COMPLETE only with linked evidence files. | [ ] |

---

## Fail-closed (agent / automation)

If any of the following: **stop active probes**.

- No op item titled `Aiven BB Account A API` / `B`  
- Unauth `/v1/project` still the only path available  
- Temptation to use non-ninja email or customer host  
- Okta / CAPTCHA friction → human only; do not loop  

Passive-only allowed without tokens: re-read scope, map doors already in distill, keep checklists.

---

## Concrete shell after tokens exist (template — no secrets)

```bash
# Resolve refs with `op item get "Aiven BB Account A API" --fields label=…` locally;
# inject via op run — never echo token.

op run -- curl -sS -H "Authorization: aivenv1 $TOKEN_A" \
  https://api.aiven.io/v1/project | jq 'keys'

# Then FIRST-5-TESTS.md Test 2+ with PROJECT_A from authenticated list only.
```

---

## Done definition for this lane

**COMPLETE** requires:

1. Dual owned free services RUNNING  
2. Tokens only in the two op titles above  
3. FIRST-5 evidence rows with HTTP codes  
4. No secret material under `lanes/stack/aiven/`  

Until then status stays **PARTIAL — blocked free-tier human signup**.  
