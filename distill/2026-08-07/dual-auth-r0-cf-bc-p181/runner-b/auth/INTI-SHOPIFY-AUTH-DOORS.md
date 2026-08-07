# Intigriti + Shopify partners auth doors — passive (Runner B)

**UTC:** 2026-08-07T14:40:09Z  
**Policy recon only** — no login, no store create, no exploit.

## Live status this tick

| URL | Code | Role |
|-----|------|------|
| https://app.intigriti.com | 200 | Researcher app shell |
| https://app.intigriti.com/auth/login | 200 | Inti login |
| https://app.intigriti.com/researcher | 200 | Researcher home shell |
| https://www.intigriti.com | 200 | Marketing |
| https://www.intigriti.com/researchers | 200 | Researcher landing |
| https://api.intigriti.com | **404** | No public bare API root |
| https://partners.shopify.com | 200 | Partners home |
| https://partners.shopify.com/signup | 200 | Partner signup (own test only later) |
| https://accounts.shopify.com/store-login | 200 | Store login shell |
| https://www.shopify.com/bugbounty | 200 | Program home (prior) |
| https://hackerone.com/shopify | 200 | H1 submit SSoT |

## Atlassian id (cross-lane note for A)

| URL | Code | Role |
|-----|------|------|
| https://id.atlassian.com | **202** | Id shell (unauth) |
| https://id.atlassian.com/login | **202** | Login shell |
| https://auth.atlassian.com | **202** | Auth host shell |
| https://admin.atlassian.com | 200 | Admin shell |
| https://identity.atlassian.com | **000/ERR** | Host unreachable/timeout this tick |

## Auth-ready implications

1. **F4 Dropbox** stays Inti-first; login door **200** — join still human + @intigriti.me trial.
2. Shopify bounty path remains **H1**; partners/signup is for **own** test stores only after H1 export.
3. Inti public API root is not a recon target (404); use app SPA when authed.
4. Atlassian unauth shells return **202** — expect browser OAuth; BC engagement remains SSoT for bounty.

## Related

- `F4-DROPBOX-HTTP.md`, `H1-SHOPIFY-PASSIVE.md`
- Runner A: `OPENAI-ATLASSIAN-PASSIVE.md`

## Axes

- auth_ready_b↑ (Inti/Shopify doors)
- evidence_fidelity↑ (api.intigriti 404; Atlassian 202)
- safety_in_policy↑
