# F2 MSRC Online Services — passive portal HTTP map (Runner B)

**UTC:** 2026-08-07T14:25:37Z  
**Policy recon only** — own tenants later; no exploit; no customer tenants.

## Live status

| URL | Code | Role |
|-----|------|------|
| microsoft.com/.../msrc/bounty | 200 | Bounty hub |
| .../msrc/bounty-online-services | 200 | OBB program page |
| .../msrc/bounty-terms | 200 | Terms |
| .../msrc/bounty-programs | 200 | Program list |
| msrc.microsoft.com | 200 | Submit hub |
| msrc.microsoft.com/report/vulnerability | 200 | Report entry |
| portal.msrc.microsoft.com | 200 | Researcher portal shell |
| portal.msrc.microsoft.com/en-us/researcher | **404** | Stale path; use portal root / login flow |
| learn.microsoft.com/en-us/security | 200 | Security docs |
| entra.microsoft.com | 200 | Entra admin shell (auth for later own-tenant work) |

## Auth-ready implications

1. Public policy surfaces are **healthy** (200) — fidelity FULL on policy pages.
2. Researcher profile still **needs_profile_on_submit** (AUTH-READINESS).
3. Prefer portal.msrc.microsoft.com root over legacy `/en-us/researcher` (404).
4. Own Entra/M365 tenant with **MSOBB** naming when possible before authz probes.
5. Detail authz hosts: `findings/F2-msrc-authz-map.md`.

## Axes

- evidence_fidelity↑ (404 researcher path documented)
- auth_ready↑ (submit/portal paths confirmed)
- safety_in_policy↑ (passive only)
