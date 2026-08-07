# H1 — Shopify criteria / rewards map

**FIDELITY: PARTIAL** — first-party criteria/rewards public; H1 structured asset SPA needs login export  
**Submit:** https://hackerone.com/shopify  
**FP hub:** https://www.shopify.com/bugbounty · criteria · rewards  
**Get started:** https://www.shopify.com/bugbounty/resources/getting-started-in-our-bug-bounty-program  
**Sekhmet:** sp-rb04-h1-shopify (spark root; model fallback gpt-5.3-codex-spark → gpt-5.6-luna) status=ok

## Submit path

HackerOne program **Shopify** only (do not dual-submit invent first-party). Account status: **H1 authed** (ACCOUNTS.md). Vault: title **HackerOne** in Personal (`op://Personal/HackerOne/username`, `op://Personal/HackerOne/user[password]` — never expand).

## Dev store setup

1. https://partners.shopify.com/signup/bugbounty  
2. Create stores with HackerOne handle email: **`YOURHANDLE@wearehackerone.com`**
3. Test **only stores you created** — never other merchants

## Reward ceiling

- Max **$200,000** Critical (public H1/FP language)
- Score-based calculator + bonuses; staff sensitive-permission escalations & Buyer PII beyond authz are signal

## High-dupe N/A classes (do not file)

Storefront staff XSS on own theme; Theme Editor iframe; CDN by-design; cart CSRF; GraphQL introspection intentional; open redirect alone; third-party apps; DDoS; many permission nits listed on criteria page.

## First 2h (own store only)

1. Confirm H1 policy while logged in (export scope table — lifts PARTIAL→FULL).
2. Partner bugbounty store + staff account hierarchy.
3. Map admin GraphQL/REST object IDs for staff vs collaborator authz (no third-party merchant).
4. Avoid N/A list; document X-Request-ID if rate experiments ever needed (program FAQ).

**Do not** contact Shopify Support about bounty validation.
