# CRITIC — gx-critic-oauth

**Package:** oauth-callback-audit · 2026-08-08  
**Judge verdict under review:** hygiene WARN + design INFO; **not bounty-worthy**; no Class B product bug  

## Verdict on judge package

**ACCEPT-WITH-NITS**

Axes: accuracy · overclaim · residual exploitability · confidentiality of distill.

Core direction is sound: code-in-query is expected auth-code front-channel; confidential-client redeem gate is load-bearing; paste is an operator confidentiality event, not a free GitHub ATO. Nits below are overclaim tightness, residual gaps, and distill hygiene.

---

```
CRITIQUE: Flat “not bounty-worthy” over-closes H2 while state binding remains untested
SEVERITY: CONSIDER
CURRENT: REPORT/THREAT-MODEL: bounty No / not recommended without PoC
ALTERNATIVE: “Not bounty-worthy *for claim ‘code appears in callback’*; H2/login-CSRF stays open-unknown, not closed-negative”
TRADE-OFF: Flat No reduces program spam; risks accuracy if readers treat unproven state bind as verified secure
FAILURE-MODE: Future public state-binding fail on social path would make package look like premature absolution
CONFIDENCE: high
```

```
CRITIQUE: WARN on paste is correctly scoped; slight underclaim on multi-channel residual
SEVERITY: MONITOR
CURRENT: Class C WARN (ops) + assume code compromised
ALTERNATIVE: WARN + explicit residual matrix: history, extensions, MITB, support phishing, LLM/provider logs
TRADE-OFF: Current WARN avoids Critical theater; underspecs attacker who never redeems at Google but social-engineers with the URL
FAILURE-MODE: Operator thinks “WARN = low” and ignores session review
CONFIDENCE: medium
```

```
CRITIQUE: Full 32-hex state left in PARAM-INVENTORY while code redacted
SEVERITY: CONSIDER
CURRENT: state=<32-hex-REDACTED> published in distill
ALTERNATIVE: state → REDACTED_STATE (length/entropy class only), matching PLAN sanitize table
TRADE-OFF: Full state aids correlation research; is CSRF/session-bind material and fingerprint of a real login attempt
FAILURE-MODE: Combined with other leaks, aids fixation analysis; inconsistent secret gate vs code
CONFIDENCE: high
```

---

## Challenge answers

1. **Is “not bounty-worthy” too strong if state binding is unknown?**  
   **Partially.** Correct for the *reported claim class* (code on callback URL = product vuln). Too strong as a blanket product-health certificate. FINDINGS already lists state storage as open unknown “not blocking verdict” — that is the right hierarchy: close A-class bounty theater, keep B-class conditional. Wording fix: “not bounty-worthy **on this evidence for this URL shape**,” not “GitHub social OAuth is fine.”

2. **WARN under/over stated?**  
   **Neither for ATO; slightly under for residual ops.** Redeem-without-secret remains blocked → Critical/ATO from paste alone is overclaim. WARN fits unused short-TTL credential paste. Under: multi-tenant LLM retention, corporate DLP, and “support phish with real-looking callback” deserve one line each (see §3).

3. **Missing residual risk?**  
   Package mentions extensions/history/Referer/support dump briefly. Gaps:
   - **Browser extensions** with `tabs`/`history` (not only “URL access”) as systematic harvesters  
   - **Man-in-browser / malicious software** (session cookies dominate; code is secondary)  
   - **Support / social phishing** (paste URL to fake “GitHub Support” → urgency + session review bait)  
   Not CRIT findings; add to residual backlog so hygiene is not equated with “only LLM chat.”

4. **Should state hex have been redacted?**  
   **Yes.** PLAN said state REDACTED; inventory shipped full value. State is not `client_secret`, but it is live session-correlation material. Redact in any ship mirror; treat as PII-adjacent incident data.

---

## Sound (keep)

NO_EXCHANGE/NO_REPLAY · confidential-client gate · F1 INFO vs F2 WARN · no H1 for code-in-URL alone.

## Nits (optional executor)

Soften REPORT bounty cell (claim-class scoped) · redact `state` in inventory/ship · residual line: extensions · MITB · support phish · LLM logs.

**APPROVED as critic pass:** ACCEPTED with nits; do not REJECT hygiene-over-bounty.
