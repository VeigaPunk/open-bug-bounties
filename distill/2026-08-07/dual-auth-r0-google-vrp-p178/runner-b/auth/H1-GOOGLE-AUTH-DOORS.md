# HackerOne + Google account auth doors — passive (Runner B)

**UTC:** 2026-08-07T14:41:43Z  
**Policy recon only** — no login, no API token, no exploit.

## HackerOne platform

| URL | Code | Role |
|-----|------|------|
| https://hackerone.com | 200 | Platform home |
| https://hackerone.com/users/sign_in | **403** | Curl/bot blocked (browser login required) |
| https://hackerone.com/users/sign_up | **403** | Same bot wall unauth curl |
| https://hackerone.com/opportunities/all | 200 | Opportunities SPA shell |
| https://hackerone.com/hacktivity | 200 | Public hacktivity shell |
| https://api.hackerone.com | 200 | API root |
| https://api.hackerone.com/v1/hackers/me | **401** | Needs hacker session/token |
| https://api.hackerone.com/docs | **404** | Docs not on api host |
| https://docs.hackerone.com | 200 | Docs SSoT |
| https://hackerone.com/shopify | 200 | Prior H1 Shopify |
| https://hackerone.com/gitlab | 200 | Prior H2 park |

## Google accounts + Bug Hunters

| URL | Code | Role |
|-----|------|------|
| https://accounts.google.com | 200 | Accounts front door |
| https://accounts.google.com/ServiceLogin | 200 | Service login |
| https://myaccount.google.com | 200 | My Account shell |
| https://bughunters.google.com | 200 | Bug Hunters portal |
| https://bughunters.google.com/learn | 200 | Learn hub |
| https://bughunters.google.com/about/rules | 200 | Rules hub shell |
| https://issuetracker.google.com | 200 | Issue Tracker shell |
| https://drive.google.com | 200 | Drive shell (own-ACL hunt later) |
| https://docs.google.com | 200 | Docs shell |

## Auth-ready implications

1. **H1 sign_in/sign_up 403 via curl** is expected WAF/bot control — re-auth only in browser / pre-authed profile (op vault `HackerOne`, no cookie dumps).
2. Hacker API `/v1/hackers/me` **401** unauth confirms token boundary (same class as GitLab program API).
3. Public program shells (Shopify, GitLab, opportunities) stay **200** without session; asset tables still PARTIAL until H1 export.
4. Google VRP path: bughunters + own Drive/Docs shells all **200**; dual-account ACL tests remain **human / own assets only**.

## Related

- `H1-SHOPIFY-PASSIVE.md`, `H2-GITLAB-STUB.md`, `F1-GOOGLE-PASSIVE.md`
- `findings/H1-EXPORT-STEPS.md`

## Axes

- auth_ready_b↑ (H1 bot-wall + API 401)
- evidence_fidelity↑ (403 sign_in vs 200 program SPA)
- safety_in_policy↑
