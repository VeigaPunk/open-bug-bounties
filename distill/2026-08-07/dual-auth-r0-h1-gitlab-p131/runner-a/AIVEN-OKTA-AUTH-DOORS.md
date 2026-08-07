# Aiven console + Okta Set5 / hacker OIDC doors — passive (Runner A)

**UTC:** 2026-08-07T14:47:47Z  
**Policy recon only** — no signup, no token mint, no exploit.

## Aiven

| URL | Code | Role |
|-----|------|------|
| https://console.aiven.io | 200 | Console shell |
| https://console.aiven.io/login | 200 | Login |
| https://console.aiven.io/signup | 200 | Signup (free tier human later) |
| https://aiven.io | 200 | Marketing |
| https://aiven.io/pricing | 200 | Pricing / free-tier signal |
| https://docs.aiven.io | 200 | Docs |
| https://api.aiven.io | 200 | API root shell |
| https://api.aiven.io/v1 | **404** | No bare /v1 index |
| https://api.aiven.io/v1/project | **401** | Token required |
| https://api.aiven.io/v1/me | **401** | Token required |
| https://bugcrowd.com/engagements/aiven-mbb-og | 200 | **Bounty SSoT** |

## Okta Set5 PAM + hacker IdP discovery

| URL | Code | Role |
|-----|------|------|
| https://bugcrowd-pam-5335.oktapreview.com | 200 | Set5 org shell |
| https://bugcrowd-pam-5335.oktapreview.com/.well-known/openid-configuration | 200 | Org OIDC discovery |
| https://bugcrowd-pam-5335.oktapreview.com/oauth2/default/.well-known/openid-configuration | 200 | Default auth server discovery |
| https://bugcrowd-pam-5335-admin.oktapreview.com | 200 | Admin host shell |
| https://bugcrowd-pam-5335-admin.oktapreview.com/.well-known/openid-configuration | 200 | Admin OIDC discovery |
| https://login.hackers.bugcrowd.com/.well-known/openid-configuration | 200 | Hacker IdP discovery |
| https://login.hackers.bugcrowd.com/oauth2/default/.well-known/openid-configuration | 200 | Hacker default AS discovery |

## Auth-ready implications

1. Aiven **signup/login 200** — free-tier instance still **human** (+ @bugcrowdninja email per BC-NINJA-EMAIL).
2. API auth boundary: `/v1/project` and `/v1/me` **401**; bare `/v1` **404** (prefer documented endpoints after token).
3. Set5 **org + admin** both expose public OIDC discovery **200** — durable session still browser MFA (curl non-durable prior claim).
4. Hacker login discovery remains separate from PAM preview org (BC-OAUTH-MAP).

## Related

- `AIVEN-PASSIVE-HTTP.md`, `AIVEN-INSTANCE.md`, `BC-OKTA-ADMIN-PASSIVE.md`, `AUTH0-OIDC-PASSIVE.md`

## Axes

- auth_ready_a↑ (console signup + dual OIDC discovery)
- evidence_fidelity↑ (401 me/project, 404 /v1)
- safety_in_policy↑
