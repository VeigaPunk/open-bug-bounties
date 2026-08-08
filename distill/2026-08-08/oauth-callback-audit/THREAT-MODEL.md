# Threat model: GitHub Google social OAuth callback URL (front-channel code)

**Role:** gx-sentinel-oauth  
**Date:** 2026-08-08  
**Scope:** Sanitized URL shape only. **NO_EXCHANGE. NO_REPLAY. NO HTTP requests that include `code`.**  
**Axes:** accuracy · confidentiality · exploitability · remediability  

## Subject (sanitized)

```
https://github.com/sessions/social/google/callback
  ?state=<32-hex>
  &iss=https://accounts.google.com
  &code=REDACTED_CODE
  &scope=email+profile+userinfo.email+userinfo.profile+openid
  &authuser=0
  &prompt=none
```

| Metric | Value |
|--------|--------|
| Host / path | `github.com` / `sessions/social/google/callback` |
| Transport | HTTPS |
| `code` length | 73; prefix class `4/` (Google auth-code shape) |
| `state` | 32 hex chars |
| `prompt` | `none` |
| `authuser` | `0` |
| Grant | Authorization code in **query** (not fragment) |
| Flow | Google IdP → GitHub RP (expected confidential server-side client) |

**Explicit operational ban:** Do not call Google token endpoint, do not replay callback, do not paste live codes into tickets/chat/logs again. Use `REDACTED_CODE` only.

---

## 1. Actors

| Actor | Capability | Goal / interest |
|-------|------------|-----------------|
| **Victim** | Authenticated (or re-auth) Google account; browser navigates to GitHub callback | Complete “Sign in with Google” / silent reauth; obtain GitHub session |
| **Attacker with URL** | Obtains full callback URL (paste, history, proxy log, Referer, screenshot OCR, support dump) | Redeem code → tokens for Google identity scopes **or** fixate / bind GitHub session if state/code misuse allows |
| **Concurrent device / race** | Same victim multi-tab; or attacker races redeem before GitHub | Consume single-use code first |
| **Referrer third-party** | Page loaded after callback if browser leaks Referer with full query (misconfig, mixed navigations, analytics) | Harvest `code`+`state` from Referer / beacon |
| **GitHub (RP)** | Holds registered `client_id`, **client_secret**, redirect_uri; validates `state`; exchanges code server-side | Establish GitHub session bound to Google identity |
| **Google (IdP)** | Issues short-TTL single-use codes; enforces redirect_uri + client binding on token endpoint | Issue ID/access tokens only to correct client |

---

## 2. Assets

| Asset | Sensitivity | Notes |
|-------|-------------|--------|
| **Authorization code** | High (bearer for **one** token exchange, if still unused + in TTL) | Front-channel; expected to leak more easily than refresh tokens |
| **`state`** | Medium (CSRF / request correlation) | 32-hex; must bind to browser session that started auth |
| **GitHub session cookie** (post-success) | Critical | Primary product session — **not** present in the pasted URL alone |
| **Google ID / access tokens** (post-exchange) | High | Scopes observed: `openid email profile userinfo.email userinfo.profile` — identity profile, **not** GitHub repo/org OAuth scopes |
| **GitHub `client_secret`** | Critical | Not in URL; required for confidential-client redeem per Google web-server flow |
| **PKCE verifier** | High if used | **Unknown** whether GitHub’s Google social path uses PKCE; mark open |

**Out of asset scope:** GitHub personal access tokens, org SSO, repository secrets — not conveyed by this callback shape.

---

## 3. Trust boundaries

```
[Google accounts UI / session]
        |  302 redirect with code in query
        v
[Browser address bar / history / extensions]
        |  GET github.com/.../callback?...
        v
[GitHub edge + sessions service]
        |  server-side POST token (client_id + secret + code + redirect_uri)
        v
[Google token endpoint]
        |  id_token / access_token
        v
[GitHub account link / session mint]
```

