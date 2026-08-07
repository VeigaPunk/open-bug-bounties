# CONNECTOR — dual auth bounty runners

**UTC:** 2026-08-07T14:11Z  
**Scope:** `~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/`  
**Axes:** `auth_ready↑` `dual_substrate_up↑` `hunt_throughput↑` `evidence_fidelity↑` `safety_in_policy↑` (+ `secret_hygiene↑`)  
**Poll window:** ~14:06–14:11Z (runner-a/b empty → full artifact trees)

---

# State

- **inf:** Okta Set5 `session_hint=AUTHENTICATED` is a **SPA bootstrap / routing flag**, not a durable researcher session — both shared probe and Runner A form-map agree curl clears `sid`/`xids` (Max-Age=0). Axes: auth_ready, evidence_fidelity, safety_in_policy. **[strong]**
- **inf:** Dual sekhmet **roots** are now isolated after Runner A wrapper patch (`XBRD_SPARK_ROOT` + model set **after** `env.l3-sekhmet.sh`); dual **models** are **not** — live spark pool hits `usage_limit` → `model_fallback_from: gpt-5.3-codex-spark` → effective **gpt-5.6-luna** on spark root. Race is root-diverse, model-collapsed. Axes: dual_substrate_up, hunt_throughput. **[strong]**
- **inf:** Identity stack is a **triple Okta surface** people will conflate: (1) public BC engagement `bugcrowd.com/engagements/okta`, (2) program Get-Creds OIE previews `bugcrowd-pam-###.oktapreview.com`, (3) vaulted Set5 item for **5335**. Auth0 is sibling brand, separate engagement `auth0-okta` + `manage.cic-bug-bounty.auth0app.com`. Axes: auth_ready, evidence_fidelity. **[strong]**
- **inf:** XOR F4/H2 locked by Runner B claim: **DEEP Dropbox Intigriti · PARK GitLab** — FULL fidelity vs STUB; Shopify H1 remains parallel keep-8 depth, not the XOR. Axes: hunt_throughput, evidence_fidelity, safety_in_policy. **[strong]**
- **inf:** Vault hygiene is **labels-only** (op:// + redacted field maps); residual risk is **SPA shell HTML** and swarm NDJSON embedding full task text with field *names* — not values. Axes: secret_hygiene, safety_in_policy. **[medium]**
- **risk:** If operators treat Set5 AUTHENTICATED as “already in” and fire app-tile automation without browser profile + MFA, they either fail closed (good) or scrape residual browser cookies into distill (bad). Condition: human offline + overconfident headless.
- **risk:** Model-collapse under usage_limit means dual-pool “diversity” is **throughput parallelization only** — both runners’ spark tasks write luna reasoning under spark root; quota thrash or false confidence in model A/B tests. Condition: continued j=16+ on spark while codex-spark limited.
- **risk:** Runner B claims titles without unified `shared/CLAIMS.md` merge with A — duplicate TF/policy churn or both deeping Shopify+Dropbox while A burns identity-day. Condition: M06 competitive loop without claim lock SSoT.
- **risk:** ENROLL says OpenAI **joined** while playbook still says defer — OpenAI OOS walls (jailbreak/model) get ignored by a hungry swarm. Condition: L3 task without STOP brief.

---

# Race score

## Mid-race (~14:08–14:09Z)

| Axis | A (Q-BC) | B (Q-FP/H1) | Lead |
|------|----------|-------------|------|
| dual_substrate_up | Dry-run roots correct **after** patch; micro live | Detected isolation miss + `--root` workaround first | **tie → A** (patch ship) |
| auth_ready | Okta HTML shell + vault field map in flight | AUTH-READINESS matrix + XOR decision shipped early | **B** |
| hunt_throughput | Tasks/jsonl staged | Tasks + first live swarm NDJSON | **B** |
| evidence_fidelity | Form map emerging | LANE + CLAIMS titles | **B** |
| safety_in_policy | Policy freeze in tasks | Policy freeze + XOR park | **tie** |

**Mid-race winner: Runner B** — earlier lane docs, XOR lock, auth matrix; A still plumbing substrate.

## Final (reports present, ~14:10–14:11Z)

| Artifact class | Runner A | Runner B |
|----------------|----------|----------|
| REPORT / done stamp | **REPORT.md** (done) | no single REPORT |
| AUTH-READINESS | Q-BC full (Aiven→OpenAI) | F1–F4+H1+XOR matrix (**denser public TF**) |
| Substrate doc | SEKHMET.md + HARVEST + wrapper **patch** | SEKHMET.md (isolation miss + `--root` recipe) |
| L3 swarm products | 4 checklists/runbooks under `l3/` | NDJSON keeps; **1** structured finding plan |
| Findings dir | **0** files | **F3-proton-dual-account.md** (policy plan, no live test) |
| Okta Set5 depth | **OKTA-MAP / FORM-MAP / runbook / op fields** | shared probe only (not lane focus) |
| Claims | none under shared/ | **CLAIMS-runner-b.md** (5 titles) |
| File count (approx) | ~41 | ~20 |
| Secret hygiene | op:// + redacted item; SPA shell deleted post-map | op:// titles only |

### Axis score (final)

| Axis | A | B | Notes |
|------|---|---|-------|
| auth_ready | **8/10** | **7/10** | A owns Set5 map + Q-BC enroll chain; B owns multi-platform readiness but no Set5 depth |
| dual_substrate_up | **9/10** roots · **4/10** models | **7/10** roots (doc+`--root`) · **4/10** models | A fixed wrappers for all callers |
| hunt_throughput | **7/10** | **7/10** | Both live swarm; B finding plan; A more checklist volume |
| evidence_fidelity | **8/10** | **8/10** | spark_ids + HTTP names; B full F3 methodology |
| safety_in_policy | **9/10** | **9/10** | freeze held; no exploit; XOR enforced on B |

**Final winner (composite axes): Runner A — narrow**  
Reasons: (1) **substrate fix benefits both lanes** (shared wrappers), (2) Okta Set5 overfit fully demystified (AUTHENTICATED ≠ session), (3) REPORT + AUTH-READINESS + four L3 checklists close M04.  
**Runner B runner-up / parallel co-win on hunt content:** XOR decision + AUTH-READINESS matrix + only `findings/` artifact — better pure “what to hunt next” package for Q-FP/H1.

**Neither** produced live vulnerability evidence (correct under freeze). Score is **auth-race / readiness-race**, not severity theater.

---

# Unusual connections (cross-link)

1. **Okta Set5 PAM vs public Okta BB**  
   - Public: `bugcrowd.com/engagements/okta` + press “Okta partners with Bugcrowd”.  
   - Private research org: `bugcrowd-pam-5335.oktapreview.com` + admin host `…-admin.oktapreview.com`.  
   - Vault title “Bugcrowd Org (Set 5) Okta” is **preview tenant for program labs**, not login.hackers.bugcrowd.com and not customer Okta.  
   - Connector rule: never mix Set5 creds into BC platform item; never test customer `*.okta.com`.

2. **AUTHENTICATED signal irony**  
   Shared probe celebrated `session_hint=AUTHENTICATED`; Runner A proved unauth curl still lands UserHome shell and **clears** session cookies. PLAN overfit “session may be live” is **false for headless**; true only for profile browser. Update mental model: **hint is UI, not authz**.

3. **Dual sekhmet isolation risks**  
   - Pre-patch: both wrappers wrote **default** `/run/user/1000/xbrd-spark` → state collision + false dual-model.  
   - Post-patch: roots diverge; **spark model falls back to luna** (`usage_limit`) → A/B reasoning identical under two roots.  
   - B’s early dry-run docs the miss; A’s patch is the fix — **B diagnosis + A surgery**. Live B swarm still used `--root` and saw `model_fallback_from` on spark tasks.  
   - Second-order: “competitive models” narrative fails until codex-spark quota recovers; keep roots for **job isolation / gc**, not model science.

4. **XOR F4/H2 as keep-8 throttle**  
   B claims DEEP F4 Dropbox Inti → GitLab STUB. H1 Shopify is **orthogonal** (not slot-8). Connector: if A burns human time on Atlassian site create while B burns human on Dropbox trial + Shopify store, **human click budget is the real bottleneck**, not sekhmet j=64.

5. **Vault structure asymmetry**  
   - Set5 Okta: standard `username`/`password` purposes (mapped).  
   - H1: `user[password]` field id.  
   - Inti: `Input.Username` / `Input.Password`.  
   Scripts that assume uniform field labels **will fail closed** (good) or tempt plaintext dumps (bad). Prefer `op item get` field list then `op://` by id.

6. **Auth0 vs Okta “identity-day”**  
   A sequences Auth0 **then** Okta (same day). Surfaces differ: Auth0 BB manage host vs Okta preview orgs. Shared brand ownership ≠ shared auth plumbing. Cross-tenant focus on Auth0 is not transferable to Set5 SPA tile map without Get Creds dual orgs.

7. **Proton finding vs Q-BC instance wall**  
   B can write high-fidelity dual-account **plans** with only free Proton accounts (no platform join). A is blocked on human free-tier (Aiven/Atlassian) before first own-asset probe. Throughput asymmetry under freeze: **first-party dual-account programs outrun BC instance-gated programs**.

8. **okta-login.htm lifecycle**  
   Present mid-poll (~6.3KB SPA shell), **absent** by final inventory — good hygiene. Connector: any re-probe should land under `tmp-sanitize-logs/` with TTL, never `runner-a/` long-term if git tracks tree.

---

# Dissent

- **Throughput-maximalists** will score **B** final winner (finding file + XOR + earlier matrix). Connector weights **shared substrate fix + Set5 demystification** higher because they unblock both lanes and prevent false-auth automation.  
- **Model-diversity purists** will call dual_substrate_up **fail** until spark model sticks; roots-only isolation is “half green.” Accurate for diversity axis; wrong for crash-isolation axis.  
- **Exploit-hungry roles** will underrate both runners (no live bugs). Policy freeze makes that metric OOS.  
- **Planner residual** still lists wrapper isolation as open risk; A’s REPORT claims fixed — dissent until B re-runs dry-run **without** `--root` and shows dual roots in provenance (post-patch verification not yet stamped on B artifacts).

---

# Rationale (strange angle)

The race was never “who finds a bug first.” It was **who collapses false certainty**. The strongest cross-axis pattern: **signals that look like wins are traps** — AUTHENTICATED without cookies, dual wrappers without dual roots, dual roots without dual models, ENROLL joined without instance, FULL program brand without FULL H1 asset export. Runner A demolished the Set5 trap and fixed the root trap; Runner B demolished the slot-8 thrash trap (F4 vs H2) and wrote the multi-portal readiness trap map. Optimal next state is **not more swarm volume** — it is **human click budget on the two highest-leverage instance gates** plus **claim-lock merge** so dual j=64 does not duplicate policy recon.

---

# Five high-leverage next moves

| # | Move | Axes improved | Human? |
|---|------|---------------|--------|
| 1 | **Post-patch isolation gate:** re-run `echo '[]' \| sekhmet-{luna,spark}.sh swarm --dry-run -j 2` **without** `--root`; require provenance `root` ∈ `{xbrd-spark-luna,xbrd-spark-spark}` and write `shared/M01-ISOLATION-GREEN.md`. Update B SEKHMET.md stale “env miss”. | dual_substrate_up↑ evidence_fidelity↑ | **No** |
| 2 | **Unified claim lock:** merge `CLAIMS-runner-b.md` → `shared/CLAIMS.md`; add A claims (Set5 map done, Aiven checklist done, OpenAI security-impact only). Block duplicate TF on same engagement. | hunt_throughput↑ evidence_fidelity↑ | **No** |
| 3 | **Spark usage_limit strategy:** until codex-spark quota returns, route **all** live recon to **luna** pool; keep spark root only for isolated job dirs **or** idle. Avoid double-billing both pools for same luna work. Optional: probe `codex` usage status. | hunt_throughput↑ dual_substrate_up↑ (honest) | **No** (status check); quota reset may need **human** account |
| 4 | **Secret/HTML hygiene gate (M07):** `rg` for cookie values / `password=` / expanded secrets; ensure no SPA shell left in tree; append dual-auth row to `../ACTION-LOG.md`; write `shared/GATES-dual.md`. Delete or gitignore any future `*.htm` probes. | secret_hygiene↑ safety_in_policy↑ evidence_fidelity↑ | **No** |
| 5 | **Human click pack (single offline session):** (a) browser profile login Set5 via 1Password + MFA Super Admins; map tiles labels only; (b) copy Auth0/Okta Get Creds → op if still in BC modal; (c) Aiven free dual `@bugcrowdninja`; (d) Shopify `wearehackerone` store **or** Dropbox Inti trial (not both if click-poor — prefer F4 if XOR holds). | auth_ready↑ hunt_throughput↑ | **Yes — human** |

---

# Artifact index (connector inputs)

| Path | Role |
|------|------|
| `PLAN-r0.md` | dual plan SSoT |
| `shared/{OKTA-SET5-PROBE,SUBSTRATE,VAULT-INVENTORY,TF-BC-OKTA-SEARCH,CLAIMS-runner-b}.md` | shared state |
| `runner-a/{REPORT,SEKHMET,AUTH-READINESS,OKTA-MAP,OKTA-FORM-MAP,l3/*}.md` | A final |
| `runner-b/{LANE,AUTH-READINESS,SEKHMET,findings/F3-proton-dual-account}.md` | B final |
| `~/.xbgst/scripts/sekhmet-{luna,spark}.sh` | patched dual roots |

**Poll note:** runner dirs empty at 14:06Z; by 14:10Z both lanes complete primary offline loop. No further silent wait required for connector ship.

---

**Return path:** `/home/vgpnk1337/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/CONNECTOR.md`
