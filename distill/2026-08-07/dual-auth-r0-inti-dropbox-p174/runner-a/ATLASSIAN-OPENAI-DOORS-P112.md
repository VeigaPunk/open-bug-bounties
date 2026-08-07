# Atlassian + OpenAI doors (PULSE-112)

UTC: 2026-08-07T18:09:27Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| Method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://auth.atlassian.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://auth.atlassian.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://id.atlassian.com/login` | 202 | `-` |
| `GET` | `https://id.atlassian.com/login` | 202 | `-` |
| `HEAD` | `https://id.atlassian.com/signup` | 202 | `-` |
| `GET` | `https://id.atlassian.com/signup` | 202 | `-` |
| `HEAD` | `https://start.atlassian.com` | 200 | `-` |
| `GET` | `https://start.atlassian.com` | 200 | `-` |
| `HEAD` | `https://admin.atlassian.com` | 200 | `-` |
| `GET` | `https://admin.atlassian.com` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/atlassian` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/atlassian` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/atlassian` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/atlassian` | 200 | `-` |
| `HEAD` | `https://www.atlassian.com/trust/security/bug-bounty` | 404 | `-` |
| `GET` | `https://www.atlassian.com/trust/security/bug-bounty` | 404 | `-` |
| `HEAD` | `https://platform.openai.com` | 200 | `-` |
| `GET` | `https://platform.openai.com` | 403 | `-` |
| `HEAD` | `https://platform.openai.com/login` | 403 | `-` |
| `GET` | `https://platform.openai.com/login` | 403 | `-` |
| `HEAD` | `https://auth0.openai.com/.well-known/openid-configuration` | 404 | `-` |
| `GET` | `https://auth0.openai.com/.well-known/openid-configuration` | 404 | `-` |
| `HEAD` | `https://auth.openai.com` | 403 | `-` |
| `GET` | `https://auth.openai.com` | 403 | `-` |
| `HEAD` | `https://api.openai.com/v1/models` | 401 | `-` |
| `GET` | `https://api.openai.com/v1/models` | 401 | `-` |
| `HEAD` | `https://chat.openai.com` | 308 | `→ chatgpt.com` |
| `GET` | `https://chat.openai.com` | 308 | `→ chatgpt.com` |
| `HEAD` | `https://chatgpt.com` | 403 | `-` |
| `GET` | `https://chatgpt.com` | 403 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/openai` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/openai` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/openai` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/openai` | 200 | `-` |
| `HEAD` | `https://hackerone.com/openai` | 200 | `-` |
| `GET` | `https://hackerone.com/openai` | 200 | `-` |
| `HEAD` | `https://hackerone.com/atlassian` | 200 | `-` |
| `GET` | `https://hackerone.com/atlassian` | 200 | `-` |

## Auth chain (passive)

1. Atlassian IdP: auth OIDC **200**; id login/signup **202**; start/admin **200**.
2. BC atlassian bare + /h **200** SSoT; first-party trust BB path **404**.
3. OpenAI: platform HEAD **200** / GET **403** method split; login/auth **403**; api models **401**.
4. auth0.openai OIDC well-known **404**; chat → chatgpt **308**; chatgpt curl **403**.
5. BC openai bare + /h **200**; H1 openai/atlassian SPA **200**.

## Delta vs P102

- platform.openai HEAD now **200** (was dual 403) while GET stays **403**.
- Atlassian OIDC + id 202 + BC SSoT stable.
- H1 SPA shells for both programs **200** (added this tick).

## Notes

- Sessions still human/browser; no secrets in distill.

## Auth readiness

- Atlassian BC + IdP doors mapped; OpenAI unauth API/platform gates mapped.

## Next (human / gated)

- BC identity session for Atlassian/OpenAI briefs; OpenAI platform browser login if in-scope.
