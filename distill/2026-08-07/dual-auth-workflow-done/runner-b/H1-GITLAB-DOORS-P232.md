# H1-GITLAB-DOORS-P232
UTC: 2026-08-07T22:13:49Z
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
| `GET` | `https://hackerone.com/users/sign_in` | 403 | curl UA gate |
| `GET` | `https://hackerone.com/users/sign_up` | 403 | curl UA gate |

## GitLab product

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://gitlab.com/` | 200 | `-L` lands marketing class |
| `GET` | `https://about.gitlab.com/` | 200 | marketing |
| `GET` | `https://docs.gitlab.com/` | 200 | docs |
| `GET` | `https://gitlab.com/users/sign_in` | 403 | curl UA class |
| `GET` | `https://gitlab.com/users/sign_up` | 200 | signup shell (curl OK) |
| `GET` | `https://gitlab.com/.well-known/openid-configuration` | 200 | OIDC JSON |
| `GET` | `https://gitlab.com/oauth/authorize` | 403 | `-L` land **403** (was 302→403 @ P222) |
| `GET` | `https://gitlab.com/oauth/token` | 403 | `-L` land **403** (was 302 @ P222) |
| `GET` | `https://gitlab.com/api/v4/user` | 401 | unauth |
| `GET` | `https://gitlab.com/api/v4/version` | 401 | unauth |
| `GET` | `https://gitlab.com/api/v4/projects?per_page=1` | 200 | public list class |
| `GET` | `https://gitlab.com/api/v4/groups?per_page=1` | 200 | public groups class |

## Bugcrowd

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/engagements/gitlab` | 404 | not on BC |
| `GET` | `https://bugcrowd.com/gitlab` | 404 | short miss |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | BC identity live |

## Summary
GitLab BB SSoT **H1 /gitlab** **200**. H1 OIDC+OAuth-AS **200** JSON; API me+programs **401**; H1 sign_in+sign_up curl **403**. GitLab OIDC **200**; sign_in **403**; sign_up **200**; oauth authorize+token `-L` **403** (stricter hop class); api user/version **401**; projects+groups **200**. BC eng **404**; identity **200**.

## Auth readiness (runner-b)
- H1: browser (curl gated on sign_in/sign_up) + API token via op://.
- GitLab: browser OAuth/sign_in (curl 403); sign_up shell open; product not BC.
- Bounty: H1 gitlab program only.

## Deltas vs P222
- gitlab.com/oauth/authorize + oauth/token: `-L` final **403** (P222: 302→403 / 302).
- identity.bugcrowd.com/login **200** row added.
- Core stable: H1 gitlab 200, OIDC/AS 200, api 401, BC 404, projects+groups 200, GL sign_up 200 / sign_in 403.
