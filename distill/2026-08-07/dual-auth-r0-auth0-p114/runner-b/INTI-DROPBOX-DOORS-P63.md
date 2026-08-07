# Intigriti + Dropbox auth doors (PULSE-63)

UTC: 2026-08-07T16:26:25Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://app.intigriti.com` | 307 | → www.intigriti.com | app root → marketing |
| `https://app.intigriti.com/login` | 200 | - | SPA shell |
| `https://app.intigriti.com/auth/login` | 200 | - | SPA shell |
| `https://app.intigriti.com/researcher` | 302 | → /auth/researcher?redirect=… | soft gate |
| `https://app.intigriti.com/programs` | 200 | - | SPA |
| `https://app.intigriti.com/programs/dropbox/dropbox/detail` | 200 | - | F4 SSoT detail |
| `https://app.intigriti.com/profile` | 200 | - | SPA shell unauth |
| `https://login.intigriti.com` | 302 | → /account/login | |
| `https://login.intigriti.com/account/login` | 200 | - | IdP shell |
| `https://www.intigriti.com/researchers` | 200 | - | |
| `https://www.intigriti.com/bug-bounty-programs` | 308 | → /researchers/bug-bounty-programs | |
| `https://www.intigriti.com/bug-bounty` | 404 | - | |
| `https://intigriti.com/programs/dropbox` | 308 | → app…/programs/dropbox/ | |
| `https://api.intigriti.com` | 404 | - | |
| `https://api.intigriti.com/core` | 404 | - | |
| `https://api.intigriti.com/external/researcher` | 400 | - | unauth body gate |
| `https://www.dropbox.com` | 200 | - | |
| `https://www.dropbox.com/login` | 200 | - | |
| `https://www.dropbox.com/register` | 200 | - | free dual-account door |
| `https://www.dropbox.com/oauth2/authorize` | 302 | → authorize_error missing_client_id | expected |
| `https://www.dropbox.com/developers` | 200 | - | |
| `https://www.dropbox.com/developers/documentation/http/documentation` | 200 | - | |
| `https://www.dropbox.com/bug-bounty` | 404 | - | first-party BB path gone |
| `https://api.dropboxapi.com` | 404 | - | |
| `https://api.dropboxapi.com/2/users/get_current_account` | 400 | - | unauth API gate |
| `https://api.dropbox.com` | 404 | - | |
| `https://content.dropboxapi.com` | 404 | - | |
| `https://bugcrowd.com/engagements/dropbox` | 200 | - | BC shell exists |
| `https://bugcrowd.com/h/engagements/dropbox` | 200 | - | /h also 200 |

## Notes

- F4 bounty SSoT remains **Inti** `programs/dropbox/dropbox/detail` (not dropbox.com/bug-bounty 404).
- BC also exposes dropbox engagement shells (200 bare + /h) — do not confuse with Inti join path; XOR H2 GitLab park still applies for deep F4.
- app root **307→www** this tick (was sometimes 200 SPA); use `/login` or program detail URLs.
- researcher path soft-redirects to `/auth/researcher`.

## Delta vs P53

- app.intigriti.com root now 307 marketing hop.
- BC dropbox bare+ /h both 200 (parallel shell; Inti remains join SSoT).
- API gates unchanged (404 bare / 400 get_current_account).

## Auth readiness

- Inti + Dropbox free accounts still **human**.
- Hard XOR: F4 deep vs H2 GitLab park.

## Next (human / gated)

- Join Inti Dropbox; dual free Dropbox; @intigriti.me + UA headers per program.
