# FIRST-5-TESTS — after CIC credentials ASSIGNED

**Gate:** only when `CRED-STATE.md` → **ASSIGNED** and secrets live in 1Password (`op://` only).  
**Env:** own researcher tenants under `*.cic-bug-bounty.auth0app.com` + manage CIC.  
**Rate:** Burp Intruder ≤ **5 rps**. No scanners/DoS.  
**Never:** production manage.auth0.com, customer tenants, personal PII in tenant fields.

## Prep (once)

1. `op run` / browser with vault items for User1/2/3  
2. Login User1 → Tenant1 on `manage.cic-bug-bounty.auth0app.com`  
3. Invite User2 + User3 as Tenant1 members with **distinct roles** (admin / editor / viewer or closest RBAC)  
4. Confirm each user can still open their **own** tenant  
5. Record tenant domains/ids as **labels only** (no secrets) in a private op note

## Test 1 — Cross-tenant resource isolation (P0 focus)

**Hypothesis:** User2 session cannot read/write Tenant3 (or Tenant1) resources outside assigned membership.  
**Steps:**  
1. As User2, capture Management API / dashboard XHR for apps, connections, users, roles.  
2. Replay equivalent API calls swapping `tenant` / org identifiers from Tenant3 (from User3 session labels).  
3. Expect **403/404/empty** — any **200 with foreign tenant data** is a finding.  
**Evidence:** request/response pair + tenant labels (redact tokens).

## Test 2 — Tenant-member privilege escalation inside Tenant1

**Hypothesis:** lower-role member can escalate to admin via role assignment, invitation, or Management API grant.  
**Steps:**  
1. As lowest role on Tenant1, attempt self-role update, invite-as-admin, create client grants, rotate secrets.  
2. Try Management API endpoints that assign `roles` / `permissions` to self.  
3. Document any successful privilege gain without admin action.  
**Evidence:** before/after role objects; no exploit mass-create.

## Test 3 — OAuth/OIDC client misbinding on researcher apps

**Hypothesis:** app created in Tenant1 can be abused for token confusion across tenants or open redirect/code theft beyond intended clients.  
**Steps:**  
1. Create a **throwaway** Regular Web / SPA app in Tenant1 with redirect URI you control.  
2. Run authorize/code/token with PKCE; mutate `client_id`, `redirect_uri`, `audience`, `organization` across tenants.  
3. Look for code issuance or token claims binding to wrong tenant/audience.  
**Evidence:** authorize URL + token claims (redact secrets); stay ≤5 rps.

## Test 4 — Enterprise connection / SAML surface (own IdP only)

**Hypothesis:** enterprise connection config allows auth bypass or assertion confusion.  
**Steps:**  
1. Configure **only** an IdP you control (SAML/OIDC) on Tenant1.  
2. Test assertion `NameID` / attribute mapping spoof for privilege inside Tenant1 only.  
3. Confirm no pivot to other researchers’ tenants.  
**Evidence:** SAML response (sanitized) + resulting session roles.  
**Skip if:** no time to stand IdP — mark deferred; do not use third-party customer IdPs.

## Test 5 — FGA store isolation (if program access applies)

**Hypothesis:** API token or dashboard session from one FGA store cannot read another store’s tuples.  
**Steps:**  
1. Create two FGA stores under researcher control (or use play + dashboard per scope).  
2. Write tuples in store A; call `api.us1.fga.dev` with store B credentials/path.  
3. Expect deny; cross-store read/write is a finding.  
**Evidence:** store ids + 401/403 vs leak. Unauth baseline already **401** on `/stores`.

## Reporting bar

- Description · Business Impact · Working PoC · Discoverability · Exploitability  
- No low-effort AI paste; impact + repro required  
- Dupe risk high (private program history since 2019)

## Abort conditions

- Tenant deleted by Auth0 mid-test  
- Credential revoke / BC suspension  
- Accidental production host in scope bar → **stop and discard**
