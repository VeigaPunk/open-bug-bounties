# EV-QUEUE — overnight gold farm rank (keep-8)

**Session:** overnight-gold-farm · **Frozen:** 2026-08-08  
**SSoT membership:** `~/.xbgst/bounty-distill/2026-08-07/ROI.md`  
**Rubric:** `gold_ev_score ≈ payout_proxy(1–10) × skill_fit(1–10) × gate_factor(0|1) / effort(1–10)`  
**gate_factor:** `1` = human door open for own-asset work tonight · `0` = closed (no CAPTCHA thrash; prep only)  
**Policy:** MAP ≠ COMPLETE. No page-walk of ~1100 catalog. Exactly one **OVERFIT=y**.

## Ranked table

| Rank | Program | Lane | payout_band | skill_fit | gate_factor | effort | gold_ev_score | OVERFIT | overnight_action |
|------|---------|------|-------------|-----------|------------|--------|---------------|---------|------------------|
| 1 | **Aiven** | stack (H1) | 8 (avg ~$4.1k rewarded table; live cash) | 9 (authz / multi-tenant free tier) | **0** | 3 | **0** (open would be ~24) | **y** | Document free-tier dual path in NEXT-TICK; L3 policy/FIRST-5 pack on **own** ninja scope only; no fake project probes; pulse op titles `Aiven BB Account A/B API` (titles only) |
| 2 | **Auth0 CIC** | wrap (H2) | 7 (identity classes; BC) | 9 (dual-auth race reuse) | **0** | 3 | **0** (open ~21) | n | CRED-STATE poll only; map deepen; never Get-Credentials thrash / CAPTCHA |
| 4 | **Atlassian Cloud** | refill | 7 (Cloud IDOR / cross-instance) | 8 (web authz) | **0** | 5 | **0** (open ~11) | n | Queue only; map-only if refill fires; free `bugbounty-test-*` is human create |
| 3 | **Google VRP Drive** | grok (H3) | 9 (high ceiling web classes) | 8 (Drive FIRST-5 mapped) | **0** | 4 | **0** (open ~18) | n | Single-account partial map only; no dual-session thrash; negative-close pack OK if A/B never opens |
| 5 | **Proton** | refill | 9 (max $100k; email submit) | 7 (web/mail classes) | **0** | 4 | **0** (open ~16) | n | Policy-only FULL scope extract into playbook if overfit blocked all night |
| 6 | **MSRC (M365/web)** | refill | 8 (cloud ≤$100k family) | 6 (tenant friction) | **0** | 6 | **0** (open ~8) | n | Map-only on refill; no tenant spam |
| 7 | **Shopify H1** | refill | 8 ($200k ceiling) | 6 (dev store + staff) | **0** | 6 | **0** (open ~8) | n | Defer until H1 authed store ready (human) |
| 8 | **GitLab.com \| Dropbox Inti** | refill | 6 (pick one deep) | 6 | **0** | 6 | **0** (open ~6) | n | XOR: one deep lane only if refill; free group / Inti human |

### Score notes (qualitative 1–10)

| Field | Scale |
|-------|--------|
| payout_proxy | Published ceiling / live avg rewarded — not marketing alone |
| skill_fit | Web/authz/identity fit for this stack + dual-auth playbooks |
| gate_factor | **Binary overnight:** 0 closed · 1 open (human free-tier dual / cred assign / dual Google) |
| effort | Inverse of path clarity + account friction (lower effort → higher EV when gate opens) |
| gold_ev_score | Formula product; all **0** while doors closed — **rank order** is open-state EV + map readiness for when a door flips |

### Why OVERFIT = Aiven (exactly one)

1. Free-tier + `@bugcrowdninja` path is **documentable** (lane map + NEXT-TICK already shipped).  
2. Highest open-state EV (~24) among keep-8 with lowest effort when dual tokens land.  
3. Google single-account is partial but dual session still closed; Auth0 async cred empty.  
4. Fallback if Aiven stays closed all night: Google negative-close pack → Proton policy map (not new OVERFIT flip without judge).

### Kill / non-goals (do not promote)

YWH passport · pure SC+KYC · Sherlock races · alphabet walk of open-bug-bounties ~1100 · fake COMPLETE to force refill.

### Open-state recompute (connector / dawn)

When any gate flips to 1, recompute `gold_ev_score` and keep OVERFIT unless judge swaps. Whip remains log-only on closed doors.

**evidence:** gate freeze 2026-08-08 — H1 free-tier dual closed · H2 CRED REQUESTED empty · H3 second Google missing · hydra lanes MAPPED zero COMPLETE.

### open-state order note (r3 reviewer fix)
When all gate_factor=0, **rank numbers** should follow open-state EV: Aiven > Auth0 > Google > Proton > Atlassian > MSRC > Shopify > GitLab|Dropbox. Table rows may appear out of numeric sort after swap; **gold_ev open proxies** above are SSoT for order, not row position alone.
