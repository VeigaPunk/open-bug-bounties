# Bugcrowd platform auth doors (passive GET only)

UTC: 2026-08-07T14:59:06Z
Policy: unauthenticated status + Location only. No login POST, no token spray, no exploit.
Ephemeral OAuth `state`/`nonce` values from redirects are **not** stored here.

| URL | code0 | follow→ | notes |
|-----|-------|---------|-------|
| `https://bugcrowd.com/` | 301 | 200 | → www.bugcrowd.com |
| `https://www.bugcrowd.com/` | 200 | 200 | marketing shell |
| `https://bugcrowd.com/user/sign_in` | 302 | 200 | → identity → login.hackers OIDC authorize (oauth2/default) |
| `https://tracker.bugcrowd.com/` | 302 | 200 | → /user/sign_in |
| `https://tracker.bugcrowd.com/user/sign_in` | 200 | 200 | tracker login shell |
| `https://identity.bugcrowd.com/` | 403 | 403 | bare host denied unauth |
| `https://login.hackers.bugcrowd.com/` | 302 | 200 | bounce identity then OIDC authorize |
| `https://login.hackers.bugcrowd.com/.well-known/openid-configuration` | 200 | 200 | IdP discovery |
| `https://bugcrowd.com/engagements` | 200 | 200 | public program list |
| `https://bugcrowd.com/programs` | 301 | 200 | → /engagements |
| `https://bugcrowd.com/crowdstream` | 200 | 200 | public |
| `https://docs.bugcrowd.com/` | 200 | 200 | docs root |
| `https://docs.bugcrowd.com/api/` | 404 | 404 | path drift; re-find API docs index |
| `https://docs.bugcrowd.com/researchers/onboarding/your-bugcrowdninja-email-address/` | 404 | 404 | path drift vs prior SSoT claim — re-verify ninja email doc |
| `https://api.bugcrowd.com/` | 200 | 200 | bare API host responds |
| `https://api.bugcrowd.com/v2` | 404 | 404 | no public v2 root |
| `https://bugcrowd.com/auth/auth0` | 301 | 200 | → /h/auth/auth0 |
| `https://bugcrowd.com/user/sign_up` | 301 | 200 | → login.bugcrowd.com/signin/register |
| `https://tracker.bugcrowd.com/dashboard` | 302 | 200 | unauth → sign_in |
| `https://bugcrowd.com/settings` | 404 | 404 | no public settings |

## Auth chain (researcher)
1. `bugcrowd.com/user/sign_in` → `identity.bugcrowd.com/login?user_hint=researcher` → hacker OAuth path
2. Terminal IdP: `login.hackers.bugcrowd.com/oauth2/default/v1/authorize` (Okta-style; client_id public OAuth)
3. `redirect_uri` lands on `identity.bugcrowd.com/login/oauth2/code/hacker`
4. Tracker uses separate `tracker.bugcrowd.com/user/sign_in` shell (200 unauth form page)

## Notes
- identity bare **403**; OIDC discovery on login.hackers **200** (stable).
- docs ninja-email path **404 this tick** — prior SSoT URL may have moved; human re-check docs search.
- No credentials, no mutation, no customer-tenant, no stored tokens.
