# Q-BC AUTH-READINESS — Runner A

**Date:** 2026-08-07  
**SSoT enroll:** `../../ENROLL.md` (all five **joined**)  
**Policy freeze:** recon + enroll readiness + auth maps only; no live exploit of third-party prod.  
**TinyFish:** public search used for engagement URLs / ninja email docs (no secret fetch).

## Rollup

| Program | BC join | Instance / creds readiness | Auth map fidelity | Blocker for first probe |
|---------|---------|----------------------------|-------------------|-------------------------|
| **Aiven** | joined | free tier + `@bugcrowdninja` **pending human** | FULL scope+playbook | create free project; dual ninja accounts |
| **Auth0** | joined | Get Creds → **1Password only** (modal may still need copy) | FULL | vault researcher tenants; never prod manage.auth0.com |
| **Okta** | joined | Get Creds dual OIE; Set5 URL mapped | FULL + Set5 shell map | human click-path + MFA; headless not durable |
| **Atlassian** | joined | `bugbounty-test-<user>.atlassian.net` **pending** | FULL | create named cloud site + dual user |
| **OpenAI** | joined | TAC verified (notes); personal/ninja | FULL + OOS walls | **security-impact only**; re-read STOP; no jailbreaks |

## Per program

### Aiven (`aiven-mbb-og` only — bare `/aiven` 404)

- **URLs:** https://bugcrowd.com/engagements/aiven-mbb-og · console https://console.aiven.io/ · API https://api.aiven.io/
- **Auth:** `Authorization: aivenv1 <token>` (not cookie session alone).
- **Email:** `@bugcrowdninja.com` only (docs.bugcrowd.com ninja alias).
- **Human:** free tier/trial, **no credit card**; PostgreSQL + Kafka own services.
- **First class (after instance):** dual-account project/ACL/IDOR; Kafka governance; avoid marketing dupe XSS.
- **Forbidden:** other customers’ `aivencloud.com`, scanners, DoS.
- **L3:** `l3/checklist-aiven.md`

### Auth0 by Okta (`auth0-okta`)

- **Researcher env only:** `https://manage.cic-bug-bounty.auth0app.com/`
- **Creds:** Bugcrowd Get Credentials → 3 users / 3 tenants → **op vault**, not git.
- **Rate:** ≤5 rps Intruder; no scanners.
- **First class:** cross-tenant authz; Mgmt API role boundary; FGA if entitled.
- **Forbidden:** manage.auth0.com / customer prod.
- **L3:** `l3/checklist-identity-day.md`

### Okta (`okta`)

- **Preview pattern:** `bugcrowd-pam-###.oktapreview.com` + admin host; Set5: **5335** mapped (see `OKTA-MAP.md`).
- **Creds:** Get Credentials dual orgs; change emails; ≥2 Super Admins; **enforce MFA**.
- **Rules:** no automated scanners; no Workflows automation/DoS; Classic OOS.
- **Vault:** `op://Personal/Bugcrowd Org (Set 5) Okta/{username,password}`
- **L3:** `l3/runbook-okta-set5.md` + identity-day checklist.

### Atlassian (`atlassian`)

- **Site naming:** `bugbounty-test-<bugcrowd-username>.atlassian.net` **only**.
- **Email:** `@bugcrowdninja.com`.
- **Human:** create site; add Jira/Confluence; second ninja for authz matrix; Bitbucket ninja signup.
- **First class:** project/space permission bypass; share links; admin.atlassian.com; Bitbucket workspace IDOR (owned).
- **Forbidden:** customer sites, marketplace 3P (except listed), scanners/DoS.
- **L3:** `l3/checklist-atlassian-openai.md`

### OpenAI (`openai`)

- **Join:** done; TAC cyber path noted in ENROLL/notes.
- **Hard OOS:** jailbreaks, model safety, in-sandbox “RCE” without escape evidence.
- **In-scope focus:** web/API authz, XSS/CSRF, data exposure, plugin **you** create, Codex sandbox escape under default policy.
- **API keys found:** official form only — **not** Bugcrowd; never store `sk-` in distill.
- **Playbook drift:** `playbooks/openai.md` still says defer — **prefer ENROLL joined** + same-day brief; keep security-impact discipline.

