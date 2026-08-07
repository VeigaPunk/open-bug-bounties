# BC-PLATFORM-OIDC-P148
UTC: 2026-08-07T19:22:58Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://bugcrowd.com/` | 301 | → www.bugcrowd.com |
| `GET` | `https://www.bugcrowd.com/` | 200 | marketing |
| `GET` | `https://bugcrowd.com/login` | 404 | legacy path |
| `GET` | `https://bugcrowd.com/user/sign_in` | 302 | → identity.bugcrowd.com/login?user_hint=researcher |
| `GET` | `https://identity.bugcrowd.com/` | 403 | bare apex |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | IdP SSoT shell |
| `GET` | `https://login.bugcrowd.com/` | 302 | → tracker sign_in |
| `GET` | `https://tracker.bugcrowd.com/` | 302 | → /user/sign_in |
| `GET` | `https://tracker.bugcrowd.com/user/sign_in` | 200 | tracker login shell |
| `GET` | `https://hackers.bugcrowd.com/` | 200 | hackers portal |
| `GET` | `https://hackers.bugcrowd.com/.well-known/openid-configuration` | 404 | **OIDC gone** (was 200 earlier) |
| `GET` | `https://bugcrowd.com/engagements` | 200 | engagement index |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/atlassian` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/openai` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/aiven` | 404 | use aiven-mbb-og |
| `GET` | `https://bugcrowd.com/engagements/aiven-mbb-og` | 200 | - |
| `GET` | `https://bugcrowd.com/programs` | 301 | → /engagements |
| `GET` | `https://docs.bugcrowd.com/` | 200 | - |
| `GET` | `https://api.bugcrowd.com/` | 200 | - |

## Summary
BC platform OIDC/auth door refresh for runner-a (P148). Researcher sign_in hops to **identity.bugcrowd.com/login** (200); identity apex 403; tracker/login.bugcrowd → tracker sign_in 200. hackers OIDC well-known still **404**. Engagements okta+auth0-okta+atlassian+openai+aiven-mbb-og **200**; bare aiven **404**; programs→engagements. Auth readiness: identity login browser SSoT.

## Deltas vs P132
- hackers OIDC remains **404** (not recovered).
- identity login **200** vs apex **403** stable split.
- Core engagement matrix **stable**.
