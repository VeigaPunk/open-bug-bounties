# Google VRP + OAuth doors (PULSE-95)

UTC: 2026-08-07T17:32:04Z
Policy: recon only — no auth, no exploit, no token harvest.
OAuth continue/state redacted.

## Passive HEAD/GET (max-redirs 0)

| method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://bughunters.google.com` | 200 | `-` |
| `GET` | `https://bughunters.google.com` | 200 | `-` |
| `HEAD` | `https://bughunters.google.com/report` | 200 | `-` |
| `GET` | `https://bughunters.google.com/report` | 200 | `-` |
| `HEAD` | `https://bughunters.google.com/learn` | 200 | `-` |
| `GET` | `https://bughunters.google.com/learn` | 200 | `-` |
| `HEAD` | `https://bughunters.google.com/about/rules` | 301 | `https://bughunters.google.com/about/rules/about-this-section` |
| `GET` | `https://bughunters.google.com/about/rules` | 301 | `https://bughunters.google.com/about/rules/about-this-section` |
| `HEAD` | `https://bughunters.google.com/about/rules/google-friends/google-and-alphabet-vulnerability-reward-program-vrp-rules` | 200 | `-` |
| `GET` | `https://bughunters.google.com/about/rules/google-friends/google-and-alphabet-vulnerability-reward-program-vrp-rules` | 200 | `-` |
| `HEAD` | `https://www.google.com/about/appsecurity/` | 301 | `https://about.google/appsecurity` |
| `GET` | `https://www.google.com/about/appsecurity/` | 301 | `https://about.google/appsecurity` |
| `HEAD` | `https://www.google.com/about/appsecurity/reward-program/` | 301 | `https://bughunters.google.com/about/rules/6625378258649088` |
| `GET` | `https://www.google.com/about/appsecurity/reward-program/` | 301 | `https://bughunters.google.com/about/rules/6625378258649088` |
| `HEAD` | `https://accounts.google.com` | 302 | `https://accounts.google.com/ServiceLogin?passive=1209600&continue=…&followup=https%3A%2F%2Faccounts.google.com%2F` |
| `GET` | `https://accounts.google.com` | 302 | `https://accounts.google.com/ServiceLogin?passive=1209600&continue=…&followup=https%3A%2F%2Faccounts.google.com%2F` |
| `HEAD` | `https://accounts.google.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://accounts.google.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://oauth2.googleapis.com/` | 404 | `-` |
| `GET` | `https://oauth2.googleapis.com/` | 404 | `-` |
| `HEAD` | `https://www.googleapis.com/` | 404 | `-` |
| `GET` | `https://www.googleapis.com/` | 404 | `-` |
| `HEAD` | `https://drive.google.com` | 302 | `https://accounts.google.com/ServiceLogin?service=wise&passive=1209600&osid=1&continue=…&followup=https://drive.google.co` |
| `GET` | `https://drive.google.com` | 302 | `https://accounts.google.com/ServiceLogin?service=wise&passive=1209600&osid=1&continue=…&followup=https://drive.google.co` |
| `HEAD` | `https://docs.google.com` | 302 | `https://accounts.google.com/ServiceLogin?passive=1209600&osid=1&continue=…&followup=https://docs.google.com/&emr=1` |
| `GET` | `https://docs.google.com` | 302 | `https://accounts.google.com/ServiceLogin?passive=1209600&osid=1&continue=…&followup=https://docs.google.com/&emr=1` |
| `HEAD` | `https://mail.google.com` | 301 | `/mail/` |
| `GET` | `https://mail.google.com` | 301 | `/mail/` |
| `HEAD` | `https://myaccount.google.com` | 302 | `https://myaccount.google.com/intro` |
| `GET` | `https://myaccount.google.com` | 302 | `https://myaccount.google.com/intro` |
| `HEAD` | `https://console.cloud.google.com` | 302 | `https://accounts.google.com/ServiceLogin?service=cloudconsole&passive=1209600&osid=1&continue=…&followup=https://console` |
| `GET` | `https://console.cloud.google.com` | 302 | `https://accounts.google.com/ServiceLogin?service=cloudconsole&passive=1209600&osid=1&continue=…&followup=https://console` |
| `HEAD` | `https://admin.google.com` | 204 | `-` |
| `GET` | `https://admin.google.com` | 302 | `https://www.google.com/sorry/index?continue=…&q=EhAoBAFNXFY27y7Yrv8AAAFyGJyt2NMGIjAdqX5S9n1QSeGSqNfZz7eMcx4PezD8diDfEVbA` |
| `HEAD` | `https://hackerone.com/google` | 200 | `-` |
| `GET` | `https://hackerone.com/google` | 200 | `-` |
| `HEAD` | `https://security.googleblog.com` | 301 | `https://blog.google/security/` |
| `GET` | `https://security.googleblog.com` | 301 | `https://blog.google/security/` |
| `HEAD` | `https://accounts.google.com/o/oauth2/v2/auth` | 302 | `https://accounts.google.com/signin/oauth/error?authError=Cg9pbnZhbGlkX3JlcXVlc3QSLFJlcXVpcmVkIHBhcmFtZXRlciBpcyBtaXNzaW5` |
| `GET` | `https://accounts.google.com/o/oauth2/v2/auth` | 302 | `https://accounts.google.com/signin/oauth/error?authError=Cg9pbnZhbGlkX3JlcXVlc3QSLFJlcXVpcmVkIHBhcmFtZXRlciBpcyBtaXNzaW5` |
| `HEAD` | `https://www.googleapis.com/oauth2/v3/certs` | 200 | `-` |
| `GET` | `https://www.googleapis.com/oauth2/v3/certs` | 200 | `-` |

## Auth chain (passive)

1. VRP hub **200**, report **200**, learn **200**.
2. Rules SSoT full path GET **200**.
3. accounts OIDC discovery **200**; oauth2 auth shell **302**.
4. JWKS certs **200**; bare googleapis/oauth2 roots **404/404**.
5. Product unauth hops: Drive **302**, Docs **302**, Cloud console **302**.
6. H1 google shell **200** (not F1 submit SSoT).

## Delta vs P85

- **New:** `accounts.google.com/o/oauth2/v2/auth` **302** (authorize shell without client_id still redirects).
- **New:** `www.googleapis.com/oauth2/v3/certs` **200** (public JWKS).
- admin.google.com: HEAD **204** / GET **302** (method split).
- VRP hub/report/rules SSoT **200** stable; product surfaces still ServiceLogin hops.

## Notes

- Dual own Google accounts + product pick still human.
- No credentials.

## Auth readiness

- F1 VRP SSoT + OIDC doors mapped; account prep human.

## Next (human / gated)

- Dual Google accounts; pick one product; authz/IDOR on own data only.
