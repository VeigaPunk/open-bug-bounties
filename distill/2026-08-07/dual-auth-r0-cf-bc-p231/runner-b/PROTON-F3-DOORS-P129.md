# PROTON-F3-DOORS-P129
UTC: 2026-08-07T18:43:12Z
Policy: passive HTTP recon only (no -L for status). No auth abuse.

| URL | code | location/notes |
|-----|------|----------------|
| `https://proton.me/` | 200 | - |
| `https://proton.me/security` | 404 | - |
| `https://proton.me/security/bug-bounty` | 200 | - |
| `https://proton.me/support/bug-bounty-program` | 404 | - |
| `https://account.proton.me/` | 200 | - |
| `https://account.proton.me/login` | 200 | - |
| `https://account.proton.me/signup` | 200 | - |
| `https://mail.proton.me/` | 200 | - |
| `https://drive.proton.me/` | 200 | - |
| `https://calendar.proton.me/` | 200 | - |
| `https://pass.proton.me/` | 200 | - |
| `https://vpn.proton.me/` | 301 | https://protonvpn.com/ |
| `https://account.proton.me/.well-known/openid-configuration` | 200 | - |
| `https://api.protonmail.ch/` | 404 | - |
| `https://mail-api.proton.me/` | 404 | - |
| `https://protonmail.com/` | 301 | https://proton.me/mail |
| `https://protonstatus.com/` | 301 | https://status.proton.me |
| `https://app.intigriti.com/researcher/programs/proton` | 302 | https://app.intigriti.com/auth/researcher?redirect=%2Fresearcher%2Fprograms%2Fproton |
| `https://www.intigriti.com/programs/proton` | 308 | https://app.intigriti.com/programs/proton/ |
| `https://blog.proton.me/` | ERR | - |

## Summary
Proton public BB SSoT + account/product shells + Inti program path for runner-b F3.
