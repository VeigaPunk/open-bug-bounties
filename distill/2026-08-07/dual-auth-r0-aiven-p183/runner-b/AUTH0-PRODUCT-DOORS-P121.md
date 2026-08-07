# AUTH0-PRODUCT-DOORS-P121
UTC: 2026-08-07T18:28:03Z
Policy: passive HTTP recon only (no -L for status; Location captured). No auth abuse.

| URL | code | location/notes |
|-----|------|----------------|
| `https://auth0.com/` | 200 | - |
| `https://auth0.com/docs` | 200 | - |
| `https://auth0.com/docs/authenticate` | 200 | - |
| `https://auth0.com/docs/api/authentication` | 200 | - |
| `https://auth0.com/docs/api/management/v2` | 200 | - |
| `https://auth0.com/signup` | 200 | - |
| `https://auth0.com/login` | 404 | - |
| `https://auth0.com/security` | 308 | https://security.okta.com/ |
| `https://auth0.com/responsible-disclosure-policy` | 308 | https://bugcrowd.com/auth0-okta |
| `https://manage.auth0.com/` | 302 | /login |
| `https://manage.auth0.com/login` | 302 | https://auth0.auth0.com/authorize?scope=openid%20profile%20email&max_age=43200&nonce=781ece2e80f1a2a0bc44d48eaed29905&re |
| `https://auth0.auth0.com/.well-known/openid-configuration` | 200 | - |
| `https://auth0.auth0.com/.well-known/jwks.json` | 200 | - |
| `https://auth0.auth0.com/oauth/token` | 404 | - |
| `https://cdn.auth0.com/` | 200 | - |
| `https://status.auth0.com/` | 200 | - |
| `https://community.auth0.com/` | 200 | - |
| `https://support.auth0.com/` | 302 | https://auth0.auth0.com/authorize?client_id=YAoR7lyosNmtHiP4CUcdI8Fu4J2vC6wM&scope=read%3Atickets%20create%3Atickets%20u |
| `https://bugcrowd.com/engagements/auth0` | 404 | - |
| `https://bugcrowd.com/engagements/auth0-okta` | 200 | - |
| `https://bugcrowd.com/engagements/okta-auth0` | 404 | - |
| `https://bugcrowd.com/engagements/okta` | 200 | - |
| `https://manage.cic-bug-bounty.auth0app.com/` | 302 | /login |
| `https://cic-bug-bounty.auth0app.com/` | ERR | - |

## OIDC issuer (auth0.auth0.com)
issuer https://auth0.auth0.com/
authorization_endpoint https://auth0.auth0.com/authorize
token_endpoint https://auth0.auth0.com/oauth/token
jwks_uri https://auth0.auth0.com/.well-known/jwks.json
grant_types client_credentials,authorization_code,refresh_token,password,implicit,urn:ietf:params:oauth:grant-type:device_code,urn:ietf:params:oauth:grant-type:token-exchange,http://auth0.com/oauth/grant-type/password-realm,http://auth0.com/oauth/grant-type/passwordless/otp,http://auth0.com/oauth/grant-type/mfa-oob,http://auth0.com/oauth/grant-type/mfa-otp,http://auth0.com/oauth/grant-type/mfa-recovery-code
dpop ['ES256']
device https://auth0.auth0.com/oauth/device/code

## Delta vs prior AUTH0-CIC / AUTH0-PRODUCT-AUTH
- manage.auth0.com → /login → auth0.auth0.com/authorize (stable)
- auth0.com/login 404; /signup 200 (stable)
- BC: auth0 slug vs auth0-okta SSoT (recheck codes below)
- cic-bug-bounty manage host still unauth 400-class expected

## Summary
Product docs+OIDC discovery 200; Dashboard OIDC bounce; BC engagement map refreshed for runner-b auth readiness.
