# L3 — Bugcrowd report skeleton (PLACEHOLDER)

**Title:** [PLACEHOLDER] Cross-account project detail disclosure via API IDOR  
**Program:** Aiven Managed Bug Bounty (`aiven-mbb-og`)  
**Asset:** api.aiven.io (Website console tier) / managed service control plane  

## Summary
[PLACEHOLDER] Authenticated user B can retrieve project/service metadata for project A using only knowledge of project name/id and B’s own `aivenv1` token.

## Steps to reproduce
1. Create free-tier projects under two @bugcrowdninja accounts (A, B).
2. As A, note `PROJECT_A` name.
3. As B: `GET https://api.aiven.io/v1/project/PROJECT_A` with `Authorization: aivenv1 TOKEN_B`.
4. [PLACEHOLDER] Observe HTTP 200 and sensitive fields (connection info, members, …).

## Impact
[PLACEHOLDER] Unauthorized read of another organization’s control-plane data; possible credential material for data-plane pivot.

## Remediation
Enforce project membership on every project-scoped route; consistent 404 for non-members; audit token→project authorization middleware.

## Scope / ethics
Own free projects only; no third-party customer access; no DoS. Evidence redacted. Token replay of stolen tokens is out of scope per program (not claimed).

## Attachments
- [PLACEHOLDER] redacted request/response  
- [PLACEHOLDER] project ownership proof  
