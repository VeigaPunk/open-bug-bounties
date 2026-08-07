# OWN-ASSET — Aiven free-tier checklist (owned projects only)

**Engagement:** https://bugcrowd.com/engagements/aiven-mbb-og  
**Lane:** hydra `stack/aiven` · H1  
**Mode:** researcher owns every target · **no third-party customer data**  
**Secrets:** 1Password `op://` only — never paste tokens/connection strings into this tree  

---

## Pre-gates (all must be true before active probes)

| # | Gate | Status (2026-08-07) | Evidence |
|---|------|---------------------|----------|
| G1 | Bugcrowd join on `aiven-mbb-og` | **PASS** | `~/.xbgst/bounty-distill/2026-08-07/ENROLL.md` — joined 2026-08-07 |
| G2 | Same-day live brief re-read | **PASS (mirror)** | FULL scope in distill; live URL above — re-open before first probe |
| G3 | Testing emails `@bugcrowdninja.com` only | **PENDING human** | Ninja alias after BC login (≤10 min lag possible) |
| G4 | Free tier / trial — **no credit card** | **PENDING human** | Free PG + Kafka OK per brief |
| G5 | Own project(s) + service(s) RUNNING | **PENDING human** | IDs only in op notes / local operator notes |
| G6 | API tokens in 1Password only | **PENDING human** | `op://…` for Account A/B |
| G7 | Dual owned accounts (A + B) for IDOR class | **PENDING human** | `you@…` + `you+aiven2@bugcrowdninja.com` |

**FAIL CLOSED:** If G3–G7 incomplete → policy map + signup only. **No** authz probing, **no** Titanium/swarm thrash, **no** customer `aivencloud.com`.

---

## Human click-path (Account A)

1. Sign into Bugcrowd (refreshes ninja alias).
2. Open https://console.aiven.io/signup — register with **primary** `@bugcrowdninja.com`.
3. Verify email via ninja forward → mailbox.
4. Skip paid upgrade; stay free tier / trial credits.
5. Create project (name ownership-clear, e.g. `bb-a-<handle>-free` — no secrets in name).
6. **Create service** — prefer:
   - **PostgreSQL** (Tier 2, easy free path)
   - and/or **Kafka** (free tier; governance API Tier 1)
7. Wait until status **RUNNING**.
8. Record **non-secret** IDs: `project_id`, `service_id`, cloud, plan.
9. Console → Authentication / API tokens → create least-privilege token → store in 1Password:
   - Suggested item: `Aiven BB Account A API`
   - Runtime: `op run -- …` with `Authorization: aivenv1 $TOKEN`
10. **Never** commit token, connection URI, or service password.

## Human click-path (Account B — dual-account class)

1. Fresh browser profile / logout.
2. Signup with `you+aiven2@bugcrowdninja.com` (or `+account2` pattern per brief).
3. Create **separate** free project + small service.
4. Separate API token → 1Password `Aiven BB Account B API`.
5. Ownership map (labels only — fill locally/op notes, not git if sensitive):

| Label | Account A | Account B |
|-------|-----------|-----------|
| ninja email | op item only | op item only |
| project_id | _fill_ | _fill_ |
| service_id | _fill_ | _fill_ |
| op token ref | `op://…/Aiven BB Account A API/…` | `op://…/Aiven BB Account B API/…` |

---

## First probes (only after G1–G7 green)

Authorized research on **own** assets; non-destructive; stop on unexpected impact.

1. **Self list** — A token lists only A projects/services.
2. **Cross-read IDOR** — B token + harmless `GET` against A `project_id` / `service_id` (and swap). Expect deny.
3. **User / membership / ACL** list endpoints — cross-account read.
4. **Invite / membership** only if reversible and both accounts owned.
5. Console vs API consistency (same denial).
6. Optional later (still owned only): OpenSearch ACL model confusion vs intentional avnadmin; Kafka governance REST cross-service.
7. Prefer control-plane / cross-account impact over marketing XSS.

**Auth reminder:** real session is `Authorization: aivenv1 …` — do not report “cookie missing” alone.

---

## Forbidden (hard)

- [ ] Other customers’ services / random `*.aivencloud.com`
- [ ] DoS / DDoS / mass scanners / bulk crawl thrash
- [ ] Credit card / paid capacity for “more power”
- [ ] Partner-reseller Aiven entry paths
- [ ] Social eng / support-ticket spam
- [ ] Expanding found credentials (report only)
- [ ] Secrets in git, distill, chat, REPORT screenshots of tokens
- [ ] CTF host until deliberate hard-chain session (not this tick)

---

## Evidence paths (this lane)

| Artifact | Path |
|----------|------|
| This checklist | `~/.xbgst/hydra-bounty/lanes/stack/aiven/OWN-ASSET.md` |
| Scope bullets | `~/.xbgst/hydra-bounty/lanes/stack/aiven/SCOPE.md` |
| Progress | `~/.xbgst/hydra-bounty/lanes/stack/aiven/REPORT.md` |
| Draft finding skeleton | `~/.xbgst/hydra-bounty/lanes/stack/aiven/DRAFT-REPORT.md` |
| BC enroll | `~/.xbgst/bounty-distill/2026-08-07/ENROLL.md` |
| FULL scope | `~/.xbgst/bounty-distill/2026-08-07/scopes/aiven.md` |
| Playbook fail-closed | `~/.xbgst/bounty-distill/2026-08-07/playbooks/aiven.md` |
| Passive recon | `~/.xbgst/bounty-distill/2026-08-07/recon/aiven.md` |
| Instance runbook (dual) | `~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/runner-a/AIVEN-INSTANCE.md` |
| L3 checklist | `~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/runner-a/l3/checklist-aiven.md` |
| Public doors (passive) | `runner-a/AIVEN-API-DOORS-P*.md` |

---

## Checkbox summary

- [x] Program joined (`aiven-mbb-og`)
- [x] Scope mapped (public brief)
- [ ] Ninja Account A registered on console
- [ ] Free PG (and/or Kafka) RUNNING under A
- [ ] API token A in 1Password
- [ ] Ninja Account B + free service
- [ ] API token B in 1Password
- [ ] Dual-account ID map (IDs only)
- [ ] First own-asset GET probes complete
- [ ] Finding filed only if impact proven on own assets
