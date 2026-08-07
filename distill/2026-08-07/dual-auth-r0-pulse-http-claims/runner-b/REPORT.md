# REPORT — Runner B (Q-FP + Q-H1 auth lane)

**runner_id:** B  
**lane:** Q-FP-H1  
**ts:** 2026-08-07T14:11Z  
**OUT_DIR:** `/home/vgpnk1337/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/runner-b/`

## Axes

| Axis | Move | Result |
|---|---|---|
| auth_ready | AUTH-READINESS + vault titles/refs | H1/Inti/TF mapped; MSRC profile-on-submit; Proton email channel |
| hunt_throughput | dual sekhmet 6 tasks + TinyFish | 6/6 sparks status=ok; findings written |
| evidence_fidelity | scopes FULL/PARTIAL tags preserved | Google/MSRC/Proton/Dropbox FULL; Shopify PARTIAL; GitLab STUB |
| safety_in_policy | recon-only tasks | no exploit payloads; own-asset language only |
| secret_hygiene | op:// only | no credential values in distill |

## Moves

1. **tmp-sanitize + OUT mkdir** — sanitize ran; dual dry-run roots correct (`xbrd-spark-luna` / `xbrd-spark-spark`).
2. **TinyFish public recon** — Google VRP rules, MSRC Online Services, Proton bounty, Shopify criteria/getting-started, Dropbox Intigriti discovery.
3. **Vault field inventory (labels)** — HackerOne `username`/`user[password]`; Intigriti `Input.Username`/`Input.Password`; TinyFish `credential`.
4. **Dual sekhmet live swarm** — luna: F1/F2/F3; spark: H1/F4/AUTH (spark usage_limit → luna fallback; **both wrappers used**).
5. **XOR F4** — Dropbox DEEP, GitLab STUB documented.
6. **Finding packs** — F1–F4, H1, AUTH-READINESS, LANE.md.
7. **Leakage gate** — post-write `rg` (see evidence).

## Sekhmet IDs

| spark_id | pool root | status | notes |
|---|---|---|---|
| sp-rb01-f1-google | xbrd-spark-luna | ok | gpt-5.6-luna |
| sp-rb02-f2-msrc | xbrd-spark-luna | ok | gpt-5.6-luna |
| sp-rb03-f3-proton | xbrd-spark-luna | ok | gpt-5.6-luna; host file landed by worker |
| sp-rb04-h1-shopify | xbrd-spark-spark | ok | fallback from gpt-5.3-codex-spark |
| sp-rb05-f4-dropbox | xbrd-spark-spark | ok | fallback luna |
| sp-rb06-auth-map | xbrd-spark-spark | ok | fallback luna |
| sp-46fc7b49-… (dry) | luna | ok | empty swarm health |
| sp-4fcc7bd8-… (dry) | spark | ok | model label spark |

NDJSON: `l3/luna-swarm.ndjson`, `l3/spark-swarm.ndjson`

## Evidence paths

- findings/F1-google-authz-map.md  
- findings/F2-msrc-authz-map.md  
- findings/F3-proton-dual-account.md  
- findings/H1-shopify-criteria.md  
- findings/F4-dropbox-xor.md  
- auth/AUTH-READINESS.md  
- LANE.md  
- tasks/policy-recon.ndjson  

## Blockers

1. **gpt-5.3-codex-spark usage_limit** — spark pool ran via luna fallback (substrate dual still proven).  
2. **Shopify H1 asset table PARTIAL** — needs logged-in H1 policy export.  
3. **MSRC profile** — create at first submit.  
4. **GitLab deep blocked by XOR** — intentional while Dropbox deep.  
5. Some sekhmet workers returned ok but only F3 initially persisted; host backfill completed missing maps for fidelity.

## Next

1. Browser: H1 Shopify policy export → lift fidelity; create partners bugbounty store with `@wearehackerone.com`.  
2. Intigriti: confirm Dropbox program join; set UA/header; free trial + own-file API authz (human session).  
3. Google: dual own accounts + one product (Drive share ACL) passive map.  
4. Proton: two free accounts; email channel prep (PGP).  
5. MSRC: register researcher profile when first report ready; MSOBB tenant.  
6. Re-run spark pool when usage_limit clears for true model diversity.  
7. Compare with Runner A via `shared/COMPARE.md` (titles only).

## Policy attestation

No live exploit. No secrets written. Own accounts only language. TinyFish used for public pages only.
