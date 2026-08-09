# Refill-prep — Atlassian Cloud (map-only)

**Status:** STUB · not ACTIVE hydra lane · **keep-8 rank 3** (`EV-QUEUE.md`)  
**SSoT:** `~/.xbgst/bounty-distill/2026-08-07/ROI.md` · `HUNT-NOW.md` B3 · `scopes/atlassian.md` · `playbooks/atlassian.md`  
**Policy:** MAP ≠ COMPLETE · no exploit steps · free `bugbounty-test-*` is **human create**

## Why keep-8

- Dense SaaS surface with known **Cloud IDOR / cross-instance** skill fit for this stack.  
- Free `bugbounty-test-*` site path is the cheapest **unstarted** human door after H1–H3 locks (connector R1).  
- BC Atlassian engagement aligns with existing dual-auth / web-authz playbooks.  
- Open-state EV mid-pack (~11) with clear effort once site exists — high **time_to_first_submit** if human creates site early.

## First human action

1. On Bugcrowd Atlassian engagement, create free **`bugbounty-test-*`** Cloud site per program rules (browser; one clean create — no form spam).  
2. Optionally invite second research user for authz matrix (if policy allows).  
3. Record site URL / cloud ID in op title or local note via the-janitor — **no secrets in git/distill**.  
4. Confirm in-scope products (Jira/Confluence/etc. as program states) before agent deep work.

## First agent action when open

1. After refill/assign: `SCOPE-NOTES.md` from `scopes/atlassian.md` with FIDELITY tags; list **own** site only.  
2. `FIRST-5-TESTS.md`: own-site authz, project/space membership, cross-user visibility — template only until human site exists.  
3. `evidence/OWN-ASSET.md`: cloud site name + research user labels (no session tokens).  
4. Dual-auth reuse pointers from Auth0 race only if **same class** applies to Atlassian session cookies — do not re-open Auth0 CAPTCHA doors.  
5. COMPLETE only via `COMPLETE-GATE.md`.

## Kill criteria

| Kill if | Action |
|---------|--------|
| No `bugbounty-test-*` site after reasonable human attempt | Stay queue; do not probe random customer clouds |
| Site create blocked (KYC / entitlement) | BLOCKED(human); document in STATUS |
| Out-of-scope product line targeted by mistake | Stop; re-read scope |
| Cross-instance tests against non-owned sites | **Hard kill** — policy breach |
| COMPLETE without OWN-ASSET evidence | Refuse |

## Non-goals

Tenant spam · unauth spider of atlassian.net customers · overnight OVERFIT flip away from Aiven without judge · fake COMPLETE.
