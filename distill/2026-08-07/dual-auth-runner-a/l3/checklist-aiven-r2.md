# Aiven B1 — join readiness (r2)

Axes: auth_ready↑ safety_in_policy↑ evidence_fidelity↑

## Gates
- [x] BC engagement aiven-mbb-og reachable (HTTP 200)
- [ ] Free-tier project on console.aiven.io with *@bugcrowdninja.com
- [ ] Second account for dual-account authz (own projects only)
- [ ] API token vaulted in 1Password only (op:// never expanded)
- [ ] Scope: FULL per parent scopes/aiven.md

## First safe classes (own assets only)
- Project membership IDOR / cross-project list leak
- Service token scope confusion within own org
- Invite/accept race on own projects

No production third-party tenants. No secrets in distill.
