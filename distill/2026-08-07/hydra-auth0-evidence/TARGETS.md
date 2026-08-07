# TARGETS — Auth0 CIC (Bugcrowd auth0-okta)

**Program SSoT:** https://bugcrowd.com/engagements/auth0-okta  
**Lane:** hydra wrap / workflow  
**UTC map:** 2026-08-07  
**Policy:** researcher env only for core product; ≤5 rps Intruder; no scanners/DoS.

## Tier 1 — researcher CIC + first-party (in scope)

| Target | Class | Notes |
|--------|-------|-------|
| `https://manage.cic-bug-bounty.auth0app.com/` | Dashboard | **Primary** researcher management UI |
| `config.cic-bug-bounty.auth0app.com` | IdP / config | UL authorize issuer for manage hop |
| `*.cic-bug-bounty.auth0app.com` | Tenant apps | Researcher tenant hostnames only |
| Auth0 Guardian Android | Mobile MFA | Play Store `com.auth0.guardian` |
| Auth0 Guardian iOS | Mobile MFA | App Store id `1093447833` |
| MFA Integrations | Product | Via CIC tenant config |
| `https://marketplace.auth0.com` | Marketplace | Website |
| `https://dashboard.fga.dev/` | FGA UI | Auth via `auth.fga.dev` |
| `https://api.us1.fga.dev/` | FGA API | Auth required |
| `https://customers.us1.fga.dev/` | FGA API | In-scope per brief |
| `https://play.fga.dev/` | FGA play | Website |

## SDK Targets (source + proper usage only)

| SDK | Repo |
|-----|------|
| auth0.js | github.com/auth0/auth0.js |
| lock | github.com/auth0/lock |
| auth0-spa-js | github.com/auth0/auth0-spa-js |
| Auth0.Net | github.com/auth0/Auth0.Net |
| nextjs-auth0 | github.com/auth0/nextjs-auth0 |
| auth0-java | github.com/auth0/auth0-java |
| react-native-auth0 | github.com/auth0/react-native-auth0 |
| auth0-php | github.com/auth0/auth0-php |

Impact must be Auth0-side with correct SDK use — not insecure app misuse.

## Tier 2

| Host | Notes |
|------|-------|
| auth0.com | Marketing / product surface (not manage.auth0.com) |
| jwt.io | Tooling |
| openidconnect.net | Tooling |
| webauthn.me | Tooling |
| samltool.io | Tooling |
| auth0.net | Website |

## Strict out of scope (do not test)

- `manage.auth0.com`, `auth0.auth0.com`, `accounts.auth0.com`
- support / community / docs-as-target / webtask / sharelock / goextend / passport-ws-fed
- Customer tenants / production customer data
- Customize Login Page XSS class (listed exclusions); pure theoretical issues

## Focus axes

1. Cross-tenant privilege escalation (3 users / 3 tenants matrix)
2. OAuth2 / OIDC / SAML protocol bugs
3. Authn / authz bypass
4. PII exfil with demonstrated impact

## Credential gate

Testing core CIC manage/API requires **Get Credentials** on BC program page → see `CRED-STATE.md`.

## Docs (read-only)

- Auth API: https://auth0.com/docs/api/authentication  
- Mgmt API: https://auth0.com/docs/api/management/v2  
- FGA: https://docs.fga.dev/  