## Vault refs (labels only)

See `../shared/VAULT-INVENTORY.md`:

- Bugcrowd Org (Set 5) Okta username/password
- Bugcrowd platform
- TinyFish API credential (for public search automation)
- H1 / Inti titles listed (Runner B primary)

## Recommended order (when human online)

1. Copy Auth0/Okta Get Creds → 1Password (if modal pending).  
2. Aiven free tier dual ninja.  
3. Okta Set5 browser login + MFA enforce.  
4. Atlassian `bugbounty-test-*` site.  
5. OpenAI only security-impact with brief re-read.

## TinyFish public hits (titles)

- Aiven MBB: https://bugcrowd.com/engagements/aiven-mbb-og  
- @bugcrowdninja docs: https://docs.bugcrowd.com/researchers/participating-in-program/your-bugcrowdninja-email-address/  
- Auth0 engagement: https://bugcrowd.com/engagements/auth0-okta  
- Atlassian engagement: https://bugcrowd.com/engagements/atlassian  
- Prior Okta TF: `../shared/TF-BC-OKTA-SEARCH.md`

## Tick artifacts

- Admin/platform passive OIDC: `BC-OKTA-ADMIN-PASSIVE.md`

- Aiven passive HTTP/API boundary: `AIVEN-PASSIVE-HTTP.md`

- OpenAI/Atlassian passive: `OPENAI-ATLASSIAN-PASSIVE.md`

- Auth0 + dual OIDC discovery: `AUTH0-OIDC-PASSIVE.md`

## PULSE-52 (2026-08-07T16:04Z)
- AUTH0-CIC-PASSIVE-P52: manage→auth0 OIDC; CIC manage→config.cic authorize; bare cic ERR.
- login/u/login 404; signup+docs 200; RD→bugcrowd.com/auth0-okta.
- Human still: free Auth0 tenant; no Set5/creds in distill.

## PULSE-54 (2026-08-07T16:08Z)
- AIVEN-API-DOORS-P54: console shells 200; API me/project/userinfo 401; BC /h SSoT.
- Free-tier console still human; no API token in distill.

## PULSE-56 (2026-08-07T16:12Z)
- ATLASSIAN-OPENAI-DOORS-P56: id 202; BC shells 200; OpenAI platform/login 403; api 421.
- Human free Atlassian/OpenAI still required.

## PULSE-58 (2026-08-07T16:16Z)
- BC-OKTA-PLATFORM-P58: sign_in path drift 404; hackers→identity/login/hacker; dual OIDC 200.
- Okta BB still BC SSoT; free Okta human; no Set5 in distill.

## PULSE-60 (2026-08-07T16:20Z)
- QBC-ENGAGEMENT-SHELLS-P60: full bare-vs-/h matrix; /h universal SSoT; programs/* dead.
- Join/enroll still human per engagement policy.

### Auth0/CIC — PULSE-62 door refresh
- manage → /login → auth0.auth0.com authorize; CIC → config.*.auth0app.com authorize.
- RD policy URL → BC auth0-okta; blog RD **404**.
- Bare auth0/okta-auth0 still 404; /h soft-200; auth0-okta 200.
- Artifact: `AUTH0-CIC-DOORS-P62.md` — Get Creds still human.

### Aiven — PULSE-64 door refresh
- console login/signup 200; API me/project 401; /h aiven SSoT.
- bare engagements/programs 404; tracker→sign_in.
- Artifact: `AIVEN-API-DOORS-P64.md` — free-tier human.

### Okta — PULSE-66 door refresh
- First-party BB 404; BC okta+auth0-okta 200; sign_in→identity researcher hint.
- Artifact: `OKTA-PRODUCT-DOORS-P66.md` — enroll human.

### Atlassian/OpenAI — PULSE-68 door refresh
- BC SSoT both programs; id 202; api.openai 421/401; first-party BB 404.
- Artifact: `ATLASSIAN-OPENAI-DOORS-P68.md` — enroll human.

### BC platform — PULSE-70 OIDC/docs refresh
- sign_in→identity researcher; login.hackers→/login/hacker; OIDC 200.
- ninja-email + api getting-started SSoT. Artifact: `BC-PLATFORM-OIDC-P70.md`
