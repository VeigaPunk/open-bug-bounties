# H1 + GitLab auth doors (PULSE-71)

UTC: 2026-08-07T16:42:28Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://hackerone.com` | 302 | → www.hackerone.com/ | |
| `https://www.hackerone.com` | 200 | - | marketing shell |
| `https://hackerone.com/users/sign_in` | 403 | - | curl/bot gate |
| `https://hackerone.com/users/sign_up` | 403 | - | curl/bot gate |
| `https://hackerone.com/users/password/new` | 200 | - | recovery shell |
| `https://hackerone.com/oauth/authorize` | 302 | → /users/sign_in | needs session |
| `https://hackerone.com/users/auth/google_oauth2` | 404 | - | path gone/not public |
| `https://hackerone.com/users/auth/github` | 404 | - | path gone/not public |
| `https://hackerone.com/directory/programs` | 200 | - | directory shell |
| `https://hackerone.com/opportunities/all` | 200 | - | opportunities shell |
| `https://hackerone.com/shopify` | 200 | - | H1 program SPA shell |
| `https://hackerone.com/gitlab` | 200 | - | H1 program SPA shell |
| `https://api.hackerone.com` | 200 | - | bare API shell |
| `https://api.hackerone.com/v1/me` | 401 | - | unauth |
| `https://api.hackerone.com/v1/hackers/me` | 401 | - | unauth |
| `https://api.hackerone.com/v1/hackers/programs` | 401 | - | unauth |
| `https://docs.hackerone.com` | 302 | → /en/ | |
| `https://docs.hackerone.com/en/` | 200 | - | docs SSoT |
| `https://gitlab.com` | 301 | → about.gitlab.com/ | |
| `https://gitlab.com/users/sign_in` | 403 | - | curl/bot gate |
| `https://gitlab.com/users/sign_up` | 200 | - | free signup shell |
| `https://gitlab.com/.well-known/openid-configuration` | 200 | - | OIDC discovery |
| `https://gitlab.com/oauth/discovery/keys` | 200 | - | JWKS |
| `https://gitlab.com/oauth/authorize` | 302 | → /users/sign_in | |
| `https://gitlab.com/oauth/token` | 302 | → /users/sign_in | GET unauth hop |
| `https://gitlab.com/api/v4/user` | 401 | - | unauth |
| `https://gitlab.com/api/v4/version` | 401 | - | unauth (same as P59) |
| `https://gitlab.com/api/v4/projects?per_page=1` | 200 | - | public list |
| `https://about.gitlab.com/security/disclosure/` | 200 | - | disclosure policy |
| `https://bugcrowd.com/engagements/gitlab` | 404 | - | bare not SSoT |
| `https://bugcrowd.com/h/engagements/gitlab` | 200 | - | BC soft shell |
| `https://bugcrowd.com/h/engagements/gitlab/brief` | 200 | - | brief shell |
| `https://bugcrowd.com/programs/gitlab` | 404 | - | retired alias dead |
| `https://tracker.bugcrowd.com/gitlab` | 302 | → /user/sign_in | |

## Auth chain (passive)

1. H1 app login: browser required (sign_in/up **403** to curl); password/new + directory/opportunities **200**.
2. H1 OAuth authorize → sign_in; public `/users/auth/{google_oauth2,github}` **404** this tick (not usable as bare SSO doors).
3. H1 API: bare **200**; me/programs **401** without token.
4. GitLab: about bounce; sign_up **200**; OIDC+keys **200**; authorize/token → sign_in; api v4/user+version **401**; public projects list **200**.
5. GitLab H1 program shell **200** is submit SSoT for H2 (parked vs F4); BC `/h` soft shell is not join path for H1 programs.

## Delta vs P59

- Confirmed `users/auth/google_oauth2` + `github` **404** (new explicit check).
- `/h/engagements/gitlab/brief` **200**; programs/gitlab still **404**.
- tracker.gitlab → sign_in (expected).
- api v4/version still **401** (not public).

## Notes

- XOR unchanged: **PARK H2 GitLab** · deep F4 Dropbox.
- H1 Shopify still MED until human session + asset export.
- No credentials; sessions human-only.

## Auth readiness

- H1 doors: SPA shells stable; curl login blocked; API gated 401.
- H2 GitLab: OIDC discovery green; full scope still needs H1 login export + own group.

## Next (human / gated)

- Browser H1 session; export shopify+gitlab assets if reopening H2; keep F4 Inti join path.
