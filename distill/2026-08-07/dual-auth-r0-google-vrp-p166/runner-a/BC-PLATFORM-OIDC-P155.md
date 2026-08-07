# BC-PLATFORM-OIDC-P155
UTC: 2026-08-07T19:36:49Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://bugcrowd.com/` | 301 | → https://www.bugcrowd.com/ |
| `GET` | `https://bugcrowd.com/user/sign_in` | 302 | → https://identity.bugcrowd.com/login (IdP/auth hop) |
| `GET` | `https://bugcrowd.com/engagements` | 200 | - |
| `GET` | `https://bugcrowd.com/programs` | 301 | → https://bugcrowd.com/engagements |
| `GET` | `https://identity.bugcrowd.com/` | 403 | - |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | - |
| `GET` | `https://identity.bugcrowd.com/.well-known/openid-configuration` | 403 | - |
| `GET` | `https://tracker.bugcrowd.com/` | 302 | → https://tracker.bugcrowd.com/user/sign_in (IdP/auth hop) |
| `GET` | `https://tracker.bugcrowd.com/user/sign_in` | 200 | - |
| `GET` | `https://login.bugcrowd.com/` | 302 | → https://tracker.bugcrowd.com/user/sign_in (IdP/auth hop) |
| `GET` | `https://hackers.bugcrowd.com/` | 200 | - |
| `GET` | `https://hackers.bugcrowd.com/.well-known/openid-configuration` | 404 | - |
| `GET` | `https://api.bugcrowd.com/` | 200 | - |
| `GET` | `https://docs.bugcrowd.com/` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/atlassian` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/openai` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/aiven-mbb-og` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/aiven` | 404 | - |

## Summary
Bugcrowd platform IdP + engagement matrix passive refresh (P155 runner-a).

## Auth readiness
- IdP SSoT: identity.bugcrowd.com/login; tracker/login hop to sign_in.
- Engagement matrix for dual-auth targets this tick.

## Deltas vs P148
- user/sign_in → identity.login **stable**; identity apex **403** vs login **200**.
- identity OIDC well-known **403** (was not always probed); hackers OIDC still **404**.
- tracker+login.bugcrowd → tracker sign_in **200**.
- engagements okta+auth0-okta+atlassian+openai+aiven-mbb-og **200**; bare aiven **404**.
- programs→engagements **301**; api+docs **200**. Matrix stable overall.
