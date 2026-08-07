# OKTA-PRODUCT-DOORS-P142
UTC: 2026-08-07T19:11:00Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://www.okta.com/` | 200 | - |
| `GET` | `https://www.okta.com/bug-bounty` | 404 | first-party path gone |
| `GET` | `https://www.okta.com/company/trust` | 404 | - |
| `GET` | `https://www.okta.com/security` | 301 | → trust.okta.com |
| `GET` | `https://trust.okta.com/` | 200 | - |
| `GET` | `https://status.okta.com/` | 200 | - |
| `GET` | `https://security.okta.com/` | 200 | - |
| `GET` | `https://developer.okta.com/` | 200 | - |
| `GET` | `https://developer.okta.com/signup/` | 200 | - |
| `GET` | `https://login.okta.com/` | 200 | - |
| `GET` | `https://login.okta.com/.well-known/openid-configuration` | 200 | OIDC discovery |
| `GET` | `https://www.okta.com/.well-known/openid-configuration` | 404 | - |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | BC SSoT |
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | BC SSoT |
| `GET` | `https://bugcrowd.com/engagements/okta-auth0` | 404 | - |
| `GET` | `https://bugcrowd.com/engagements/auth0` | 404 | bare auth0 |
| `GET` | `https://bugcrowd.com/h/okta` | 200 | soft shell |
| `GET` | `https://bugcrowd.com/h/auth0-okta` | 200 | soft shell |
| `GET` | `https://bugcrowd.com/programs/okta` | 404 | programs→engagements era |
| `GET` | `https://bugcrowd.com/engagements/okta/brief` | 301 | → /h/engagements/okta/brief |
| `GET` | `https://tracker.bugcrowd.com/okta` | 302 | → user/sign_in |
| `GET` | `https://hackers.bugcrowd.com/.well-known/openid-configuration` | 404 | **delta** was 200 P134 |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | BC IdP shell |
| `GET` | `https://okta-customer-admin.oktapreview.com/` | 302 | → /admin/sso/oidc-entry |
| `GET` | `https://okta-customer-admin.oktapreview.com/.well-known/openid-configuration` | 403 | **delta** was 200 earlier |
| `GET` | `https://okta-customer-admin.oktapreview.com/api/v1/users/me` | 403 | unauth |

## Summary
Okta product + BC passive door refresh for runner-a (P142). First-party bug-bounty/trust paths still 404; trust/status/security 200; login.okta OIDC 200; www OIDC 404. BC engagements okta+auth0-okta 200 SSoT; bare auth0/okta-auth0/programs 404. Tracker → sign_in. Set5 apex still OIDC-entry hop; Set5 OIDC discovery now **403** (was 200). hackers.bugcrowd OIDC well-known **404** this tick (was 200).

## Deltas vs P134
- Set5 OIDC well-known: **200 → 403**.
- hackers.bugcrowd.com OIDC: **200 → 404**.
- Core BC okta+auth0-okta + login.okta OIDC **stable**.
