# BC platform + Okta product passive (PULSE-58)

UTC: 2026-08-07T16:16:30Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (max-redirs 0)

| URL | status | location | set-cookie | notes |
|-----|--------|----------|------------|-------|
| `https://bugcrowd.com` | 301 | https://www.bugcrowd.com/ | 0 |  |
| `https://bugcrowd.com/sign_in` | 404 | - | 0 |  |
| `https://bugcrowd.com/sign_up` | 301 | https://bugcrowd.com/h/sign_up | 0 |  |
| `https://bugcrowd.com/programs` | 301 | https://bugcrowd.com/engagements | 0 |  |
| `https://bugcrowd.com/engagements` | 200 | - | 1 | cookies=1 |
| `https://identity.bugcrowd.com` | 403 | - | 2 | cookies=2 |
| `https://identity.bugcrowd.com/login` | 200 | - | 2 | cookies=2 |
| `https://login.hackers.bugcrowd.com` | 302 | https://identity.bugcrowd.com/login/hacker | 4 | cookies=4 |
| `https://login.hackers.bugcrowd.com/.well-known/openid-configuration` | 200 | - | 0 |  |
| `https://login.hackers.bugcrowd.com/oauth2/default/.well-known/openid-configuration` | 200 | - | 0 |  |
| `https://tracker.bugcrowd.com/user/sign_in` | 200 | - | 2 | cookies=2 |
| `https://api.bugcrowd.com` | 200 | - | 0 |  |
| `https://api.bugcrowd.com/v2` | 404 | - | 0 |  |
| `https://docs.bugcrowd.com` | 200 | - | 0 |  |
| `https://docs.bugcrowd.com/api/getting-started/` | 200 | - | 0 |  |
| `https://www.okta.com` | 200 | - | 3 | cookies=3 |
| `https://www.okta.com/bug-bounty/` | 404 | - | 1 | cookies=1 |
| `https://developer.okta.com` | 200 | - | 0 |  |
| `https://developer.okta.com/signup/` | 200 | - | 0 |  |
| `https://login.okta.com` | 200 | - | 0 |  |
| `https://trust.okta.com` | 200 | - | 1 | cookies=1 |
| `https://status.okta.com` | 200 | - | 2 | cookies=2 |
| `https://bugcrowd.com/engagements/okta` | 200 | - | 1 | cookies=1 |
| `https://bugcrowd.com/h/engagements/okta` | 200 | - | 0 |  |
| `https://bugcrowd.com/auth0-okta` | 302 | https://bugcrowd.com/engagements/auth0-okta | 0 |  |
| `https://bugcrowd.com/engagements/auth0-okta` | 200 | - | 1 | cookies=1 |

## Notes

- Hacker OIDC: login.hackers dual discovery (root + oauth2/default).
- Okta BB SSoT is BC engagements/okta + auth0-okta; okta.com/bug-bounty often 404.
- No Set5 secrets in distill; free Okta still human.

## Delta vs prior
- bare **/sign_in 404** this tick (login via identity/hackers chain).
- login.hackers root **302 → identity…/login/hacker** (not direct authorize shell).
- short **/auth0-okta 302 → /engagements/auth0-okta**.
