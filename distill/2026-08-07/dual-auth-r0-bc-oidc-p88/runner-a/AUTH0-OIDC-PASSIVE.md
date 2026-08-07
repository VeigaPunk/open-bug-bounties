# Auth0 researcher env + dual Okta OIDC discovery (Runner A)

**UTC:** 2026-08-07T14:33:45Z  
**Policy recon only** — no Get Creds expansion; no passwords; no exploit.

## Auth0 cic-bug-bounty manage

| URL | Code | Note |
|-----|------|------|
| manage.cic-bug-bounty.auth0app.com/ | **400** | Host answers; unauth GET not useful |
| …/login | **400** | Same — need BC Get Credentials then browser |
| bugcrowd.com/engagements/auth0-okta | 200 | Engagement + Get Creds modal path |
| developer.auth0.com | 200 | Public docs |
| auth0.com/docs/get-started | 200 | Docs |
| cdn.auth0.com | 200 | CDN |

**Rules recap:** only researcher env; never manage.auth0.com / customer prod; ≤5 rps; vault via op only (`AUTH0-GET-CREDS.md`).

## OIDC discovery (public metadata; no tokens)

| Issuer | openid-configuration | Code |
|--------|----------------------|------|
| https://login.hackers.bugcrowd.com | /.well-known/openid-configuration | 200 |
| https://bugcrowd-pam-5335.oktapreview.com | /.well-known/openid-configuration | 200 |

Public endpoints named in metadata (standard Okta shape): authorization, token, userinfo, jwks_uri, registration.  
**Do not** store state/nonce/client secrets from authorize redirects in distill.

## Separation

| Tenant | Purpose |
|--------|---------|
| login.hackers.bugcrowd.com | Bugcrowd **platform** hacker login (OIDC) |
| bugcrowd-pam-5335.oktapreview.com | Q-BC **Set5 org** engagement Okta |
| manage.cic-bug-bounty.auth0app.com | Auth0 **researcher** tenants only |

## Axes

- evidence_fidelity↑ (OIDC discovery 200 both issuers)
- auth_ready↑ (Auth0 still blocked on human Get Creds)
- safety_in_policy↑ (400 unauth manage host = no open admin)
