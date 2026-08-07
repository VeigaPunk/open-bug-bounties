# AUTH-READINESS matrix (P240)

**sekhmet:** `sp-rb-p240-auth-map` ok  
**Policy:** titles + field labels only; secrets via `op://` at runtime never in files.

| Platform | Portal | Vault title | Field labels | Status | Notes |
|---|---|---|---|---|---|
| HackerOne | hackerone.com | HackerOne | username, user[password], notesPlain | READY | Shopify export still PARTIAL until login |
| Intigriti | app.intigriti.com | Intigriti | Input.Username, Input.Password, notesPlain | READY | Dropbox program join human |
| TinyFish | API public recon | TinyFish API | username, credential, type, … | READY | op://Personal/TinyFish API/credential |
| Google VRP | bughunters.google.com | (Google title exists) | n/a for program login | PARTIAL | dual accounts human |
| MSRC | msrc.microsoft.com | — | — | PARTIAL | profile-on-submit |
| Proton | account.proton.me | — | — | PARTIAL | dual free accounts |
| Shopify | H1 + partners | via HackerOne | — | PARTIAL | @wearehackerone.com store |
| Dropbox | Intigriti | via Intigriti | — | PARTIAL | join + own-file API |
| GitLab | — | — | — | STUB | XOR Dropbox |

## op refs (never expand in distill)

- `op://Personal/HackerOne/username`
- `op://Personal/HackerOne/user[password]`
- `op://Personal/Intigriti/Input.Username`
- `op://Personal/Intigriti/Input.Password`
- `op://Personal/TinyFish API/credential`
