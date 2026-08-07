# Aiven Q-BC — passive HTTP / API auth boundary (Runner A)

**UTC:** 2026-08-07T14:23:45Z  
**Engagement:** aiven-mbb-og · **Mode:** policy recon only · no tokens · no exploit

## Live status

| URL | Code | Signal |
|-----|------|--------|
| console.aiven.io | 200 | SPA login shell up |
| api.aiven.io | 200 | API root reachable |
| api.aiven.io/v1/project | **401** | Project list requires `Authorization: aivenv1 <token>` |
| docs.aiven.io | 200 | Public docs |
| aiven.io/pricing | 200 | Free-tier/pricing narrative |
| bugcrowd.com/engagements/aiven-mbb-og | 200 | Engagement live |
| manage.cic-bug-bounty.auth0app.com | **400** | Researcher Auth0 host up; unauth GET not enough |
| auth0.com/docs | 200 | Public docs |
| atlassian.com/trust/security/bug-bounty | **404** | Old marketing path; use BC engagement + developer.atlassian.com |
| developer.atlassian.com | 200 | Dev portal |

## Auth boundary (Aiven)

1. Unauthenticated `/v1/project` → **401** confirms API is not open-list (expected).
2. After human free-tier enroll, tokens only in `op://…` — never distill.
3. Header form: `Authorization: aivenv1 <token>` (per AUTH-READINESS / AIVEN-INSTANCE).
4. Dual ninja accounts still **human gate** (`AIVEN-INSTANCE.md`).

## Related

- `AIVEN-INSTANCE.md` enroll checklist  
- `AUTH-READINESS.md` rollup  
- `../shared/PULSE-HTTP.md`

## Axes

- evidence_fidelity↑ (401 on project list)
- auth_ready↑ (clear token requirement)
- safety_in_policy↑ (no credential use)
