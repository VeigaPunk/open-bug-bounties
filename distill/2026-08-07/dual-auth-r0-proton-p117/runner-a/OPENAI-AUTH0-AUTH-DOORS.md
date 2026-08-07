# OpenAI platform + Auth0 CIC auth doors — passive (Runner A)

**UTC:** 2026-08-07T14:43:54Z  
**Policy recon only** — no login, no API keys, no exploit. Bounty SSoT remains BC engagements.

## OpenAI / ChatGPT

| URL | Code | Role |
|-----|------|------|
| https://platform.openai.com | 200 | Platform shell |
| https://platform.openai.com/login | 200 | Platform login |
| https://platform.openai.com/docs | 200 | Platform docs |
| https://auth.openai.com | 200 | Auth front door |
| https://auth0.openai.com | 200 | Auth0-hosted OpenAI tenant shell |
| https://chatgpt.com | 200 | ChatGPT shell |
| https://chatgpt.com/auth/login | 200 | ChatGPT login |
| https://openai.com/security | 200 | Security hub |
| https://openai.com/policies/security-policy | **404** | Stale policy path |
| https://bugcrowd.com/engagements/openai | 200 | **Bounty SSoT** |
| https://api.openai.com | **421** | Misdirected/host reject unauth curl |
| https://api.openai.com/v1/models | **ERR/timeout** | No public unauth list this tick |

## Auth0 CIC bug-bounty tenant + docs

| URL | Code | Role |
|-----|------|------|
| https://manage.cic-bug-bounty.auth0app.com | **400** | Manage unauth (prior) |
| https://manage.cic-bug-bounty.auth0app.com/login | **400** | Login needs valid OIDC state |
| https://cic-bug-bounty.auth0app.com | **ERR** | Bare tenant host unreachable/fail |
| https://bugcrowd.com/engagements/auth0-okta | 200 | **Bounty SSoT** |
| https://developer.auth0.com | 200 | Developer docs |
| https://auth0.com/docs/secure/security-center | 200 | Security center docs |

## Auth-ready implications

1. OpenAI bounty work starts from **BC engagement**, not public marketing policy paths (404 on stale security-policy URL).
2. Platform + ChatGPT login doors are **200** — use browser / program-required accounts only; no API key scrape into distill.
3. `api.openai.com` **421** unauth curl is a host/SNI boundary, not a program join signal.
4. Auth0 CIC manage stays **400** without Get Creds browser path (see `AUTH0-GET-CREDS.md`, `AUTH0-OIDC-PASSIVE.md`).
5. Prefer `developer.auth0.com` + BC auth0-okta over guessing auth0app bare hosts.

## Related

- `OPENAI-ATLASSIAN-PASSIVE.md`, `AUTH0-OIDC-PASSIVE.md`, `AUTH0-GET-CREDS.md`
- `shared/BC-OAUTH-MAP.md`

## Axes

- auth_ready_a↑ (OpenAI/Auth0 door map)
- evidence_fidelity↑ (421 API, 400 manage, 404 policy)
- safety_in_policy↑
