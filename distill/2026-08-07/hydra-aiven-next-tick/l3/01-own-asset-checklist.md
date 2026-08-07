# L3 checklist — Aiven OWN free-tier asset setup
**Provenance:** sekhmet-luna-a swarm 2026-08-07 (sp tasks + host materialize; namespaces --no-keep)

## Gates
- [ ] Program: bugcrowd.com/engagements/aiven-mbb-og only
- [ ] Email: *@bugcrowdninja.com for all Aiven signups/invites
- [ ] No credit card on any billing group
- [ ] Only projects/services we create

## Steps
1. Join BC Aiven MBB; confirm Submit report available
2. Sign up console.aiven.io as Account A (ninja +tag)
3. Create free PostgreSQL (or Kafka) — no paid plan
4. Sign up Account B second ninja identity
5. Create free service under B
6. Mint personal API tokens A/B → store in 1Password op:// only
7. Record project names, service names, user ids in local notes (not git)
8. Confirm `GET /v1/project` with each token lists only own projects
9. Power-off unused free services when idle (cost/policy hygiene)

## Stop if
- Ninja mailbox unavailable → mark BLOCKED free-tier signup
- Any non-owned aivencloud host appears → abort
