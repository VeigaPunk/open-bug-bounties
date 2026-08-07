# OKTA-PRODUCT-DOORS-P134
UTC: 2026-08-07T18:53:10Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://www.okta.com/` | 200 | marketing |
| `GET` | `https://okta.com/` | 301 | www.okta.com |
| `GET` | `https://www.okta.com/bug-bounty` | 404 | no first-party BB |
| `GET` | `https://www.okta.com/trust` | 301 | trust.okta.com |
| `GET` | `https://trust.okta.com/` | 200 | - |
| `GET` | `https://status.okta.com/` | 200 | - |
| `GET` | `https://security.okta.com/` | 200 | - |
| `GET` | `https://developer.okta.com/` | 200 | - |
| `GET` | `https://developer.okta.com/signup/` | 200 | - |
| `GET` | `https://developer.okta.com/docs/guides/` | 200 | - |
| `GET` | `https://login.okta.com/` | 200 | product login shell |
| `GET` | `https://login.okta.com/.well-known/openid-configuration` | 200 | OIDC SSoT |
| `GET` | `https://www.okta.com/.well-known/openid-configuration` | 404 | marketing not OIDC |
| `GET` | `https://help.okta.com/` | 200 | - |
| `GET` | `https://support.okta.com/` | 301 | /help/ |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | BC SSoT |
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | BC SSoT |
| `GET` | `https://bugcrowd.com/h/engagements/okta` | 200 | soft |
| `GET` | `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | soft |
| `GET` | `https://bugcrowd.com/programs/okta` | 404 | retired path |
| `GET` | `https://tracker.bugcrowd.com/okta` | 302 | tracker sign_in |
| `GET` | `https://integrator-4329175.oktapreview.com/` | 200 | Set5 org shell |
| `GET` | `https://integrator-4329175.oktapreview.com/.well-known/openid-configuration` | 403 | still gated (P120 was 200) |
| `GET` | `https://integrator-4329175-admin.oktapreview.com/` | 302 | /admin/sso/oidc-entry |
| `GET` | `https://integrator-4329175-admin.oktapreview.com/admin/sso/oidc-entry` | 400 | bare entry |
| `GET` | `https://integrator-4329175.oktapreview.com/api/v1/users/me` | 403 | unauth |

## Summary
Okta product + BC + Set5 preview passive refresh for runner-a (P134).
- BB via **BC okta + auth0-okta** (not first-party bug-bounty).
- login.okta OIDC **200**; www well-known **404**.
- Set5 org **200**; discovery still **403**; admin → oidc-entry; users/me **403**.
- login.hackers OIDC still **ERR** (cross-check).

## Auth readiness
BC researcher session for Okta/Auth0 programs; free Okta dev tenant human; Set5 OIDC discovery remains 403.
