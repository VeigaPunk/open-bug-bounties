# Bugcrowd platform OIDC + docs (PULSE-70)

UTC: 2026-08-07T16:40:25Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://bugcrowd.com` | 301 | → www.bugcrowd.com/ | |
| `https://bugcrowd.com/user/sign_in` | 302 | → identity…/login?user_hint=researcher&returnTo=…/dashboard | researcher chain |
| `https://bugcrowd.com/user/sign_up` | 301 | → login.bugcrowd.com/signin/register | |
| `https://bugcrowd.com/engagements` | 200 | - | catalog |
| `https://bugcrowd.com/programs` | 301 | → /engagements | retired alias |
| `https://identity.bugcrowd.com` | 403 | - | bare |
| `https://identity.bugcrowd.com/login` | 200 | - | IdP shell |
| `https://login.hackers.bugcrowd.com` | 302 | → identity…/login/hacker | root bounce |
| `https://login.hackers.bugcrowd.com/.well-known/openid-configuration` | 200 | - | OIDC |
| `https://login.hackers.bugcrowd.com/oauth2/default/.well-known/openid-configuration` | 200 | - | default AS |
| `https://login.bugcrowd.com` | 302 | → tracker…/user/sign_in | |
| `https://tracker.bugcrowd.com/user/sign_in` | 200 | - | tracker login shell |
| `https://api.bugcrowd.com` | 200 | - | bare shell |
| `https://api.bugcrowd.com/v2` | 404 | - | no public v2 root |
| `https://docs.bugcrowd.com` | 200 | - | |
| `https://docs.bugcrowd.com/api/getting-started/` | 200 | - | **API docs SSoT** |
| `https://docs.bugcrowd.com/researchers/participating-in-program/your-bugcrowdninja-email-address/` | 200 | - | **ninja email SSoT** |
| `https://docs.bugcrowd.com/researchers/using-email-aliases/` | 404 | - | old path |
| `https://docs.bugcrowd.com/api/` | 404 | - | use getting-started |

## Auth chain (passive)

1. `bugcrowd.com/user/sign_in` → `identity.bugcrowd.com/login?user_hint=researcher`
2. Hacker Okta tenant discovery still on `login.hackers.bugcrowd.com` (OIDC 200)
3. `login.hackers` bare → `identity…/login/hacker` (not direct authorize)

## Notes

- programs→engagements stable.
- Ninja email docs long path **200**; using-email-aliases **404**.
- No credentials; sessions human.

## Auth readiness

- Q-BC join still human via identity + engagements /h briefs.

## Next (human / gated)

- Browser BC login; enroll Q-BC briefs; ninja email hygiene per docs.
