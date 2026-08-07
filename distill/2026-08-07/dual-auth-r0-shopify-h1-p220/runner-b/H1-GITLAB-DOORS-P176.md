# H1-GITLAB-DOORS-P176
UTC: 2026-08-07T20:21:02Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## HackerOne platform

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/` | 302 | → www.hackerone.com |
| `GET` | `https://hackerone.com/users/sign_in` | 403 | curl blocked; browser |
| `GET` | `https://hackerone.com/users/sign_up` | 403 | curl blocked |
| `GET` | `https://hackerone.com/users/password/new` | 200 | password reset shell |
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | OIDC |
| `GET` | `https://hackerone.com/.well-known/oauth-authorization-server` | 200 | OAuth AS |
| `GET` | `https://api.hackerone.com/` | 200 | bare |
| `GET` | `https://api.hackerone.com/v1/hackers/me` | 401 | unauth |
| `GET` | `https://api.hackerone.com/v1/hackers/programs` | 401 | unauth |
| `GET` | `https://hackerone.com/directory/programs` | 200 | directory |
| `GET` | `https://hackerone.com/opportunities/all` | 200 | opportunities |
| `GET` | `https://hackerone.com/gitlab` | 200 | program SPA SSoT |
| `GET` | `https://hackerone.com/gitlab-ce` | 404 | slug not used |

## GitLab product + OAuth

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://gitlab.com/users/sign_in` | 403 | curl blocked |
| `GET` | `https://gitlab.com/users/sign_up` | 200 | signup shell |
| `GET` | `https://gitlab.com/.well-known/openid-configuration` | 200 | OIDC |
| `GET` | `https://gitlab.com/oauth/discovery/keys` | 200 | JWKS |
| `GET` | `https://gitlab.com/oauth/authorize` | 302 | → /users/sign_in |
| `GET` | `https://gitlab.com/api/v4/user` | 401 | unauth |
| `GET` | `https://gitlab.com/api/v4/version` | 401 | unauth |
| `GET` | `https://gitlab.com/api/v4/projects?per_page=1` | 200 | public list |
| `GET` | `https://about.gitlab.com/security/` | 200 | |
| `GET` | `https://about.gitlab.com/security/disclosure/` | 200 | disclosure |
| `GET` | `https://handbook.gitlab.com/` | 200 | handbook |
| `GET` | `https://bugcrowd.com/engagements/gitlab` | 404 | not BC |

## Summary
H2 GitLab bounty SSoT **H1 /gitlab** (SPA 200). H1 sign_in/up curl **403**; OIDC+OAuth-AS **200**. GitLab OIDC/JWKS **200**; sign_in **403**; API user/version **401**; public projects **200**. BC eng/gitlab **404**.

## Auth readiness (runner-b H2)
- Browser required for H1 and GitLab sign_in.
- API tokens required for hacker API + gitlab /user.

## Deltas vs P164
- Matrix **stable**: H1 gitlab 200; gitlab-ce 404; BC 404; OIDC/JWKS/API classes unchanged.
