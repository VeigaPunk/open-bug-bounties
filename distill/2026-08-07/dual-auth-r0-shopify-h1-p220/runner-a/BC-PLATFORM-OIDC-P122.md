# BC-PLATFORM-OIDC-P122
UTC: 2026-08-07T18:29:25Z
Policy: passive HTTP recon only (no -L for status). No auth abuse / no exploit.

| URL | code | location/notes |
|-----|------|----------------|
| `https://bugcrowd.com/` | 301 | https://www.bugcrowd.com/ |
| `https://bugcrowd.com/engagements` | 200 | - |
| `https://bugcrowd.com/programs` | 301 | https://bugcrowd.com/engagements |
| `https://bugcrowd.com/user/sign_in` | 302 | https://identity.bugcrowd.com/login?user_hint=researcher&returnTo=https%3A%2F%2Fbugcrowd.com%2Fdashboard |
| `https://bugcrowd.com/user/sign_up` | 301 | https://login.bugcrowd.com/signin/register |
| `https://tracker.bugcrowd.com/` | 302 | https://tracker.bugcrowd.com/user/sign_in |
| `https://tracker.bugcrowd.com/user/sign_in` | 200 | - |
| `https://identity.bugcrowd.com/` | 403 | - |
| `https://login.bugcrowd.com/` | 302 | https://tracker.bugcrowd.com/user/sign_in |
| `https://login.bugcrowd.com/register` | 404 | - |
| `https://login.hackers.bugcrowd.com/` | 302 | https://identity.bugcrowd.com/login/hacker |
| `https://login.hackers.bugcrowd.com/.well-known/openid-configuration` | 200 | - |
| `https://login.hackers.bugcrowd.com/oauth2/default/.well-known/openid-configuration` | 200 | - |
| `https://login.hackers.bugcrowd.com/oauth2/default/v1/keys` | 200 | - |
| `https://api.bugcrowd.com/` | 200 | - |
| `https://api.bugcrowd.com/v2` | 404 | - |
| `https://docs.bugcrowd.com/` | 200 | - |
| `https://docs.bugcrowd.com/api` | 404 | - |
| `https://docs.bugcrowd.com/researchers/participating-in-program/your-bugcrowdninja-email-address/` | 200 | - |
| `https://bugcrowd.com/engagements/okta` | 200 | - |
| `https://bugcrowd.com/engagements/auth0-okta` | 200 | - |
| `https://bugcrowd.com/engagements/aiven` | 404 | - |
| `https://bugcrowd.com/engagements/atlassian` | 200 | - |
| `https://bugcrowd.com/engagements/openai` | 200 | - |

## OIDC (login.hackers.bugcrowd.com)
issuer https://login.hackers.bugcrowd.com
authorization_endpoint https://login.hackers.bugcrowd.com/oauth2/v1/authorize
token_endpoint https://login.hackers.bugcrowd.com/oauth2/v1/token
jwks_uri https://login.hackers.bugcrowd.com/oauth2/v1/keys
userinfo_endpoint https://login.hackers.bugcrowd.com/oauth2/v1/userinfo
end_session_endpoint https://login.hackers.bugcrowd.com/oauth2/v1/logout
scopes openid,email,profile,address,phone,offline_access,groups
code_challenge ['S256']

## OIDC oauth2/default
issuer https://login.hackers.bugcrowd.com/oauth2/default
authorization_endpoint https://login.hackers.bugcrowd.com/oauth2/default/v1/authorize
jwks_uri https://login.hackers.bugcrowd.com/oauth2/default/v1/keys

## Summary
BC platform shells + hackers Okta OIDC discovery refreshed for runner-a auth readiness.
