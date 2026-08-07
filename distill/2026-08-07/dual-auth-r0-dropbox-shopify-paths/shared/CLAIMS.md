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
| manage.auth0.com unauth → auth0.auth0.com/authorize | A pulse | high | AUTH0-PRODUCT-AUTH-DOORS.md |
| auth0.com/login 404; /signup 200; /u/login 400 bare | A pulse | high | AUTH0-PRODUCT-AUTH-DOORS.md |
| auth0 RD policy → BC engagements/auth0-okta (auth0 & okta-auth0 slugs 404) | A pulse | high | AUTH0-PRODUCT-AUTH-DOORS.md |
| auth0.com/security → security.okta.com | A pulse | high | AUTH0-PRODUCT-AUTH-DOORS.md |
| support.auth0.com → authorize bounce unauth | A pulse | med | AUTH0-PRODUCT-AUTH-DOORS.md |
| H1 sign_in/sign_up 403 curl; password/new 200 | B pulse | high | H1-PLATFORM-AUTH-DOORS.md |
| api.hackerone.com bare 200; v1/hackers/me+programs 401 | B pulse | high | H1-PLATFORM-AUTH-DOORS.md |
| H1 directory/programs + opportunities/all + shopify/gitlab 200 | B pulse | high | H1-PLATFORM-AUTH-DOORS.md |
| /bugs → sign_in then 403 curl; /settings 404 | B pulse | med | H1-PLATFORM-AUTH-DOORS.md |
| api.hackerone.com/docs 404; docs.hackerone.com 200 | B pulse | high | H1-PLATFORM-AUTH-DOORS.md |
| BC ninja-email SSoT is researchers/participating-in-program/... (200) | A pulse | high | BC-DOCS-PATH-RECOVERY.md |
| BC API docs SSoT is docs.bugcrowd.com/api/getting-started/ (200) | A pulse | high | BC-DOCS-PATH-RECOVERY.md |
| docs.bugcrowd.com/researchers/ and onboarding/ trees 404 | A pulse | high | BC-DOCS-PATH-RECOVERY.md |
| docs.bugcrowd.com/search 404 (no public search) | A pulse | med | BC-DOCS-PATH-RECOVERY.md |
| login.microsoftonline common OIDC discovery + authorize shell 200 | B pulse | high | MS-IDENTITY-AUTH-DOORS.md |
| graph.microsoft.com/v1.0/me 401; $metadata 200 | B pulse | high | MS-IDENTITY-AUTH-DOORS.md |
| portal.azure/entra/myaccount/admin.microsoft shells 200 | B pulse | high | MS-IDENTITY-AUTH-DOORS.md |
| MSRC bounty + OBB policy pages 200; portal.msrc → update-guide | B pulse | high | MS-IDENTITY-AUTH-DOORS.md |
| account.microsoft.com → consumers oauth / live authorize | B pulse | med | MS-IDENTITY-AUTH-DOORS.md |
| BC engagements okta/atlassian/openai/auth0-okta shells 200 | A pulse | high | QBC-ENGAGEMENT-SHELLS.md |
| BC engagements/aiven bare 404; /brief → /h/... 200 | A pulse | high | QBC-ENGAGEMENT-SHELLS.md |
| programs/* slugs 404 (engagements path is SSoT) | A pulse | high | QBC-ENGAGEMENT-SHELLS.md |
| tracker.bugcrowd.com/{aiven,okta} unauth → sign_in | A pulse | high | QBC-ENGAGEMENT-SHELLS.md |
| bughunters.google report/rules/VRP rules 200 | B pulse | high | GOOGLE-VRP-AUTH-DOORS.md |
| g.co/vulnz + appserve security-bugs → bughunters | B pulse | high | GOOGLE-VRP-AUTH-DOORS.md |
| oauth2 userinfo 401; token endpoint GET 404 | B pulse | high | GOOGLE-VRP-AUTH-DOORS.md |
| Drive/Docs/Mail unauth → accounts.google.com ServiceLogin | B pulse | high | GOOGLE-VRP-AUTH-DOORS.md |
| appsecurity reward-program → bughunters rules id redirect | B pulse | med | GOOGLE-VRP-AUTH-DOORS.md |
| BC Aiven SSoT is /h/engagements/aiven (+brief/announcements) 200 | A pulse | high | AIVEN-BC-PATH-RECOVERY.md |
| bare /engagements/aiven still 404; non-h brief 301→/h | A pulse | high | AIVEN-BC-PATH-RECOVERY.md |
| console.aiven.io login+signup 200; api me/project 401 | A pulse | high | AIVEN-BC-PATH-RECOVERY.md |
| api.aiven.io → /doc/ 200; aiven.io/security 404 | A pulse | med | AIVEN-BC-PATH-RECOVERY.md |
| BC bare engagements/okta + auth0-okta 200; bare auth0 + okta-auth0 404; /h/* 200 | A pulse | high | OKTA-AUTH0-BC-PATH-RECOVERY.md |
| manage.auth0.com unauth still → auth0.auth0.com/authorize PKCE | A pulse | high | OKTA-AUTH0-BC-PATH-RECOVERY.md |
| auth0.com/security → security.okta.com this tick | A pulse | high | OKTA-AUTH0-BC-PATH-RECOVERY.md |
| BC bare engagements/atlassian + openai both 200 this tick | A pulse | high | ATLASSIAN-BC-PATH-RECOVERY.md |
| id.atlassian.com/login still 202; BB+Trello → Atlassian id | A pulse | high | ATLASSIAN-BC-PATH-RECOVERY.md |
| platform.openai.com + /login 200; auth0.openai.com → chatgpt.com | A pulse | high | ATLASSIAN-BC-PATH-RECOVERY.md |
| openai.com/security → /security-and-privacy/ 200 | A pulse | high | ATLASSIAN-BC-PATH-RECOVERY.md |
| H1 shopify+gitlab+directory+opportunities 200; sign_in/sign_up 403 curl | B pulse | high | H1-INTI-PATH-RECOVERY.md |
| shopify.com/bugbounty/scope still 404; criteria 200 (locale redirect) | B pulse | high | H1-INTI-PATH-RECOVERY.md |
| Inti dropbox detail+login 200; www/intigriti programs/dropbox → app | B pulse | high | H1-INTI-PATH-RECOVERY.md |
| login.intigriti.com → /account/login 200; api.intigriti bare 404 researcher 400 | B pulse | high | H1-INTI-PATH-RECOVERY.md |
| dropbox oauth2/authorize missing client_id → authorize_error 200 | B pulse | med | H1-INTI-PATH-RECOVERY.md |
| bughunters.google report+learn+rules 200; accounts → v3/signin | B pulse | high | GOOGLE-MSRC-PATH-RECOVERY.md |
| portal.msrc.microsoft.com now → msrc.microsoft.com/update-guide; researcher+report 404 | B pulse | high | GOOGLE-MSRC-PATH-RECOVERY.md |
| microsoft.com/msrc/bounty + bounty-online-services 200 SSoT | B pulse | high | GOOGLE-MSRC-PATH-RECOVERY.md |
| api.msrc bare 404; cvrf/v3.0/updates 200; Graph /me 401 | B pulse | high | GOOGLE-MSRC-PATH-RECOVERY.md |
| Entra OIDC discovery common/v2.0 200; proton bug-bounty+login+signup 200 | B pulse | high | GOOGLE-MSRC-PATH-RECOVERY.md |
| bugcrowd.com/user/sign_in → login.hackers OIDC authorize (client 0oa20esd…) | A pulse | high | BC-OIDC-PATH-REFRESH.md |
| user/sign_up → login.bugcrowd.com/signin/register; bare /register 404 | A pulse | high | BC-OIDC-PATH-REFRESH.md |
| login.bugcrowd.com root → tracker.bugcrowd.com/user/sign_in 200 | A pulse | high | BC-OIDC-PATH-REFRESH.md |
| login.hackers OIDC discovery (default + root) 200; identity 403 | A pulse | high | BC-OIDC-PATH-REFRESH.md |
| docs api + using-email-aliases 404; ninja-email path 200 | A pulse | high | BC-OIDC-PATH-REFRESH.md |
| Q-BC bare 404: aiven, auth0, okta-auth0; bare 200: okta, auth0-okta, atlassian, openai | A pulse | high | QBC-ENGAGEMENT-MATRIX.md |
| All Q-BC /h/engagements + /h/brief 200 for seven slugs this tick | A pulse | high | QBC-ENGAGEMENT-MATRIX.md |
| All bare /brief 301 (→/h) even when bare slug 200 | A pulse | high | QBC-ENGAGEMENT-MATRIX.md |
| gitlab.com sign_in 403 curl; sign_up 200; oauth/authorize→sign_in 403 | B pulse | high | GITLAB-PATH-RECOVERY.md |
| api/v4/user + version 401; projects?per_page=1 200 public | B pulse | high | GITLAB-PATH-RECOVERY.md |
| OIDC discovery + oauth/discovery/keys 200 | B pulse | high | GITLAB-PATH-RECOVERY.md |
| BC bare engagements/gitlab 404; /h/engagements/gitlab 200 | B pulse | high | GITLAB-PATH-RECOVERY.md |
| H1 gitlab + about.gitlab security/disclosure 200 | B pulse | high | GITLAB-PATH-RECOVERY.md |
| okta.com bug-bounty + company/trust still 404; trust+status+security.okta 200 | A pulse | high | OKTA-PRODUCT-PATH-REFRESH.md |
| developer.okta signup + login.okta 200; BC /h okta + auth0-okta 200 | A pulse | high | OKTA-PRODUCT-PATH-REFRESH.md |
| auth0.com/login and /u/login 404 this tick; /signup + docs 200 | A pulse | high | OKTA-PRODUCT-PATH-REFRESH.md |
| manage.auth0.com still 302→auth0.auth0.com/authorize | A pulse | high | OKTA-PRODUCT-PATH-REFRESH.md |
| Dropbox developers+login 200; oauth2 missing client_id → authorize_error | B pulse | high | DROPBOX-SHOPIFY-PATH-REFRESH.md |
| api.dropboxapi/dropbox/content bare 404; get_current_account 400 unauth | B pulse | high | DROPBOX-SHOPIFY-PATH-REFRESH.md |
| admin.shopify 403; accounts 403→200 follow; partners home → locale parcerias | B pulse | med | DROPBOX-SHOPIFY-PATH-REFRESH.md |
| partners signup/orgs → accounts.shopify 403 curl | B pulse | high | DROPBOX-SHOPIFY-PATH-REFRESH.md |
| shopify bugbounty+criteria + H1 shopify 200; checkout bare 404 | B pulse | high | DROPBOX-SHOPIFY-PATH-REFRESH.md |
