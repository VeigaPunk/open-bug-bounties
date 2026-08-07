# Intigriti + Dropbox auth doors (PULSE-73)

UTC: 2026-08-07T16:46:10Z
Policy: recon only — no auth, no exploit, no token harvest.
OAuth query values redacted (`request_uri`/`state` → `…`).

## Passive GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://app.intigriti.com` | 307 | → www.intigriti.com/ | root bounce |
| `https://www.intigriti.com` | 200 | - | marketing |
| `https://app.intigriti.com/login` | 200 | - | login shell |
| `https://app.intigriti.com/auth/login` | 200 | - | auth login shell |
| `https://app.intigriti.com/researcher` | 302 | → /auth/researcher?redirect=/researcher | soft gate |
| `https://app.intigriti.com/auth/researcher` | 302 | → login.intigriti.com/connect/authorize (client_id=bff-init) | OIDC hop |
| `https://app.intigriti.com/programs` | 200 | - | catalog shell |
| `https://app.intigriti.com/programs/dropbox/dropbox/detail` | 200 | - | **F4 SSoT** |
| `https://dropbox.com/bug-bounty` | 301 | → www.dropbox.com/bug-bounty | |
| `https://www.dropbox.com/bug-bounty` | 404 | - | no first-party BB page |
| `https://www.dropbox.com/login` | 200 | - | product login |
| `https://www.dropbox.com/register` | 200 | - | free signup |
| `https://www.dropbox.com/developers` | 200 | - | |
| `https://www.dropbox.com/developers/documentation` | 200 | - | |
| `https://www.dropbox.com/oauth2/authorize` | 302 | → authorize_error missing_client_id | |
| `https://api.dropboxapi.com` | 404 | - | bare |
| `https://api.dropboxapi.com/2/users/get_current_account` | 400 | - | unauth body error |
| `https://bugcrowd.com/engagements/dropbox` | 200 | - | BC soft shell |
| `https://bugcrowd.com/h/engagements/dropbox` | 200 | - | /h soft |
| `https://bugcrowd.com/programs/dropbox` | 404 | - | retired |
| `https://tracker.bugcrowd.com/dropbox` | 302 | → /user/sign_in | |
| `https://hackerone.com/dropbox` | 404 | - | not H1 primary |

## Auth chain (passive)

1. Inti researcher: `/researcher` → `/auth/researcher` → `login.intigriti.com/connect/authorize` (bff-init).
2. Dropbox product: login/register/developers **200**; first-party bug-bounty **404**.
3. Dropbox OAuth bare authorize → missing_client_id error (expected unauth).
4. API get_current_account **400** without token (not 401 this tick).
5. Join SSoT remains **Inti** `programs/dropbox/dropbox/detail` **200**; BC shells are not program join path.

## Delta vs P63

- Explicit OIDC hop: auth/researcher → **login.intigriti.com/connect/authorize** (client_id=bff-init).
- H1 `/dropbox` **404** confirmed.
- BC bare + /h both **200** (same as P63); programs still **404**.
- get_current_account still **400** unauth.

## Notes

- XOR: deep F4 Inti; park H2 GitLab.
- Headers/UA/@intigriti.me still human after join.
- No credentials stored.

## Auth readiness

- F4 doors stable; human Inti join + trial hygiene.

## Next (human / gated)

- Browser Inti session; join Dropbox; free trial + required headers.
