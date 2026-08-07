# ATLASSIAN-OPENAI-DOORS-P157
UTC: 2026-08-07T19:40:45Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://www.atlassian.com/` | 200 | - |
| `GET` | `https://id.atlassian.com/login` | 202 | - |
| `GET` | `https://id.atlassian.com/signup` | 202 | - |
| `GET` | `https://auth.atlassian.com/.well-known/openid-configuration` | 200 | - |
| `GET` | `https://developer.atlassian.com/console/myapps/` | 200 | - |
| `GET` | `https://trello.com/login` | 302 | → https://id.atlassian.com/login (auth hop) |
| `GET` | `https://bitbucket.org/account/signin/` | 302 | → https://id.atlassian.com/login (auth hop) |
| `GET` | `https://www.atlassian.com/trust/security/bug-bounty` | 404 | - |
| `GET` | `https://bugcrowd.com/engagements/atlassian` | 200 | - |
| `GET` | `https://bugcrowd.com/h/atlassian` | 200 | - |
| `GET` | `https://openai.com/` | 403 | - |
| `GET` | `https://platform.openai.com/` | 200 | - |
| `GET` | `https://platform.openai.com/login` | 403 | - |
| `GET` | `https://chatgpt.com/` | 200 | - |
| `GET` | `https://auth0.openai.com/` | 302 | → https://chatgpt.com/ |
| `GET` | `https://api.openai.com/` | 421 | - |
| `GET` | `https://api.openai.com/v1/models` | 000 | - |
| `GET` | `https://openai.com/security` | 403 | - |
| `GET` | `https://openai.com/policies/bug-bounty-program` | 308 | → slash-normalized or BC (follow not used) |
| `GET` | `https://bugcrowd.com/engagements/openai` | 200 | - |
| `GET` | `https://bugcrowd.com/h/openai` | 200 | - |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | - |

## Summary
Atlassian IdP + OpenAI platform curl-gate matrix (P157 runner-a).

## Auth readiness
- Atlassian BB SSoT: BC engagements/atlassian; id.login shell.
- OpenAI BB SSoT: BC openai; curl gates on apex/chatgpt may flip.

## Deltas vs P150
- Atlassian: id.login/signup **202**; OIDC **200**; trello+bitbucket→id; BC atlassian **200**; trust BB **404** — stable.
- platform.openai **200** stable; **platform/login 403** (was 200 P150).
- **chatgpt.com 200** (was 403 P150) — curl gate flip again.
- openai.com apex/security **403**; policies **308**; api root **421**; v1/models **000** this tick (timeout/fail).
- BC openai **200** SSoT unchanged. Prefer browser for OpenAI gates.
