# GOOGLE-VRP-DOORS-P125
UTC: 2026-08-07T18:35:16Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| URL | code | location/notes |
|-----|------|----------------|
| `https://bughunters.google.com/` | 200 | - |
| `https://bughunters.google.com/about/rules/6625378258649088` | 301 | https://bughunters.google.com/about/rules/google-friends/google-and-alphabet-vulnerability-reward-program-vrp-rules |
| `https://bughunters.google.com/learn` | 200 | - |
| `https://g.co/vulnz` | 302 | https://bughunters.google.com/ |
| `https://www.google.com/about/appsecurity/` | 301 | https://about.google/appsecurity |
| `https://www.google.com/about/appsecurity/reward-program/` | 301 | https://bughunters.google.com/about/rules/6625378258649088 |
| `https://accounts.google.com/` | 302 | https://accounts.google.com/ServiceLogin?passive=1209600&continue=https%3A%2F%2Faccounts.google.com%2F&followup=https%3A%2F%2Faccounts.googl |
| `https://accounts.google.com/ServiceLogin` | 302 | https://accounts.google.com/v3/signin/identifier?flowName=WebLiteSignIn&flowEntry=ServiceLogin&dsh=S-482595773:1786127718880794 |
| `https://accounts.google.com/.well-known/openid-configuration` | 200 | - |
| `https://oauth2.googleapis.com/` | 404 | - |
| `https://www.googleapis.com/` | 404 | - |
| `https://drive.google.com/` | 302 | https://accounts.google.com/ServiceLogin?service=wise&passive=1209600&osid=1&continue=https://drive.google.com/&followup=https://drive.googl |
| `https://docs.google.com/` | 302 | https://accounts.google.com/ServiceLogin?passive=1209600&osid=1&continue=https://docs.google.com/&followup=https://docs.google.com/&emr=1 |
| `https://admin.google.com/` | 302 | https://www.google.com/sorry/index?continue=https://admin.google.com/&q=EhAoBAFNXFY27y7Yrv8AAAFyGOfK2NMGIjAeLaD_E6OfBH6oZfg9q5kt0bu--5juNhcb |
| `https://console.cloud.google.com/` | 302 | https://accounts.google.com/ServiceLogin?service=cloudconsole&passive=1209600&osid=1&continue=https://console.cloud.google.com/&followup=htt |
| `https://hackerone.com/google` | 200 | - |
| `https://hackerone.com/googlevrp` | 404 | - |
| `https://issuetracker.google.com/` | 302 | https://issuetracker.google.com/issues |
| `https://security.googleblog.com/` | 301 | https://blog.google/security/ |

## Google accounts OIDC snippet
issuer https://accounts.google.com
authorization_endpoint https://accounts.google.com/o/oauth2/v2/auth
token_endpoint https://oauth2.googleapis.com/token
jwks_uri https://www.googleapis.com/oauth2/v3/certs

## Summary
Google VRP public shells + accounts OIDC + product unauth posture for runner-b.
