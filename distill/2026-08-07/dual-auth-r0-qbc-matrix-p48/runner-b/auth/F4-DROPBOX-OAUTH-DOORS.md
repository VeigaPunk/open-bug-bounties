# F4 Dropbox OAuth + Inti doors — passive (Runner B)

**UTC:** 2026-08-07T14:49:51Z  
**Policy recon only** — no OAuth client create, no token, no exploit. XOR deep slot (GitLab park).

## Dropbox product / OAuth

| URL | Code | Role |
|-----|------|------|
| https://www.dropbox.com | 200 | Product home |
| https://www.dropbox.com/login | 200 | Login |
| https://www.dropbox.com/register | 200 | Register (own trial only later) |
| https://www.dropbox.com/developers | 200 | Developers hub |
| https://www.dropbox.com/developers/documentation | 200 | API docs |
| https://www.dropbox.com/developers/reference/oauth-guide | 200 | OAuth guide |
| https://www.dropbox.com/oauth2/authorize | 200 | OAuth authorize entry (needs client_id) |
| https://www.dropbox.com/business | 200 | Business product |
| https://www.dropbox.com/team | 200 | Team product shell |
| https://help.dropbox.com | 200 | Help center |
| https://api.dropboxapi.com | **404** | Bare API root |
| https://api.dropbox.com | **404** | Alternate API root bare |
| https://content.dropboxapi.com | **404** | Content host bare |
| https://api.dropboxapi.com/2/users/get_current_account | **400** | Unauth RPC boundary |
| https://www.dropbox.com/scl | **404** | Bare shared-link path |

## Intigriti Dropbox program

| URL | Code | Role |
|-----|------|------|
| https://app.intigriti.com/researcher/programs/dropbox/detail | 200 | Program detail |
| https://app.intigriti.com/researcher/programs/dropbox | 200 | Program route |
| https://www.intigriti.com/programs/dropbox | 200 | Marketing program page |

## Auth-ready implications

1. **Join path:** Inti researcher program **200** — human join + @intigriti.me trial still required before live tests.
2. OAuth authorize **200** without client_id is a shell; app registration is post-auth developer console (own account only).
3. API hosts stay **404** at root / **400** unauth RPC — confirms prior F4-DROPBOX-HTTP boundary.
4. Register/login **200** for own test accounts only; stay in Inti scope.
5. XOR unchanged: deep Dropbox, park GitLab.

## Related

- `F4-DROPBOX-HTTP.md`, `F4-DROPBOX-PASSIVE.md`, `H2-GITLAB-STUB.md`, `INTI-SHOPIFY-AUTH-DOORS.md`

## Axes

- auth_ready_b↑ (OAuth + Inti doors)
- evidence_fidelity↑ (oauth 200 vs API 404/400)
- safety_in_policy↑
