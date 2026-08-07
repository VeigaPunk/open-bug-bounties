# ATLASSIAN-OPENAI-DOORS-P207
UTC: 2026-08-07T21:22:07Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Atlassian IdP + bounty

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://id.atlassian.com/login` | 202 | login shell |
| `GET` | `https://id.atlassian.com/.well-known/openid-configuration` | 202 | OIDC |
| `GET` | `https://admin.atlassian.com/` | 200 | admin shell |
| `GET` | `https://www.atlassian.com/trust/bug-bounty` | 404 | first-party BB path miss |
| `GET` | `https://bugcrowd.com/engagements/atlassian` | 200 | **BC SSoT** |

## OpenAI product + API

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://platform.openai.com/` | 200 | platform shell this tick |
| `GET` | `https://platform.openai.com/login` | 403 | curl/bot class flip |
| `GET` | `https://openai.com/` | 403 | marketing curl class |
| `GET` | `https://chatgpt.com/auth/login` | 200 | auth login |
| `GET` | `https://api.openai.com/` | 421 | misdirected/TLS class |
| `GET` | `https://api.openai.com/v1/models` | 401 | unauth |
| `GET` | `https://auth0.openai.com/` | 302 | → chatgpt.com |
| `GET` | `https://auth0.openai.com/.well-known/openid-configuration` | 404 | no public OIDC |
| `GET` | `https://bugcrowd.com/engagements/openai` | 200 | **BC SSoT** |
| `GET` | `https://hackerone.com/openai` | 200 | soft H1 |

## Summary
Atlassian BB **BC atlassian** SSoT; id.* **202**. OpenAI BB **BC openai** SSoT; platform apex **200** / login **403** flip; chatgpt auth **200**; api models **401**. H1 soft openai **200**.

## Auth readiness (runner-a)
- Atlassian: id.atlassian.com browser + BC eng; admin.atlassian.com shell.
- OpenAI: chatgpt auth/login preferred when platform/login curl-gated; API key via op://.
- Prefer BC over H1 for both programs.

## Deltas vs P197
- platform.openai.com apex **200** (was 403); platform/login **403** (was 200) — UA flip pair.
- auth0.openai **302**→chatgpt.com (was 403).
- Core stable: id 202, BC SSoT both, trust BB 404, api 421/401, H1 soft openai 200.