Front-channel (browser) is **untrusted** for code confidentiality. Back-channel exchange is trusted only if secret + redirect_uri binding hold.

---

## 4. Hypotheses H1–H5

### H1 — Third party redeems `code` without GitHub `client_secret`

**Claim:** Attacker who only has the callback URL can exchange `code` at Google’s token endpoint for tokens.

| | |
|--|--|
| **Likelihood** | **Low** for standard confidential web client (GitHub-as-RP) |
| **Impact** | **High** if true (Google identity tokens for victim; email/profile; possible account linking abuse depending on GitHub logic) |
| **Confidence** | **High** on *design* expectation; **Medium** on GitHub’s exact client type (public vs confidential) without live probe |

**Reasoning (no exchange performed):**

- Google “web server” / confidential apps require `client_id` + `client_secret` + matching `redirect_uri` on token exchange (Google OAuth web-server documentation).
- Authorization codes are bound to the client that requested them; wrong client_id/secret → reject.
- RFC 9700 (OAuth 2.0 Security Best Current Practice): codes are high-value; confidential clients reduce third-party redeem risk; **PKCE recommended** even for confidential clients; codes still leak via front channel.
- If GitHub registered a **public** client without secret (unusual for server social login), risk rises — **unknown**, not asserted.

**Exploit path (conditional):** Attacker obtains unused code → POST `oauth2.googleapis.com/token` with **stolen or leaked GitHub client_secret** (supply-chain / secret dump) **or** if client were public + no PKCE, with client_id only. **Without secret and with confidential client: expected fail.**

**Severity if only URL leaked:** **INFO / expected residual** for third-party redeem; not a standalone “GitHub critical” without secret leak or public-client misconfig proof.

---

### H2 — Code injection / session fixation against victim GitHub session

**Claim:** Attacker crafts or replays a callback (`code`+`state`) so victim’s browser completes login as attacker, or attacker’s session binds to victim’s Google identity.

| Subcase | Likelihood | Impact | Confidence |
|---------|------------|--------|------------|
| **H2a** Attacker code + attacker state forced into victim browser | Low if `state` is cryptographically bound to victim pre-auth session and checked | High (login CSRF / session swap) | Medium (state binding is **unknown** without source) |
| **H2b** Attacker reuses victim’s stolen code on attacker browser | Low–Med: single-use + state mismatch should fail | High if succeeds | Medium |
| **H2c** Classic session fixation (attacker sets session id pre-login, victim authenticates) | Depends on GitHub session lifecycle | High | Low without product evidence |

**Reasoning:**

- OAuth `state` exists to stop CSRF on the redirect endpoint (OWASP OAuth 2.0 Cheat Sheet; RFC 9700).
- Correct RP: generate `state` in server/session store → IdP → callback must match **same** browser session before exchanging code → then mint **new** session id.
- Stolen **victim** callback used by attacker: exchange may succeed **server-side** only if attacker can present the same RP session cookie that holds `state` **or** if state is not bound. Confidential exchange still happens on GitHub servers when **GitHub** receives the callback — so “attacker opens URL in own browser” typically fails state check.
- **Code injection** (attacker substitutes own Google code into victim’s in-flight callback) requires modifying redirect or MITM TLS; HTTPS + HSTS on github.com make passive MITM hard.

**Severity:** Design-dependent. **No proof** of broken `state` from URL shape alone → **not bounty-ready** without a working cross-session demo (forbidden here: no replay).

---

### H3 — Leakage channels (paste, history, logs, Referer, screenshots)

**Claim:** The observed incident is primarily **credential disclosure via operator/chat channels**, not a novel protocol break.

