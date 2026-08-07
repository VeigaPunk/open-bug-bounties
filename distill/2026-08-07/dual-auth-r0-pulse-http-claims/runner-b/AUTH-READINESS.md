# AUTH-READINESS — Runner B (F1–F4 + H1 Shopify + XOR)

**UTC:** 2026-08-07 · **Sources:** local `scopes/*` (FIDELITY tags) + TinyFish search/fetch (public policy) · **No secrets**  
**Policy freeze:** readiness + fidelity maps only; own assets after same-day brief.

## Platform vault (refs only)

| Need | Ref / note |
|------|------------|
| HackerOne session | `op://Personal/HackerOne/…` — titles only; browser profile preferred |
| Intigriti session | `op://Personal/Intigriti/…` |
| TinyFish | `op://Personal/TinyFish API/credential` |
| Secrets in distill | **None** |

## Matrix

| ID | Program | Portal / submit | Platform auth | Researcher profile | Test account prep | Scope fidelity | Auth-ready score | Blockers | First 2h class (policy) |
|----|---------|-----------------|---------------|--------------------|-------------------|----------------|------------------|----------|-------------------------|
| **F1** | Google VRP | bughunters.google.com report form | Google/Bug Hunters **ready** | Account for submit | Dual **own** Google accounts | **FULL** | **HIGH** | Pick one product; avoid appspot/customer | Authz/IDOR (S2a–c) on own data |
| **F2** | MSRC Online Services (OBB) | msrc.microsoft.com | Public policy readable | **needs_profile_on_submit** | Own Entra/M365 tenant; name with **MSOBB** if possible | **FULL** | **MED–HIGH** | Profile on first report; Critical/Important bar | Cross-user/tenant authz on own tenant |
| **F3** | Proton Bug Bounty | proton.me/security/bug-bounty (email) | n/a platform join | Report channel per page | Dual free proton.me accounts | **FULL** | **HIGH** | Email report path only | Own→own IDOR Mail/Drive/API |
| **F4** | Dropbox | Intigriti program `dropbox/dropbox` | **Inti authed** | Join program | Free trial + **@intigriti.me**; UA + `X-Intigriti-Username`; ≤5 rps | **FULL** | **HIGH** if join | Billing trial hygiene; hard **XOR H2** | API/web authz own files/shares |
| **H1** | Shopify | **H1** hackerone.com/shopify | **H1 authed** | Handle email | Store(s) via `HANDLE@wearehackerone.com` only | **PARTIAL** (H1 assets need login dump) | **MED** until H1 asset export | SPA shell unauth; never Support for bounty | Staff/role authz + API on **own** stores |
| **H2** | GitLab | H1 | H1 authed | — | Own group/project | **STUB** | **LOW** until export | Login required full scope | Park if F4 deep |

## TinyFish grounding (public URLs)

| Topic | Key URL | Signal |
|-------|---------|--------|
| Google VRP rules | https://bughunters.google.com/about/rules/google-friends/google-and-alphabet-vulnerability-reward-program-vrp-rules | Authz flaws in-scope; domains; OOS customer appspot; reward table incl. IDOR/S2* |
| MSRC Online Services | https://www.microsoft.com/en-us/msrc/bounty-online-services | M365/online endpoints; own-tenant testing |
| MSRC hub / In Scope by Default | https://www.microsoft.com/en-us/msrc/bounty · blog 2025-12 | Online-services impact eligibility expansion narrative |
| Proton | https://proton.me/security/bug-bounty | Max USD 100k; first-party program |
| Shopify criteria | https://www.shopify.com/uk/bugbounty/criteria · /bugbounty | Own stores only; max $200k; N/A classes |
| Dropbox Intigriti | https://app.intigriti.com/programs/dropbox/dropbox/detail | Public BB; Tier1 includes api.dropbox.com |

## Program-specific readiness notes

