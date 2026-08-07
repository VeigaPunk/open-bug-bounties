# Auth0 product auth doors (passive GET only)

UTC: 2026-08-07T15:03:04Z
Policy: unauthenticated status + Location only. No login POST, no token spray, no exploit.
Ephemeral OAuth state/nonce and full authorize querystrings not stored (hosts only).

| URL | code0 | follow→ | notes |
|-----|-------|---------|-------|
| `https://auth0.com/` | 200 | 200 | marketing |
| `https://auth0.com/signup` | 200 | 200 | public signup shell |
| `https://auth0.com/login` | 404 | 404 | no bare /login |
| `https://manage.auth0.com/` | 302 | 302 | → /login → auth0.auth0.com/authorize |
| `https://manage.auth0.com/login` | 302 | 302 | → auth0.auth0.com/authorize (dashboard IdP) |
| `https://manage.auth0.com/#/` | 302 | 302 | same authorize bounce |
| `https://auth0.auth0.com/login` | 302 | 400 | → /u/login then 400 without params |
| `https://auth0.auth0.com/u/login` | 400 | 400 | Universal Login needs full authorize context |
| `https://auth0.com/docs` | 200 | 200 | docs |
| `https://auth0.com/docs/secure/security-center` | 200 | 200 | security-center doc |
| `https://auth0.com/security` | 308 | 200 | → security.okta.com |
| `https://auth0.com/responsible-disclosure-policy` | 308 | 200 | → bugcrowd.com/auth0-okta → engagements/auth0-okta |
| `https://auth0.com/docs/.../responsible-disclosure-program-security` | 404 | 404 | old docs path |
| `https://bugcrowd.com/engagements/auth0` | 404 | 404 | wrong slug |
| `https://bugcrowd.com/engagements/okta-auth0` | 404 | 404 | wrong slug |
| `https://cdn.auth0.com/` | 200 | 200 | CDN root |
| `https://auth0.com/api/auth/login` | 302 | 200 | site-login authorize (marketing) |
| `https://auth0.com/blog` | 308 | 200 | /blog/ |
| `https://support.auth0.com/` | 302 | 302 | → auth0.auth0.com/authorize (support) |
| `https://marketplace.auth0.com/` | 200 | 200 | marketplace |

## Bounty SSoT
- Product RD policy redirects to **BC `engagements/auth0-okta`** (not `auth0` / `okta-auth0` slugs — those 404).
- Security marketing consolidates under **security.okta.com**.

## Notes
- No credentials, no free-tenant creation, no mutation.
