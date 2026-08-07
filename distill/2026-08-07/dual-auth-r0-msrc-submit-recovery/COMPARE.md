# COMPARE — dual-auth-runners (A vs B)

**ts:** 2026-08-07T14:20Z  
**lanes:** A = Q-BC · B = Q-FP-H1  
**axes:** `auth_ready` · `actionable_evidence` · `sekhmet_dual_pool` · `secret_hygiene` · `policy_safety`  
**SSoT paths:** `runner-a/REPORT.md` · `runner-b/REPORT.md` · `shared/{SUBSTRATE,GATES-dual,VAULT-INVENTORY}.md`

## Scorecard (0–5 per axis)

| Axis | A | B | Notes |
|------|---|---|-------|
| auth_ready | **5** | 4 | A: 5/5 BC **joined** + Okta SPA form map + op field maps + HTTP doors + join matrix. B: H1/Inti/TF mapped, platforms authed; Shopify PARTIAL; MSRC profile deferred. |
| actionable_evidence | 4 | **5** | A: L3 checklists/runbooks + readiness (auth setup). B: F1–F4 + H1 findings packs with FULL/PARTIAL/STUB fidelity tags + XOR. |
| sekhmet_dual_pool | **5** | 4 | A: 5×2 auth swarm + prior L3 wave; harvest w/ tokens/ms; both wrappers. B: 6 live + dual dry; spark→luna fallback; some host backfill. |
| secret_hygiene | 4 | **5** | Both op:// only; no live secrets in distill. B has explicit `SCRUB.md` + `rg` gate. A: redacted op dumps + field labels only. |
| policy_safety | **5** | **5** | A: OpenAI security-impact STOP; own/@bugcrowdninja/CIC/pam-preview only. B: recon-only; Dropbox↔GitLab XOR; own-asset language. |
| **Total** | **23** | **23** | Tie on sum — **auth_ready + sekhmet volume break tie → A** |

## Winner

**Winner: A (Q-BC)**

### why

Runner A delivers the stronger **auth_progress** package for a dual-auth race: all keep-8 Q-BC programs **joined**, concrete Okta Set5 SPA/session blockers documented (curl non-durable `session_hint`), op titles/field maps without secret print, engagement HTTP **200** doors, and dual-pool sekhmet at higher volume (10 auth-ready spark_ids + 4 L3 checklist ids, both `sekhmet-luna.sh` and `sekhmet-spark.sh`). Actionable next steps are instance-level human work (browser MFA, Aiven free tier, Atlassian `bugbounty-test-*`), not missing policy maps. Runner B matches on policy safety and beats A on **hunt-facing findings packs** and explicit scrub attestation, but Shopify remains PARTIAL, MSRC profile deferred, and sekhmet persistence needed host backfill — slightly weaker on pure auth-progress + dual-pool evidence density. Shared spark `usage_limit` hit both; both still proved dual roots.

## shared_wins

- Dual sekhmet substrate (`xbrd-spark-luna` / `xbrd-spark-spark`) dry + live; both wrappers used
- `gpt-5.3-codex-spark` **usage_limit** → luna fallback (pool roots still isolated)
- Vault discipline: titles/field labels + `op://` refs only; no password values in distill
- Policy freeze: recon / enroll / auth maps — no live exploit payloads
- TinyFish used for public policy/engagement URLs only
- Shared gates: tmp sanitize, vault inventory, Okta Set5 non-durable session probe
- Human remaining for durable sessions (Okta MFA; H1 Shopify export SPA)

## a_only

- Q-BC 5/5 **joined** matrix (`Q-BC-JOIN-READINESS.md` + ENROLL ingest)
- Okta pam-5335 form map + SPA shell curl meta + Set5 runbook (`OKTA-FORM-MAP.md`, `l3/runbook-okta-set5.md`)
- OP field maps for Set5 + Bugcrowd item redacted inventory
- Engagement HTTP door check (all BC engagements 200)
- L3 checklists: Aiven, identity-day Auth0/Okta, Atlassian+OpenAI STOP
- Higher sekhmet count: dual-pool 5-task auth swarm harvest with per-id tokens/ms
- OpenAI security-impact-only wall documented as first-class STOP

