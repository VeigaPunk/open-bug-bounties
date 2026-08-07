# AUTH0-CIC-DOORS-P144
UTC: 2026-08-07T19:14:57Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://auth0.com/` | 200 | - |
| `GET` | `https://auth0.com/security` | 308 | → security.okta.com |
| `GET` | `https://auth0.com/responsible-disclosure-policy` | 308 | → bugcrowd.com/auth0-okta |
| `GET` | `https://auth0.com/docs` | 200 | - |
| `GET` | `https://manage.auth0.com/` | 302 | → /login (UL shell hop) |
| `GET` | `https://cdn.auth0.com/` | 200 | - |
| `GET` | `https://config.cic.eu.auth0.com/` | 000 | unreachable this tick |
| `GET` | `https://developer.auth0.com/` | 200 | - |
| `GET` | `https://security.okta.com/` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | BC SSoT |
| `GET` | `https://bugcrowd.com/engagements/auth0` | 404 | bare auth0 |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | - |
| `GET` | `https://bugcrowd.com/engagements/okta-auth0` | 404 | - |
| `GET` | `https://bugcrowd.com/auth0-okta` | 302 | → engagements/auth0-okta |
| `GET` | `https://bugcrowd.com/h/auth0-okta` | 200 | soft shell |
| `GET` | `https://bugcrowd.com/h/auth0` | 200 | soft shell |
| `GET` | `https://bugcrowd.com/programs/auth0` | 404 | programs era gone |
| `GET` | `https://tracker.bugcrowd.com/auth0` | 302 | → user/sign_in |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | BC IdP shell |
| `GET` | `https://login.bugcrowd.com/` | 302 | → tracker sign_in |

## Summary
Auth0+CIC passive door refresh for runner-a (P144). RD policy **308→BC auth0-okta** SSoT; security→security.okta; manage→login hop; CIC config host **000**. BC engagements auth0-okta+okta 200; bare auth0/okta-auth0/programs 404. Tracker/login.bugcrowd → sign_in. Auth readiness: BC join + browser manage UL.

## Deltas vs P138
- config.cic.eu.auth0.com still **000** (no authorize hop observable this tick).
- Core BC auth0-okta SSoT + RD 308 + manage login hop **stable**.
