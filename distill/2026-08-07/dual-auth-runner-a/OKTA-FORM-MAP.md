# Okta Set5 form map — bugcrowd-pam-5335.oktapreview.com

**Probe method:** unauthenticated curl (no cookie jar) of `/` → UserHome SPA shell  
**ts:** 2026-08-07T22:36:06Z  
**HTTP:** 200 · bytes 6375  
**final_url:** `https://bugcrowd-pam-5335.oktapreview.com/app/UserHome?iss=https%3A%2F%2Fbugcrowd-pam-5335.oktapreview.com&session_hint=AUTHENTICATED`

**Interpretation:** Okta enduser-v2 SPA shell. `session_hint=AUTHENTICATED` is a **redirect query flag**, not proof of durable headless session cookies for this curl client. Treat as SPA bootstrap only.

## Form fields (static HTML)

- **input_count:** 0 (login form **JS-rendered** by Okta Sign-In Widget / enduser-v2)
- Expected widget fields (Okta standard):
  - `identifier` / username
  - `password`
  - optional MFA challenge (Okta Verify / TOTP / email)
- Auth path for program org: password primary → MFA if org policy requires

## Signal counts in shell HTML (this probe)

| key | count |
|-----|------:|
| session_hint | 0 |
| AUTHENTICATED | 0 |
| UserHome | 0 |
| okta-signin-container | 0 |
| password | 0 |
| username | 0 |
| identifier | 0 |
| enduser | 5 |

## Script sources

- `https://op3static2.oktacdn.com/assets/js/mvc/sentry-wrapper/sentry-wrapper.pack.df0341117f37a4556d86db4ca920273b.js`
- `https://op3static2.oktacdn.com/assets/apps/enduser-v2.enduser/0.0.1-2555-g3277b0e/static/js/main.js`

## op:// injection map (never expand secrets into files)

- username: `op://Personal/Bugcrowd Org (Set 5) Okta/username`
- password: `op://Personal/Bugcrowd Org (Set 5) Okta/password`
- inject: `op run -- env` / env-file with vars; **do not** print password
- field labels confirmed: `username` (STRING), `password` (CONCEALED), `notesPlain`

## Session blockers

1. SPA login needs real browser (Canary CDP / TinyFish automation profile).
2. MFA may be required after password (program: Super Admins + MFA).
3. Curl cannot establish durable Okta session cookies for app tiles.
4. Prefer unlocked `op` desktop integrate for `op run` injection.
5. Scope: pam-5335 preview only — no production customer tenants.

## Admin sibling (passive)

- `https://bugcrowd-pam-5335-admin.oktapreview.com/` → HTTP 200 (engagement doors file)

## Cookie names expected (names only — never values)

`sid`, `xids`, `JSESSIONID`, `t`, `DT`
