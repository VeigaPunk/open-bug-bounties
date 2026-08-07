# F1 — Google VRP first-target pick (authz/IDOR)

**UTC:** 2026-08-07 · **Runner:** B · **Mode:** policy-safe recon only · **No live exploit**  
**Parent map:** `findings/F1-google-authz-map.md` · **AUTH:** `AUTH-READINESS.md` F1 HIGH  
**Submit:** https://bughunters.google.com/  
**Rules:** https://bughunters.google.com/about/rules/google-friends/google-and-alphabet-vulnerability-reward-program-vrp-rules

## Axes

| Axis | Intent |
|------|--------|
| auth_ready↑ | Dual own Google accounts; one product; clear A/B ownership |
| evidence_fidelity↑ | Map object IDs + share ACL only from own traffic |
| safety_in_policy↑ | Own assets; OOS traps listed; no appspot/customer data |
| hunt_throughput↑ | Single product first 2h — avoid multi-surface scatter |

## Decision: first product = **Google Drive** (share / ACL boundary)

| Option | Why ranked | Pick |
|--------|------------|------|
| **Drive (Docs file private object + share)** | IT1 sensitive user data; share revoke residual access; clear dual-account A/B; high clarity S2* mapping | **PRIMARY** |
| Keep notes object IDOR | Smaller surface; good secondary if Drive map clean | Secondary |
| Photos share links | Similar ACL class; more client/CDN noise | Tertiary |
| Gmail attachment IDs | Higher complexity / mail abuse risk if mis-aimed | Park for later |
| Workspace admin escalation | Needs trial Workspace; higher setup cost | Park until personal dual-account scored |

**Rationale:** Drive private file + intentional share vs non-share is the cleanest dual-owned-account authz class under main VRP rules (authn/authz flaws in-scope). Object identifiers appear in normal UI/network without requiring third-party apps or customer appspot hosts.

## Severity / reward class (policy map only)

- Class: logic / authorization / IDOR ≈ **S2a–S2c** × domain tier (T0/T1 vs T2).
- Information tier: private Drive content ≈ **IT1** (not credentials/ATO unless proven).
- Quality multiplier **0.8 / 1.0 / 1.2** — complete repro, ownership matrix, impact narrative.
- Do **not** claim Critical ATO without credential/session impact.

## Account prep (human)

1. **Account A (owner/victim):** personal Google account; create private Drive file with synthetic label `idor-test-a-owned-doc`.
2. **Account B (attacker/non-owner):** second personal Google account; separate browser profile/container.
3. Optional control: grant B view-only on a *different* file so intended-share baseline is known.
4. Never use other users’ data, org production, or customer appspot apps.
5. Bug Hunters login ready for eventual submit (no report until valid finding).

## First 2h plan (design only — no payloads in this distill)

1. Login A → create private Doc/file; note file/resource IDs from own DevTools (redact later).
2. Map share UI: list permissions, add/remove share, link-sharing modes **as owner only**.
3. Login B → document that private file is not listed; no automated ID guessing at scale.
4. **Later human session only:** single-object cross-account authorization checks (B-authenticated request vs A-owned ID). Prefer one-request probes; no mass enumeration, no DoS.
5. Expected secure: B gets denial; no content/metadata leak for private objects.
6. Reportable only if B can read/modify/share A private object without grant — with full A/B ownership matrix.

## Hard OOS / stop (do not open)

- `*.appspot.com`, `*.bc.googleusercontent.com` customer-hosted apps  
- Sandbox XSS on `*.googleusercontent.com` without sensitive impact  
- URL redirect alone, logout CSRF, pure open redirect  
- User enumeration without rate-limit proof  
- High-volume auto traffic / scanners  
- Third-party Google-branded vendors without WHOIS ownership proof  
- Cloud product issues → **Cloud VRP**, not main VRP  
- Acquisition products inside **6-month blackout**

## Same-day re-verify before any test

- [ ] Live VRP rules reward table unchanged for S2*  
- [ ] Product is Google-owned main VRP domain (`drive.google.com` / Docs under Google)  
- [ ] Not Cloud VRP-only product  
- [ ] Dual accounts both researcher-owned  
- [ ] Freeze: no exploit automation under dual-auth race policy freeze  

## Deliverable if finding later

Subject pattern: `Authorization failure in Google Drive allows Account B to [read|modify|share] Account A private file`

Minimum: summary, A/B setup, steps, expected/actual, redacted request/response, impact, own-data attestation.

## Status

**FIRST TARGET LOCKED: Google Drive share/ACL + private object authz (dual own accounts).**  
No live exploit performed. Policy recon expansion of F1 map only.
