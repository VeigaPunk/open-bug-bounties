# Bugcrowd @bugcrowdninja email — passive docs map (Runner A)

**UTC:** 2026-08-07T14:38:38Z  
**Policy recon only** — no account actions, no alias mint.

## Live status this tick

| URL | Code | Role |
|-----|------|------|
| https://docs.bugcrowd.com/ | 200 | Docs root |
| https://docs.bugcrowd.com/researchers/onboarding/welcome/ | 200 | Researcher onboarding (sidenav SSoT) |
| https://docs.bugcrowd.com/researchers/participating-in-program/your-bugcrowdninja-email-address/ | **200** | **SSoT** for @bugcrowdninja |
| https://docs.bugcrowd.com/researchers/participating-in-program/your-bugcrowdninja-email-address/email-filter/ | 200 | Email filter subpage |
| https://docs.bugcrowd.com/researchers/reporting-managing-submissions/reporting-a-bug/submitting-vulnerability-through-email/ | 200 | Email submit path |
| https://docs.bugcrowd.com/researchers/participating-in-program/using-email-aliases/ | **404** | Stale path (old claim) |
| https://docs.bugcrowd.com/researchers/participating-in-program/email-aliases/ | **404** | Stale path |
| https://docs.bugcrowd.com/researchers/ | **404** | No bare researchers index |
| https://docs.bugcrowd.com/api/getting-started | 200 | API docs entry |

## Auth-ready implications

1. Use **your-bugcrowdninja-email-address** docs path — not `using-email-aliases`.
2. Aiven free-tier / test signups that require researcher email should use HANDLE@bugcrowdninja.com per program rules (human; no mint here).
3. Onboarding welcome page sidenav is the durable nav map when deep-links rot.

## Related

- `Q-BC-JOIN-READINESS.md`
- `AIVEN-INSTANCE.md` (human free tier)
- `shared/CLAIMS.md`

## Axes

- auth_ready_a↑ (correct ninja email docs)
- evidence_fidelity↑ (stale 404 vs live SSoT)
- safety_in_policy↑
