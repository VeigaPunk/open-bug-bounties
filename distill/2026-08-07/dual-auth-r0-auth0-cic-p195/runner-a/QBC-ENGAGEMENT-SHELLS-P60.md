# Q-BC engagement shells matrix (PULSE-60)

UTC: 2026-08-07T16:20:26Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET bare vs /h (max-redirs 0)

| URL | status | location | notes |
|-----|--------|----------|-------|
| `https://bugcrowd.com/engagements/aiven` | 404 | - | |
| `https://bugcrowd.com/engagements/aiven/brief` | 301 | https://bugcrowd.com/h/engagements/aiven/brief | |
| `https://bugcrowd.com/h/engagements/aiven` | 200 | - | |
| `https://bugcrowd.com/h/engagements/aiven/brief` | 200 | - | |
| `https://bugcrowd.com/programs/aiven` | 404 | - | |
| `https://bugcrowd.com/engagements/okta` | 200 | - | |
| `https://bugcrowd.com/engagements/okta/brief` | 301 | https://bugcrowd.com/h/engagements/okta/brief | |
| `https://bugcrowd.com/h/engagements/okta` | 200 | - | |
| `https://bugcrowd.com/h/engagements/okta/brief` | 200 | - | |
| `https://bugcrowd.com/programs/okta` | 404 | - | |
| `https://bugcrowd.com/engagements/auth0` | 404 | - | |
| `https://bugcrowd.com/engagements/auth0/brief` | 301 | https://bugcrowd.com/h/engagements/auth0/brief | |
| `https://bugcrowd.com/h/engagements/auth0` | 200 | - | |
| `https://bugcrowd.com/h/engagements/auth0/brief` | 200 | - | |
| `https://bugcrowd.com/programs/auth0` | 404 | - | |
| `https://bugcrowd.com/engagements/auth0-okta` | 200 | - | |
| `https://bugcrowd.com/engagements/auth0-okta/brief` | 301 | https://bugcrowd.com/h/engagements/auth0-okta/brief | |
| `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | - | |
| `https://bugcrowd.com/h/engagements/auth0-okta/brief` | 200 | - | |
| `https://bugcrowd.com/programs/auth0-okta` | 404 | - | |
| `https://bugcrowd.com/engagements/okta-auth0` | 404 | - | |
| `https://bugcrowd.com/engagements/okta-auth0/brief` | 301 | https://bugcrowd.com/h/engagements/okta-auth0/brief | |
| `https://bugcrowd.com/h/engagements/okta-auth0` | 200 | - | |
| `https://bugcrowd.com/h/engagements/okta-auth0/brief` | 200 | - | |
| `https://bugcrowd.com/programs/okta-auth0` | 404 | - | |
| `https://bugcrowd.com/engagements/atlassian` | 200 | - | |
| `https://bugcrowd.com/engagements/atlassian/brief` | 301 | https://bugcrowd.com/h/engagements/atlassian/brief | |
| `https://bugcrowd.com/h/engagements/atlassian` | 200 | - | |
| `https://bugcrowd.com/h/engagements/atlassian/brief` | 200 | - | |
| `https://bugcrowd.com/programs/atlassian` | 404 | - | |
| `https://bugcrowd.com/engagements/openai` | 200 | - | |
| `https://bugcrowd.com/engagements/openai/brief` | 301 | https://bugcrowd.com/h/engagements/openai/brief | |
| `https://bugcrowd.com/h/engagements/openai` | 200 | - | |
| `https://bugcrowd.com/h/engagements/openai/brief` | 200 | - | |
| `https://bugcrowd.com/programs/openai` | 404 | - | |

## Tracker unauth bounce

| URL | status | location |
|-----|--------|----------|
| `https://tracker.bugcrowd.com/aiven` | 302 | https://tracker.bugcrowd.com/user/sign_in |
| `https://tracker.bugcrowd.com/okta` | 302 | https://tracker.bugcrowd.com/user/sign_in |
| `https://tracker.bugcrowd.com/atlassian` | 302 | https://tracker.bugcrowd.com/user/sign_in |
| `https://tracker.bugcrowd.com/openai` | 302 | https://tracker.bugcrowd.com/user/sign_in |

## Notes

- SSoT for Aiven remains /h/engagements/aiven (bare often 404).
- auth0 bare slug often 404; auth0-okta is combined engagement.
- programs/* slugs generally retired in favor of engagements.

## Delta vs prior
- bare **auth0** engagement still **404**, but **/h/engagements/auth0 200** (new soft surface).
- bare **okta-auth0 404** while **/h/okta-auth0 200** (mirror of auth0-okta naming).
- Aiven remains bare-404 /h-200 class.
