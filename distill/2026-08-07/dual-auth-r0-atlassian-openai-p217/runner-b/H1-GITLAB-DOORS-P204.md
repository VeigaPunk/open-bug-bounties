# H1-GITLAB-DOORS-P204
UTC: 2026-08-07T21:16:09Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## HackerOne platform

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/gitlab` | 200 | **program SPA SSoT** |
| `GET` | `https://hackerone.com/users/sign_in` | 403 | curl UA class |
| `GET` | `https://hackerone.com/users/sign_up` | 403 | curl UA class |
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | OIDC JSON |
| `GET` | `https://hackerone.com/.well-known/oauth-authorization-server` | 200 | OAuth AS JSON |
| `GET` | `https://api.hackerone.com/` | 200 | API root HTML |
| `GET` | `https://api.hackerone.com/docs` | 404 | docs path miss |
| `GET` | `https://api.hackerone.com/v1/me` | 401 | unauth |
| `GET` | `https://api.hackerone.com/v1/hackers/programs` | 401 | unauth |

## GitLab product

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://gitlab.com/` | 301 | → about.gitlab.com |
| `GET` | `https://gitlab.com/users/sign_in` | 403 | curl UA class |
| `GET` | `https://gitlab.com/.well-known/openid-configuration` | 200 | OIDC JSON |
| `GET` | `https://gitlab.com/oauth/authorize` | 302 | → users/sign_in (no client_id) |
| `GET` | `https://gitlab.com/api/v4/user` | 401 | unauth |
| `GET` | `https://gitlab.com/api/v4/version` | 401 | unauth |
| `GET` | `https://gitlab.com/api/v4/projects` | 200 | public list class |

## Bugcrowd

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://bugcrowd.com/engagements/gitlab` | 404 | not on BC |
| `GET` | `https://bugcrowd.com/gitlab` | 404 | short miss |

## Summary
GitLab BB SSoT **H1 /gitlab**. H1 OIDC+OAuth-AS **200**; sign_in/up curl **403**. API me+programs **401**. GitLab OIDC **200**; apex **301** about; oauth authorize **302**→sign_in; api user/version **401**; projects **200**. BC **404**.

## Auth readiness (runner-b)
- H1: browser sign_in (curl 403) + API token via op://.
- GitLab: browser OAuth; product not BC.
- Bounty: H1 gitlab program only.

## Deltas vs P194
- gitlab.com apex **301** to about.gitlab.com (was 200 app shell class).
- oauth/authorize **302**→sign_in (was 403 bare).
- Core stable: H1 gitlab 200, OIDC/AS 200, sign_in 403, api 401, BC 404, projects 200.
