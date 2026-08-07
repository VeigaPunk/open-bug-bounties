# BC-PLATFORM-OIDC-P171
UTC: 2026-08-07T20:09:37Z
Policy: passive HTTP recon only (no -L for status). No auth abuse / no exploit.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://bugcrowd.com/` | 301 | → www.bugcrowd.com |
| `GET` | `https://bugcrowd.com/user/sign_in` | 302 | → identity.login (researcher hint → dashboard) |
| `GET` | `https://bugcrowd.com/user/sign_up` | 301 | → login.bugcrowd.com/signin/register |
| `GET` | `https://bugcrowd.com/engagements` | 200 | matrix |
| `GET` | `https://bugcrowd.com/programs` | 301 | → engagements |
| `GET` | `https://bugcrowd.com/oauth/authorize` | 301 | → /h/oauth/authorize |
| `GET` | `https://identity.bugcrowd.com/` | 403 | apex locked |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | IdP login shell |
| `GET` | `https://identity.bugcrowd.com/.well-known/openid-configuration` | 403 | not public on identity |
| `GET` | `https://tracker.bugcrowd.com/` | 302 | → tracker user/sign_in |
| `GET` | `https://tracker.bugcrowd.com/user/sign_in` | 200 | tracker sign_in shell |
| `GET` | `https://login.bugcrowd.com/` | 302 | → tracker user/sign_in |
| `GET` | `https://hackers.bugcrowd.com/` | 200 | hackers portal |
| `GET` | `https://hackers.bugcrowd.com/.well-known/openid-configuration` | 404 | not on hackers apex |
| `GET` | `https://login.hackers.bugcrowd.com/oauth2/default/.well-known/openid-configuration` | 200 | Okta OIDC SSoT |
| `GET` | `https://api.bugcrowd.com/` | 200 | API bare |
| `GET` | `https://docs.bugcrowd.com/` | 200 | docs |
| `GET` | `https://bugcrowd.com/.well-known/openid-configuration` | 404 | not BC apex |
| `GET` | `https://auth.bugcrowd.com/` | 000 | dead host this tick |
| `GET` | `https://bugcrowd.com/engagements/okta` | 200 | |
| `GET` | `https://bugcrowd.com/engagements/auth0-okta` | 200 | |
| `GET` | `https://bugcrowd.com/engagements/atlassian` | 200 | |
| `GET` | `https://bugcrowd.com/engagements/openai` | 200 | |
| `GET` | `https://bugcrowd.com/engagements/aiven-mbb-og` | 200 | |
| `GET` | `https://bugcrowd.com/engagements/aiven` | 404 | use aiven-mbb-og |
| `GET` | `https://bugcrowd.com/engagements/cloudflare` | 404 | CF is H1 |
| `GET` | `https://bugcrowd.com/engagements/shopify` | 404 | Shopify is H1 |
| `GET` | `https://bugcrowd.com/engagements/microsoft` | 404 | MSRC first-party |

## Summary
Bugcrowd platform IdP + dual-auth engagement matrix passive refresh (P171 runner-a). Hacker OIDC remains **login.hackers** Okta default; identity apex/OIDC **403**; auth.bugcrowd **000**.

## Auth readiness (runner-a)
- IdP SSoT: identity.bugcrowd.com/login + login.hackers OIDC.
- Tracker/login.bugcrowd hop to tracker sign_in **200**.
- Engagement matrix: okta, auth0-okta, atlassian, openai, aiven-mbb-og **200**; aiven/cloudflare/shopify/microsoft slugs **404**.

## Deltas vs P155
- sign_up now **301**→login.bugcrowd register (P155 had 200 without hop table).
- oauth/authorize **301**→/h/oauth/authorize (was 200 shell on some prior slices).
- Extended negative matrix: cloudflare/shopify/microsoft **404** (platform split vs H1/MSRC).
- Core IdP+engagement positive set **stable**.
