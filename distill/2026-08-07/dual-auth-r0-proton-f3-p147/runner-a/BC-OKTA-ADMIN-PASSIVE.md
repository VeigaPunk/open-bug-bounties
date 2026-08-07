# BC + Okta Set5 admin — passive OIDC map (policy recon only)

**UTC:** 2026-08-07T14:19:54Z  
**No secrets, no cookies values, no exploit.**

## Bugcrowd hacker platform

| Probe | HTTP | Effective |
|-------|------|-----------|
| login.hackers.bugcrowd.com | 200 | oauth2/default/v1/authorize (public client) |
| bugcrowd.com/user/sign_in | 200 | chains to same authorize |
| api.bugcrowd.com | 200 | API root shell |
| tracker.bugcrowd.com | 200 | → /user/sign_in |

**Public OIDC (from redirect, ephemeral state/nonce discarded):**

- issuer path: `login.hackers.bugcrowd.com/oauth2/default`
- client_id: `0oa20esd61y2ACBLf1d8` (public)
- scopes: openid profile email offline_access
- redirect_uri: `https://identity.bugcrowd.com/login/oauth2/code/hacker`

## Okta Set5 org (engagement)

| Host | Unauth result |
|------|----------------|
| bugcrowd-pam-5335.oktapreview.com | 302 → UserHome `session_hint=AUTHENTICATED` (non-durable; sid Max-Age=0) |
| …/login/login.htm | same UserHome shell |
| bugcrowd-pam-5335-admin.oktapreview.com | 200 via OIDC authorize to admin SSO callback |

**Admin OIDC signals (public query params only):**

- authorize: `/oauth2/v1/authorize`
- response_type=code · response_mode=query · PKCE S256
- client_id pattern: `okta.<uuid>` (Okta admin app; public in redirect)
- redirect_uri: `https://bugcrowd-pam-5335-admin.oktapreview.com/admin/sso/callback`
- scope: openid

**Judgment:** Admin host is live; headless curl is **not** an admin session. Human browser + MFA + op vault required for any Super Admin class testing.

## H1 Shopify (cross-lane passive)

| URL | Code |
|-----|------|
| hackerone.com/shopify | 200 |
| ?type=team | 200 |

Asset table still PARTIAL without logged-in H1 export (Runner B).

## Axes

- evidence_fidelity↑ (admin OIDC path documented)
- auth_ready↑ (clear human vs headless boundary)
- safety_in_policy↑ (no credential use this tick)
