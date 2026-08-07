# ATLASSIAN-OPENAI-DOORS-P217
UTC: 2026-08-07T21:44:11Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Atlassian IdP + bounty

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://id.atlassian.com/login` | 202 | login shell |
| `GET` | `https://id.atlassian.com/.well-known/openid-configuration` | 202 | OIDC shell |
| `GET` | `https://admin.atlassian.com/` | 200 | admin shell |
| `GET` | `https://www.atlassian.com/` | 200 | marketing |
| `GET` | `https://www.atlassian.com/trust/bug-bounty` | 404 | first-party BB path miss |
| `GET` | `https://bugcrowd.com/engagements/atlassian` | 200 | **BC SSoT** |

## OpenAI product + API

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://platform.openai.com/` | 200→403 | apex bare 200 / follow 403 flip |
| `GET` | `https://platform.openai.com/login` | 403→200 | login bare 403 / follow 200 flip |
| `GET` | `https://openai.com/` | 403→200 | marketing curl class |
| `GET` | `https://chatgpt.com/auth/login` | 403 | curl/bot class this tick |
| `GET` | `https://api.openai.com/` | 421 | misdirected/TLS class |
| `GET` | `https://api.openai.com/v1/models` | 401 | unauth |
| `GET` | `https://auth0.openai.com/` | 302→403 | → chatgpt gate |
| `GET` | `https://auth0.openai.com/.well-known/openid-configuration` | 404 | no public OIDC |
| `GET` | `https://bugcrowd.com/engagements/openai` | 200 | **BC SSoT** |
| `GET` | `https://hackerone.com/openai` | 200 | soft H1 |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | BC identity |

## Summary
Atlassian BB **BC atlassian** SSoT; id.* **202**. OpenAI BB **BC openai** SSoT; platform apex/login **UA flip pair**; chatgpt auth **403** this tick; api models **401**. H1 soft openai **200**.

## Auth readiness (runner-a)
- Atlassian: id.atlassian.com browser + BC eng; admin shell.
- OpenAI: browser (curl heavily gated); API key via op:// after account.
- Prefer BC over H1 for both programs.

## Deltas vs P207
- chatgpt.com/auth/login **403** (was 200) — stronger curl gate.
- platform apex bare **200** / follow **403**; login bare **403** / follow **200** (inverse flip pair continues).
- Core stable: id 202, BC SSoT both, trust BB 404, api 421/401, H1 soft 200.
