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

| account.proton OIDC 200; login/signup 200; BB policy 200 P117 | B pulse | high | PROTON-F3-DOORS-P117.md |
| Inti app/programs/proton 200 SSoT; H1/BC bare 404; /h soft 200 P117 | B pulse | high | PROTON-F3-DOORS-P117.md |

| console.aiven OIDC 200; login/signup 200; api me 405/401 P118 | A pulse | high | AIVEN-API-DOORS-P118.md |
| BC aiven-mbb-og 200 SSoT; bare aiven 404; /h aiven soft 200 P118 | A pulse | high | AIVEN-API-DOORS-P118.md |

| H1 OIDC 200; api/v1/me 401; SPA gitlab/shopify 200; login curl 403 P119 | B pulse | high | H1-GITLAB-DOORS-P119.md |
| GitLab OIDC+JWKS 200; sign_in 403/403; sign_up 400/200; public projects 200 P119 | B pulse | high | H1-GITLAB-DOORS-P119.md |

| login.okta OIDC 200; Set5 OIDC 200 me 403; BC okta+auth0-okta 200 P120 | A pulse | high | OKTA-PRODUCT-DOORS-P120.md |
| First-party bug-bounty 404; programs/okta 404; tracker sign_in hop P120 | A pulse | high | OKTA-PRODUCT-DOORS-P120.md |
| auth0.com/login 404; /signup 200; manage→auth0.auth0.com/authorize | B pulse | high | AUTH0-PRODUCT-DOORS-P121 |
| BC engagements/auth0 + okta-auth0 404; auth0-okta + okta 200 SSoT | B pulse | high | AUTH0-PRODUCT-DOORS-P121 |
| auth0 RD policy 308→bugcrowd.com/auth0-okta; security→security.okta.com | B pulse | high | AUTH0-PRODUCT-DOORS-P121 |
| auth0.auth0.com OIDC discovery+jwks 200; dpop ES256; token GET 404 | B pulse | high | AUTH0-PRODUCT-DOORS-P121 |
| manage.cic-bug-bounty.auth0app.com / → /login 302; bare cic host ERR | B pulse | med | AUTH0-PRODUCT-DOORS-P121 |
| BC programs→engagements; sign_in→identity.bugcrowd.com; identity bare 403 | A pulse | high | BC-PLATFORM-OIDC-P122 |
| login.hackers OIDC root+oauth2/default discovery+keys 200; PKCE S256 | A pulse | high | BC-PLATFORM-OIDC-P122 |
| login.bugcrowd.com/register 404; sign_up 301→/signin/register path drift | A pulse | med | BC-PLATFORM-OIDC-P122 |
| api.bugcrowd.com bare 200 /v2 404; docs/api 404; ninja-email path 200 | A pulse | high | BC-PLATFORM-OIDC-P122 |
| BC engagements okta+auth0-okta+atlassian+openai 200; aiven 404 this tick | A pulse | high | BC-PLATFORM-OIDC-P122 |
| shopify.com/bugbounty 200; /bug-bounty 404; H1 shopify+policy_scopes 200 | B pulse | high | SHOPIFY-H1-OAUTH-P123 |
| accounts/admin.shopify.com 403 curl; partners signup/orgs→accounts OAuth | B pulse | high | SHOPIFY-H1-OAUTH-P123 |
| H1 sign_in/sign_up 403 curl; password/new 200; api bare 200 me/programs 401 | B pulse | high | SHOPIFY-H1-OAUTH-P123 |
| partners.shopify.com home 301→www.shopify.com/partners; checkout bare 404 | B pulse | med | SHOPIFY-H1-OAUTH-P123 |
| Atlassian trust BB path 404; BC engagements/atlassian 200 SSoT | A pulse | high | ATLASSIAN-OPENAI-DOORS-P124 |
| id.atlassian.com/login 202; trello→id; auth→id; dev console 200 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P124 |
| BC openai 200; openai security 403 curl; policy paths 308 trailing-slash | A pulse | med | ATLASSIAN-OPENAI-DOORS-P124 |
| auth0.openai.com OIDC discovery 404; host 302→chatgpt; api root 421 models 401 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P124 |
| platform.openai.com 200; /login 403; chatgpt.com 403 curl this tick | A pulse | med | ATLASSIAN-OPENAI-DOORS-P124 |
| bughunters.google.com 200; g.co/vulnz→bughunters; VRP rules path 301 rename | B pulse | high | GOOGLE-VRP-DOORS-P125 |
| accounts.google OIDC 200; ServiceLogin→v3/signin; Drive/Docs→login | B pulse | high | GOOGLE-VRP-DOORS-P125 |
| H1 google 200; googlevrp 404; appsecurity reward→bughunters rules | B pulse | high | GOOGLE-VRP-DOORS-P125 |
| admin.google.com unauth→sorry/captcha; oauth2/googleapis bare 404 | B pulse | med | GOOGLE-VRP-DOORS-P125 |
| console.aiven.io + login/signup 200; status 200; api root→/doc | A pulse | high | AIVEN-API-DOORS-P126 |
| api.aiven.io/v1 bare 404; /v1/me project userinfo 401 unauth | A pulse | high | AIVEN-API-DOORS-P126 |
| BC engagements/aiven + /aiven 404; engagements?search=aiven 200 shell | A pulse | high | AIVEN-API-DOORS-P126 |
| aiven.io/security(+bug-bounty) 404; auth/identity/mbb-og hosts ERR this tick | A pulse | med | AIVEN-API-DOORS-P126 |
| portal.msrc root/en-us → msrc update-guide; researcher/report → msrc.microsoft.com | B pulse | high | MSRC-ENTRA-DOORS-P127 |
| microsoft.com/msrc + bounty 200; opensource path 404; cvrf updates 200 | B pulse | high | MSRC-ENTRA-DOORS-P127 |
| Entra common v2 OIDC discovery 200; azure/entra portals 200 unauth shell | B pulse | high | MSRC-ENTRA-DOORS-P127 |
| account.microsoft → consumers OAuth authorize; login.ms → office.com/login | B pulse | med | MSRC-ENTRA-DOORS-P127 |
| BC okta+auth0-okta 200; first-party bug-bounty/trust paths 404; trust.okta 200 | A pulse | high | OKTA-PRODUCT-DOORS-P128 |
| login.okta OIDC discovery 200; hackers.bugcrowd OIDC 200 | A pulse | high | OKTA-PRODUCT-DOORS-P128 |
| Set5 org host 200; admin → /admin/sso/oidc-entry; users/me 403 | A pulse | high | OKTA-PRODUCT-DOORS-P128 |
| Set5 .well-known/openid-configuration now 403 (was 200 P120) | A pulse | high | OKTA-PRODUCT-DOORS-P128 delta |
| proton.me/security/bug-bounty 200 SSoT; /security and support BB path 404 | B pulse | high | PROTON-F3-DOORS-P129 |
| account login/signup + mail/drive/calendar/pass shells 200 | B pulse | high | PROTON-F3-DOORS-P129 |
| account.proton.me OIDC well-known 200; api.protonmail.ch + mail-api 404 | B pulse | med | PROTON-F3-DOORS-P129 |
| Inti researcher/programs/proton → auth redirect; www→app programs/proton | B pulse | high | PROTON-F3-DOORS-P129 |
| manage.cic-bug-bounty → /login → config.cic-bug-bounty.auth0app.com/authorize | A pulse | high | AUTH0-CIC-DOORS-P130 |
| bare cic-bug-bounty.auth0app.com ERR; cic.us.auth0.com OIDC 404 | A pulse | high | AUTH0-CIC-DOORS-P130 |
| BC auth0-okta 200; engagements/auth0 404; /auth0-okta → engagements | A pulse | high | AUTH0-CIC-DOORS-P130 |
| manage.auth0.com → auth0.auth0.com/authorize; product OIDC 200; login 404 | A pulse | high | AUTH0-CIC-DOORS-P130 |

