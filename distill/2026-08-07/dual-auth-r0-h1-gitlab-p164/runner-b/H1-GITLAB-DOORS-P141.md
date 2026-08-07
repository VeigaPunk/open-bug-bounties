# H1-GITLAB-DOORS-P141
UTC: 2026-08-07T19:06:50Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://www.hackerone.com/` | 200 | - |
| `GET` | `https://hackerone.com/users/sign_in` | 403 | curl UA gated |
| `GET` | `https://hackerone.com/users/sign_up` | 403 | curl UA gated |
| `GET` | `https://hackerone.com/users/password/new` | 200 | - |
| `GET` | `https://hackerone.com/gitlab` | 200 | program SPA shell |
| `GET` | `https://hackerone.com/shopify` | 200 | program SPA shell |
| `GET` | `https://hackerone.com/google` | 200 | program SPA shell |
| `GET` | `https://api.hackerone.com/` | 200 | - |
| `GET` | `https://api.hackerone.com/v1/me` | 401 | unauth expected |
| `GET` | `https://api.hackerone.com/v1/hackers/programs` | 401 | unauth expected |
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | OIDC discovery |
| `GET` | `https://hackerone.com/.well-known/oauth-authorization-server` | 200 | OAuth AS meta |
| `GET` | `https://auth.hackerone.com/.well-known/openid-configuration` | 000 | host unreachable |
| `GET` | `https://docs.hackerone.com/` | 302 | → /en/ |
| `GET` | `https://hackerone.com/security` | 200 | - |
| `GET` | `https://gitlab.com/` | 301 | → about.gitlab.com |
| `GET` | `https://gitlab.com/users/sign_in` | 403 | curl UA gated |
| `GET` | `https://gitlab.com/users/sign_up` | 200 | open shell |
| `GET` | `https://gitlab.com/.well-known/openid-configuration` | 200 | OIDC discovery |
| `GET` | `https://gitlab.com/oauth/discovery/keys` | 200 | JWKS |
| `GET` | `https://gitlab.com/api/v4/projects?per_page=1` | 200 | public projects |
| `GET` | `https://gitlab.com/api/v4/user` | 401 | unauth expected |
| `GET` | `https://about.gitlab.com/security/disclosure/` | 200 | - |
| `GET` | `https://about.gitlab.com/security/vulnerability-management/` | 404 | path gone this tick |
| `GET` | `https://handbook.gitlab.com/handbook/marketing/developer-relations/community-programs/bug-bounty/` | 302 | projects.gitlab.io/auth SSO gate |
| `GET` | `https://bugcrowd.com/engagements/gitlab` | 404 | not BC engagement |
| `GET` | `https://bugcrowd.com/h/engagements/gitlab` | 200 | soft 200 shell |
| `GET` | `https://bugcrowd.com/h/gitlab` | 200 | soft 200 shell |
| `GET` | `https://identity.bugcrowd.com/` | 403 | bare |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | login shell |

## Summary
H1+GitLab passive door refresh for runner-b (P141). H1 OIDC + OAuth AS 200; sign_in/sign_up 403 curl; programs SPA 200; API me/programs 401. GitLab OIDC+JWKS 200; sign_in 403; sign_up 200; public API 200 /user 401. Handbook BB path still SSO hop to projects.gitlab.io/auth. about.gitlab vulnerability-management path **404**. BC bare gitlab 404; /h soft 200. identity.bugcrowd login 200 vs apex 403. GitLab BB remains H1 SSoT.

## Deltas vs P131
- about.gitlab.com/security/vulnerability-management/ **404** (new map).
- identity.bugcrowd.com bare **403** vs login **200** (BC IdP door split).
- auth.hackerone.com OIDC still **000/ERR**.
- Core H1 OIDC/OAuth AS + GitLab OIDC/JWKS + handbook SSO hop **stable**.
