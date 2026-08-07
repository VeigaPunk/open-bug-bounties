# ATLASSIAN-OPENAI-DOORS-P177
UTC: 2026-08-07T20:22:58Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Atlassian identity + product

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://id.atlassian.com/login` | 202 | unauth shell |
| `GET` | `https://id.atlassian.com/signup` | 202 | unauth shell |
| `GET` | `https://id.atlassian.com/.well-known/openid-configuration` | 202 | discovery 202 class |
| `GET` | `https://developer.atlassian.com/console` | 200 | console shell |
| `GET` | `https://api.atlassian.com/` | 301 | → developer.atlassian.com |
| `GET` | `https://bitbucket.org/account/signin` | 301 | → signin/ |
| `GET` | `https://trello.com/login` | 302 | → id.atlassian application=trello |
| `GET` | `https://www.atlassian.com/trust/security/bug-bounty` | 404 | trust BB path dead |
| `GET` | `https://bugcrowd.com/engagements/atlassian` | 200 | BC SSoT |
| `GET` | `https://hackerone.com/atlassian` | 200 | H1 soft shell |

## OpenAI product + API

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://platform.openai.com/` | 200 | platform shell |
| `GET` | `https://platform.openai.com/login` | 200 | login shell (curl OK this tick) |
| `GET` | `https://chatgpt.com/` | 403 | curl blocked apex |
| `GET` | `https://chatgpt.com/auth/login` | 200 | auth login shell |
| `GET` | `https://api.openai.com/` | 421 | misdirected/blocked class |
| `GET` | `https://api.openai.com/v1/models` | 401 | unauth |
| `GET` | `https://openai.com/security` | 308 | hop (trailing path class) |
| `GET` | `https://openai.com/policies/bug-bounty-program` | 308 | → trailing slash |
| `GET` | `https://openai.com/policies/security-policy` | 403 | curl |
| `GET` | `https://bugcrowd.com/engagements/openai` | 200 | BC SSoT |
| `GET` | `https://hackerone.com/openai` | 200 | H1 soft shell |
| `GET` | `https://auth0.openai.com/` | 302 | → chatgpt.com |
| `GET` | `https://auth0.openai.com/.well-known/openid-configuration` | 404 | |

## Summary
Atlassian bounty SSoT **BC atlassian** (H1 soft 200). id login/signup/OIDC **202**. OpenAI SSoT **BC openai** (H1 soft 200). platform login **200** this tick; chatgpt apex **403**; models **401**; api apex **421**.

## Auth readiness (runner-a)
- Atlassian: browser id.atlassian.com.
- OpenAI: browser platform/chatgpt; API token for models.

## Deltas vs P167
- platform.openai.com/login **200** (was 403 curl).
- chatgpt.com apex **403** vs auth/login **200** (P167 apex 200 / auth 403 flip).
- openai.com/security **308** (was 403).
- H1 atlassian+openai soft **200** rows added.
- id **202** + BC SSoT matrix stable.
