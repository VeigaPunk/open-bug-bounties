# FIRST-5-TESTS — authz/IDOR on OWN free projects only

**Preflight (all required):**

- [ ] BC program Join accepted (`aiven-mbb-og`)  
- [ ] Account A: `*+aiven-a@bugcrowdninja.com` signed up, free PG (or Kafka) in project `proj-a`  
- [ ] Account B: `*+aiven-b@bugcrowdninja.com` signed up, free service in project `proj-b`  
- [ ] Tokens `TOKEN_A`, `TOKEN_B` in env only (never commit)  
- [ ] Record project names, service names, user UUIDs, ACL IDs in local notes  

**Safety:** GET-first; no bulk; no delete of billing; stop on unexpected third-party data.

---

## Test 1 — Baseline isolation (positive control)

**Goal:** Each token only sees its own projects.

```bash
curl -sS -H "Authorization: aivenv1 $TOKEN_A" https://api.aiven.io/v1/project | jq .
curl -sS -H "Authorization: aivenv1 $TOKEN_B" https://api.aiven.io/v1/project | jq .
```

**Pass (secure):** A lists only proj-a; B only proj-b.  
**Finding:** Foreign project appears in list → high severity IDOR candidate.

---

## Test 2 — Cross-project GET by name/id (classic IDOR)

**Goal:** B cannot read A’s project details.

```bash
# Replace PROJECT_A with A's project name
curl -sS -w '\n%{http_code}\n' -H "Authorization: aivenv1 $TOKEN_B" \
  "https://api.aiven.io/v1/project/${PROJECT_A}"
curl -sS -w '\n%{http_code}\n' -H "Authorization: aivenv1 $TOKEN_B" \
  "https://api.aiven.io/v1/project/${PROJECT_A}/service"
```

**Pass:** 403/404, no service URIs/creds.  
**Finding:** 200 with config, connection strings, or CA → report.

---

## Test 3 — Project members / ACL read cross-account

**Goal:** B cannot enumerate A’s members or Kafka/service ACLs.

```bash
curl -sS -w '\n%{http_code}\n' -H "Authorization: aivenv1 $TOKEN_B" \
  "https://api.aiven.io/v1/project/${PROJECT_A}/users"
# After Kafka free service SERVICE_A:
curl -sS -w '\n%{http_code}\n' -H "Authorization: aivenv1 $TOKEN_B" \
  "https://api.aiven.io/v1/project/${PROJECT_A}/service/${SERVICE_A}/acl"
```

**Pass:** deny. **Finding:** member emails / ACL rules of A under B’s token.

---

## Test 4 — Invite / permissions mutation (owned accounts only)

**Goal:** B cannot invite self or change permissions on A’s project.

```bash
# Safe attempt: invite B's email to A's project using B's token (should fail)
curl -sS -w '\n%{http_code}\n' -X POST \
  -H "Authorization: aivenv1 $TOKEN_B" -H 'Content-Type: application/json' \
  -d "{\"user_email\":\"${EMAIL_B}\"}" \
  "https://api.aiven.io/v1/project/${PROJECT_A}/invite"
```

**Pass:** 403/404.  
**Finding:** invite succeeds or permissions PUT accepts foreign project → critical path.  
**Note:** If testing legitimate invite A→B, use A’s token only; document consent.

---

## Test 5 — Console vs API parity + org/application-user list

**Goal:** Same IDOR class not fixed only in one surface; app tokens not listable cross-org.

```bash
# Organization / application users (adjust org id from A's authenticated list only)
curl -sS -H "Authorization: aivenv1 $TOKEN_A" https://api.aiven.io/v1/me 2>/dev/null | jq . || true
curl -sS -w '\n%{http_code}\n' -H "Authorization: aivenv1 $TOKEN_B" \
  "https://api.aiven.io/v1/project/${PROJECT_A}/events"
```

Also: DevTools on console while logged as B — request any proj-a resource by tampering project slug in XHR; compare status to API.

**Pass:** consistent deny. **Finding:** console path leaks where API does not (or reverse).

---

## Evidence template (per test)

| Field | Value |
|-------|-------|
| Test # | |
| Time UTC | |
| Token role | A or B |
| Request | method path (no secrets) |
| Status | |
| Sensitive fields in body? | Y/N (redact) |
| Expected | |
| Result | secure / finding |

## After first finding

One BC report; stop expansion; no customer data retention.
