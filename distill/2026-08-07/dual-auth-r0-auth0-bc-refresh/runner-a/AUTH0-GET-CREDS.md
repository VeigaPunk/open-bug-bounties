# Auth0 Get Credentials — click-path (public policy only)

**Date:** 2026-08-07  
**Engagement:** https://bugcrowd.com/engagements/auth0-okta  
**Brief last updated (public):** ~08 Apr 2026  
**Mode:** enroll / vault hygiene — **no live exploit, no password values in distill**

Axes: `auth_ready↑` `evidence_fidelity↑` `safety_in_policy↑`

---

## Policy anchors (public brief)

| Rule | Detail |
|------|--------|
| Researcher env only | `https://manage.cic-bug-bounty.auth0app.com/` |
| Immediate OOS | `manage.auth0.com`, `auth0.auth0.com`, `accounts.auth0.com`, customer prod |
| Get Credentials | Bottom of Bugcrowd program page → email + password for researcher account(s) |
| Allocation | **3 users / 3 tenants** |
| Rate | Burp Intruder **≤ 5 rps**; scanners / DoS → **immediate ban** |
| Tenants | Not for personal use / PII; may be **deleted anytime** |
| Disclosure | Program does **not** allow public disclosure |
| Focus | OAuth2 / OIDC / SAML, authn/authz bypass, PII exfil, **cross-tenant** priv-esc |
| AI spam | Low-effort AI reports rejected; repeat offenders removed |

FULL scope mirror: `../../scopes/auth0.md` · L3: `l3/checklist-identity-day.md`

---

## Human click-path (Get Credentials → vault)

### 1. Platform session

1. Authenticate to Bugcrowd (hacker login).  
2. Open engagement: https://bugcrowd.com/engagements/auth0-okta  
3. Confirm **joined** / authorized to view credentials UI (parent ENROLL: joined).  
4. Scroll to **bottom of the program page**.  
5. Click **Get Credentials**.  

Public brief wording: *“At the bottom of the program page click on Get Credentials. You will be provided the email address & password to your account.”*

### 2. Receive credential set (3×3)

Expect **three** credential sets → **three users** and **three tenants**.

Operator capture (into **1Password only**, never markdown):

| Slot | Email (op) | Password (op) | Tenant note (label only) |
|------|------------|---------------|---------------------------|
| User/Tenant 1 | field | field | Tenant 1 |
| User/Tenant 2 | field | field | Tenant 2 |
| User/Tenant 3 | field | field | Tenant 3 |

Suggested 1Password item titles (labels only):

- `Auth0 CIC BB User1`  
- `Auth0 CIC BB User2`  
- `Auth0 CIC BB User3`  

Each item:

- **username** / **password**  
- **website:** `https://manage.cic-bug-bounty.auth0app.com/`  
- notes: tenant role intent (e.g. “primary owner Tenant1”) — **no raw paste into git**

Prefer: `op://Personal/Auth0 CIC BB User1/password` style refs only in runbooks.

### 3. First login (researcher dashboard)

1. Navigate **only** to: https://manage.cic-bug-bounty.auth0app.com/  
2. Sign in with User1 (op-filled, human or browser password manager).  
3. Confirm tenant context is CIC bug-bounty env — not production Auth0.  
4. If MFA prompts appear, enroll using operator device; store recovery **in op**, not distill.  
5. Repeat quick login smoke for User2 / User3 if needed.

### 4. Tenant Members pattern (public brief)

Brief: *If utilizing Tenant 1, invite User 2 & User 3 to Tenant 1 as Tenant Members and set permissions. Use User 2 & User 3 credentials to access their own tenants as well as Tenant 1.*

Safe authz matrix setup (owned tenants only):

1. As Tenant1 owner: **Members** → invite User2 / User3 emails from credential set.  
2. Assign minimal roles first; escalate only for intended authz tests.  
3. Login as User2 / User3 → verify visibility boundaries.  
4. Record **permission matrix labels** (role names, not secrets) in operator notes.  

### 5. Rate / tool gates before any probe

- [ ] Cap automated replay (Intruder) at **≤5 rps**  
- [ ] **No** scanners, no Burp crawl/scan profiles that mass-request  
- [ ] No DoS / load / lockout tests  
- [ ] No pivot after accidental server access — **stop and report**  
- [ ] No customer instances / customer data  
- [ ] Do not contact Auth0 support for BB — use Bugcrowd support  

---

## What to vault vs what to document

| Material | Distill OK? | Where |
|----------|-------------|--------|
| Engagement URL, CIC manage host | Yes | this file, AUTH-READINESS |
| “3 users / 3 tenants”, ≤5 rps | Yes | this file |
| Email/password values | **No** | 1Password only |
| Session cookies / tokens | **No** | never |
| Tenant display names (non-secret) | Yes if non-PII | operator notes |
| Findings / PoCs | Later, sanitized | findings/ when real |

---

## First classes **after** creds vaulted (not this step)

1. Cross-tenant object access with UserA token against TenantB resources.  
2. Management API role boundary (audience/issuer/scope).  
3. Member invite privilege confusion.  
4. FGA only if entitled and still on in-scope hosts.  

Stay on `*.cic-bug-bounty.auth0app.com` / listed Tier-1 hosts. Tier-2 marketing sites are lower priority for this auth lane.

---

## Forbidden (hard)

- Any test on `manage.auth0.com` / customer tenants  
- Writing Get Credentials secrets into `OUT/`, git, chat, screenshots in repo  
- Scanners / >5 rps Intruder  
- Personal use of researcher tenants  
- Low-effort AI-only submissions  
- Public disclosure of findings (program forbids)  

---

## Related artifacts

| Path | Role |
|------|------|
| `AUTH-READINESS.md` | Q-BC rollup |
| `l3/checklist-identity-day.md` | Auth0+Okta sequence |
| `../../scopes/auth0.md` | FULL policy |
| `../shared/VAULT-INVENTORY.md` | titles only |
| This file | Get Credentials click-path |

---

## Status

**Docs fidelity high.** Credential materialization still **human + 1Password**.  
No credentials redeemed in this agent turn. No findings claimed.
