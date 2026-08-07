# QBC-ENGAGEMENT-MATRIX-P48 — bare vs /h vs programs (policy recon)

**UTC:** 2026-08-07T15:56Z · **Runner A** · **No secrets · GET-only**  
**Axes:** `auth_ready_a` · `qbc_engagement_matrix` · `claims`

Legend: bare = `/engagements/{slug}` · brief = `…/brief` · /h = `/h/engagements/{slug}` · programs = `/programs/{slug}`

| Slug | bare | brief | /h | /h/brief | programs |
|------|------|-------|-----|----------|----------|
| **aiven** | **404** | **200** → /h/…/brief | **200** | **200** | **404** |
| **auth0-okta** | **200** | **200** → /h | **200** | **200** | **404** |
| **auth0** | **404** | **200** → /h | **200** | **200** | **404** |
| **okta-auth0** | **404** | **200** → /h | **200** | **200** | **404** |
| **okta** | **200** | **200** → /h | **200** | **200** | **404** |
| **atlassian** | **200** | **200** → /h | **200** | **200** | **404** |
| **openai** | **200** | **200** → /h | **200** | **200** | **404** |

## Rules of thumb

1. Prefer **`/h/engagements/{slug}`** for always-on public shells (works even when bare **404**).
2. **`/engagements/{slug}/brief`** always redirects to **`/h/…/brief`** when engagement exists.
3. **`/programs/*` always 404** — engagements path is SSoT (not programs).
4. Auth0 marketing slug: use **auth0-okta** for bare catalog **200**; bare **auth0**/**okta-auth0** **404** but **/h/** still **200**.
5. Aiven: bare catalog **404**; use **/h/engagements/aiven** (+ brief).

## Platform light

| Code | URL | note |
|------|-----|------|
| **200** | bugcrowd.com/engagements | catalog |
| **200** | user/sign_in | → login.hackers OIDC |
| **200** | tracker sign_in | |
| **200** | ninja email docs (your- path) | SSoT holds |

## Claims

- All QBC /h shells 200 this tick; programs/* 404
- aiven/auth0/okta-auth0 bare 404; use /h or brief
- auth0-okta/okta/atlassian/openai bare 200

## Policy

No live exploit · no spray · free-tier human only.
