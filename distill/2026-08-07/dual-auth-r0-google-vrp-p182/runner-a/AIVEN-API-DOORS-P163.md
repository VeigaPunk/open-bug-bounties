# AIVEN-API-DOORS-P163
UTC: 2026-08-07T19:53:14Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Console + product

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://console.aiven.io/` | 200 | shell |
| `GET` | `https://console.aiven.io/login` | 200 | login |
| `GET` | `https://console.aiven.io/signup` | 200 | signup |
| `GET` | `https://console.aiven.io/.well-known/openid-configuration` | 200 | OIDC discovery |
| `GET` | `https://aiven.io/` | 200 | marketing |
| `GET` | `https://aiven.io/security` | 404 | |
| `GET` | `https://aiven.io/bug-bounty` | 404 | BB not first-party path |
| `GET` | `https://docs.aiven.io/` | 301 | → aiven.io/ |
| `GET` | docs create_authentication_token | 301 | → aiven.io/docs/... (docs host hop) |
| `GET` | `https://identity.aiven.io/` | 000 | dead this tick |
| `GET` | `https://auth.aiven.io/` | 000 | dead this tick |

## API

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://api.aiven.io/` | 301 | → api.aiven.io/doc/ |
| `GET` | `https://api.aiven.io/v1` | 404 | bare v1 |
| `GET` | `https://api.aiven.io/v1/me` | 401 | "No valid client certificate presented" |
| `GET` | `https://api.aiven.io/v1/project` | 401 | same message |
| `GET` | `https://api.aiven.io/v1/userinfo` | 401 | same class |
| `GET` | `https://api.aiven.io/.well-known/openid-configuration` | 200 | OIDC on API host |

## Bounty platform map

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/engagements/aiven-mbb-og` | 200 | SSoT engagement |
| `GET` | `https://bugcrowd.com/engagements/aiven` | 404 | slug drift |
| `GET` | `https://hackerone.com/aiven` | 404 | not H1 |

## Summary
Console login/signup + dual OIDC (console + api hosts) **200**. API resource paths still **401** unauth with client-cert wording (token/mTLS class). BC SSoT **aiven-mbb-og**; bare aiven eng **404**.

## Auth readiness (runner-a)
- Human free-tier: console.aiven.io signup/login.
- API: token/cert required; public unauth not open.
- Bounty: BC aiven-mbb-og only.

## Deltas vs P153
- console + api **OIDC well-known both 200** (not always recorded prior).
- 401 body still "No valid client certificate presented" for me/project.
- identity/auth.aiven.io **000**; docs host redirects toward aiven.io.
