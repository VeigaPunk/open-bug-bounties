# Identity-day AUTH readiness

## Axes

- Scope fidelity
- Credential hygiene
- MFA and account safety
- Rate-limit compliance
- Cross-tenant isolation
- Non-destructive testing
- Evidence quality

## Sequence

### 1. Auth0 — `auth0-okta` on Bugcrowd

- Confirm authorization is limited to `manage.cic-bug-bounty.auth0app.com`.
- Use **Get Credentials** to obtain exactly 3 users across 3 tenants.
- Store and retrieve credentials only through approved 1Password `op://` references.
- Verify each user/tenant mapping before testing.
- Establish a client-side ceiling of **≤5 requests/second**.
- Prioritize safe cross-tenant authorization checks:
  - Tenant boundary enforcement
  - User/session isolation
  - Token audience, issuer, and scope validation
  - Administrative object access controls
- Record request/response evidence without collecting unnecessary personal data.
- Stop on unexpected impact, account lockout, or scope ambiguity.

### 2. Okta — `okta` on Bugcrowd

- Use only the dual OIE preview organizations issued through **Get Credentials** (for example, `bugcrowd-pam-###.oktapreview.com`).
- Confirm MFA is enforced for every account and session.
- Store and retrieve credentials only through approved 1Password `op://` references.
- Verify organization, user, and role assignments before testing.
- Perform low-volume, manual, non-destructive authorization checks.
- Validate tenant, role, session, API-token, and workflow permission boundaries.
- Preserve MFA enrollment and recovery controls.
- Stop before any scanner, automation, workflow execution, or availability-impacting action.

## vault_steps

- `AUTH0_OP_REF_CREATE`
- `AUTH0_OP_REF_VERIFY`
- `AUTH0_TENANT_USER_MAP`
- `OKTA_OP_REF_CREATE`
- `OKTA_OP_REF_VERIFY`
- `OKTA_ORG_ROLE_MAP`
- `MFA_STATUS_CONFIRM`
- `SESSION_END_AND_REVOKE`

## Gates

- Written Bugcrowd scope confirmed.
- Target hostname/org confirmed before each test.
- Credentials exist only as 1Password `op://` references; never in files, source, shell history, or logs.
- Auth0 request rate remains at or below 5 rps.
- Okta MFA remains enforced.
- Manual, reversible, non-destructive testing only.
- No test proceeds after cross-tenant or cross-organization ambiguity.
- Evidence is minimized, sanitized, and attributable to the authorized test account.

## Forbidden

- Any Auth0 host other than `manage.cic-bug-bounty.auth0app.com`.
- Any Okta organization not issued via Get Credentials, including production tenants.
- Credential or token storage in files, plaintext notes, environment dumps, screenshots, or logs.
- Automated scanners, brute force, password spraying, phishing, or MFA bypass attempts.
- Okta Workflows automation or workflow-triggered load.
- Denial-of-service, stress, flooding, lockout, persistence, or destructive changes.
- Cross-tenant or cross-organization access beyond controlled authorization validation.
- Accessing, exporting, or retaining unrelated user data.
