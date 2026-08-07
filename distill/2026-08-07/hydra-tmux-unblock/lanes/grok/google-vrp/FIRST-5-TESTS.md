# FIRST-5-TESTS — Google Drive authz/IDOR (own A/B)

**Preconditions:** two research-owned Google accounts; private Doc on A; DevTools Network; low request volume.  
**Policy:** VRP own-account testing only; stop if impact would require third-party data.

## Checklist

### T1 — Unshared private file IDOR (B has raw fileId)

1. A: create private Google Doc; no share; copy `fileId` from URL.  
2. B: authenticated session; attempt open `https://docs.google.com/document/d/<fileId>/edit` and Drive file view.  
3. **Pass (secure):** B denied; no full body content.  
4. **Fail signal:** B reads body/revisions/export — capture redacted screenshots + request/response status (no session secrets).  
5. **Also check:** metadata-only leak (title) vs full IT1 content — note IT2 vs IT1.

### T2 — Share then revoke residual access

1. A: share Doc with B as **Viewer**.  
2. B: confirm open works.  
3. A: remove B permission; wait ~30s.  
4. B: hard-refresh; re-open same URL; retry export/download if UI offered while shared.  
5. **Fail signal:** B still reads content or export after revoke (including alternate host/path).

### T3 — Link share role downgrade / anyone-with-link

1. A: set link to **Viewer** (anyone with link); open in B (and optional logged-out if policy-safe on own file).  
2. A: change link to **Restricted** (or disable link).  
3. B: reuse old link URL + any observed token query params (do not spray tokens publicly).  
4. **Fail signal:** old link still grants content after restriction.

### T4 — Viewer cannot elevate via alternate API

1. A: share to B as **Viewer** only.  
2. B: observe permission-change / share-dialog network calls from A’s UI (or docs) in a second window as A — note endpoint shape only.  
3. B: attempt same permission-mutate endpoint against A’s `fileId` with B session (manual single requests).  
4. **Fail signal:** B adds self as editor, adds third party, or changes link role.  
5. Stay single-digit requests; no fuzz loops.

### T5 — Folder vs child ACL mismatch

1. A: create folder F (private); put Doc D inside; share **folder** to B as Viewer **or** share only D not F (two subcases if time).  
2. B: list/navigate folder; open D; try direct D URL if only folder shared and vice versa.  
3. **Fail signal:** B accesses child/parent beyond granted effective ACL; or B sees sibling files not in share set.

## After each test

- [ ] Record: secure / anomaly / blocked-by-UI  
- [ ] Map IT/AC if anomaly  
- [ ] No secrets in notes  
- [ ] If anomaly: draft REPORT.md finding section with repro for Bug Hunters  

## Explicit non-tests (this wave)

- SMS/account enum, open redirect alone, logout CSRF, appspot customer apps, DoS, high-volume scanners.
