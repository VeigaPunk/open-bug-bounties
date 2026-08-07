# SHOPIFY-H1-OAUTH-P123
UTC: 2026-08-07T18:31:18Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| URL | code | location/notes |
|-----|------|----------------|
| `https://www.shopify.com/bugbounty` | 200 | - |
| `https://www.shopify.com/bug-bounty` | 404 | - |
| `https://shopify.com/bugbounty/scope` | 301 | https://www.shopify.com/bugbounty/scope |
| `https://hackerone.com/shopify` | 200 | - |
| `https://hackerone.com/shopify?type=team` | 200 | - |
| `https://hackerone.com/shopify/policy_scopes` | 200 | - |
| `https://www.hackerone.com/resources/bug-bounty/shopify` | 302 | https://www.hackerone.com/resources |
| `https://accounts.shopify.com/` | 403 | - |
| `https://accounts.shopify.com/store-login` | 403 | - |
| `https://admin.shopify.com/` | 403 | - |
| `https://partners.shopify.com/` | 301 | https://www.shopify.com/partners |
| `https://partners.shopify.com/signup` | 302 | https://accounts.shopify.com/oauth/authorize?client_id=271e16d403dfa18082ffb3d197bd2b5f4479c3fc32736d69296829cbb28d41a6&nonce=084e5daa9f09c7 |
| `https://partners.shopify.com/organizations` | 302 | https://accounts.shopify.com/oauth/authorize?client_id=271e16d403dfa18082ffb3d197bd2b5f4479c3fc32736d69296829cbb28d41a6&nonce=2a7518d79ebae2 |
| `https://checkout.shopify.com/` | 404 | - |
| `https://shopify.dev/` | 301 | https://shopify.dev/docs |
| `https://shopify.dev/docs/api/admin-rest` | 200 | - |
| `https://hackerone.com/users/sign_in` | 403 | - |
| `https://hackerone.com/users/sign_up` | 403 | - |
| `https://hackerone.com/users/password/new` | 200 | - |
| `https://api.hackerone.com/` | 200 | - |
| `https://api.hackerone.com/v1/hackers/me` | 401 | - |
| `https://api.hackerone.com/v1/hackers/programs` | 401 | - |
| `https://hackerone.com/directory/programs` | 200 | - |
| `https://hackerone.com/opportunities/all` | 200 | - |
| `https://hackerone.com/gitlab` | 200 | - |

## Summary
Shopify public BB SSoT vs H1; admin/accounts/partners curl posture; H1 OAuth-adjacent shells refreshed for runner-b.
