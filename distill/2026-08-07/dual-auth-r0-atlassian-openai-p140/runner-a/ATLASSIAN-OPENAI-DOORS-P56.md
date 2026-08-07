# Atlassian + OpenAI auth doors (PULSE-56)

UTC: 2026-08-07T16:12:28Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (max-redirs 0)

| URL | status | location | set-cookie | notes |
|-----|--------|----------|------------|-------|
| `https://id.atlassian.com/login` | 202 | - | 0 |  |
| `https://id.atlassian.com` | 301 | /login | 0 |  |
| `https://www.atlassian.com` | 200 | - | 5 | cookies=5 |
| `https://developer.atlassian.com/console` | 200 | - | 1 | cookies=1 |
| `https://api.atlassian.com` | 301 | https://developer.atlassian.com | 0 |  |
| `https://bitbucket.org/account/signin` | 301 | /account/signin/ | 0 |  |
| `https://trello.com/login` | 302 | https://id.atlassian.com/login?application=trello&continue=https%3A%2F%2Ftrello.com%2Fauth%2Fat | 1 | cookies=1 |
| `https://www.atlassian.com/trust/security/bug-bounty` | 404 | - | 0 |  |
| `https://bugcrowd.com/engagements/atlassian` | 200 | - | 1 | cookies=1 |
| `https://bugcrowd.com/h/engagements/atlassian` | 200 | - | 0 |  |
| `https://bugcrowd.com/engagements/openai` | 200 | - | 1 | cookies=1 |
| `https://bugcrowd.com/h/engagements/openai` | 200 | - | 0 |  |
| `https://platform.openai.com` | 200 | - | 2 | cookies=2 |
| `https://platform.openai.com/login` | 403 | - | 1 | cookies=1 |
| `https://auth0.openai.com` | 302 | https://chatgpt.com/ | 0 |  |
| `https://chatgpt.com` | 200 | - | 6 | cookies=6 |
| `https://openai.com/security` | 308 | /security/ | 2 | cookies=2 |
| `https://openai.com/security-and-privacy/` | 200 | - | 5 | cookies=5 |
| `https://openai.com/policies/bug-bounty-program` | 308 | /policies/bug-bounty-program/ | 2 | cookies=2 |
| `https://openai.com/policies/security-policy` | 308 | /policies/security-policy/ | 2 | cookies=2 |
| `https://api.openai.com` | 421 | - | 1 | cookies=1 |
| `https://api.openai.com/v1/models` | err | - | 0 |  |

## Notes

- BC engagements/atlassian + openai remain bounty SSoT (trust BB path often 404).
- id.atlassian often 202 unauth; OpenAI API may 421 from curl.
- No secrets; human free accounts only.

## Delta vs prior
- platform.openai.com/login **403** (prior often 200 SPA).
- openai.com policy URLs now **308 → /** trailing-slash class (not bare 404).
- api.atlassian.com **301 → developer.atlassian.com**.
