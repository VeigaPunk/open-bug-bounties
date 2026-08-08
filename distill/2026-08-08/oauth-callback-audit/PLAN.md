# Plan — GitHub Google OAuth callback leak audit
**Session:** r0 | **Dispatched by:** the-judge | **Date:** 2026-08-08
**Axes:** accuracy · confidentiality · exploitability · remediability  
**Spawn:** pure-bash-isolated | **Language lock:** rust-only for any new tooling  
**Hard rules:** NO authorization-code exchange · NO live auth · NO replay · full `code=` values only as `REDACTED_CODE` in all artifacts

## Phase 0 — State map
- **Exists:**
  - Operator-pasted GitHub Google social callback shape:  
    `https://github.com/sessions/social/google/callback?state=…&iss=https://accounts.google.com&code=REDACTED_CODE&scope=email+profile+userinfo.email+userinfo.profile+openid&authuser=0&prompt=none`
  - Distill root created: `~/.xbgst/bounty-distill/2026-08-08/oauth-callback-audit/`
  - Ship channel: `~/Projects/open-bug-bounties` distill + `~/.xbgst/scripts/milestone-ship.sh`
  - Adjacent dual-auth / OAuth map prior work (BC, not GitHub): `distill/2026-08-07/dual-auth-r0-bc-docs-paths/shared/BC-OAUTH-MAP.md` (pattern reference only)
  - Anti-patterns / MCP stance / janitor rules in force (no Honcho, Exa for research, secrets via the-janitor)
- **Missing:**
  - Sanitized parameter inventory (lengths/entropy class only; no raw secrets)
  - Threat model specific to GitHub `sessions/social/google/callback` (code leakage paths, state binding, prompt=none, iss)
  - Public-docs / OAuth2 RFC baseline for auth-code + state + optional PKCE (GitHub-as-client of Google)
  - Exploitability assessment without exercising the code
  - Remediations for operator (revoke session, clear referrer logs, password managers, browser history)
  - Sanitized REPORT + ship to open-bug-bounties after APPROVED
- **Risk:**
  - **Unknown:** whether `code` already consumed (single-use); whether `state` is session-bound + CSRF-checked; PKCE status on this flow
  - **Confidentiality:** any re-paste or log of full URL re-leaks `code`/`state` — treat paste as high-sensitivity
  - **False positive:** presence of code in URL is expected OAuth redirect behavior, not alone a product bug; bug surface is **exposure channel** (Referer, analytics, screenshots, support tickets, shared terminals) + binding failures if documented
  - **Out of scope / abuse:** exchanging or replaying code against Google/GitHub token endpoints — **forbidden**
  - **Program fit:** GitHub Bug Bounty / Google OAuth consumer scope — report only if novel product-side weakness with evidence; otherwise distill as operator incident hygiene

## WWKD
1. **What:** Produce a sanitized security audit distill of a leaked GitHub←Google OAuth callback URL covering authorization-code leakage, session fixation / state binding, and replay risk — success boundary = findings + remediations with gates, zero live code use.
2. **Why:** Pasted callback contains a live-shaped `code` and `state` on GitHub’s Google social login path (`prompt=none` suggests silent reauth). Without structured analysis, risk of accidental exchange, overclaiming “critical OAuth break,” or missing practical leakage vectors.
3. **Assumptions/Risks:**
   - Assume `code` is single-use, short-TTL (OAuth2 best practice); do not verify by redeeming.
   - Assume GitHub binds `state` to browser session cookie (standard); verify only via public docs / prior disclosures, not by forging logins.
   - `iss=https://accounts.google.com` is issuer hint (OIDC-ish); treat as metadata.
   - Scopes are identity-only (openid email profile) — impact of successful hijack = GitHub account link/session, not Google API scopes beyond profile.
   - Risk of agents writing full URL into git history — secret gate mandatory before ship.
4. **How:** M01 sanitize inventory → M02 public threat model (no live auth) → M03 leakage/replay/fixation analysis matrix → M04 remediability + operator checklist → M05 critic gate + ship sanitized distill.
5. **Escalation points (the-judge):**
   - If evidence suggests active account takeover path without code redeem → escalate severity labeling
   - If any milestone requires token endpoint probe → **BLOCKED**; replan passive-only
   - If bounty submission vs hygiene-only decision is ambiguous after M03 → judge axes call
   - PKCE unknown left open: do not invent; mark `unknown` in report

## Threat hypotheses (passive — do not test with live code)
| ID | Hypothesis | Axis | Passive evidence plan |
|----|------------|------|------------------------|
| H1 | Authorization code in query string is captured by Referer, proxies, browser extensions, screenshots, shared paste | confidentiality, exploitability | Docs + URL shape; list common leak channels |
| H2 | `state` not bound to session → CSRF / session fixation on social callback | accuracy, exploitability | Public GitHub/OAuth docs + prior CVEs only |
| H3 | Code replay before single-use consumption | exploitability | RFC 6749 single-use expectation; no redeem test |
| H4 | `prompt=none` silent reauth increases unexpected callback frequency / log volume | remediability | Parameter semantics (OIDC prompt) |
| H5 | `iss` / scope confusion → wrong-token binding | accuracy | Parameter inventory; no protocol fuzz |

