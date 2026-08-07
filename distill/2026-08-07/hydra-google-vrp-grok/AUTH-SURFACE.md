# AUTH-SURFACE — Google Drive (own accounts)

**Product:** Google Drive / Docs file objects  
**Mode:** surface map for authz/IDOR · no exploit payloads · no secrets  

## Actors

| Actor | Role |
|-------|------|
| **A** | Owner of private files/folders |
| **B** | Second own account: never shared, link-only, viewer, commenter, editor, then revoked |
| **Link roles** | `anyone with link` viewer/editor vs restricted; domain/workspace if free trial later |

## Object types (priority)

1. Drive **file** (Docs/Sheets/Slides binary-as-file)  
2. Drive **folder** + nested ACL inheritance  
3. **Share** / permission resource (per-user + link tokens)  
4. **Revision** / version history  
5. **Shared drive** membership (only if A creates a Shared drive on own Workspace/personal eligibility — skip if unavailable)

## Authz boundaries to map

| Boundary | Expected control | IDOR/authz question |
|----------|------------------|---------------------|
| Unauthenticated → private file ID | 401/404, no content | Can B or anon fetch content by ID alone? |
| B never invited → file/folder ID | Deny | Metadata (title/owner) leak vs full IT1 content? |
| B viewer → edit APIs | Deny state-change | Permission elevation via alternate endpoint? |
| Link shared → revoke | Immediate deny | Residual access via cached share token / alt host? |
| Commenter → download/export | Per product policy | Export/print bypass ACL? |
| Folder share vs file override | Effective min ACL | Child file more open than folder or reverse confuse? |
| Transfer ownership / remove self | Consistent state | B retains access after A transfer or unshare race? |

## Network surface classes (manual DevTools — low volume)

- List/get file metadata (`files.get` style) with `fileId`  
- Permissions create/update/delete  
- Export / download / print endpoints  
- Docs-specific collab / presence (authz only; no DoS)  
- Copy-to-my-Drive / make-a-copy of shared material  
- Shortcut objects pointing at restricted targets  

Record for each: method, host, path pattern, ID parameter names, cookies/headers presence (names only — never paste session tokens into repo).

## Token / session notes (operational)

- Use browser profiles or separate containers for A vs B  
- Prefer interactive session over mass API automation (VRP discourages high-volume auto traffic)  
- Never store cookies, refresh tokens, or OAuth secrets in hydra/distill files — `op://` if needed  

## Impact mapping (for any finding)

| Observed | Likely IT / AC | Severity band (table class) |
|----------|----------------|-----------------------------|
| B reads full private doc content | IT1 | S2b / C1b class territory |
| B shares A’s doc without grant | IA (impactful action) | S2b |
| B changes A password/recovery via Drive path | IT0 / CA | escalate carefully; often other product |
| B only sees title/owner of unshared file | IT2 metadata | S2c / lower — often non-reward if limited |
| XSS in sandbox download domain only | OOS unless sensitive impact | non-qualifying pattern |

## Do-not-cross

- Other users’ real data  
- Phishing employees, physical, DoS, spam  
- Customer appspot apps  
- Automated ID brute at scale  
