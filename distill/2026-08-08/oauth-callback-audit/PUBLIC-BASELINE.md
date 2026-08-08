# PUBLIC-BASELINE — GitHub “Sign in with Google” OAuth callback

**Date:** 2026-08-08  
**Role:** gx-scout-oauth (passive public research only)  
**Axes:** accuracy · confidentiality · exploitability · remediability  
**Hard constraints:** NO live authorization-code use · NO token-endpoint probes · full `code=` values only as `REDACTED_CODE`  
**Research:** Exa MCP + native web (Google Identity / OIDC docs, RFC 6749, RFC 9700 BCP, GitHub Docs social login). No live curls with codes.

---

## 0. Roles (name the axes of the flow)

| Role | Party | Notes |
|------|--------|--------|
| Authorization server (AS) | **Google** (`accounts.google.com` / `oauth2.googleapis.com`) | Issues `code`; redeems only with correct client credentials |
| OAuth client (RP) | **GitHub** | Web application client registered with Google; confidential (server-side secret expected) |
| Resource owner | End user (Google account used to sign into GitHub) | Authenticates to Google, not to a third party with GitHub’s secret |
| User agent | Browser | Carries redirect to GitHub with `code` + `state` in the **query string** |

GitHub is **not** the Google AS here. GitHub is a **relying party / confidential client** of Google for social login (“Continue with Google”).

