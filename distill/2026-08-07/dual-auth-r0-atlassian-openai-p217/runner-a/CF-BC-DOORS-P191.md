# CF-BC-DOORS-P191
UTC: 2026-08-07T20:50:30Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Cloudflare product + API

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://www.cloudflare.com/` | 200 | marketing |
| `GET` | `https://www.cloudflare.com/bug-bounty/` | 404 | not first-party BB path |
| `GET` | `https://www.cloudflare.com/disclosure/` | 200 | disclosure hub |
| `GET` | `https://www.cloudflare.com/trust-hub/` | 200 | trust |
| `GET` | `https://developers.cloudflare.com/` | 200 | docs |
| `GET` | `https://dash.cloudflare.com/` | 200 | dash shell |
| `GET` | `https://dash.cloudflare.com/login` | 200 | login shell |
| `GET` | `https://dash.cloudflare.com/sign-up` | 403 | curl UA class this tick (earlier probe 200) |
| `GET` | `https://dash.cloudflare.com/.well-known/openid-configuration` | 200 | OIDC |
| `GET` | `https://dash.cloudflare.com/.well-known/oauth-authorization-server` | 200 | OAuth AS |
| `GET` | `https://api.cloudflare.com/` | 200 | API root |
| `GET` | `https://api.cloudflare.com/client/v4/user` | 403 | unauth |
| `GET` | `https://api.cloudflare.com/client/v4/zones` | 403 | unauth |
| `GET` | `https://api.cloudflare.com/client/v4/accounts` | 403 | unauth |

## Bounty surface

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/cloudflare` | 200 | **SSoT H1** |
| `GET` | `https://bugcrowd.com/engagements/cloudflare` | 404 | CF not on BC |

## Bugcrowd platform (adjacent IdP doors)

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/` + www | 200 | apex |
| `GET` | `https://bugcrowd.com/engagements` + programs | 200 | catalog |
| `GET` | `https://bugcrowd.com/user/sign_in` | 200 | sign_in shell |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | identity login |
| `GET` | `https://identity.bugcrowd.com/` | 403 | apex gated |
| `GET` | `https://login.bugcrowd.com/` | 200 | login host |
| `GET` | `https://auth.bugcrowd.com/` | 000 | dead/unreachable |
| `GET` | `https://tracker.bugcrowd.com/` | 200 | tracker |
| `GET` | `https://docs.bugcrowd.com/` | 200 | docs root |
| `GET` | `https://docs.bugcrowd.com/api/` | 404 | path churn (stable miss) |
| `GET` | login.hackers OIDC well-known | 200 | hacker IdP |

## Summary
CF BB **H1 cloudflare** SSoT; first-party `/bug-bounty` **404**. Dash OIDC+OAuth-AS **200**; API v4 unauth **403**. BC eng cloudflare **404**. BC identity login **200**; auth host **000**.

## Auth readiness (runner-a)
- CF product: dash.cloudflare.com login browser + API token via op:// (not curl durable).
- CF bounty: H1 program cloudflare.
- BC platform: identity.login + login.hackers OIDC (for other eng; not CF).

## Deltas vs P181
- Matrix **stable**: H1 SSoT, BC eng 404, dash OIDC/AS 200, API 403, docs/api 404.
- sign-up path **403** curl this tick (UA/bot class); disclosure+trust still 200.
- auth.bugcrowd.com still **000**.
