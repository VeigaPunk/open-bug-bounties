# OKTA-PRODUCT-DOORS-P128
UTC: 2026-08-07T18:41:12Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| URL | code | location/notes |
|-----|------|----------------|
| `https://www.okta.com/` | 200 | - |
| `https://www.okta.com/bug-bounty/` | 404 | - |
| `https://www.okta.com/company/trust` | 404 | - |
| `https://trust.okta.com/` | 200 | - |
| `https://status.okta.com/` | 200 | - |
| `https://developer.okta.com/` | 200 | - |
| `https://developer.okta.com/signup/` | 200 | - |
| `https://login.okta.com/` | 200 | - |
| `https://login.okta.com/.well-known/openid-configuration` | 200 | - |
| `https://bugcrowd.com/engagements/okta` | 200 | - |
| `https://bugcrowd.com/engagements/auth0-okta` | 200 | - |
| `https://login.hackers.bugcrowd.com/.well-known/openid-configuration` | 200 | - |
| `https://integrator-4329175-admin.oktapreview.com/` | 302 | https://integrator-4329175-admin.oktapreview.com/admin/sso/oidc-entry |
| `https://integrator-4329175.oktapreview.com/` | 200 | - |
| `https://integrator-4329175.oktapreview.com/.well-known/openid-configuration` | 403 | - |
| `https://integrator-4329175-admin.oktapreview.com/admin/sso/configuration` | 404 | - |
| `https://integrator-4329175-admin.oktapreview.com/api/v1/users/me` | 403 | - |
| `https://okta.com/programs/okta` | 301 | https://www.okta.com/programs/okta |
| `https://security.okta.com/` | 200 | - |

## login.okta OIDC
issuer https://login.okta.com
authorization_endpoint https://login.okta.com/oauth2/v1/authorize
jwks_uri https://login.okta.com/oauth2/v1/keys

## Set5 oktapreview OIDC
issuer None
authorization_endpoint None

## Summary
Okta product+BC+Set5 OIDC passive refresh for runner-a.
