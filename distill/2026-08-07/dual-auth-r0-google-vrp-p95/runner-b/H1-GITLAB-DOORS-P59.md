# H1 + GitLab auth doors (PULSE-59)

UTC: 2026-08-07T16:18:32Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (max-redirs 0)

| URL | status | location | set-cookie | notes |
|-----|--------|----------|------------|-------|
| `https://hackerone.com` | 302 | https://www.hackerone.com/ | 2 | cookies=2 |
| `https://www.hackerone.com` | 200 | - | 0 |  |
| `https://hackerone.com/users/sign_in` | 403 | - | 0 |  |
| `https://hackerone.com/users/sign_up` | 403 | - | 0 |  |
| `https://hackerone.com/users/password/new` | 200 | - | 2 | cookies=2 |
| `https://hackerone.com/oauth/authorize` | 302 | https://hackerone.com/users/sign_in | 2 | cookies=2 |
| `https://hackerone.com/directory/programs` | 200 | - | 2 | cookies=2 |
| `https://hackerone.com/opportunities/all` | 200 | - | 2 | cookies=2 |
| `https://hackerone.com/shopify` | 200 | - | 2 | cookies=2 |
| `https://hackerone.com/gitlab` | 200 | - | 2 | cookies=2 |
| `https://api.hackerone.com` | 200 | - | 0 |  |
| `https://api.hackerone.com/v1/hackers/me` | 401 | - | 0 |  |
| `https://api.hackerone.com/v1/hackers/programs` | 401 | - | 0 |  |
| `https://docs.hackerone.com` | 302 | https://docs.hackerone.com/en/ | 0 |  |
| `https://gitlab.com` | 301 | https://about.gitlab.com/ | 1 | cookies=1 |
| `https://gitlab.com/users/sign_in` | 403 | - | 0 |  |
| `https://gitlab.com/users/sign_up` | 200 | - | 2 | cookies=2 |
| `https://gitlab.com/oauth/authorize` | 302 | https://gitlab.com/users/sign_in | 1 | cookies=1 |
| `https://gitlab.com/.well-known/openid-configuration` | 200 | - | 0 |  |
| `https://gitlab.com/oauth/discovery/keys` | 200 | - | 0 |  |
| `https://gitlab.com/api/v4/user` | 401 | - | 0 |  |
| `https://gitlab.com/api/v4/version` | 401 | - | 0 |  |
| `https://gitlab.com/api/v4/projects` | 200 | - | 0 |  |
| `https://about.gitlab.com/security` | 301 | https://about.gitlab.com/security/ | 0 |  |
| `https://about.gitlab.com/security/disclosure` | 301 | https://about.gitlab.com/security/disclosure/ | 0 |  |
| `https://bugcrowd.com/engagements/gitlab` | 404 | - | 0 |  |
| `https://bugcrowd.com/h/engagements/gitlab` | 200 | - | 0 |  |

## Notes

- XOR: H2 GitLab park vs F4 Dropbox deep.
- H1 sign_in/up often 403 to curl (browser required).
- No credentials; sessions human-only.

## Delta vs prior
- api/v4/version **401** this tick (sometimes public 200 historically).
- BC **/h/engagements/gitlab 200** while bare engagements/gitlab still **404**.
