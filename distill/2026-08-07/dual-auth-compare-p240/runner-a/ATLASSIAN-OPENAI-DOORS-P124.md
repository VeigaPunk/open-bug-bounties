# ATLASSIAN-OPENAI-DOORS-P124
UTC: 2026-08-07T18:33:19Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| URL | code | location/notes |
|-----|------|----------------|
| `https://www.atlassian.com/trust/security/bug-bounty` | 404 | - |
| `https://bugcrowd.com/engagements/atlassian` | 200 | - |
| `https://id.atlassian.com/login` | 202 | - |
| `https://id.atlassian.com/` | 301 | /login |
| `https://developer.atlassian.com/console` | 200 | - |
| `https://api.atlassian.com/` | 301 | https://developer.atlassian.com |
| `https://bitbucket.org/account/signin` | 301 | /account/signin/ |
| `https://trello.com/login` | 302 | https://id.atlassian.com/login?application=trello&continue=https%3A%2F%2Ftrello.com%2Fauth%2Fatlassian%2Fcallback%3FreturnUrl%3D%26aaOnboard |
| `https://auth.atlassian.com/` | 301 | https://id.atlassian.com/ |
| `https://openai.com/security` | 403 | - |
| `https://openai.com/policies/bug-bounty-program` | 308 | /policies/bug-bounty-program/ |
| `https://openai.com/policies/security-policy` | 308 | /policies/security-policy/ |
| `https://bugcrowd.com/engagements/openai` | 200 | - |
| `https://platform.openai.com/` | 200 | - |
| `https://platform.openai.com/login` | 403 | - |
| `https://auth0.openai.com/` | 302 | https://chatgpt.com/ |
| `https://auth0.openai.com/.well-known/openid-configuration` | 404 | - |
| `https://api.openai.com/` | 421 | - |
| `https://api.openai.com/v1/models` | 401 | - |
| `https://chatgpt.com/` | 403 | - |
| `https://chat.openai.com/` | 308 | https://chatgpt.com/ |

## OpenAI Auth0 OIDC (if 200)
no OIDC body

## Summary
Atlassian identity shells + OpenAI/BC SSoT + platform API posture for runner-a.
