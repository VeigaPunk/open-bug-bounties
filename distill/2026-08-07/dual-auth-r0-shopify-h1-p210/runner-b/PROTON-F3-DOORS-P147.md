# PROTON-F3-DOORS-P147
UTC: 2026-08-07T19:20:58Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://proton.me/` | 200 | - |
| `GET` | `https://account.proton.me/` | 200 | account shell |
| `GET` | `https://account.proton.me/login` | 200 | login shell |
| `GET` | `https://account.proton.me/signup` | 200 | signup shell |
| `GET` | `https://mail.proton.me/` | 200 | mail SPA shell |
| `GET` | `https://account.proton.me/api/core/v4/auth/info` | 405 | GET not allowed (POST expected) |
| `GET` | `https://proton.me/security/bug-bounty` | 200 | first-party BB SSoT |
| `GET` | `https://proton.me/support/report-a-security-vulnerability` | 404 | path gone |
| `GET` | `https://bugbounty.yeswehack.com/` | 000 | unreachable this tick |
| `GET` | `https://yeswehack.com/` | 200 | - |
| `GET` | `https://app.intigriti.com/` | 307 | → www.intigriti.com |
| `GET` | `https://app.intigriti.com/auth/login` | 200 | Inti login shell |
| `GET` | `https://hackerone.com/proton` | 404 | not H1 program |
| `GET` | `https://hackerone.com/users/sign_in` | 403 | curl gated |
| `GET` | `https://bugcrowd.com/engagements/proton` | 404 | not BC engagement |
| `GET` | `https://bugcrowd.com/h/proton` | 200 | soft shell |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | BC IdP shell |
| `GET` | `https://api.protonmail.ch/` | 404 | legacy API bare |

## Summary
Proton F3 passive door refresh for runner-b (P147). Account login/signup + mail shells **200**; auth/info **405** on GET; first-party bug-bounty page **200** SSoT. H1/BC proton not engaged (404). Intigriti app apex → www; auth/login **200**. YesWeHack bugbounty host **000**. Auth readiness: Proton account dual shells + optional Inti browser.

## Deltas vs P137
- bugbounty.yeswehack.com **000** (was intermittent).
- support report path still **404**; security/bug-bounty **200** stable.
- Inti login shell **200** stable.
