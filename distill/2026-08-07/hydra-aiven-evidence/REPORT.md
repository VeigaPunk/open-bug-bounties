# REPORT — hydra lane stack / Aiven

**UTC:** 2026-08-07  
**Program:** https://bugcrowd.com/engagements/aiven-mbb-og  
**Lane OUT:** `/home/vgpnk1337/.xbgst/hydra-bounty/lanes/stack/aiven`

## Status: PARTIAL — mapped; **blocked on free-tier product signup**

Axes: bounty_complete↑ (map+tests drafted) · evidence_fidelity↑ (401 boundary live) · safety_in_policy↑ (own-only, ninja, no CC)

## Deliverables

| Artifact | Path |
|----------|------|
| SCOPE.md | …/aiven/SCOPE.md |
| ATTACK-SURFACE.md | …/aiven/ATTACK-SURFACE.md |
| FIRST-5-TESTS.md | …/aiven/FIRST-5-TESTS.md |
| OWN-ASSET.md | …/aiven/OWN-ASSET.md |
| DRAFT-REPORT.md | …/aiven/DRAFT-REPORT.md |
| L3 checklists | …/aiven/l3/01–04-*.md |
| Swarm NDJSON | …/aiven/l3/swarm-ndjson.jsonl |

## Evidence (live, unauth)

- `GET https://api.aiven.io/v1/project` → **401**  
  `{"errors":[{"message":"No valid client certificate presented","status":401}],…}`
- Console `https://console.aiven.io/` → 200 CF SPA (headers logged in recon)
- Free tier services (docs): Kafka, MySQL, OpenSearch, PostgreSQL, Valkey — **no CC**

## Blocker

**Free-tier console signup with @bugcrowdninja.com mailbox not completed** in this environment.  
Per playbook FAIL-CLOSED: no authenticated authz IDOR probes until OWN projects A/B exist.

## Sekhmet

```
sekhmet-luna-a.sh swarm -f tasks/swarm-lines.txt -j 4 --timeout 120 --no-keep --scope OUT
```
Exit 0; 4 CollectRecords in `l3/swarm-ndjson.jsonl` (namespaces GC’d; durable checklists materialised host-side).

## Tracker recommendation

Mark H1 Aiven row: **mapped + blocked free-tier signup** (not complete bounty).

## Next (human)

1. Ninja mailbox → two console accounts  
2. Free PG (+ optional Kafka)  
3. Execute FIRST-5-TESTS.md  
4. File BC report only with real evidence  
