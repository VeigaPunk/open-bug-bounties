# MSRC-DROPBOX-PATH-REFRESH — PULSE-46 (policy recon only)

**UTC:** 2026-08-07T15:52Z · **Runner B** · **No secrets · GET-only curl**  
**Axes:** `auth_ready_b` · `msrc_dropbox_paths` · `claims`

## F2 MSRC / identity

| Code | URL | Final / note |
|------|-----|----------------|
| **200** | msrc hub · /bounty · /bounty-online-services | policy SSoT |
| **200** | portal.msrc.microsoft.com | → msrc.microsoft.com/update-guide |
| **404** | portal…/en-us/researcher · /report | **drift** (final msrc.microsoft.com/en-us/… 404) |
| **404** | api.msrc.microsoft.com bare | |
| **200** | api.msrc…/cvrf/v3.0/updates | public CVRF |
| **200** | login.microsoftonline common OIDC discovery | |
| **401** | graph.microsoft.com/v1.0/me | unauth |
| **200** | graph $metadata · portal.azure · entra · admin.microsoft | shells |

**Auth readiness:** own Entra/M365 tenant still required; MSRC researcher/report portal paths need re-find (portal root → update-guide only).

## F4 Dropbox / Intigriti

| Code | URL | note |
|------|-----|------|
| **200** | dropbox.com · /login · /register | free-tier doors |
| **200** | /oauth2/authorize | missing_client_id error page (endpoint lives) |
| **200** | developers HTTP docs | |
| **404** | api.dropboxapi.com · api.dropbox.com · content.dropboxapi.com bare | |
| **400** | /2/users/get_current_account | unauth/malformed body |
| **200** | Inti dropbox program detail · intigriti.com/programs/dropbox → app | **BB SSoT** |
| **404** | dropbox.com/bug-bounty | use Intigriti |

## Claims

- portal MSRC researcher/report paths **404** this tick (update-guide still 200)
- Dropbox BB = Intigriti; first-party /bug-bounty 404
- OAuth authorize needs client_id; API roots 404; get_current_account 400 unauth

## Policy

No live exploit · no spray · free-tier human only.
