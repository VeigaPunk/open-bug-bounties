# MSRC-ENTRA-DOORS-P127
UTC: 2026-08-07T18:39:16Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| URL | code | location/notes |
|-----|------|----------------|
| `https://portal.msrc.microsoft.com/` | 302 | https://msrc.microsoft.com/update-guide |
| `https://portal.msrc.microsoft.com/en-us` | 302 | https://msrc.microsoft.com/update-guide |
| `https://portal.msrc.microsoft.com/en-us/researcher` | 302 | https://msrc.microsoft.com/en-us/researcher |
| `https://portal.msrc.microsoft.com/en-us/report` | 302 | https://msrc.microsoft.com/en-us/report |
| `https://www.microsoft.com/en-us/msrc` | 200 | - |
| `https://www.microsoft.com/en-us/msrc/bounty` | 200 | - |
| `https://www.microsoft.com/en-us/msrc/opensource` | 404 | - |
| `https://api.msrc.microsoft.com/` | 404 | - |
| `https://api.msrc.microsoft.com/cvrf/v3.0/updates` | 200 | - |
| `https://login.microsoftonline.com/` | 302 | https://www.office.com/login# |
| `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration` | 200 | - |
| `https://login.microsoft.com/` | 302 | https://www.office.com/login# |
| `https://login.live.com/` | 200 | - |
| `https://account.microsoft.com/` | 302 | https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?scope=https:%2F%2Faccount.microsoft.com%2FMBI openid profile offline_acces |
| `https://portal.azure.com/` | 200 | - |
| `https://entra.microsoft.com/` | 200 | - |
| `https://msrc.microsoft.com/` | 302 | https://www.microsoft.com/en-us/msrc |
| `https://www.microsoft.com/en-us/security` | 200 | - |
| `https://opensource.microsoft.com/` | 200 | - |

## Entra/common OIDC snippet
issuer https://login.microsoftonline.com/{tenantid}/v2.0
authorization_endpoint https://login.microsoftonline.com/common/oauth2/v2.0/authorize
token_endpoint https://login.microsoftonline.com/common/oauth2/v2.0/token
jwks_uri https://login.microsoftonline.com/common/discovery/v2.0/keys

## Summary
MSRC portal/API + Entra OIDC common tenant discovery for runner-b auth readiness.
