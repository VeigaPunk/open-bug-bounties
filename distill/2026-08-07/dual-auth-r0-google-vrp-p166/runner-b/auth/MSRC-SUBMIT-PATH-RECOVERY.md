# MSRC-SUBMIT-PATH-RECOVERY — PULSE-47 (policy recon only)

**UTC:** 2026-08-07T15:54Z · **Runner B** · **No secrets · GET-only**  
**Axes:** `auth_ready_b` · `msrc_submit_paths` · `claims`

## Recovery (P46 portal drift fixed)

Legacy `portal.msrc…/en-us/report` and `/researcher` **404**. Live submit lives on **msrc.microsoft.com** (no `/en-us/` prefix).

| Code | URL | Final / note |
|------|-----|----------------|
| **200** | https://msrc.microsoft.com/report | **submit hub SSoT** |
| **200** | …/report/vulnerability | vuln report entry |
| **200** | …/create-report | → **/report/vulnerability/new** (new report form) |
| **200** | robots.txt | `Allow: /report` |
| **404** | …/en-us/report · …/en-us/researcher | dead locale paths |
| **200** | portal.msrc → update-guide | not submit |
| **200** | microsoft.com/…/msrc/faqs-report-an-issue | FAQ |
| **404** | microsoft.com/…/msrc/report | marketing path dead |
| **200** | msrc/bounty · bounty-online-services · bounty-microsoft-azure · cvd | policy pages |
| **404** | bounty-microsoft-365 | path drift |
| **200** | update-guide · blog→msrc blog | |
| **401** | api.security.microsoft.com | unauth |

## Auth readiness impact

| Need | Status |
|------|--------|
| Report channel | **Found** — browser to `/report/vulnerability/new` |
| Researcher profile | Still likely required at submit (Microsoft account) |
| Own tenant (OBB) | Unchanged — own Entra/M365 for testing |

## Claims

- MSRC submit SSoT is msrc.microsoft.com/report (+ /vulnerability/new)
- portal.msrc is update-guide only; en-us report/researcher 404
- create-report redirects to report/vulnerability/new

## Policy

No live exploit · no spray · free-tier human only.
