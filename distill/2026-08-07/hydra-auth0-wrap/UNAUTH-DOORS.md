# UNAUTH-DOORS — Auth0 CIC (passive HTTP only)

**UTC:** 2026-08-07T22:34:42Z  
**Policy:** single `curl` GET, max-redirs 0, no auth abuse, no exploit, no scanners.  
**UA:** `xbgst-passive-recon/1.0`

## CIC researcher surface

| Method | URL | First-hop code | Location / notes |
|--------|-----|----------------|------------------|
| GET | `https://manage.cic-bug-bounty.auth0app.com/` | **302** | → `/login` |
| GET | `https://manage.cic-bug-bounty.auth0app.com/login` | **302** | → `https://config.cic-bug-bounty.auth0app.com/authorize?...` (OIDC code + PKCE S256, client_id present) |
| GET | `https://manage.cic-bug-bounty.auth0app.com/callback` | **302** | → config authorize (failureRedirect=/login) |
| GET | `https://config.cic-bug-bounty.auth0app.com/` | **302** | → `https://cic-bug-bounty.auth0app.com/` |
| GET | `https://config.cic-bug-bounty.auth0app.com/v2/` | **404** | |
| GET | `https://config.cic-bug-bounty.auth0app.com/.well-known/openid-configuration` | **200** | OIDC discovery JSON |
| GET | bare `https://cic-bug-bounty.auth0app.com/` | **000** | DNS/connect fail (historical pulse; not a manage entry) |

## Adjacent CIC / brand OIDC (context; prod manage is OOS)

| Method | URL | First-hop code | Notes |
|--------|-----|----------------|-------|
| GET | `https://cic.auth0.com/.well-known/openid-configuration` | **200** | OIDC JSON |
| GET | `https://manage.cic.auth0.com/` | **000** | DNS/connect fail (prior pulse) |

## FGA

| Method | URL | First-hop code | Notes |
|--------|-----|----------------|-------|
| GET | `https://dashboard.fga.dev/` | **302** | → `auth.fga.dev/authorize` (PKCE) |
| GET | `https://auth.fga.dev/.well-known/openid-configuration` | **200** | |
| GET | `https://api.us1.fga.dev/` | **401** | unauth |
| GET | `https://api.us1.fga.dev/stores` | **401** | unauth |
| GET | `https://play.fga.dev/` | **200** | |
| GET | `https://customers.us1.fga.dev/` | **404** | root path |
| GET | `https://customers.fga.dev/` | **404** | wrong host form |

## Marketplace + Tier 2

| Method | URL | First-hop code | Notes |
|--------|-----|----------------|-------|
| GET | `https://marketplace.auth0.com/` | **200** | |
| GET | `https://auth0.com/` | **200** | |
| GET | `https://developer.auth0.com/` | **200** | |
| GET | `https://cdn.auth0.com/` | **200** | |
| GET | `https://jwt.io/` | **307** | → www.jwt.io **200** |
| GET | `https://openidconnect.net/` | **307** | → www **200** |
| GET | `https://webauthn.me/` | **307** | → www **200** |
| GET | `https://samltool.io/` | **307** | → www **200** |
| GET | `https://auth0.net/` | **000** | DNS/connect fail this tick |

## Bugcrowd SSoT

| Method | URL | First-hop code | Notes |
|--------|-----|----------------|-------|
| GET | `https://bugcrowd.com/engagements/auth0-okta` | **200** | program brief |
| GET | `https://bugcrowd.com/h/engagements/auth0-okta` | **200** | /h shell |

## Door graph (CIC manage)

```
manage.cic-bug-bounty.auth0app.com/
  --302--> /login
  --302--> config.cic-bug-bounty.auth0app.com/authorize
             (openid profile email, response_type=code, S256 PKCE)
  --callback--> re-authorize if session missing
config.cic-bug-bounty.auth0app.com/.well-known/openid-configuration → 200
```

## Summary

- CIC manage is **login-gated**; unauth yields **302 → config authorize** (PKCE class), not an open dashboard.
- Config OIDC discovery **200** — issuer healthy for researcher UL.
- FGA API **401** unauth; dashboard **302** to Auth0-style authorize.
- BC engagement **200** — credentials redeem path is program page, not HTTP brute.

## Stop / forbidden on this matrix

- Following authorize with forged cookies or token replay
- Hitting `manage.auth0.com` as CIC substitute
- Automated scanners or multi-rps fuzz of authorize
