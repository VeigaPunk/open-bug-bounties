# REPORT — Runner B (Q-FP + Q-H1 auth lane)

**runner_id:** B  
**lane:** Q-FP-H1  
**ts:** 2026-08-07T22:38Z  
**OUT_DIR:** `/home/vgpnk1337/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/runner-b/`

## Axes

| Axis | Move | Result |
|---|---|---|
| auth_ready↑ | vault labels + AUTH-READINESS-p240 | H1/Inti/TF READY; platforms PARTIAL |
| hunt_throughput↑ | dual sekhmet 6 live + 2 dry + TinyFish | 6/6 ok; both pools invoked |
| evidence_fidelity↑ | TF criteria + security.txt + host packs | Shopify domain table expanded; H1 login still PARTIAL |
| safety_in_policy↑ | recon-only task text | no exploit; own-store language |
| secret_hygiene↑ | op:// refs only | titles + labels only |

## Moves (P240 pulse)

1. **tmp-sanitize** — ran before pulse.
2. **TinyFish search+fetch** — Google rules, Shopify criteria/bugbounty, Dropbox security.txt, Intigriti Dropbox URLs.
3. **Vault field inventory** — HackerOne: username, user[password]; Intigriti: Input.Username, Input.Password; TinyFish API: credential (+ username).
4. **Dual sekhmet** — luna tasks F1/F2/H1; spark tasks F3/F4/AUTH; dry both pools.
5. **XOR F4** — Dropbox DEEP documented; GitLab STUB.
6. **Host durable packs** — findings/*-p240.md, AUTH-READINESS-p240, SHOPIFY-H1-OAUTH-P240.
7. **Secret gate + milestone ship** — see end.

## Sekhmet IDs (P240)

| spark_id | pool wrapper | root | status | notes |
|---|---|---|---|---|
| sp-rb-dry-luna | sekhmet-luna.sh | xbrd-spark-luna | ok | dry-run |
| sp-rb-dry-spark | sekhmet-spark.sh | xbrd-spark-spark | ok | dry; model label spark |
| sp-rb-p240-f1-google | sekhmet-luna.sh | xbrd-spark-luna | ok | rate_limit flag; tokens 21015 |
| sp-rb-p240-f2-msrc | sekhmet-luna.sh | xbrd-spark-luna | ok | |
| sp-rb-p240-h1-shopify | sekhmet-luna.sh | xbrd-spark-luna | ok | |
| sp-rb-p240-f3-proton | sekhmet-spark.sh | xbrd-spark-spark | ok | fallback gpt-5.6-luna |
| sp-rb-p240-f4-dropbox | sekhmet-spark.sh | xbrd-spark-spark | ok | fallback; rate_limit note |
| sp-rb-p240-auth-map | sekhmet-spark.sh | xbrd-spark-spark | ok | fallback luna |

NDJSON: `l3/luna-swarm-p240.ndjson`, `l3/spark-swarm-p240.ndjson`, dry-*-p240.ndjson  
Note: --no-keep deleted namespaces; durable content host-written from TF + provenance.

## Evidence paths

- findings/F1-google-authz-map-p240.md
- findings/F2-msrc-authz-map-p240.md
- findings/F3-proton-dual-p240.md
- findings/F4-dropbox-xor-p240.md
- findings/H1-shopify-criteria-p240.md
- auth/AUTH-READINESS-p240.md
- SHOPIFY-H1-OAUTH-P240.md
- tasks/policy-recon-p240-*.ndjson
- shared/CLAIMS-runner-b.md

## Blockers

1. **gpt-5.3-codex-spark usage_limit** — spark pool falls back to luna (dual wrappers still proven).
2. **Shopify H1 asset export PARTIAL** — needs logged-in H1 browser session.
3. **MSRC profile** — create at first submit.
4. **GitLab deep XOR-blocked** — intentional.
5. **--no-keep** — agent result bodies not retained; host packs are SSoT for content.

## Next

1. Human browser: H1 Shopify policy export → FULL asset fidelity; partners store with @wearehackerone.com.
2. Intigriti: join Dropbox; capture UA/header; own-file API authz map.
3. Google: dual accounts + Drive share ACL passive map.
4. Proton: two free accounts + PGP channel prep.
5. MSRC: profile when first report ready.
6. Re-run spark primary when usage_limit clears.
7. Compare Runner A via shared/COMPARE (titles only).

## Policy attestation

No live exploit. No secrets in distill. Own accounts only. TinyFish for public pages. GODSPEED inject on all sekhmet tasks.

## Prior pulse lineage

Earlier REPORT content (14:11–14:20Z, door packs P53–P232) retained as files in OUT_DIR; this REPORT is the SSoT pulse head for P240 ship.
