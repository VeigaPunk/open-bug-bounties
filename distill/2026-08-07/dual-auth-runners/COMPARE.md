# COMPARE — dual-auth-runners (A vs B) · P240 head

**ts:** 2026-08-07T22:40Z  
**lanes:** A = Q-BC · B = Q-FP-H1  
**axes:** `auth_ready` · `actionable_evidence` · `sekhmet_dual_pool` · `secret_hygiene` · `policy_safety`  
**SSoT:** `runner-a/REPORT.md` · `runner-b/REPORT.md` · `shared/{CLAIMS,GATES-dual,VAULT-INVENTORY,CLAIMS-runner-b}.md`

## Scorecard (0–5 per axis)

| Axis | A | B | Notes |
|------|---|---|-------|
| auth_ready | **5** | 4 | A: Q-BC 5/5 joined matrix + Set5 SPA form map + op field maps + ENGAGEMENT-HTTP all 200 + L3 r2 runbooks/gates. B: H1/Inti/TF vault READY; platforms PARTIAL; Shopify export still login-gated. |
| actionable_evidence | 4 | **5** | A: L3 r2 checklists/runbooks/gates (auth setup). B: F1–F4 + H1 p240 packs with FULL/PARTIAL/STUB + XOR Dropbox DEEP. |
| sekhmet_dual_pool | **5** | **5** | A: 5 LUNA + 5 SPARK auth-ready swarm (all ok; harvest + ids). B: 6 live + 2 dry (all ok; NDJSON p240). Both wrappers; spark→luna on usage_limit. |
| secret_hygiene | **5** | **5** | Both op:// titles/labels only; no live secrets in REPORT/OP maps. Spot-check clean on key paths. |
| policy_safety | **5** | **5** | A: OpenAI security-impact STOP; own/@bugcrowdninja/CIC/pam-preview only. B: recon-only; Dropbox↔GitLab XOR; own-store/own-file language. |
| **Total** | **24** | **24** | Tie on sum — **auth_ready break-tie → A** (joined matrix + concrete Okta/Aiven/Atlassian instance path). |

## Winner

**Winner: A (Q-BC)**

### why

Runner A wins on **auth progress** for this dual-auth race: keep-8 Q-BC programs joined, Okta pam-5335 SPA/session blockers documented (`session_hint` non-durable), op Set5 + Bugcrowd field inventories without secret print, engagement/console HTTP doors all 200, and dual-pool sekhmet auth-ready swarm (10 spark_ids, both wrappers) with durable `l3/*-r2` checklists and gates. Next steps are instance-level human work (browser MFA, Aiven free-tier ninja, Atlassian `bugbounty-test-*`, Auth0 Get Credentials → vault) — not missing policy maps. Runner B equals on sekhmet dual-pool proof, secret hygiene, and policy safety, and **beats A on hunt-facing findings packs** (F1–F4 + H1 p240, XOR fidelity tags), but Shopify remains PARTIAL, MSRC profile deferred, and platform auth is still PARTIAL for Google/Proton/Dropbox — weaker pure auth_ready. Shared spark `usage_limit` hit both; both still proved dual roots (`xbrd-spark-luna` / `xbrd-spark-spark`).

## shared_wins

- Dual sekhmet substrate dry + live; both `sekhmet-luna.sh` and `sekhmet-spark.sh`
- `gpt-5.3-codex-spark` usage_limit → luna fallback (pool roots still isolated)
- Vault discipline: titles/field labels + `op://` refs only; no password values in distill
- Policy freeze: recon / enroll / auth maps — no live exploit payloads
- TinyFish for public policy/engagement URLs only
- Shared gates: tmp sanitize, vault inventory, Okta Set5 non-durable session probe
- Milestone ship + secret gate path exercised (A: open-bug-bounties main; B: dual-auth-runner-b label)
- Human still required for durable browser sessions (Okta MFA; H1 Shopify export SPA)

## a_only

- Q-BC 5/5 joined matrix (`Q-BC-JOIN-READINESS.md`)
- Okta pam-5335 form map + curl meta + SPA shell (`OKTA-FORM-MAP.md`, `okta-login-curl.meta`, `okta-login.htm`)
- OP field maps Set5 + Bugcrowd redacted (`OP-OKTA-SET5-FIELDS.md`, `OP-BUGCROWD-ITEM.txt`, `OP-TITLES-QBC.md`)
- Engagement HTTP door check all 200 (`ENGAGEMENT-HTTP.txt`)
- L3 r2 checklists: aiven, identity-day, atlassian-openai, okta runbook, Q-BC-AUTH-GATES
- Dual-pool 5×2 auth-ready swarm harvest (`SEKHMET-HARVEST.md`, `sekhmet-ids.json`)
- OpenAI security-impact-only STOP as first-class wall
- Massive passive door/path-recovery pulse corpus under runner-a (Aiven/Auth0/Okta/Atlassian/BC OIDC)

