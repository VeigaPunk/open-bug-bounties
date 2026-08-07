# DRAFT REPORT SKELETON — Aiven authz / IDOR (OWN free-tier only)

**Status:** TEMPLATE — do not submit until reproduction proven on **two owned** accounts.  
**Program:** Aiven Managed Bug Bounty · https://bugcrowd.com/engagements/aiven-mbb-og  
**Target group:** Website Console / API **or** Database Services Tier 2 (PostgreSQL) depending on impact surface  
**Finding class:** Broken access control · cross-account project/service IDOR · control-plane authz  
**Accounts:** `@bugcrowdninja.com` only · free tier · no credit card  

> Replace every `{{…}}`. Never paste live tokens, connection strings, or third-party customer data.

---

## Title (headline first — program triage preference)

```
{{e.g. Cross-account read of project/service metadata via GET /v1/project/{id} with foreign token}}
```

Good pattern: *impact* + *where* + *how* (concise). Bad: speculative P1 chain, multi-page AI dump.

---

## Summary

Researcher-owned Account **B** can {{read|modify|list}} {{resource type}} belonging to researcher-owned Account **A** without membership, via {{API path or console action}}. Expected: deny (403/404). Actual: {{status + data class}}.

Impact class: **cross-client control-plane access** (Aiven focus area) limited here to **own** dual accounts as proxy for other customers.

---

## Assets

| Role | Account | Project ID | Service ID | Notes |
|------|---------|------------|------------|-------|
| Victim (A) | {{ninja A}} | `{{project_a}}` | `{{service_a}}` | Free PG/Kafka |
| Attacker (B) | {{ninja B}} | `{{project_b}}` | `{{service_b}}` | Separate org/project |

Auth: `Authorization: aivenv1 <token>` (console note: cookies alone are not the API session).

---

## Steps to reproduce

1. Create Account A and Account B with distinct `@bugcrowdninja.com` addresses; free tier only.
2. Under A, create free-tier service; note `project_id` / `service_id`.
3. Create API tokens for A and B; store only in 1Password.
4. As B, issue **read-only** request against A’s identifiers, for example:

```http
GET /v1/project/{{project_a}} HTTP/2
Host: api.aiven.io
Authorization: aivenv1 {{TOKEN_B_REDACTED}}
```

5. Optionally compare:

```http
GET /v1/project/{{project_a}}/service/{{service_a}} HTTP/2
Host: api.aiven.io
Authorization: aivenv1 {{TOKEN_B_REDACTED}}
```

6. Repeat membership/ACL/user list endpoints if applicable:  
   `{{/v1/project/.../user | /acl | /invite | … document exact path after live map}}`
7. Confirm same behavior (or intentional denial) via console network tab with B session.
8. Control: A token on A IDs succeeds; B token on B IDs succeeds; B on A should fail if correctly authorized.

---

## Observed result

| Check | Expected | Actual |
|-------|----------|--------|
| B → A project GET | 403/404 | `{{code}}` |
| Body leaks | none / own only | `{{fields: name, cloud, users, conn info?}}` |
| B → A service GET | deny | `{{code}}` |
| B → A membership/ACL | deny | `{{code}}` |
| A → B (swap) | deny | `{{code}}` |

Attach **screenshots** of status + redacted body (no tokens). No binaries/videos per brief.

---

## Impact

- **Confidentiality:** {{yes/no — project metadata, user emails, service config, secrets?}}
- **Integrity:** {{can B change ACL, power-off, rotate users? only if tested safely}}
- **Scope of access:** limited to IDs known/guessable? enumerated?
- Map to Aiven priorities: cross-client data/control · account control · orchestration plane.

**Do not** claim production multi-tenant impact beyond what dual-owned accounts demonstrate.

---

## Severity suggestion (researcher)

- VRT: Broken Access Control / IDOR (adjust after impact).
- Program tier: Console/API band **or** DB service tier if service-plane.
- Suggested P: `{{P2–P3 typical for metadata IDOR; P1 only with clear cross-tenant control}}` — program may adjust.

---

## Root cause (hypothesis after proof)

{{e.g. Missing ownership check on project UUID path; authorization only on list endpoints}}

---

## Remediation (suggested)

- Enforce membership on every project/service ID path (API + console BFF).
- Return 404 for non-members to reduce oracle if appropriate.
- Regression tests: dual-tenant fixture with foreign UUIDs.
- Audit sibling endpoints for same pattern.

---

## Out of scope / non-bugs (do not file)

- Replaying **victim’s** `aivenv1` token as attacker (brief: not a bug).
- Intentional `avnadmin` / OpenSearch dual ACL power when user has service user.
- API permission present while console greys UI (intentional per permission model) **unless** no relationship to resource.
- Scanner CVE paste without Aiven PoC.
- Other customers’ hosts.

---

## Evidence checklist (pre-submit)

- [ ] Only owned accounts used
- [ ] Exact request/response (redacted) in Markdown code blocks
- [ ] One vulnerability per report (chain only if required for impact)
- [ ] No attachments except screenshots
- [ ] No secrets in text
- [ ] Human-verified (not AI-only speculative)
- [ ] Live brief re-read same day as submit

---

## Submission notes

- Prefer **concise** script of curls in Markdown over downloadable scripts.
- Headline + concrete actual result (program 21 Jul 2026 triage guidance).
- Group identical pattern across endpoints into **one** report.

**Lane state:** skeleton ready; **no finding claimed** until G3–G7 + probes complete (`OWN-ASSET.md`).
