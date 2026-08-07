# BC-NINJA-DOCS-RELOCATE — PULSE-43 (policy recon only)

**UTC:** 2026-08-07T15:46Z · **Runner A** · **No secrets · GET-only**  
**Axes:** `auth_ready_a` · `bc_ninja_docs` · `claims`

## Drift fixed

Prior SSoT path used `using-your-bugcrowdninja-email-address` → **404** as of PULSE-42.

Sitemap (`docs.bugcrowd.com/sitemap.xml` **200**) lists:

| Code | Path | Role |
|------|------|------|
| **200** | `/researchers/participating-in-program/your-bugcrowdninja-email-address/` | **New SSoT** (drop `using-`) |
| **200** | `…/your-bugcrowdninja-email-address/email-filter/` | filter subpage |
| **404** | `…/using-your-bugcrowdninja-email-address/` | legacy |
| **404** | bare `/researchers/`, `/participating-in-program/` trees (index) | SPA/docs host serves leaf only |
| **200** | `docs.bugcrowd.com/` + `api/getting-started/` | docs root + API SSoT |
| **404** | `docs.bugcrowd.com/api/` bare · public search | no public search |

Full SSoT URL:  
`https://docs.bugcrowd.com/researchers/participating-in-program/your-bugcrowdninja-email-address/`

## BC identity light (same tick)

| Code | URL | note |
|------|-----|------|
| **200** | tracker.bugcrowd.com/user/sign_in | |
| **200** | identity.bugcrowd.com/login | path works (bare identity **403** earlier) |
| **400** | login.hackers …/oauth2/default/v1/authorize bare | needs OIDC params |
| **200** | login.hackers OIDC discovery (root + oauth2/default) | |
| **200** | bugcrowd.com/engagements | |

## Claims

- Ninja email docs SSoT is `your-bugcrowdninja-email-address` not `using-your-…`
- identity.bugcrowd.com/login **200** while bare host **403**
- authorize bare **400** without client/state

## Policy

No live exploit · no spray · free-tier human only.