## b_only

- Multi-program findings packs p240: Google VRP, MSRC OBB, Proton dual, Shopify H1, Dropbox Inti
- Hard XOR Dropbox DEEP / GitLab STUB with FULL/PARTIAL/STUB fidelity
- AUTH-READINESS-p240 platform matrix (H1/Inti/TF READY labels)
- Explicit SCRUB.md + leakage rg gate post-write lineage
- TinyFish multi-vendor public policy recon (Google/MS/Proton/Shopify/Dropbox)
- Intigriti UA / own-file authz path + @intigriti.me language for Dropbox
- NDJSON swarm + dry packs under `l3/*-p240.ndjson` with named spark_ids
- SHOPIFY-H1-OAUTH-P240 expanded domain/criteria pack

## Blockers (deduped)

| Blocker | Who | Severity |
|---------|-----|----------|
| Okta interactive + MFA (headless not durable) | A | high for BC identity |
| Auth0 Get Credentials → human → 1Password only | A | high for identity-day |
| Aiven free-tier + @bugcrowdninja project | A | high for B1 |
| Atlassian `bugbounty-test-*` site | A | high for B3 |
| Shopify H1 asset table PARTIAL (login export) | B | med for H1 |
| MSRC researcher profile | B | low (at first submit) |
| spark model usage_limit | A+B | med throughput |
| `--no-keep` / dual-write race thin files | A+B | med evidence trees (host packs SSoT) |

## followups (merged, ordered)

1. Human browser: Set5 Okta login + MFA + UserHome tile map (names/paths only)
2. Aiven free-tier dual ninja accounts; API token only in 1Password
3. Auth0 CIC Get Credentials → op vault; ≤5 rps; no prod manage.auth0.com abuse
4. H1 Shopify logged-in policy export → lift PARTIAL; partners store @wearehackerone.com
5. Intigriti Dropbox join + free trial own-file authz with required UA/headers
6. Dual Google own accounts Drive ACL passive map (F1 next)
7. Proton dual free accounts + security@ / PGP channel prep
8. Atlassian create `bugbounty-test-*` + second ninja for authz matrix
9. Re-try spark primary when usage_limit clears (true dual-model diversity)
10. Prefer `op run` + desktop integrate; avoid flaky `op whoami` as sole health
11. Keep GitLab stub until Dropbox deep closed (XOR)
12. MSRC profile only at first submit; no premature account churn

## Evidence index

| Kind | A | B |
|------|---|---|
| Report | `runner-a/REPORT.md` (22:38Z) | `runner-b/REPORT.md` (22:38Z) |
| Auth | `Q-BC-JOIN-READINESS.md`, `OKTA-FORM-MAP.md`, `AUTH-READINESS.md` | `auth/AUTH-READINESS-p240.md` |
| Findings / checklists | `l3/*-r2.md` | `findings/*-p240.md` |
| Sekhmet | `sekhmet-ids.json`, `SEKHMET-HARVEST.md` | `l3/luna-swarm-p240.ndjson`, `l3/spark-swarm-p240.ndjson` |
| Hygiene | redacted OP dumps | `SCRUB.md` lineage |
| Shared | `shared/CLAIMS.md`, `GATES-dual.md`, `VAULT-INVENTORY.md`, `CLAIMS-runner-b.md` |

## Method notes

- Duplicates collapsed: dual usage_limit → one shared blocker; dual op hygiene → one shared_win; dual sekhmet dual-pool proof → scored equal 5/5 this pulse.
- Contradiction: none on facts; **lane scope differs** (BC vs FP/H1) so axis totals can tie while winner breaks on auth_ready for race name dual-auth.
- Leakage spot-check: no real secret patterns on REPORT/OP key paths; scrub docs may mention pattern names only.
- Prior COMPARE (14:20Z) still valid lineage; this file is SSoT head for 22:38Z dual REPORT pulse.

**Status:** COMPARE complete · winner **A** · B first-class for multi-program hunt packs · both APPROVED candidate on secret hygiene + policy safety.
