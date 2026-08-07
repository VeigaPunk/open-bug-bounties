# GitLab product + H1-adjacent auth doors (passive GET only)

UTC: 2026-08-07T14:57:17Z
Policy: unauthenticated HEAD/GET status + Location only. No login POST, no token spray, no exploit.

| URL | code | final/location notes |
|-----|------|----------------------|
| `https://gitlab.com/` | 301 (follow→200) | https://about.gitlab.com/ |
| `https://gitlab.com/users/sign_in` | 403 (follow→403) | - |
| `https://gitlab.com/users/sign_up` | 200 (follow→200) | - |
| `https://gitlab.com/oauth/authorize` | 302 (follow→403) | https://gitlab.com/users/sign_in |
| `https://gitlab.com/oauth/token` | 302 (follow→403) | https://gitlab.com/users/sign_in |
| `https://gitlab.com/oauth/discovery/keys` | 200 (follow→200) | - |
| `https://gitlab.com/.well-known/openid-configuration` | 200 (follow→200) | - |
| `https://gitlab.com/api/v4/user` | 401 (follow→401) | - |
| `https://gitlab.com/api/v4/version` | 401 (follow→401) | - |
| `https://gitlab.com/api/v4/projects?per_page=1` | 200 (follow→200) | - |
| `https://about.gitlab.com/security/` | 200 (follow→200) | - |
| `https://about.gitlab.com/security/disclosure/` | 200 (follow→200) | - |
| `https://hackerone.com/gitlab` | 200 (follow→200) | - |
| `https://hackerone.com/gitlab?type=team` | 200 (follow→200) | - |
| `https://gitlab.com/-/user_settings/personal_access_tokens` | 302 (follow→403) | https://gitlab.com/users/sign_in |
| `https://gitlab.com/explore` | 200 (follow→200) | - |
| `https://docs.gitlab.com/ee/security/` | 301 (follow→200) | /security/ |
| `https://docs.gitlab.com/ee/api/oauth2.html` | 301 (follow→200) | /ee/api/oauth2/;/api/oauth2/ |

## Notes
- /api/v4/user unauth expected 401; version/projects may be 200 public.
- oauth/authorize without client_id expected 400/422 or redirect error page.
- H1 gitlab program page: public policy surface only.
- No credentials, no customer-tenant, no mutation.
