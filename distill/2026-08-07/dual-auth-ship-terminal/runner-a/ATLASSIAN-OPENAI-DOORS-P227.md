# ATLASSIAN-OPENAI-DOORS-P227
UTC: 2026-08-07T22:03:51Z
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
| `GET` | `https://platform.openai.com/` | 403 | apex curl class this tick |
| `GET` | `https://platform.openai.com/login` | 200 | login shell open |
| `GET` | `https://openai.com/` | 403 | marketing curl class |
| `GET` | `https://chatgpt.com/auth/login` | 403 | curl/bot class |
| `GET` | `https://api.openai.com/` | 421 | misdirected/TLS class |
| `GET` | `https://api.openai.com/v1/models` | 401 | unauth |
| `GET` | `https://auth0.openai.com/` | 302→200 | → chatgpt.com class |
| `GET` | `https://auth0.openai.com/.well-known/openid-configuration` | 404 | no public OIDC |
| `GET` | `https://bugcrowd.com/engagements/openai` | 200 | **BC SSoT** |
| `GET` | `https://hackerone.com/openai` | 200 | soft H1 |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | BC identity |

## Summary
Atlassian BB **BC atlassian** SSoT; id.* **202**. OpenAI BB **BC openai** SSoT; platform login **200**; apex/openai.com/chatgpt auth **403**; api models **401**; api root **421**. H1 soft openai **200**. security-impact-only scope on OpenAI.

## Auth readiness (runner-a)
- Atlassian: id.atlassian.com browser + BC bugbounty-test-* after CAPTCHA.
- OpenAI: platform.openai.com/login browser; API Bearer after account (not curl durable).
- Bounty: BC atlassian + BC openai (read STOP before any OpenAI test).

## Deltas vs P217
- platform.openai.com/login **200** stable (less flip); apex **403** only.
- auth0.openai.com follow **200** chatgpt (was 302→403).
- Core stable: id 202, BC both 200, models 401, OIDC well-known 404, trust BB 404.
