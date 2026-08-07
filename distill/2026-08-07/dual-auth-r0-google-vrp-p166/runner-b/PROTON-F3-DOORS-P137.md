# PROTON-F3-DOORS-P137
UTC: 2026-08-07T18:59:08Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://proton.me/security/bug-bounty` | 200 | first-party BB SSoT |
| `GET` | `https://proton.me/security` | 404 | - |
| `GET` | `https://proton.me/support/bug-bounty` | 404 | - |
| `GET` | `https://account.proton.me/login` | 200 | - |
| `GET` | `https://account.proton.me/signup` | 200 | - |
| `GET` | `https://account.proton.me/.well-known/openid-configuration` | 200 | OIDC |
| `GET` | `https://mail.proton.me/` | 200 | product shell |
| `GET` | `https://drive.proton.me/` | 200 | - |
| `GET` | `https://calendar.proton.me/` | 200 | - |
| `GET` | `https://pass.proton.me/` | 200 | - |
| `GET` | `https://api.protonmail.ch/` | 404 | - |
| `GET` | `https://mail-api.proton.me/` | 404 | - |
| `GET` | `https://app.intigriti.com/researcher/programs/proton` | 302 | /auth/researcher?redirect=… |
| `GET` | `https://www.intigriti.com/programs/proton` | 308 | app.intigriti.com/programs/proton/ |
| `GET` | `https://app.intigriti.com/programs/proton` | 200 | Inti program shell |
| `GET` | `https://hackerone.com/proton` | 404 | - |
| `GET` | `https://bugcrowd.com/engagements/proton` | 404 | - |
| `GET` | `https://bugcrowd.com/h/engagements/proton` | 200 | soft shell |

## Summary
Proton F3 passive door refresh for runner-b (P137).
- BB SSoT: **proton.me/security/bug-bounty 200**; bare /security and support BB **404**.
- Account login/signup + OIDC **200**; mail/drive/calendar/pass shells **200**.
- API bare hosts **404**.
- Intigriti researcher path → auth redirect; app programs/proton **200** platform SSoT.
- H1/BC bare proton **404**; BC /h soft **200**.

## Auth readiness
Proton account (human) + Intigriti researcher session for program. Dual-account F3 path unchanged.
