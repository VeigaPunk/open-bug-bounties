# RUNNER A — Q-BC auth lane REPORT

**runner_id:** A  
**lane:** Q-BC  
**ts:** 2026-08-07T22:38Z  
**OUT:** `/home/vgpnk1337/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/runner-a/`  

Axes: `auth_ready↑` `hunt_throughput↑` `evidence_fidelity↑` `safety_in_policy↑` `secret_hygiene↑`

## Scope (keep-8 Q-BC)

| Slot | Program | Join | Auth readiness |
|------|---------|------|----------------|
| B1 | Aiven `aiven-mbb-og` | joined | Free tier + `@bugcrowdninja` still required for console/API own assets |
| B2 | Identity-day Auth0 → Okta | joined both | Get Credentials → vault; Set5 Okta op item present |
| B3 | Atlassian | joined | Need `bugbounty-test-*` cloud site |
| B4 | OpenAI | joined | Security-impact only; model/jailbreak OOS |

Platform Bugcrowd: vault item `Bugcrowd` present (username field only in distill).

## Moves executed (this wave)

1. **Shared substrate** — VAULT-INVENTORY, OKTA-SET5-PROBE, SUBSTRATE, HUNT-NOW, parent enroll/scopes.
2. **Vault inventory** — titles only; Set5 fields: username STRING, password CONCEALED; Bugcrowd item field labels without password values.
3. **Okta form map refresh** — curl pam-5335 → UserHome SPA shell 200/6375B; 0 static inputs; enduser-v2 + sentry scripts; `session_hint=AUTHENTICATED` not durable headless session.
4. **op:// injection map** — username/password refs; never printed password.
5. **Dual sekhmet pools** — `sekhmet-luna.sh` + `sekhmet-spark.sh`, 5 tasks × 2, all status=ok; spark primary usage_limit → luna fallback; 2× rate_limit fail_reason with status ok.
6. **L3 r2 checklists** — aiven, identity-day, atlassian-openai, okta runbook, Q-BC gates under `l3/*-r2.md`.
7. **TinyFish** — public Aiven MBB engagement URL confirmed.
8. **Engagement HTTP doors** — aiven/auth0-okta/okta/atlassian/openai + console.aiven + pam enduser/admin all **200**.

## Evidence paths

| Artifact | Path |
|----------|------|
| This report | `REPORT.md` |
| Okta form map | `OKTA-FORM-MAP.md` |
| Okta curl meta / shell | `okta-login-curl.meta`, `okta-login.htm` |
| op Okta fields (no secrets) | `OP-OKTA-SET5-FIELDS.md`, `okta-item.redacted.json` |
| Bugcrowd vault (redacted) | `OP-BUGCROWD-ITEM.txt` |
| Vault titles Q-BC | `OP-TITLES-QBC.md` |
| Join readiness | `Q-BC-JOIN-READINESS.md` |
| Engagement HTTP | `ENGAGEMENT-HTTP.txt` |
| TF policy URLs | `TF-POLICY-URLS.md` |
| Sekhmet IDs | `sekhmet-ids.json`, `SEKHMET-HARVEST.md` |
| Swarm logs | `sekhmet-luna-swarm.log`, `sekhmet-spark-swarm.log` |
| Tasks | `tasks-auth-ready.txt` |
| L3 r2 | `l3/checklist-aiven-r2.md`, `l3/checklist-identity-day-r2.md`, `l3/checklist-atlassian-openai-r2.md`, `l3/runbook-okta-set5-r2.md`, `l3/Q-BC-AUTH-GATES-r2.md` |
| Shared | `../shared/{VAULT-INVENTORY,OKTA-SET5-PROBE,SUBSTRATE}.md` |
| Parent | `../../HUNT-NOW.md`, `../../ENROLL.md` |

## Okta Set5 form map (summary)

- **Host:** `https://bugcrowd-pam-5335.oktapreview.com` (admin: `…-admin.oktapreview.com`)
- **UI:** enduser-v2 SPA; login fields JS-rendered
- **op item:** `Bugcrowd Org (Set 5) Okta`
- **refs:** `op://Personal/Bugcrowd Org (Set 5) Okta/username` · `…/password`
- **Cookie names only:** sid, xids, JSESSIONID, t, DT
- **Blocker:** interactive browser + MFA; curl not durable auth

## Sekhmet spark_ids (this swarm)

### LUNA
- sp-1d59d225-2155-4c06-824e-7eda0cc8c9b3
- sp-53c48b9e-ff55-4373-ba96-74770fd0b87f
- sp-d1c59eea-285e-429e-a19e-2c84bce9e670
- sp-276a02c4-1cde-43ff-9aba-c84505b43e7a
- sp-f90b70b7-1ed4-4e84-af15-4ff2c0dbd0b5

### SPARK
- sp-be205186-6106-4fba-aa89-3c9382968e8b
- sp-7c58a15e-4ae4-4a5a-8dbb-42beb902b5bb
- sp-6f66c9a5-17ed-4082-b75c-bbf3032169d8
- sp-38942c86-5027-4403-995a-a45c2b370518
- sp-79f52837-a2d0-4834-8aaa-567217d340aa

## Policy / safety

- No live exploitation of third-party production.
- Own/test assets only (`@bugcrowdninja`, CIC Auth0, pam-5335 preview, `bugbounty-test-*`).
- Prefer FULL-fidelity scopes for Q-BC B1–B3; OpenAI security-impact only.
- No passwords/tokens in distill; op:// refs only.

## Blockers

1. Okta interactive session needs human browser + MFA; headless session_hint ≠ real session.
2. Auth0 Get Credentials secrets must stay in 1Password only.
3. Aiven free-tier project not yet created with ninja email.
4. Atlassian `bugbounty-test-*` site not yet created.
5. Spark primary model usage_limit forced luna fallback; some rate_limit annotations.
6. Dual-pool writers raced on same r2 paths — host re-filled thin files for fidelity.

## Next 3 actions

1. **Human browser:** unlock 1Password → pam-5335 via Set5 item → map UserHome tiles (names only) → MFA for Super Admins.
2. **Aiven B1:** free-tier + `@bugcrowdninja.com`; API token in 1Password only; dual-account IDOR class on own projects.
3. **Identity-day B2:** redeem Auth0 Get Credentials to vault; CIC stay ≤5 rps; then Okta preview cross-org authz manual only.

## Status

**APPROVED candidate:** auth documentation / join readiness complete for runner-a Q-BC lane. Instance-level auth still human. No findings claimed.
