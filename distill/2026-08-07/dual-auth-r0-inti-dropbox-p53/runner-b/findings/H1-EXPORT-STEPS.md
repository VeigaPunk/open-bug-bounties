# H1 — Shopify policy export steps (logged-in only)

**UTC:** 2026-08-07 · **Runner:** B · **Mode:** documentation of export procedure · **No live exploit**  
**Goal:** Lift Shopify H1 asset fidelity **PARTIAL → FULL** via researcher browser session  
**Program:** https://hackerone.com/shopify  
**Public FP:** https://www.shopify.com/bugbounty · criteria · rewards · getting-started  
**Parent:** `findings/H1-shopify-criteria.md`

## Why export

Unauthenticated H1 program shell is SPA-heavy; structured **in-scope assets / out-of-scope / policy body** need a **warm HackerOne session**. Export while logged in preserves evidence fidelity without inventing asset tables.

## Preconditions

| Check | Note |
|-------|------|
| H1 account | Status: **authed** (ACCOUNTS / AUTH-READINESS) |
| Vault | `op://Personal/HackerOne/…` titles only — never expand secrets into distill |
| Browser | Prefer dedicated profile already used for H1 (pre-authed tab) |
| Scope of this doc | **Export + save artifacts only** — no store attacks, no Support tickets |
| Store email later | `YOURHANDLE@wearehackerone.com` partners bugbounty signup (separate step) |

## Logged-in export procedure

### 1. Open program

1. Navigate to `https://hackerone.com/shopify` while signed in.
2. Confirm program name **Shopify** and status (open / managed).
3. If prompted for 2FA, complete in browser only — do not paste codes into agent chat or files.

### 2. Capture policy surfaces

On the program page, open each relevant tab/section and save:

| Surface | What to capture | Suggested local filename (under runner-b or private notes) |
|---------|-----------------|------------------------------------------------------------|
| Policy / program brief | Markdown or print-to-PDF of policy text | `raw-h1/shopify-policy-YYYYMMDD.pdf` |
| Scope / assets table | Asset identifier, type, max severity, eligibility | `raw-h1/shopify-assets-YYYYMMDD.md` (manual table OK) |
| Out of scope | Explicit OOS rows and footnotes | same file section `## OOS` |
| Bounties / rewards | Severity → payout bands if shown on H1 | `raw-h1/shopify-bounties-YYYYMMDD.md` |
| Response efficiency / known issues | If present, note only titles that affect authz hunt | optional |

**How to save (pick one, prefer offline-safe):**

1. **Browser print → Save as PDF** (full policy page).  
2. **Select scope table → copy → paste markdown table** into private notes, then **sanitize** and merge into distill.  
3. H1 native **download / export** control if available in UI (use program’s own export when offered).  
4. Avoid scraping tools that hammer H1; one human session is enough.

### 3. Sanitize before any ship path

Before copying into `findings/` or open-bug-bounties:

- [ ] Strip session cookies, CSRF tokens, auth headers from HAR/PDF metadata if any  
- [ ] Redact personal email beyond `HANDLE@wearehackerone.com` pattern  
- [ ] No password, OTP, API key, or `op` reveal  
- [ ] Run leakage `rg` on paths (see SCRUB / milestone-ship gate)

### 4. Fidelity upgrade checklist

| Field | After export |
|-------|----------------|
| Asset identifiers | Copied from live H1 scope |
| Asset types (URL/API/etc.) | Mapped |
| Max severity per asset | Recorded |
| Known N/A vs criteria page | Cross-checked with public Shopify criteria |
| Local tag | Set **FIDELITY: FULL** on H1 Shopify map when table complete |
| Update | `findings/H1-shopify-criteria.md` + `AUTH-READINESS.md` H1 row |

### 5. After export (store prep — not exploit)

1. Partners: https://partners.shopify.com/signup/bugbounty  
2. Create store(s) with **`YOURHANDLE@wearehackerone.com` only**  
3. Test **only** those stores; never other merchants  
4. Submit reports **only** via HackerOne Shopify  
5. **Do not** contact Shopify Support about bounty validation  

## What this file is not

- Not a live asset dump (session not performed by this agent pass).  
- Not an attack plan against Shopify production merchants.  
- Not permission to automate H1 scraping.

## Status

**EXPORT STEPS DOCUMENTED.** Human executes while H1 session warm → then lift PARTIAL→FULL and re-score auth_ready.
