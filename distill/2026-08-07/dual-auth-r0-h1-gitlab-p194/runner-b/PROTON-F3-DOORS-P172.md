# PROTON-F3-DOORS-P172
UTC: 2026-08-07T20:11:26Z
Policy: passive HTTP recon only (no -L for status). No auth abuse / no exploit.

| Method | URL | code | location/notes |
|--------|-----|------|----------------|
| `GET` | `https://proton.me/` | 200 | marketing |
| `GET` | `https://account.proton.me/login` | 200 | account login shell |
| `GET` | `https://account.proton.me/signup` | 200 | signup shell |
| `GET` | `https://account.proton.me/mail` | 200 | account mail hop shell |
| `GET` | `https://mail.proton.me/` | 200 | mail app shell |
| `GET` | `https://drive.proton.me/` | 200 | drive shell |
| `GET` | `https://calendar.proton.me/` | 200 | calendar shell |
| `GET` | `https://vpn.proton.me/` | 301 | → protonvpn.com |
| `GET` | `https://account.proton.me/api/auth/info` | 405 | GET not allowed |
| `GET` | `https://account.proton.me/.well-known/openid-configuration` | 200 | account OIDC path → SPA HTML shell (not JSON metadata) |
| `GET` | `https://proton.me/.well-known/openid-configuration` | 404 | not apex |
| `GET` | `https://proton.me/security/bug-bounty` | 200 | first-party BB SSoT |
| `GET` | `https://proton.me/security` | 404 | use /security/bug-bounty |
| `GET` | `https://proton.me/support/bug-bounty-program` | 404 | not support path |
| `GET` | `https://proton.me/support/report-abuse` | 200 | abuse report |
| `GET` | `https://hackerone.com/proton` | 404 | not H1 |
| `GET` | `https://bugcrowd.com/engagements/proton` | 404 | not BC eng |
| `GET` | `https://bugcrowd.com/h/proton` | 200 | soft /h shell |
| `GET` | `https://identity.bugcrowd.com/login` | 200 | BC IdP |
| `GET` | `https://app.intigriti.com/` | 307 | → www.intigriti.com |
| `GET` | `https://app.intigriti.com/auth/login` | 200 | Inti auth login |
| `GET` | `https://www.intigriti.com/` | 200 | Inti marketing |
| `GET` | `https://api.protonmail.ch/` | 404 | legacy API host |
| `GET` | `https://account.protonmail.com/` | 301 | → account.proton.me |
| `GET` | `https://yeswehack.com/` | 200 | YWH apex |

## Summary
Proton F3 product + BB doors (P172 runner-b). First-party BB **proton.me/security/bug-bounty** remains SSoT (H1/BC eng **404**). Account OIDC path **200** SPA (not raw JSON); product app shells mail/drive/calendar **200**.

## Auth readiness (runner-b)
- Account: account.proton.me login/signup + OIDC discovery public.
- BB: first-party path only; platform soft BC /h; Inti login for multi-platform hop if needed.
- No durable session this tick (curl passive only).

## Deltas vs P158
- account OIDC well-known **200** (explicit row; apex OIDC **404**).
- drive+calendar+account/mail+vpn hop added; all product shells **200**/vpn **301**.
- security bare + support/bug-bounty-program still **404**; report-abuse **200**.
- Core BB/IdP matrix stable vs P158.
