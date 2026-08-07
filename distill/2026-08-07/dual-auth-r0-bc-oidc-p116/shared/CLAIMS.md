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
| console.aiven login+signup+root still 200; api doc 200 | A pulse | high | AIVEN-API-PATH-REFRESH.md |
| api.aiven /v1 bare 404; /v1/me + /v1/project 401 unauth | A pulse | high | AIVEN-API-PATH-REFRESH.md |
| docs/help.aiven → aiven.io; aiven.io/security still 404 | A pulse | high | AIVEN-API-PATH-REFRESH.md |
| BC /h/aiven + brief 200; bare engagements/aiven still 404 | A pulse | high | AIVEN-API-PATH-REFRESH.md |
| proton.me/security + support/bug-bounty-program 404; /security/bug-bounty SSoT (reconfirm P41) | B pulse | high | PROTON-INTI-PATH-REFRESH.md |
| account.proton.me login+signup 200 dual free doors P41 | B pulse | high | PROTON-INTI-PATH-REFRESH.md |
| Inti researcher → login OIDC; api bare 404; external/researcher 400 unauth P41 | B pulse | high | PROTON-INTI-PATH-REFRESH.md |
| www.intigriti.com/bug-bounty 404; researchers/bug-bounty-programs 200 P41 | B pulse | high | PROTON-INTI-PATH-REFRESH.md |
| auth0 RD policy → BC auth0-okta; blog RD 404 P42 | A pulse | high | AUTH0-BC-PATH-REFRESH.md |
| auth0.com/u/login 404 this tick (was 400) P42 | A pulse | med | AUTH0-BC-PATH-REFRESH.md |
| manage.auth0.com → auth0.auth0.com/authorize PKCE still P42 | A pulse | high | AUTH0-BC-PATH-REFRESH.md |
| BC ninja-email docs long path 404 drift P42 | A pulse | high | AUTH0-BC-PATH-REFRESH.md |
| BC sign_in → login.hackers OIDC → identity callback P42 | A pulse | high | AUTH0-BC-PATH-REFRESH.md |
| BC ninja-email SSoT is your-bugcrowdninja-email-address (not using-your) P43 | A pulse | high | BC-NINJA-DOCS-RELOCATE.md |
| identity.bugcrowd.com/login 200; bare identity 403 P43 | A pulse | high | BC-NINJA-DOCS-RELOCATE.md |
| login.hackers authorize bare 400 without OIDC params P43 | A pulse | med | BC-NINJA-DOCS-RELOCATE.md |
| appsecurity.google.com ERR this tick; bughunters+VRP rules SSoT P44 | B pulse | high | GOOGLE-H1-PATH-REFRESH.md |
| H1 sign_in/up 403 curl; password/new+directory 200 P44 | B pulse | high | GOOGLE-H1-PATH-REFRESH.md |
| api.hackerone.com v1/hackers/me+programs 401 unauth P44 | B pulse | high | GOOGLE-H1-PATH-REFRESH.md |
| g.co/vulnz → bughunters; Drive/Docs/Mail → accounts login P44 | B pulse | high | GOOGLE-H1-PATH-REFRESH.md |
| OpenAI BB SSoT BC engagements/openai; policies BB paths 404 P45 | A pulse | high | OPENAI-ATLASSIAN-PATH-REFRESH.md |
| api.openai.com bare 421; /v1/models 401 unauth P45 | A pulse | high | OPENAI-ATLASSIAN-PATH-REFRESH.md |
| Atlassian BB SSoT BC engagements/atlassian; trust BB 404 P45 | A pulse | high | OPENAI-ATLASSIAN-PATH-REFRESH.md |
| id.atlassian login/signup 202; BB/Trello → id P45 | A pulse | med | OPENAI-ATLASSIAN-PATH-REFRESH.md |
| portal.msrc researcher+report 404; root→update-guide P46 | B pulse | high | MSRC-DROPBOX-PATH-REFRESH.md |
| MSRC bounty+OBB pages 200; cvrf updates 200 P46 | B pulse | high | MSRC-DROPBOX-PATH-REFRESH.md |
| Dropbox BB Inti SSoT; dropbox.com/bug-bounty 404 P46 | B pulse | high | MSRC-DROPBOX-PATH-REFRESH.md |
| Dropbox oauth authorize missing_client_id 200; API bare 404 P46 | B pulse | high | MSRC-DROPBOX-PATH-REFRESH.md |
| MSRC submit SSoT msrc.microsoft.com/report (+ /vulnerability/new) P47 | B pulse | high | MSRC-SUBMIT-PATH-RECOVERY.md |
| portal.msrc → update-guide only; en-us report/researcher 404 P47 | B pulse | high | MSRC-SUBMIT-PATH-RECOVERY.md |
| create-report → /report/vulnerability/new 200 P47 | B pulse | high | MSRC-SUBMIT-PATH-RECOVERY.md |
| msrc robots Allow: /report P47 | B pulse | med | MSRC-SUBMIT-PATH-RECOVERY.md |
| QBC /h shells all 200; programs/* 404 P48 | A pulse | high | QBC-ENGAGEMENT-MATRIX-P48.md |
| aiven+auth0+okta-auth0 bare 404; use /h or brief P48 | A pulse | high | QBC-ENGAGEMENT-MATRIX-P48.md |
| auth0-okta okta atlassian openai bare 200 P48 | A pulse | high | QBC-ENGAGEMENT-MATRIX-P48.md |
| Shopify bugbounty/scope 404; criteria+H1 SSoT P49 | B pulse | high | SHOPIFY-GITLAB-PATH-REFRESH.md |
| partners.shopify signup/orgs 200 via accounts (was 403) P49 | B pulse | med | SHOPIFY-GITLAB-PATH-REFRESH.md |
| GitLab sign_in 403 curl; H1 gitlab 200; BC gitlab 404 P49 | B pulse | high | SHOPIFY-GITLAB-PATH-REFRESH.md |
| admin/accounts.shopify root 403 curl P49 | B pulse | high | SHOPIFY-GITLAB-PATH-REFRESH.md |
| login.hackers dual OIDC (root vs oauth2/default); hacker uses default P50 | A pulse | high | BC-OKTA-OIDC-REFRESH.md |
| identity.bugcrowd bare 403; /login 200 P50 | A pulse | high | BC-OKTA-OIDC-REFRESH.md |
| Okta BB BC SSoT; okta.com/bug-bounty 404 P50 | A pulse | high | BC-OKTA-OIDC-REFRESH.md |
| console.aiven login+signup 200; api v1 bare 404; me 401 P50 | A pulse | high | BC-OKTA-OIDC-REFRESH.md |
| accounts.shopify.com + /lookup 200 unauth this tick (was often 403) | B pulse | high | H1-SHOPIFY-OAUTH-PASSIVE.md |
| admin.shopify.com 200 unauth shell this tick | B pulse | high | H1-SHOPIFY-OAUTH-PASSIVE.md |
| partners.shopify.com/organizations → accounts oauth/authorize client_id | B pulse | high | H1-SHOPIFY-OAUTH-PASSIVE.md |
| identity.shopify.com 404 (not identity surface) | B pulse | high | H1-SHOPIFY-OAUTH-PASSIVE.md |
| H1 oauth/authorize → /users/sign_in then 403 curl boundary | B pulse | high | H1-SHOPIFY-OAUTH-PASSIVE.md |
| GitLab oauth authorize|token → sign_in; api/v4/user 401 | B pulse | high | H1-SHOPIFY-OAUTH-PASSIVE.md |
| auth0.com/login + /u/login both 404 this tick (signup 200) | A pulse | high | AUTH0-CIC-PASSIVE-P52.md |
| manage.auth0.com/login → auth0.auth0.com/authorize OIDC | A pulse | high | AUTH0-CIC-PASSIVE-P52.md |
| manage.cic-bug-bounty.auth0app.com/login → config.cic authorize | A pulse | high | AUTH0-CIC-PASSIVE-P52.md |
| bare cic-bug-bounty.auth0app.com still ERR; manage host 302/login | A pulse | high | AUTH0-CIC-PASSIVE-P52.md |
| RD policy → bugcrowd.com/auth0-okta; bare engagements/auth0 404; auth0-okta+okta 200 | A pulse | high | AUTH0-CIC-PASSIVE-P52.md |
| auth0.auth0.com OIDC discovery 200; bare authorize 400 | A pulse | high | AUTH0-CIC-PASSIVE-P52.md |
| app.intigriti bare 307→www; login/auth/login/programs/profile 200 P53 | B pulse | high | INTI-DROPBOX-OAUTH-P53.md |
| app.intigriti/researcher → /auth/researcher redirect P53 | B pulse | high | INTI-DROPBOX-OAUTH-P53.md |
| login.intigriti OIDC discovery 200; bare login → /account/login P53 | B pulse | high | INTI-DROPBOX-OAUTH-P53.md |
| api.intigriti bare+core 404; external/researcher 400 P53 | B pulse | high | INTI-DROPBOX-OAUTH-P53.md |
| dropbox oauth2/authorize → authorize_error missing_client_id P53 | B pulse | high | INTI-DROPBOX-OAUTH-P53.md |
| dropbox.com/bug-bounty 404; security→/features/security; Inti dropbox 200 | B pulse | high | INTI-DROPBOX-OAUTH-P53.md |
| www.intigriti bug-bounty-programs 308→researchers/...; /bug-bounty 404 | B pulse | med | INTI-DROPBOX-OAUTH-P53.md |
| console.aiven login+signup+account 200; aiven.io/security+developers 404 P54 | A pulse | high | AIVEN-API-DOORS-P54.md |
| api.aiven → /doc/ 200; /v1 bare 404; me+project+userinfo 401 P54 | A pulse | high | AIVEN-API-DOORS-P54.md |
| BC bare engagements/aiven 404; brief 301→/h; /h aiven+brief+ann 200 P54 | A pulse | high | AIVEN-API-DOORS-P54.md |
| tracker.bugcrowd.com/aiven → user/sign_in P54 | A pulse | high | AIVEN-API-DOORS-P54.md |
| docs.aiven.io → aiven.io; help.aiven → docs; status 200 P54 | A pulse | med | AIVEN-API-DOORS-P54.md |
| bughunters report/learn 200; rules → about-this-section; old rules id 404 P55 | B pulse | high | GOOGLE-VRP-OAUTH-P55.md |
| reward-program → rules/6625378258649088 (old 6014… 404) P55 | B pulse | high | GOOGLE-VRP-OAUTH-P55.md |
| appsecurity.google.com bare ERR this tick; use bughunters SSoT P55 | B pulse | med | GOOGLE-VRP-OAUTH-P55.md |
| accounts OIDC discovery 200; userinfo v1/v3 401; token GET 404 P55 | B pulse | high | GOOGLE-VRP-OAUTH-P55.md |
| Drive/Docs → ServiceLogin; g.co/vulnz → bughunters P55 | B pulse | high | GOOGLE-VRP-OAUTH-P55.md |
| id.atlassian/login 202; bare id → /login; Trello → Atlassian id P56 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P56.md |
| trust BB path 404; BC atlassian+openai bare+/h all 200 P56 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P56.md |
| platform.openai 200; /login 403 curl this tick (was 200) P56 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P56.md |
| auth0.openai → chatgpt.com; api.openai 421; v1/models err P56 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P56.md |
| openai policy paths 308→trailing slash (not hard 404) P56 | A pulse | med | ATLASSIAN-OPENAI-DOORS-P56.md |
| api.atlassian.com → developer.atlassian.com; console 200 P56 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P56.md |
| portal.msrc → msrc.microsoft.com update-guide; report/researcher 302 to msrc host P57 | B pulse | high | MSRC-ENTRA-DOORS-P57.md |
| MSRC bounty + OBB online-services pages 200; api.msrc bare 404; cvrf updates 200 P57 | B pulse | high | MSRC-ENTRA-DOORS-P57.md |
| Entra OIDC discovery+authorize 200; Graph me 401; \$metadata 200 P57 | B pulse | high | MSRC-ENTRA-DOORS-P57.md |
| azure/entra/myaccount/admin shells 200; account.microsoft → consumers oauth P57 | B pulse | high | MSRC-ENTRA-DOORS-P57.md |
| openbugbounty.org 403 curl this tick P57 | B pulse | med | MSRC-ENTRA-DOORS-P57.md |
| bugcrowd.com/sign_in bare 404; sign_up → /h/sign_up; programs → engagements P58 | A pulse | high | BC-OKTA-PLATFORM-P58.md |
| login.hackers bare → identity.bugcrowd.com/login/hacker; dual OIDC discovery 200 P58 | A pulse | high | BC-OKTA-PLATFORM-P58.md |
| identity bare 403; /login 200; tracker sign_in 200; api bare 200 v2 404 P58 | A pulse | high | BC-OKTA-PLATFORM-P58.md |
| okta.com/bug-bounty 404; BC okta+auth0-okta 200; short /auth0-okta → engagements P58 | A pulse | high | BC-OKTA-PLATFORM-P58.md |
| developer.okta signup+login.okta+trust+status 200 P58 | A pulse | med | BC-OKTA-PLATFORM-P58.md |
| H1 sign_in/up 403 curl; password/new 200; oauth→sign_in; shopify+gitlab 200 P59 | B pulse | high | H1-GITLAB-DOORS-P59.md |
| api.hackerone bare 200; me+programs 401; docs → /en/ P59 | B pulse | high | H1-GITLAB-DOORS-P59.md |
| gitlab.com → about; sign_in 403; sign_up 200; OIDC+keys 200 P59 | B pulse | high | H1-GITLAB-DOORS-P59.md |
| GitLab api v4/user+version 401; projects list 200 P59 | B pulse | high | H1-GITLAB-DOORS-P59.md |
| BC bare engagements/gitlab 404; /h/engagements/gitlab 200 P59 | B pulse | high | H1-GITLAB-DOORS-P59.md |
| Q-BC bare aiven/auth0/okta-auth0 404; bare okta/auth0-okta/atlassian/openai 200 P60 | A pulse | high | QBC-ENGAGEMENT-SHELLS-P60.md |
| all /h/engagements/{aiven,okta,auth0,auth0-okta,okta-auth0,atlassian,openai} 200 P60 | A pulse | high | QBC-ENGAGEMENT-SHELLS-P60.md |
| bare */brief 301→/h; all programs/* 404; tracker aiven/okta/atl/openai → sign_in P60 | A pulse | high | QBC-ENGAGEMENT-SHELLS-P60.md |
| accounts.shopify.com root+lookup+signup **200** this tick (not 403) P61 | B pulse | high | SHOPIFY-H1-OAUTH-P61.md |
| admin.shopify.com root 200 tiny shell; /store 403 P61 | B pulse | high | SHOPIFY-H1-OAUTH-P61.md |
| partners orgs/signup → accounts OAuth openid+shop.create+org scopes P61 | B pulse | high | SHOPIFY-H1-OAUTH-P61.md |
| accounts.login consolidates to lookup?rid&verify (transient) P61 | B pulse | med | SHOPIFY-H1-OAUTH-P61.md |
| BC bare engagements/shopify 404; /h/engagements/shopify 200 P61 | B pulse | high | SHOPIFY-H1-OAUTH-P61.md |
| shopify.dev/docs/api/admin-rest 200 public; identity.shopify.com 404 P61 | B pulse | high | SHOPIFY-H1-OAUTH-P61.md |
| AUTH-READINESS P61: H1 Shopify MED until human session+asset export | B pulse | high | AUTH-READINESS.md |
| manage.auth0.com → /login → auth0.auth0.com/authorize (openid profile email) P62 | A pulse | high | AUTH0-CIC-DOORS-P62.md |
| CIC manage.login → config.cic-bug-bounty.auth0app.com/authorize P62 | A pulse | high | AUTH0-CIC-DOORS-P62.md |
| bare cic-bug-bounty.auth0app.com ERR; manage host 302 /login P62 | A pulse | high | AUTH0-CIC-DOORS-P62.md |
| auth0.com/responsible-disclosure-policy → bugcrowd.com/auth0-okta P62 | A pulse | high | AUTH0-CIC-DOORS-P62.md |
| blog/responsible-disclosure/ 404 this tick (RD path drift) P62 | A pulse | high | AUTH0-CIC-DOORS-P62.md |
| auth0.com/login + /u/login still 404; /signup 200 P62 | A pulse | high | AUTH0-CIC-DOORS-P62.md |
| AUTH-READINESS P62: Auth0/CIC doors mapped; enroll still human | A pulse | high | AUTH-READINESS.md |
| app.intigriti.com root 307→www; /login+/auth/login 200 P63 | B pulse | high | INTI-DROPBOX-DOORS-P63.md |
| /researcher → /auth/researcher?redirect=… soft gate P63 | B pulse | high | INTI-DROPBOX-DOORS-P63.md |
| Inti dropbox detail 200 remains F4 SSoT P63 | B pulse | high | INTI-DROPBOX-DOORS-P63.md |
| dropbox.com/bug-bounty 404; login/register/developers 200 P63 | B pulse | high | INTI-DROPBOX-DOORS-P63.md |
| oauth2/authorize missing_client_id → authorize_error P63 | B pulse | high | INTI-DROPBOX-DOORS-P63.md |
| api.dropboxapi bare 404; get_current_account 400 unauth P63 | B pulse | high | INTI-DROPBOX-DOORS-P63.md |
| BC bare+/h engagements/dropbox both 200 (Inti still join SSoT) P63 | B pulse | med | INTI-DROPBOX-DOORS-P63.md |
| AUTH-READINESS P63: F4 Inti doors stable; human join; XOR H2 park | B pulse | high | AUTH-READINESS.md |
| console.aiven.io login+signup+root 200 SPA shells P64 | A pulse | high | AIVEN-API-DOORS-P64.md |
| api.aiven.io → /doc/ 200; /v1 bare 404; /v1/me+/v1/project 401 P64 | A pulse | high | AIVEN-API-DOORS-P64.md |
| aiven.io/security 404; BC /h/engagements/aiven SSoT P64 | A pulse | high | AIVEN-API-DOORS-P64.md |
| bare engagements/aiven 404; brief 301→/h; programs/aiven 404 P64 | A pulse | high | AIVEN-API-DOORS-P64.md |
| tracker.bugcrowd.com/aiven → sign_in P64 | A pulse | high | AIVEN-API-DOORS-P64.md |
| docs.aiven.io → aiven.io; help → docs chain P64 | A pulse | med | AIVEN-API-DOORS-P64.md |
| AUTH-READINESS P64: Aiven doors stable; free-tier+BC human | A pulse | high | AUTH-READINESS.md |
| msrc.microsoft.com/report + /report/vulnerability/new 200 submit SSoT P65 | B pulse | high | MSRC-ENTRA-DOORS-P65.md |
| create-report → /report/vulnerability/new; portal.msrc → update-guide P65 | B pulse | high | MSRC-ENTRA-DOORS-P65.md |
| portal en-us researcher/report rewrite then msrc en-us paths 404 P65 | B pulse | high | MSRC-ENTRA-DOORS-P65.md |
| OBB bounty + bounty-online-services 200; api.msrc bare 404; cvrf updates 200 P65 | B pulse | high | MSRC-ENTRA-DOORS-P65.md |
| Entra OIDC discovery+authorize 200; Graph /me 401; $metadata 200 P65 | B pulse | high | MSRC-ENTRA-DOORS-P65.md |
| account.microsoft.com → consumers oauth; azure/admin/myaccount shells 200 P65 | B pulse | med | MSRC-ENTRA-DOORS-P65.md |
| AUTH-READINESS P65: F2 submit SSoT stable; profile-on-submit human | B pulse | high | AUTH-READINESS.md |
| okta.com/bug-bounty + company/trust 404; trust+status+security.okta 200 P66 | A pulse | high | OKTA-PRODUCT-DOORS-P66.md |
| BC bare engagements/okta + auth0-okta 200; programs/okta 404 P66 | A pulse | high | OKTA-PRODUCT-DOORS-P66.md |
| /h okta + brief 200; tracker/okta → sign_in P66 | A pulse | high | OKTA-PRODUCT-DOORS-P66.md |
| bugcrowd sign_in → identity/login?user_hint=researcher P66 | A pulse | high | OKTA-PRODUCT-DOORS-P66.md |
| identity.bugcrowd.com bare 403; login.hackers OIDC discovery 200 P66 | A pulse | high | OKTA-PRODUCT-DOORS-P66.md |
| developer.okta + login.okta 200 public shells P66 | A pulse | med | OKTA-PRODUCT-DOORS-P66.md |
| AUTH-READINESS P66: Okta BC SSoT; enroll human | A pulse | high | AUTH-READINESS.md |
| bughunters report+learn+VRP rules 200; rules index 301 P67 | B pulse | high | GOOGLE-VRP-DOORS-P67.md |
| g.co/vulnz + appserve/security-bugs → bughunters P67 | B pulse | high | GOOGLE-VRP-DOORS-P67.md |
| appsecurity.google.com ERR this tick (not SSoT) P67 | B pulse | high | GOOGLE-VRP-DOORS-P67.md |
| oauth2 userinfo 401; token endpoint GET 404 P67 | B pulse | high | GOOGLE-VRP-DOORS-P67.md |
| Drive/Docs unauth → accounts ServiceLogin P67 | B pulse | high | GOOGLE-VRP-DOORS-P67.md |
| AUTH-READINESS P67: F1 VRP doors stable; Google session human | B pulse | high | AUTH-READINESS.md |
| id.atlassian login/signup 202; Trello+BB → Atlassian id P68 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P68.md |
| trust BB path 404; BC atlassian bare+/h+/brief 200 P68 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P68.md |
| openai policies BB 404; security → security-and-privacy 200 P68 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P68.md |
| platform.openai login 200; auth0.openai → chatgpt.com P68 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P68.md |
| api.openai bare 421; /v1/models 401 unauth P68 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P68.md |
| BC openai bare+/h+/brief 200; tracker atlassian+openai → sign_in P68 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P68.md |
| AUTH-READINESS P68: Atlassian+OpenAI BC SSoT; enroll human | A pulse | high | AUTH-READINESS.md |
| proton.me/security/bug-bounty 200 F3 SSoT; /security + support BB path 404 P69 | B pulse | high | PROTON-F3-DOORS-P69.md |
| account.proton login+signup 200 dual free doors P69 | B pulse | high | PROTON-F3-DOORS-P69.md |
| mail/drive/calendar.proton.me 200 product shells P69 | B pulse | high | PROTON-F3-DOORS-P69.md |
| api.proton.me ERR; mail-api 404 P69 | B pulse | med | PROTON-F3-DOORS-P69.md |
| BC bare proton 404; /h soft-200; H1/proton 404 P69 | B pulse | high | PROTON-F3-DOORS-P69.md |
| AUTH-READINESS P69: F3 first-party BB; dual free accounts human | B pulse | high | AUTH-READINESS.md |
| BC sign_in → identity/login?user_hint=researcher; sign_up → login.bugcrowd register P70 | A pulse | high | BC-PLATFORM-OIDC-P70.md |
| login.hackers root → identity/login/hacker; OIDC discovery root+default 200 P70 | A pulse | high | BC-PLATFORM-OIDC-P70.md |
| identity bare 403; /login 200; tracker sign_in 200 P70 | A pulse | high | BC-PLATFORM-OIDC-P70.md |
| programs → engagements; api bare 200 /v2 404 P70 | A pulse | high | BC-PLATFORM-OIDC-P70.md |
| ninja-email docs path 200; using-email-aliases + docs/api/ 404 P70 | A pulse | high | BC-PLATFORM-OIDC-P70.md |
| docs api/getting-started 200 API SSoT P70 | A pulse | high | BC-PLATFORM-OIDC-P70.md |
| AUTH-READINESS P70: BC platform OIDC chain mapped; enroll human | A pulse | high | AUTH-READINESS.md |
| H1 sign_in/up 403 curl; password/new 200; oauth→sign_in; shopify+gitlab SPA 200 P71 | B pulse | high | H1-GITLAB-DOORS-P71.md |
| H1 users/auth/google_oauth2+github 404; directory+opportunities 200 P71 | B pulse | high | H1-GITLAB-DOORS-P71.md |
| api.hackerone bare 200; me+hackers/me+programs 401; docs→/en/ 200 P71 | B pulse | high | H1-GITLAB-DOORS-P71.md |
| gitlab.com→about; sign_in 403; sign_up 200; OIDC+keys 200 P71 | B pulse | high | H1-GITLAB-DOORS-P71.md |
| GitLab api v4/user+version 401; projects list 200; disclosure 200 P71 | B pulse | high | H1-GITLAB-DOORS-P71.md |
| BC bare engagements/gitlab 404; /h+brief 200; programs 404; tracker→sign_in P71 | B pulse | high | H1-GITLAB-DOORS-P71.md |
| AUTH-READINESS P71: H1 doors stable; H2 park vs F4; Shopify MED human | B pulse | high | AUTH-READINESS.md |
| manage.auth0 → /login → auth0.auth0.com/authorize (openid profile email PKCE) P72 | A pulse | high | AUTH0-CIC-DOORS-P72.md |
| CIC manage → config.cic-bug-bounty.auth0app.com/authorize; apex ERR P72 | A pulse | high | AUTH0-CIC-DOORS-P72.md |
| RD policy → bugcrowd.com/auth0-okta; blog RD still 404 P72 | A pulse | high | AUTH0-CIC-DOORS-P72.md |
| bare engagements auth0+okta-auth0 404; auth0-okta 200 P72 | A pulse | high | AUTH0-CIC-DOORS-P72.md |
| /h auth0+auth0-okta+okta-auth0 + briefs 200; programs/auth0 404 P72 | A pulse | high | AUTH0-CIC-DOORS-P72.md |
| tracker auth0+auth0-okta → sign_in; identity login + hackers OIDC 200 P72 | A pulse | med | AUTH0-CIC-DOORS-P72.md |
| AUTH-READINESS P72: Auth0/CIC doors stable; enroll human | A pulse | high | AUTH-READINESS.md |
| app.intigriti root 307→www; login+auth/login 200 P73 | B pulse | high | INTI-DROPBOX-DOORS-P73.md |
| /researcher → auth/researcher → login.intigriti.com/connect/authorize bff-init P73 | B pulse | high | INTI-DROPBOX-DOORS-P73.md |
| Inti dropbox detail 200 F4 SSoT; programs catalog 200 P73 | B pulse | high | INTI-DROPBOX-DOORS-P73.md |
| dropbox.com/bug-bounty 404; login/register/developers 200 P73 | B pulse | high | INTI-DROPBOX-DOORS-P73.md |
| oauth2/authorize missing_client_id; api bare 404; get_current_account 400 P73 | B pulse | high | INTI-DROPBOX-DOORS-P73.md |
| BC bare+/h dropbox 200; programs 404; tracker→sign_in; H1 dropbox 404 P73 | B pulse | high | INTI-DROPBOX-DOORS-P73.md |
| AUTH-READINESS P73: F4 Inti doors stable; human join; XOR H2 park | B pulse | high | AUTH-READINESS.md |
| console.aiven login+signup+root 200 SPA shells P74 | A pulse | high | AIVEN-API-DOORS-P74.md |
| api.aiven → /doc/ 200; /v1 bare 404; /v1/me+/v1/project 401 P74 | A pulse | high | AIVEN-API-DOORS-P74.md |
| aiven.io/security 404; docs→aiven.io; help→docs chain P74 | A pulse | med | AIVEN-API-DOORS-P74.md |
| BC bare engagements/aiven 404; /h+brief 200; bare brief→/h P74 | A pulse | high | AIVEN-API-DOORS-P74.md |
| programs/aiven 404; tracker/aiven → sign_in; identity login 200 P74 | A pulse | high | AIVEN-API-DOORS-P74.md |
| AUTH-READINESS P74: Aiven doors stable; free-tier+BC human | A pulse | high | AUTH-READINESS.md |
| msrc report + /report/vulnerability/new 200 submit SSoT P75 | B pulse | high | MSRC-ENTRA-DOORS-P75.md |
| create-report → vulnerability/new; portal.msrc → update-guide P75 | B pulse | high | MSRC-ENTRA-DOORS-P75.md |
| OBB bounty + bounty-online-services 200; api.msrc bare 404; cvrf 200 P75 | B pulse | high | MSRC-ENTRA-DOORS-P75.md |
| Entra OIDC discovery+authorize 200; Graph /me 401; $metadata 200 P75 | B pulse | high | MSRC-ENTRA-DOORS-P75.md |
| account.microsoft → consumers oauth; azure/admin/myaccount shells 200 P75 | B pulse | med | MSRC-ENTRA-DOORS-P75.md |
| AUTH-READINESS P75: F2 submit SSoT stable; profile-on-submit human | B pulse | high | AUTH-READINESS.md |
| okta.com/bug-bounty + company/trust 404; trust+status+security.okta 200 P76 | A pulse | high | OKTA-PRODUCT-DOORS-P76.md |
| BC bare engagements/okta + auth0-okta 200; okta-auth0 404; programs 404 P76 | A pulse | high | OKTA-PRODUCT-DOORS-P76.md |
| /h okta + auth0-okta + briefs 200; tracker/okta → sign_in P76 | A pulse | high | OKTA-PRODUCT-DOORS-P76.md |
| bugcrowd sign_in → identity/login?user_hint=researcher P76 | A pulse | high | OKTA-PRODUCT-DOORS-P76.md |
| developer.okta + login.okta 200; hackers OIDC 200 P76 | A pulse | med | OKTA-PRODUCT-DOORS-P76.md |
| AUTH-READINESS P76: Okta BC SSoT; enroll human | A pulse | high | AUTH-READINESS.md |
| bughunters report+learn+VRP rules 200; rules index 301 P77 | B pulse | high | GOOGLE-VRP-DOORS-P77.md |
| g.co/vulnz + appserve/security-bugs → bughunters P77 | B pulse | high | GOOGLE-VRP-DOORS-P77.md |
| appsecurity.google.com ERR this tick (not SSoT) P77 | B pulse | high | GOOGLE-VRP-DOORS-P77.md |
| oauth2 userinfo 401; token endpoint GET 404 P77 | B pulse | high | GOOGLE-VRP-DOORS-P77.md |
| Drive/Docs unauth → accounts ServiceLogin P77 | B pulse | high | GOOGLE-VRP-DOORS-P77.md |
| AUTH-READINESS P77: F1 VRP doors stable; Google session human | B pulse | high | AUTH-READINESS.md |
| id.atlassian login/signup 202; trust BB path 404; BC atlassian bare+/h+/brief 200 P78 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P78.md |
| openai policies BB program 404 after slash; security→security-and-privacy 200 P78 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P78.md |
| platform.openai login 403 curl (was 200 P68); auth0.openai → chatgpt P78 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P78.md |
| api.openai bare 421; /v1/models 401; BC openai bare+/h+/brief 200 P78 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P78.md |
| tracker atlassian+openai → sign_in P78 | A pulse | med | ATLASSIAN-OPENAI-DOORS-P78.md |
| AUTH-READINESS P78: Atlassian+OpenAI BC SSoT; enroll human | A pulse | high | AUTH-READINESS.md |
| proton.me/security/bug-bounty 200 F3 SSoT; /security + support BB path 404 P79 | B pulse | high | PROTON-F3-DOORS-P79.md |
| account.proton login+signup 200 dual free doors P79 | B pulse | high | PROTON-F3-DOORS-P79.md |
| mail/drive/calendar.proton.me 200 product shells P79 | B pulse | high | PROTON-F3-DOORS-P79.md |
| api.proton.me ERR; mail-api 404 P79 | B pulse | med | PROTON-F3-DOORS-P79.md |
| BC bare proton 404; /h soft-200; H1/proton 404 P79 | B pulse | high | PROTON-F3-DOORS-P79.md |
| AUTH-READINESS P79: F3 first-party BB; dual free accounts human | B pulse | high | AUTH-READINESS.md |
| BC sign_in → identity/login?user_hint=researcher; sign_up → login.bugcrowd register P80 | A pulse | high | BC-PLATFORM-OIDC-P80.md |
| login.hackers root → identity/login/hacker; OIDC discovery root+default 200 P80 | A pulse | high | BC-PLATFORM-OIDC-P80.md |
| identity bare 403; /login 200; tracker sign_in 200 P80 | A pulse | high | BC-PLATFORM-OIDC-P80.md |
| programs → engagements; api bare 200 /v2 404 P80 | A pulse | high | BC-PLATFORM-OIDC-P80.md |
| ninja-email docs path 200; using-email-aliases + docs/api/ 404 P80 | A pulse | high | BC-PLATFORM-OIDC-P80.md |
| docs api/getting-started 200 API SSoT P80 | A pulse | high | BC-PLATFORM-OIDC-P80.md |
| AUTH-READINESS P80: BC platform OIDC chain mapped; enroll human | A pulse | high | AUTH-READINESS.md |
| gitlab.com/users/sign_up returns 400 to curl (was 200 @ P71) | B pulse | high | H1-GITLAB-DOORS-P81.md |
| H1+GitLab OIDC/JWKS + program SPA shells stable P81; sign_up hardening only material delta | B pulse | high | H1-GITLAB-DOORS-P81.md |
| api.aiven.io/v1/me|project|userinfo HEAD 405 / GET 401 unauth | A pulse | high | AIVEN-API-DOORS-P82.md |
| Aiven console login+signup + BC /h/engagements/aiven stable 200 P82 | A pulse | high | AIVEN-API-DOORS-P82.md |
| api.msrc.microsoft.com/cvrf/v3.0/updates HEAD 405 / GET 200 public | B pulse | high | MSRC-ENTRA-DOORS-P83.md |
| portal.msrc /en-us/researcher → msrc path 404; submit SSoT remains /report/vulnerability/new | B pulse | high | MSRC-ENTRA-DOORS-P83.md |
| www.okta.com/security redirects to trust.okta.com (company/trust still 404) | A pulse | high | OKTA-PRODUCT-DOORS-P84.md |
| BC engagements/okta + auth0-okta bare and /h shells still 200 P84 | A pulse | high | OKTA-PRODUCT-DOORS-P84.md |
| accounts.google.com OIDC discovery 200; bughunters VRP hub/report/rules 200 P85 | B pulse | high | GOOGLE-VRP-DOORS-P85.md |
| Legacy google.com/about/appsecurity/reward-program → bughunters rules | B pulse | high | GOOGLE-VRP-DOORS-P85.md |
| platform.openai.com/login HEAD 200 / GET 403 method-sensitive curl gate | A pulse | high | ATLASSIAN-OPENAI-DOORS-P86.md |
| openai.com/security/ 403; security-and-privacy/ 200; BB policy path still 404 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P86.md |
| Bitbucket+Trello login hop to id.atlassian.com P86 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P86.md |
| Proton F3 SSoT stable P87: security/bug-bounty + account login/signup 200 | B pulse | high | PROTON-F3-DOORS-P87.md |
| Proton unauth API sample paths return 400 (domains/available, users) | B pulse | med | PROTON-F3-DOORS-P87.md |
| BC ninja email SSoT participating-in-program P88 (onboarding path 404) | A pulse | high | BC-PLATFORM-OIDC-P88.md |
| BC OIDC login.hackers discovery + oauth2/default still 200; sign_in→identity researcher | A pulse | high | BC-PLATFORM-OIDC-P88.md |
| gitlab.com/users/sign_up HEAD 400 / GET 200 method-sensitive (P89) | B pulse | high | H1-GITLAB-DOORS-P89.md |
| H1 gitlab/shopify SPA + API me 401 + GitLab OIDC stable P89 | B pulse | high | H1-GITLAB-DOORS-P89.md |
| Aiven doors stable P90: console 200; API HEAD 405/GET 401; BC /h aiven 200 | A pulse | high | AIVEN-API-DOORS-P90.md |

| login.microsoftonline.com GET 302→office.com/login#; HEAD 200; Graph HEAD 405 on /me+$metadata | B pulse | med | MSRC-ENTRA-DOORS-P91.md |
| msrc submit SSoT + OBB + CVRF HEAD405/GET200 stable P91 | B pulse | high | MSRC-ENTRA-DOORS-P91.md |

| login.okta.com OIDC well-known 200; www.okta.com well-known 404 P92 | A pulse | high | OKTA-PRODUCT-DOORS-P92.md |
| BC engagements okta+auth0-okta 200 SSoT; programs/okta 404 stable P92 | A pulse | high | OKTA-PRODUCT-DOORS-P92.md |

| proton.me/pass + pass.proton.me 200 Pass product doors P93 | B pulse | med | PROTON-F3-DOORS-P93.md |
| F3 BB SSoT + free login/signup 200; API samples 400/404 unauth stable P93 | B pulse | high | PROTON-F3-DOORS-P93.md |

| OpenAI platform+login HEAD/GET 403 bot gate; BC openai 200 SSoT P94 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P94.md |
| Atlassian IdP login/signup 202; BC atlassian 200; trust BB 404 stable P94 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P94.md |

| Google oauth2/v2/auth 302 + JWKS certs 200; VRP rules SSoT 200 P95 | B pulse | high | GOOGLE-VRP-DOORS-P95.md |
| admin.google HEAD 204 / GET 302; Drive/Docs ServiceLogin stable P95 | B pulse | med | GOOGLE-VRP-DOORS-P95.md |

| CIC config.cic-bug-bounty OIDC discovery 200 P96 | A pulse | high | AUTH0-CIC-DOORS-P96.md |
| BC auth0-okta 200 SSoT; bare auth0 404; manage→UL authorize stable P96 | A pulse | high | AUTH0-CIC-DOORS-P96.md |

| login.intigriti.com OIDC HEAD 405 / GET 200; auth/researcher HEAD200/GET302 P97 | B pulse | high | INTI-DROPBOX-DOORS-P97.md |
| Inti dropbox detail 200 F4 SSoT; Dropbox BB 404; API unauth 400; H1 404 P97 | B pulse | high | INTI-DROPBOX-DOORS-P97.md |

| BC OIDC login.hackers 200; identity/login 200; bare /h 404 P98 | A pulse | high | BC-PLATFORM-OIDC-P98.md |
| docs ninja+API SSoT 200; onboarding ninja 404 stable P98 | A pulse | high | BC-PLATFORM-OIDC-P98.md |

| hackerone.com OIDC well-known 200; login curl 403; SPA gitlab/shopify 200 P99 | B pulse | high | H1-GITLAB-DOORS-P99.md |
| GitLab OIDC+JWKS 200; sign_up HEAD400/GET200; public projects 200 P99 | B pulse | high | H1-GITLAB-DOORS-P99.md |

| console.aiven.io OIDC well-known 200; login/signup 200 P100 | A pulse | high | AIVEN-API-DOORS-P100.md |
| api.aiven v1/me HEAD405/GET401; BC /h aiven 200 SSoT stable P100 | A pulse | high | AIVEN-API-DOORS-P100.md |

| Set5 oktapreview OIDC well-known 200; api/v1/users/me 403 unauth P101 | A pulse | high | OKTA-PRODUCT-DOORS-P101.md |
| BC okta+auth0-okta SSoT 200; bare auth0 404; login.okta OIDC 200; Set5 hop 302 P101 | A pulse | high | OKTA-PRODUCT-DOORS-P101.md |

| auth.atlassian.com OIDC well-known 200; id login 202; BC atlassian/openai SSoT 200 P102 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P102.md |
| api.openai v1/models 401; platform 403 curl; auth0.openai→chatgpt 302 P102 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P102.md |

| AAD common OIDC v1+v2 200; graph /v1.0/me HEAD405/GET401; MSRC report 200 P103 | B pulse | high | MSRC-ENTRA-DOORS-P103.md |
| BC /h microsoft soft-200 bare 404; H1 microsoft 404; security→AAD authorize P103 | B pulse | high | MSRC-ENTRA-DOORS-P103.md |

| CIC config OIDC 200; manage→config authorize; auth0.auth0 OIDC 200 P104 | A pulse | high | AUTH0-CIC-DOORS-P104.md |
| BC auth0-okta 200 SSoT; bare auth0 404; RD→BC 308; CIC apex 000 P104 | A pulse | high | AUTH0-CIC-DOORS-P104.md |

| bughunters VRP 200; accounts OIDC 200; googleapis JWKS 200; g.co/vulnz→VRP P105 | B pulse | high | GOOGLE-VRP-DOORS-P105.md |
| H1 google 200; googlevrp 404; BC bare 404 /h soft 200; admin sorry gate P105 | B pulse | high | GOOGLE-VRP-DOORS-P105.md |

| BC login.hackers OIDC 200; identity/login 200; sign_in researcher hop P106 | A pulse | high | BC-PLATFORM-OIDC-P106.md |
| Docs legacy researcher paths 404; new SSoT welcome+api/getting-started P106 | A pulse | high | BC-PLATFORM-OIDC-P106.md |

| account.proton OIDC 200; login/signup 200; BB policy 200 P107 | B pulse | high | PROTON-F3-DOORS-P107.md |
| Inti app/programs/proton 200 SSoT; H1/BC bare 404; /h soft 200 P107 | B pulse | high | PROTON-F3-DOORS-P107.md |

| console.aiven OIDC 200; login/signup 200; api me 405/401 P108 | A pulse | high | AIVEN-API-DOORS-P108.md |
| BC aiven-mbb-og 200 SSoT; bare aiven 404; /h aiven soft 200 P108 | A pulse | high | AIVEN-API-DOORS-P108.md |

| H1 OIDC 200; api/v1/me 401; SPA gitlab/shopify 200; login curl 403 P109 | B pulse | high | H1-GITLAB-DOORS-P109.md |
| GitLab OIDC+JWKS 200; sign_up 400/200; public projects 200 P109 | B pulse | high | H1-GITLAB-DOORS-P109.md |

| login.okta OIDC 200; Set5 OIDC 200 me 403; BC okta+auth0-okta 200 P110 | A pulse | high | OKTA-PRODUCT-DOORS-P110.md |
| First-party bug-bounty 404; programs/okta 404; tracker sign_in hop P110 | A pulse | high | OKTA-PRODUCT-DOORS-P110.md |

| H1 shopify SPA 200; OIDC 200; api me/hackers/me 401; login curl 403 P111 | B pulse | high | SHOPIFY-H1-OAUTH-P111.md |
| accounts+admin.shopify 403 curl (was 200 P61); partners OAuth 302; BC /h shopify 200 P111 | B pulse | high | SHOPIFY-H1-OAUTH-P111.md |

| auth.atlassian OIDC 200; id login/signup 202; BC atlassian 200; trust BB 404 P112 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P112.md |
| platform.openai HEAD200/GET403; api models 401; BC openai 200; H1 openai/atlassian 200 P112 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P112.md |

| AAD common OIDC v1+v2 200; graph /v1.0/me 405/401; MSRC report 200 P113 | B pulse | high | MSRC-ENTRA-DOORS-P113.md |
| BC /h microsoft 200 bare 404; H1 microsoft 404; security→AAD authorize P113 | B pulse | high | MSRC-ENTRA-DOORS-P113.md |

| CIC config.auth0app OIDC 200; manage→authorize; prod auth0.auth0 OIDC 200 P114 | A pulse | high | AUTH0-CIC-DOORS-P114.md |
| BC auth0-okta+okta 200 SSoT; bare auth0 404; RD→BC 308; cic apex 000 P114 | A pulse | high | AUTH0-CIC-DOORS-P114.md |

| bughunters VRP 200; accounts OIDC 200; googleapis JWKS 200; g.co/vulnz→VRP P115 | B pulse | high | GOOGLE-VRP-DOORS-P115.md |
| H1 google 200; googlevrp 404; BC bare 404 /h soft 200; admin sorry gate P115 | B pulse | high | GOOGLE-VRP-DOORS-P115.md |

| login.bugcrowd.com OIDC 200 SSoT; login.hackers.bugcrowd.net 000 this tick P116 | A pulse | high | BC-PLATFORM-OIDC-P116.md |
| identity/login 200; sign_in researcher hop; bare /h 404; /h/engagements 200 P116 | A pulse | high | BC-PLATFORM-OIDC-P116.md |
