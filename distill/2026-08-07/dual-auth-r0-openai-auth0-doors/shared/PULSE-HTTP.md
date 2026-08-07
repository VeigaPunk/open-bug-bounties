# Pulse recon — 2026-08-07T14:18:18Z

Policy-only passive GET status (curl -L max 12s). No auth, no exploit.

- 200  https://bugcrowd.com/engagements/aiven-mbb-og
- 200  https://bugcrowd.com/engagements/auth0-okta
- 200  https://bugcrowd.com/engagements/okta
- 200  https://bugcrowd.com/engagements/atlassian
- 200  https://bugcrowd.com/engagements/openai
- 200  https://login.hackers.bugcrowd.com
- 200  https://bugcrowd-pam-5335.oktapreview.com
- 200  https://hackerone.com/shopify
- 200  https://app.intigriti.com/researcher/programs/dropbox/detail
- 200  https://console.aiven.io/
- 200  https://api.aiven.io/
- 400  https://manage.cic-bug-bounty.auth0app.com/
- 200  https://www.shopify.com/bugbounty
- 200  https://www.shopify.com/bugbounty/criteria
- 200  https://proton.me/security/bug-bounty
- 200  https://www.microsoft.com/en-us/msrc/bounty-online-services
- 200  https://bughunters.google.com/about/rules/google-friends/google-and-alphabet-vulnerability-reward-program-vrp-rules
- 404  https://docs.bugcrowd.com/researchers/participating-in-program/using-email-aliases/
- 200  https://docs.bugcrowd.com/

## PULSE-2 extras — 2026-08-07T14:19:54Z
- 200  Set5 admin OIDC chain (see BC-OKTA-ADMIN-PASSIVE.md)
- 200  api.bugcrowd.com / tracker.bugcrowd.com sign_in
- 200  H1 shopify (+?type=team)

## PULSE-3 — 2026-08-07T14:21:43Z
- 200 H1 Shopify + shopify.com/bugbounty + criteria
- 404 shopify.com/bugbounty/scope (expected; use H1 export)
- 200 F1/F2/F3/F4 public portals

## PULSE-4 — 2026-08-07T14:23:45Z
- 200 console.aiven.io / api.aiven.io / docs / pricing / aiven-mbb-og
- 401 api.aiven.io/v1/project (auth required)
- 400 manage.cic-bug-bounty.auth0app.com unauth
- 404 atlassian trust/security/bug-bounty path

## PULSE-5 — 2026-08-07T14:25:37Z
- 200 MSRC bounty hub + online-services + terms + programs
- 200 msrc.microsoft.com report + portal.msrc root
- 404 portal.msrc.microsoft.com/en-us/researcher
- 200 entra.microsoft.com shell

## PULSE-6 — 2026-08-07T14:27:40Z
- 200 BC openai + atlassian + auth0-okta engagements
- 200 platform.openai.com / chatgpt.com / openai.com/security + index BB post
- 404 openai.com/policies/bug-bounty-program
- 202 id.atlassian.com/login

## PULSE-7 — 2026-08-07T14:29:39Z
- 200 proton.me/security/bug-bounty + account/mail/drive/calendar/signup
- 404 proton.me/security + support/bug-bounty-program

## PULSE-8 — 2026-08-07T14:31:36Z
- 200 full Google VRP portal set (bughunters rules, Drive/Docs, appsecurity reward)

## PULSE-9 — 2026-08-07T14:33:45Z
- 400 manage.cic-bug-bounty.auth0app.com (+/login)
- 200 auth0-okta engagement + developer.auth0.com
- 200 OIDC discovery login.hackers.bugcrowd.com + bugcrowd-pam-5335

## PULSE-10 — 2026-08-07T14:35:32Z
- 200 Inti Dropbox detail + dropbox.com login/developers/help
- 404 api.dropboxapi.com/ + content.dropboxapi.com/ + /scl/fi bare
- 400 api.dropboxapi.com/2/users/get_current_account unauth

## PULSE-11 — 2026-08-07T14:38:38Z
- 200 H1 gitlab + policy_scopes + about.gitlab security/disclosure/docs
- 401 api.hackerone.com/v1/hackers/programs/gitlab unauth
- 404 bugcrowd.com/engagements/gitlab
- 403 gitlab.com gl-security/security-department-meta unauth
- 200 docs.bugcrowd.com researchers/onboarding/welcome + your-bugcrowdninja-email-address (+ email-filter)
- 404 docs using-email-aliases + email-aliases + bare /researchers/ (stale)

## PULSE-12 — 2026-08-07T14:40:09Z
- 200 tracker.bugcrowd.com + sign_in; login.bugcrowd.com; login.hackers + OIDC discovery
- 403 identity.bugcrowd.com unauth
- 200 api.bugcrowd.com; 404 api/v2 + api/docs; 200 docs.bugcrowd.com/api/getting-started
- 404 bugcrowd.com/sessions + programs/engaged
- 200 Inti app/login/researcher + partners.shopify + store-login
- 404 api.intigriti.com
- 202 id.atlassian.com (+/login) + auth.atlassian.com; 200 admin.atlassian.com

## PULSE-13 — 2026-08-07T14:41:43Z
- 200 hackerone.com + opportunities + hacktivity + api root + docs.hackerone.com
- 403 hackerone.com/users/sign_in + sign_up (curl/bot)
- 401 api.hackerone.com/v1/hackers/me; 404 api.hackerone.com/docs
- 200 accounts.google.com + ServiceLogin + myaccount + bughunters + issuetracker + Drive/Docs

## PULSE-14 — 2026-08-07T14:43:54Z
- 200 platform.openai.com (+login/docs) auth.openai.com auth0.openai.com chatgpt login openai.com/security BC openai
- 404 openai.com/policies/security-policy
- 421 api.openai.com; ERR api.openai.com/v1/models unauth
- 400 manage.cic-bug-bounty.auth0app.com (+/login); ERR bare cic-bug-bounty.auth0app.com
- 200 developer.auth0.com + security-center docs + BC auth0-okta
