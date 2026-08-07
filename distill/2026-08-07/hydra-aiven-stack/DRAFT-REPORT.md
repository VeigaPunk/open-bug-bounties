# DRAFT — Aiven authz/IDOR skeleton (OWN project only)

**Status:** template — fill only after reproducible finding on own assets  
**Program:** Bugcrowd Aiven Managed Bug Bounty (`aiven-mbb-og`)  
**Class:** Broken access control / IDOR / cross-project authz (example)

## Title
[P?] [Console|API|Service] Unauthorized [read|write] of [resource] across [project|org] boundary

## Summary
One paragraph: who, what boundary crossed, impact on confidentiality/integrity.

## Assets (researcher-owned)
- Account A (bugcrowdninja): org/project IDs …
- Account B (bugcrowdninja): org/project IDs …
- Service type + cloud region (no customer data)

## Steps to reproduce
1. Authenticate as Account A; create resource R (service/topic/user/ACL).
2. Capture API call for R (method, path, body) — **redact Authorization**.
3. Replay as Account B (or lower role) changing only ID parameters.
4. Observe success where deny expected; attach status + body snippet (redacted).

## Expected
403/404 and no resource mutation/leak across trust boundary.

## Actual
2xx with data or mutation …

## Impact
- Cross-account or cross-project data exposure / control
- Maps to program priority: customer isolation / orchestration plane

## Fix suggestion
Server-side authorization on every object ID; no reliance on UI grey-out.

## Attachments
- Redacted HAR/screenshot paths (local only until submit)
