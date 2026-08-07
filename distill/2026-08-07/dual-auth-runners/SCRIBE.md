# SCRIBE — dual-auth-runners milestone

**Status:** COMPLETE | **Date:** 2026-08-07 | **Session:** dual-auth race (~14:06–14:13Z)

## Does

Parallel Q-BC (A) and Q-FP/H1 (B) auth-readiness race: dual sekhmet roots fixed, Okta Set5 demystified, XOR F4 locked, vault labels only — no live exploit.

## Winner

| Race | Winner | Why |
|------|--------|-----|
| Mid-race | **B** | Faster packs + XOR F4 |
| Final (substrate) | **A** (narrow) | Wrapper patch; Set5 truth; Q-BC join readiness |
| Content co-win | **B** | F1–F4/H1 maps; Dropbox deep / GitLab park |

Pareto: keep A’s substrate + Okta map; keep B’s XOR + finding packs.

## What shipped

- Dual roots: `xbrd-spark-luna` / `xbrd-spark-spark` via patched `sekhmet-{luna,spark}.sh`
- tmp sanitize + sekhmet gc; secret scan green (op:// only)
- **A:** Okta FORM-MAP (AUTHENTICATED ≠ durable session); Q-BC join readiness; 4 L3 checklists; 10 live sparks ok
- **B:** AUTH-READINESS matrix; F1–F4 + H1 packs; XOR Dropbox DEEP / GitLab STUB; findings/F3-proton
- Shared: VAULT-INVENTORY, SUBSTRATE, OKTA-SET5-PROBE, GATES-dual, CLAIMS-runner-b
- Compile: CONNECTOR + COMPARE

## Gates (summary)

| Gate | Status |
|------|--------|
| tmp headroom | PASS (~1–2%) |
| sekhmet dry-run dual roots/models | PASS |
| sekhmet luna live | PASS |
| sekhmet spark live | DEGRADED (usage_limit → luna fallback; roots isolated) |
| vault titles / secret scan | PASS |
| Okta Set5 map (non-durable hint) | PASS |
| dual race / workflow | DONE / launched |

## Blockers

1. Durable Okta Set5 = human browser + MFA (headless hint is UI-only)
2. Spark primary model usage_limit → model-collapsed dual pool
3. Aiven free tier, Atlassian bugbounty-test, Auth0 Get-Creds → op (human)
4. H1 Shopify PARTIAL — needs logged-in export
5. No unified `shared/CLAIMS.md` merge yet
6. No live vulns (policy freeze — correct)

## Human click pack

1. Set5 Okta browser login + MFA; tile labels only  
2. Aiven free tier + `@bugcrowdninja`  
3. Auth0 Get Credentials → op only  
4. Atlassian bugbounty-test CAPTCHA  
5. H1 Shopify logged-in export (or Dropbox Inti trial if XOR holds)

## Followups (no human first)

- Always `--root` or fixed wrappers; prefer luna while spark limited  
- Merge claims → `shared/CLAIMS.md`  
- Post-patch isolation gate without `--root` → M01-ISOLATION-GREEN  
- Secret scrub cron on dual-auth-runners/

## Paths

| Role | Path |
|------|------|
| Root | `~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/` |
| SCRIBE | `…/SCRIBE.md` (this file) |
| COMPARE / CONNECTOR | `…/COMPARE.md`, `…/CONNECTOR.md` |
| Gates | `…/shared/GATES-dual.md` |
| Runner A | `…/runner-a/REPORT.md` (+ OKTA-*, l3/, SEKHMET*) |
| Runner B | `…/runner-b/REPORT.md` (+ findings/, AUTH-READINESS, LANE) |
| Wrappers | `~/.xbgst/scripts/sekhmet-{luna,spark}.sh` |
| Action log | `../ACTION-LOG.md` |

## Policy

Recon / auth-readiness only. No secrets in tree. Own/test assets language. OpenAI security-impact only. **Next:** human click pack + claim-lock merge — not more swarm volume.
