# Okta product + BC doors (PULSE-66)

UTC: 2026-08-07T16:32:23Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://www.okta.com` | 200 | - | marketing |
| `https://www.okta.com/bug-bounty/` | 404 | - | first-party BB path gone |
| `https://www.okta.com/company/trust` | 404 | - | use trust.okta.com |
| `https://trust.okta.com` | 200 | - | trust center |
| `https://status.okta.com` | 200 | - | status |
| `https://security.okta.com` | 200 | - | security hub |
| `https://developer.okta.com` | 200 | - | dev portal |
| `https://developer.okta.com/signup` | 301 | → /signup/ | |
| `https://login.okta.com` | 200 | - | product login shell |
| `https://okta.com/login` | 301 | → www.okta.com/login | |
| `https://bugcrowd.com/engagements/okta` | 200 | - | bare okta **200** |
| `https://bugcrowd.com/h/engagements/okta` | 200 | - | /h shell |
| `https://bugcrowd.com/h/engagements/okta/brief` | 200 | - | brief SSoT |
| `https://bugcrowd.com/engagements/auth0-okta` | 200 | - | combined |
| `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | - | |
| `https://bugcrowd.com/programs/okta` | 404 | - | retired programs path |
| `https://tracker.bugcrowd.com/okta` | 302 | → /user/sign_in | unauth |
| `https://login.hackers.bugcrowd.com/.well-known/openid-configuration` | 200 | - | hacker OIDC |
| `https://identity.bugcrowd.com` | 403 | - | bare identity |
| `https://bugcrowd.com/user/sign_in` | 302 | → identity…/login?user_hint=researcher | BC chain |

## Notes

- Bounty SSoT: **BC engagements/okta** (+ /h + brief) and **auth0-okta** combined; www.okta.com/bug-bounty **404**.
- Trust: trust.okta.com + security.okta.com + status (not company/trust path).
- Platform auth for reporting: BC hacker login via identity + login.hackers OIDC (not Okta workforce for researcher join).

## Delta vs product path refresh

- Stable: BB path 404; bare okta engagement 200; tracker→sign_in; identity bare 403.
- sign_in location now explicitly `identity.bugcrowd.com/login?user_hint=researcher`.

## Auth readiness

- Q-BC Okta enroll still **human** (brief + tracker).
- Developer signup public for free Okta org (own assets only after brief).

## Next (human / gated)

- BC join okta/auth0-okta; free developer org if in-scope; no Set5 secrets in distill.