Sources: [Google OAuth 2.0 for Web Server Apps](https://developers.google.com/identity/protocols/oauth2/web-server), [OpenID Connect (Sign in with Google)](https://developers.google.com/identity/openid-connect/openid-connect), [GitHub Docs — authentication / social login](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github).

---

## 1. Endpoint: `/sessions/social/google/callback` on `github.com`

### Purpose

- **Publicly expected role:** GitHub’s **OAuth/OIDC redirect URI** for the Google social-login path. After the user authenticates (or silently re-consents) at Google, Google redirects the browser to this registered URI with an authorization response in the query string.
- **What GitHub’s server is expected to do (standard OAuth client behavior, not GitHub-internal source):**
  1. Validate `state` (anti-CSRF / session binding).
  2. Exchange `code` at Google’s token endpoint using **GitHub’s** `client_id`, **`client_secret`**, and the **same** `redirect_uri` that was authorized for that client.
  3. Use identity claims (ID token / userinfo for openid+email+profile scopes) to create or attach a **GitHub session** for the linked account.
- **Documented product feature:** GitHub supports social login with **Google** (and Apple) for account creation and sign-in on GitHub Free / GHES Cloud contexts described in docs. The exact path string `/sessions/social/google/callback` is an **implementation detail** observed in redirects; GitHub Docs describe the *feature* (Continue with Google), not a public API reference for this path.

Shape (sanitized):

```text
https://github.com/sessions/social/google/callback
  ?state=REDACTED
  &iss=https://accounts.google.com
  &code=REDACTED_CODE
  &scope=email+profile+...+openid
  &authuser=0
  &prompt=none
```

**Not a product bug by itself:** Presence of `code` in the callback URL is **normal** for the OAuth 2.0 authorization-code grant (`response_type=code`). Codes in query strings are a known leakage surface (history, Referer, logs) mitigated by short TTL, single use, and client authentication — not by omitting the param.

Sources: RFC 6749 §4.1 (auth code grant), Google OIDC “response is returned in the query string”, GitHub Docs social login.

---

## 2. Expected query parameters

| Param | Expected meaning | Notes |
|-------|------------------|--------|
| `code` | One-time **authorization code** from Google | Redeemable only by the registered client (see §3). Never log/paste full value. |
| `state` | Opaque value round-tripped from GitHub’s authorize request | CSRF / request-response correlation. Google OIDC: strongly recommended; used so redirect_uri alone is not enough for forged callbacks. |
| `iss` | Issuer identifier | Observed `https://accounts.google.com`. OIDC mix-up / multi-issuer hygiene (RFC 9207 / issuer checks are best practice; exact GitHub enforcement is **not** publicly specified). |
| `scope` | Granted scopes (space/plus-delimited) | Typical identity set for login: `openid`, `email`, `profile` / `userinfo.email` / `userinfo.profile`. Not broad Google Drive/Gmail API access unless separately requested. |
| `authuser` | Google multi-login account index | `0` = first/default selected Google session in the browser. |
| `prompt` | OIDC prompt mode | `none` = no interactive auth/consent UI; success only if already signed in to Google **and** prior consent exists for the client/scopes. Failures return errors without UI. Indicates **silent reauth / session check** style request. |

Sources: [Google OpenID Connect — parameters `state`, `prompt`, `redirect_uri`, code exchange table](https://developers.google.com/identity/openid-connect/openid-connect); operator-observed callback shape in PLAN (sanitized).

---

## 3. Who can redeem Google authorization codes issued for GitHub’s Google client?

### Public protocol baseline (certain)

1. **Authorization codes are bound to the client** that requested them (`client_id`) and to the **redirect URI** used in the authorization request.
2. For **confidential** (web server) clients, token requests to Google **must** include client authentication — typically **`client_id` + `client_secret`** (or equivalent), plus:
   - `grant_type=authorization_code`
   - `code`
   - `redirect_uri` **exactly matching** the registered / authorization-time URI
3. Google’s token endpoint: `https://oauth2.googleapis.com/token` (per Google docs / discovery).
4. Google’s own guidance on server-side / one-time codes: codes are **one-time**; *“Although we don't recommend leaking codes, they are very hard to use without your client secret. Keep your client secret secret!”*

### Application to GitHub ← Google social login

| Actor | Can redeem `code` at Google for GitHub’s client? |
|-------|--------------------------------------------------|
| GitHub backends holding the registered **client_secret** and registered **`https://github.com/sessions/social/google/callback`** (or whatever exact URI is registered) | **Yes** (intended design) |
| Random third party who only saw the callback URL | **No** under standard confidential-client rules — lacks GitHub’s `client_secret` and cannot register GitHub’s redirect on their own client |
| Attacker’s own Google OAuth client_id | **No** — code is not issued for that client; exchange fails binding checks |
| Public client without secret | Not the model GitHub web social login uses; web-server flow is confidential |

**Implication:** A pasted callback URL is **not** equivalent to “anyone can mint Google tokens as GitHub.” The valuable secret remains **GitHub’s Google OAuth client credentials** (not public).

Sources:

- RFC 6749 §4.1.2–4.1.3 (code bound to client + redirect_uri; confidential client MUST authenticate)
- [Google web-server OAuth — exchange code with client_id, client_secret, redirect_uri](https://developers.google.com/identity/protocols/oauth2/web-server)
- [Google Sign-In server-side / one-time code + client secret](https://developers.google.com/identity/sign-in/web/server-side-flow)
- RFC 9700 (OAuth 2.0 Security BCP): prefer auth code over implicit; codes single-use; leak vectors include Referer/history

### Unknowns (do not invent)

- Whether GitHub also uses **PKCE** on this leg (not required for confidential clients; unknown from public docs).
- Exact Google Cloud project / client_id string for GitHub.com (not needed for baseline; not researched via live probes).

---

## 4. Typical authorization code lifetime

| Constraint | Public baseline |
|------------|-----------------|
| **TTL** | RFC 6749 §4.1.2: code **MUST expire shortly**; **maximum ~10 minutes RECOMMENDED**. Industry practice for Google and others is **minutes**, not hours. Exact Google TTL for production codes is **not always published as a fixed number** in the high-level docs; treat as **short-lived**. |
| **Use count** | RFC 6749: client **MUST NOT** use the code more than once; if reused, AS **MUST deny** and **SHOULD revoke** tokens previously issued from that code. Google docs describe **one-time** codes. |
| **Access token after exchange** | Separate; typically ~1 hour for Google access tokens. Not the same object as `code`. |
| **Refresh token** | Only if offline access requested; social **login** scopes often online identity only. |

**Operational read:** If a code was already redeemed by GitHub when the user completed login, a later paste is **already dead** for token exchange. If not yet redeemed, the window is short — still do not treat as safe to share.

Sources: [RFC 6749 §4.1.2](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2), Google OIDC / server-side one-time code language.

---

## 5. Does pasting the callback URL grant GitHub account takeover?

### Short answer (public-expected)

**No — not under the standard confidential-client model.** Pasting  
`https://github.com/sessions/social/google/callback?...&code=REDACTED_CODE&state=...`  
into a chat, ticket, or pastebin is **unsafe hygiene** and expands **leak surface**, but it is **not** by itself a complete “anyone with the URL owns the GitHub account” primitive the way a session cookie or password reset token might be.

### Why takeover-by-third-party-redeem fails (expected)

1. Attacker **cannot** complete `POST https://oauth2.googleapis.com/token` as GitHub without **client_secret**.
2. Even if they open the URL in *their* browser:
   - GitHub is expected to check **`state` against the browser’s GitHub session** that started the login.
   - Attacker’s session should **not** match victim’s `state` → callback rejected (CSRF defense). Google/OIDC docs exist specifically so that guessing `redirect_uri` alone is insufficient.
3. If the **victim’s** browser already finished the flow, the code is **single-use** and typically already consumed.

### Residual / non-zero risks (accuracy: do not overclaim “safe”)

| Risk | Severity class | Notes |
|------|----------------|--------|
| **Referer / proxy / extension / history / support paste** leaks `code`+`state` | Confidentiality | Classic OAuth query-string leak (RFC 9700). |
| **Login CSRF / state binding failure** (if a client implementation is broken) | High *if* present | Historical class of OAuth bugs in *other* software (e.g. cache-backed state not bound to session). **No public confirmed CVE specifically naming GitHub’s Google social callback** found in this scout pass — treat product-specific status as **unknown without disclosure**. |
| **Race before first redeem** + broken state | High *if* present | Requires product defect; not the default assumption. |
| **Social-engineering victim** into completing attacker-controlled flows | Phishing class | Different from “paste of legitimate callback alone.” |
| **Code injection into attacker’s client** | Different client | Requires victim to authorize **attacker’s** OAuth app, not GitHub’s registered redirect. |

### Prior incidents (adjacent class — not GitHub-Google-callback-specific)

- **OAuth security BCP (RFC 9700):** documents code leakage via Referer, browser history, open redirectors; mandates single-use codes; confidential client + PKCE guidance.
- **Library / other-product ATO patterns:** e.g. Authlib cache-backed state CSRF (GHSA/CVE class, 2025–2026 reporting); open-redirect CSRF in third-party OAuth providers (e.g. research advisories on MCP/Cloudflare workers-oauth-provider). These illustrate **state/callback bugs**, not a published break of GitHub’s Google client_secret.
- **GitHub public docs** describe social login as supported first-factor; they do **not** document a known “callback URL = session” vulnerability.

**Scout finding:** No high-confidence public incident of the form “leaked `github.com/sessions/social/google/callback?code=…` alone → remote ATO of victim GitHub via Google code redeem” was located. Severity of a *paste* should default to **hygiene / possible session correlation**, not automatic Critical product bug, unless separate evidence of state-binding failure or secret exposure exists.

---

## 6. User remediation when a callback URL was pasted publicly

Treat as **sensitive auth material** even if exploitability of the `code` alone is low.

### Immediate (user / operator)

1. **Do not open** the full URL again from untrusted contexts; do not re-paste full `code=`.
2. **Assume the window may still be open** only for minutes and only for GitHub’s backend — still:
   - Sign out other sessions if unsure: GitHub → Settings → Password and authentication / Sessions (or “Sign out of other sessions”).
   - Prefer completing a **fresh** legitimate login yourself so any unused code is consumed or expired.
3. **Enable / verify 2FA or passkey** on the GitHub account (social login is first-factor; second factor limits session abuse paths).
4. **Review account security log** (GitHub Security log) for unexpected sign-ins, OAuth apps, email/SSH/deploy key changes.
5. **Browser hygiene:** clear history entries containing the callback URL; disable or audit extensions that read full URLs; avoid sending Referer-bearing navigations from the callback page to third parties.
6. **Rotate adjacent secrets if the paste channel is hostile** (e.g. public issue tracker): not because Google code = GitHub password, but because the same paste may include **cookies, tokens, or screenshots** beyond the OAuth params.
7. **Google account side (optional):** review [Google Account → Security → Third-party access](https://myaccount.google.com/permissions) for unexpected apps; GitHub should appear as an authorized app if linked. Revoke only with care (may break social login until re-link).
8. **If compromise suspected:** contact GitHub Support; unlink social login only if policy/docs for locked accounts apply; set a password/passkey as recovery per [GitHub authentication docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github).

### What usually does **not** help / is unnecessary

- Panic “change Google password immediately solely because of this code paste” — weak causal link if only the GitHub callback URL leaked and no other Google session theft occurred.
- Attempting to “invalidate the code” via DIY token calls — **do not**; may log codes further and is out of scope for users.

### Product / reporter hygiene (bounty context)

- Store only `REDACTED_CODE` in distill/git.
- Secret-gate paths before ship: no raw `code=` long values, no cookies, no `op` reveals.
- Presence of code in URL ≠ valid Critical report; need **demonstrable** binding failure, open redirect on callback, or secret exposure.

---

## 7. Summary table (claims vs confidence)

| Claim | Confidence | Basis |
|-------|------------|--------|
| Callback path is GitHub’s Google social login redirect | High (obs) | URL shape + social login product docs |
| Params `state`, `code`, `scope`, optional `prompt`/`authuser`/`iss` are expected | High | OIDC/OAuth + observed shape |
| Codes redeemable only with GitHub confidential client + secret + redirect_uri | High | RFC 6749 + Google web-server docs |
| Codes short-lived (~minutes, ≤10 min recommended) and single-use | High | RFC 6749; Google “one-time” |
| Public paste alone ⇒ automatic GitHub ATO | **Low / false under baseline** | Confidential client model + state |
| GitHub implements perfect state binding | **Unknown** | Not fully specified publicly; no confirmed public CVE found this pass |
| PKCE used on this flow | **Unknown** | Not documented publicly |

---

## 8. Sources (primary)

1. https://developers.google.com/identity/protocols/oauth2/web-server  
2. https://developers.google.com/identity/openid-connect/openid-connect  
3. https://developers.google.com/identity/protocols/oauth2  
4. https://developers.google.com/identity/sign-in/web/server-side-flow  
5. https://datatracker.ietf.org/doc/html/rfc6749 (esp. §4.1.2–4.1.3)  
6. https://www.rfc-editor.org/info/rfc9700 (OAuth 2.0 Security BCP)  
7. https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github  
8. https://docs.github.com/en/account-and-profile/how-tos/account-management/creating-an-account-on-github  

**Method note:** Exa MCP used for discovery/fetch. No authorization codes were submitted to any endpoint. Adjacent third-party advisories cited only as **class** examples, not as GitHub product findings.

---

## 9. Gaps (for downstream THREAT-MODEL / FINDINGS)

- gap: Exact Google-side code TTL for production (minutes vs exact seconds) — affects race windows only  
- gap: GitHub internal state storage (cookie-bound vs cache-only) — affects login-CSRF hypothesis  
- gap: PKCE / DPoP / sender-constrained tokens on GitHub’s Google client — not public  
- gap: Historical HackerOne/GitHub disclosures specific to `/sessions/social/google/callback` — none confirmed in this pass  

**NO_EXCHANGE · NO_REPLAY · REDACTED_CODE only.**
