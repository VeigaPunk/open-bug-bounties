# H1-GITLAB-DOORS-P152
UTC: 2026-08-07T19:30:58Z
Policy: passive HTTP recon only (no -L for status). No auth abuse. OAuth query scrubbed.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://hackerone.com/` | 302 | → https://www.hackerone.com/ |
| `GET` | `https://hackerone.com/users/sign_in` | 403 | - |
| `GET` | `https://hackerone.com/users/sign_up` | 403 | - |
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | - |
| `GET` | `https://hackerone.com/oauth/authorize` | 302 | → https://hackerone.com/users/sign_in |
| `GET` | `https://api.hackerone.com/` | 200 | - |
| `GET` | `https://api.hackerone.com/v1/me` | 401 | - |
| `GET` | `https://hackerone.com/gitlab` | 200 | - |
| `GET` | `https://hackerone.com/gitlab-ce` | 404 | - |
| `GET` | `https://gitlab.com/` | 301 | → https://about.gitlab.com/ |
| `GET` | `https://gitlab.com/users/sign_in` | 403 | - |
| `GET` | `https://gitlab.com/users/sign_up` | 200 | - |
| `GET` | `https://gitlab.com/.well-known/openid-configuration` | 200 | - |
| `GET` | `https://gitlab.com/oauth/authorize` | 302 | → https://gitlab.com/users/sign_in |
| `GET` | `https://gitlab.com/oauth/discovery/keys` | 200 | - |
| `GET` | `https://gitlab.com/api/v4/user` | 401 | - |
| `GET` | `https://about.gitlab.com/security/vulnerability-management/` | 404 | - |
| `GET` | `https://handbook.gitlab.com/handbook/security/security-assurance/` | 200 | - |
| `GET` | `https://handbook.gitlab.com/handbook/security/product-security/application-security/runbooks/bug-bounty/` | 302 | → https://projects.gitlab.io/auth?… handbook SSO hop |
| `GET` | `https://bugcrowd.com/engagements/gitlab` | 404 | - |
| `GET` | `https://bugcrowd.com/h/gitlab` | 200 | - |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | - |
| `GET` | `https://tracker.bugcrowd.com/gitlab` | 302 | → https://tracker.bugcrowd.com/user/sign_in |
| `GET` | `https://hackerone.com/security` | 200 | - |
| `GET` | `https://www.hackerone.com/.well-known/openid-configuration` | 404 | - |

## Summary
H1+GitLab passive door refresh for runner-b (P152). Program SPA + platform OIDC/OAuth surfaces + GitLab IdP + BC soft map. Policy recon only.

## Auth readiness
- BB SSoT: HackerOne gitlab (+ handbook path if live).
- BC engagements/gitlab often 404; /h soft shell.
- Unauth API me/user expected 401.

## Deltas vs P141
- H1 apex **302→www**; program `/gitlab` **200**; `/gitlab-ce` **404**.
- sign_in/up **403** (curl gate); OIDC **200**; oauth authorize → sign_in; api/me **401**.
- GitLab OIDC+JWKS **200**; sign_in **403**; sign_up **200**; api/v4/user **401**.
- vuln-mgmt about path still **404**; handbook assurance **200**; bug-bounty runbook → projects.gitlab.io auth SSO.
- BC engagements/gitlab **404**; /h soft **200**; identity login **200**.
- www.hackerone.com OIDC **404** (apex host OIDC remains SSoT on hackerone.com).

