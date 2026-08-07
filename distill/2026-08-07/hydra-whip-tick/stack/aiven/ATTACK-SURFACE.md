# ATTACK-SURFACE — Aiven control plane (own assets only)

## Topology

```
[Researcher A/B @bugcrowdninja]
        │
        ├─ browser → console.aiven.io (CF edge, CSP + Okta/Google/MS form-action)
        │                 │
        │                 └─ API calls with Authorization: aivenv1 <token>
        │
        └─ curl/scripts → api.aiven.io/v1/...
                              │
                              └─ project / service / user / ACL / org / billing
                                        │
                                        ▼ (only if YOU created)
                              *.aivencloud.com service endpoints
```

## Public boundary evidence (2026-08-07 host)

| Target | Result |
|--------|--------|
| `GET /v1/project` no auth | **401** JSON: no valid client certificate / auth |
| `api.aiven.io/` root | 404 / doc redirect patterns |
| `console.aiven.io/` | 200 HTML SPA; Cloudflare; HSTS; XFO deny |
| `api.aiven.io` | CF; docs at `/doc/` public |

**Interpretation:** Unauth project listing is correctly closed. Hunt value is **authz after token** (IDOR/confused deputy/ACL), not open listing.

## High-value API clusters (from public OpenAPI-style doc TOC)

Authz/IDOR candidates **between two owned accounts**:

1. **Project** — list/get/update/delete; membership invite/confirm; tags; event log  
2. **Project users / teams** — list users with access; remove/update user; team↔project associate  
3. **Permissions** — list/set/patch permissions  
4. **Organizations / accounts** — list orgs, projects under org, invites, access credentials (experimental)  
5. **Service lifecycle** — create/list/get service; power; users/ACL (Kafka ACL, PG users, OpenSearch ACLs)  
6. **Application users / tokens** — app token mint/list/delete (ATO-class if cross-org)  
7. **Billing groups / credits** — claim credit, list invoices (info disclosure between own billing groups only)  
8. **Secrets / CMK** — list accessors, services associated  
9. **VPC / peering** — only free/trial if available; avoid cost  
10. **Kafka governance / Connect / MM2** — Tier 1; after free Kafka up  

## Console surface

- SSO: Okta, Google, Microsoft (CSP form-action) — own-account session fixation/SSO misbind only  
- Stripe connect-src present — payment flows **OOS for us** (no CC)  
- Auth session = API token header; cookie-only assumptions are N/A for reports  

## Service data plane (after free service)

| Free service | Authz angle |
|--------------|-------------|
| PostgreSQL | service users, connection URI leak via control plane list to wrong token |
| Kafka | ACL entries API; topic governance REST |
| OpenSearch | dual ACL models / avnadmin confusion |
| MySQL / Valkey | service user password reset endpoints scoped to project |

**Never** probe aivencloud hostnames not created under your project.

## Known non-bugs

- Using stolen/replayed foreign `aivenv1` token works → **by design**, not a bug  
- Missing cookies if header auth works  
- Rate limit absence alone  

## Passive recon already done

See `~/.xbgst/bounty-distill/2026-08-07/recon/aiven.md` (headers, CSP, regatta S3 static).

## Blocked until free tier

Active authz IDOR matrix requires Account A token + ProjectA IDs + Account B token.  
**Status:** free-tier console signup with ninja mailbox **not completed** (BURNER-RUN / dual-auth notes).
