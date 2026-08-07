# CRED-STATE — Auth0 CIC

**Program:** Bugcrowd `auth0-okta`  
**Researcher env:** `https://manage.cic-bug-bounty.auth0app.com/`  
**Lane:** hydra wrap / auth0  

## Status

| Field | Value |
|-------|-------|
| State | **REQUESTED** |
| Date | **2026-08-07** |
| Assignment | **pending** (no Gmail assign mail as of 2026-08-07T23:12Z) |
| Expected payload | 3 users + 3 tenants (BC Get Credentials) |
| Storage policy | **1Password `op://` refs only** — never plaintext in repo/distill |
| Vault labels (planned) | `Auth0 CIC User1`, `Auth0 CIC User2`, `Auth0 CIC User3` + tenant domains |

## Inbox probe (agent)

- Gmail search `newer_than:14d (Auth0 OR Get Credentials OR bugcrowd…)`: **no CIC credential assignment email**.
- Related: Bugcrowd identity verification **successful** 2026-08-07 (eligible for ID-gated programs).
- Burner prior: Requested 2026-08-07 22:21 UTC still not assigned.

## How credentials are obtained (human)

1. Join https://bugcrowd.com/engagements/auth0-okta  
2. Program page bottom → **Get Credentials**  
3. Receive email + password sets for 3 users / 3 tenants  
4. Login only at `manage.cic-bug-bounty.auth0app.com`  
5. Invite User2/User3 into Tenant1 with varied roles for authz matrix  
6. Store secrets via `op item create` / desktop CLI — **no** files under this lane with passwords

## Agent constraints until ASSIGNED

- Passive HTTP / public docs only (this wrap tick)
- No login attempts with guessed or shared credentials
- No production `manage.auth0.com` traffic as “test”
- After assignment: follow `FIRST-5-TESTS.md` on **own CIC tenants only**

## Transition log

| UTC date | Event |
|----------|-------|
| 2026-08-07 | REQUESTED — wrap lane bootstrap; pending human BC redeem |
| 2026-08-07T23:12Z | Inbox re-probe: still REQUESTED; no assign mail |
| — | ASSIGNED — *(fill user/tenant labels only; op:// refs)* |
| — | REVOKED / tenant deleted — stop testing |

## Forbidden

- Writing passwords, refresh tokens, or private keys into markdown
- Using researcher tenants for personal apps/data
- Scanning / >5 rps Intruder
