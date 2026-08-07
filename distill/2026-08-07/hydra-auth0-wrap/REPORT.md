# REPORT — Auth0 CIC wrap lane (hydra)

**UTC:** 2026-08-07  
**Lane:** `~/.xbgst/hydra-bounty/lanes/wrap/auth0`  
**Program:** Bugcrowd Auth0 by Okta — https://bugcrowd.com/engagements/auth0-okta  
**Axes:** map targets · credential state · unauth doors · first tests gated · L3 task pack · ship clean

## Deliverables

| File | Purpose |
|------|---------|
| [TARGETS.md](./TARGETS.md) | CIC + FGA + SDK + Tier2 + OOS map from BC brief |
| [CRED-STATE.md](./CRED-STATE.md) | **REQUESTED 2026-08-07** — pending assignment |
| [UNAUTH-DOORS.md](./UNAUTH-DOORS.md) | Passive HTTP first-hop matrix (no exploit) |
| [FIRST-5-TESTS.md](./FIRST-5-TESTS.md) | Post-cred test plan on own CIC tenants only |
| [l3/](./l3/) | Four short sekhmet-luna-b task prompts + outputs |
| TASK.md | Team brief |

## Findings this tick (recon only)

1. **SSoT stable:** `engagements/auth0-okta` **200**; short slug `engagements/auth0` historically **404**.  
2. **CIC manage door:** `/` → **302** `/login` → **302** `config.cic-bug-bounty.auth0app.com/authorize` with OIDC **code + PKCE S256**.  
3. **Config OIDC discovery:** `/.well-known/openid-configuration` **200**.  
4. **FGA:** dashboard authorize hop **302**; API root/stores **401** unauth; play **200**.  
5. **Bare** `cic-bug-bounty.auth0app.com` remains non-entry (000/ERR class); do not treat as manage.  
6. **Credentials:** not assigned — no authenticated testing performed.

## Credential request

- Status: **REQUESTED 2026-08-07**, **pending** human Get Credentials on BC.  
- Storage: **op:// only** after assign.  
- Blocked for: Management API authz matrix, cross-tenant PoCs, enterprise connection tests.

## Sekhmet (luna-b, j=4, direct, ~10–17s each)

| Spark id | Status | Tokens | Artifact |
|----------|--------|--------|----------|
| sp-auth0-t1-checklist | ok | 4435 | `l3/out-t1-checklist.md` |
| sp-auth0-t2-vault | ok | 4559 | `l3/out-t2-vault.md` |
| sp-auth0-t3-doors | ok (fail_reason=auth metadata only) | 6139 | `l3/out-t3-doors.md` |
| sp-auth0-t4-ev | ok | 7765 | `l3/out-t4-ev.md` |

L3 EV ranking (post-cred): **cross-tenant isolation → OAuth misbinding → member priv-esc → SAML own IdP → FGA**.

## Risk / compliance

- No secrets in tree  
- No production manage.auth0.com testing  
- Rate and scanner bans respected  
- Next human action: redeem CIC creds → update CRED-STATE → execute FIRST-5

## Ship

```
~/.xbgst/scripts/milestone-ship.sh \
  --label hydra-auth0-wrap \
  --src /home/vgpnk1337/.xbgst/hydra-bounty/lanes/wrap/auth0 \
  --msg 'Ship hydra wrap lane Auth0 CIC bounty map.'
```

## Status

**done** for wrap map + L3 pack + unauth matrix. Authenticated hunt **blocked** on CRED assignment.
