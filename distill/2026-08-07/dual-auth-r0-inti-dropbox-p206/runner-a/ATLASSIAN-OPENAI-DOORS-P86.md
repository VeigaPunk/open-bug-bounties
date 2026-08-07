# Atlassian + OpenAI BC doors (PULSE-86)

UTC: 2026-08-07T17:12:04Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| URL | status | location (abbrev) | notes |
|-----|--------|-------------------|-------|
| `https://id.atlassian.com/login` | 202 | - | IdP shell |
| `https://id.atlassian.com/signup` | 202 GET | - | free door |
| `https://www.atlassian.com` | 200 | - | marketing |
| `https://www.atlassian.com/trust/security/bug-bounty` | 404 | - | first-party BB path dead |
| `https://developer.atlassian.com` | 200 | - | developer |
| `https://developer.atlassian.com/console` | 200 | - | console shell |
| `https://api.atlassian.com` | 301 | → developer.atlassian.com/ | |
| `https://bitbucket.org/account/signin/` | 302 GET | → id.atlassian.com login?application=bitbucket | IdP |
| `https://trello.com/login` | 302 | → id.atlassian.com/login?application=trello | IdP |
| `https://bugcrowd.com/engagements/atlassian` | 200 | - | **BC SSoT bare** |
| `https://bugcrowd.com/h/engagements/atlassian` | 200 | - | /h soft |
| `https://bugcrowd.com/h/engagements/atlassian/brief` | 200 | - | |
| `https://bugcrowd.com/programs/atlassian` | 404 | - | retired |
| `https://openai.com` | 200 | - | marketing |
| `https://openai.com/security/` | **403** GET | - | gate (was hop chain P78) |
| `https://openai.com/security-and-privacy/` | 200 GET | - | security hub SSoT |
| `https://openai.com/policies/bug-bounty-program` | 308 GET | → trailing slash | |
| `https://openai.com/policies/bug-bounty-program/` | **404** GET | - | policy path dead |
| `https://platform.openai.com` | 200 HEAD | - | platform shell |
| `https://platform.openai.com/login` | **200 HEAD / 403 GET** | - | method-sensitive curl gate |
| `https://api.openai.com` | 421 | - | bare misdirected |
| `https://api.openai.com/v1/models` | 401 | - | unauth |
| `https://auth0.openai.com` | 302 | → chatgpt.com/ | |
| `https://chat.openai.com` | 308 | → chatgpt.com/ | |
| `https://bugcrowd.com/engagements/openai` | 200 | - | **BC SSoT bare** |
| `https://bugcrowd.com/h/engagements/openai` | 200 | - | |
| `https://bugcrowd.com/h/engagements/openai/brief` | 200 | - | |

## Auth chain (passive)

1. Atlassian: id login/signup **202**; trust BB **404** → BC atlassian SSoT; Trello+Bitbucket → Atlassian IdP.
2. OpenAI: platform login **HEAD 200 / GET 403**; first-party BB policy **404** → **BC openai** SSoT.
3. API bare **421**; models **401**.
4. security/ **403** this tick; security-and-privacy/ **200** remains content hub.
5. auth0.openai / chat → chatgpt.com.

## Delta vs P78

- platform.openai.com/login: method split (**HEAD 200 / GET 403**); P78 recorded GET **403**.
- openai.com/security/ **403** (was hop to security-and-privacy); direct security-and-privacy still **200**.
- Bitbucket/Trello → id.atlassian IdP explicit.
- BC bare atlassian+openai still **200**.

## Notes

- Free accounts + BC enroll still human.
- No credentials.

## Auth readiness

- Atlassian+OpenAI BC SSoT; enroll human.

## Next (human / gated)

- BC identity; enroll atlassian + openai briefs; free Atlassian/OpenAI accounts.
