# Shopify + H1 OAuth doors (PULSE-61)

UTC: 2026-08-07T16:22:42Z
Policy: recon only — no auth, no exploit, no token harvest.
Note: OAuth `client_id` is public app id; `rid`/`verify` query values from redirects are transient and not stored here.

## Passive GET (max-redirs 0)

| URL | status | location (abbrev) | set-cookie | size | notes |
|-----|--------|-------------------|------------|------|-------|
| `https://hackerone.com/shopify` | 200 | - | 2 | 3482 | program shell |
| `https://hackerone.com/shopify?type=team` | 200 | - | 2 | 3482 | same shell size |
| `https://hackerone.com/directory/programs` | 200 | - | 2 | 1941 | |
| `https://hackerone.com/users/sign_in` | 403 | - | 0 | 5528 | curl blocked |
| `https://hackerone.com/oauth/authorize` | 302 | → /users/sign_in | 2 | 0 | |
| `https://api.hackerone.com/v1/hackers/me` | 401 | - | 0 | 27 | API gate |
| `https://accounts.shopify.com` | 200 | - | 4 | 35575 | identity shell |
| `https://accounts.shopify.com/lookup` | 200 | - | 4 | 50328 | email lookup UX |
| `https://accounts.shopify.com/signup` | 200 | - | 4 | 33462 | |
| `https://accounts.shopify.com/login` | 302 | → /lookup?rid=…&verify=… (redacted) | 3 | 0 | login consolidates to lookup |
| `https://admin.shopify.com` | 200 | - | 2 | 295 | tiny shell |
| `https://admin.shopify.com/store` | 403 | - | 0 | 9297 | store picker gated |
| `https://partners.shopify.com` | 301 | → www.shopify.com/partners | 0 | 0 | |
| `https://partners.shopify.com/organizations` | 302 | → accounts…/oauth/authorize (partners client) | 2 | 0 | OIDC+scopes |
| `https://partners.shopify.com/signup` | 302 | → oauth/authorize + ux=signup | 2 | 0 | |
| `https://www.shopify.com/partners` | 302 | → locale /br/parcerias | 4 | 0 | geo |
| `https://shopify.dev` | 301 | → /docs | 0 | 167 | |
| `https://shopify.dev/docs/api/admin-rest` | 200 | - | 0 | 532287 | public API docs |
| `https://help.shopify.com/en/manual/your-account` | 403 | - | 0 | 9390 | curl blocked |
| `https://identity.shopify.com` | 404 | - | 0 | 13 | retired host |
| `https://app.shopify.com` | 301 | → apps.shopify.com | 1 | 0 | |
| `https://bugcrowd.com/engagements/shopify` | 404 | - | 0 | 1517 | bare 404 |
| `https://bugcrowd.com/h/engagements/shopify` | 200 | - | 0 | 6110 | BC /h SSoT if used |
| `https://www.hackerone.com/bug-bounty-programs` | 200 | - | 0 | ~1MB | marketing list |

## Partners OAuth scope surface (from Location, passive)

- `openid email profile`
- `https://api.shopify.com/auth/shop.create`
- `https://api.shopify.com/auth/organization.apps.manage`
- `https://api.shopify.com/auth/organization.manage`
- `https://api.shopify.com/auth/organization.partner-dashboard-access`
- callback: `partners.shopify.com/identity/callback`

## Delta vs P51/P59

- `accounts.shopify.com` root **200** (older claim said 403 to curl — refreshed).
- `admin.shopify.com` root **200** small shell; `/store` **403**.
- `login` consolidates to **lookup** with rid/verify (session params; not durable).
- partners signup/orgs still OAuth bounce (not 403) this tick.
- BC Shopify: bare engagements 404; **/h/engagements/shopify 200** (parallel to Q-BC /h pattern).

## Auth readiness

- H1 session still human (sign_in 403 curl).
- Shopify own store via `HANDLE@wearehackerone.com` still required for MED→HIGH H1 score.
- No credentials used; no tokens stored.

## Next (human / gated)

- Intentional H1 login + asset export for FULL fidelity.
- Own development store only; never Support path for bounty.
