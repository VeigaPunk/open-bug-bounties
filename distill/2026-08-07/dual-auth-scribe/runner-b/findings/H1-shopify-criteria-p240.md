# H1 Shopify criteria pack (P240)

**Scope tag:** PARTIAL (public criteria + domain table; full H1 asset export needs login)  
**Sources:** TinyFish `https://www.shopify.com/bugbounty/criteria`, `https://hackerone.com/shopify`; sekhmet `sp-rb-p240-h1-shopify` ok.  
**Vault title:** HackerOne (labels: username, user[password], notesPlain) — refs only.

## Eligibility (auth-critical)

- Test only stores created with `YOURHANDLE@wearehackerone.com`.
- Do not interact with stores you did not create.
- Auth & ATO listed In Scope (Non-Core on public criteria table); Core includes `accounts.shopify.com`, `admin.shopify.com`, `partners.shopify.com`, `your-store.myshopify.com`.
- Public bugbounty page: elevated multipliers called out for auth bypass, MFA, OAuth/SSO/SAML, session, ATO (verify live page).

## Explicit OOS / N/A (select)

- Storefront XSS by staff on own store; many CSRF (cart, login/logout alone); CDN arbitrary upload/XSS; GraphQL introspection intentional; password complexity; DDoS; open redirect alone; contact Shopify Support about bounty (ban risk).
- Third-party apps → developer first; Shopify pays only Shopify-developed apps path per criteria.
- `community.shopify.dev`, academy, supplier-portal, livechat, investors, email domains OOS per table.

## Researcher store checklist

1. H1 handle → email `handle@wearehackerone.com`.
2. Create Partners account + development store with that email only.
3. Document staff permission matrix for own store (orders vs Manage Settings).
4. Export H1 policy/scopes while logged in → lift PARTIAL→FULL asset fidelity.

## Next

Browser session: H1 Shopify policy export; create partners bugbounty store; no support contact.
