# OPENAI-ATLASSIAN-PATH-REFRESH — PULSE-45 (policy recon only)

**UTC:** 2026-08-07T15:50Z · **Runner A** · **No secrets · GET-only curl**  
**Axes:** `auth_ready_a` · `openai_atlassian_paths` · `claims`

## OpenAI

| Code | URL | Final / note |
|------|-----|----------------|
| **200** | openai.com/security | → /security-and-privacy/ |
| **404** | policies/security-policy · policies/bug-bounty-program | legacy policy paths dead |
| **200** | bugcrowd.com/engagements/openai | **bounty SSoT** |
| **200** | …/openai/brief | → /h/engagements/openai/brief |
| **200** | platform.openai.com/login · signup | free-tier doors |
| **200** | auth.openai.com | → chatgpt.com/auth/login_with |
| **200** | chat.openai.com | → chatgpt.com |
| **421** | api.openai.com bare | misdirected/SNI class |
| **401** | api.openai.com/v1/models | endpoint lives; token required |
| **200** | status.openai.com | |

## Atlassian

| Code | URL | note |
|------|-----|------|
| **404** | atlassian.com/trust/security/bug-bounty | use BC |
| **200** | bugcrowd.com/engagements/atlassian · /brief → /h/… | **bounty SSoT** |
| **202** | id.atlassian.com/login · signup | unauth shell (not 200) |
| **200** | start.atlassian.com · developer console · admin.atlassian.com | product shells |
| **200** | api.atlassian.com | → developer.atlassian.com |
| **202** | bitbucket signin · trello login | → id.atlassian.com |

## Claims

- OpenAI BB = BC engagements/openai; first-party policy paths 404
- api.openai.com bare 421; /v1/models 401 unauth
- Atlassian BB = BC engagements/atlassian; trust BB 404
- id.atlassian 202; Bitbucket/Trello funnel to id

## Policy

No live exploit · no spray · free-tier human only.