## Parameter inventory (sanitized — template for M01)
| Param | Observed (sanitized) | Notes |
|-------|----------------------|--------|
| host/path | `github.com/sessions/social/google/callback` | GitHub social Google callback |
| `state` | present, **REDACTED** (record only length class: short/medium/long) | CSRF / session correlation candidate |
| `iss` | `https://accounts.google.com` | Issuer |
| `code` | **REDACTED_CODE** only | Never full value in files/git |
| `scope` | `email profile userinfo.email userinfo.profile openid` | Identity scopes |
| `authuser` | `0` | Google multi-account index |
| `prompt` | `none` | Silent / no interactive prompt |

## Milestones
| # | Title | Gate command | Expected output | Executor |
|---|-------|--------------|-----------------|----------|
| M01 | Sanitize paste + write PARAM-INVENTORY.md (lengths only; `REDACTED_CODE`) | `test -f ~/.xbgst/bounty-distill/2026-08-08/oauth-callback-audit/PARAM-INVENTORY.md && ! rg -n 'code=[A-Za-z0-9._/-]{8,}' ~/.xbgst/bounty-distill/2026-08-08/oauth-callback-audit/PARAM-INVENTORY.md && rg -n 'REDACTED_CODE' ~/.xbgst/bounty-distill/2026-08-08/oauth-callback-audit/PARAM-INVENTORY.md` | File exists; no raw long code= values; contains REDACTED_CODE | executor (sanitize) |
| M02 | Passive OAuth2/OIDC + GitHub social-login public baseline (Exa research); THREAT-MODEL.md | `test -f ~/.xbgst/bounty-distill/2026-08-08/oauth-callback-audit/THREAT-MODEL.md && rg -n 'H1|authorization.code|state|PKCE|prompt=none' ~/.xbgst/bounty-distill/2026-08-08/oauth-callback-audit/THREAT-MODEL.md && ! rg -n 'code=[A-Za-z0-9._/-]{8,}' ~/.xbgst/bounty-distill/2026-08-08/oauth-callback-audit/THREAT-MODEL.md` | Model covers H1–H5; cites public sources; no raw codes; unknowns listed | scout + executor |
| M03 | FINDINGS.md: leakage / fixation / replay matrix; severity under axes; **no** live requests to token/callback with code | `test -f ~/.xbgst/bounty-distill/2026-08-08/oauth-callback-audit/FINDINGS.md && rg -n 'exploitability|confidentiality|NO_EXCHANGE|NO_REPLAY' ~/.xbgst/bounty-distill/2026-08-08/oauth-callback-audit/FINDINGS.md && ! rg -nE 'curl .*(oauth2|token|callback).*code=' ~/.xbgst/bounty-distill/2026-08-08/oauth-callback-audit/` | Matrix complete; explicit NO_EXCHANGE/NO_REPLAY; no exploit curls with code | executor + critic |
| M04 | REMEDIATION.md operator + product-side checklist (revoke, history, Referer, support hygiene) | `test -f ~/.xbgst/bounty-distill/2026-08-08/oauth-callback-audit/REMEDIATION.md && rg -n 'session|history|Referer|password.manager|support' ~/.xbgst/bounty-distill/2026-08-08/oauth-callback-audit/REMEDIATION.md` | Actionable remediations mapped to remediability axis | executor |
| M05 | REPORT.md + secret gate + critic pass; ship sanitized mirror to open-bug-bounties if APPROVED | `rg -n 'sk-|AKIA|password=|BEGIN (RSA |OPENSSH )?PRIVATE|cTtux|ghp_|xox[baprs]-|code=[A-Za-z0-9._/-]{12,}' ~/.xbgst/bounty-distill/2026-08-08/oauth-callback-audit/ \|\| true` then milestone-ship if clean | Gate empty of secrets/raw codes; `APPROVED:` or `BLOCKED:`; ship only on APPROVED | critic then ship (godspeed) |

## Dependencies
```
M01 → M02 → M03 → M04 → M05
         ↘ critic may sample M03 early
```
none parallel except M02 research docs can start after M01 inventory skeleton exists.

## Executor assignment (Phase 2 hint for the-judge)
| Milestone | Primary | Secondary |
|-----------|---------|-----------|
| M01 | executor | — |
| M02 | scout (Exa only for research) | executor |
| M03 | executor | critic |
| M04 | executor | simplifier optional |
| M05 | critic → ship | distiller if public index needed |

## Non-goals (scope lock)
- Do **not** call Google token endpoint or GitHub with the pasted `code`
- Do **not** open the full URL in a browser profile that auto-follows OAuth
- Do **not** implement exploit PoC / session hijack tooling
- Do **not** store raw code in git, screenshots, or open-bug-bounties
- Prefer hygiene + accurate severity over bounty theater

## Artifact layout (target)
```
~/.xbgst/bounty-distill/2026-08-08/oauth-callback-audit/
  PLAN.md              ← this file
  PARAM-INVENTORY.md   ← M01
  THREAT-MODEL.md      ← M02
  FINDINGS.md          ← M03
  REMEDIATION.md       ← M04
  REPORT.md            ← M05
```
Ship mirror (sanitized): `~/Projects/open-bug-bounties/distill/2026-08-08/oauth-callback-audit/` via milestone-ship after APPROVED.

## Status
**Phase 0 complete.** Plan advisory for the-judge.  
`[planner-gate: advisory, risks-open: code_used?, state_binding?, PKCE?]`  
evidence: none — planning artifact

---
GODSPEED inject required for all spawns. After durable APPROVED artifacts:  
`~/.xbgst/scripts/milestone-ship.sh --label "oauth-callback-audit" --src "$HOME/.xbgst/bounty-distill/2026-08-08/oauth-callback-audit" --msg "Ship sanitized GitHub Google OAuth callback leak audit distill."`
