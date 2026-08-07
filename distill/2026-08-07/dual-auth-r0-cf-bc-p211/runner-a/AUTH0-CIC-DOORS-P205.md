# AUTH0-CIC-DOORS-P205
UTC: 2026-08-07T21:18:15Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Auth0 first-party

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://auth0.com/` | 200 | marketing |
| `GET` | `https://auth0.com/responsible-disclosure` | 404 | path miss (policy via BC) |
| `GET` | `https://auth0.com/security` | 308 | → security.okta.com |
| `GET` | `https://auth0.com/login` | 404 | not apex login |
| `GET` | `https://manage.auth0.com/` | 302 | → manage.auth0.com/login |
| `GET` | `https://auth0.auth0.com/.well-known/openid-configuration` | 200 | tenant OIDC JSON |
| `GET` | `https://login.auth0.com/.well-known/openid-configuration` | 404 | not global login OIDC |
| `GET` | `https://developer.auth0.com/` | 200 | developer |

## CIC bug-bounty tenant

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://manage.cic-bug-bounty.auth0app.com/` | 302 | → /login |
| `GET` | `https://cic-bug-bounty.auth0app.com/` | 000 | DNS fail (wrong host class) |
| `GET` | `https://cic-bug-bounty.auth0.com/` | (see extra) | tenant shell host |

## Bounty surface

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | **BC SSoT** |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | Okta joint |
| `GET` | `https://bugcrowd.com/engagements/auth0` | 404 | short slug miss |
| `GET` | `https://hackerone.com/auth0` | 404 | not H1 |

## Summary
Auth0 BB SSoT **BC auth0-okta** (+ okta). manage **302** login; auth0.auth0 OIDC **200**; login.auth0 well-known **404**. security path **308**→Okta. CIC manage **302**/login; auth0app bare **000**. H1 **404**.

## Auth readiness (runner-a)
- Product: auth0.com signup + manage.auth0 browser (not prod customer abuse).
- CIC: manage.cic-bug-bounty.auth0app.com with program invite; vault Get Creds op:// only.
- Bounty: BC engagements/auth0-okta.

## Deltas vs P195
- `/security` **308** to security.okta.com (was 200 hub).
- manage.cic **302**→login (was 400 bare).
- cic-bug-bounty.auth0app.com **000** DNS; use .auth0.com tenant host.
- Core stable: BC auth0-okta+okta 200, manage 302, OIDC 200, eng/auth0+H1 404.

### Extra probes this tick
- cic-bug-bounty.auth0.com → **302**
- cic-bug-bounty.auth0.com OIDC → **404**
- manage.cic .../login → **302**
- security.okta.com → **200**
- auth0.com/signup → **200**
