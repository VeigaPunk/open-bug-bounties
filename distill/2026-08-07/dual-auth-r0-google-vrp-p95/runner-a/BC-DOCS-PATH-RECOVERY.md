# Bugcrowd docs path recovery (passive GET only)

UTC: 2026-08-07T15:07:03Z
Goal: re-locate ninja-email + API docs after PULSE-22 404s.
Policy: unauthenticated GET status only.

| URL | code0 | follow→ | notes |
|-----|-------|---------|-------|
| `https://docs.bugcrowd.com/` | 200 | 200 | - |
| `https://docs.bugcrowd.com/researchers/` | 404 | 404 | - |
| `https://docs.bugcrowd.com/researchers/onboarding/` | 404 | 404 | - |
| `https://docs.bugcrowd.com/researchers/onboarding/getting-started/` | 404 | 404 | - |
| `https://docs.bugcrowd.com/researchers/onboarding/your-bugcrowdninja-email-address/` | 404 | 404 | - |
| `https://docs.bugcrowd.com/researchers/reporting/your-bugcrowdninja-email-address/` | 404 | 404 | - |
| `https://docs.bugcrowd.com/researchers/participating-in-program/your-bugcrowdninja-email-address/` | 200 | 200 | - |
| `https://docs.bugcrowd.com/customers/submission-management/using-email-aliases/` | 404 | 404 | - |
| `https://docs.bugcrowd.com/researchers/reporting/email-submissions/` | 404 | 404 | - |
| `https://docs.bugcrowd.com/api/getting-started/` | 200 | 200 | - |
| `https://docs.bugcrowd.com/api/v4/` | 404 | 404 | - |
| `https://docs.bugcrowd.com/api/v3/` | 404 | 404 | - |
| `https://docs.bugcrowd.com/api/reference/` | 404 | 404 | - |
| `https://docs.bugcrowd.com/developers/` | 404 | 404 | - |
| `https://docs.bugcrowd.com/developers/api/` | 404 | 404 | - |
| `https://docs.bugcrowd.com/changelog/` | 200 | 200 | - |
| `https://docs.bugcrowd.com/search/?q=bugcrowdninja` | 404 | 404 | - |
| `https://docs.bugcrowd.com/search/?q=api` | 404 | 404 | - |
| `https://bugcrowd.com/resources` | 404 | 404 | - |
| `https://www.bugcrowd.com/resources/researchers/` | 404 | 404 | - |

## Recovery notes
- Prefer first **200** path for ninja-email and API as new SSoT candidates.
- 404 = path drift; do not invent content.
- No credentials.

## New SSoT candidates (this tick)
| Topic | Working URL | Status |
|-------|-------------|--------|
| bugcrowdninja email | `https://docs.bugcrowd.com/researchers/participating-in-program/your-bugcrowdninja-email-address/` | **200** |
| API getting started | `https://docs.bugcrowd.com/api/getting-started/` | **200** |
| Docs root / changelog | `https://docs.bugcrowd.com/` · `/changelog/` | **200** |

Supersedes prior onboarding/ path and bare `/api/` which 404.

## PULSE-43 relocate
SSoT path corrected to `your-bugcrowdninja-email-address` (sitemap). See `BC-NINJA-DOCS-RELOCATE.md`.
