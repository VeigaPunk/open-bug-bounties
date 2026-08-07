# REPORT — hydra lane stack / Aiven

**UTC:** 2026-08-07 (tick 22:38Z status refresh)  
**Program:** https://bugcrowd.com/engagements/aiven-mbb-og  
**Lane OUT:** `/home/vgpnk1337/.xbgst/hydra-bounty/lanes/stack/aiven`

## Status: PARTIAL — **not COMPLETE**

Axes: bounty_complete→ (still blocked) · evidence_fidelity↑ (prior-instance + passive gates) · safety_in_policy↑ (own-only, no Okta thrash, no secrets)

Mapped scope, tests, OWN-ASSET gates, and dual-auth prior notes are durable. **No dual free-tier projects, no API tokens in vault, no FIRST-5 evidence.**

### What still blocks COMPLETE

| Blocker | Gate | Evidence |
|---------|------|----------|
| No ninja console Account A | OWN-ASSET G3/G5 | Checkbox open; human signup |
| No free PG/Kafka RUNNING under A | G4/G5 | No project/service IDs recorded |
| No Account B dual-owner | G7 | Required for IDOR class |
| No tokens in 1Password | G6 | `op item list` titles matching Aiven = **0** (2026-08-07T22:38Z) |
| No env session for agents | local gate | No `AIVEN_*` env; fail-closed skip of auth probes |
| FIRST-5-TESTS not executed | tests | Preflight checkboxes open |

**FAIL-CLOSED:** authz IDOR / Titanium thrash **forbidden** until G3–G7 green. Do **not** thrash Okta Set5 or CAPTCHA.

**COMPLETE requires:** dual owned free services RUNNING + op titles `Aiven BB Account A API` / `Aiven BB Account B API` + FIRST-5 evidence rows + no secrets under this tree.

## Deliverables

| Artifact | Path |
|----------|------|
| SCOPE.md | …/aiven/SCOPE.md |
| ATTACK-SURFACE.md | …/aiven/ATTACK-SURFACE.md |
| FIRST-5-TESTS.md | …/aiven/FIRST-5-TESTS.md |
| OWN-ASSET.md | …/aiven/OWN-ASSET.md |
| DRAFT-REPORT.md | …/aiven/DRAFT-REPORT.md |
| NEXT-TICK.md | …/aiven/NEXT-TICK.md |
| PRIOR-INSTANCE.md | …/aiven/evidence/PRIOR-INSTANCE.md |
| PASSIVE-HTTP.txt | …/aiven/evidence/PASSIVE-HTTP.txt |
| L3 checklists | …/aiven/l3/01–04-*.md |
| Swarm NDJSON | …/aiven/l3/swarm-ndjson.jsonl |

## Evidence (live, unauth)

- `GET https://api.aiven.io/v1/project` → **401**  
  `{"errors":[{"message":"No valid client certificate presented","status":401}],…}`
- `GET …/v1/me` → **401** (`evidence/PASSIVE-HTTP.txt`)
- Console `https://console.aiven.io/` → 200 CF SPA
- Free tier (docs/brief): Kafka, MySQL, OpenSearch, PostgreSQL, Valkey — **no CC**
- Dual-auth rollup: `evidence/PRIOR-INSTANCE.md` (from `dual-auth-runners/runner-a/AIVEN-INSTANCE.md` + passive doors)

## Blocker (detail)

**Free-tier console signup with @bugcrowdninja.com mailbox not completed.**  
No already-authenticated local Aiven session for agents.  
Per playbook FAIL-CLOSED: no authenticated authz IDOR probes until OWN projects A/B exist.

Concrete human steps: **`NEXT-TICK.md`** (step packs A/B/C). Vault: create items by **title only** — never write tokens into lane files.

## Sekhmet

```
sekhmet-luna-a.sh swarm -f tasks/swarm-lines.txt -j 4 --timeout 120 --no-keep --scope OUT
```
Exit 0; 4 CollectRecords in `l3/swarm-ndjson.jsonl` (namespaces GC’d; durable checklists materialised host-side).  
Further L3 active authz swarm: **deferred** until free-tier tokens exist.

## Tracker recommendation

Mark H1 Aiven row: **mapped + blocked free-tier signup** (not complete bounty).

## Next (human)

1. Follow `NEXT-TICK.md` step pack A then B (ninja → free PG → op titles)  
2. Sanity `op run` list projects (200)  
3. Execute `FIRST-5-TESTS.md`  
4. File BC report only with real own-asset evidence  
5. Only then flip REPORT → COMPLETE  
