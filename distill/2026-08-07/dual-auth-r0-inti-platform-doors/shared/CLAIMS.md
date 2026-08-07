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
| Google VRP + appsecurity + Drive/Docs shells all 200 this tick | B pulse | high | F1-GOOGLE-PASSIVE.md |
| login.hackers + Set5 oktapreview OIDC discovery both 200 | A pulse | high | AUTH0-OIDC-PASSIVE.md |
| api.dropboxapi.com root 404; get_current_account 400 unauth | B pulse | high | F4-DROPBOX-HTTP.md |
| H1 GitLab public shell 200; hacker API 401 unauth; BC engagements/gitlab 404 | B pulse | high | H2-GITLAB-STUB.md |
| docs.bugcrowd.com using-email-aliases 404; SSoT is your-bugcrowdninja-email-address | A pulse | high | BC-NINJA-EMAIL-PASSIVE.md |
| identity.bugcrowd.com 403 unauth; login.hackers OIDC discovery 200 | A pulse | high | BC-TRACKER-API-PASSIVE.md |
| api.bugcrowd.com/v2 and /docs 404; docs.bugcrowd.com/api is SSoT | A pulse | high | BC-TRACKER-API-PASSIVE.md |
| api.intigriti.com root 404; app.intigriti login/researcher 200 | B pulse | high | INTI-SHOPIFY-AUTH-DOORS.md |
| id.atlassian.com unauth returns 202 (not 200) | A/B pulse | med | INTI-SHOPIFY-AUTH-DOORS.md |
| H1 /users/sign_in and sign_up return 403 to curl (browser required) | B pulse | high | H1-GOOGLE-AUTH-DOORS.md |
| api.hackerone.com/v1/hackers/me 401 unauth; api/docs 404 | B pulse | high | H1-GOOGLE-AUTH-DOORS.md |
| Google accounts + bughunters + Drive/Docs shells 200 this tick | B pulse | high | H1-GOOGLE-AUTH-DOORS.md |
| api.openai.com returns 421 unauth curl; /v1/models not public this tick | A pulse | high | OPENAI-AUTH0-AUTH-DOORS.md |
| openai.com/policies/security-policy 404; use BC openai engagement + openai.com/security | A pulse | high | OPENAI-AUTH0-AUTH-DOORS.md |
| bare cic-bug-bounty.auth0app.com ERR; manage host 400 without OIDC state | A pulse | med | OPENAI-AUTH0-AUTH-DOORS.md |
| api.msrc.microsoft.com root 404; cvrf/v3.0/updates 200 public | B pulse | high | MSRC-ENTRA-PROTON-AUTH-DOORS.md |
| MSRC portal + report + OBB bounty pages 200 this tick | B pulse | high | MSRC-ENTRA-PROTON-AUTH-DOORS.md |
| Proton account login/signup + mail shells 200 | B pulse | high | MSRC-ENTRA-PROTON-AUTH-DOORS.md |
| api.aiven.io/v1 bare 404; /v1/me and /v1/project 401 unauth | A pulse | high | AIVEN-OKTA-AUTH-DOORS.md |
| Set5 org+admin and login.hackers OIDC discovery all 200 (incl oauth2/default) | A pulse | high | AIVEN-OKTA-AUTH-DOORS.md |
| console.aiven.io login+signup 200 this tick | A pulse | high | AIVEN-OKTA-AUTH-DOORS.md |
| dropbox.com/oauth2/authorize + oauth-guide 200 unauth shell | B pulse | high | F4-DROPBOX-OAUTH-DOORS.md |
| Inti dropbox program routes + intigriti.com/programs/dropbox 200 | B pulse | high | F4-DROPBOX-OAUTH-DOORS.md |
| api.dropbox.com and content.dropboxapi.com bare 404 (same class as api.dropboxapi.com) | B pulse | high | F4-DROPBOX-OAUTH-DOORS.md |
| bitbucket.org/account/signin and trello.com/login return 202 unauth | A pulse | med | ATLASSIAN-AUTH-DOORS.md |
| developer.atlassian.com/console + api.atlassian.com 200 shells | A pulse | high | ATLASSIAN-AUTH-DOORS.md |
| BC atlassian engagement 200 remains bounty SSoT (trust BB path 404) | A pulse | high | ATLASSIAN-AUTH-DOORS.md |
| admin.shopify.com + accounts.shopify.com root 403 to curl (browser required) | B pulse | high | SHOPIFY-ADMIN-AUTH-DOORS.md |
| partners.shopify.com/signup and /organizations 403 unauth curl; partners home 200 | B pulse | high | SHOPIFY-ADMIN-AUTH-DOORS.md |
| checkout.shopify.com bare 404; store-login path 200 | B pulse | med | SHOPIFY-ADMIN-AUTH-DOORS.md |
| www.okta.com/bug-bounty/ 404; BC engagements/okta is SSoT | A pulse | high | OKTA-PRODUCT-AUTH-DOORS.md |
| okta.com/company/trust 404; trust.okta.com + status.okta.com 200 | A pulse | high | OKTA-PRODUCT-AUTH-DOORS.md |
| developer.okta.com signup + login.okta.com 200 public shells | A pulse | med | OKTA-PRODUCT-AUTH-DOORS.md |
| gitlab.com/users/sign_in 403 unauth curl; sign_up 200 | B pulse | high | GITLAB-AUTH-DOORS.md |
| GitLab OIDC discovery + oauth/discovery/keys 200 | B pulse | high | GITLAB-AUTH-DOORS.md |
| api/v4/user and /version 401 unauth; projects list 200 public | B pulse | high | GITLAB-AUTH-DOORS.md |
| oauth/authorize|token redirect sign_in then 403 to curl | B pulse | high | GITLAB-AUTH-DOORS.md |
| H1 gitlab program pages 200; about.gitlab security/disclosure 200 | B pulse | high | GITLAB-AUTH-DOORS.md |
| BC sign_in chains to login.hackers OIDC authorize via identity | A pulse | high | BC-PLATFORM-AUTH-DOORS.md |
| identity.bugcrowd.com bare still 403; tracker sign_in 200 | A pulse | high | BC-PLATFORM-AUTH-DOORS.md |
| docs.bugcrowd.com/api and ninja-email path 404 this tick | A pulse | med | BC-PLATFORM-AUTH-DOORS.md path drift |
| api.bugcrowd.com bare 200; /v2 404 | A pulse | high | BC-PLATFORM-AUTH-DOORS.md |
| bugcrowd.com/programs → /engagements; sign_up → login.bugcrowd.com/register | A pulse | high | BC-PLATFORM-AUTH-DOORS.md |
| app.intigriti login/auth/login/programs/profile 200 unauth shells | B pulse | high | INTI-PLATFORM-AUTH-DOORS.md |
| app.intigriti /researcher → login.intigriti.com connect/authorize | B pulse | high | INTI-PLATFORM-AUTH-DOORS.md |
| api.intigriti.com bare+core 404; external/researcher 400 unauth | B pulse | high | INTI-PLATFORM-AUTH-DOORS.md |
| Dropbox program detail 200; intigriti.com/programs/dropbox → app | B pulse | high | INTI-PLATFORM-AUTH-DOORS.md |
| www.intigriti.com/bug-bounty 404; researchers + bug-bounty-programs 200 | B pulse | med | INTI-PLATFORM-AUTH-DOORS.md |
