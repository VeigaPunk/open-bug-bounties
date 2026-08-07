# Bugcrowd tracker + API auth doors — passive (Runner A)

**UTC:** 2026-08-07T14:40:09Z  
**Policy recon only** — no login, no API tokens, no exploit.

## Live status this tick

| URL | Code | Role |
|-----|------|------|
| https://tracker.bugcrowd.com | 200 | Tracker shell |
| https://tracker.bugcrowd.com/user/sign_in | 200 | Tracker sign-in (often chains to login.bugcrowd.com) |
| https://bugcrowd.com/user/sign_in | 200 | Platform sign-in entry |
| https://bugcrowd.com/sessions | **404** | No bare sessions path |
| https://login.bugcrowd.com | 200 | Login front door |
| https://login.hackers.bugcrowd.com | 200 | Hacker IdP host |
| https://login.hackers.bugcrowd.com/.well-known/openid-configuration | 200 | OIDC discovery (hacker) |
| https://identity.bugcrowd.com | **403** | Identity host denies unauth GET |
| https://api.bugcrowd.com | 200 | API root shell |
| https://api.bugcrowd.com/v2 | **404** | No public /v2 index |
| https://api.bugcrowd.com/docs | **404** | Docs not on api host |
| https://docs.bugcrowd.com/api/getting-started | 200 | API docs SSoT |
| https://bugcrowd.com/programs/engaged | **404** | Engaged list needs authed SPA |

## Auth-ready implications

1. Hacker OIDC remains at **login.hackers.bugcrowd.com** (see `shared/BC-OAUTH-MAP.md`).
2. **identity.bugcrowd.com** returns 403 unauth — normal for OAuth code exchange host; do not treat as outage.
3. Public API surface is **docs.bugcrowd.com/api** + api.bugcrowd.com shell; token-backed calls need human session / personal API token (op vault, never distill).
4. `programs/engaged` and bare `/sessions` are not public recon targets.

## Related

- `BC-OAUTH-MAP.md`, `BC-OKTA-ADMIN-PASSIVE.md`, `BC-NINJA-EMAIL-PASSIVE.md`
- `AUTH-READINESS.md`

## Axes

- auth_ready_a↑ (tracker/API door map)
- evidence_fidelity↑ (403/404 boundaries)
- safety_in_policy↑
