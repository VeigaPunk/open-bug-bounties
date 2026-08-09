# H1+BC aggregator check
**UTC:** 2026-08-09T01:23:44Z

## Inventory
- platform n: 768
- independent n: 60
- web3 n: 273
- snapshot_at_utc: 2026-08-06T00:44:32Z
- last_permitted_check_at_utc: 2026-08-08T13:15:46Z

### By platform
- Bugcrowd: 241
- HackerOne: 224
- HackenProof: 159
- Intigriti: 82
- YesWeHack: 62

## H1+BC slice
- n=465 H1=224 BC=241
- fields: directory_url, id, industry, name, platform, url
- industry filled: 221/465
- reward fields on platform rows: **none** (by design)

## Smart order
1. Filter H1+BC only — do not walk 1100 pages.
2. No rewards in JSON → cannot gold-rank from catalog.
3. Join keep-8 for URL hygiene only (see keep8-join.md).
4. EV-QUEUE OVERFIT=Aiven; gate_factor still 0 until human doors.
5. Connector every round: bash xask-kimi-connector '<q>'.