| Channel | Likelihood of code exposure | Impact | Confidence |
|---------|----------------------------|--------|------------|
| **User paste into chat / issue / Discord** | **Observed** | High while code unused + TTL | **High** |
| Browser history / synced devices | High | High | High |
| Proxy / WAF / reverse-proxy access logs | Medium–High (query strings often logged) | High | High (RFC 9700 warns) |
| Crash dumps / APM / error trackers | Medium | High | Medium |
| **Referer** to third-party on subsequent navigation | Low–Med (modern Referrer-Policy often strips query) | High if leaks | Medium |
| Screenshots / screen share / shoulder | Medium | High | High |
| Browser extensions | Medium | High | Medium |

**Reasoning:**

- RFC 9700: authorization codes in URI query are exposed to browser history, logs, and Referer; prefer defenses (short TTL, one-time use, PKCE, confidential client, strict redirect).
- **This audit artifact was created because a live-looking code entered chat** — that channel is already a successful confidentiality failure for the **code asset**, independent of GitHub product bugs.
- Front-channel code delivery is **by design** for response_type=code with query response mode.

**Severity class:** **User / operator hygiene incident** + **residual design risk** of query-mode codes. Not by itself a GitHub product RCE/auth bypass.

**Remediation (operator):** Revoke Google sessions if needed; assume code burned or expired; never paste callbacks; scrub logs; prefer reporting with `REDACTED_CODE`.

---

### H4 — `prompt=none` silent reauth implications

**Claim:** `prompt=none` increases silent callback frequency and thus exposure surface (more codes in history/logs without user UI friction).

| | |
|--|--|
| **Likelihood** | **High** that parameter means “no interactive prompt” (OIDC `prompt`) when Google session already present |
| **Impact** | **Low–Medium** — more automatic redirects / codes; user may not notice auth traffic; slightly larger window of codes in browser artifacts |
| **Confidence** | **High** on OIDC semantics; **Medium** on GitHub product policy for when silent reauth is requested |

**Reasoning:**

- OIDC: `prompt=none` asks IdP to succeed without UI or return `login_required` / `interaction_required`.
- Successful silent reauth ⇒ callback with fresh `code` without user click-through — **good UX**, **more front-channel secrets** over time.
- Does **not** by itself mean codes are multi-use or secret-less.
- `authuser=0` selects first Google account profile in multi-login; can surprise users in shared browsers (account mix-up at identity layer, not GitHub secret leak).

**Severity:** **INFO** design/UX residual; elevates H3 volume, not H1 alone.

---

### H5 — Mix-up / `iss` parameter

**Claim:** Presence of `iss=https://accounts.google.com` relates to OAuth/OIDC mix-up defenses; mis-handling could allow wrong-IdP acceptance.

| | |
|--|--|
| **Likelihood** of exploitable mix-up from this URL alone | **Low** |
| **Impact** if RP ignores issuer binding | **High** (token from attacker IdP accepted as Google) |
| **Confidence** | **Medium** (iss in callback is a positive signal of modern issuer awareness; server behavior **unknown**) |

**Reasoning:**

- OAuth mix-up: attacker tricks RP into sending client to attacker AS, then using codes/tokens at honest AS or confusing client registration (RFC 9700 mix-up discussion; OIDC `iss` parameter in authorization response).
- `iss=https://accounts.google.com` on the callback is consistent with issuer identification in the auth response.
- Correct RP: validate `iss` matches expected Google issuer before exchange; use exact redirect_uri; do not accept codes from unexpected AS.
- URL shape showing `iss` is **not** evidence of vulnerability; absence of validation would be — **not proven**.

**Severity:** **INFO** unless demonstrated wrong-issuer acceptance (out of scope / no probe).

---

## 5. Attack trees (concrete, no execution)

### T1 — Attacker-only redeem (depends on secret)

1. Obtain callback URL (H3).  
2. Extract `code`.  
3. Attempt token POST with GitHub’s `client_id` **without** secret → **expected deny**.  
4. Only if `client_secret` also compromised → tokens for Google scopes (H1).  
5. Tokens ≠ automatic GitHub session unless attacker also drives GitHub’s callback with valid `state` binding.

