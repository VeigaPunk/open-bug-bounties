# Intigriti + Dropbox auth doors (PULSE-97)

UTC: 2026-08-07T17:36:05Z
Policy: recon only — no auth, no exploit, no token harvest.
OAuth query values redacted (`client_id`/`state`/`request_uri` → `…`).

## Passive HEAD/GET (max-redirs 0)

| method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://app.intigriti.com` | 307 | `https://www.intigriti.com` |
| `GET` | `https://app.intigriti.com` | 307 | `https://www.intigriti.com` |
| `HEAD` | `https://www.intigriti.com` | 200 | `-` |
| `GET` | `https://www.intigriti.com` | 200 | `-` |
| `HEAD` | `https://app.intigriti.com/login` | 200 | `-` |
| `GET` | `https://app.intigriti.com/login` | 200 | `-` |
| `HEAD` | `https://app.intigriti.com/auth/login` | 200 | `-` |
| `GET` | `https://app.intigriti.com/auth/login` | 200 | `-` |
| `HEAD` | `https://app.intigriti.com/researcher` | 302 | `https://app.intigriti.com/auth/researcher?redirect=%2Fresearcher` |
| `GET` | `https://app.intigriti.com/researcher` | 302 | `https://app.intigriti.com/auth/researcher?redirect=%2Fresearcher` |
| `HEAD` | `https://app.intigriti.com/auth/researcher` | 200 | `-` |
| `GET` | `https://app.intigriti.com/auth/researcher` | 302 | `https://login.intigriti.com/connect/authorize?client_id=…&request_uri=…&x-client-SKU=ID_NET9_0&x-client-ver=8.0.1.0` |
| `HEAD` | `https://app.intigriti.com/programs` | 200 | `-` |
| `GET` | `https://app.intigriti.com/programs` | 200 | `-` |
| `HEAD` | `https://app.intigriti.com/programs/dropbox/dropbox/detail` | 200 | `-` |
| `GET` | `https://app.intigriti.com/programs/dropbox/dropbox/detail` | 200 | `-` |
| `HEAD` | `https://login.intigriti.com/.well-known/openid-configuration` | 405 | `-` |
| `GET` | `https://login.intigriti.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://dropbox.com/bug-bounty` | 301 | `https://www.dropbox.com/bug-bounty` |
| `GET` | `https://dropbox.com/bug-bounty` | 301 | `https://www.dropbox.com/bug-bounty` |
| `HEAD` | `https://www.dropbox.com/bug-bounty` | 404 | `-` |
| `GET` | `https://www.dropbox.com/bug-bounty` | 404 | `-` |
| `HEAD` | `https://www.dropbox.com/login` | 200 | `-` |
| `GET` | `https://www.dropbox.com/login` | 200 | `-` |
| `HEAD` | `https://www.dropbox.com/register` | 200 | `-` |
| `GET` | `https://www.dropbox.com/register` | 200 | `-` |
| `HEAD` | `https://www.dropbox.com/developers` | 429 | `-` |
| `GET` | `https://www.dropbox.com/developers` | 200 | `-` |
| `HEAD` | `https://www.dropbox.com/developers/documentation` | 200 | `-` |
| `GET` | `https://www.dropbox.com/developers/documentation` | 200 | `-` |
| `HEAD` | `https://www.dropbox.com/oauth2/authorize` | 302 | `/oauth2/authorize_error?error_detail=Missing+client_id.&error_name=missing_client_id` |
| `GET` | `https://www.dropbox.com/oauth2/authorize` | 302 | `/oauth2/authorize_error?error_detail=Missing+client_id.&error_name=missing_client_id` |
| `HEAD` | `https://api.dropboxapi.com` | 429 | `-` |
| `GET` | `https://api.dropboxapi.com` | 404 | `-` |
| `HEAD` | `https://api.dropboxapi.com/2/users/get_current_account` | 400 | `-` |
| `GET` | `https://api.dropboxapi.com/2/users/get_current_account` | 400 | `-` |
| `HEAD` | `https://content.dropboxapi.com` | 404 | `-` |
| `GET` | `https://content.dropboxapi.com` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/dropbox` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/dropbox` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/dropbox` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/dropbox` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/programs/dropbox` | 404 | `-` |
| `GET` | `https://bugcrowd.com/programs/dropbox` | 404 | `-` |
| `HEAD` | `https://tracker.bugcrowd.com/dropbox` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `GET` | `https://tracker.bugcrowd.com/dropbox` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `HEAD` | `https://hackerone.com/dropbox` | 404 | `-` |
| `GET` | `https://hackerone.com/dropbox` | 404 | `-` |

## Auth chain (passive)

1. Inti F4 SSoT programs/dropbox/dropbox/detail **200**.
2. Researcher gate: auth/researcher **302** → `https://login.intigriti.com/connect/authorize?client_id=…&request_uri=…&x-client-SKU=ID_NE`.
3. login.intigriti.com OIDC discovery **200**.
4. Dropbox login/register **200/200**; first-party BB **404**.
5. OAuth authorize bare **302**; API get_current_account **400**.
6. H1 dropbox **404**; BC bare dropbox **200** (soft, not join SSoT).

## Delta vs P73

- **New:** `login.intigriti.com/.well-known/openid-configuration` **HEAD 405 / GET 200**.
- auth/researcher: **HEAD 200 / GET 302** (OIDC hop only on GET).
- api.dropboxapi.com bare: **HEAD 429 / GET 404** (rate-limit on HEAD); get_current_account still **400**.
- developers HEAD **429** / GET **200** — prefer GET for door checks under rate pressure.
- F4 Inti detail **200** + Dropbox free login/register **200** stable; H1 dropbox **404**.

## Notes

- Inti join + @intigriti.me trial still human; XOR H2 park.
- No credentials.

## Auth readiness

- F4 Inti SSoT mapped; join + trial human.

## Next (human / gated)

- Inti authed join dropbox; free trial + headers; ≤5 rps; own files only.
