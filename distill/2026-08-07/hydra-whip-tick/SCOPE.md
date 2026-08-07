# SCOPE — Aiven (Bugcrowd MBB) · lane stack

**Program:** https://bugcrowd.com/engagements/aiven-mbb-og only (`/engagements/aiven` 404)  
**Slug:** `aiven-mbb-og` · Managed Bug Bounty · Live  
**Lane artifacts:** `/home/vgpnk1337/.xbgst/hydra-bounty/lanes/stack/aiven`  
**Parent distill:** `~/.xbgst/bounty-distill/2026-08-07/scopes/aiven.md` (FIDELITY: FULL)  
**ENROLL:** BC joined (plan/tracker 2026-08-07). Product free-tier signup = **blocker for live authz probes**.

## In scope (research targets)

| Surface | Notes |
|---------|--------|
| Managed DB Tier 1 | ClickHouse, Metrics, Valkey, Kafka (+ Connect/MM2/governance) — highest bands |
| Managed DB Tier 2 | PostgreSQL, MySQL, OpenSearch, Grafana, regatta.aiven.io (unauth access only) |
| Website / control plane | aiven.io, console.aiven.io, api.aiven.io |
| Open source | github.com/Aiven, Aiven-Open (forks only if not upstream) |
| CTF | falcon-bug-bounty-flag-pgsql-dev-sandbox.aivencloud.com — defer until deliberate |

## Out of scope (hard)

- Other customers’ `*.aivencloud.com` services  
- aquarium, uptime, video, events, ideas, support.aiven.io, Zendesk, community  
- `*.aiven.fi`, `*.avns.net`, github.com/Aiven-Labs  
- Rate limiting; pure third-party 0-days; app-level DoS; social eng  
- Partner-reseller brand paths; Fly.io platform issues (unless console/api impact)  
- Apache Flink **removed** from scope  

## Free tier (docs 2026)

No credit card required. Free services available:

- Apache Kafka®  
- MySQL®  
- OpenSearch®  
- PostgreSQL®  
- Valkey™  

Unlimited time; Aiven may power off inactive free services (power-on anytime). Free can run beside trial credits. **Do not add a credit card** (no reimbursement).

**Trial:** 30 days credits from account create; no CC; services power off when trial ends if no payment method.

**Hunt pick for free tier:** PostgreSQL (Tier 2 console/API authz) + Kafka free (Tier 1 surface when ready).

## Identity / ninja email

- Signup + invites: **`@bugcrowdninja.com` only** (e.g. `you+aiven-a@bugcrowdninja.com`, `you+aiven-b@...`)  
- No Gmail / disposable  
- Two owned accounts for cross-account authz only  

## Auth model (known)

- Control plane: `Authorization: aivenv1 <token>` (not cookie-as-session)  
- Replaying **another user’s valid token** is **not** a bug  
- Unauthenticated `GET https://api.aiven.io/v1/project` → **401**  
  Body sample (public): `{"errors":[{"message":"No valid client certificate presented","status":401}],...}`  
- Console: https://console.aiven.io/ · API docs: https://api.aiven.io/doc/

## Testing rules (summary)

- Own services only on aivencloud.com  
- Cross-account only between accounts **you** own  
- No DoS / scanners-only reports  
- Credential discovery → report, do not expand  
- Prefer managed DB / orchestration plane over marketing XSS (dupe-heavy)

## Reward bands (brief summary)

| Group | P1 range (approx) |
|-------|-------------------|
| DB Tier 1 | $16.5k–$23.1k |
| DB Tier 2 | $10k–$15k |
| Console/API/web | $4.1k–$4.5k |
| OSS | $1k–$1.5k |
| CTF SSH challenge | P1 $25k |

Stats (brief): ~146 rewarded; avg ~$4.1k last 3mo; p75 validation ~4d.

## ROI focus

Cross-client data · full ATO · orchestration pivot · RCE on non-intended services — **only after free project exists**.

## Gate before active probes

1. ENROLL joined (done per plan)  
2. Live brief re-read on aiven-mbb-og  
3. Ninja free-tier project A + B created  
4. No Titanium against third-party cloud hosts  
