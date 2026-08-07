# MSRC-ENTRA-DOORS-P221
UTC: 2026-08-07T21:52:57Z
Policy: passive HTTP recon only. No auth abuse / no exploit.

## Bounty SSoT (first-party MSRC)

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://msrc.microsoft.com/` | 302→200 | → www.microsoft.com/en-us/msrc |
| `GET` | `https://www.microsoft.com/en-us/msrc` | 200 | **MSRC hub SSoT** |
| `GET` | `https://www.microsoft.com/en-us/msrc/bounty` | 200 | bounty overview |
| `GET` | `https://www.microsoft.com/en-us/msrc/bounty-programs` | 200 | program list shell |
| `GET` | `https://msrc.microsoft.com/report/vulnerability` | 200 | report intake |
| `GET` | `https://portal.msrc.microsoft.com/` | 302→200 | → update-guide class |
| `GET` | `https://www.microsoft.com/en-us/msrc/researcher-portal` | 404 | researcher-portal path miss |
| `GET` | `https://www.microsoft.com/en-us/msrc/bounty/azure` | 404 | deep bounty slug miss |
| `GET` | `https://www.microsoft.com/en-us/msrc/bounty/microsoft-cloud` | 404 | deep bounty slug miss |
| `GET` | `https://www.microsoft.com/en-us/msrc/bounty/online-services` | 404 | deep bounty slug miss |
| `GET` | `https://bugcrowd.com/engagements/microsoft` | 404 | not on BC |
| `GET` | `https://bugcrowd.com/microsoft` | 404 | bare BC slug dead |
| `GET` | `https://hackerone.com/microsoft` | 404 | not H1 program slug |

## Entra / consumer identity

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://login.microsoftonline.com/` | 302→200 | authorize chain (Entra) |
| `GET` | `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration` | 200 | **OIDC v2 JSON** |
| `GET` | `https://login.microsoftonline.com/common/.well-known/openid-configuration` | 200 | **OIDC v1 JSON** |
| `GET` | `https://login.live.com/` | 200 | MSA consumer login |
| `GET` | `https://account.microsoft.com/` | 302→200 | consumer account |
| `GET` | `https://portal.azure.com/` | 200 | Azure portal shell |
| `GET` | `https://portal.azure.com/.well-known/openid-configuration` | 404 | no OIDC on portal apex |
| `GET` | `https://security.microsoft.com/` | 302→200 | → Entra authorize (MDO) |

## Graph / security API (unauth passive)

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://graph.microsoft.com/` | 301→200 | → developer.microsoft.com/graph |
| `GET` | `https://graph.microsoft.com/v1.0/me` | 401 | unauth |
| `GET` | `https://graph.microsoft.com/v1.0` | 200 | service root class |
| `GET` | `https://api.security.microsoft.com/` | 401 | unauth |
| `GET` | `https://api.security.microsoft.com/api` | 401 | unauth |

## Platform identity (other queues)

| Method | URL | code | notes |
|--------|-----|------|-------|
| `GET` | `https://identity.bugcrowd.com/login` | 200 | BC identity (other Q-BC) |
| `GET` | `https://hackerone.com/.well-known/openid-configuration` | 200 | H1 OIDC |
| `GET` | `https://api.hackerone.com/v1/me` | 401 | unauth |

## Summary
MSRC BB SSoT **first-party** www.microsoft.com/en-us/msrc + bounty + bounty-programs **200**; report/vulnerability **200**. BC eng + H1 /microsoft **404**. Entra OIDC common v1+v2 **200**; portal.azure OIDC path **404**. Graph me + security API **401**. Deep /msrc/bounty/* product slugs **404** this tick (overview pages live).

## Auth readiness (runner-a)
- Program: MSRC first-party (browser report + bounty program pick) — not BC/H1 queue.
- Product: login.microsoftonline.com Entra / login.live.com MSA + portal.azure.com browser.
- Graph: Bearer after app registration / delegated consent (not curl durable).
- Queue map: Q-FP F2 Microsoft MSRC (keep-8).

## Deltas
- New P221 artifact (no prior MSRC-ENTRA pulse series on runner-a this session).
