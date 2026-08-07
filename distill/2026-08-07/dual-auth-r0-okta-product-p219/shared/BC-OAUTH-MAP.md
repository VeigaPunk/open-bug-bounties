# Bugcrowd hacker OAuth map (passive)

Observed 2026-08-07:

| Step | URL / signal |
|------|----------------|
| Entry | `https://bugcrowd.com/user/sign_in` → 200 redirect chain |
| IdP authorize | `https://login.hackers.bugcrowd.com/oauth2/default/v1/authorize` |
| OIDC client_id | `0oa20esd61y2ACBLf1d8` (public in authorize URL) |
| scopes | openid profile email offline_access |
| redirect_uri | `https://identity.bugcrowd.com/login/oauth2/code/hacker` |
| Org Set5 Okta | `https://bugcrowd-pam-5335.oktapreview.com` → UserHome `session_hint=AUTHENTICATED` |

Notes:
- Hacker login is Okta-backed under login.hackers.bugcrowd.com (not the PAM preview org by default).
- Set5 PAM org is a separate okta preview tenant for org/engagement workflows.
- Vault: `op://Personal/Bugcrowd Org (Set 5) Okta/*` and `Bugcrowd` item for platform creds.
- Do not store authorize `state`/`nonce` — ephemeral.


## Set5 admin host (passive 2026-08-07T14:19Z)

| Signal | Value |
|--------|-------|
| admin host | https://bugcrowd-pam-5335-admin.oktapreview.com |
| unauth path | OIDC authorize → `/admin/sso/callback` (PKCE S256, scope openid) |
| durable session via curl | **no** |
| detail | `runner-a/BC-OKTA-ADMIN-PASSIVE.md` |
