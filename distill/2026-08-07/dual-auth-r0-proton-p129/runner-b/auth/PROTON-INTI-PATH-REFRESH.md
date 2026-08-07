# PROTON-INTI-PATH-REFRESH — PULSE-41 (policy recon only)

**UTC:** 2026-08-07T15:40Z · **Runner B** · **No secrets · GET-only curl**  
**Axes:** `auth_ready_b` · `proton_inti_paths` · `claims`

Passive status map for F3 Proton dual-account prep + Intigriti researcher doors (F4 join path) + H1 light.

## F3 Proton

| Code | URL | Final / note |
|------|-----|----------------|
| **200** | proton.me/security/bug-bounty | **SSoT** first-party BB policy |
| **404** | proton.me/security | bare security hub gone |
| **404** | proton.me/support/bug-bounty-program | legacy support path dead |
| **200** | account.proton.me/login | dual free account door |
| **200** | account.proton.me/signup | dual free account door |
| **200** | mail.proton.me / drive / calendar | product shells (auth wall SPA) |
| **400** | account.proton.me/api/core/v4/domains/available?Name=x | API lives; bad Name param |
| **ERR/000** | mail.proton.me/api/core/v4/info | no public unauth probe this UA |

**Auth readiness:** dual free accounts still open via signup/login **200**; report channel remains email per SSoT page. No platform join.

## Intigriti researcher (F4 Dropbox join path)

| Code | URL | Final / note |
|------|-----|----------------|
| **200** | app.intigriti.com/auth/login + /login | public login shells |
| **200** | app.intigriti.com/researcher | → `login.intigriti.com` **connect/authorize** (OIDC) |
| **200** | app.intigriti.com/programs + Dropbox detail | public BB catalog |
| **200** | app.intigriti.com/profile | unauth shell 200 |
| **200** | login.intigriti.com + OIDC discovery | IdP up |
| **404** | api.intigriti.com bare + /core | no public API root |
| **400** | api.intigriti.com/external/researcher | endpoint exists; needs session |
| **200** | intigriti.com/researchers + bug-bounty-programs | marketing SSoT (programs → /researchers/bug-bounty-programs) |
| **404** | intigriti.com/bug-bounty | path drift |

**Auth readiness:** human browser join + `@intigriti.me` still required for F4 deep; curl cannot complete OIDC.

## H1 light (session export gap unchanged)

| Code | URL | note |
|------|-----|------|
| **200** | hackerone.com/directory/programs + /shopify | public shells |
| **200** | api.hackerone.com bare | |
| **401** | api.hackerone.com/v1/hackers/me | token/session required |
| **200** | docs.hackerone.com | |

## Claims (append)

- proton.me/security/bug-bounty remains F3 SSoT; bare /security and support/bug-bounty-program **404**
- account.proton.me login+signup **200** (dual free accounts open)
- Inti researcher still OIDC via login.intigriti.com; api bare **404**; external/researcher **400** unauth
- www.intigriti.com/bug-bounty **404**; use /researchers/bug-bounty-programs

## Policy

No live exploit · no credential spray · free-tier human signup only.
