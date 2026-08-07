# ATLASSIAN-OPENAI-DOORS-P167
UTC: 2026-08-07T20:00:57Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Atlassian identity + product

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://id.atlassian.com/login` | 202 | unauth shell |
| `GET` | `https://id.atlassian.com/signup` | 202 | unauth shell |
| `GET` | `https://id.atlassian.com/.well-known/openid-configuration` | 202 | discovery responds 202 |
| `GET` | `https://developer.atlassian.com/console` | 200 | console shell |
| `GET` | `https://api.atlassian.com/` | 301 | → developer.atlassian.com |
| `GET` | `https://bitbucket.org/account/signin` | 301 | → signin/ |
| `GET` | `https://trello.com/login` | 302 | → id.atlassian login application=trello |
| `GET` | `https://www.atlassian.com/trust/security/bug-bounty` | 404 | trust BB path dead |
| `GET` | `https://bugcrowd.com/engagements/atlassian` | 200 | SSoT |

## OpenAI product + API

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://platform.openai.com/` | 200 | platform shell |
| `GET` | `https://platform.openai.com/login` | 403 | curl blocked |
| `GET` | `https://chatgpt.com/` | 200 | chat shell |
| `GET` | `https://chatgpt.com/auth/login` | 403 | curl blocked this tick |
| `GET` | `https://api.openai.com/` | 421 | misdirected/blocked class |
| `GET` | `https://api.openai.com/v1/models` | 401 | unauth (was 000 prior) |
| `GET` | `https://openai.com/security` | 403 | curl |
| `GET` | `https://openai.com/policies/bug-bounty-program` | 403 | curl |
| `GET` | `https://openai.com/policies/security-policy` | 403 | curl |
| `GET` | `https://bugcrowd.com/engagements/openai` | 200 | SSoT |
| `GET` | `https://auth0.openai.com/` | 302 | → chatgpt.com |
| `GET` | `https://auth0.openai.com/.well-known/openid-configuration` | 404 | |

## Summary
Atlassian bounty SSoT **BC atlassian**; id login/signup/OIDC **202** class; trello→id. OpenAI bounty SSoT **BC openai**; platform **200**; login surfaces **403** curl; models **401**; api apex **421**.

## Auth readiness (runner-a)
- Atlassian: browser id.atlassian.com.
- OpenAI: browser platform/chatgpt; API token for models.

## Deltas vs P157
- chatgpt.com/auth/login **403** (P157 noted 200 flip).
- api /v1/models **401** (was 000).
- openai.com security+policies **403** (stricter curl).
- id OIDC still **202** not 200.
