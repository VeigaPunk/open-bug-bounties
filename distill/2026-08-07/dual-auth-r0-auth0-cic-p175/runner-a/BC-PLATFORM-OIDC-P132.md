# BC-PLATFORM-OIDC-P132
UTC: 2026-08-07T18:49:14Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://bugcrowd.com/` | 301 | https://www.bugcrowd.com/ |
| `GET` | `https://www.bugcrowd.com/` | 200 | marketing |
| `GET` | `https://bugcrowd.com/user/sign_in` | 302 | identity.bugcrowd.com/login?user_hint=researcher&returnTo=…dashboard |
| `GET` | `https://bugcrowd.com/user/sign_up` | 301 | https://login.bugcrowd.com/signin/register |
| `GET` | `https://identity.bugcrowd.com/` | 403 | bare gate |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | researcher login shell |
| `GET` | `https://login.bugcrowd.com/` | 302 | tracker.bugcrowd.com/user/sign_in |
| `GET` | `https://login.bugcrowd.com/.well-known/openid-configuration` | 200 | OIDC root |
| `GET` | `https://login.bugcrowd.com/oauth2/default/.well-known/openid-configuration` | 200 | auth server |
| `GET` | `https://login.bugcrowd.com/oauth2/default/v1/keys` | 200 | JWKS |
| `GET` | `https://login.bugcrowd.com/register` | 404 | path drift |
| `GET` | `https://login.bugcrowd.com/signin/register` | 200 | register shell |
| `GET` | `https://login.hackers.bugcrowd.net/` | ERR | unreachable this tick |
| `GET` | `https://login.hackers.bugcrowd.net/.well-known/openid-configuration` | ERR | - |
| `GET` | `https://login.hackers.bugcrowd.net/oauth2/default/.well-known/openid-configuration` | ERR | - |
| `GET` | `https://login.hackers.bugcrowd.net/oauth2/default/v1/keys` | ERR | - |
| `GET` | `https://api.bugcrowd.com/` | 200 | - |
| `GET` | `https://api.bugcrowd.com/v2` | 404 | - |
| `GET` | `https://docs.bugcrowd.com/api` | 404 | - |
| `GET` | `https://tracker.bugcrowd.com/` | 302 | /user/sign_in |
| `GET` | `https://bugcrowd.com/engagements` | 200 | - |
| `GET` | `https://bugcrowd.com/h/engagements` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/atlassian` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/openai` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/aiven` | 404 | slug still missing |
| `GET` | `https://bugcrowd.com/engagements?search=aiven` | 200 | search shell |
| `GET` | `https://bugcrowd.com/programs` | 301 | /engagements |

## Summary
BC platform OIDC + engagement map refresh for runner-a (P132).
- **SSoT login OIDC:** `login.bugcrowd.com` discovery + oauth2/default + keys all **200**.
- Researcher sign_in hop → **identity.bugcrowd.com/login** 200; identity bare **403**.
- Register: `/register` **404** vs `/signin/register` **200** (stable path drift).
- **Delta:** `login.hackers.bugcrowd.net` OIDC suite **ERR** this tick (was 200 P122) — treat as flaky/alt host; prefer login.bugcrowd.com.
- Engagements: okta, auth0-okta, atlassian, openai **200**; aiven slug **404**; search shell **200**.
- programs→engagements **301**; api bare **200** /v2 **404**; tracker→sign_in.

## Auth readiness
Use identity.bugcrowd.com/login + login.bugcrowd.com OIDC for BC researcher session; do not depend on login.hackers this tick.
