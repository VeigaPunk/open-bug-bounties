# AUTH0-CIC-DOORS-P130
UTC: 2026-08-07T18:45:13Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| URL | code | location/notes |
|-----|------|----------------|
| `https://manage.cic-bug-bounty.auth0app.com/` | 302 | /login |
| `https://manage.cic-bug-bounty.auth0app.com/login` | 302 | https://config.cic-bug-bounty.auth0app.com/authorize?scope=openid%20profile%20email&max_age=43200&nonce=0351feed15c429dabef90faca9774a6f&res |
| `https://cic-bug-bounty.auth0app.com/` | ERR | - |
| `https://cic-bug-bounty.auth0app.com/.well-known/openid-configuration` | ERR | - |
| `https://cic-bug-bounty.us.auth0.com/` | 302 | https://us.auth0.com/ |
| `https://cic-bug-bounty.us.auth0.com/.well-known/openid-configuration` | 404 | - |
| `https://auth0.com/` | 200 | - |
| `https://auth0.com/signup` | 200 | - |
| `https://auth0.com/login` | 404 | - |
| `https://manage.auth0.com/` | 302 | /login |
| `https://manage.auth0.com/login` | 302 | https://auth0.auth0.com/authorize?scope=openid%20profile%20email&max_age=43200&nonce=c59d4b6560e72d0fff15b71c70ebdfd9&response_type=code&red |
| `https://auth0.auth0.com/.well-known/openid-configuration` | 200 | - |
| `https://bugcrowd.com/engagements/auth0-okta` | 200 | - |
| `https://bugcrowd.com/engagements/auth0` | 404 | - |
| `https://bugcrowd.com/auth0-okta` | 302 | https://bugcrowd.com/engagements/auth0-okta |
| `https://auth0.com/responsible-disclosure-policy` | 308 | https://bugcrowd.com/auth0-okta |
| `https://auth0.com/docs/deploy-monitor/deploy-cli-tool` | 200 | - |
| `https://cdn.auth0.com/` | 200 | - |

## CIC OIDC (us.auth0.com if any)
no_cic_oidc

## Summary
Auth0 CIC tenant + product + BC SSoT passive refresh for runner-a.
