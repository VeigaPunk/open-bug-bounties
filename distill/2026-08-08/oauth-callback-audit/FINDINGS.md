# Findings — GitHub Google OAuth callback paste audit

**Date:** 2026-08-08  
**Method:** Passive structural analysis only · **NO_EXCHANGE** · **NO_REPLAY** · codes as `REDACTED_CODE`  
**Axes:** accuracy · confidentiality · exploitability · remediability  

## Executive finding

| ID | Title | Severity | Class |
|----|-------|----------|-------|
| F1 | Authorization `code` present in front-channel query on GitHub RP callback | **INFO** | Expected OAuth design (RFC 9700 residual risk) |
| F2 | Live-shaped callback URL disclosed into chat/LLM context | **WARN** | Operator hygiene / credential paste |
| F3 | Third-party redeem without GitHub `client_secret` | **INFO** (expected fail) | Confidential-client gate |
| F4 | Automatic GitHub account takeover from paste alone | **Not demonstrated** | Would require broken state bind + unused code race + RP processing attacker navigation — unproven |
| F5 | `prompt=none` silent reauth | **INFO** | UX; increases code-issuance frequency, not novel vuln |
| F6 | `iss=https://accounts.google.com` | **INFO** | Positive mix-up signal / OIDC shape |

**Product bug (GitHub bounty)?** **No** — under public baseline, this is the normal authorization-code redirect to a confidential RP. Residual risk is front-channel leakage class (history, Referer, logs, paste), mitigated by short TTL, single-use, and server-side secret exchange.

**CRIT findings:** none.

## Constraints enforced

- Did **not** call `oauth2.googleapis.com/token` or open the live callback with the code.
- Did **not** store raw `code=` values in distill artifacts.
- Scopes observed: identity only (`openid` / `email` / `profile` / userinfo.*). No Drive/Gmail.

## Attack path residual (if code still unused)

```
paste → attacker has code+state
  → cannot redeem at Google without GitHub client_secret (+ registered redirect_uri)
  → can attempt GET callback in own browser: GitHub should reject if state not bound to that browser session
  → race: if victim's GitHub already consumed code, token endpoint returns invalid_grant
```

evidence: sentinel THREAT-MODEL · scout PUBLIC-BASELINE · revenger FLOW-MAP · connector CONNECTOR-R1

## Severity taxonomy

| Class | Result |
|-------|--------|
| A — Design-expected query `code` | INFO |
| B — Actionable GitHub product bug | Not shown |
| C — User hygiene (paste) | WARN |
| D — Session fixation proven | Not shown |

## Open unknowns (not blocking verdict)

- Whether this specific code was already redeemed by GitHub at paste time  
- Exact Google code TTL for this client  
- Whether GitHub uses PKCE on this social path  
- Exact `state` storage (cookie vs server cache) — docs-level only  

## Non-goals (not performed)

Redeem probes · live browser replay · exploit PoC · HackerOne filing for “code in URL”
