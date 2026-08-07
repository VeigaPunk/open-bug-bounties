# RUNNER A — Q-BC auth lane REPORT

**runner_id:** A  
**lane:** Q-BC  
**ts:** 2026-08-07T14:11Z (approx)  
**OUT:** `/home/vgpnk1337/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/runner-a/`  

Axes optimized: `auth_ready↑` `hunt_throughput↑` `evidence_fidelity↑` `safety_in_policy↑` `secret_hygiene↑`

## Scope (keep-8 Q-BC)

| Slot | Program | Status (ENROLL) | Auth readiness |
|------|---------|-----------------|----------------|
| B1 | Aiven `aiven-mbb-og` | **joined** | Free tier + `@bugcrowdninja` still required for console/API own assets |
| B2 | Identity-day Auth0 → Okta | **joined** both | Get Credentials paths open; Set5 Okta vault item present |
| B3 | Atlassian | **joined** | Need `bugbounty-test-*` cloud site |
| B4 | OpenAI | **joined** | Security-impact only; TAC verified (parent notes) |

Platform Bugcrowd: **authed** per parent `ACCOUNTS.md`.

## Moves executed

1. **Read shared substrate** — `VAULT-INVENTORY`, `OKTA-SET5-PROBE`, `SUBSTRATE`, `TF-BC-OKTA-SEARCH`, parent `HUNT-NOW`/`ENROLL`/`scopes/*`.
2. **Vault inventory (titles/fields only)** — Personal items relevant to Q-BC; Okta Set5 field map without password values; Bugcrowd platform login item (titles + field labels).
3. **Okta form map** — curl `bugcrowd-pam-5335.oktapreview.com`; SPA shell; 0 static inputs; enduser-v2 JS; `session_hint=AUTHENTICATED` is **not** durable headless session.
4. **op:// injection map documented** — username/password refs only; never printed password. `op whoami` may show not signed-in while desktop integrate still serves `op item get`.
5. **Dual sekhmet pools** — both `sekhmet-luna.sh` and `sekhmet-spark.sh` swarms with `--timeout 180 --no-keep`; 5 auth-ready tasks × 2 pools (**10 spark_ids, all status=ok**). Spark pool hit `gpt-5.3-codex-spark` usage_limit → fallback `gpt-5.6-luna`.
6. **L3 checklists** (prior + this run artifacts under `l3/`): Aiven, identity-day, Atlassian+OpenAI, Okta Set5 runbook.
7. **TinyFish public URLs** — Okta/Auth0/Aiven engagement URLs confirmed.
8. **Engagement HTTP doors** — all five BC engagements **200**; console.aiven.io **200**.

## Evidence paths

| Artifact | Path |
|----------|------|
| This report | `REPORT.md` |
| Okta form map | `OKTA-FORM-MAP.md` |
| Okta curl meta / shell | `okta-login-curl.meta`, `okta-login.htm` |
| op Okta fields (no secrets) | `OP-OKTA-SET5-FIELDS.md`, `okta-item.redacted.json` |
| Bugcrowd vault item (redacted) | `OP-BUGCROWD-ITEM.txt` |
| Vault titles Q-BC | `OP-TITLES-QBC.md` |
| Join readiness matrix | `Q-BC-JOIN-READINESS.md` |
| Engagement HTTP | `ENGAGEMENT-HTTP.txt` |
| TF policy URLs | `TF-POLICY-URLS.md` |
| Sekhmet IDs | `sekhmet-ids.json`, `SEKHMET-HARVEST.md` |
| Swarm logs | `sekhmet-luna-swarm.log`, `sekhmet-spark-swarm.log` |
| Task file | `tasks-auth-ready.txt` |
| L3 checklists | `l3/checklist-aiven.md`, `l3/checklist-identity-day.md`, `l3/checklist-atlassian-openai.md`, `l3/runbook-okta-set5.md` |
| Parent SSoT | `../../ENROLL.md`, `../../HUNT-NOW.md`, `../../scopes/{aiven,auth0,okta,atlassian,openai}.md` |
| Shared | `../shared/{VAULT-INVENTORY,OKTA-SET5-PROBE,SUBSTRATE,TF-BC-OKTA-SEARCH}.md` |

## Okta Set5 form map (summary)

