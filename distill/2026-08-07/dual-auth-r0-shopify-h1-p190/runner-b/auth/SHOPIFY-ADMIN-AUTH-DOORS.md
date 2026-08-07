# Shopify admin/partners + H1 bounty doors — passive (Runner B)

**UTC:** 2026-08-07T14:53:42Z  
**Policy recon only** — no store create, no partner org, no exploit. Submit via H1 only.

## Live status this tick

| URL | Code | Role |
|-----|------|------|
| https://www.shopify.com/bugbounty | 200 | Public program home |
| https://www.shopify.com/bugbounty/criteria | 200 | Eligibility criteria |
| https://www.shopify.com/bugbounty/scope | **404** | No public scope (use H1 export) |
| https://hackerone.com/shopify | 200 | **Submit SSoT** SPA |
| https://hackerone.com/shopify?type=team | 200 | Team view shell |
| https://admin.shopify.com | **403** | Admin curl/bot wall |
| https://accounts.shopify.com | **403** | Accounts root bot wall |
| https://accounts.shopify.com/store-login | 200 | Store-login shell |
| https://partners.shopify.com | 200 | Partners home |
| https://partners.shopify.com/signup | **403** | Signup bot wall unauth curl |
| https://partners.shopify.com/organizations | **403** | Orgs needs session/browser |
| https://shopify.dev | 200 | Developer docs |
| https://shopify.dev/docs/api | 200 | API docs |
| https://help.shopify.com | **403** | Help bot wall |
| https://apps.shopify.com | 200 | App store |
| https://community.shopify.com | 200 | Community |
| https://www.shopify.com/plus | 200 | Plus marketing |
| https://checkout.shopify.com | **404** | Bare checkout host |

## Auth-ready implications

1. **Scope fidelity PARTIAL** until H1 logged-in asset export (browser; H1 sign_in also curl-403 prior).
2. Admin/partners/help often **403 to curl** — re-auth and store setup only in browser / pre-authed profile.
3. Partners home **200** but signup/orgs **403** unauth curl — not an outage signal.
4. Own test stores only; use `HANDLE@wearehackerone.com` per criteria; no Support tickets for bounty.
5. First hunt class after export: staff/role authz + API on **own** stores.

## Related

- `H1-SHOPIFY-PASSIVE.md`, `INTI-SHOPIFY-AUTH-DOORS.md`, `H1-GOOGLE-AUTH-DOORS.md`
- `findings/H1-EXPORT-STEPS.md`, `findings/H1-shopify-criteria.md`

## Axes

- auth_ready_b↑ (admin/partners 403 vs store-login 200)
- evidence_fidelity↑ (checkout 404, scope 404)
- safety_in_policy↑
