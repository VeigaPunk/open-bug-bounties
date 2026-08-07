# H1 Shopify — passive policy HTTP map (Runner B)

**UTC:** 2026-08-07T14:21:43Z  
**Policy recon only** — no login, no store creation, no exploit.

## Live status this tick

| URL | Code | Role |
|-----|------|------|
| https://hackerone.com/shopify | 200 | Program SPA shell (assets PARTIAL unauth) |
| https://www.shopify.com/bugbounty | 200 | Public program home |
| https://www.shopify.com/bugbounty/criteria | 200 | Eligibility / criteria |
| https://www.shopify.com/bugbounty/scope | **404** | No public scope path — use H1 logged-in assets |
| Inti Dropbox public detail | 200 | XOR F4 path still live |
| Inti researcher Dropbox | 200 | Researcher join UI |
| proton.me/security/bug-bounty | 200 | F3 |
| bughunters.google.com | 200 | F1 |
| msrc.microsoft.com | 200 | F2 hub |
| portal.msrc.microsoft.com | 200 | MSRC portal shell |

## Auth-ready implications

1. **Scope fidelity** stays **PARTIAL** until human H1 session export (see `findings/H1-EXPORT-STEPS.md`).
2. Public criteria page is enough for **eligibility rules** (own stores via `HANDLE@wearehackerone.com`); not for full asset inventory.
3. Do **not** use Support tickets for bounty; submit via H1 only.
4. First 2h class after export: staff/role authz + API on **own** test stores only.

## Related artifacts

- `findings/H1-shopify-criteria.md`
- `findings/H1-EXPORT-STEPS.md`
- `../shared/PULSE-HTTP.md`
- XOR: F4 deep / H2 park (unchanged)

## Axes

- evidence_fidelity↑ (404 on /bugbounty/scope documented)
- auth_ready↑ (clear next: H1 export)
- safety_in_policy↑ (passive only)
