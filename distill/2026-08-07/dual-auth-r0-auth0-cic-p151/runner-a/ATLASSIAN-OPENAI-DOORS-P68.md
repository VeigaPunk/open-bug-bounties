# Atlassian + OpenAI BC doors (PULSE-68)

UTC: 2026-08-07T16:36:27Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://id.atlassian.com/login` | 202 | - | IdP shell (not 200) |
| `https://id.atlassian.com/signup` | 202 | - | |
| `https://bitbucket.org/account/signin` | 301 | → trailing slash | |
| `https://trello.com/login` | 302 | → id.atlassian.com/login?application=trello | |
| `https://developer.atlassian.com/console` | 200 | - | tiny shell |
| `https://api.atlassian.com` | 301 | → developer.atlassian.com | |
| `https://www.atlassian.com/trust/security/bug-bounty` | 404 | - | first-party BB gone |
| `https://bugcrowd.com/engagements/atlassian` | 200 | - | **BB SSoT** |
| `https://bugcrowd.com/h/engagements/atlassian` | 200 | - | |
| `https://bugcrowd.com/h/engagements/atlassian/brief` | 200 | - | |
| `https://openai.com/security` | 308 | → /security/ | |
| `https://openai.com/security-and-privacy/` | 200 | - | policy surface |
| `https://openai.com/policies/bug-bounty-program` | 308 | → trailing slash | |
| `https://platform.openai.com` | 200 | - | |
| `https://platform.openai.com/login` | 200 | - | |
| `https://auth0.openai.com` | 302 | → chatgpt.com/ | |
| `https://api.openai.com` | 421 | - | misdirected/blocked curl |
| `https://api.openai.com/v1/models` | 401 | - | token gate |
| `https://bugcrowd.com/engagements/openai` | 200 | - | **BB SSoT** |
| `https://bugcrowd.com/h/engagements/openai` | 200 | - | |
| `https://bugcrowd.com/h/engagements/openai/brief` | 200 | - | |
| `https://tracker.bugcrowd.com/atlassian` | 302 | → sign_in | |
| `https://tracker.bugcrowd.com/openai` | 302 | → sign_in | |

## Notes

- Atlassian + OpenAI bounty SSoT both **BC engagements** (trust BB 404; first-party OpenAI policy may 404 after slash — re-check).
- id.atlassian returns **202** unauth (characteristic).
- api.openai bare **421**; models **401**.

## Auth readiness

- BC enroll atlassian/openai still **human**.
- Own Atlassian cloud + OpenAI account after brief.

## Next (human / gated)

- Join BC briefs; free Atlassian cloud; OpenAI platform account; no secrets in distill.

## Follow-on (same tick)

| URL | status | notes |
|-----|--------|-------|
| `https://openai.com/policies/bug-bounty-program/` | 404 | first-party BB path dead; use BC |
| `https://openai.com/security/` | 307 | → /security-and-privacy/ |
| `https://bitbucket.org/account/signin/` | 302 | → id.atlassian login application=bitbucket |

