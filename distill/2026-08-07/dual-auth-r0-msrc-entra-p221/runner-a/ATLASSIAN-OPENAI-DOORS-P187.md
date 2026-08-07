# ATLASSIAN-OPENAI-DOORS-P187
UTC: 2026-08-07T20:42:07Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Atlassian identity + product

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://www.atlassian.com/` | 200 | marketing |
| `GET` | `https://id.atlassian.com/login` | 202 | unauth shell |
| `GET` | `https://id.atlassian.com/.well-known/openid-configuration` | 202 | discovery 202 class |
| `GET` | `https://auth.atlassian.com/` | 301 | hop |
| `GET` | `https://developer.atlassian.com/` | 200 | developer |
| `GET` | `https://www.atlassian.com/trust/security/bug-bounty` | 404 | trust BB path dead |
| `GET` | `https://bugcrowd.com/engagements/atlassian` | 200 | BC SSoT |
| `GET` | `https://hackerone.com/atlassian` | 200 | H1 soft |

## OpenAI product + API

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://openai.com/` | 403 | curl blocked this tick |
| `GET` | `https://openai.com/security` | 403 | curl blocked |
| `GET` | `https://openai.com/policies/bug-bounty-program` | 403 | curl blocked |
| `GET` | `https://platform.openai.com/` | 403 | curl blocked (was 200 P177) |
| `GET` | `https://platform.openai.com/login` | 403 | curl blocked (was 200 P177) |
| `GET` | `https://chat.openai.com/` | 308 | hop class |
| `GET` | `https://api.openai.com/` | 421 | misdirected class |
| `GET` | `https://api.openai.com/v1/models` | 401 | unauth |
| `GET` | `https://auth0.openai.com/` | 302 | hop |
| `GET` | `https://auth0.openai.com/.well-known/openid-configuration` | 404 | |
| `GET` | `https://bugcrowd.com/engagements/openai` | 200 | BC SSoT |
| `GET` | `https://hackerone.com/openai` | 200 | H1 soft |

## Summary
Atlassian SSoT **BC atlassian**; id **202**. OpenAI SSoT **BC openai**. This tick OpenAI marketing/platform shells **403** curl (browser required); models **401**; api apex **421**.

## Auth readiness (runner-a)
- Atlassian: browser id.atlassian.com (202 shell).
- OpenAI: browser required for platform/marketing this tick; API token for models.

## Deltas vs P177
- platform.openai.com + login **403** (was **200**).
- openai.com apex/security/BB policy **403** (not 308/200 class).
- id **202** + BC/H1 dual soft + models **401** **stable**.
