# SHOPIFY-GITLAB-PATH-REFRESH — PULSE-49 (policy recon only)

**UTC:** 2026-08-07T15:58Z · **Runner B** · **No secrets · GET-only**  
**Axes:** `auth_ready_b` · `shopify_gitlab_paths` · `claims`

## H1 Shopify

| Code | URL | note |
|------|-----|------|
| **200** | hackerone.com/shopify | program shell SSoT for submit |
| **200** | shopify.com/bugbounty · uk/criteria → locale criteria | public criteria |
| **404** | shopify.com/bugbounty/scope | still dead; H1 assets for scope |
| **403** | admin.shopify.com · accounts.shopify.com root | curl blocked |
| **200** | partners.shopify.com | → locale partnerships page |
| **200** | partners…/signup · /organizations | → accounts.shopify.com signup/lookup (**was 403 earlier**) |
| **404** | checkout.shopify.com bare | |
| **200** | shopify.dev · /docs/api | developer docs |

**Auth readiness:** H1 handle + `HANDLE@wearehackerone.com` test stores; partners signup door open this tick; asset table still needs H1 login export.

## H2 GitLab (XOR park)

| Code | URL | note |
|------|-----|------|
| **200** | hackerone.com/gitlab · about.gitlab disclosure | H1 is BB SSoT |
| **403** | gitlab.com/users/sign_in | curl challenge |
| **200** | sign_up · OIDC discovery · oauth keys | |
| **401** | api/v4/user · /version | unauth |
| **200** | api/v4/projects public list | |
| **403** | oauth/authorize → sign_in | |
| **404** | bugcrowd.com/engagements/gitlab | not on BC |

**XOR:** still **PARK H2 / DEEP F4** — no change.

## Claims

- Shopify criteria+H1 200; scope path 404
- partners signup/orgs 200 via accounts (drift from prior 403)
- GitLab sign_in 403; H1 gitlab 200; BC gitlab 404

## Policy

No live exploit · no spray · free-tier human only.
