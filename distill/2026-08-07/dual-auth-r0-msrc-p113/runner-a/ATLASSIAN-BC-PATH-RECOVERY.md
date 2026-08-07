# Atlassian BC path recovery (passive GET only)

UTC: 2026-08-07T15:18:56Z
Context: PULSE-31 okta/auth0 slug drift; mirror for atlassian + openai Q-BC.

| URL | code0 | follow→ | notes |
|-----|-------|---------|-------|
| `https://bugcrowd.com/engagements/atlassian` | 200 | 200 | - |
| `https://bugcrowd.com/engagements/atlassian/brief` | 301 | 200 | https://bugcrowd.com/h/engagements/atlassian/brief |
| `https://bugcrowd.com/h/engagements/atlassian` | 200 | 200 | - |
| `https://bugcrowd.com/h/engagements/atlassian/brief` | 200 | 200 | - |
| `https://bugcrowd.com/h/engagements/atlassian/announcements` | 200 | 200 | - |
| `https://bugcrowd.com/h/engagements/atlassian/crowdstream` | 200 | 200 | - |
| `https://bugcrowd.com/engagements/openai` | 200 | 200 | - |
| `https://bugcrowd.com/engagements/openai/brief` | 301 | 200 | https://bugcrowd.com/h/engagements/openai/brief |
| `https://bugcrowd.com/h/engagements/openai` | 200 | 200 | - |
| `https://bugcrowd.com/h/engagements/openai/brief` | 200 | 200 | - |
| `https://bugcrowd.com/h/engagements/openai/announcements` | 200 | 200 | - |
| `https://bugcrowd.com/engagements?category=bug_bounty&search=atlassian` | 200 | 200 | - |
| `https://bugcrowd.com/engagements?category=bug_bounty&search=openai` | 200 | 200 | - |
| `https://id.atlassian.com/login` | 202 | 202 | - |
| `https://developer.atlassian.com/console` | 200 | 200 | - |
| `https://api.atlassian.com/` | 301 | 200 | https://developer.atlassian.com/ |
| `https://bitbucket.org/account/signin` | 301 | 202 | https://id.atlassian.com/login?application=bitbucket&continue=https%3A%2F%2Fbitbucket.org%2Faccount%2Fsignin%2F%3Fnext%3D%252F%26redirectCount%3D1 |
| `https://trello.com/login` | 302 | 202 | https://id.atlassian.com/login?application=trello&continue=https%3A%2F%2Ftrello.com%2Fauth%2Fatlassian%2Fcallback%3FreturnUrl%3D%26aaOnboarding%3D%26updateEmail%3D%26traceId%3D%26ssoVerified%3D%26createMember%3D%26jiraInviteLink%3D |
| `https://platform.openai.com/` | 200 | 200 | - |
| `https://platform.openai.com/login` | 200 | 200 | - |
| `https://auth0.openai.com/` | 302 | 200 | https://chatgpt.com/ |
| `https://chatgpt.com/auth/login` | 200 | 200 | - |
| `https://openai.com/security` | 308 | 200 | https://openai.com/security-and-privacy/ |

## Notes
- Record bare vs /h/engagements for atlassian+openai like aiven/auth0.
- Product login shells only; no credentials, no spray.