## b_only

- Multi-platform findings pack: Google VRP, MSRC OBB, Proton dual-account, Shopify H1, Dropbox Inti
- Hard **XOR** Dropbox DEEP / GitLab STUB with fidelity tags FULL/PARTIAL/STUB
- Explicit `SCRUB.md` + leakage `rg` gate post-write
- TinyFish multi-vendor public policy recon (Google/MS/Proton/Shopify/Dropbox)
- Platform AUTH-READINESS for H1/Intigriti/TinyFish field labels + ACCOUNTS matrix
- Intigriti UA/`X-Intigriti-Username` hygiene + @intigriti.me path for Dropbox
- Provenance/meta+result JSON under `l3/` for keep swarms (when not stripped)

## Blockers (deduped)

| Blocker | Who | Severity |
|---------|-----|----------|
| Okta interactive + MFA (headless not durable) | A | high for BC identity |
| Auth0 Get Credentials → human → 1Password | A | high for identity-day |
| Aiven free-tier + @bugcrowdninja project | A | high for B1 probes |
| Atlassian `bugbounty-test-*` site | A | high for B3 |
| Shopify H1 asset table PARTIAL (login export) | B | med for H1 hunt |
| MSRC researcher profile | B | low (at first submit) |
| spark model usage_limit | A+B | med throughput |
| `--no-keep` / partial worker file persist | A / B | med evidence trees |

## followups (merged, ordered)

1. Human browser: Set5 Okta login + MFA enforce + tile map (names/paths only)
2. Aiven free-tier dual ninja accounts; API token only in 1Password
3. Auth0 CIC Get Credentials → op vault; ≤5 rps; no prod manage.auth0.com
4. H1 Shopify logged-in policy export → lift PARTIAL; partners bugbounty store
5. Intigriti Dropbox join + free trial own-file authz with required UA/headers
6. Dual Google own accounts Drive ACL passive map (F1 next)
7. Proton dual free accounts + security@ / PGP channel prep
8. Atlassian create `bugbounty-test-*` + second ninja for authz matrix
9. Re-try spark primary model when usage_limit clears (true dual-model diversity)
10. Prefer `op run` + desktop integrate; avoid flaky `op whoami` as sole health check
11. Keep GitLab stub until Dropbox deep closed (XOR)
12. MSRC profile only at first submit; no premature account churn

## Evidence index

| Kind | A | B |
|------|---|---|
| Report | `runner-a/REPORT.md` | `runner-b/REPORT.md` |
| Auth | `runner-a/AUTH-READINESS.md`, `Q-BC-JOIN-READINESS.md` | `runner-b/auth/AUTH-READINESS.md` |
| Findings / checklists | `l3/checklist-*.md`, Okta maps | `findings/F{1-4}-*.md`, `H1-shopify-criteria.md` |
| Sekhmet | `sekhmet-ids.json`, `SEKHMET-HARVEST.md` | `l3/*-swarm*.ndjson`, `SEKHMET.md` |
| Hygiene | redacted op dumps | `SCRUB.md` clean |
| Shared | `shared/SUBSTRATE.md`, `GATES-dual.md`, `VAULT-INVENTORY.md`, `OKTA-SET5-PROBE.md` |

## Method notes

- Duplicates collapsed: dual usage_limit reports → one shared blocker; dual op hygiene → one shared_win.
- Contradiction: none on facts; **lane scope differs** (BC vs FP/H1) so totals tie on axes while winner breaks on auth_ready + sekhmet density for this race name.
- Leakage spot-check: only scrub prose matched `password=` patterns; no live secrets.

**Status:** COMPARE complete · winner **A** · B remains first-class for multi-program hunt packs.

**Pulse (14:17Z):** godspeed 119s ON · mid-pulse content velocity **B** (F1–F4+H1 pack) · race composite still **A** — see `CONNECTOR.md` ## Pulse continuation.
