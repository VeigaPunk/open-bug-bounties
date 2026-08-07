# PRODUCT-PICK — Google VRP (lane grok)

**Date:** 2026-08-07  
**Lane:** grok · hydra  
**Constraint:** own Google accounts only · no third-party / customer assets

## Single product

| Field | Choice |
|-------|--------|
| **Product** | **Google Drive** (Docs-as-objects via Drive file model) |
| **Primary hosts** | `drive.google.com`, `docs.google.com`, related `*.google.com` Drive/Docs API surfaces |
| **Class focus** | **Authorization / IDOR / ACL residual access** (S2a–S2b logic when impact is IT0/IT1) |
| **Why one product** | Comma-fast: dense sharing model, clear object IDs, IT1 data (document contents) maps to published reward rows; avoids thrash across Mail/Photos/Cloud |
| **Accounts** | Account **A** (asset owner) + Account **B** (unauthorized / demoted peer) — both **research-owned** |

## In-scope signal (policy)

- Main Google/Alphabet VRP: `*.google.com` services handling sensitive user data.
- Qualifying: authentication/authorization flaws; logic flaws / direct object reference with user-data impact.
- Drive document contents = **Information Tier 1** examples in official rules (with Keep notes, private messages, etc.).
- State-change examples called out as **Impactful Actions**: sharing a user’s documents; deleting Drive files.

## Explicit out-of-product / OOS for this pick

- `*.appspot.com` / `*.bc.googleusercontent.com` customer apps  
- Sandbox XSS-only on `*.googleusercontent.com` without sensitive-data impact  
- URL redirect alone, logout CSRF, user enum alone, DoS / high-volume auto  
- Cloud customer projects (use Cloud VRP only on **own** GCP if ever expanded)  
- Acquisitions under 6-month blackout  

## Success definition for this card

Map share/get/list/permission surfaces for **own** Drive files; execute FIRST-5-TESTS on A/B accounts; file only if clear confidentiality/integrity impact with short PoC.