| H1 www 200; OIDC+oauth-as 200; sign_in/up 403; password/new 200 P131 | B pulse | high | H1-GITLAB-DOORS-P131.md |
| H1 api bare 200 me/programs 401; gitlab/shopify/google SPA 200 P131 | B pulse | high | H1-GITLAB-DOORS-P131.md |
| GitLab OIDC+JWKS 200; sign_in 403; sign_up 200; api projects 200 user 401 P131 | B pulse | high | H1-GITLAB-DOORS-P131.md |
| handbook BB → projects.gitlab.io/auth SSO; BC bare gitlab 404 /h soft 200 P131 | B pulse | high | H1-GITLAB-DOORS-P131.md |

| login.bugcrowd.com OIDC root+oauth2/default+keys 200 SSoT P132 | A pulse | high | BC-PLATFORM-OIDC-P132.md |
| sign_in→identity login 200; identity bare 403; sign_up→signin/register P132 | A pulse | high | BC-PLATFORM-OIDC-P132.md |
| login.hackers.bugcrowd.net OIDC suite ERR this tick (was 200 P122) | A pulse | high | BC-PLATFORM-OIDC-P132.md delta |
| engagements okta+auth0-okta+atlassian+openai 200; aiven 404; programs→engagements | A pulse | high | BC-PLATFORM-OIDC-P132.md |

| shopify.com/bugbounty 200; /bug-bounty 404; H1 shopify+policy_scopes 200 P133 | B pulse | high | SHOPIFY-H1-OAUTH-P133.md |
| accounts/admin 403 curl; partners signup/orgs→accounts OAuth authorize P133 | B pulse | high | SHOPIFY-H1-OAUTH-P133.md |
| H1 sign_in/up 403; password/new 200; api me/programs 401; OIDC 200 P133 | B pulse | high | SHOPIFY-H1-OAUTH-P133.md |
| BC engagements/shopify 404; /h soft 200; help.shopify 403 this tick P133 | B pulse | med | SHOPIFY-H1-OAUTH-P133.md |

| BC okta+auth0-okta 200; first-party bug-bounty 404; trust/security 200 P134 | A pulse | high | OKTA-PRODUCT-DOORS-P134.md |
| login.okta OIDC 200; www OIDC 404; developer signup 200 P134 | A pulse | high | OKTA-PRODUCT-DOORS-P134.md |
| Set5 org 200; OIDC discovery still 403; admin→oidc-entry; users/me 403 P134 | A pulse | high | OKTA-PRODUCT-DOORS-P134.md |
| programs/okta 404; tracker→sign_in; /h soft 200 P134 | A pulse | med | OKTA-PRODUCT-DOORS-P134.md |

| bughunters 200; g.co/vulnz→VRP; rules path 301 rename P135 | B pulse | high | GOOGLE-VRP-DOORS-P135.md |
| accounts OIDC 200; JWKS 200; ServiceLogin→v3/signin P135 | B pulse | high | GOOGLE-VRP-DOORS-P135.md |
| H1 google 200; googlevrp 404; BC bare 404 /h soft 200 P135 | B pulse | high | GOOGLE-VRP-DOORS-P135.md |
| admin.google→sorry; Drive/Docs→login; oauth2 bare 404 P135 | B pulse | med | GOOGLE-VRP-DOORS-P135.md |

| console.aiven OIDC+login/signup 200; status 200 P136 | A pulse | high | AIVEN-API-DOORS-P136.md |
| api root→doc; /v1 404; me/project/userinfo 401 P136 | A pulse | high | AIVEN-API-DOORS-P136.md |
| BC aiven-mbb-og 200 SSoT; bare aiven 404; /h soft+search 200 P136 | A pulse | high | AIVEN-API-DOORS-P136.md |
| aiven.io security BB paths 404; auth/identity hosts ERR P136 | A pulse | med | AIVEN-API-DOORS-P136.md |

