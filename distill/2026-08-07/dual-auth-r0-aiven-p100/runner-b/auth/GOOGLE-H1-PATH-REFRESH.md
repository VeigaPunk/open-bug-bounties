# GOOGLE-H1-PATH-REFRESH — PULSE-44 (policy recon only)

**UTC:** 2026-08-07T15:48Z · **Runner B** · **No secrets · GET-only curl**  
**Axes:** `auth_ready_b` · `google_h1_paths` · `claims`

## F1 Google VRP

| Code | URL | Final / note |
|------|-----|----------------|
| **200** | bughunters.google.com/ · /report · /learn | portal shells |
| **200** | /about/rules | → about-this-section |
| **200** | VRP rules long path | **policy SSoT** |
| **200** | g.co/vulnz | → bughunters.google.com |
| **ERR/000** | appsecurity.google.com · /reward-program | **unreachable this tick** (prior redirect narrative soft) |
| **200** | accounts.google.com | WebLiteSignIn identifier |
| **200** | drive/docs/mail.google.com | → accounts ServiceLogin |
| **401** | googleapis oauth2/v3/userinfo | unauth |
| **404** | oauth2.googleapis.com/token GET | POST-only endpoint |

**Auth readiness:** dual own Google accounts + bughunters report still open; appsecurity host flaky — do not depend on it for policy.

## H1 platform

| Code | URL | note |
|------|-----|------|
| **200** | hackerone.com → www.hackerone.com | marketing |
| **403** | /users/sign_in · sign_up | curl challenge (browser required) |
| **200** | /users/password/new | recovery shell open |
| **200** | directory/programs · opportunities/all | public catalog |
| **200** | /shopify · /gitlab | program shells |
| **200** | api.hackerone.com bare | |
| **401** | v1/hackers/me · v1/hackers/programs | session/token required |
| **200** | docs.hackerone.com | |
| **404** | api.hackerone.com/docs | use docs host |

**Auth readiness gap:** H1 asset export still needs browser session; Shopify/GitLab public shells OK.

## Claims

- appsecurity.google.com ERR this tick; bughunters + VRP rules remain SSoT
- H1 sign_in/up still 403 curl; password/new + directory 200
- api hackers/me + programs 401 unauth

## Policy

No live exploit · no spray · free-tier human only.
