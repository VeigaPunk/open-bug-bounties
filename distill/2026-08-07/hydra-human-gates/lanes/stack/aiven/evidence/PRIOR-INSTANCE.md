# Aiven free-tier instance enroll — Runner A (Q-BC B1)

**Date:** 2026-08-07  
**Engagement:** https://bugcrowd.com/engagements/aiven-mbb-og only (bare `/aiven` 404)  
**Policy sources:** Bugcrowd brief (last updated ~21 Jul 2026), FULL scope `../../scopes/aiven.md`, docs.bugcrowd.com ninja alias  
**Mode:** human enroll checklist — **no secrets, no live exploit, no third-party assets**

Axes: `auth_ready↑` `evidence_fidelity↑` `safety_in_policy↑`

---

## Why this artifact

BC join is done. **Instance-level** readiness still requires:

1. Two **owned** free-tier Aiven accounts registered with **@bugcrowdninja.com** only  
2. Own project/service IDs recorded for dual-account IDOR class  
3. API tokens stored **only** in 1Password (`op://…`) — never in distill/git/shell history  

---

## Pre-gates (do not skip)

| Gate | Check |
|------|--------|
| Platform | Bugcrowd account active; engagement **joined** (`aiven-mbb-og`) |
| Email | Alias `you@bugcrowdninja.com` exists (auto on BC sign-in; may lag **≤10 minutes** after login) |
| Plus-addressing | Second identity: `you+aiven2@bugcrowdninja.com` (or distinct BC ninja pattern per brief: `you+account2@bugcrowdninja.com`) |
| Card | **No credit card** added — program does not reimburse; free tier + trial credits only |
| Scope hosts | Work only on `console.aiven.io` / `api.aiven.io` and **services you create** under `aivencloud.com` |
| Brand path | Aiven brand console/API only — **partner-reseller UIs OOS** |

Ninja docs: https://docs.bugcrowd.com/researchers/participating-in-program/your-bugcrowdninja-email-address/

---

## @bugcrowdninja checklist

- [ ] Sign into bugcrowd.com (re-syncs ninja alias if stale)  
- [ ] Wait up to **10 minutes** if alias mail not yet forwarding  
- [ ] Confirm primary ninja address pattern: `<username>@bugcrowdninja.com`  
- [ ] Plan **Account A** signup email = primary ninja  
- [ ] Plan **Account B** signup email = `+` tag on same ninja (program allows/requires ninja only — not Gmail/disposable)  
- [ ] Never invite or touch customer projects you did not create  
- [ ] Keep ownership notes (which email owns which project/service IDs) in operator notes or 1Password notes field — **not** this repo if they embed tokens  

---

## Free-tier enroll click-path (human)

### A. Create Account A

1. Open https://console.aiven.io/ (or signup from aiven.io → console).  
2. Register with **Account A** `@bugcrowdninja.com` only.  
3. Complete email verification via ninja forward → primary mailbox.  
4. Skip any paid/upgrade prompts; stay on free tier / trial credits.  
5. Create organization/project if wizard requires (name it so ownership is obvious, e.g. `bb-a-<handle>-free` — no secrets in name).  

### B. Create a free managed service (Account A)

Prefer managed DB for hunt ROI (program: website has high dupes; managed DBs preferred):

| Priority | Service | Notes |
|----------|---------|--------|
| Primary | **PostgreSQL** | Tier 2 rewards; fast free create |
| Alt | **Kafka** | Free tier called out in brief; governance API in Tier 1 |
| Optional second | MySQL / OpenSearch / Grafana | Still own-account only |

Console path (typical):

1. **Services** → **Create service**  
2. Pick cloud/region that is free-eligible  
3. Smallest plan / free / trial  
4. Wait until status **RUNNING**  
5. Record **project name/id**, **service name/id**, cloud, plan — IDs only  

Do **not** paste connection strings, passwords, or `avns_` / service URIs into distill.

### C. Authentication token (Account A)

Console auth to API is **`Authorization: aivenv1 <token>`** (not cookie alone).

1. Console → user/profile → **Authentication tokens** (or equivalent “API tokens”).  
2. Create token with least privilege needed for read probes first.  
3. Immediately store in 1Password=<REDACTED> Suggested title: `Aiven BB Account A API`  
   - Fields: username/email (ninja), token (password/API key field), URL `https://api.aiven.io/`  
   - Optional: project_id / service_id as **non-secret** labels  
4. Prefer runtime inject: `op run -- env AIVEN_TOKEN=<REDACTED> -- curl -H "Authorization: aivenv1 $AIVEN_TOKEN" …`  
5. Never commit token; never put in `REPORT.md` / this file.

### D. Create Account B (dual-account class)

1. Fresh browser profile or logout.  
2. Register **Account B** with second ninja address.  
3. Create free project + one small service (can be PG again).  
4. Create **separate** API token → 1Password `Aiven BB Account B API`.  
5. Document ID map (labels only):

| Label | Account A | Account B |
|-------|-----------|-----------|
| ninja email | (op item only) | (op item only) |
| project_id | `…` | `…` |
| service_id | `…` | `…` |
| op token ref | `op://Personal/Aiven BB Account A API/credential` | `op://Personal/Aiven BB Account B API/credential` |

---

## First probes **after** instance (owned only)

Policy: cross-account only between **accounts you own**.

1. **Self GET** — Account A token lists A projects only.  
2. **Cross GET** — Account B token against Account A project/service IDs (harmless read). Expect deny.  
3. Same swap A→B.  
4. ACL/user invite only if reversible and both owned.  
5. Prefer console + API consistency checks; avoid bulk/automated crawl.  
6. If credential/secret discovery elsewhere: **report, do not expand** (brief).  

Stop on unexpected impact, customer data, or stability risk.

---

## Forbidden (hard)

- Other customers’ `aivencloud.com` services  
- Scanners, DoS/DDoS, mass fuzz, spam reports of scanner paste  
- Credit card / paid capacity for testing  
- Partner-reseller entry paths  
- Social engineering / support-ticket abuse  
- Storing tokens in git, distill HTML dumps, or chat  
- Expanding found credentials beyond report  

---

## Evidence to keep (this lane)

| Item | Where |
|------|--------|
| BC join | parent `ENROLL.md` |
| Scope FULL | `../../scopes/aiven.md` |
| L3 checklist | `l3/checklist-aiven.md` |
| Engagement HTTP door | `ENGAGEMENT-HTTP.txt` / `shared/PULSE-HTTP.md` |
| This runbook | `AIVEN-INSTANCE.md` |
| Tokens | **1Password only** |

---

## Blocker status

**Human pending:** free project + dual ninja + op tokens not yet created in this session.  
**Auth_ready:** documentation/join **high**; instance **blocked on human browser**.

No findings claimed.
