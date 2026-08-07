# F3 — Proton dual-account setup checklist

**UTC:** 2026-08-07 · **Runner:** B · **Mode:** setup readiness only · **No live exploit**  
**Parent plan:** `findings/F3-proton-dual-account.md` · **Policy:** https://proton.me/security/bug-bounty  
**Report channel:** security@proton.me (PGP encouraged) · **Max:** USD $100,000

## Axes

| Axis | Intent |
|------|--------|
| auth_ready↑ | Two free proton.me accounts + isolated sessions + report path |
| safety_in_policy↑ | Researcher-owned only; benign seed data; stop-and-ask ambiguous |
| repro_minimality↑ | Smallest Mail/Drive object set for later dual-account authz |
| secret_hygiene↑ | No passwords/tokens in distill; op:// only if vaulted later |

## Pre-flight

- [ ] Read live bounty page same day (scope/rewards may change).
- [ ] Bookmark report channel; note PGP key/fingerprint from official page only.
- [ ] Confirm free-tier accounts are sufficient for Mail + Drive web surfaces.
- [ ] No HackerOne join required (first-party email program).
- [ ] No secrets written into `runner-b/` or git ship path.

## Account A (owner / victim)

| Step | Action | Done |
|------|--------|------|
| A1 | Create free Proton account controlled by researcher only | [ ] |
| A2 | Label notes: `proton-a-owner` (local notes, not in public distill) | [ ] |
| A3 | Dedicated browser profile/container (no shared cookies with B) | [ ] |
| A4 | Enable 2FA if desired; store recovery offline (never in repo) | [ ] |
| A5 | Seed **benign** Mail: draft/message subject `idor-test-a-owned-message` | [ ] |
| A6 | Seed **benign** Drive: folder + text file `idor-test-a-owned-file.txt` | [ ] |
| A7 | Optionally create one intentionally shared object later (control case) | [ ] |
| A8 | Do **not** store real PII, production secrets, or third-party data | [ ] |

## Account B (attacker / non-owner)

| Step | Action | Done |
|------|--------|------|
| B1 | Create **separate** free Proton account (different credentials) | [ ] |
| B2 | Label notes: `proton-b-attacker` | [ ] |
| B3 | Separate browser profile/container; never mix sessions with A | [ ] |
| B4 | Confirm B cannot see A private objects via normal UI (baseline) | [ ] |
| B5 | No mass signup, no temp-mail spam, no bulk creation | [ ] |

## Isolation rules

1. Two profiles (or two containers) — never one profile dual-login flip for evidence.
2. Screenshots must show which account is active (address/UI chrome) without revealing passwords.
3. Local evidence dir may hold redacted HAR later; scrub tokens/session cookies before any ship.
4. Vault (optional): titles only — e.g. `op://Personal/Proton-A/…` — never expand into markdown.

## Report path prep

| Step | Action | Done |
|------|--------|------|
| R1 | Official page: https://proton.me/security/bug-bounty | [ ] |
| R2 | Note email: security@proton.me | [ ] |
| R3 | Import/save Proton security PGP public key from official source only | [ ] |
| R4 | Draft empty report skeleton (no claim until confirmed finding) | [ ] |
| R5 | Subject template ready: `Potential IDOR in Proton [Mail/Drive/API]…` | [ ] |

## Post-setup first actions (still freeze-friendly)

1. With A only: map normal Mail/Drive UI network IDs (inventory, no cross-account replay yet if freeze holds).
2. With B only: map own object shapes for comparison.
3. When freeze lifts: single-object B-authenticated checks against A-owned IDs per `F3-proton-dual-account.md`.
4. Expected secure: 403/404/empty; no A content to B.
5. Stop and email security@proton.me before ambiguous or high-risk methods.

## Stop conditions (absolute)

- No accounts not owned by the researcher  
- No production secrets / real sensitive personal data  
- No mass creation, brute force, scanning, DoS, mailbox flood  
- No public disclosure before Proton remediation  
- No theoretical report without concrete path  

## Status

**CHECKLIST READY — dual free accounts + isolation + email/PGP report path.**  
Accounts not created by this agent pass. No live tests. Expands F3 for human setup.