| proton.me/security/bug-bounty 200 SSoT; /security and support BB 404 P137 | B pulse | high | PROTON-F3-DOORS-P137.md |
| account login/signup+OIDC 200; mail/drive/calendar/pass shells 200 P137 | B pulse | high | PROTON-F3-DOORS-P137.md |
| Inti researcher→auth; app/programs/proton 200; www→app 308 P137 | B pulse | high | PROTON-F3-DOORS-P137.md |
| H1/BC bare proton 404; /h soft 200; api bare 404 P137 | B pulse | med | PROTON-F3-DOORS-P137.md |

| manage.cic → /login → config.cic authorize hop P138 | A pulse | high | AUTH0-CIC-DOORS-P138.md |
| bare cic auth0app ERR; cic.us OIDC 404; config→bare cic 302 P138 | A pulse | high | AUTH0-CIC-DOORS-P138.md |
| BC auth0-okta 200; engagements/auth0 404; RD→BC auth0-okta P138 | A pulse | high | AUTH0-CIC-DOORS-P138.md |
| manage.auth0→auth0.auth0.com/authorize; product OIDC 200; /login 404 P138 | A pulse | high | AUTH0-CIC-DOORS-P138.md |

| portal.msrc → update-guide; researcher/report → msrc.microsoft.com P139 | B pulse | high | MSRC-ENTRA-DOORS-P139.md |
| msrc bounty 200; opensource 404; cvrf updates 200 P139 | B pulse | high | MSRC-ENTRA-DOORS-P139.md |
| Entra common v2 OIDC+JWKS 200; azure/entra portals 200 P139 | B pulse | high | MSRC-ENTRA-DOORS-P139.md |
| account.microsoft→consumers OAuth; office login→AAD authorize P139 | B pulse | med | MSRC-ENTRA-DOORS-P139.md |