### F1 Google VRP — authz/IDOR guidance
- **Authorized:** design/impl issues affecting confidentiality/integrity; explicit examples include **authentication or authorization flaws**.
- **IDOR class:** maps to logic/direct object reference bands (S2a–S2c) × domain tier; quality ×0.8–1.2.
- **Hard OOS:** `*.appspot.com` / `*.bc.googleusercontent.com` customer apps; sandbox XSS without sensitive impact; enumeration without rate-limit proof.
- **Auth ready:** dual own accounts + one high-clarity product (e.g. Drive/Keep-style private object IDs) — **no** third-party merchant data.

### F2 Microsoft MSRC OBB
- Test **only tenants/accounts you own**; include **MSOBB** in naming when possible (local scope + policy culture).
- Online services list (office/teams/sharepoint/onedrive portals) from program page — re-verify live.
- **Auth ready gap:** MSRC researcher profile at submit time (ACCOUNTS: needs_profile_on_submit).
- **2025 “In Scope by Default”** expands eligibility narrative for online-service impact — still obey RoE and severity bar.

### F3 Proton
- First-party; **not** H1 primary. Max **$100k**.
- Free dual accounts sufficient for web/mail/drive/calendar authz classes.
- **Auth ready:** create dual accounts + bookmark report channel; no platform join friction.

### H1 Shopify (ACTIVE keep-8)
- Submit **only** via HackerOne Shopify.
- **Eligibility:** test stores created with `YOURHANDLE@wearehackerone.com`; never other merchants.
- Public bands: up to **$200,000**; Critical **$90k–$200k** (first-party).
- **Auth ready gap:** export live H1 scope/assets while session warm (PARTIAL fidelity).
- Hard N/A: many XSS/CSRF/CDN/self classes; GraphQL introspection intentional; third-party apps no bounty.

### F4 Dropbox Intigriti
- Open public program; tiers to **$15k** Tier1; stats: hundreds accepted historically.
- Required: **@intigriti.me**, UA `Intigriti - <user> - …`, header `X-Intigriti-Username`, **≤5 req/s**.
- Tier1 assets include dropbox.com, api.dropbox.com, HelloSign, dash.ai.
- OOS signal: `replay.dropbox.com`, dropboxusercontent XSS, session-24h design.

## XOR decision recommendation (slot-8)

| Option | Fidelity | Auth prep cost | Skill fit (web authz) | Collision risk | Decision |
|--------|----------|----------------|----------------------|----------------|----------|
| **Deep F4 Dropbox Inti** | **FULL** | Low (free trial + Inti headers) | High (API/share IDOR) | High if also H2 | **CHOOSE** |
| Deep H2 GitLab | **STUB** | Med (H1 export + instance) | High once scoped | XOR | **PARK** |
| Neither deep | — | — | — | wastes slot | Reject |

**Recommendation: DEEP F4 · PARK H2**  
Axes: `evidence_fidelity↑` (FULL vs STUB), `auth_ready↑` (Inti already authed + free trial path), `hunt_throughput↑` (no waiting H1 SPA export for slot-8).  
Revisit H2 only after F4 first-2h scored or F4 abandoned.

## Ordered auth prep checklist (human / browser)

1. **H1 Shopify:** while session live → export policy/assets → create `wearehackerone` store(s).  
2. **Google:** confirm Bug Hunters login → dual test accounts → product pick.  
3. **Proton:** dual free accounts + report URL bookmarked.  
4. **MSRC:** create free M365/dev tenant labeled MSOBB; plan portal login; profile at first submit.  
5. **Dropbox Inti:** join program → free trial → set Intigriti UA/header.  
6. **GitLab:** do **not** deep until XOR re-open.

## Safety

- No live exploit under freeze.  
- No other-user data access.  
- No secret material in this file (op:// titles only).
## Tick artifacts

- Passive F4 prep: `auth/F4-DROPBOX-PASSIVE.md` (policy recon only).
- Shared HTTP: `../shared/PULSE-HTTP.md`.
