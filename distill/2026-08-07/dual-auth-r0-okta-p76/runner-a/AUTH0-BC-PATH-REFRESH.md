# AUTH0-BC-PATH-REFRESH — PULSE-42 (policy recon only)

**UTC:** 2026-08-07T15:44Z · **Runner A** · **No secrets · GET-only curl**  
**Axes:** `auth_ready_a` · `auth0_bc_paths` · `claims`

Passive refresh for Auth0 product doors + BC identity OIDC + Okta light.

## Auth0 product

| Code | URL | Final / note |
|------|-----|----------------|
| **200** | auth0.com/signup | public signup shell |
| **404** | auth0.com/login | still dead (use manage OIDC) |
| **404** | auth0.com/u/login | bare /u/login now **404** (was 400 earlier) |
| **200** | auth0.com/security | → security.okta.com |
| **200** | auth0.com/docs | docs shell |
| **302→OIDC** | manage.auth0.com | → auth0.auth0.com/authorize (PKCE); curl follow unstable |
| **200** | auth0.auth0.com/.well-known/openid-configuration | IdP discovery up |
| **404** | auth0.com/blog/responsible-disclosure-program | blog path dead |
| **200** | auth0.com/responsible-disclosure-policy | → **bugcrowd.com/engagements/auth0-okta** SSoT |
| **login_required** | support.auth0.com | authorize bounce unauth |
| **200** | cdn.auth0.com | static CDN |

## BC identity + engagement

| Code | URL | note |
|------|-----|------|
| **200** | bugcrowd.com/engagements | catalog |
| **200** | engagements/auth0-okta | **Auth0 bounty SSoT** |
| **404** | engagements/auth0 · okta-auth0 | slug drift |
| **200** | user/sign_in | → login.hackers OIDC authorize → identity callback |
| **200** | user/sign_up | → login.bugcrowd.com/signin/register |
| **403** | identity.bugcrowd.com bare | still blocked unauth |
| **200** | login.hackers + OIDC discovery | hacker IdP up |
| **200** | tracker → user/sign_in | SPA gate |
| **200** | api.bugcrowd.com bare | |
| **404** | api.bugcrowd.com/v2 | |
| **200** | docs …/api/getting-started/ | API docs SSoT |
| **404** | docs …/using-your-bugcrowdninja-email-address/ | **path drift this tick** (was 200 at PULSE recovery) |

## Okta light

| Code | URL | note |
|------|-----|------|
| **200** | developer.okta.com/signup · login.okta.com · trust.okta.com | |
| **404** | okta.com/bug-bounty/ | use BC engagements/okta **200** |

## Claims (append)

- auth0 RD policy → BC auth0-okta still SSoT; blog RD path **404**
- auth0.com/u/login **404** this tick (prior 400)
- manage.auth0.com still OIDC authorize to auth0.auth0.com
- BC ninja-email docs long path **404** this tick — re-locate before citing
- sign_in still chains login.hackers → identity OAuth callback

## Policy

No live exploit · no credential spray · free-tier human signup only.