| Atlassian trust BB 404; BC engagements/atlassian 200; id.login 202 P140 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P140.md |
| auth→id; trello→id; dev console 200 P140 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P140.md |
| BC openai 200; security 308 slash; policies 403; auth0 OIDC 404 P140 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P140.md |
| platform.openai 403 (was 200); chatgpt 200 (was 403); api 421/401 P140 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P140.md delta |
| H1 OIDC+OAuth AS 200; sign_in/up 403; programs SPA 200; API me 401 P141 | B pulse | high | H1-GITLAB-DOORS-P141.md |
| GitLab OIDC+JWKS 200; sign_in 403; sign_up 200; api /user 401 P141 | B pulse | high | H1-GITLAB-DOORS-P141.md |
| handbook BB path 302→projects.gitlab.io/auth SSO; vuln-mgmt 404 P141 | B pulse | high | H1-GITLAB-DOORS-P141.md |
| BC engagements/gitlab 404; /h soft 200; identity login 200 apex 403 P141 | B pulse | med | H1-GITLAB-DOORS-P141.md |
| BC okta+auth0-okta 200; first-party bug-bounty/trust 404; trust/security 200 P142 | A pulse | high | OKTA-PRODUCT-DOORS-P142.md |
| login.okta OIDC 200; www OIDC 404; developer signup 200 P142 | A pulse | high | OKTA-PRODUCT-DOORS-P142.md |
| Set5 OIDC well-known 403 (was 200); me 403; apex→oidc-entry P142 | A pulse | high | OKTA-PRODUCT-DOORS-P142.md delta |
| hackers.bugcrowd OIDC 404 (was 200); identity login 200; tracker sign_in P142 | A pulse | med | OKTA-PRODUCT-DOORS-P142.md delta |
| H1 shopify+shopify-scripts SPA 200; OIDC+OAuth AS 200; sign_in 403; api me 401 P143 | B pulse | high | SHOPIFY-H1-OAUTH-P143.md |
| Shopify accounts/admin 403 curl; partners orgs 302 OAuth authorize hop P143 | B pulse | high | SHOPIFY-H1-OAUTH-P143.md |
| legal/bug-bounty 404; shopify.dev auth docs 200; BB SSoT remains H1 P143 | B pulse | high | SHOPIFY-H1-OAUTH-P143.md |
| BC engagements/shopify 404; /h soft 200; identity login 200 P143 | B pulse | med | SHOPIFY-H1-OAUTH-P143.md |
| BC auth0-okta 200; engagements/auth0 404; /auth0-okta → engagements P144 | A pulse | high | AUTH0-CIC-DOORS-P144.md |
| RD policy 308→BC auth0-okta; security→security.okta; manage→login P144 | A pulse | high | AUTH0-CIC-DOORS-P144.md |
| CIC config.cic.eu.auth0.com 000 unreachable; cdn+docs+developer 200 P144 | A pulse | med | AUTH0-CIC-DOORS-P144.md |
| tracker auth0→sign_in; identity login 200; programs/auth0 404 P144 | A pulse | med | AUTH0-CIC-DOORS-P144.md |
| bughunters.google portal 200; rules path 301 rename; learn 200 P145 | B pulse | high | GOOGLE-VRP-DOORS-P145.md |
| accounts.google OIDC 200 + ServiceLogin; googleapis OIDC 404 P145 | B pulse | high | GOOGLE-VRP-DOORS-P145.md |
| H1 google SPA 200; google-vrp 404; sign_in 403; OIDC 200; api me 401 P145 | B pulse | high | GOOGLE-VRP-DOORS-P145.md |
| BC engagements/google 404; /h soft 200; identity login 200 P145 | B pulse | med | GOOGLE-VRP-DOORS-P145.md |
| console.aiven + login 200; api root 301/doc; v1 me+project 401 P146 | A pulse | high | AIVEN-API-DOORS-P146.md |
| BC engagements/aiven-mbb-og 200 SSoT; bare aiven 404; programs 404 P146 | A pulse | high | AIVEN-API-DOORS-P146.md |
| aiven.io/security(+report) 404; status 200; docs hop 301 P146 | A pulse | med | AIVEN-API-DOORS-P146.md |
| tracker aiven→sign_in; identity login 200; /h aiven soft 200 P146 | A pulse | med | AIVEN-API-DOORS-P146.md |
| proton account login/signup+mail 200; auth/info GET 405 P147 | B pulse | high | PROTON-F3-DOORS-P147.md |
| proton.me/security/bug-bounty 200 SSoT; support report path 404 P147 | B pulse | high | PROTON-F3-DOORS-P147.md |
| H1+BC proton 404; Inti auth/login 200; app→www 307; YWH bb host 000 P147 | B pulse | high | PROTON-F3-DOORS-P147.md |
| identity.bc login 200; /h proton soft 200; api.protonmail.ch 404 P147 | B pulse | med | PROTON-F3-DOORS-P147.md |
| BC user/sign_in→identity login; identity apex 403 login 200 P148 | A pulse | high | BC-PLATFORM-OIDC-P148.md |
| tracker+login.bugcrowd→tracker sign_in 200; hackers OIDC 404 P148 | A pulse | high | BC-PLATFORM-OIDC-P148.md |
| engagements okta+auth0-okta+atlassian+openai+aiven-mbb-og 200; aiven 404 P148 | A pulse | high | BC-PLATFORM-OIDC-P148.md |
| programs→engagements 301; docs+api.bugcrowd 200 P148 | A pulse | med | BC-PLATFORM-OIDC-P148.md |
| MSRC hub+bounty+report 200; msrc apex 302→www P149 | B pulse | high | MSRC-ENTRA-DOORS-P149.md |
| Entra common+orgs OIDC 200; login.msft→office; Azure+Entra portals 200 P149 | B pulse | high | MSRC-ENTRA-DOORS-P149.md |
| H1 microsoft/msrc 404; BC engagements/microsoft 404; /h soft 200 P149 | B pulse | high | MSRC-ENTRA-DOORS-P149.md |
| login.live 200; account.live→account.microsoft; api.msrc bare 404 P149 | B pulse | med | MSRC-ENTRA-DOORS-P149.md |
| Atlassian trust BB 404; BC engagements/atlassian 200; id.login/signup 202 P150 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P150.md |
| auth OIDC 200; trello+bitbucket→id; dev console 200 P150 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P150.md |
| platform.openai (+login) 200 (was 403); chatgpt 403 (was 200) P150 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P150.md delta |
| BC openai 200; api 421/401; openai.com security/policies 403 curl P150 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P150.md |
| BC auth0-okta+okta 200; bare auth0 404; /auth0-okta soft hop P151 | A pulse | high | AUTH0-CIC-DOORS-P151.md |
| RD 308→BC auth0-okta; security→security.okta; manage→login→authorize PKCE P151 | A pulse | high | AUTH0-CIC-DOORS-P151.md |
| product OIDC 200; cdn 200; login.auth0→auth0.com; guardian→auth0 P151 | A pulse | med | AUTH0-CIC-DOORS-P151.md |
| first-party okta bug-bounty 404; developer+login.okta 200; tracker→sign_in P151 | A pulse | med | AUTH0-CIC-DOORS-P151.md |
| H1 OIDC 200; oauth→sign_in; sign_in/up 403; api me 401; /gitlab SPA 200 P152 | B pulse | high | H1-GITLAB-DOORS-P152.md |
| GitLab OIDC+JWKS 200; sign_in 403; sign_up 200; api/user 401 P152 | B pulse | high | H1-GITLAB-DOORS-P152.md |
| handbook bug-bounty → projects.gitlab.io auth SSO; vuln-mgmt 404 P152 | B pulse | high | H1-GITLAB-DOORS-P152.md |
| BC engagements/gitlab 404; /h soft 200; identity login 200; www H1 OIDC 404 P152 | B pulse | med | H1-GITLAB-DOORS-P152.md |
| console.aiven + login + account/login 200; API doc 200; v1 me/project/userinfo 401 P153 | A pulse | high | AIVEN-API-DOORS-P153.md |
| BC aiven-mbb-og 200 SSoT; bare aiven + programs 404; /h soft 200 P153 | A pulse | high | AIVEN-API-DOORS-P153.md |
| aiven.io/security(+report) 404; status 200; help→docs 301 P153 | A pulse | med | AIVEN-API-DOORS-P153.md |
| tracker aiven→sign_in; identity login 200; API root→doc 301 P153 | A pulse | med | AIVEN-API-DOORS-P153.md |
| bughunters portal 200; rules 301 rename; learn+report 200; g.co/vulnz→portal P154 | B pulse | high | GOOGLE-VRP-DOORS-P154.md |
| accounts.google OIDC 200 + ServiceLogin hop; googleapis OIDC 404 P154 | B pulse | high | GOOGLE-VRP-DOORS-P154.md |
| H1 google SPA 200; google-vrp 404; sign_in 403; OIDC 200; api me 401 P154 | B pulse | high | GOOGLE-VRP-DOORS-P154.md |
| BC engagements/google 404; /h soft 200; identity login 200 P154 | B pulse | med | GOOGLE-VRP-DOORS-P154.md |
| BC user/sign_in→identity login; identity apex 403 login 200; OIDC well-known 403 P155 | A pulse | high | BC-PLATFORM-OIDC-P155.md |
| tracker+login.bugcrowd→tracker sign_in 200; hackers OIDC 404 P155 | A pulse | high | BC-PLATFORM-OIDC-P155.md |
| engagements okta+auth0-okta+atlassian+openai+aiven-mbb-og 200; aiven 404 P155 | A pulse | high | BC-PLATFORM-OIDC-P155.md |
| programs→engagements 301; docs+api.bugcrowd 200 P155 | A pulse | med | BC-PLATFORM-OIDC-P155.md |
| MSRC hub+bounty 200; report path 404 (was 200 P149); apex→www P156 | B pulse | high | MSRC-ENTRA-DOORS-P156.md delta |
| Entra common+orgs OIDC 200; Azure+Entra portals 200; login.msft→office P156 | B pulse | high | MSRC-ENTRA-DOORS-P156.md |
| H1 microsoft/msrc 404; BC engagements/microsoft 404; /h soft 200 P156 | B pulse | high | MSRC-ENTRA-DOORS-P156.md |
| login.live 200; account.microsoft→consumers OAuth; api.msrc bare 404 P156 | B pulse | med | MSRC-ENTRA-DOORS-P156.md |
| Atlassian id.login/signup 202; OIDC 200; BC atlassian 200; trust BB 404 P157 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P157.md |
| platform.openai 200; platform/login 403 (was 200); chatgpt 200 (was 403) P157 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P157.md delta |
| BC openai 200; apex/security 403; policies 308; api 421; models 000 P157 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P157.md |
| trello+bitbucket→id.atlassian; identity.bc login 200 P157 | A pulse | med | ATLASSIAN-OPENAI-DOORS-P157.md |
| proton account login/signup+mail 200; auth/info GET 405 P158 | B pulse | high | PROTON-F3-DOORS-P158.md |
| proton.me/security/bug-bounty 200 SSoT; support/report-abuse 200 P158 | B pulse | high | PROTON-F3-DOORS-P158.md |
| H1+BC proton eng 404; Inti auth/login 200; app→www 307; YWH 200 P158 | B pulse | high | PROTON-F3-DOORS-P158.md |
| identity.bc login 200; /h proton soft 200; api.protonmail.ch 404 P158 | B pulse | med | PROTON-F3-DOORS-P158.md |
| BC okta+auth0-okta 200; first-party bug-bounty 404; trust→status.okta P159 | A pulse | high | OKTA-PRODUCT-DOORS-P159.md |
| login.okta OIDC 200; www OIDC 404; developer signup 200 P159 | A pulse | high | OKTA-PRODUCT-DOORS-P159.md |
| Set5 OIDC well-known 403; oauth2/default well-known 401; me 403 P159 | A pulse | high | OKTA-PRODUCT-DOORS-P159.md delta |
| hackers.bugcrowd OIDC 404; identity login 200 P159 | A pulse | med | OKTA-PRODUCT-DOORS-P159.md |
| H1 shopify+shopify-scripts SPA 200; OIDC 200; sign_in 403; api me 401 P160 | B pulse | high | SHOPIFY-H1-OAUTH-P160.md |
| Shopify accounts/admin 403 curl; partners orgs→OAuth authorize hop P160 | B pulse | high | SHOPIFY-H1-OAUTH-P160.md |
| legal/bug-bounty 404; shopify.dev auth docs hop; BB SSoT H1 P160 | B pulse | high | SHOPIFY-H1-OAUTH-P160.md |
| BC engagements/shopify 404; /h soft 200; identity login 200 P160 | B pulse | med | SHOPIFY-H1-OAUTH-P160.md |
| CF dash OIDC+oauth-AS 200; issuer dash.cloudflare.com P161 | A pulse | high | CF-BC-DOORS-P161.md |
| api.cloudflare.com client/v4 user+zones 403 unauth; api-version header P161 | A pulse | high | CF-BC-DOORS-P161.md |
| CF oauth2/auth bare → invalid_client; apex OIDC 404 P161 | A pulse | high | CF-BC-DOORS-P161.md |
| H1 cloudflare 200; BC engagements/cloudflare 404 (platform split) P161 | A pulse | high | CF-BC-DOORS-P161.md |
| BC sign_in→login.hackers OIDC; identity apex 403; auth.bugcrowd 000 P161 | A pulse | high | CF-BC-DOORS-P161.md |
| Dropbox login/register 200; oauth2/authorize missing_client_id 302 P162 | B pulse | high | INTI-DROPBOX-DOORS-P162.md |
| api.dropboxapi.com get_current_account 400; bare api hosts 404 P162 | B pulse | high | INTI-DROPBOX-DOORS-P162.md |
| Inti dropbox detail 200; www→app 308; researcher→login connect/authorize P162 | B pulse | high | INTI-DROPBOX-DOORS-P162.md |
| H1 dropbox 404; BC engagements/dropbox 200 soft; first-party BB 404 P162 | B pulse | high | INTI-DROPBOX-DOORS-P162.md |
| api.intigriti bare 404; external/researcher 400; www bug-bounty 404 P162 | B pulse | med | INTI-DROPBOX-DOORS-P162.md |
| console.aiven login/signup 200 (well-known SPA); api OIDC JSON 200 P163 | A pulse | high | AIVEN-API-DOORS-P163.md |
| api.aiven.io/v1/me+project+userinfo 401 client-cert message P163 | A pulse | high | AIVEN-API-DOORS-P163.md |
| api.aiven.io/ bare→doc 301; /v1 404 P163 | A pulse | high | AIVEN-API-DOORS-P163.md |
| BC aiven-mbb-og 200 SSoT; aiven bare+H1 404; first-party BB 404 P163 | A pulse | high | AIVEN-API-DOORS-P163.md |
| identity/auth.aiven.io 000 this tick P163 | A pulse | med | AIVEN-API-DOORS-P163.md |
| H1 sign_in/sign_up 403 curl; password/new+OIDC+OAuth-AS 200 P164 | B pulse | high | H1-GITLAB-DOORS-P164.md |
| api.hackerone bare 200; v1 hackers me+programs 401 P164 | B pulse | high | H1-GITLAB-DOORS-P164.md |
| H1 gitlab SPA 200; gitlab-ce 404; directory+opportunities 200 P164 | B pulse | high | H1-GITLAB-DOORS-P164.md |
| GitLab OIDC+JWKS 200; sign_in 403; sign_up 200; oauth→sign_in P164 | B pulse | high | H1-GITLAB-DOORS-P164.md |
| api/v4 user+version 401; projects public 200; BC eng/gitlab 404 P164 | B pulse | high | H1-GITLAB-DOORS-P164.md |
| auth0 RD policy→BC auth0-okta 200; eng auth0+okta-auth0 404 P165 | A pulse | high | AUTH0-CIC-DOORS-P165.md |
| manage.auth0 → auth0.auth0.com/authorize PKCE; OIDC 200 P165 | A pulse | high | AUTH0-CIC-DOORS-P165.md |
| manage.cic-bug-bounty → login; bare cic tenant 000 P165 | A pulse | high | AUTH0-CIC-DOORS-P165.md |
| auth0.com/login 404; signup 200; security→security.okta P165 | A pulse | high | AUTH0-CIC-DOORS-P165.md |
| support.auth0 silent authorize→login_required; H1 auth0 404 P165 | A pulse | med | AUTH0-CIC-DOORS-P165.md |
| bughunters.google portal+learn 200; VRP rules 301→alphabet slug P166 | B pulse | high | GOOGLE-VRP-DOORS-P166.md |
| accounts.google OIDC 200; apex→ServiceLogin; Drive/Docs login hop P166 | B pulse | high | GOOGLE-VRP-DOORS-P166.md |
| oauth2/googleapis bare 404; appsecurity.google 000 P166 | B pulse | med | GOOGLE-VRP-DOORS-P166.md |
| H1 google 200 soft; BC eng/google 404; VRP SSoT bughunters P166 | B pulse | high | GOOGLE-VRP-DOORS-P166.md |
| about appsecurity→about.google; reward-program→bughunters rules P166 | B pulse | high | GOOGLE-VRP-DOORS-P166.md |
| id.atlassian login/signup/OIDC 202; trello→id; BC atlassian 200 P167 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P167.md |
| trust BB path 404; developer console 200; api.atlassian→developer P167 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P167.md |
| platform.openai 200; platform/login+chatgpt auth/login 403 curl P167 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P167.md delta |
| api.openai 421; /v1/models 401; BC openai 200 SSoT P167 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P167.md |
| openai.com security+policies 403 curl; auth0.openai→chatgpt; OIDC 404 P167 | A pulse | med | ATLASSIAN-OPENAI-DOORS-P167.md |
| MSRC hub+bounty+online-services 200; opensource 404 P168 | B pulse | high | MSRC-ENTRA-DOORS-P168.md |
| portal.msrc → msrc.microsoft.com update-guide/researcher/report hops P168 | B pulse | high | MSRC-ENTRA-DOORS-P168.md |
| api.msrc bare 404; cvrf/v3.0/updates 200 P168 | B pulse | high | MSRC-ENTRA-DOORS-P168.md |
| Entra common+orgs OIDC 200; Azure+Entra portals 200; login.live 200 P168 | B pulse | high | MSRC-ENTRA-DOORS-P168.md |
| H1 microsoft/msrc + BC eng/microsoft 404; account.msft→consumers OAuth P168 | B pulse | high | MSRC-ENTRA-DOORS-P168.md |
| BC okta+auth0-okta 200; first-party bug-bounty 404; trust+status 200 P169 | A pulse | high | OKTA-PRODUCT-DOORS-P169.md |
| login.okta OIDC 200; www OIDC 404; developer signup 200 P169 | A pulse | high | OKTA-PRODUCT-DOORS-P169.md |
| Set5 admin/org well-known 403; oauth2/default well-known 401; me 403 P169 | A pulse | high | OKTA-PRODUCT-DOORS-P169.md |
| login.hackers OIDC 200; identity login 200; hackers OIDC 404 P169 | A pulse | high | OKTA-PRODUCT-DOORS-P169.md |
| H1 shopify+shopify-scripts SPA 200; OIDC 200; sign_in 403; api me 401 P170 | B pulse | high | SHOPIFY-H1-OAUTH-P170.md |
| shopify.com/bugbounty 200 SSoT; legal BB 404; hyphen bug-bounty 404 P170 | B pulse | high | SHOPIFY-H1-OAUTH-P170.md |
| accounts/admin 403 curl; partners signup/orgs→OAuth authorize→lookup 403 P170 | B pulse | high | SHOPIFY-H1-OAUTH-P170.md |
| BC eng/shopify 404; /h soft 200; identity login 200 P170 | B pulse | med | SHOPIFY-H1-OAUTH-P170.md |
| bugcrowd apex 301→www; sign_in 302→identity.login; programs→engagements 301 P171 | A pulse | high | BC-PLATFORM-OIDC-P171.md |
| identity apex+OIDC well-known 403; login 200; login.hackers OIDC 200 P171 | A pulse | high | BC-PLATFORM-OIDC-P171.md |
| tracker+login.bugcrowd → tracker sign_in 200; hackers OIDC 404; auth.bugcrowd 000 P171 | A pulse | high | BC-PLATFORM-OIDC-P171.md |
| eng okta+auth0-okta+atlassian+openai+aiven-mbb-og 200; aiven/cf/shopify/msft 404 P171 | A pulse | high | BC-PLATFORM-OIDC-P171.md |
| account.proton login/signup/mail+mail/drive/calendar shells 200 P172 | B pulse | high | PROTON-F3-DOORS-P172.md |
| account.proton OIDC well-known 200; apex OIDC 404; auth/info GET 405 P172 | B pulse | high | PROTON-F3-DOORS-P172.md |
| proton.me/security/bug-bounty 200 SSoT; security bare+support BB path 404 P172 | B pulse | high | PROTON-F3-DOORS-P172.md |
| H1+BC eng/proton 404; BC /h soft 200; Inti app 307 auth/login 200 P172 | B pulse | high | PROTON-F3-DOORS-P172.md |
| console.aiven login/signup/account/login SPA 200; well-known SPA not JSON P173 | A pulse | high | AIVEN-API-DOORS-P173.md |
| api.aiven OIDC JSON 200 authorize=/v1/oauth2/authorize; bare→doc 301 P173 | A pulse | high | AIVEN-API-DOORS-P173.md |
| api v1/me+project+userinfo 401 client-cert message; /v1 404 P173 | A pulse | high | AIVEN-API-DOORS-P173.md |
| BC aiven-mbb-og 200 SSoT; eng aiven+H1 aiven 404; identity/auth hosts 000 P173 | A pulse | high | AIVEN-API-DOORS-P173.md |
| dropbox login/register 200; oauth2 authorize→missing_client_id; developers 200 P174 | B pulse | high | INTI-DROPBOX-DOORS-P174.md |
| api.dropboxapi get_current_account 400; bare api/content hosts 404 P174 | B pulse | high | INTI-DROPBOX-DOORS-P174.md |
| Inti programs/dropbox/detail 200 SSoT; researcher nested→detail; login 200 P174 | B pulse | high | INTI-DROPBOX-DOORS-P174.md |
| H1 dropbox 404; BC eng/dropbox 200 soft; first-party bug-bounty 404 P174 | B pulse | high | INTI-DROPBOX-DOORS-P174.md |
| auth0 RD policy→BC auth0-okta 308; security→security.okta; signup 200 login 404 P175 | A pulse | high | AUTH0-CIC-DOORS-P175.md |
| manage.auth0 → auth0.auth0.com/authorize PKCE; tenant OIDC 200 P175 | A pulse | high | AUTH0-CIC-DOORS-P175.md |
| manage.cic-bug-bounty → config.cic-bug-bounty authorize PKCE; bare cic 000 P175 | A pulse | high | AUTH0-CIC-DOORS-P175.md |
| BC eng auth0-okta+okta 200; auth0+okta-auth0+H1 404 P175 | A pulse | high | AUTH0-CIC-DOORS-P175.md |
| H1 sign_in/sign_up 403 curl; password/new+OIDC+OAuth-AS 200 P176 | B pulse | high | H1-GITLAB-DOORS-P176.md |
| api.hackerone bare 200; v1 hackers me+programs 401 P176 | B pulse | high | H1-GITLAB-DOORS-P176.md |
| H1 gitlab SPA 200; gitlab-ce 404; directory+opportunities 200 P176 | B pulse | high | H1-GITLAB-DOORS-P176.md |
| GitLab OIDC+JWKS 200; sign_in 403; oauth→sign_in; api user/version 401; projects 200; BC eng 404 P176 | B pulse | high | H1-GITLAB-DOORS-P176.md |
| id.atlassian login/signup/OIDC 202; trello→id; BC atlassian 200; trust BB 404 P177 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P177.md |
| platform.openai +/login 200; chatgpt apex 403 auth/login 200 P177 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P177.md |
| api.openai 421; /v1/models 401; BC openai 200 SSoT; auth0.openai→chatgpt P177 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P177.md |
| H1 atlassian+openai soft 200; security-policy 403; security/BB policy 308 P177 | A pulse | med | ATLASSIAN-OPENAI-DOORS-P177.md |
| bughunters portal+learn 200; VRP rules numeric→google-friends slug P178 | B pulse | high | GOOGLE-VRP-DOORS-P178.md |
| accounts.google OIDC 200; apex→ServiceLogin; Drive/Docs login hop P178 | B pulse | high | GOOGLE-VRP-DOORS-P178.md |
| oauth2/googleapis bare 404; appsecurity.google 000 P178 | B pulse | med | GOOGLE-VRP-DOORS-P178.md |
| H1 google 200 soft; BC eng/google 404; VRP SSoT bughunters P178 | B pulse | high | GOOGLE-VRP-DOORS-P178.md |
| BC okta+auth0-okta 200; first-party bug-bounty 404; trust+status 200 P179 | A pulse | high | OKTA-PRODUCT-DOORS-P179.md |
| login.okta OIDC 200; www OIDC 404; developer signup 200 P179 | A pulse | high | OKTA-PRODUCT-DOORS-P179.md |
| Set5 pam-5335 OIDC+default AS 200; me 403; apex→UserHome session_hint P179 | A pulse | high | OKTA-PRODUCT-DOORS-P179.md |
| admin pam-5335 → oidc-entry; admin OIDC+default AS 200; login.hackers OIDC 200 P179 | A pulse | high | OKTA-PRODUCT-DOORS-P179.md |
| MSRC hub+bounty+online-services 200; opensource 404 P180 | B pulse | high | MSRC-ENTRA-DOORS-P180.md |
| portal.msrc → msrc update-guide/researcher/report hops; researcher+report 200 P180 | B pulse | high | MSRC-ENTRA-DOORS-P180.md |
| api.msrc bare 404; cvrf/v3.0/updates 200; Entra common+orgs OIDC 200 P180 | B pulse | high | MSRC-ENTRA-DOORS-P180.md |
| H1 microsoft/msrc + BC eng/microsoft 404; account.msft→consumers OAuth P180 | B pulse | high | MSRC-ENTRA-DOORS-P180.md |
| CF dash OIDC + OAuth AS well-known both 200; API v4 user/zones 403 unauth | A pulse | high | CF-BC-DOORS-P181.md |
| www.cloudflare.com/bug-bounty 404; /disclosure + trust-hub 200; BB is H1 | A pulse | high | CF-BC-DOORS-P181.md |
| bugcrowd.com/engagements/cloudflare 404 (CF not on BC) | A pulse | high | CF-BC-DOORS-P181.md |
| docs.bugcrowd.com/api/ 404 this tick; docs root 200 (path churn) | A pulse | med | CF-BC-DOORS-P181.md |
| bughunters.google.com portal+learn+report all 200; VRP SSoT | B pulse | high | GOOGLE-VRP-DOORS-P182.md |
| accounts.google.com OIDC well-known 200; Drive/Docs 302 ServiceLogin | B pulse | high | GOOGLE-VRP-DOORS-P182.md |
| H1 google 200 soft; googlevrp slug 404; BC google eng 404 | B pulse | high | GOOGLE-VRP-DOORS-P182.md |
| appsecurity.google.com 000 dead this tick | B pulse | high | GOOGLE-VRP-DOORS-P182.md |
| console.aiven.io login/signup 200; api OIDC JSON 200; console well-known SPA | A pulse | high | AIVEN-API-DOORS-P183.md |
| api.aiven.io v1 me/project/userinfo 401 unauth cert class | A pulse | high | AIVEN-API-DOORS-P183.md |
| BC aiven-mbb-og 200 SSoT; engagements/aiven + H1 aiven 404 | A pulse | high | AIVEN-API-DOORS-P183.md |
| auth.aiven.io 000 dead this tick | A pulse | high | AIVEN-API-DOORS-P183.md |
| H1 /gitlab SPA 200 SSoT; sign_in/up curl 403; OIDC 200 | B pulse | high | H1-GITLAB-DOORS-P184.md |
| gitlab.com OIDC 200; sign_in 403; api/v4 user+version 401 | B pulse | high | H1-GITLAB-DOORS-P184.md |
| BC engagements/gitlab + /gitlab 404 | B pulse | high | H1-GITLAB-DOORS-P184.md |
| api.hackerone.com/docs 404; bare api 200; me 401 | B pulse | high | H1-GITLAB-DOORS-P184.md |
| Auth0 RD/security 308 → BC auth0-okta SSoT; engagements/auth0 404 | A pulse | high | AUTH0-CIC-DOORS-P185.md |
| manage.auth0 + manage.cic-bug-bounty 302 login/PKCE; bare cic tenant 000 | A pulse | high | AUTH0-CIC-DOORS-P185.md |
| auth0.auth0.com OIDC well-known 200; login.auth0 well-known 404 | A pulse | high | AUTH0-CIC-DOORS-P185.md |
| H1 auth0 404; developer.auth0.com 200 | A pulse | high | AUTH0-CIC-DOORS-P185.md |
| Intigriti Dropbox program detail 200 SSoT; H1 dropbox 404; BC eng soft 200 | B pulse | high | INTI-DROPBOX-DOORS-P186.md |
| dropbox.com login+developers+OIDC 200; get_current_account 400; bug-bounty 404 | B pulse | high | INTI-DROPBOX-DOORS-P186.md |
| app.intigriti auth/login+programs 200; api.intigriti bare 404 | B pulse | high | INTI-DROPBOX-DOORS-P186.md |
| app.intigriti.com well-known openid-configuration 200 this tick | B pulse | med | INTI-DROPBOX-DOORS-P186.md |
| id.atlassian.com login+OIDC 202; BC atlassian 200 SSoT; trust BB 404 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P187.md |
| platform.openai.com + marketing openai.com curl 403 this tick (browser) | A pulse | high | ATLASSIAN-OPENAI-DOORS-P187.md |
| api.openai.com 421; v1/models 401; BC openai 200 SSoT; H1 soft 200 | A pulse | high | ATLASSIAN-OPENAI-DOORS-P187.md |
| auth0.openai.com 302; OIDC well-known 404 | A pulse | med | ATLASSIAN-OPENAI-DOORS-P187.md |
| proton.me/security/bug-bounty 200 first-party BB SSoT; /security bare 404 | B pulse | high | PROTON-F3-DOORS-P188.md |
| account.proton.me login/signup/OIDC path 200; api core auth GET 405 | B pulse | high | PROTON-F3-DOORS-P188.md |
| H1 proton + BC engagements/proton 404 | B pulse | high | PROTON-F3-DOORS-P188.md |
| mail.proton.me 200; api.protonmail.ch 404 legacy | B pulse | high | PROTON-F3-DOORS-P188.md |
| Okta BC eng okta+auth0-okta 200 SSoT; first-party bug-bounty 404 | A pulse | high | OKTA-PRODUCT-DOORS-P189.md |
| login.okta.com OIDC 200; developer signup 200 | A pulse | high | OKTA-PRODUCT-DOORS-P189.md |
| Set5 pam-5335 org+admin OIDC 200; users/me 403; apex 302 | A pulse | high | OKTA-PRODUCT-DOORS-P189.md |
| login.hackers + identity.bugcrowd login 200 this tick | A pulse | high | OKTA-PRODUCT-DOORS-P189.md |
| H1 shopify 200 + shopify.com/bugbounty 200 SSoT; scope path 404 | B pulse | high | SHOPIFY-H1-OAUTH-P190.md |
| accounts.shopify.com apex/lookup 403; OIDC well-known 200 | B pulse | high | SHOPIFY-H1-OAUTH-P190.md |
| BC engagements/shopify 404; H1 OIDC+OAuth-AS 200; me 401 | B pulse | high | SHOPIFY-H1-OAUTH-P190.md |
| admin.shopify.com 403 curl; partners 301 | B pulse | high | SHOPIFY-H1-OAUTH-P190.md |
| CF dash OIDC + OAuth AS well-known both 200; API v4 user/zones/accounts 403 unauth P191 | A pulse | high | CF-BC-DOORS-P191.md |
| www.cloudflare.com/bug-bounty 404; disclosure + trust-hub 200; BB is H1 P191 | A pulse | high | CF-BC-DOORS-P191.md |
| bugcrowd.com/engagements/cloudflare 404 (CF not on BC) P191 | A pulse | high | CF-BC-DOORS-P191.md |
| BC identity login 200 apex 403; docs/api 404; auth.bugcrowd 000; login.hackers OIDC 200 P191 | A pulse | high | CF-BC-DOORS-P191.md |
