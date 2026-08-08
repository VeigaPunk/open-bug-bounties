# REPORT — Audit of pasted GitHub Google OAuth callback URL

**Session:** xbgst · 2026-08-08  
**Target shape:** `https://github.com/sessions/social/google/callback` (Google IdP → GitHub RP)  
**Hard rules:** NO_EXCHANGE · NO_REPLAY · no raw authorization codes in artifacts  

---

## 1. What you pasted

A **successful-looking** Google OAuth **authorization-code** redirect back to GitHub’s social login callback, including:

| Param | Role |
|-------|------|
| `state` | CSRF / transaction correlator (32 hex observed) |
| `iss` | Issuer `https://accounts.google.com` |
| `code` | Short-lived, single-use Google authorization code (**credential-shaped**) |
| `scope` | Identity: openid, email, profile, userinfo.* |
| `authuser` | `0` (primary Google account index) |
| `prompt` | `none` (silent reauth when Google session allows) |

Transport: **HTTPS**. Host: **github.com**. Grant type: **authorization code in query string** (standard web redirect mode, not implicit fragment tokens).

This URL is **step 3** of Sign in with Google: browser is redirected from Google to GitHub with `code` visible briefly in the address bar before GitHub exchanges it **server-side**.

---

## 2. Verdict (judge)

| Question | Answer |
|----------|--------|
| Is `code` in the URL a GitHub product vulnerability? | **No** — expected OAuth 2.0 front-channel for auth-code grant |
| Can a random third party turn the paste into a GitHub session? | **Unlikely under baseline** — redeem needs GitHub’s confidential `client_secret` + registered `redirect_uri`; callback should bind `state` to the starting browser session |
| Is pasting it into chat/LLM harmful? | **Yes as hygiene** — treats a one-time credential as shareable text; residual risk window while code unused |
| Bounty-worthy for “code appears in callback”? | **No** (expected design). Separate claim class if `state` binding were proven broken (not tested here). Residual RFC 9700 leakage is industry-wide |
| CRIT? | **None** |

**Severity rollup:** Class C **WARN** (operator disclosure) + Class A **INFO** (design residual). No Class B product bug demonstrated.

---

## 3. Why redeem-by-attacker usually fails

1. GitHub is a **confidential** Google OAuth client (web application).  
2. Token exchange is `POST https://oauth2.googleapis.com/token` with `client_id`, **`client_secret`**, `code`, `grant_type=authorization_code`, `redirect_uri`.  
3. Attacker with only the URL lacks `client_secret`.  
4. Codes are **single-use** and **short-lived** (minutes-class per Google / RFC guidance).  
5. If GitHub already completed login, the code is spent (`invalid_grant` on reuse).  
6. Forging a callback GET in another browser should fail **if** `state` is properly session-bound (standard CSRF defense).

Residual theoretical paths (not proven here): race before GitHub redeem; broken state validation (product bug if real); compromise of GitHub server secrets; non-standard public-client misconfiguration (not evidenced for this path).

---

## 4. Real risk: leakage channels (RFC 9700)

Even with confidential clients, **authorization codes in URLs** can appear in:

- Browser history  
- Referer headers (if callback page loads third-party resources)  
- Proxies / corporate TLS inspection logs  
- Screenshots, screen shares, support dumps  
- **Chat / LLM pastes** (this incident)  
- Extensions with URL access  

Mitigations used industry-wide: one-time short-TTL codes, confidential clients / PKCE, no analytics on redirect URI, Referrer-Policy, optional `form_post` response mode.

---

## 5. `prompt=none`

Means Google was asked not to show an interactive consent screen when possible. That is normal for silent re-login / session continuity. It **increases how often** codes are issued without user friction; it is **not** itself a novel vulnerability.

---

## 6. What this is *not*

- Not a GitHub personal access token (`ghp_…`)  
- Not a Google refresh token sitting in the query  
- Not proof of session cookie theft  
- Not evidence of open redirect or mix-up attack (iss shape is consistent with Google)  
- Not an invitation to “try the URL” — **do not**  

---

## 7. User remediation (if this was your live login)

1. Prefer assume the code was already used by GitHub if login finished successfully.  
2. If unsure: review GitHub **Security log** / active sessions; sign out other sessions; keep 2FA/passkey on.  
3. Never re-share OAuth callback URLs (address bar mid-login).  
4. On a shared machine: clear that history entry.  
5. Contact GitHub Support only if you see **unauthorized sessions** after the disclosure — not merely because the code appeared in a URL.  

Developer checklist for similar apps: confidential client + PKCE + short TTL + one-time codes + strict redirect_uri match + Referrer-Policy + no third-party scripts on callback + consider `form_post`.

---

## 8. Artifact index

| File | Role |
|------|------|
| PLAN.md | Phase 0 WWKD |
| PARAM-INVENTORY.md | Sanitized param table |
| PUBLIC-BASELINE.md | Scout public baseline |
| FLOW-MAP.md | Sequence / leakage surfaces |
| THREAT-MODEL.md | Sentinel H1–H5 |
| CONNECTOR-R1.md | Cross-axis synthesis |
| REMEDIATION.md | Checklist |
| FINDINGS.md | Matrix |
| REPORT.md | This document |

## 9. Methods / evidence

- Structural URL parse (lengths/prefixes only; no redeem)  
- Exa research: RFC 9700, OWASP OAuth cheat sheet / WSTG, Google OAuth web-server docs  
- xbgst specialists: planner, sentinel, scout, the-revenger, connector, executor  

**APPROVED:** Sanitized OAuth callback paste audit complete — hygiene WARN, no product-bug claim, no raw code in distill.
