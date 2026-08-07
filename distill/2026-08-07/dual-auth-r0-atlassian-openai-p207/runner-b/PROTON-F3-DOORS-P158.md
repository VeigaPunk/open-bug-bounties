# PROTON-F3-DOORS-P158
UTC: 2026-08-07T19:42:45Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://proton.me/` | 200 | - |
| `GET` | `https://account.proton.me/login` | 200 | - |
| `GET` | `https://account.proton.me/signup` | 200 | - |
| `GET` | `https://mail.proton.me/` | 200 | - |
| `GET` | `https://account.proton.me/api/auth/info` | 405 | - |
| `GET` | `https://proton.me/security/bug-bounty` | 200 | - |
| `GET` | `https://proton.me/support/report-abuse` | 200 | - |
| `GET` | `https://hackerone.com/proton` | 404 | - |
| `GET` | `https://bugcrowd.com/engagements/proton` | 404 | - |
| `GET` | `https://bugcrowd.com/h/proton` | 200 | - |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | - |
| `GET` | `https://app.intigriti.com/` | 307 | → https://www.intigriti.com/ |
| `GET` | `https://app.intigriti.com/auth/login` | 200 | - |
| `GET` | `https://www.intigriti.com/` | 200 | - |
| `GET` | `https://api.protonmail.ch/` | 404 | - |
| `GET` | `https://account.protonmail.com/` | 301 | → https://account.proton.me/ (auth hop) |
| `GET` | `https://yeswehack.com/` | 200 | - |

## Summary
Proton account shells + first-party BB + Inti hop (P158 runner-b).

## Auth readiness
- BB SSoT: proton.me/security/bug-bounty; H1/BC often 404.
- Intigriti may host related programs; account.proton login shell.

## Deltas vs P147
- account login/signup+mail **200**; auth/info GET **405** stable.
- first-party BB **200** SSoT; **support/report-abuse 200** (support report path was 404 on P147 — different path live).
- H1+BC proton eng **404**; /h soft **200**; identity login **200**.
- Inti app→www **307**; auth/login **200**; YWH apex **200** (host was 000 on some older ticks).
- api.protonmail.ch **404**; account.protonmail→account.proton.me.
