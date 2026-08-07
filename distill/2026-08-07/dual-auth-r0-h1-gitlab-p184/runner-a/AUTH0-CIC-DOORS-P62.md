# Auth0 / CIC / BC doors (PULSE-62)

UTC: 2026-08-07T16:24:25Z
Policy: recon only — no auth, no exploit, no token harvest.
OIDC query values redacted (`client_id`/`nonce`/`state` → `…`).

## Passive GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://auth0.com` | 200 | - | marketing |
| `https://auth0.com/signup` | 200 | - | public signup shell |
| `https://auth0.com/login` | 404 | - | not product login |
| `https://auth0.com/u/login` | 404 | - | |
| `https://auth0.com/security` | 308 | → security.okta.com/ | |
| `https://auth0.com/docs` | 200 | - | |
| `https://auth0.com/blog/responsible-disclosure` | 308 | → trailing slash | |
| `https://auth0.com/blog/responsible-disclosure/` | 404 | - | **drift** (was blog RD surface) |
| `https://auth0.com/responsible-disclosure-policy` | 308 | → bugcrowd.com/auth0-okta | **policy SSoT hop** |
| `https://auth0.com/docs/.../responsible-disclosure-program` | 404 | - | docs RD path gone |
| `https://manage.auth0.com` | 302 | → /login | |
| `https://manage.auth0.com/login` | 302 | → auth0.auth0.com/authorize (openid profile email) | UL |
| `https://auth0.auth0.com/.well-known/openid-configuration` | 200 | - | discovery |
| `https://manage.cic-bug-bounty.auth0app.com` | 302 | → /login | CIC manage shell |
| `https://manage.cic-bug-bounty.auth0app.com/login` | 302 | → **config.cic-bug-bounty.auth0app.com/authorize** | CIC UL host |
| `https://cic-bug-bounty.auth0app.com` | ERR | - | apex not public |
| `https://security.okta.com` | 200 | - | |
| `https://developer.auth0.com` | 200 | - | |
| `https://support.auth0.com` | 302 | → auth0.auth0.com/authorize (ticket scopes) | human |
| `https://bugcrowd.com/engagements/auth0` | 404 | - | bare |
| `https://bugcrowd.com/h/engagements/auth0` | 200 | - | soft shell |
| `https://bugcrowd.com/engagements/auth0-okta` | 200 | - | combined SSoT |
| `https://bugcrowd.com/h/engagements/auth0-okta` | 200 | - | |
| `https://bugcrowd.com/engagements/okta-auth0` | 404 | - | bare |
| `https://bugcrowd.com/h/engagements/okta-auth0` | 200 | - | soft shell |

## Notes

- Product login: **manage.auth0.com → /login → auth0.auth0.com Universal Login**.
- CIC: manage host mirrors pattern; authorize issuer host is **config.cic-bug-bounty.auth0app.com** (tenant-local), not global auth0.auth0.com.
- Policy hop: `/responsible-disclosure-policy` → **bugcrowd.com/auth0-okta** (confirms BC combined program).
- Blog RD page **404** this tick — prefer BC engagement + RD policy URL hop.
- Soft-200 `/h/engagements/auth0` remains despite bare 404.

## Delta vs P52/P60

- manage root is short 302→/login under max-redirs 0 (full OIDC on hop 2).
- CIC login target **config.*** authorize (new explicit map this tick).
- blog/responsible-disclosure/ **404** (path drift).

## Auth readiness

- Q-BC Auth0/Okta/CIC still **human enroll** (tracker + brief + Get Creds).
- No secrets in distill.

## Next (human / gated)

- Browser session for manage/CIC only after brief; never store tenant secrets.
