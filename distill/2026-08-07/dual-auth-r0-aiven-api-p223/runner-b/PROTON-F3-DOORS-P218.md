# PROTON-F3-DOORS-P218
UTC: 2026-08-07T21:46:25Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## First-party BB + product

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://proton.me/security/bug-bounty` | 200 | **first-party BB SSoT** |
| `GET` | `https://proton.me/security` | 404 | bare security miss |
| `GET` | `https://proton.me/` | 200 | marketing |
| `GET` | `https://account.proton.me/` | 200 | account apex |
| `GET` | `https://account.proton.me/login` | 200 | login |
| `GET` | `https://account.proton.me/signup` | 200 | signup |
| `GET` | `https://account.proton.me/.well-known/openid-configuration` | 200 | OIDC path (SPA class) |
| `GET` | `https://mail.proton.me/` | 200 | mail shell |
| `GET` | `https://drive.proton.me/` | 200 | drive shell |
| `GET` | `https://calendar.proton.me/` | 200 | calendar shell |
| `GET` | `https://account.proton.me/api/core/v4/auth` | 405 | GET not allowed |
| `GET` | `https://api.protonmail.ch/` | 404 | legacy host miss |

## Program hosts

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/proton` | 404 | not H1 |
| `GET` | `https://bugcrowd.com/engagements/proton` | 404 | not BC eng |
| `GET` | `https://bugcrowd.com/h` | 404 | soft path gone |

## Summary
Proton F3 SSoT **proton.me/security/bug-bounty**. Account login/signup/OIDC **200**. Product shells **200**. H1+BC eng **404**. api auth GET **405**.

## Auth readiness (runner-b)
- Product: account.proton.me signup/login browser (dual account policy per F3).
- Bounty: first-party BB page only; not H1/BC.

## Deltas vs P208
- Matrix **stable**: BB 200, account OIDC 200, H1/BC eng 404, auth GET 405, legacy API 404, BC /h 404.
