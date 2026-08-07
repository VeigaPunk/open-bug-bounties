# L3 checklist — API authz/IDOR matrix (own A vs B)

| # | Endpoint class | Method | Expected | If 200 with foreign data |
|---|----------------|--------|----------|---------------------------|
| 1 | `/v1/project` list | GET | only own | Critical IDOR |
| 2 | `/v1/project/{A}` | GET | 403/404 for B | High/Critical |
| 3 | `/v1/project/{A}/service` | GET | deny | High (URI/creds) |
| 4 | `/v1/project/{A}/users` | GET | deny | High (PII/members) |
| 5 | `/v1/project/{A}/invite` | POST | deny for B | Critical (invite-self) |
| 6 | `/v1/project/{A}/service/{svc}/acl` | GET | deny | High (Kafka ACL) |
| 7 | permissions set/patch on {A} | PUT/PATCH | deny | Critical |
| 8 | project events log {A} | GET | deny | Medium/High |
| 9 | application tokens other org | GET | deny | Critical ATO class |
| 10 | service user password reset {A} | PUT | deny | Critical |

## Rules
- [ ] GET-first; minimal POST only for invite deny proof
- [ ] Redact Authorization in evidence
- [ ] Two owned accounts only
- [ ] No scanners / rate abuse
