# SCOPE — Aiven Managed Bug Bounty (public brief only)

**Engagement (SSoT):** https://bugcrowd.com/engagements/aiven-mbb-og  
**Slug:** `aiven-mbb-og` only — bare `/engagements/aiven` **404** (do not use).  
**Platform:** Bugcrowd · Managed Bug Bounty  
**Brief stamp (distill):** last updated ~21 Jul 2026 · FULL extract  
**Local FULL mirror:** `~/.xbgst/bounty-distill/2026-08-07/scopes/aiven.md`  
**TF extract:** `~/.xbgst/bounty-distill/2026-08-07/raw/hunt/tf-extracts/aiven.md`  
**Lane date:** 2026-08-07  

> Safe public notes only. No secrets. Re-read live Scope & Rewards before any active test.

## Program stats (public brief)

- Vulnerabilities rewarded: **146**
- Validation p75: **~4 days** (last 3 months)
- Average payout: **~$4,142.81** (last 3 months)
- Crowd joined: large (brief “Recently joined” ~792)

## Reward bands (summary)

| Group | P1 | P2 | P3 | P4 |
|-------|----|----|----|-----|
| **DB Tier 1** — ClickHouse, Metrics, Valkey, Kafka (+ Connect, MirrorMaker 2, governance REST) | $16.5k–$23.1k | $5.28k–$13.2k | $1.65k–$4.62k | $660–$990 |
| **DB Tier 2** — PostgreSQL, MySQL, OpenSearch, Grafana, `regatta.aiven.io` | $10k–$15k | $3.5k–$7.5k | $1k–$2.5k | $400–$650 |
| **Website / console** — aiven.io, console.aiven.io, api.aiven.io | $4.1k–$4.5k | $1.5k–$1.75k | $600–$850 | $200–$250 |
| **Open source** — github.com/Aiven, Aiven-Open | $1k–$1.5k | $500–$1k | $250–$500 | $50–$250 |
| **CTF** — falcon-bug-bounty-flag host | P1 **$25,000** (host SSH private key challenge) | | | |

Notes from brief: VRT baseline; severity may be adjusted. CVE/dependency-only findings may be capped (~$1k if not dupe). **Apache Flink removed** from scope.

## In scope (bullets)

### Managed database services — Tier 1

- Aiven for **ClickHouse**
- Aiven for **Metrics** (Prometheus/Thanos-style)
- Aiven for **Valkey**
- Aiven for **Apache Kafka** (+ Kafka Connect, MirrorMaker 2)
- Kafka **governance REST API** (in this tier)

### Managed database services — Tier 2

- Aiven for **PostgreSQL**
- Aiven for **MySQL**
- Aiven for **OpenSearch** (two ACL models: Console vs native — intentional avnadmin power; see brief)
- Aiven for **Grafana**
- **regatta.aiven.io** — interested in **demonstrable unauthorized access** only; cookie/header “best practice” alone not enough

### Website / control plane

- `https://aiven.io/`
- `https://console.aiven.io/` (login surface)
- `https://api.aiven.io/` (API + docs at `/doc/`)

### Open source

- `https://github.com/Aiven`
- `https://github.com/Aiven-Open`  
  (forks only if issue **not** present upstream)

### CTF (optional hard track)

- `http://falcon-bug-bounty-flag-pgsql-dev-sandbox.aivencloud.com/` — host key + IP + method; not free-tier path

## Critical console/API notes (from brief)

- Console API calls use **`Authorization:` `aivenv1` token**, **not** browser cookies alone.
- Copying another user’s Authorization header and acting as them is **not a bug**.
- Customers intentionally grant service credentials to principals who may not have console users — expected model.
- `aiven.io` hosted on **fly.io** — fly.io platform bugs → fly.io; only aiven.io issues that impact console/api or allow defacement/injection of aiven.io are interesting here.
- Free tier + **trial credits** encouraged; **Kafka free tier** available. Extra credits via program request.
- **Do not add a credit card** — no reimbursement; card removal is slow.

## Access / account rules

- Sign up only with **`@bugcrowdninja.com`** (invites: `you+account2@bugcrowdninja.com`).
- No Gmail / disposable emails for testing.
- Create services via console or API; test only **services you create** under `aivencloud.com`.
- **Aiven brand only** — partner/reseller UIs **out of scope**.
- Cross-account tests only between **accounts you own**.
- Found credential: **report; do not expand** access (avoid alarms; program rates by access of credential).

## Focus areas (high value)

- Cross-client **data** access
- Total control of **another customer’s account**
- Pivot into Aiven **orchestration plane**
- RCE on services **not** designed to provide it
- Prefer **managed DB / control plane** over marketing-site XSS (high dupe)

## Out of scope (bullets)

- **Customer services you did not create** on `aivencloud.com`
- Most unlisted Aiven subdomains / third-party hosted surfaces
- Explicit OOS hosts: `aquarium`, `uptime`, `video`, `events`, `ideas`, `support.aiven.io`, Zendesk help, community/contact pages
- `*.aiven.fi`, `*.avns.net`, `github.com/Aiven-Labs`
- Contact-us / sales chat 3P embeds (Calendly, Salesforce, Qualified, etc.)
- **Rate limiting** issues
- App-level **DoS** / DDoS; physical security (VRT)
- Social engineering
- Scanner-only paste reports; pure CVE without Aiven-specific PoC
- Partner-created Aiven services via business partners
- Support ticket creation abuse
- Unpatched / <30-day public 0-days on non-Aiven software unless new Aiven services still vulnerable after patch window

## Permission model (brief paraphrase)

- API-granted permissions may be intentional even if console greys them out.
- Access with **no relationship** to the resource is likely a bug.
- Users with **service user** (typically `avnadmin`) are intentionally full service power.

## Lane hunting stance (this hydra lane)

| Allowed now | Blocked until free tier |
|-------------|-------------------------|
| Policy re-read, SCOPE / OWN-ASSET / draft skeletons | Authz probes against live projects |
| Public door literacy (already in distill recon) | Third-party customer hosts |
| Dual-ninja signup docs | Scanners, DoS, credential expansion |

**Primary easy class for H1:** console/API **authz / IDOR** between two **owned** free-tier projects (PostgreSQL + optional Kafka).
