# ATLASSIAN-OPENAI-DOORS-P150
UTC: 2026-08-07T19:27:00Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://www.atlassian.com/` | 200 | - |
| `GET` | `https://id.atlassian.com/login` | 202 | IdP login shell |
| `GET` | `https://id.atlassian.com/signup` | 202 | - |
| `GET` | `https://auth.atlassian.com/.well-known/openid-configuration` | 200 | OIDC discovery |
| `GET` | `https://developer.atlassian.com/console/myapps/` | 200 | dev console |
| `GET` | `https://trello.com/login` | 302 | → id.atlassian.com |
| `GET` | `https://bitbucket.org/account/signin/` | 302 | → id.atlassian.com |
| `GET` | `https://www.atlassian.com/trust/security/bug-bounty` | 404 | first-party BB path gone |
| `GET` | `https://bugcrowd.com/engagements/atlassian` | 200 | BC SSoT |
| `GET` | `https://bugcrowd.com/h/atlassian` | 200 | soft shell |
| `GET` | `https://openai.com/` | 403 | curl gated this tick |
| `GET` | `https://platform.openai.com/` | 200 | **delta** was 403 P140 |
| `GET` | `https://platform.openai.com/login` | 200 | **delta** was 403 P140 |
| `GET` | `https://chatgpt.com/` | 403 | **delta** was 200 P140 |
| `GET` | `https://auth0.openai.com/` | 302 | → chatgpt.com |
| `GET` | `https://api.openai.com/` | 421 | misdirected/SNI |
| `GET` | `https://api.openai.com/v1/models` | 401 | unauth expected |
| `GET` | `https://openai.com/security` | 403 | curl gate |
| `GET` | `https://openai.com/policies/bug-bounty-program` | 403 | curl gate this tick |
| `GET` | `https://bugcrowd.com/engagements/openai` | 200 | BC SSoT |
| `GET` | `https://bugcrowd.com/h/openai` | 200 | soft shell |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | BC IdP |
| `GET` | `https://tracker.bugcrowd.com/atlassian` | 302 | → sign_in |
| `GET` | `https://tracker.bugcrowd.com/openai` | 302 | → sign_in |

## Summary
Atlassian+OpenAI passive door refresh for runner-a (P150). Atlassian id login/signup **202**; auth OIDC **200**; trello/bitbucket → id; trust BB **404**; BC atlassian **200**. OpenAI: platform(+login) **200** this tick (was 403); chatgpt **403** (was 200); openai.com/security/policies curl **403**; BC openai **200**; api models **401**. Auth readiness: Atlassian id browser + BC join; OpenAI platform browser + BC.

## Deltas vs P140
- platform.openai.com (+/login): **403 → 200**.
- chatgpt.com: **200 → 403**.
- openai.com apex/security/policies: **403** curl gate.
- Atlassian id 202 + BC SSoT **stable**.