- **Host:** `https://bugcrowd-pam-5335.oktapreview.com` (admin sibling: `…-admin.oktapreview.com`)
- **UI:** Okta enduser-v2 SPA (oktacdn); login fields JS-rendered (`identifier`/`username`, `password`, MFA challenge)
- **op item title:** `Bugcrowd Org (Set 5) Okta`
- **op refs:** `op://Personal/Bugcrowd Org (Set 5) Okta/username` · `…/password`
- **Cookie names (names only):** `sid`, `xids`, `JSESSIONID`, `t`, `DT` — never record values
- **Blocker:** interactive browser + possible MFA; curl cannot complete durable auth

## Bugcrowd vault titles (Q-BC relevant)

- Bugcrowd  
- Bugcrowd Org (Set 5) Okta  
- (also present: HackerOne, Intigriti, YesWeHack, OpenAI*, TinyFish API — out of direct Q-BC but inventoried)

Bugcrowd platform URL on item: `https://login.hackers.bugcrowd.com`.

## Sekhmet spark_ids used (this auth-ready swarm)

### LUNA (`~/.xbgst/scripts/sekhmet-luna.sh`)
- `sp-b8ac28b8-cf39-4947-922f-92a5e3c6250e`
- `sp-fc5c85da-38b7-40a6-bae8-234159619ea0`
- `sp-a2c40094-a832-4ac8-a5a4-a1784700e4b6`
- `sp-d5ce7cf1-26e3-490c-84f0-4267c1b73d3a`
- `sp-4b6dd3de-92b0-4b73-ad65-492e1a4528fd`

### SPARK (`~/.xbgst/scripts/sekhmet-spark.sh`)
- `sp-1f3f6e44-e21e-4da4-91ac-8f804cb163ff`
- `sp-0cfc871d-b746-4507-a73c-7532eca715b8`
- `sp-eb07f0e8-1c32-4bc7-8319-a02320281bd9`
- `sp-06c71d6c-855f-4fbd-92ba-e3f3b920e43a`
- `sp-689d7da6-9240-4cda-90d7-e8c2f0a91071`

### Earlier L3 checklist wave (l3/)
- luna: `sp-4a889319-1410-48fc-bd8a-3d0b9a9a1e62`, `sp-87b44661-fa17-4335-80cb-db91ebef4ec5`
- spark: `sp-b5d2237b-932b-4406-ab64-0ab2caf6428b`, `sp-d32f7b5e-8ad3-43cc-bf9e-17ed79835282`

## Policy / safety

- No live exploitation of third-party production.
- Own/test assets only (`@bugcrowdninja`, CIC Auth0 env, pam-5335 preview, `bugbounty-test-*`).
- Prefer FULL-fidelity scopes (all five Q-BC scopes tagged FULL in parent distill).
- No passwords/tokens written into distill; op:// refs only.
- OpenAI: model/jailbreak/sandbox-as-RCE **OOS** unless outside-sandbox indicators per brief.

## Blockers

1. **Okta interactive session** still needs human browser (Canary CDP) + MFA; headless `session_hint=AUTHENTICATED` is not a real session.
2. **Auth0 Get Credentials** secrets must live only in 1Password (modal may still need human paste).
3. **Aiven free-tier project** not yet created with ninja email (join done; instance not).
4. **Atlassian** `bugbounty-test-*` site not yet created.
5. **op CLI** `whoami`/direct `op read` flaky without full CLI sign-in; desktop integrate works for `op item get` — prefer `op run` after unlock.
6. **Spark primary model** usage_limit (codex-spark) forced luna fallback — throughput reduced for spark-primary.
7. Runtime result trees removed by `--no-keep` — fidelity relies on logs + l3 checklists (acceptable for auth lane).

## Next 3 actions

1. **Human browser:** unlock 1Password → log into `bugcrowd-pam-5335.oktapreview.com` via Set5 item → map UserHome tiles (names/paths only) → enforce MFA for Super Admins per Okta brief.
2. **Aiven B1:** create free-tier service with `@bugcrowdninja.com`; store API token in 1Password only; dual-account IDOR class per `l3/checklist-aiven.md`.
3. **Identity-day B2:** redeem Auth0 Get Credentials into op vault; stay on `manage.cic-bug-bounty.auth0app.com`; ≤5 rps; then Okta cross-org authz manual only.

## Status

**partial → auth_ready high for documentation / join; instance-level auth still human.**  
No findings claimed. Competitive deliverable complete for runner-a auth lane.
