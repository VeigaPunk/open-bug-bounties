# HUNT-NOW — three parallel queues (keep-8; r3 hygiene)

**Assumes:** Bugcrowd **authed** + HackerOne **authed** + Intigriti **authed**.  
**Mode:** Policy-ready first 2h web classes. **No** active exploitation in distill.  
**Skipped:** YesWeHack, ExpressVPN, OUTSCALE, Aikido (deferred).  
**Date:** 2026-08-07 **r3 hygiene**  
**Membership SSoT:** [ROI.md](ROI.md) keep-8 · [HUNT-PLAN.md](HUNT-PLAN.md) · `playbooks/` · `scopes/` with **FIDELITY** tags

Axes: `roi_per_hour↑` `effort↓` `payout_fit↑` `skill_fit_web↑` `safety_in_policy↑` `evidence_fidelity↑`

## Q-BC (sequential — ACTIVE only)

| # | Status | Act | Why | Open |
|---|---|---|---|---|
| B1 | **ACTIVE** | **Aiven** Join `aiven-mbb-og` → free tier + `@bugcrowdninja` → console/API authz own project | FULL scope; published P1 bands | BC engagement |
| B2 | **ACTIVE** | **Identity-day** Auth0 then Okta Get Credentials | One day, not two keep slots | BC auth0-okta + okta |
| B3 | **ACTIVE** | **Atlassian** `bugbounty-test-*` | Dense SaaS | BC atlassian |
| B4 | **JOINED** | OpenAI | Joined via Canary; **security-impact only** (model/jailbreak OOS) | BC openai — read STOP sections before any test |

## Q-FP (parallel with Q-BC — start same morning)

| # | Act | Why | Open |
|---|---|---|---|
| F1 | **Google VRP** one product authz/IDOR | Highest first-party clarity | bughunters + scopes/google-vrp |
| F2 | **Microsoft MSRC** MSOBB tenant web authz | Cloud family ceilings public | scopes/microsoft-msrc |
| F3 | **Proton** Mail/Drive/API own → email report | Max $100k; FULL extract | proton.me/security/bug-bounty |
| F4 | **Dropbox Intigriti** free trial authz | FULL extract; **hard XOR slot-8** — deep F4 ⇒ skip H2 | Inti + playbooks/dropbox-intigriti.md |

## Q-H1 (keep-8 depth only)

| # | Status | Act | Why | Open |
|---|---|---|---|---|
| H1 | **ACTIVE** | **Shopify** FP about/criteria/rewards → submit H1 | $200k; PARTIAL fidelity | shopify-h1 scope |
| H2 | **ACTIVE hard XOR F4** | **GitLab** only if F4 not deep | STUB until login export; never F4+H2 both deep | H1 session required |
| — | **STUB park DEFER** | Stripe / Cloudflare / 1Password | ROI defer; not week slots | Do not peer-queue |

## Rules

1. Prefer **FULL** fidelity scopes for first authenticated tests.  
2. **STUB** = export policy in browser before claims or deep recon.  
3. Own assets only; no YesWeHack this wave.  
4. One solid report > five noise tickets.  
5. Linear Aiven→…→Proton ordinal is **retired** — use three queues.  
6. **ROI keep-8** overrides peer-slot temptation (OpenAI/Stripe/CF/1P).  
7. **Freeze** automated scope/recon churn; human ENROLL only.
