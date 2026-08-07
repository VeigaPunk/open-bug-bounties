# OWN-ASSET checklist — Aiven free tier (lane stack)

**Rule:** only services/projects created under our bugcrowdninja Aiven account(s). Never touch foreign `*.aivencloud.com` customer endpoints.

## Pre-flight
- [ ] BC enrollment on `aiven-mbb-og` active
- [ ] Console login via `@bugcrowdninja` email only
- [ ] Document account org/project UUID (local notes; no secrets in repo)
- [ ] Credentials via 1Password `op://` only — never commit tokens

## Assets to create (own free tier)
- [ ] One **PostgreSQL** free/trial service (Tier2 baseline authz)
- [ ] One **Valkey** or **Kafka** if trial allows (Tier1 surface)
- [ ] Optional second org/project under **our** second ninja account for cross-account tests only
- [ ] Service connection strings stored in op, not disk

## Authz surface map (own only)
- [ ] Console RBAC: org admin vs developer vs billing-only (if available)
- [ ] API token scopes (personal tokens / application tokens) — list + least privilege
- [ ] Project membership invite/revoke flows between **our** accounts
- [ ] Service user `avnadmin` vs additional service users ACL
- [ ] Network: VPC / IP allowlists (if free-tier supports) — confirm isolation claims
- [ ] Power-off / delete service: ensure no residual access from revoked tokens

## Explicit non-goals this sprint
- [ ] No CTF host until intentional CTF window
- [ ] No third-party customer service probes
- [ ] No DoS / load / chaos on shared control plane
- [ ] No credential-scope expansion after accidental leak find (report instead)

## Evidence hygiene
- [ ] Screenshots redacted (no live tokens)
- [ ] API traces with redacted Authorization
- [ ] Paths recorded under this lane dir only
