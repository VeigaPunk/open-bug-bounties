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

- Passive H1 Shopify HTTP: `auth/H1-SHOPIFY-PASSIVE.md`

- F2 MSRC passive portals: `auth/F2-MSRC-PASSIVE.md`

- F3 Proton passive product map: `auth/F3-PROTON-PASSIVE.md`

- F1 Google VRP passive portals: `auth/F1-GOOGLE-PASSIVE.md`

- F4 Dropbox API passive HTTP: `auth/F4-DROPBOX-HTTP.md`

### H2 GitLab — PULSE-21 doors (passive)
- Unauth curl: `sign_in` **403** (browser UA/challenge), `sign_up` **200**, OIDC discovery **200**.
- API: `/api/v4/user` + `/version` **401**; public `projects` list **200**.
- OAuth authorize/token → sign_in → **403** under this UA.
- H1 `hackerone.com/gitlab` **200** public shell; still need logged-in asset export for FULL fidelity.
- Artifact: `auth/GITLAB-AUTH-DOORS.md`

### F4 / Intigriti — PULSE-23 platform doors
- Public shells: `app.intigriti.com/auth/login`, `/login`, `/programs`, Dropbox detail **200**.
- Auth gate: `/researcher` → `login.intigriti.com/connect/authorize` (OIDC-style).
- API: bare/core **404**; `external/researcher` **400** unauth (endpoint exists, needs session).
- Artifact: `auth/INTI-PLATFORM-AUTH-DOORS.md` — still need human Inti join + @intigriti.me for F4 deep.

### H1 platform — PULSE-25 doors
- Curl: sign_in/sign_up **403** (challenge); directory/programs & opportunities **200**.
- API: bare **200**; `/v1/hackers/me` and `/programs` **401** unauth.
- Program shells Shopify/GitLab still **200** public.
- Artifact: `auth/H1-PLATFORM-AUTH-DOORS.md` — browser session still required for asset export.

### F2 MSRC — PULSE-27 MS identity doors
- Public: `login.microsoftonline.com` OIDC discovery + authorize shell **200**.
- Graph `/me` **401** unauth; portals Azure/Entra/admin **200** SPA shells.
- Bounty policy: msrc bounty + online-services **200**.
- Artifact: `auth/MS-IDENTITY-AUTH-DOORS.md` — still need own tenant + MSRC profile for live.

### F1 Google VRP — PULSE-29 doors
- Portal: bughunters home/report/VRP rules **200**; short links → bughunters.
- Product shells Drive/Docs/Mail → Google accounts login.
- OAuth userinfo **401** unauth.
- Artifact: `auth/GOOGLE-VRP-AUTH-DOORS.md`

### F3 / Inti — PULSE-41 path refresh
- F3 SSoT still `proton.me/security/bug-bounty` **200**; bare security/support paths **404**.
- Dual free doors: account login+signup **200**.
- Inti: researcher → OIDC authorize; Dropbox program detail **200**; API bare **404**.
- Artifact: `auth/PROTON-INTI-PATH-REFRESH.md`

### F1 / H1 — PULSE-44 path refresh
- Bughunters home/report/VRP rules **200**; appsecurity.google.com **ERR** this tick.
- H1: sign_in/up **403** curl; Shopify/GitLab shells **200**; hackers API **401**.
- Artifact: `auth/GOOGLE-H1-PATH-REFRESH.md`

### F2 / F4 — PULSE-46 path refresh
- MSRC policy pages **200**; portal researcher/report **404** (re-locate submit UI).
- Dropbox: login/register **200**; BB via Inti program detail; first-party /bug-bounty **404**.
- Artifact: `auth/MSRC-DROPBOX-PATH-REFRESH.md`

### F2 MSRC — PULSE-47 submit recovery
- Submit UI: `msrc.microsoft.com/report` and `/report/vulnerability/new` **200**.
- Portal root still update-guide only; old portal/en-us report paths stay **404**.
- Artifact: `auth/MSRC-SUBMIT-PATH-RECOVERY.md` — profile-on-submit still likely.

