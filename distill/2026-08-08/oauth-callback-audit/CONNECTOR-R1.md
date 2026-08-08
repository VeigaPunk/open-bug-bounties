# CONNECTOR-R1 — OAuth callback paste audit (cross-axis)

**Role:** gx-connector-r1  
**Date:** 2026-08-08  
**Scope:** `~/.xbgst/bounty-distill/2026-08-08/oauth-callback-audit/` (GitHub ← Google social callback paste)  
**Axes:** confidentiality · exploitability · accuracy · remediability  
**Hard lock:** NO_EXCHANGE · NO_REPLAY · `code=` only as `REDACTED_CODE`  
**Adjacent (pattern only, no secrets):** dual-auth-runners OAuth passive maps; `shared/BC-OAUTH-MAP.md`

---

# State

- **inf:** **Paste-to-LLM is a confidentiality event, not an exploit proof** — the authorization `code` in the query string is the bearer of redeemability; pasting the full callback into chat/logs/git multiplies exposure channels (history, training retention, support tickets, screenshots) without changing who can successfully redeem. Redeemers need a valid, unspent code **and** the correct client credentials / redirect_uri / PKCE verifier for that registration. Axes: confidentiality↑ noise, exploitability gated. **[strong]**  
  evidence: `PLAN.md` H1 + hard rules; URL shape `github.com/sessions/social/google/callback` with `code` + `state` + `prompt=none`

- **inf:** **Accuracy fork: expected OAuth redirect vs product bug** — presence of `code` on the callback URL is **protocol-normal** (RFC 6749 auth-code front channel). Calling it a “GitHub OAuth critical” without evidence of failed state binding, open redirect into the leak path, or missing single-use/TTL is accuracy-negative bounty theater. Real bug surface is **exposure channel + binding failure**, not “code appeared in browser bar.” Axes: accuracy, remediability (hygiene vs program report). **[strong]**  
  evidence: `PLAN.md` Phase-0 false-positive note; H2/H3 marked passive-only / unknown state binding & PKCE

- **inf:** **Credential hierarchy (second-order): state ⊈ secret; code = short TTL secret; client_secret = durable gate** — `state` is a CSRF/session-correlation nonce (valuable for fixation analysis if unbound, not for token mint). `code` is single-use / short-TTL by design and must never be stored or re-pasted. For **confidential** clients, token endpoint still demands `client_secret` (or equivalent); public SPA clients shift the gate to PKCE `code_verifier`. Mis-ranking these three causes both under-remediation (ignore code) and overclaim (treat state leak as ATO). Axes: exploitability, accuracy. **[strong]**  
  evidence: OAuth2 standard model; dual-auth passive notes that `client_id` is public in authorize URLs (`BC-OAUTH-MAP.md`) while vault holds durable creds; PLAN assumes single-use code without redeem test

- **inf:** **`prompt=none` amplifies silent re-binding frequency, not a novel vuln class** — OIDC `prompt=none` means “no interactive UI if session already exists,” so browsers generate more background/social reauth callbacks (and more accidental log/Referer/paste events). It does **not** by itself break state binding or skip consent gates. Severity attach only if product mishandles high-frequency silent callbacks (logging codes, weak binding under race). Axes: remediability, confidentiality (volume), accuracy (don’t inflate). **[medium→strong]**  
  evidence: `PLAN.md` H4; observed `prompt=none` on social Google callback

- **inf:** **Dual-auth / OAuth race patterns (related, not isomorphic)** — dual-auth-runners treated OAuth as **door mapping** (authorize/token/userinfo status, PKCE S256 signals on Okta admin callback, public `client_id`, separate tenants) under NO_AUTH / no token harvest. Parallel race was substrate gates and claim hygiene, not auth-code races. Transferable lessons: (1) map doors before claiming break; (2) never persist `state`/`nonce`/`code`; (3) public mirror must stay secret-clean — same ship gate as this audit M05. GitHub social callback paste is **incident hygiene + threat model**, not a second dual-auth runner race. Axes: ship_hygiene, exploitability discipline. **[medium]**  
  evidence: `dual-auth-runners/shared/BC-OAUTH-MAP.md`; `runner-b/*OAUTH*` passive pulses; CONNECTOR dual-auth closeout (GATES done, no code exchange)

- **risk:** **Second-order agent failure** — scout/executor “verify” by hitting token endpoint or loading full callback URL → accidental consumption or session side-effect; or write full `code=` into git history → permanent confidentiality loss on public ship. Condition: any milestone drops NO_EXCHANGE or secret-gate.  
  **risk:** **Over-report to GHBB** — program rejects expected OAuth URL shape as out-of-scope / informational → credibility burn. Condition: FINDINGS inflate H1 without product-side binding evidence.  
  **risk:** **Under-remediate operator** — assume “code already used” without session revoke / history scrub; residual window if code unspent and confidential client secret ever co-leaked (out of band). Condition: REMEDIATION skips session + history channels.

