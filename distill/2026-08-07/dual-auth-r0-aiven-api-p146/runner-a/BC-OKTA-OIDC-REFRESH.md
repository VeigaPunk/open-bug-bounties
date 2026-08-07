# BC-OKTA-OIDC-REFRESH — PULSE-50 (policy recon only)

**UTC:** 2026-08-07T16:00Z · **Runner A** · **No secrets · GET-only**  
**Axes:** `auth_ready_a` · `set5_okta_oidc` · `claims`

## BC hacker OIDC (login.hackers)

| Code | URL | note |
|------|-----|------|
| **200** | login.hackers bare | → oauth2/default/v1/authorize (client `0oa20esd61y2ACBLf1d8`) |
| **200** | /.well-known/openid-configuration | issuer `https://login.hackers.bugcrowd.com` · auth `/oauth2/v1/authorize` |
| **200** | /oauth2/default/.well-known/openid-configuration | issuer `…/oauth2/default` · auth `/oauth2/default/v1/authorize` (**hacker flow uses this**) |
| **200** | /oauth2/default/v1/keys | JWKS |
| **403** | identity.bugcrowd.com bare | |
| **200** | identity.bugcrowd.com/login | |
| **200** | bugcrowd.com/user/sign_in | → default authorize + identity callback |

**Note:** Root discovery and `oauth2/default` discovery differ (issuer path). Live sign-in uses **default** AS.

## Okta product + QBC

| Code | URL | note |
|------|-----|------|
| **200** | developer.okta.com/signup · login.okta.com · trust · status | public shells |
| **404** | okta.com/bug-bounty/ | use BC |
| **200** | engagements/okta · /h/…/okta · /h/…/auth0-okta | BB SSoT |

## Aiven light

| Code | URL | note |
|------|-----|------|
| **200** | console.aiven.io/login · signup | free-tier doors |
| **404** | api.aiven.io/v1 bare | |
| **401** | api.aiven.io/v1/me | token required |

## Claims

- Dual OIDC docs on login.hackers (root vs oauth2/default); hacker uses default
- identity bare 403; /login 200
- Okta BB via BC; product signup 200
- Aiven console 200; API me 401

## Policy

No live exploit · no spray · free-tier human only · no Set5 creds in distill.
