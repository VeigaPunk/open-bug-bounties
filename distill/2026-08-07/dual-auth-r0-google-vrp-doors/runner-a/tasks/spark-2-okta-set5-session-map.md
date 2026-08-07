Policy-safe recon ONLY. No network. No secrets. No cookie dumps.

From known public probe signals for https://bugcrowd-pam-5335.oktapreview.com:
- HTTP 302 → /app/UserHome?session_hint=AUTHENTICATED then 200 SPA shell (~6.3KB)
- adminUrl host bugcrowd-pam-5335-admin.oktapreview.com
- enduser-v2 SPA (oktacdn main.js); curl clears sid/xids (empty Max-Age=0) so AUTHENTICATED is NOT durable headless session
- set-cookie names only: sid,xids,JSESSIONID,t,DT (values never store)

Produce runbook: click-path login via 1Password desktop, headless limits, next SPA tiles to map AFTER human session (app launcher, admin), session storage policy (browser profile / op only).

Stdout markdown. No passwords/cookies.
