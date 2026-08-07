# CF-BC-DOORS-P201
UTC: 2026-08-07T21:11:11Z
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
| `GET` | `https://dash.cloudflare.com/sign-up` | 403 | curl UA class stable |
| `GET` | `https://dash.cloudflare.com/.well-known/openid-configuration` | 200 | OIDC JSON issuer dash.cloudflare.com |
| `GET` | `https://dash.cloudflare.com/.well-known/oauth-authorization-server` | 200 | **HTML SPA shell** this tick (not RFC8414 JSON) |
| `GET` | `https://api.cloudflare.com/` | 301 | → developers.cloudflare.com/api/ |
| `GET` | `https://api.cloudflare.com/client/v4/user` | 403 | unauth JSON |
| `GET` | `https://api.cloudflare.com/client/v4/zones` | 403 | unauth JSON |
| `GET` | `https://api.cloudflare.com/client/v4/accounts` | 403 | unauth JSON |

## Bounty surface

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/cloudflare` | 200 | **SSoT H1** |
| `GET` | `https://bugcrowd.com/engagements/cloudflare` | 404 | CF not on BC |

## Bugcrowd platform (adjacent IdP doors)

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/` | 301 | → www.bugcrowd.com |
| `GET` | `https://bugcrowd.com/engagements` | 200 | catalog |
| `GET` | `https://bugcrowd.com/user/sign_in` | 302 | → identity.bugcrowd.com/login researcher hint |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | identity login |
| `GET` | `https://identity.bugcrowd.com/` | 403 | apex gated JSON |
| `GET` | `https://login.bugcrowd.com/` | 302 | → tracker sign_in |
| `GET` | `https://auth.bugcrowd.com/` | 000 | dead/unreachable this tick |
| `GET` | `https://tracker.bugcrowd.com/` | 302 | → tracker sign_in |
| `GET` | `https://docs.bugcrowd.com/` | 200 | docs root |
| `GET` | `https://docs.bugcrowd.com/api/` | 404 | path churn |
| `GET` | `https://api.bugcrowd.com/` | 200 | API shell HTML |
| `GET` | login.hackers OIDC well-known | 000 | unreachable this tick (prior 200) |

## Summary
CF BB **H1 cloudflare** SSoT; first-party `/bug-bounty` **404**. Dash OIDC **200** JSON; OAuth-AS path **200 HTML SPA** (delta vs earlier JSON class). API v4 unauth **403**; api root **301** to developers. BC eng cloudflare **404**. BC identity login **200**; sign_in **302** to identity; auth host **000**.

## Auth readiness (runner-a)
- CF product: dash.cloudflare.com login browser + API token via op:// (not curl durable).
- CF bounty: H1 program cloudflare.
- BC platform: identity.login primary for researcher; login.hackers OIDC flaky 000 this tick.

## Deltas vs P191
- OAuth-AS well-known still HTTP 200 but body is **HTML shell** not JSON metadata (probe carefully).
- api.cloudflare.com bare **301** to developers API docs (not 200 root).
- sign_in **302** to identity (was reported 200 shell earlier).
- login.hackers OIDC **000** this tick (transient / DNS).
- Core SSoT matrix stable: H1 CF, BC eng 404, dash OIDC 200, API 403, docs/api 404.
