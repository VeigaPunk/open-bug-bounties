# Atlassian + OpenAI BC doors (PULSE-94)

UTC: 2026-08-07T17:30:03Z
Policy: recon only — no auth, no exploit, no token harvest.
OAuth query values redacted where present.

## Passive HEAD/GET (max-redirs 0)

| method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://id.atlassian.com/login` | 202 | `-` |
| `GET` | `https://id.atlassian.com/login` | 202 | `-` |
| `HEAD` | `https://id.atlassian.com/signup` | 202 | `-` |
| `GET` | `https://id.atlassian.com/signup` | 202 | `-` |
| `HEAD` | `https://www.atlassian.com` | 200 | `-` |
| `GET` | `https://www.atlassian.com` | 200 | `-` |
| `HEAD` | `https://www.atlassian.com/trust/security/bug-bounty` | 404 | `-` |
| `GET` | `https://www.atlassian.com/trust/security/bug-bounty` | 404 | `-` |
| `HEAD` | `https://developer.atlassian.com` | 200 | `-` |
| `GET` | `https://developer.atlassian.com` | 200 | `-` |
| `HEAD` | `https://developer.atlassian.com/console` | 200 | `-` |
| `GET` | `https://developer.atlassian.com/console` | 200 | `-` |
| `HEAD` | `https://api.atlassian.com` | 301 | `https://developer.atlassian.com` |
| `GET` | `https://api.atlassian.com` | 301 | `https://developer.atlassian.com` |
| `HEAD` | `https://bitbucket.org/account/signin/` | 302 | `https://id.atlassian.com/login?application=bitbucket&continue=https%3A%2F%2Fbitbucket.org%2Faccount%2Fsignin%2F%3Fnext%3` |
| `GET` | `https://bitbucket.org/account/signin/` | 302 | `https://id.atlassian.com/login?application=bitbucket&continue=https%3A%2F%2Fbitbucket.org%2Faccount%2Fsignin%2F%3Fnext%3` |
| `HEAD` | `https://trello.com/login` | 302 | `https://id.atlassian.com/login?application=trello&continue=https%3A%2F%2Ftrello.com%2Fauth%2Fatlassian%2Fcallback%3Fretu` |
| `GET` | `https://trello.com/login` | 302 | `https://id.atlassian.com/login?application=trello&continue=https%3A%2F%2Ftrello.com%2Fauth%2Fatlassian%2Fcallback%3Fretu` |
| `HEAD` | `https://bugcrowd.com/engagements/atlassian` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/atlassian` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/atlassian` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/atlassian` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/atlassian/brief` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/atlassian/brief` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/programs/atlassian` | 404 | `-` |
| `GET` | `https://bugcrowd.com/programs/atlassian` | 404 | `-` |
| `HEAD` | `https://openai.com` | 200 | `-` |
| `GET` | `https://openai.com` | 403 | `-` |
| `HEAD` | `https://openai.com/security/` | 403 | `-` |
| `GET` | `https://openai.com/security/` | 403 | `-` |
| `HEAD` | `https://openai.com/security-and-privacy/` | 200 | `-` |
| `GET` | `https://openai.com/security-and-privacy/` | 403 | `-` |
| `HEAD` | `https://openai.com/policies/bug-bounty-program` | 403 | `-` |
| `GET` | `https://openai.com/policies/bug-bounty-program` | 308 | `/policies/bug-bounty-program/` |
| `HEAD` | `https://openai.com/policies/bug-bounty-program/` | 403 | `-` |
| `GET` | `https://openai.com/policies/bug-bounty-program/` | 403 | `-` |
| `HEAD` | `https://platform.openai.com` | 403 | `-` |
| `GET` | `https://platform.openai.com` | 403 | `-` |
| `HEAD` | `https://platform.openai.com/login` | 403 | `-` |
| `GET` | `https://platform.openai.com/login` | 403 | `-` |
| `HEAD` | `https://api.openai.com` | 421 | `-` |
| `GET` | `https://api.openai.com` | 421 | `-` |
| `HEAD` | `https://api.openai.com/v1/models` | 401 | `-` |
| `GET` | `https://api.openai.com/v1/models` | 401 | `-` |
| `HEAD` | `https://auth0.openai.com` | 302 | `https://chatgpt.com/` |
| `GET` | `https://auth0.openai.com` | 302 | `https://chatgpt.com/` |
| `HEAD` | `https://chat.openai.com` | 308 | `https://chatgpt.com/` |
| `GET` | `https://chat.openai.com` | 308 | `https://chatgpt.com/` |
| `HEAD` | `https://chatgpt.com` | 403 | `-` |
| `GET` | `https://chatgpt.com` | 403 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/openai` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/openai` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/openai` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/openai` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/openai/brief` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/openai/brief` | 200 | `-` |

## Auth chain (passive)

1. Atlassian IdP: login GET **202**, signup **202**.
2. First-party trust BB path **404** → BC atlassian SSoT **200**.
3. Bitbucket/Trello → id.atlassian IdP (status **302/302**).
4. OpenAI: platform login HEAD **403** / GET **403**; security/ **403**; security-and-privacy **403**.
5. First-party BB policy trailing **403** → BC openai SSoT **200**.
6. api.openai bare **421**; models **401**.
7. chat/auth0 hops → chatgpt (**308/302**); chatgpt.com **403**.

## Delta vs P86

- **OpenAI bot/WAF gate tightened:** `platform.openai.com` + `/login` now **HEAD+GET 403** (P86 had HEAD 200 / GET 403 on login).
- `openai.com` GET **403** (HEAD still 200); `security-and-privacy/` HEAD **200** / GET **403**.
- `policies/bug-bounty-program/` GET **403** (was 404) — path may exist behind bot gate; **do not treat as SSoT**.
- `chatgpt.com` **403** unauth curl; chat/auth0 still hop to chatgpt.
- **Stable:** Atlassian IdP 202; BC atlassian+openai bare+/h **200**; api models **401**; bare api **421**.

## Notes

- BC enroll Atlassian + OpenAI still human; free Atlassian cloud + OpenAI platform accounts human.
- No credentials.

## Auth readiness

- Atlassian + OpenAI BB via BC SSoT mapped; enroll human.

## Next (human / gated)

- BC identity; enroll atlassian + openai briefs; own free cloud/tenant.
