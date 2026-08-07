# Atlassian + OpenAI BC doors (PULSE-78)

UTC: 2026-08-07T16:56:13Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://id.atlassian.com/login` | 202 | - | IdP shell |
| `https://id.atlassian.com/signup` | 202 | - | free door |
| `https://www.atlassian.com` | 200 | - | marketing |
| `https://www.atlassian.com/trust/security/bug-bounty` | 404 | - | first-party BB path dead |
| `https://trello.com` | 200 | - | product shell |
| `https://bugcrowd.com/engagements/atlassian` | 200 | - | **BC SSoT bare** |
| `https://bugcrowd.com/h/engagements/atlassian` | 200 | - | /h soft |
| `https://bugcrowd.com/h/engagements/atlassian/brief` | 200 | - | |
| `https://tracker.bugcrowd.com/atlassian` | 302 | → /user/sign_in | |
| `https://openai.com/policies/bug-bounty-program` | 308 | → trailing slash | |
| `https://openai.com/policies/bug-bounty-program/` | 404 | - | **policy path dead** |
| `https://openai.com/security` | 308 | → /security/ | |
| `https://openai.com/security/` | 307 | → /security-and-privacy/ | chain |
| `https://openai.com/security-and-privacy` | 308 | → trailing slash | |
| `https://openai.com/security-and-privacy/` | 200 | - | security hub SSoT |
| `https://platform.openai.com/login` | 403 | - | **curl gate (was 200 P68)** |
| `https://auth0.openai.com` | 302 | → chatgpt.com/ | |
| `https://api.openai.com` | 421 | - | bare misdirected |
| `https://api.openai.com/v1/models` | 401 | - | unauth |
| `https://bugcrowd.com/engagements/openai` | 200 | - | **BC SSoT bare** |
| `https://bugcrowd.com/h/engagements/openai` | 200 | - | |
| `https://bugcrowd.com/h/engagements/openai/brief` | 200 | - | |
| `https://tracker.bugcrowd.com/openai` | 302 | → /user/sign_in | |

## Auth chain (passive)

1. Atlassian: id login/signup **202**; trust BB **404** → BC atlassian SSoT.
2. OpenAI: platform login **403** curl; auth0.openai → chatgpt; API models **401**.
3. First-party BB policy URL **404** after slash normalize — **BC openai** join SSoT.
4. Security content consolidates to `/security-and-privacy/`.

## Delta vs P68

- platform.openai.com/login **403** (was 200).
- policies/bug-bounty-program/ **404** (path drift).
- security/ → security-and-privacy/ **200**.
- BC bare atlassian+openai still **200**.

## Notes

- Free accounts + BC enroll still human.
- No credentials.

## Auth readiness

- Atlassian+OpenAI BC SSoT; enroll human.

## Next (human / gated)

- Browser BC identity; enroll atlassian + openai briefs.