### T2 — Race GitHub’s exchange

1. Victim completes Google; redirect in flight.  
2. Attacker sniffs code (malware, proxy, extension) **before** GitHub redeems.  
3. If confidential client: attacker still needs secret **or** must **be** the party GitHub trusts — typically attacker cannot complete GitHub’s server exchange.  
4. If attacker wins race **as GitHub** (compromised edge): product compromise, not OAuth shape issue.

### T3 — Login CSRF / fixation (state fail)

1. Attacker starts Google login for attacker account; captures intermediate values.  
2. Victim visits attacker-controlled link that hits GitHub callback with attacker `code`+`state`.  
3. If GitHub binds `state` to victim cookie: **fail**. If not: victim session becomes attacker Google identity (or vice versa).  
4. **Proof required** for bounty; URL paste does not prove broken state.

---

## 6. Severity taxonomy

| Class | Applies when | This case |
|-------|--------------|-----------|
| **A. Design-expected front-channel code** | Auth code in HTTPS query to registered redirect_uri; confidential RP | **Yes** — primary classification of the URL shape |
| **B. Actionable GitHub product bug** | Broken state, open redirect on callback, secret-less redeem, mix-up accept, session fixation, code not single-use server-side | **Not demonstrated** — unknowns remain |
| **C. User / operator hygiene incident** | Live code pasted to chat, committed, ticketed | **Yes** — observed disclosure channel |

### Residual risk scoring (URL-only evidence)

| Finding | SEVERITY | Notes |
|---------|----------|--------|
| Front-channel code in query (expected OAuth) | **INFO** | RFC 9700 residual; not a novel GitHub flaw by shape alone |
| Paste of live-shaped code into chat | **WARN** (ops) | Credential handling failure; treat code as compromised |
| Third-party redeem without secret (H1) | **INFO** (expected block) | Elevate to **CRIT** only with proof of secret-less redeem or leaked GitHub Google client_secret |
| State / CSRF failure (H2) | **—** unproven | Would be **CRIT/WARN** with PoC |
| Silent reauth volume (H4) | **INFO** | Hardening backlog (logging scrub, Referrer-Policy already common) |
| Mix-up / iss (H5) | **INFO** | `iss` present is mild positive signal |

**CRIT merge-block:** None from sanitized URL shape alone.

---

## 7. Verdict (bounty vs expected)

**Verdict: Not a bounty-worthy GitHub vulnerability on current evidence.**

- The URL is **consistent with a normal Google → GitHub social login authorization-code callback** (query mode, `state`, Google scopes, `iss`, `prompt=none` silent reauth).
- Presence of a long `code` starting with `4/` is **expected Google authorization-code formatting**, not proof of compromise of GitHub’s `client_secret` or of multi-tenant break.
- **Actionable incident type:** **operator credential disclosure** (code entered chat). Hygiene + assume single-use burn/expiry — **do not** attempt exchange to “check.”
- **Bounty bar for GitHub:** would need a **reproducible** issue such as: redeem without secret; accept attacker code without state; open redirect that exfiltrates codes to attacker origin; mix-up; or durable session mint without proper binding. None of these are evidenced by the sanitized paste.

**Residual product hardening (INFO backlog, not claim):** ensure PKCE on social Google client if not already; strict `state` session binding; minimize query logging on `/sessions/social/*/callback`; short code TTL already IdP-side; Referrer-Policy on post-login pages.

---

## 8. Explicit constraints (audit team)

```
NO_EXCHANGE  — never POST code to Google token endpoint
NO_REPLAY    — never GET the live callback URL with real code
NO_RAW_CODE  — artifacts use REDACTED_CODE only
NO_SECRET    — no client_secret hunting in this milestone
```

**Unknowns left open (do not invent):**

