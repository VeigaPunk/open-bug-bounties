# Okta + Auth0 BC path recovery (passive GET only)

UTC: 2026-08-07T15:17:10Z
Context: PULSE-30 Aiven /h/engagements SSoT; mirror for okta/auth0 Q-BC slugs.

| URL | code0 | follow→ | notes |
|-----|-------|---------|-------|
| `https://bugcrowd.com/engagements/okta` | 200 | 200 | - |
| `https://bugcrowd.com/engagements/okta/brief` | 301 | 200 | https://bugcrowd.com/h/engagements/okta/brief |
| `https://bugcrowd.com/h/engagements/okta` | 200 | 200 | - |
| `https://bugcrowd.com/h/engagements/okta/brief` | 200 | 200 | - |
| `https://bugcrowd.com/h/engagements/okta/announcements` | 200 | 200 | - |
| `https://bugcrowd.com/h/engagements/okta/crowdstream` | 200 | 200 | - |
| `https://bugcrowd.com/engagements/auth0` | 404 | 404 | - |
| `https://bugcrowd.com/engagements/auth0/brief` | 301 | 200 | https://bugcrowd.com/h/engagements/auth0/brief |
| `https://bugcrowd.com/h/engagements/auth0` | 200 | 200 | - |
| `https://bugcrowd.com/h/engagements/auth0/brief` | 200 | 200 | - |
| `https://bugcrowd.com/engagements/auth0-okta` | 200 | 200 | - |
| `https://bugcrowd.com/engagements/auth0-okta/brief` | 301 | 200 | https://bugcrowd.com/h/engagements/auth0-okta/brief |
| `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | 200 | - |
| `https://bugcrowd.com/h/engagements/auth0-okta/brief` | 200 | 200 | - |
| `https://bugcrowd.com/h/engagements/auth0-okta/announcements` | 200 | 200 | - |
| `https://bugcrowd.com/engagements/okta-auth0` | 404 | 404 | - |
| `https://bugcrowd.com/h/engagements/okta-auth0` | 200 | 200 | - |
| `https://bugcrowd.com/engagements?category=bug_bounty&search=okta` | 200 | 200 | - |
| `https://bugcrowd.com/engagements?category=bug_bounty&search=auth0` | 200 | 200 | - |
| `https://bugcrowd.com/search?q=okta` | 301 | 200 | https://bugcrowd.com/h/search?q=okta |
| `https://bugcrowd.com/search?q=auth0` | 301 | 200 | https://bugcrowd.com/h/search?q=auth0 |
| `https://www.okta.com/` | 200 | 200 | - |
| `https://developer.okta.com/` | 200 | 200 | - |
| `https://login.okta.com/` | 200 | 200 | - |
| `https://auth0.com/` | 200 | 200 | - |
| `https://manage.auth0.com/` | 302 | 302 | https://auth0.auth0.com/authorize?scope=openid%20profile%20email&max_age=43200&nonce=9c648abda5a0599842b4abc192ff341e&response_type=code&redirect_uri=https%3A%2F%2Fmanage.auth0.com%2Fcallback&code_challenge=QztRAfDjTDHu5R3NR_XFw5X2-WLJpCACxv3P3loihGE&code_challenge_method=S256&state=MQYnMXqugmkF46QTq12icc1L&client_id=zEYfpoFzUMEzilhkHilcWoNkrFfJ3hAI |
| `https://auth0.com/docs` | 200 | 200 | - |
| `https://auth0.com/security` | 308 | 200 | https://security.okta.com/ |

## Notes
- Prefer /h/engagements/* that return 200 as SSoT; bare slug may 404 like Aiven.
- auth0-okta vs auth0 vs okta slug drift: record which 200 this tick.
- No credentials, no account creation, no spray.
