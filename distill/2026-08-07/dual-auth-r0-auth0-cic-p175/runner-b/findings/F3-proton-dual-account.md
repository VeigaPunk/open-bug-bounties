# F3 — Proton dual-owned-account IDOR plan

**Mode:** policy recon only; no live tests performed.  
**Program:** Proton Bug Bounty, first-party.  
**Official policy:** https://proton.me/security/bug-bounty  
**Report channel:** security@proton.me, PGP encouraged.  
**Scope source read:** `/home/vgpnk1337/.xbgst/bounty-distill/2026-08-07/scopes/proton.md`  
**Secrets:** none collected, none stored, none included.

## Axes

- `safety_in_policy↑`: use only researcher-owned free Proton accounts and stop before ambiguous methods.
- `authorization_signal↑`: prioritize cross-account object access/control failures with clear confidentiality or integrity impact.
- `repro_minimality↑`: smallest Mail/Drive/API object set that proves missing server-side authorization.
- `report_quality↑`: document exact request, account ownership, expected/actual behavior, and impact without exposing unrelated data.

## Policy fit

The Proton scope lists web Mail/Drive/Calendar-style surfaces and REST API authorization issues as qualifying examples, including:

- Web authn/authz issues.
- REST API issues.
- Mobile/server-side authorization issues where applicable.
- User data confidentiality or integrity impact.

Reward bands in scope:

| Severity | Published band |
|---|---:|
| Maximum | USD $100,000 |
| Critical | USD $25,000–$50,000 |
| High | USD $2,500–$25,000 |
| Medium | USD $1,000–$2,500 |
| Low | Case-by-case; often no cash |

Likely classification for a valid dual-owned-account IDOR depends on impact:

- **High:** Account B can read, modify, delete, export, or share Account A private Mail/Drive data without authorization.
- **Medium:** Account B can view sensitive metadata, enumerate private objects, alter low-impact settings, or trigger limited unauthorized state changes.
- **Low / no cash:** Harmless object existence checks, intended sharing behavior, theoretical claims, or issues requiring missing exploitability.

## Free account setup

Use only accounts controlled by the researcher.

1. Create `Account A` as the victim/owner test account using a free Proton account.
2. Create `Account B` as the attacker/non-owner test account using a separate free Proton account.
3. Keep both accounts isolated:
   - separate browser profiles or containers;
   - separate authenticated sessions;
   - clear labels in notes and screenshots.
4. Do not use third-party users, shared inboxes, real sensitive content, production customer data, or secrets.
5. Seed only benign test data:
   - Mail: synthetic subject/body such as `idor-test-a-owned-message`.
   - Drive: harmless text file such as `idor-test-a-owned-file.txt`.
   - API objects: only objects created by Account A for this test.
6. Before any ambiguous edge case, contact security@proton.me as the policy instructs.

## Dual-owned-account IDOR class plan

This is a planned methodology only. No live requests, fuzzing, bypass attempts, or exploitation were performed in this pass.

### 1. Mail authorization plan

Goal: determine whether server-side authorization consistently prevents Account B from accessing or modifying Account A-owned Mail resources.

Candidate object classes to map with Account A:

- message IDs and conversation/thread IDs;
- attachment IDs;
- label/folder IDs;
- draft IDs;
- contact/autocomplete objects if exposed through Mail UI APIs;
- import/export or search result identifiers, if present.

Planned checks:

1. In Account A, create benign mail artifacts: draft, received/sent synthetic message, label/folder, optional harmless attachment.
2. Record only the minimum identifiers needed from Account A’s own browser traffic.
3. In Account B, attempt equivalent read or state-changing requests against Account A-owned identifiers only where this is clearly within safe dual-account testing.
4. Expected result: Account B receives `403`, `404`, or equivalent denial and no data/state from Account A is exposed.
5. Report only if Account B can read private content/metadata, mutate objects, delete/archive/move messages, send drafts, alter labels, or infer sensitive private state beyond intended behavior.

Evidence to collect if valid:

- Account ownership matrix: which object was created by A, which request was sent by B.
- Redacted request/response pairs.
- Screenshot or log showing B session context and unauthorized result.
- Impact narrative tied to Mail confidentiality/integrity.

### 2. Drive authorization plan

Goal: verify that Drive object, folder, file, revision, and share-link APIs enforce ownership and sharing boundaries server-side.

Candidate object classes to map with Account A:

- file IDs;
- folder IDs;
- volume/share IDs;
- revision/version IDs;
- thumbnail/preview/download endpoints;
- public share-link tokens and permission objects.

Planned checks:

1. In Account A, create a benign Drive folder and text file with non-sensitive content.
2. Keep one copy private, then optionally create a deliberately shared object to compare intended vs unintended access.
3. In Account B, replay only minimal read/update/download/delete/share-permission operations against A-owned IDs.
4. Expected result for private objects: no listing, preview, download, metadata read, rename, move, delete, permission edit, or share-token creation from B.
5. Expected result for intentionally shared objects: B receives only the access level granted by A, with no escalation to owner/admin operations.

Evidence to collect if valid:

- Private vs intentionally shared control case.
- A-owned file/folder identifier mapping.
- B-session request proving unauthorized access or privilege escalation.
- Confirmation that data is benign and researcher-owned.

### 3. Generic API authorization plan

Goal: identify cross-account authorization gaps in Proton first-party REST APIs surfaced by web apps.

Candidate API patterns:

- numeric, UUID, base64, or opaque object identifiers in path/query/body;
- batch endpoints that accept arrays of object IDs;
- search/filter endpoints that accept owner, address, volume, label, or share IDs;
- endpoints where UI hides operations but API accepts direct calls;
- async job/result IDs for export, import, upload, conversion, preview, or attachment processing.

Planned checks:

1. Build a request inventory from Account A and Account B normal UI use.
2. Group endpoints by operation: read, list, create, update, delete, share, export/download.
3. For each candidate, substitute only A-owned benign IDs into B-authenticated requests.
4. Prefer one-object, one-request probes; avoid fuzzing, mass enumeration, rate stress, or broad automation.
5. Treat any ambiguous method, high-risk workflow, or potentially disruptive operation as a stop-and-ask case for security@proton.me.

Expected secure behavior:

- B cannot access A private objects by direct ID.
- Batch endpoints reject or omit unauthorized A-owned IDs.
- Search/list endpoints do not leak A objects or sensitive metadata.
- State-changing endpoints are authorized by resource owner/share permission, not just object shape.
- Async job IDs are bound to the requester and underlying object permissions.

## Stop conditions

- No testing against accounts not owned by the researcher.
- No production secrets or real sensitive personal data.
- No mass account creation, brute force, scanning, fuzzing, DoS, spam, or mailbox flooding.
- No public disclosure before Proton remediation.
- No theoretical report without a concrete exploit path.
- Stop and contact security@proton.me before ambiguous methods.

## Report template if a finding is confirmed later

Subject: `Potential IDOR in Proton [Mail/Drive/API] allows Account B to [impact] Account A [object]`

Minimum body:

1. Summary and affected product.
2. Researcher-owned account setup: Account A owner, Account B non-owner.
3. Preconditions and object creation steps.
4. Exact expected behavior.
5. Exact actual behavior.
6. Redacted HTTP request/response or minimal PoC.
7. Impact: confidentiality, integrity, account boundary, and affected object class.
8. Safety note: all data/accounts used were researcher-owned; no live third-party data accessed.

## Current status

No live tests were performed. This file is a scoped, policy-aligned plan for future dual-owned-account IDOR validation on Proton Mail, Drive, and first-party API surfaces.