1. Whether this specific `code` was already redeemed by GitHub.  
2. Remaining TTL at time of paste.  
3. Whether GitHub’s Google social client uses PKCE.  
4. Exact `state` storage binding (cookie vs server store vs signed blob).  
5. Public vs confidential client registration details (expected confidential).

---

## 9. Evidence & standards (titles only)

- RFC 9700 — OAuth 2.0 Security Best Current Practice (authorization code leakage, PKCE, mix-up, confidential clients).  
- Google Identity — OAuth 2.0 for Web Server Applications (code exchange with client_secret + redirect_uri).  
- OWASP — OAuth 2.0 Cheat Sheet (state/CSRF, redirect URI, token handling).  
- OpenID Connect Core — `prompt=none`, authorization response parameters including issuer-related practice.

No live IdP or RP probing was performed for this document.

---

## 10. Findings bullets (sentinel format)

```
FINDING: Authorization code delivered in HTTPS query to GitHub Google social callback (design-expected front channel)
SEVERITY: INFO
VECTOR: Google 302 → browser history/logs/Referer surface per RFC 9700; not proof of GitHub defect
AFFECTED: github.com/sessions/social/google/callback (query response mode)
FIX: Product hardening backlog only (PKCE if missing, log scrubbing, state binding verify); not a merge-block
CONFIDENCE: high
```

```
FINDING: Live-shaped authorization code disclosed via chat paste (operator hygiene)
SEVERITY: WARN
VECTOR: User pasted full callback including code into conversational channel; any reader could attempt misuse within TTL
AFFECTED: human/process channel (not GitHub code path)
FIX: Rotate/assume burn; never paste codes; use REDACTED_CODE in reports; scrub shared logs
CONFIDENCE: high
```

```
FINDING: Third-party token redeem without GitHub client_secret (H1) — expected blocked for confidential RP
SEVERITY: INFO
VECTOR: Attacker with code-only posts to Google token endpoint lacking client_secret → expected rejection
AFFECTED: Google token endpoint + GitHub-registered client (not tested)
FIX: N/A if confidential client confirmed; escalate only if public client without PKCE proven
CONFIDENCE: high (design); medium (GitHub registration class unobserved)
```

```
FINDING: Session fixation / login CSRF via callback (H2) unproven from URL shape
SEVERITY: INFO
VECTOR: Requires broken or unbound state; no PoC; NO_REPLAY policy
AFFECTED: sessions/social/google/callback state handling (unknown)
FIX: Confirm state bound to pre-auth session; reject mismatch (executor only if bug found later)
CONFIDENCE: low on exploitability without test
```

```
FINDING: prompt=none increases silent code issuance frequency (H4)
SEVERITY: INFO
VECTOR: OIDC silent reauth → more callbacks in browser artifacts without UI
AFFECTED: GitHub-initiated Google authorize with prompt=none
FIX: Logging/referrer hygiene; user education on shared browsers + authuser
CONFIDENCE: high (semantics); medium (product frequency)
```

```
FINDING: iss=accounts.google.com present; mix-up not evidenced (H5)
SEVERITY: INFO
VECTOR: Theoretical wrong-issuer accept; URL includes iss (positive signal only)
AFFECTED: RP issuer validation (unknown implementation)
FIX: Validate iss server-side before exchange (standard)
CONFIDENCE: high that shape alone is not a vuln
```

---

## 11. Judge summary

| Question | Answer |
|----------|--------|
| Is the URL shape a GitHub critical auth bypass? | **No** |
| Is front-channel code a known OAuth residual? | **Yes** (RFC 9700) |
| Is paste a real confidentiality event? | **Yes** (WARN ops) |
| Bounty submission recommended? | **No** without additional PoC of B-class product bug |
| Next safe steps | Document hygiene; optional **passive** public-docs-only confirm of GitHub social login; **never** redeem |

**APPROVED milestone content:** threat model + severity taxonomy + H1–H5 + NO_EXCHANGE/NO_REPLAY + non-bounty verdict with high confidence on design class.