### H1 Shopify / H2 GitLab — PULSE-49
- H1 Shopify + criteria **200**; admin root **403**; partners signup **200** this tick.
- GitLab H1 shell **200**; sign_in **403**; still PARK under XOR vs F4.
- Artifact: `auth/SHOPIFY-GITLAB-PATH-REFRESH.md`

## PULSE-51 (2026-08-07T16:02Z)
- H1-SHOPIFY-OAUTH-PASSIVE: accounts+lookup+admin 200; partners/orgs OAuth bounce; identity 404.
- H1 oauth → sign_in 403 curl; api me 401.
- GitLab oauth → sign_in; v4/user 401.
- Still human: H1/Shopify sessions; no automated creds.

## PULSE-53 (2026-08-07T16:06Z)
- INTI-DROPBOX-OAUTH-P53: Inti app bare→www; Dropbox OAuth missing_client_id; program shells 200.
- API gates unchanged 404/400. Human: Inti+Dropbox sessions.

## PULSE-55 (2026-08-07T16:10Z)
- GOOGLE-VRP-OAUTH-P55: VRP shells 200; rules id drift; OAuth userinfo 401; appsecurity host err.
- Human Google account still required for report auth paths.

## PULSE-57 (2026-08-07T16:14Z)
- MSRC-ENTRA-DOORS-P57: portal host consolidates to msrc.microsoft.com; Entra OIDC + Graph gates.
- MSA/AAD human only.

## PULSE-59 (2026-08-07T16:18Z)
- H1-GITLAB-DOORS-P59: H1/GitLab curl gates stable; BC /h gitlab SSoT; version 401 this tick.
- XOR H2 park vs F4 Dropbox unchanged; sessions human.

### H1 Shopify — PULSE-61 door refresh
- accounts.shopify.com root/lookup/signup **200**; login→lookup.
- admin root **200**; /store **403**.
- partners orgs/signup OAuth bounce (scopes openid+org+shop.create).
- H1 shopify shell **200**; sign_in **403** curl; API me **401**.
- BC /h/engagements/shopify **200** (bare 404). Artifact: `SHOPIFY-H1-OAUTH-P61.md`
- Still human: H1 + own store; no automated creds.

### F4 Dropbox/Inti — PULSE-63 door refresh
- app root 307→www; detail 200; login IdP 200.
- Dropbox BB path 404; OAuth missing_client_id; API 404/400.
- BC dropbox shells 200 — join still Inti. Artifact: `INTI-DROPBOX-DOORS-P63.md`
- XOR H2 park unchanged; sessions human.

### F2 MSRC/Entra — PULSE-65 door refresh
- Submit SSoT /report + /vulnerability/new 200; en-us paths 404.
- portal collapsed; OIDC+Graph gates; OBB policy 200.
- Artifact: `MSRC-ENTRA-DOORS-P65.md` — MSA/AAD human.

### F1 Google VRP — PULSE-67 door refresh
- bughunters report+rules 200; appsecurity ERR; OAuth gates.
- Artifact: `GOOGLE-VRP-DOORS-P67.md` — dual own accounts human.

### F3 Proton — PULSE-69 door refresh
- BB SSoT /security/bug-bounty 200; account login/signup 200; H1/BC not join SSoT.
- Artifact: `PROTON-F3-DOORS-P69.md` — dual free human.

### H1 / GitLab — PULSE-71 door refresh
- H1 sign_in/up still **403** curl; password/new + directory/opportunities **200**; shopify+gitlab SPA shells **200**.
- Bare SSO paths `users/auth/google_oauth2` + `github` **404** this tick.
- API me/programs **401**; docs /en/ **200**.
- GitLab OIDC+JWKS **200**; sign_up **200**; api v4 user/version **401**; public projects **200**.
- BC **/h/engagements/gitlab** + brief **200** (soft); bare + programs **404**.
- Artifact: `H1-GITLAB-DOORS-P71.md` — H2 park; H1 Shopify session human.
