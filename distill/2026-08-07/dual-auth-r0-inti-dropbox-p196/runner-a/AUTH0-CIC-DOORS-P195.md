# AUTH0-CIC-DOORS-P195
UTC: 2026-08-07T20:58:25Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Auth0 first-party

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://auth0.com/` | 200 | marketing |
| `GET` | `https://auth0.com/responsible-disclosure` | 404 | path miss (policy via BC) |
| `GET` | `https://auth0.com/security` | 200 | security hub |
| `GET` | `https://auth0.com/signup` | 200 | signup |
| `GET` | `https://auth0.com/login` | 404 | not apex login |
| `GET` | `https://manage.auth0.com/` | 302 | → login/PKCE class |
| `GET` | `https://auth0.auth0.com/.well-known/openid-configuration` | 200 | tenant OIDC |
| `GET` | `https://login.auth0.com/.well-known/openid-configuration` | 404 | not global login OIDC |
| `GET` | `https://developer.auth0.com/` | 200 | developer |
| `GET` | `https://security.okta.com/` | 200 | Okta security (parent) |

## CIC bug-bounty tenant

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://manage.cic-bug-bounty.auth0app.com/` | 400 | manage host needs context |
| `GET` | `https://cic-bug-bounty.auth0.com/` | 200 | tenant shell |

## Bounty surface

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | **BC SSoT** |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | Okta joint |
| `GET` | `https://bugcrowd.com/engagements/auth0` | 404 | short slug miss |
| `GET` | `https://hackerone.com/auth0` | 404 | not H1 |

## Summary
Auth0 BB SSoT **BC auth0-okta** (+ okta). manage **302** PKCE class; auth0.auth0 OIDC **200**; login.auth0 well-known **404**. CIC tenant shell **200**; manage.cic **400**. H1 **404**.

## Auth readiness (runner-a)
- Product: auth0.com signup + manage.auth0 browser.
- CIC: cic-bug-bounty.auth0.com / manage with program invite.
- Bounty: BC engagements/auth0-okta.

## Deltas vs P185
- RD path **404** this tick (was 308→BC earlier); security **200** remains.
- manage.cic **400** (was 302 class); bare cic tenant **200** (was 000 dead).
