# FLOW-MAP — GitHub ← Google social login (authorization-code)

**Role:** gx-revenger-oauth (map only)  
**Date:** 2026-08-08  
**Scope:** Public-knowledge reconstruction of the OAuth 2.0 / OIDC path when a user signs into **GitHub** using **Google**.  
**Hard rules:** No live token exchange · no redeem of pasted `code` · full codes only as `REDACTED_CODE`  

**Axes:** accuracy · confidentiality · exploitability · remediability  

---

## 1. Roles (who is who)

| Role | Party | Notes |
|------|--------|--------|
| **User-Agent** | Browser | Holds cookies for both github.com and accounts.google.com |
| **Relying Party / OAuth client** | **GitHub** | Registered Google OAuth *web* client; holds `client_id` + **`client_secret`** server-side |
| **Authorization Server / IdP** | **Google** (`accounts.google.com`) | Issues authorization `code`; later mints tokens only to the registered client |
| **Resource** | GitHub session | After successful code exchange + identity bind, GitHub sets its session cookie |

GitHub is **not** the IdP here. GitHub is Google’s **confidential client**. The browser never sees GitHub’s `client_secret`. The browser **does** briefly see Google’s authorization `code` on the redirect to GitHub’s callback.

---

## 2. Observed callback shape (operator paste — sanitized)

```
https://github.com/sessions/social/google/callback
  ?state=REDACTED
  &iss=https://accounts.google.com
  &code=REDACTED_CODE
  &scope=email+profile+userinfo.email+userinfo.profile+openid
  &authuser=0
  &prompt=none
```

| Param | Meaning (public) | Sensitivity |
|-------|------------------|-------------|
| `code` | Google authorization code (short-lived, intended single-use) | **HIGH** — bearer for token exchange *with* client_secret |
| `state` | Opaque CSRF / correlation value (should match server-stored value) | MEDIUM — binding material |
| `iss` | Issuer hint (`https://accounts.google.com`) | LOW metadata |
| `scope` | Granted identity scopes (OIDC + profile/email) | LOW |
| `authuser` | Google multi-login account index | LOW |
| `prompt` | `none` ⇒ silent reauth (no interactive consent UI) | LOW; raises silent-callback frequency |

**Where the pasted URL sits:** **Step 3** in the sequence below (browser landing on GitHub’s Google social callback **with** query secrets still in the address bar / request line).

---

## 3. Sequence (numbered)

### Step 1 — User on github.com chooses Google

1. User opens GitHub login / signup and selects **Continue with Google** (or equivalent).
2. GitHub (server) creates a **login attempt / social state** bound to the browser session (cookie / server store) and issues a redirect to Google’s authorize endpoint.
3. Typical authorize request (shape; exact params are GitHub’s product config):

```
GET https://accounts.google.com/o/oauth2/v2/auth
  ?client_id=<GitHub's Google client_id>
  &redirect_uri=https://github.com/sessions/social/google/callback
  &response_type=code
  &scope=openid%20email%20profile   (plus Google userinfo variants as observed)
  &state=<server-generated opaque>
  &prompt=...                       (none | consent | select_account | ...)
  &... optional: login_hint, access_type, nonce (OIDC), etc.
```

**Browser:** navigates to Google. **No code yet.**

---

### Step 2 — accounts.google.com authorize (scopes openid / email / profile)

1. Google authenticates the user (existing Google session, password, 2FA, account picker via `authuser` / `prompt`).
2. Consent: first-time or `prompt=consent` shows consent UI; **`prompt=none`** fails or succeeds silently if already authorized and session is active.
3. On success, Google **does not** return tokens to the browser. It redirects with an **authorization code**:

```
HTTP 302 Location:
  https://github.com/sessions/social/google/callback
    ?code=REDACTED_CODE
    &state=<same state GitHub sent>
    &iss=https://accounts.google.com
    &scope=...
    &authuser=0
    &prompt=none
```

