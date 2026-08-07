# ATLASSIAN-OPENAI-DOORS-P140
UTC: 2026-08-07T19:05:11Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://www.atlassian.com/trust/bug-bounty` | 404 | no first-party path |
| `GET` | `https://bugcrowd.com/engagements/atlassian` | 200 | BC SSoT |
| `GET` | `https://id.atlassian.com/login` | 202 | login shell |
| `GET` | `https://auth.atlassian.com/` | 301 | id.atlassian.com |
| `GET` | `https://developer.atlassian.com/console/myapps/` | 200 | - |
| `GET` | `https://trello.com/login` | 302 | id.atlassian.com/login?application=trello… |
| `GET` | `https://bugcrowd.com/engagements/openai` | 200 | BC SSoT |
| `GET` | `https://openai.com/security` | 308 | /security/ |
| `GET` | `https://openai.com/security/disclosure` | 308 | /security/disclosure/ |
| `GET` | `https://openai.com/policies/security` | 403 | curl gate |
| `GET` | `https://auth0.openai.com/.well-known/openid-configuration` | 404 | no OIDC discovery |
| `GET` | `https://platform.openai.com/` | 403 | curl gate this tick (was 200 P124) |
| `GET` | `https://platform.openai.com/login` | 403 | - |
| `GET` | `https://chatgpt.com/` | 200 | was 403 curl P124 |
| `GET` | `https://api.openai.com/` | 421 | - |
| `GET` | `https://api.openai.com/v1/models` | 401 | unauth expected |

## Summary
Atlassian + OpenAI passive door refresh for runner-a (P140).
- Atlassian BB: BC engagements/atlassian **200**; trust path **404**.
- id.login **202**; auth→id; trello→id; dev console **200**.
- OpenAI BC **200**; security paths trailing-slash **308**; policies **403**.
- **Deltas:** platform.openai.com **403** (was 200); chatgpt.com **200** (was 403).
- auth0.openai OIDC **404**; api root **421** models **401**.

## Auth readiness
BC atlassian + openai; Atlassian id session (browser); OpenAI platform curl-gated this tick.
