# H1-GITLAB-DOORS-P194
UTC: 2026-08-07T20:56:29Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## HackerOne platform

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/` | 200 | apex |
| `GET` | `https://hackerone.com/users/sign_in` | 403 | curl UA class |
| `GET` | `https://hackerone.com/users/sign_up` | 403 | curl UA class |
| `GET` | `https://hackerone.com/users/password/new` | 200 | password reset shell |
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | OIDC |
| `GET` | `https://hackerone.com/.well-known/oauth-authorization-server` | 200 | OAuth AS |
| `GET` | `https://hackerone.com/gitlab` | 200 | **program SPA SSoT** |
| `GET` | `https://hackerone.com/gitlab-ce` | 404 | alt slug miss |
| `GET` | `https://hackerone.com/directory` | 200 | directory |
| `GET` | `https://hackerone.com/opportunities` | 200 | opportunities |
| `GET` | `https://api.hackerone.com/` | 200 | API root |
| `GET` | `https://api.hackerone.com/docs` | 404 | docs path miss |
| `GET` | `https://api.hackerone.com/v1/hackers/me` | 401 | unauth |
| `GET` | `https://api.hackerone.com/v1/hackers/programs` | 401 | unauth |

## GitLab product

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://gitlab.com/` | 200 | apex |
| `GET` | `https://gitlab.com/users/sign_in` | 403 | curl UA class |
| `GET` | `https://gitlab.com/.well-known/openid-configuration` | 200 | OIDC |
| `GET` | `https://gitlab.com/oauth/authorize` | 403 | needs client_id class |
| `GET` | `https://gitlab.com/api/v4/user` | 401 | unauth |
| `GET` | `https://gitlab.com/api/v4/version` | 401 | unauth |
| `GET` | `https://gitlab.com/api/v4/projects` | 200 | public list class |

## Bugcrowd

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/engagements/gitlab` | 404 | not on BC |
| `GET` | `https://bugcrowd.com/gitlab` | 404 | short miss |

## Summary
GitLab BB SSoT **H1 /gitlab**. H1 OIDC+OAuth-AS **200**; sign_in/up curl **403**. API me/programs **401**. GitLab OIDC **200**; api user/version **401**; projects **200**. BC **404**.

## Auth readiness (runner-b)
- H1: browser sign_in (curl 403) + API token via op://.
- GitLab: browser OAuth; product not BC.
- Bounty: H1 gitlab program only.

## Deltas vs P184
- Matrix **stable**: H1 gitlab SPA 200, OIDC/AS 200, sign_in 403, api 401, BC 404.
- oauth/authorize **403** this tick (was hop→sign_in class).
