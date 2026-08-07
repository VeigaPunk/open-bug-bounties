# Google VRP + identity doors (PULSE-105)

UTC: 2026-08-07T17:55:38Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://bughunters.google.com` | 200 | `-` |
| `GET` | `https://bughunters.google.com` | 200 | `-` |
| `HEAD` | `https://bughunters.google.com/about/rules` | 301 | `https://bughunters.google.com/about/rules/about-this-section` |
| `GET` | `https://bughunters.google.com/about/rules` | 301 | `https://bughunters.google.com/about/rules/about-this-section` |
| `HEAD` | `https://bughunters.google.com/learn` | 200 | `-` |
| `GET` | `https://bughunters.google.com/learn` | 200 | `-` |
| `HEAD` | `https://bughunters.google.com/leaderboard` | 200 | `-` |
| `GET` | `https://bughunters.google.com/leaderboard` | 200 | `-` |
| `HEAD` | `https://g.co/vulnz` | 302 | `https://bughunters.google.com/` |
| `GET` | `https://g.co/vulnz` | 302 | `https://bughunters.google.com/` |
| `HEAD` | `https://www.google.com/about/appsecurity/` | 301 | `https://about.google/appsecurity` |
| `GET` | `https://www.google.com/about/appsecurity/` | 301 | `https://about.google/appsecurity` |
| `HEAD` | `https://accounts.google.com` | 302 | `https://accounts.google.com/ServiceLogin?passive=1209600&continue=https%3A%2F%2Faccounts.g` |
| `GET` | `https://accounts.google.com` | 302 | `https://accounts.google.com/ServiceLogin?passive=1209600&continue=https%3A%2F%2Faccounts.g` |
| `HEAD` | `https://accounts.google.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://accounts.google.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://oauth2.googleapis.com` | 404 | `-` |
| `GET` | `https://oauth2.googleapis.com` | 404 | `-` |
| `HEAD` | `https://www.googleapis.com` | 404 | `-` |
| `GET` | `https://www.googleapis.com` | 404 | `-` |
| `HEAD` | `https://www.googleapis.com/oauth2/v3/certs` | 200 | `-` |
| `GET` | `https://www.googleapis.com/oauth2/v3/certs` | 200 | `-` |
| `HEAD` | `https://admin.google.com` | 204 | `-` |
| `GET` | `https://admin.google.com` | 302 | `https://www.google.com/sorry/index?continue=https://admin.google.com/&q=EhAoBAFNXFY27y7Yrv` |
| `HEAD` | `https://myaccount.google.com` | 302 | `https://myaccount.google.com/intro` |
| `GET` | `https://myaccount.google.com` | 302 | `https://myaccount.google.com/intro` |
| `HEAD` | `https://console.cloud.google.com` | 302 | `https://accounts.google.com/ServiceLogin?service=cloudconsole&passive=1209600&osid=1&conti` |
| `GET` | `https://console.cloud.google.com` | 302 | `https://accounts.google.com/ServiceLogin?service=cloudconsole&passive=1209600&osid=1&conti` |
| `HEAD` | `https://hackerone.com/google` | 200 | `-` |
| `GET` | `https://hackerone.com/google` | 200 | `-` |
| `HEAD` | `https://hackerone.com/googlevrp` | 404 | `-` |
| `GET` | `https://hackerone.com/googlevrp` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/google` | 404 | `-` |
| `GET` | `https://bugcrowd.com/engagements/google` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/google` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/google` | 200 | `-` |
| `HEAD` | `https://issuetracker.google.com` | 302 | `https://issuetracker.google.com/issues` |
| `GET` | `https://issuetracker.google.com` | 302 | `https://issuetracker.google.com/issues` |
| `HEAD` | `https://security.googleblog.com` | 301 | `https://blog.google/security/` |
| `GET` | `https://security.googleblog.com` | 301 | `https://blog.google/security/` |

## Auth chain (passive)

1. VRP SSoT: bughunters.google.com root/learn/leaderboard **200**; rules → section **301**; g.co/vulnz → bughunters **302**.
2. Google IdP: accounts → ServiceLogin **302**; OIDC well-known **200**; oauth2 JWKS certs **200**; oauth2/googleapis root **404**.
3. Cloud console → accounts ServiceLogin (cloudconsole) **302**.
4. admin.google HEAD **204** / GET sorry interstitial (bot gate); myaccount → intro **302**.
5. Platform: H1 `/google` **200**; `/googlevrp` **404**; BC bare google **404**, `/h` soft **200**.
6. issuetracker → issues **302**; security blog → blog.google/security **301**.

## Delta vs P95

- **New:** g.co/vulnz shortlink **302**→bughunters.
- **New:** admin.google HEAD **204** vs GET sorry gate.
- OIDC+JWKS **200** stable; H1 google **200**; BC bare **404** /h soft **200** stable.

## Notes

- Own Google accounts only; no third-party Workspace probing.
- No credentials.

## Auth readiness

- VRP portal + Google OIDC/JWKS mapped; report flow human.

## Next (human / gated)

- bughunters login; dual own accounts for authz; re-read VRP rules.
