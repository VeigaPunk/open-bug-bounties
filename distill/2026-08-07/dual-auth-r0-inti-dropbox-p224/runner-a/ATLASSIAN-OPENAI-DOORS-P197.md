# ATLASSIAN-OPENAI-DOORS-P197
UTC: 2026-08-07T21:02:25Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Atlassian IdP + bounty

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://id.atlassian.com/login` | 202 | login shell |
| `GET` | `https://id.atlassian.com/signup` | 202 | signup |
| `GET` | `https://id.atlassian.com/.well-known/openid-configuration` | 202 | OIDC |
| `GET` | `https://www.atlassian.com/` | 200 | marketing |
| `GET` | `https://www.atlassian.com/trust/bug-bounty` | 404 | first-party BB path miss |
| `GET` | `https://bugcrowd.com/engagements/atlassian` | 200 | **BC SSoT** |
| `GET` | `https://hackerone.com/atlassian` | 200 | soft H1 |

## OpenAI product + API

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://platform.openai.com/` | 403 | curl/bot class |
| `GET` | `https://platform.openai.com/login` | 200 | login shell |
| `GET` | `https://openai.com/` | 403 | marketing curl class |
| `GET` | `https://chatgpt.com/` | 200 | ChatGPT apex |
| `GET` | `https://chatgpt.com/auth/login` | 200 | auth login |
| `GET` | `https://api.openai.com/` | 421 | misdirected/TLS class |
| `GET` | `https://api.openai.com/v1/models` | 401 | unauth |
| `GET` | `https://auth0.openai.com/` | 403 | curl class |
| `GET` | `https://auth0.openai.com/.well-known/openid-configuration` | 404 | no public OIDC |
| `GET` | `https://bugcrowd.com/engagements/openai` | 200 | **BC SSoT** |
| `GET` | `https://hackerone.com/openai` | 200 | soft H1 |

## Summary
Atlassian BB **BC atlassian** SSoT; id.* **202**. OpenAI BB **BC openai** SSoT; platform/openai.com curl **403**; platform/login **200**; api models **401**. H1 soft **200** both.

## Auth readiness (runner-a)
- Atlassian: id.atlassian.com browser + BC eng.
- OpenAI: platform/login or chatgpt auth/login browser; API key via op://.
- Prefer BC over H1 for both programs.

## Deltas vs P187
- Matrix **stable**: id 202, BC SSoT both, trust BB 404, api 421/401, H1 soft 200.
- auth0.openai apex **403** (was 302); OIDC still **404**.
