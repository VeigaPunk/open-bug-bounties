# Okta Set5 map — bugcrowd-pam-5335 (Runner A)

**Date:** 2026-08-07T14:07Z  
**URL:** https://bugcrowd-pam-5335.oktapreview.com  
**Policy:** recon map only — no credential expansion, no cookie values, no exploit.

## Probe (curl, no auth jar)

| Step | Result |
|------|--------|
| GET `/` | **HTTP 302** → `/app/UserHome?iss=…&session_hint=AUTHENTICATED` |
| Follow | **HTTP 200**, body ~**6375** bytes |
| Effective URL | `…/app/UserHome?…session_hint=AUTHENTICATED` |
| Sign-in widget | **absent** in shell (no `okta-sign-in` / password field) |
| Rate limit headers | `x-rate-limit-limit: 60` (UserHome 200) |

### Cookie **names** only (values empty / Max-Age=0 on probe)

`sid`, `xids`, `autolaunch_triggered`, `activate_ca_modal_triggered`, `JSESSIONID`, `t`, `DT`

**Judgment:** curl receives `session_hint=AUTHENTICATED` **and** clears session cookies (`sid=""`, Max-Age=0). This is **not** a durable headless authenticated session for app tiles — SPA bootstrap shell only.

## SPA / host signals (public shell)

| Signal | Value |
|--------|--------|
| Enduser SPA | `enduser-v2.enduser` via `op3static2.oktacdn.com` (`main.js`, `main.css`) |
| adminUrl | `https://bugcrowd-pam-5335-admin.oktapreview.com/admin/dashboard` |
| CSP connect-src hosts (selected) | org enduser, **admin**, kerberos, mtls, oktacdn, mixpanel, mapbox, oinmanager, authenticator local ports |
| Theme API | `/api/internal/brand/theme/style-sheet?touch-point=END_USER_DASHBOARD` |
| `window.okta` | present in shell |
| Password form | not in static HTML when redirected to UserHome shell |

Org bootstrap id may appear in SPA config (`orgId`); treat as **non-secret identifier**, not a session token — do not treat as proof of researcher login.

## Next login / app tiles (human path)

**Click-path (preferred):**

1. Unlock **1Password** desktop + browser integrate (or `op` inject at runtime only).
2. Profile browser (Canary / musketeer) → open org URL.
3. If login form: fill via 1Password item `op://Personal/Bugcrowd Org (Set 5) Okta/{username,password}` — **never** paste into distill files.
4. Complete MFA if prompted (`needs_human_click` if headless blocked).
5. Land **UserHome** enduser dashboard → map **app launcher tiles** (labels + deep-links only).
6. Open **admin** only if credentials grant Super Admin on Set5: `bugcrowd-pam-5335-admin.oktapreview.com` — note tile/app assignment for Privileged Access / Workflows if present.
7. Session storage: **browser profile** and/or **op item notes via `op` CLI** — never markdown cookies/JWT.

**Headless limits:**

- Pure curl ≠ live MFA session.
- Do not dump `sid`/`JSESSIONID` into bounty-distill.
- App tile inventory requires authenticated SPA XHR after real login.

## Next recon after human session (still non-exploit)

- List visible app tiles (name, link host only).
- Confirm dual-org Set5 vs second redeem set from BC **Get Credentials**.
- Enforce MFA on Super Admins (program rule) before MFA-bypass class work.
- No scanners; no Workflows automation/DoS.

## Related

- Shared prior: `../shared/OKTA-SET5-PROBE.md`
- L3 runbook: `l3/runbook-okta-set5.md`
- Scope: `../../scopes/okta.md` (FIDELITY FULL)
- Vault refs: `../shared/VAULT-INVENTORY.md`