Public baseline: [Google OAuth 2.0 for Web Server Applications](https://developers.google.com/identity/protocols/oauth2/web-server) — response carries `code` (or `error`) on the **redirect_uri** query string; apps must verify `state` before exchange.

---

### Step 3 — ★ PASTED URL LANDING — browser hits GitHub callback

```
GET https://github.com/sessions/social/google/callback?code=REDACTED_CODE&state=...&iss=...&scope=...&authuser=0&prompt=none
Host: github.com
Cookie: <GitHub pre-login / session cookies if any>
```

**This is the URL shape operators paste into tickets, chats, or screenshots.**

At this instant:

| Surface | What is exposed |
|---------|-----------------|
| Browser address bar | Full URL including `code` + `state` |
| Browser history | Same (until cleared / session-only policies) |
| HTTP access logs (GitHub edge) | Request line (expected; GitHub is legitimate RP) |
| **Referer** on any subsequent subresource load from this document | May leak full callback URL to third parties if HTML pulls external assets before strip/redirect |
| Browser extensions / password managers / enterprise DLP | Can read URL |
| Screen share / support paste / terminal `curl` of page | Operator-side leak |
| Analytics / error trackers if mis-instrumented on error pages | Third-party leak |
| Shared machine / clipboard managers | Persistence beyond TTL of code |

**Product-expected behavior (not alone a “broken OAuth” bug):** query-string `code` on redirect is standard OAuth 2.0 authorization-code response delivery.  
**Risk class:** **leakage of the intermediate secret** via channels that were never meant to hold it (Referer, paste, extensions) — confidentiality / exploitability for a race before single-use consumption.

Google’s own docs warn: if the response endpoint renders HTML, scripts and `Referer` can expose the code; prefer server-side handle then redirect to a clean URL without response parameters.

---

### Step 4 — GitHub server validates state; exchanges code server-side

**Browser must not perform the token POST.** GitHub’s backend (confidential client):

1. **Validate `state`** against the value stored for this browser session / login attempt (CSRF defense per RFC 6749 §10.12).
2. **Exchange** (server-to-server only):

```
POST https://oauth2.googleapis.com/token
Content-Type: application/x-www-form-urlencoded

code=REDACTED_CODE
&client_id=<GitHub Google client_id>
&client_secret=<GitHub Google client_secret>   ← never in browser
&redirect_uri=https://github.com/sessions/social/google/callback
&grant_type=authorization_code
```

3. Google returns short-lived `access_token` (+ optional `id_token` for OIDC scopes, refresh depending on `access_type`).
4. GitHub calls Google userinfo / validates ID token claims (`sub`, `email`, `email_verified`, `iss`, `aud` = GitHub’s client_id).
5. GitHub maps Google identity → existing GitHub user (linked social) or enrollment / conflict flow.

**PKCE:** unknown for this product path without black-box observation; mark **unknown**. Confidential client + secret is the classic web-server pattern; PKCE may or may not also be present.

**Code properties (public expectation, not live-verified):**

- Single-use: second exchange → `invalid_grant`
- Short TTL (minutes-class typical)
- Bound to `client_id` + exact `redirect_uri`
- Useless alone without GitHub’s `client_secret` **unless** an attacker races GitHub’s exchange *and* somehow forces GitHub to complete login into attacker-controlled session — that is a **state binding / session fixation** class issue, not mere possession of code in isolation

---

### Step 5 — Session cookie; clean destination URL

1. On success, GitHub sets / refreshes **session cookie** (`Set-Cookie` on github.com).
2. GitHub responds with **HTTP redirect** to the post-login destination (dashboard, `return_to`, etc.).
3. **Final browser URL typically does not retain `code` / `state`** — secrets should already be stripped after server processing.

```
302 Location: https://github.com/   (or return_to without OAuth params)
Set-Cookie: ...session...
```

User is logged into GitHub. Google tokens stay on GitHub servers (for link verification / optional refresh), not as the primary browser session credential for github.com.

---

## 4. Mermaid sequence diagram

```mermaid
sequenceDiagram
  autonumber
  actor U as User (Browser)
  participant GH as GitHub (RP / OAuth client)
  participant G as Google accounts.google.com
  participant T as Google oauth2.googleapis.com/token

  U->>GH: 1. Login → "Continue with Google"
  GH->>GH: Create state; bind to browser session
  GH-->>U: 302 → accounts.google.com/o/oauth2/v2/auth<br/>client_id, redirect_uri=.../google/callback,<br/>scope=openid email profile, state, prompt=...

  U->>G: 2. Authorize (session / consent / prompt=none)
  G->>G: Authenticate user; issue authorization code
  G-->>U: 302 → github.com/sessions/social/google/callback<br/>?code=REDACTED_CODE&state&iss&scope&authuser&prompt

  Note over U,GH: ★ STEP 3 — PASTED URL LIVES HERE<br/>code+state in address bar, history, Referer, paste surfaces

  U->>GH: GET /sessions/social/google/callback?code&state&...
  GH->>GH: 4a. Validate state vs session
  GH->>T: 4b. POST /token (code + client_id + client_secret + redirect_uri)
  T-->>GH: access_token / id_token (server-only)
  GH->>G: 4c. Userinfo / ID token validation
  GH->>GH: Map Google sub/email → GitHub account
  GH-->>U: 5. Set-Cookie session; 302 to destination WITHOUT code
  U->>GH: GET destination (clean URL)
```

---

## 5. ASCII sequence (compact)

```
[User] ──login / Google──► [GitHub]
                              │
                              │  state := random; store(session)
                              ▼
[User] ◄──302 auth URL────── [GitHub]
   │
   │  GET accounts.google.com/o/oauth2/v2/auth
   │       client_id=GitHub-as-client
   │       redirect_uri=https://github.com/sessions/social/google/callback
   │       response_type=code
   │       scope=openid email profile (+ userinfo.*)
   │       state=…
   ▼
[Google]  authenticate / consent (prompt=none → silent if possible)
   │
   │  302 Location: https://github.com/sessions/social/google/callback
   │                ?code=REDACTED_CODE&state=…&iss=…&scope=…&authuser=0&prompt=none
   ▼
[User browser]  ★ PASTE / LEAK SURFACE (Step 3)
   │  address bar · history · Referer · extensions · clipboard · support tickets
   │
   │  GET /sessions/social/google/callback?code&state&…
   ▼
[GitHub server]
   │  assert state matches session
   │  POST oauth2.googleapis.com/token  {code, client_id, client_secret, redirect_uri}
   │  validate identity; link/login GitHub user
   │  Set-Cookie: session
   │  302 → destination URL  (no code in final URL)
   ▼
[User]  authenticated to GitHub
```

---

## 6. Data-flow summary

```
source:  User intent on github.com
   → transform: GitHub builds authorize URL + state
sink:    Google auth UI / silent session

source:  Google issues code
   → transform: 302 query string to redirect_uri
sink:    ★ Browser intermediate (LEAK WINDOW) → GitHub callback handler

source:  code + client_secret (server)
   → transform: token endpoint
sink:    GitHub process memory (tokens) → identity bind → session cookie

source:  session cookie
sink:    subsequent github.com requests (no OAuth code)
```

---

## 7. Leakage surfaces at Step 3 (annotated)

| # | Channel | Who sees `code` | Mitigations (product / operator) |
|---|---------|-----------------|----------------------------------|
| L1 | Address bar / bookmark | User, shoulder-surf, screenshots | Immediate navigation; don’t bookmark callback |
| L2 | Browser history | Later local users, sync | Clear history; private window for sensitive ops |
| L3 | Referer on subresources | CDNs, analytics if page loads third-party before redirect | Server should 302 strip before HTML; Referrer-Policy |
| L4 | Access / proxy / corporate TLS logs | Network observers of client side | HTTPS only (given); avoid corporate MITM if untrusted |
| L5 | Browser extensions | Extension origins with `tabs` / history | Minimize extensions on auth machine |
| L6 | Paste to chat / ticket / agent | Anyone with paste access | **Never paste full callback**; redact → `REDACTED_CODE` |
| L7 | Crash / error reporters | Vendor telemetry | Don’t include full URL in client telemetry |
| L8 | Shared terminal / `curl` of URL | Shell history | Don’t GET the callback from CLI with live code |
| L9 | Password managers capturing “login URL” | Cloud PM sync | Disable URL capture for oauth callbacks if possible |

**Attack sketch (passive — DO NOT EXECUTE):** Attacker who obtains `code` **before** GitHub redeems it still needs a path that causes a successful login under attacker control. With correct **state ↔ victim session** binding, raw code alone does not log the attacker in; primary realistic risks are (a) **code + broken state binding**, (b) **race with open redirect / confused deputy**, (c) **secondary use if tokens were obtained somehow** (out of scope without secret). Treat unconsumed codes as **time-boxed** high-value secrets anyway.

---

## 8. Invariants (model for reimplementation / audit)

1. `response_type=code` (not implicit/token in fragment for this web RP pattern).
2. `redirect_uri` exact match to registered Google client config.
3. `state` must be validated **before** token exchange.
4. Token exchange uses **client_secret** only on server; browser never holds it.
5. Authorization `code` is single-use and short-lived (RFC 6749 expectation).
6. Post-login location should **not** echo `code`/`state`.
7. Scopes observed are **identity-oriented** (`openid`, `email`, `profile`, userinfo.*) — impact of successful social login is GitHub account access, not broad Google Drive/API scopes unless separately granted.

---

## 9. Unknowns (do not invent)

| Item | Status |
|------|--------|
| Exact GitHub→Google authorize query (all params) | Not observed this session (map from public pattern + callback reverse) |
| PKCE (`code_challenge`) present? | **unknown** |
| State entropy / storage (cookie vs server) | **unknown** (assume server-bound session) |
| Code TTL / whether pasted code already consumed | **unknown** — **must not** probe via redeem |
| Whether `iss` is validated as OIDC multi-issuer defense | **unknown** |
| Exact cookie names / SameSite attributes | **unknown** without live header capture |

---

## 10. Findings-style notes (map phase)

```
FINDING: Pasted URL is the standard OAuth authorization-code redirect onto GitHub’s Google social callback
SOURCE: public Google web-server OAuth docs + observed path /sessions/social/google/callback
CONFIDENCE: high
IMPLICATION: Presence of code= in URL is expected at Step 3; severity hinges on exposure channel + state binding, not on “code in URL” alone

FINDING: prompt=none indicates silent reauth when Google session + prior grant allow it
SOURCE: OIDC prompt parameter semantics; observed query
CONFIDENCE: high
IMPLICATION: More silent callbacks → more intermediate URLs in history/logs without user noticing

FINDING: Token exchange requires client_secret; browser-held code is not sufficient for Google tokens by design
SOURCE: Google token endpoint parameters (client_secret required for confidential web clients)
CONFIDENCE: high
IMPLICATION: Confidentiality of GitHub’s client_secret is critical; code-leak impact is mainly RP-session race / binding failures

FINDING: No live exchange performed in this map
SOURCE: hard rule NO_EXCHANGE / NO_REPLAY
CONFIDENCE: high
IMPLICATION: Consumption status of any REDACTED_CODE remains unknown
```

---

## 11. Relation to audit plan artifacts

| Artifact | Role |
|----------|------|
| `PLAN.md` | Milestones M01–M05, threat hypotheses H1–H5 |
| **`FLOW-MAP.md`** (this file) | Sequence + Step-3 leakage annotation |
| `PARAM-INVENTORY.md` | Sanitized lengths only |
| `THREAT-MODEL.md` | H1–H5 expansion |
| `FINDINGS.md` / `REMEDIATION.md` / `REPORT.md` | Severity + operator actions |

---

## 12. Non-goals (enforced)

- ❌ `POST` to `oauth2.googleapis.com/token` with any real code  
- ❌ Replaying callback in a second browser to “see what happens”  
- ❌ Storing full `code=` values in git / distill  
- ❌ Claiming product vulnerability without evidence beyond expected redirect shape  

---

**Map complete.** Step 3 is the pasted-URL locus; Step 4 is server-only secret exchange; Step 5 is clean session redirect.