---

# Dissent

| Claim | Who disagrees | Why |
|-------|----------------|-----|
| “Paste to LLM is mainly hygiene, not Critical” | Severity-max hunters | Want max label from any credential-shaped string; underrates client_secret/PKCE gate |
| “state is not a secret” | Fixation-focused analysts | Correct that unbound state is a **CSRF** bug class — but that is a different finding than code leak; conflating confuses remediability |
| “prompt=none is signal of weak auth” | OIDC implementers | Standard silent SSO; frequency ≠ vulnerability |
| “Link dual-auth race to this paste” | Dual-auth substrate owners | Dual-auth was multi-program door race + gates; this is single-URL incident distill — pattern borrow only |

---

# Rationale

**Strange angle:** The dangerous move is not “GitHub put a code in a URL” (expected) but **the human/agent pipeline that treats callback URLs as debug text**. Confidentiality collapses at paste boundaries (chat, distill, support, browser extensions); exploitability stays **asymmetric** because GitHub-as-Google-client is almost certainly a confidential or tightly bound server flow — interceptors who lack the redeem side credentials get a dead code after TTL/single-use. The audit wins by scoring axes separately:

| Axis | Primary question | Default for this paste (pre-M02/M03 evidence) |
|------|------------------|-----------------------------------------------|
| confidentiality | Who saw the full URL after first paint? | **Degraded** once pasted to LLM/chat/files |
| exploitability | Can a third party mint a GitHub session from this URL alone? | **Unknown-low** without client secret/PKCE/session; **do not test by redeeming** |
| accuracy | Is this a product bug or expected OAuth + exposure? | **Bias to expected OAuth** until binding/log product defects evidenced |
| remediability | What can operator do without product change? | **High** — revoke sessions, clear history/password-manager clipboards, never re-paste, rotate if co-leak of secrets |

**Cross-axis keep moves (for judge / later milestones):**

1. **Keep:** Treat every artifact as secret-gated; `REDACTED_CODE` only — improves confidentiality, harms none.  
2. **Keep:** Separate “leak channel inventory” (H1) from “binding/CSRF claims” (H2) — improves accuracy + remediability.  
3. **Keep:** Label `prompt=none` as frequency/UX, not CVSS root cause — improves accuracy.  
4. **Discard:** Live exchange / replay “to see if it still works” — harms confidentiality + legal/program axes.  
5. **Borrow only:** dual-auth passive door discipline and no-store of ephemeral OAuth params — do not re-open dual-auth race.

---

## Link graph (sanitized)

| Artifact | Role |
|----------|------|
| `PLAN.md` (this dir) | Axes, H1–H5, milestones, NO_EXCHANGE |
| `PARAM-INVENTORY.md` | M01 — lengths only (pending/if present) |
| `THREAT-MODEL.md` / `FINDINGS.md` / `REMEDIATION.md` / `REPORT.md` | M02–M05 (downstream) |
| `~/.xbgst/bounty-distill/2026-08-07/dual-auth-runners/shared/BC-OAUTH-MAP.md` | Passive IdP map; public client_id; no state/code store |
| `dual-auth-runners/runner-b/*OAUTH*` | Passive authorize/token door pulses; NO token harvest |
| Public ship target | `~/Projects/open-bug-bounties/distill/2026-08-08/oauth-callback-audit/` after APPROVED |

---

## Evidence tags

| Tag | Meaning |
|-----|---------|
| `ev:plan-r0` | Phase-0 PLAN hypotheses H1–H5 |
| `ev:url-shape` | Host/path + param names only; no raw code |
| `ev:bc-oauth-map` | Dual-auth BC Okta/OIDC passive map |
| `ev:dual-oauth-passive` | Runner-b OAuth door pulses (status-only) |
| `ev:rfc-auth-code` | Expected front-channel code; single-use assumption (untested) |
| `ev:no-exchange` | Explicit policy — no redeem/replay in this distill |

---

## Status

**Connector R1 complete.** Cross-axis pattern synthesis only; no live auth; no full OAuth codes written.  
`[connector-gate: advisory · no-ship · secrets: none in this file]`

GODSPEED: after durable M01–M05 APPROVED + secret gate green →  
`~/.xbgst/scripts/milestone-ship.sh --label "oauth-callback-audit" --src "$HOME/.xbgst/bounty-distill/2026-08-08/oauth-callback-audit" --msg "Ship sanitized GitHub Google OAuth callback leak audit distill."`
