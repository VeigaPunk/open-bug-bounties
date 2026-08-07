# CLAIMS — dual-auth SSoT (merge from A/B)

| Claim | Source | Confidence | Notes |
|-------|--------|------------|-------|
| Okta Set5 session_hint=AUTHENTICATED is non-durable headless | A | high | sid Max-Age=0 |
| Dual sekhmet roots work | A+B | high | --root required; luna vs spark runtime dirs |
| Dual models on dry-run after wrapper fix | A | high | spark live may fallback to luna |
| Q-BC Aiven/Auth0/Okta/Atlassian/OpenAI joined per ENROLL | A | med | re-verify human |
| XOR F4 Dropbox deep / H2 GitLab park | B | high | hard slot-8 |
| BC hacker login Okta OIDC at login.hackers.bugcrowd.com | judge | high | public authorize URL |
| Shopify H1 asset table PARTIAL without login | B | high | needs SPA export |
| manage.cic-bug-bounty.auth0app.com returns 400 unauth | pulse | med | host up; needs Get Creds path in browser |
| docs.bugcrowd.com email-aliases path 404 (old URL) | pulse | high | try using-email-aliases or docs root |
| Public policy surfaces 200 for BC Q-BC + Shopify + Dropbox Inti + Proton + MSRC + Google VRP | pulse | high | PULSE-HTTP.md tick |
| console.aiven.io + api.aiven.io both 200 unauth shell | pulse | high | free-tier human still required |
| Dual sekhmet luna+spark `run --dry-run` green this tick | pulse | high | flags after `run`; wrappers pass-through |
| Set5 admin OIDC authorize→/admin/sso/callback PKCE; curl not durable | A pulse | high | BC-OKTA-ADMIN-PASSIVE.md |
| shopify.com/bugbounty/scope is 404; criteria+H1 are SSoT for public | B pulse | high | H1-SHOPIFY-PASSIVE.md |
| api.aiven.io/v1/project returns 401 unauth (token required) | A pulse | high | AIVEN-PASSIVE-HTTP.md |
| atlassian.com/trust/security/bug-bounty 404; use BC atlassian engagement | A pulse | med | AIVEN-PASSIVE-HTTP.md |
| portal.msrc.microsoft.com/en-us/researcher 404; use portal root | B pulse | high | F2-MSRC-PASSIVE.md |
| openai.com/policies/bug-bounty-program 404; BC engagement is SSoT | A pulse | high | OPENAI-ATLASSIAN-PASSIVE.md |
| id.atlassian.com/login returns 202 unauth shell | A pulse | med | OPENAI-ATLASSIAN-PASSIVE.md |
| proton.me/security and support/bug-bounty-program 404; /security/bug-bounty is SSoT | B pulse | high | F3-PROTON-PASSIVE.md |
