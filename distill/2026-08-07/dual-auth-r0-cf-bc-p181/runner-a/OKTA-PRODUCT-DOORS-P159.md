# OKTA-PRODUCT-DOORS-P159
UTC: 2026-08-07T19:44:43Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://www.okta.com/` | 200 | - |
| `GET` | `https://www.okta.com/bug-bounty/` | 404 | - |
| `GET` | `https://www.okta.com/trust/` | 301 | → https://status.okta.com/ |
| `GET` | `https://www.okta.com/trust/security/` | 301 | → https://status.okta.com/ |
| `GET` | `https://security.okta.com/` | 200 | - |
| `GET` | `https://login.okta.com/` | 200 | - |
| `GET` | `https://login.okta.com/.well-known/openid-configuration` | 200 | - |
| `GET` | `https://www.okta.com/.well-known/openid-configuration` | 404 | - |
| `GET` | `https://developer.okta.com/` | 200 | - |
| `GET` | `https://developer.okta.com/signup/` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | - |
| `GET` | `https://bugcrowd.com/h/okta` | 200 | - |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | - |
| `GET` | `https://hackers.bugcrowd.com/.well-known/openid-configuration` | 404 | - |
| `GET` | `https://integrator-1234567.okta.com/.well-known/openid-configuration` | 403 | - |
| `GET` | `https://integrator-1234567.okta.com/oauth2/default/.well-known/openid-configuration` | 401 | - |
| `GET` | `https://integrator-1234567.okta.com/api/v1/users/me` | 403 | - |

## Summary
Okta product + developer + Set5 integrator OIDC probe + BC SSoT (P159 runner-a).

## Auth readiness
- BB SSoT: BC okta + auth0-okta; first-party bug-bounty often 404.
- login.okta OIDC; Set5 integrator host for policy recon only.

## Deltas vs P142
- BC okta+auth0-okta **200** SSoT; first-party bug-bounty **404**; trust paths **301→status.okta**; security.okta **200**.
- login.okta OIDC **200**; www OIDC **404**; developer+signup **200**.
- Set5 org OIDC well-known **403**; oauth2/default well-known **401** (was 403 on P142 for org OIDC); me **403**.
- hackers.bugcrowd OIDC still **404**; identity login **200**.
