# H1 + GitLab auth doors (PULSE-89)

UTC: 2026-08-07T17:18:01Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://hackerone.com/users/sign_in` | 403 | - | curl/bot gate |
| `https://hackerone.com/users/sign_up` | 403 | - | curl/bot gate |
| `https://hackerone.com/users/password/new` | 200 | - | recovery shell |
| `https://hackerone.com/directory/programs` | 200 | - | directory |
| `https://hackerone.com/gitlab` | 200 | - | H1 program SPA |
| `https://hackerone.com/shopify` | 200 | - | H1 program SPA |
| `https://api.hackerone.com` | 200 | - | bare API |
| `https://api.hackerone.com/v1/hackers/me` | 401 | - | unauth |
| `https://gitlab.com/users/sign_in` | 403 | - | curl/bot gate |
| `https://gitlab.com/users/sign_up` | **400 HEAD / 200 GET** | - | method-sensitive; GET shell open |
| `https://gitlab.com/.well-known/openid-configuration` | 200 | - | OIDC |
| `https://gitlab.com/oauth/discovery/keys` | 200 | - | JWKS |
| `https://gitlab.com/oauth/authorize` | 302 | → /users/sign_in | |
| `https://gitlab.com/api/v4/version` | 401 | - | unauth |
| `https://gitlab.com/api/v4/user` | 401 | - | unauth |
| `https://gitlab.com/api/v4/projects?per_page=1` | 200 | - | public list |
| `https://about.gitlab.com/security/disclosure/` | 200 | - | disclosure |
| `https://bugcrowd.com/engagements/gitlab` | 404 | - | bare not SSoT |
| `https://bugcrowd.com/h/engagements/gitlab` | 200 | - | BC soft |
| `https://bugcrowd.com/h/engagements/gitlab/brief` | 200 | - | brief |

## Auth chain (passive)

1. H1 login browser-only (403 curl); SPA shells + password recovery **200**; API me **401**.
2. GitLab OIDC+keys **200**; sign_up **GET 200** (HEAD 400); sign_in **403**.
3. H2 submit SSoT remains H1 `/gitlab` (PARK vs F4); BC `/h` soft only.

## Delta vs P81

- **sign_up GET 200** again (P81 recorded **400** overall — HEAD still 400, prefer GET for shell probe).
- Otherwise stable: OIDC, H1 SPA, API 401, BC soft shells.

## Notes

- XOR unchanged: **PARK H2 GitLab** · deep F4 Dropbox.
- No credentials.

## Auth readiness

- H1 doors stable; H2 OIDC green; full scope needs H1 session export.

## Next (human / gated)

- Browser H1 session; keep F4 Inti path for slot-8.
