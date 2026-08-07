# Runbook — Okta Set5 pam-5335 (r2)

1. Unlock 1Password desktop integrate
2. Browser: open https://bugcrowd-pam-5335.oktapreview.com/
3. Inject credentials via op run / autofill — do not paste into chat/logs
   - username: op://Personal/Bugcrowd Org (Set 5) Okta/username
   - password: op://Personal/Bugcrowd Org (Set 5) Okta/password
4. Complete MFA if challenged
5. On UserHome: record app tile **names/paths only** (no tokens)
6. Optional admin console: https://bugcrowd-pam-5335-admin.oktapreview.com/
7. Cookie names only if documenting: sid, xids, JSESSIONID, t, DT

Blockers: SPA form (no static inputs); headless session_hint is not durable auth.
