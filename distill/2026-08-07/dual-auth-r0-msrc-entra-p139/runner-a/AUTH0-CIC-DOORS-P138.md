# AUTH0-CIC-DOORS-P138
UTC: 2026-08-07T19:01:08Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://manage.cic-bug-bounty.auth0app.com/` | 302 | /login |
| `GET` | `https://manage.cic-bug-bounty.auth0app.com/login` | 302 | config.cic-bug-bounty.auth0app.com/authorize?scope=openid… |
| `GET` | `https://config.cic-bug-bounty.auth0app.com/` | 302 | cic-bug-bounty.auth0app.com/ |
| `GET` | `https://cic-bug-bounty.auth0app.com/` | ERR | bare host unreachable |
| `GET` | `https://cic-bug-bounty.auth0app.com/.well-known/openid-configuration` | ERR | - |
| `GET` | `https://cic-bug-bounty.us.auth0.com/` | 302 | us.auth0.com |
| `GET` | `https://cic-bug-bounty.us.auth0.com/.well-known/openid-configuration` | 404 | no CIC OIDC on us host |
| `GET` | `https://auth0.com/` | 200 | - |
| `GET` | `https://auth0.com/signup` | 200 | - |
| `GET` | `https://auth0.com/login` | 404 | - |
| `GET` | `https://manage.auth0.com/` | 302 | /login |
| `GET` | `https://manage.auth0.com/login` | 302 | auth0.auth0.com/authorize |
| `GET` | `https://auth0.auth0.com/.well-known/openid-configuration` | 200 | product OIDC |
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | BC SSoT |
| `GET` | `https://bugcrowd.com/engagements/auth0` | 404 | - |
| `GET` | `https://bugcrowd.com/auth0-okta` | 302 | /engagements/auth0-okta |
| `GET` | `https://auth0.com/responsible-disclosure-policy` | 308 | bugcrowd.com/auth0-okta |
| `GET` | `https://cdn.auth0.com/` | 200 | - |

## Summary
Auth0 CIC tenant + product + BC SSoT passive refresh for runner-a (P138).
- manage.cic → /login → **config.cic authorize** (stable).
- bare cic-bug-bounty.auth0app.com **ERR**; config bare → bare cic; us.auth0 OIDC **404**.
- Product manage → auth0.auth0.com/authorize; product OIDC **200**; /login **404**.
- BC auth0-okta **200**; engagements/auth0 **404**; RD policy → BC.

## Auth readiness
BC auth0-okta + CIC Get Creds (browser/human). No Set5/CIC secrets in distill.
