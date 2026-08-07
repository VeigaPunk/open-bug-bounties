# GitLab H1 + product path recovery (passive GET only)

UTC: 2026-08-07T15:28:50Z
Context: H2 XOR stub; re-verify public shells without scope export.

| URL | code0 | follow→ | notes |
|-----|-------|---------|-------|
| `https://hackerone.com/gitlab` | 200 | 200 | - |
| `https://about.gitlab.com/security/` | 200 | 200 | - |
| `https://about.gitlab.com/security/disclosure/` | 200 | 200 | - |
| `https://gitlab.com/` | 301 | 200 | https://about.gitlab.com/ |
| `https://gitlab.com/users/sign_in` | 403 | 403 | - |
| `https://gitlab.com/users/sign_up` | 200 | 200 | - |
| `https://gitlab.com/.well-known/openid-configuration` | 200 | 200 | - |
| `https://gitlab.com/oauth/discovery/keys` | 200 | 200 | - |
| `https://gitlab.com/oauth/authorize` | 302 | 403 | https://gitlab.com/users/sign_in |
| `https://gitlab.com/api/v4/user` | 401 | 401 | - |
| `https://gitlab.com/api/v4/version` | 401 | 401 | - |
| `https://gitlab.com/api/v4/projects?per_page=1` | 200 | 200 | - |
| `https://bugcrowd.com/engagements/gitlab` | 404 | 404 | - |
| `https://bugcrowd.com/h/engagements/gitlab` | 200 | 200 | - |

## Notes
- H2 remains STUB until H1 scope export; F4 Dropbox XOR preferred deep.
- sign_in often 403 curl; sign_up may 200.
- No credentials, no account create, no spray.
