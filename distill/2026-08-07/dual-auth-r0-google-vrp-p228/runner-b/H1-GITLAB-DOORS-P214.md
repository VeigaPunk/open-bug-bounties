# H1-GITLAB-DOORS-P214
UTC: 2026-08-07T21:38:12Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## HackerOne platform

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/gitlab` | 200 | **program SPA SSoT** |
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | OIDC JSON |
| `GET` | `https://hackerone.com/.well-known/oauth-authorization-server` | 200 | OAuth AS JSON |
| `GET` | `https://api.hackerone.com/` | 200 | API root HTML |
| `GET` | `https://api.hackerone.com/docs` | 404 | docs path miss |
| `GET` | `https://api.hackerone.com/v1/me` | 401 | unauth |
| `GET` | `https://api.hackerone.com/v1/hackers/programs` | 401 | unauth |

## GitLab product

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://gitlab.com/` | 301→200 | → about.gitlab.com |
| `GET` | `https://about.gitlab.com/` | 200 | marketing |
| `GET` | `https://gitlab.com/users/sign_in` | 403 | curl UA class |
| `GET` | `https://gitlab.com/users/sign_up` | 200 | signup shell (curl OK this tick) |
| `GET` | `https://gitlab.com/.well-known/openid-configuration` | 200 | OIDC JSON |
| `GET` | `https://gitlab.com/oauth/authorize` | 302→403 | → sign_in (no client_id) |
| `GET` | `https://gitlab.com/api/v4/user` | 401 | unauth |
| `GET` | `https://gitlab.com/api/v4/version` | 401 | unauth |
| `GET` | `https://gitlab.com/api/v4/projects?per_page=1` | 200 | public list class |

## Bugcrowd

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/engagements/gitlab` | 404 | not on BC |
| `GET` | `https://bugcrowd.com/gitlab` | 404 | short miss |

## Summary
GitLab BB SSoT **H1 /gitlab**. H1 OIDC+OAuth-AS **200**; API me+programs **401**. GitLab OIDC **200**; apex **301** about; sign_in curl **403**; sign_up **200**; oauth authorize **302**→403; api user/version **401**; projects **200**. BC **404**.

## Auth readiness (runner-b)
- H1: browser + API token via op://.
- GitLab: browser OAuth/sign_in (curl 403 class); product not BC.
- Bounty: H1 gitlab program only.

## Deltas vs P204
- `users/sign_up` **200** this tick (was often 403 curl class with sign_in).
- oauth/authorize follow lands **403** (sign_in UA gate).
- Core stable: H1 gitlab 200, OIDC/AS 200, api 401, BC 404, projects 200, apex 301.
