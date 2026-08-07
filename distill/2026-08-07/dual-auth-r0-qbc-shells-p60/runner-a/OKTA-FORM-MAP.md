# Okta Set5 form map — bugcrowd-pam-5335.oktapreview.com

**Probe method:** unauthenticated curl (no cookie jar) of /login/login.htm and /

**Observed final URL:** `/app/UserHome?iss=...&session_hint=AUTHENTICATED` (HTTP 200, ~6375 bytes)

**Interpretation:** Okta Classic/OIE SPA shell; `session_hint=AUTHENTICATED` can appear as a **hint flag in redirect URL** even without a live cookie session on this host. Shared probe also saw this. Treat as **SPA bootstrap**, not proof of interactive session for runner-a curl.


## Form fields (static HTML)

- **input_count:** 0 in downloaded shell (login form is **JS-rendered** by Okta Sign-In Widget).

- Expected widget fields (Okta standard, not observed as static inputs):

  - `identifier` / username
  - `password`
  - optional MFA challenge (Okta Verify / TOTP / email)

- Auth path for program org: password primary → MFA if org policy requires (Okta BB brief: enforce MFA for MFA-bypass class).


## Signal counts in shell HTML

- `session_hint`: 0
- `AUTHENTICATED`: 0
- `UserHome`: 0
- `okta-signin-container`: 0
- `data-se`: 0
- `password`: 1
- `username`: 0
- `identifier`: 0
- `signin`: 0
- `okta-sign-in`: 0
- `widget`: 0

## Script sources (first 15)

- https://op3static2.oktacdn.com/assets/js/mvc/sentry-wrapper/sentry-wrapper.pack.df0341117f37a4556d86db4ca920273b.js
- https://op3static2.oktacdn.com/assets/apps/enduser-v2.enduser/0.0.1-2555-g3277b0e/static/js/main.js

## op:// injection map (never expand secrets into files)

- username: `op://Personal/Bugcrowd Org (Set 5) Okta/username`

- password: `op://Personal/Bugcrowd Org (Set 5) Okta/password`

- inject: `op run --env-file` or `op run -- curl ...` with env vars; **do not** print password.


## Session blockers

1. Login form is SPA — needs real browser (Canary CDP / TinyFish automation profile) for interactive auth.

2. MFA may be required after password (program guidance: create Super Admins + enforce MFA).

3. Curl cannot establish durable Okta session cookies for app tile access.

4. op CLI field read must succeed in unlocked session for injection; verify labels match vault item.

5. No live exploitation / no production customer tenants — org is bugcrowd-pam-5335 preview only.

