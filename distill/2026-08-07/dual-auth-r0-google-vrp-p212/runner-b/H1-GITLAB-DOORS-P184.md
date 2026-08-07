# H1-GITLAB-DOORS-P184
UTC: 2026-08-07T20:36:12Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## HackerOne platform

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/` | 302 | → www |
| `GET` | `https://hackerone.com/users/sign_in` | 403 | curl blocked; browser |
| `GET` | `https://hackerone.com/users/sign_up` | 403 | curl blocked |
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | OIDC |
| `GET` | `https://api.hackerone.com/` | 200 | bare |
| `GET` | `https://api.hackerone.com/v1/hackers/me` | 401 | unauth |
| `GET` | `https://api.hackerone.com/docs` | 404 | not public root |
| `GET` | `https://hackerone.com/gitlab` | 200 | program SPA SSoT |
| `GET` | `https://hackerone.com/security` | 200 | security page |

## GitLab product + OAuth

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://gitlab.com/` | 301 | apex hop |
| `GET` | `https://gitlab.com/users/sign_in` | 403 | curl blocked |
| `GET` | `https://gitlab.com/users/sign_up` | 200 | signup shell |
| `GET` | `https://gitlab.com/.well-known/openid-configuration` | 200 | OIDC |
| `GET` | `https://gitlab.com/oauth/authorize` | 302 | → sign_in |
| `GET` | `https://gitlab.com/oauth/token` | 302 | bare hop |
| `GET` | `https://gitlab.com/api/v4/user` | 401 | unauth |
| `GET` | `https://gitlab.com/api/v4/version` | 401 | unauth |
| `GET` | `https://about.gitlab.com/` | 200 | marketing |
| `GET` | `https://about.gitlab.com/security/vulnerability-management/` | 404 | path churn |
| `GET` | `https://bugcrowd.com/engagements/gitlab` | 404 | not BC |
| `GET` | `https://bugcrowd.com/gitlab` | 404 | not BC short |

## Summary
GitLab bounty SSoT **H1 /gitlab** (SPA **200**). H1/GitLab sign_in curl **403**; OIDC **200**. GitLab API user/version **401**. BC **404**.

## Auth readiness (runner-b H2)
- Browser required for H1 and GitLab sign_in.
- API tokens for hacker API + gitlab /user.

## Deltas vs P176
- about.gitlab.com/security/vulnerability-management/ **404** this tick (path churn).
- oauth/token bare **302** noted.
- Core H1 gitlab 200 / BC 404 / OIDC / API matrix **stable**.
