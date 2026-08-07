# Shopify + H1 OAuth doors (PULSE-111)

UTC: 2026-08-07T18:07:32Z
Policy: recon only — no auth, no exploit, no token harvest.
Note: OAuth `client_id` is public app id; do not store rid/verify query values.

## Passive HEAD/GET (max-redirs 0)

| Method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://hackerone.com/shopify` | 200 | `-` |
| `GET` | `https://hackerone.com/shopify` | 200 | `-` |
| `HEAD` | `https://hackerone.com/shopify?type=team` | 200 | `-` |
| `GET` | `https://hackerone.com/shopify?type=team` | 200 | `-` |
| `HEAD` | `https://hackerone.com/directory/programs` | 200 | `-` |
| `GET` | `https://hackerone.com/directory/programs` | 200 | `-` |
| `HEAD` | `https://hackerone.com/users/sign_in` | 403 | `-` |
| `GET` | `https://hackerone.com/users/sign_in` | 403 | `-` |
| `HEAD` | `https://hackerone.com/oauth/authorize` | 302 | `→ /users/sign_in` |
| `GET` | `https://hackerone.com/oauth/authorize` | 302 | `→ /users/sign_in` |
| `HEAD` | `https://hackerone.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://api.hackerone.com` | 200 | `-` |
| `GET` | `https://api.hackerone.com` | 200 | `-` |
| `HEAD` | `https://api.hackerone.com/v1/hackers/me` | 401 | `-` |
| `GET` | `https://api.hackerone.com/v1/hackers/me` | 401 | `-` |
| `HEAD` | `https://api.hackerone.com/v1/me` | 401 | `-` |
| `GET` | `https://api.hackerone.com/v1/me` | 401 | `-` |
| `HEAD` | `https://accounts.shopify.com` | 403 | `-` |
| `GET` | `https://accounts.shopify.com` | 403 | `-` |
| `HEAD` | `https://accounts.shopify.com/lookup` | 403 | `-` |
| `GET` | `https://accounts.shopify.com/lookup` | 403 | `-` |
| `HEAD` | `https://accounts.shopify.com/signup` | 403 | `-` |
| `GET` | `https://accounts.shopify.com/signup` | 403 | `-` |
| `HEAD` | `https://accounts.shopify.com/login` | 403 | `-` |
| `GET` | `https://accounts.shopify.com/login` | 403 | `-` |
| `HEAD` | `https://admin.shopify.com` | 403 | `-` |
| `GET` | `https://admin.shopify.com` | 403 | `-` |
| `HEAD` | `https://admin.shopify.com/store` | 403 | `-` |
| `GET` | `https://admin.shopify.com/store` | 403 | `-` |
| `HEAD` | `https://partners.shopify.com` | 301 | `→ www.shopify.com/partners` |
| `GET` | `https://partners.shopify.com` | 301 | `→ www.shopify.com/partners` |
| `HEAD` | `https://partners.shopify.com/organizations` | 302 | `→ accounts…/oauth/authorize (partners client)` |
| `GET` | `https://partners.shopify.com/organizations` | 302 | `→ accounts…/oauth/authorize` |
| `HEAD` | `https://partners.shopify.com/signup` | 302 | `→ oauth/authorize` |
| `GET` | `https://partners.shopify.com/signup` | 302 | `→ oauth/authorize` |
| `HEAD` | `https://partners.shopify.com/signup/bugbounty` | 301 | `→ /signup/create-organization/bugbounty` |
| `GET` | `https://partners.shopify.com/signup/bugbounty` | 301 | `→ /signup/create-organization/bugbounty` |
| `HEAD` | `https://www.shopify.com/bugbounty` | 200 | `-` |
| `GET` | `https://www.shopify.com/bugbounty` | 302 | `→ locale /br/bugbounty` |
| `HEAD` | `https://www.shopify.com/partners` | 200 | `-` |
| `GET` | `https://www.shopify.com/partners` | 200 | `-` |
| `HEAD` | `https://shopify.dev/docs/api/admin-rest` | 200 | `-` |
| `GET` | `https://shopify.dev/docs/api/admin-rest` | 200 | `-` |
| `HEAD` | `https://identity.shopify.com` | 404 | `-` |
| `GET` | `https://identity.shopify.com` | 404 | `-` |
| `HEAD` | `https://app.shopify.com` | 301 | `→ apps.shopify.com` |
| `GET` | `https://app.shopify.com` | 301 | `→ apps.shopify.com` |
| `HEAD` | `https://bugcrowd.com/engagements/shopify` | 404 | `-` |
| `GET` | `https://bugcrowd.com/engagements/shopify` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/shopify` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/shopify` | 200 | `-` |
| `HEAD` | `https://www.shopify.com/security` | 302 | `→ locale /br/security` |
| `GET` | `https://www.shopify.com/security` | 200 | `-` |

## Auth chain (passive)

1. H1 program shell shopify **200**; directory **200**; sign_in curl **403**; oauth/authorize → sign_in **302**.
2. H1 OIDC well-known **200**; API root **200**; `/v1/me` + `/v1/hackers/me` **401**.
3. accounts.shopify + admin root/store **403** to this UA (curl bot gate regression vs P61 **200**).
4. partners orgs/signup still OAuth bounce **302** (public client_id visible); bugbounty signup path **301** → create-organization.
5. Public FP: www bugbounty/partners/security **200**/geo; shopify.dev docs **200**; identity host **404**.
6. BC bare engagements/shopify **404**; **/h/engagements/shopify 200** SSoT.

## Delta vs P61

- **Regression (curl surface):** accounts.shopify.com and admin.shopify.com moved **200 → 403** under dual-auth-pulse UA; partners OAuth redirects still open.
- H1 SPA/API/OIDC map stable vs P109 adjacency.
- BC /h soft-200 pattern stable.

## Notes

- H1 session + Shopify dev store still human; no secrets in distill.
- Partners `client_id` is public app id only.

## Auth readiness

- H1 Shopify program door mapped; asset fidelity still needs logged-in export.
- Shopify identity curl-gated; partners OAuth entry still observable.

## Next (human / gated)

- Browser H1 session + asset export; partners/store only with `HANDLE@wearehackerone.com`.
