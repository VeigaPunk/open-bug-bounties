# Runner B — LANE Q-FP + Q-H1

**Runner:** B  
**Axes:** auth_ready↑ hunt_throughput↑ evidence_fidelity↑ safety_in_policy↑ secret_hygiene↑  
**OUT:** `~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/runner-b/`

## Queue map

| ID | Program | Depth | Artifact |
|---|---|---|---|
| F1 | Google VRP | authz/IDOR map | findings/F1-google-authz-map.md |
| F2 | Microsoft MSRC Online | MSOBB authz map | findings/F2-msrc-authz-map.md |
| F3 | Proton | dual-account IDOR plan | findings/F3-proton-dual-account.md |
| H1 | Shopify H1 | criteria/rewards | findings/H1-shopify-criteria.md |
| F4 | Dropbox Intigriti | **DEEP** (XOR) | findings/F4-dropbox-xor.md |
| H2 | GitLab H1 | **STUB** | documented in F4 |

## Policy freeze

Passive recon + auth readiness only. Own accounts/tenants/stores. No live exploit automation.

## Dual sekhmet

| Pool | Wrapper | Tasks |
|---|---|---|
| LUNA | sekhmet-luna.sh | sp-rb01,02,03 |
| SPARK | sekhmet-spark.sh | sp-rb04,05,06 (model fallback to luna when usage_limit) |
