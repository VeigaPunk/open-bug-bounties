# OpenAI + Atlassian Q-BC — passive engagement HTTP (Runner A)

**UTC:** 2026-08-07T14:27:40Z  
**Policy recon only** — security-impact discipline for OpenAI; no exploit; no sk- storage.

## Live status

| URL | Code | Role |
|-----|------|------|
| bugcrowd.com/engagements/openai | 200 | Primary submit/SSoT brief |
| bugcrowd.com/engagements/atlassian | 200 | Atlassian BC engagement |
| bugcrowd.com/engagements/auth0-okta | 200 | Auth0 researcher program |
| platform.openai.com | 200 | API platform shell |
| chatgpt.com | 200 | Consumer shell (TAC surface elsewhere) |
| openai.com/security | 200 | Security hub |
| openai.com/index/bug-bounty-program | 200 | Public BB index post |
| openai.com/policies/bug-bounty-program | **404** | Stale path — use BC engagement + index post |
| auth0.com | 200 | Product marketing |
| id.atlassian.com/login | **202** | IdP login shell (unusual code; host up) |

## OpenAI auth-ready notes

1. **SSoT for scope** = live Bugcrowd engagement brief (joined).
2. Hard OOS: jailbreaks, model safety, sandbox-as-RCE without escape evidence — see `OPENAI-SECURITY-IMPACT-ONLY.md`.
3. API keys found → official form only; **never** distill `sk-` / `sess-`.
4. First class after brief re-read: web/API authz, not model content.

## Atlassian notes

1. Site naming still human: `bugbounty-test-<user>.atlassian.net`.
2. id.atlassian.com/login returns **202** unauth — treat as login challenge shell, not session.
3. Old trust/security/bug-bounty marketing path 404 (prior claim).

## Axes

- evidence_fidelity↑ (OpenAI policies URL 404)
- auth_ready↑ (BC engagements live)
- safety_in_policy↑ (STOP notes linked)
