# Okta product + trust path refresh (passive GET only)

UTC: 2026-08-07T15:30:50Z
Context: Q-BC okta bare 200; re-verify product/trust/status shells (no Set5 password).

| URL | code0 | follow→ | notes |
|-----|-------|---------|-------|
| `https://www.okta.com/` | 200 | 200 | - |
| `https://www.okta.com/bug-bounty/` | 404 | 404 | - |
| `https://www.okta.com/company/trust` | 404 | 404 | - |
| `https://trust.okta.com/` | 200 | 200 | - |
| `https://status.okta.com/` | 200 | 200 | - |
| `https://developer.okta.com/` | 200 | 200 | - |
| `https://developer.okta.com/signup/` | 200 | 200 | - |
| `https://login.okta.com/` | 200 | 200 | - |
| `https://security.okta.com/` | 200 | 200 | - |
| `https://auth0.com/` | 200 | 200 | - |
| `https://auth0.com/docs` | 200 | 200 | - |
| `https://auth0.com/signup` | 200 | 200 | - |
| `https://auth0.com/login` | 404 | 404 | - |
| `https://auth0.com/u/login` | 404 | 404 | - |
| `https://manage.auth0.com/` | 302 | 302 | https://auth0.auth0.com/authorize?scope=openid%20profile%20email&max_age=43200&nonce=4e18f4b8fc80948309765e2b568a7… |
| `https://bugcrowd.com/h/engagements/okta` | 200 | 200 | - |
| `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | 200 | - |

## Notes
- Product bug-bounty path often 404; BC engagement is SSoT.
- manage.auth0 → authorize expected; no OIDC state from curl durable.
- Set5 MFA/password not probed this tick.
