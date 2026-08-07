# CONNECTOR — hydra 2026-08-07T22:38:33Z

## State
- inf: all three lanes **MAPPED** with REPORT + FIRST-5 + L3 packs; **zero COMPLETE** → no hydra-refill (1→2) [strong] — axes: bounty_complete, evidence_fidelity, safety_in_policy
- inf: shared **credential/asset gate** blocks money the same way comma-style thrash does — map is free, authz IDOR cash needs open doors [strong] — axes: stack, wrap, grok
- risk: whip/orch may thrash unauth doors or mark COMPLETE without own-asset evidence → policy breach + empty queue refill

**Rule restated:** `MAP != COMPLETE`. COMPLETE only with own-asset evidence paths.

| Lane | Orch | Sekhmet | Bounty | State | Ship | Blocker for COMPLETE |
|------|------|---------|--------|-------|------|----------------------|
| **stack** | xbgst-stack | luna-a | Aiven | MAPPED (own-asset gate) | `143b7d8` hydra-aiven-stack | free-tier service + 2-member authz probe |
| **wrap** | workflow wrap | luna-b | Auth0 CIC | MAPPED (cred pending) | `301911b` hydra-auth0-wrap | BC Get Credentials → op vault → FIRST-5 |
| **grok** | xbgst-grok | luna-c | Google VRP Drive | MAPPED (A/B accounts) | `2ad5517` hydra-google-vrp-grok | two research Google sessions T1–T5 |

## Dual orch note
- **stack** = xbgst-stack top-orch + sekhmet-luna-a (Aiven product console + API)
- **wrap** = wrap **workflow** lane + sekhmet-luna-b (Auth0 CIC BC-creds model — not production manage.auth0.com)
- **grok** = xbgst-grok top-orch + sekhmet-luna-c (Google VRP Drive ACL/authz, own A/B only)
- Substrate still mapped: luna-a/b/c roots, pruner, tmux `hydra`, agent-pip a|b|c, whip 119s smart (no CAPTCHA thrash)

## Per-lane signal

### stack / Aiven (`143b7d8`)
- Map complete: SCOPE, ATTACK-SURFACE, FIRST-5, OWN-ASSET, DRAFT-REPORT, L3 swarm NDJSON
- Passive evidence: `api.aiven.io/v1/project` and `/v1/me` → **401** (no client cert); console SPA **200**; BC engagement **200**
- Gate: **@bugcrowdninja free-tier signup not done** — FAIL-CLOSED until projects A/B exist

### wrap / Auth0 (`301911b`)
- Map complete: TARGETS, UNAUTH-DOORS, FIRST-5, CRED-STATE, L3 outs t1–t4
- Unauth: CIC manage → OIDC PKCE on `config.cic-bug-bounty.auth0app.com`; FGA API **401** unauth
- Gate: CRED-STATE **REQUESTED 2026-08-07**, assignment **pending** — no login attempts; op:// only after assign
- Post-cred EV rank: cross-tenant isolation → OAuth misbinding → member priv-esc → SAML own IdP → FGA

### grok / Google VRP (`2ad5517`)
- Map complete: PRODUCT-PICK (Drive), AUTH-SURFACE, FIRST-5, SCOPE-NOTES, L3 01–04 ok
- Finding log empty by design — live PoC deferred to human A/B Drive sessions
- Gate: two research-owned Google accounts local (not in repo)

## Whip (tail)
- 22:34–22:35: missing REPORTs then aiven landed; wrap/grok still missing briefly
- 22:37–22:38: tracker+connector; orch pulse ships aiven/auth0/google; sekhmet a/b/c kicked; **zero COMPLETE**
- Policy: fertile REPORT &lt;5m → log only; never thrash Set5 Okta SPA / CAPTCHA on 119s loop

## Dissent
- Depth roles may want more unauth spidering / L3 expand — connector says **stop map thrash**; only human door-opens move COMPLETE
- Stack may push multi-service free tier early — prefer **one free PG + 2 members** first (cheapest authz matrix)
- Grok may want multi-product VRP — stick to **Drive T1–T5** until one anomaly or clean negative

## Rationale (strange angle)
Three different orch shapes (stack CLI, wrap workflow, grok CLI) converged on the **same economy**: mapping and sekhmet checklists shipped clean (`143b7d8` / `301911b` / `2ad5517`), but **money sits behind three human keys** (Aiven ninja signup, BC Get Credentials, Google A/B login). Treating MAP as progress theater burns whip cycles; treating doors as the only frontier keeps refill honest.

## Next cheap actions (max 3 total)
1. **Aiven (stack):** ninja mailbox → free Postgres under two console accounts → run FIRST-5 membership matrix  
2. **Auth0 (wrap):** human redeem BC Get Credentials → CRED-STATE **ASSIGNED** + op vault labels only → execute FIRST-5 on CIC tenants  
3. **Google (grok):** run Drive FIRST-5 T1–T5 with local A/B research accounts; draft only on anomaly  

On any COMPLETE with evidence: hydra-refill 2 + new team dirs + milestone-ship (secret gate).

## Completed
| ID | Program | Evidence | Ship |
|----|---------|----------|------|
| — | — | — | — |
