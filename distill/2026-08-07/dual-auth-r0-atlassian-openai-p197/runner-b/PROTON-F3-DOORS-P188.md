# PROTON-F3-DOORS-P188
UTC: 2026-08-07T20:44:09Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Proton product + BB

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://proton.me/` | 200 | marketing |
| `GET` | `https://proton.me/security/bug-bounty` | 200 | first-party BB SSoT |
| `GET` | `https://proton.me/security` | 404 | use /security/bug-bounty |
| `GET` | `https://proton.me/support/bug-bounty-program` | 404 | not support path |
| `GET` | `https://proton.me/blog` | 200 | blog |
| `GET` | `https://account.proton.me/` | 200 | account shell |
| `GET` | `https://account.proton.me/login` | 200 | login |
| `GET` | `https://account.proton.me/signup` | 200 | signup |
| `GET` | `https://mail.proton.me/` | 200 | mail app |
| `GET` | `https://account.proton.me/.well-known/openid-configuration` | 200 | SPA shell class |
| `GET` | `https://proton.me/.well-known/openid-configuration` | 404 | not apex |
| `GET` | `https://account.proton.me/api/core/v4/auth` | 405 | GET not allowed |
| `GET` | `https://api.protonmail.ch/` | 404 | legacy |
| `GET` | `https://mail.protonmail.com/` | 301 | → proton.me class |
| `GET` | `https://protonstatus.com/` | 301 | status hop |

## Platform map

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://hackerone.com/proton` | 404 | not H1 |
| `GET` | `https://bugcrowd.com/engagements/proton` | 404 | not BC eng |
| `GET` | `https://bugcrowd.com/proton` | 301 | short hop |

## Summary
Proton F3 BB SSoT **proton.me/security/bug-bounty**. Account login/signup+OIDC path **200**. H1/BC eng **404**.

## Auth readiness (runner-b)
- Browser: account.proton.me login/signup.
- BB: first-party path only.

## Deltas vs P172
- api/core/v4/auth **405** (was auth/info 405 class).
- bugcrowd.com/proton **301** vs prior /h soft.
- Core first-party BB + H1/BC eng 404 + account shells **stable**.
