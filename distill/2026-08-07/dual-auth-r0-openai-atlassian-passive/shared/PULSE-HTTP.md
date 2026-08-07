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
