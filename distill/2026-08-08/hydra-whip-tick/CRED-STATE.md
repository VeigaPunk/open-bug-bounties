# CRED-STATE — Auth0 CIC

**Program:** Bugcrowd `auth0-okta`  
**Researcher env:** `https://manage.cic-bug-bounty.auth0app.com/`  
**Lane:** hydra wrap / auth0  

## Status

| Field | Value |
|-------|-------|
| State | **REQUESTED** (not ASSIGNED) |
| Date | **2026-08-07** |
| Assignment | **pending** — no 3×3 user/tenant secrets in vault or inbox |
| Expected payload | 3 users + 3 tenants (BC Get Credentials) |
| Storage policy | **1Password `op://` refs only** |
| Vault titles expected | `Auth0 CIC BB User1` / `User2` / `User3` (none exist as of probe) |

## What “enabled” actually means (forensics 2026-08-07T23:25Z)

| Layer | Evidence | Result |
|-------|----------|--------|
| BC **join** | `~/.xbgst/bounty-distill/2026-08-07/ENROLL.md` row Auth0 | **joined** 2026-08-07 — Submit report UI present |
| BC **Get Credentials click** | ENROLL: “Request credentials UI opened (modal)”; BURNER-RUN 22:21Z | **Requested** — modal opened, secrets not persisted |
| 1Password | full item list + title search auth0/cic/tenant | **No** Auth0 CIC items; only related vault logins: **Bugcrowd** (username only, **password empty**), **Bugcrowd Org (Set 5) Okta** (password present) |
| Gmail `jpveigao10@gmail.com` | Auth0/CIC/credentials search 90–365d | **No** CIC credential email; only product **Auth0 Customer Advocate** sales email (2026-08-05) + BC identity verification success |
| Browser cookies | Brave + musketeer profile | **bugcrowd.com** session cookies present historically; **no** `*.auth0app.com` / CIC cookies |
| Live CDP (musketeer profile headless :9223) | open auth0-okta engagement | Shows **Hacker Login** — not authenticated this probe (session not restored headless) |

### Do not confuse

1. **Bugcrowd Auth0 BB (this lane)** — join + request Get Credentials → async **3 users / 3 tenants** for `manage.cic-bug-bounty.auth0app.com` only.  
2. **Personal Auth0 product tenant** — customer-advocate email proves a **self-service / commercial** Auth0 account exists for the same mailbox. That is **`manage.auth0.com` / production** and is **OOS** for the BB.  
3. **Okta Set5 PAM** (`bugcrowd-pam-5335.oktapreview.com`) — **different** program; vault item **exists** with password.

## How credentials are obtained (human)

1. Log into Bugcrowd as **VeigaPunk** / `jpveigao10@gmail.com` (Brave likely still has session; op password field currently **empty** — fix vault if re-login needed).  
2. Open https://bugcrowd.com/engagements/auth0-okta  
3. Bottom of program page → **Get Credentials** (again if queue never filled).  
4. When assigned: store **only** in 1Password as `Auth0 CIC BB User{1,2,3}` → website `https://manage.cic-bug-bounty.auth0app.com/`  
5. Flip this file → **ASSIGNED** (labels only, no secrets).  
6. Never test on `manage.auth0.com`.

## Agent constraints until ASSIGNED

- Passive HTTP / public docs only  
- No guessed logins  
- No production Auth0 tenant traffic as “BB”

## Transition log

| UTC | Event |
|-----|--------|
| 2026-08-07 | ENROLL: joined + Request credentials modal opened |
| 2026-08-07T22:21Z | BURNER-RUN: Requested, not assigned |
| 2026-08-07T23:12Z | Gmail probe: no assign mail |
| 2026-08-07T23:25Z | Full forensics: join yes, vault CIC no, personal Auth0 product separate, CDP logged-out |
| — | ASSIGNED — *(user/tenant labels + op titles only)* |

## Forbidden

- Passwords/tokens in markdown  
- Personal use of CIC tenants  
- >5 rps / scanners  
