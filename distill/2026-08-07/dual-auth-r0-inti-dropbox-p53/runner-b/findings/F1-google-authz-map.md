# F1 — Google VRP authz/IDOR surface map

**FIDELITY: FULL** (from `scopes/google-vrp.md` + TinyFish rules fetch 2026-08-07)  
**Mode:** policy recon only · own accounts only · no live exploit  
**Submit:** https://bughunters.google.com/  
**Rules:** https://bughunters.google.com/about/rules/google-friends/google-and-alphabet-vulnerability-reward-program-vrp-rules  
**Sekhmet:** sp-rb01-f1-google (luna) status=ok

## Authz/IDOR class candidates (OWN Google accounts)

1. **Sharing / ACL boundary** — Docs/Drive/Photos share links, permission demotion races, residual access after revoke (Account A resource, Account B attacker).
2. **Object IDOR** — sequential/guessable resource IDs across Mail attachments, Keep notes, Calendar events owned by self vs alt account.
3. **OAuth / consent token confusion** — third-party app scopes over-grant; confused deputy only if impact on own IT0/IT1 data demonstrated.
4. **Workspace admin vs member** (if using free Workspace trial) — privilege escalation S2a critical-action class.
5. **XSLeak / CSRF state-change** on T0 domains with impact beyond logout.

Prefer classes that map to **S2a/S2b** (logic/IDOR IT0/IT1) or **C1a/C1b**.

## Domain tier notes

| Tier | Meaning | Authz payout signal (logic IDOR) |
|---|---|---|
| T0 | Account compromise / global impact domains | S2a up to **$50k** (T0/T1) |
| T1 | Sensitive user data domains | S2b **$31,337** table |
| T2 | Normal Google apps | lower S2 bands |
| T3a/b | Acquisitions / sandboxed | lower; **6-month acquisition blackout** |

Information tiers IT0 (credentials/ATO) > IT1 (Drive/photos) > IT2 (metadata).

## OOS / non-qualifying (high signal)

- `*.bc.googleusercontent.com` / `*.appspot.com` customer apps
- Sandbox XSS without sensitive-data impact (`*.googleusercontent.com`)
- Owner JS on Blogger; URL redirect alone; logout CSRF
- User enumeration unless no rate limits proven
- SMS verify quota bypass class
- Physical, phishing employees, DoS, high-volume auto traffic
- Third-party Google-branded vendor hosts (WHOIS first)

## Same-day re-verify checklist

- [ ] Re-open live VRP rules page (reward table may change)
- [ ] Confirm product is Google-owned (not vendor / not acquisition blackout)
- [ ] Confirm Cloud issues go to **Cloud VRP**, not main VRP
- [ ] Own test accounts only; no access to others’ data
- [ ] Report quality dimensions for 1.0–1.2× multiplier

## First 2h hunt plan (no payloads)

1. Create/use two personal Google accounts (A victim assets, B attacker).
2. Seed private Drive doc + photo + Keep note on A; baseline share UI.
3. Map network calls for share/list/get on one product only (e.g. Drive).
4. Note object IDs and auth headers — design IDOR tests for later human session (not automated spam).
5. Document OOS traps encountered; do not test appspot customer apps.

**Safety:** freeze live exploit automation; own assets only.
