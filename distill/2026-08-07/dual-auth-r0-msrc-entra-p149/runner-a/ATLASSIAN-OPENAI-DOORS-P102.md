# Atlassian + OpenAI doors (PULSE-102)

UTC: 2026-08-07T17:47:45Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive HEAD/GET (max-redirs 0)

| method | URL | status | location (abbrev) |
|--------|-----|--------|-------------------|
| `HEAD` | `https://bugcrowd.com/engagements/atlassian` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/atlassian` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/atlassian` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/atlassian` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/atlassian/brief` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/atlassian/brief` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/atlassian/brief` | 301 | `https://bugcrowd.com/h/engagements/atlassian/brief` |
| `GET` | `https://bugcrowd.com/engagements/atlassian/brief` | 301 | `https://bugcrowd.com/h/engagements/atlassian/brief` |
| `HEAD` | `https://bugcrowd.com/programs/atlassian` | 404 | `-` |
| `GET` | `https://bugcrowd.com/programs/atlassian` | 404 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/openai` | 200 | `-` |
| `GET` | `https://bugcrowd.com/engagements/openai` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/openai` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/openai` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/h/engagements/openai/brief` | 200 | `-` |
| `GET` | `https://bugcrowd.com/h/engagements/openai/brief` | 200 | `-` |
| `HEAD` | `https://bugcrowd.com/engagements/openai/brief` | 301 | `https://bugcrowd.com/h/engagements/openai/brief` |
| `GET` | `https://bugcrowd.com/engagements/openai/brief` | 301 | `https://bugcrowd.com/h/engagements/openai/brief` |
| `HEAD` | `https://bugcrowd.com/programs/openai` | 404 | `-` |
| `GET` | `https://bugcrowd.com/programs/openai` | 404 | `-` |
| `HEAD` | `https://id.atlassian.com` | 301 | `/login` |
| `GET` | `https://id.atlassian.com` | 301 | `/login` |
| `HEAD` | `https://id.atlassian.com/login` | 202 | `-` |
| `GET` | `https://id.atlassian.com/login` | 202 | `-` |
| `HEAD` | `https://auth.atlassian.com` | 301 | `https://id.atlassian.com/` |
| `GET` | `https://auth.atlassian.com` | 301 | `https://id.atlassian.com/` |
| `HEAD` | `https://admin.atlassian.com` | 200 | `-` |
| `GET` | `https://admin.atlassian.com` | 200 | `-` |
| `HEAD` | `https://www.atlassian.com` | 200 | `-` |
| `GET` | `https://www.atlassian.com` | 200 | `-` |
| `HEAD` | `https://www.atlassian.com/trust/security/bug-bounty` | 404 | `-` |
| `GET` | `https://www.atlassian.com/trust/security/bug-bounty` | 404 | `-` |
| `HEAD` | `https://developer.atlassian.com` | 200 | `-` |
| `GET` | `https://developer.atlassian.com` | 200 | `-` |
| `HEAD` | `https://api.atlassian.com` | 301 | `https://developer.atlassian.com` |
| `GET` | `https://api.atlassian.com` | 301 | `https://developer.atlassian.com` |
| `HEAD` | `https://api.atlassian.com/.well-known/openid-configuration` | 404 | `-` |
| `GET` | `https://api.atlassian.com/.well-known/openid-configuration` | 404 | `-` |
| `HEAD` | `https://id.atlassian.com/.well-known/openid-configuration` | 202 | `-` |
| `GET` | `https://id.atlassian.com/.well-known/openid-configuration` | 202 | `-` |
| `HEAD` | `https://auth.atlassian.com/.well-known/openid-configuration` | 200 | `-` |
| `GET` | `https://auth.atlassian.com/.well-known/openid-configuration` | 200 | `-` |
| `HEAD` | `https://platform.openai.com` | 403 | `-` |
| `GET` | `https://platform.openai.com` | 403 | `-` |
| `HEAD` | `https://platform.openai.com/login` | 403 | `-` |
| `GET` | `https://platform.openai.com/login` | 403 | `-` |
| `HEAD` | `https://auth0.openai.com` | 302 | `https://chatgpt.com/` |
| `GET` | `https://auth0.openai.com` | 302 | `https://chatgpt.com/` |
| `HEAD` | `https://auth0.openai.com/.well-known/openid-configuration` | 404 | `-` |
| `GET` | `https://auth0.openai.com/.well-known/openid-configuration` | 404 | `-` |
| `HEAD` | `https://api.openai.com` | 421 | `-` |
| `GET` | `https://api.openai.com` | 421 | `-` |
| `HEAD` | `https://api.openai.com/v1/models` | 401 | `-` |
| `GET` | `https://api.openai.com/v1/models` | 401 | `-` |
| `HEAD` | `https://chat.openai.com` | 308 | `https://chatgpt.com/` |
| `GET` | `https://chat.openai.com` | 308 | `https://chatgpt.com/` |
| `HEAD` | `https://openai.com/security` | 403 | `-` |
| `GET` | `https://openai.com/security` | 308 | `/security/` |
| `HEAD` | `https://openai.com/form/bug-bounty` | 403 | `-` |
| `GET` | `https://openai.com/form/bug-bounty` | 403 | `-` |
| `HEAD` | `https://bugcrowd.com/user/sign_in` | 302 | `https://identity.bugcrowd.com/login?user_hint=researcher&returnTo=https%3A%2F%2Fbugcrowd.c` |
| `GET` | `https://bugcrowd.com/user/sign_in` | 302 | `https://identity.bugcrowd.com/login?user_hint=researcher&returnTo=https%3A%2F%2Fbugcrowd.c` |
| `HEAD` | `https://tracker.bugcrowd.com/atlassian` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `GET` | `https://tracker.bugcrowd.com/atlassian` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `HEAD` | `https://tracker.bugcrowd.com/openai` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |
| `GET` | `https://tracker.bugcrowd.com/openai` | 302 | `https://tracker.bugcrowd.com/user/sign_in` |

## Auth chain (passive)

1. BC SSoT: bare **atlassian** + **openai** engagements **200**; `/h` + brief **200**; bare brief → `/h` **301**.
2. programs/* **404** (retired path).
3. Atlassian IdP: id apex → /login **301**; login **202**; auth → id **301**; **auth.atlassian.com** OIDC well-known **200**; id well-known **202**; api well-known **404**.
4. admin/www/developer **200**; first-party trust BB path **404** (BC remains SSoT).
5. OpenAI: platform login curl **403**; auth0.openai → chatgpt **302**; auth0 OIDC **404**; api.openai root **421**; v1/models **401**; chat → chatgpt **308**.
6. openai.com/security HEAD **403** / GET **308**→/security/; form/bug-bounty **403** (curl bot gate).
7. BC sign_in → identity researcher **302**; tracker atlassian/openai → sign_in **302**.

## Delta vs P94

- **New:** `auth.atlassian.com/.well-known/openid-configuration` **200** (product IdP OIDC).
- **New:** id.atlassian well-known **202** (SPA-class, not classic 200 JSON).
- **New:** auth0.openai apex **302**→chatgpt; OIDC path **404**.
- api.openai v1/models **401** stable; platform **403** curl; BC dual SSoT **200** stable.

## Notes

- Atlassian cloud site `bugbounty-test-<user>` + OpenAI TAC/security-impact still human.
- No credentials; no `sk-` harvest.

## Auth readiness

- Atlassian IdP OIDC + BC SSoT mapped; OpenAI API unauth class mapped; enroll human.

## Next (human / gated)

- Create named Atlassian site dual ninja; OpenAI only security-impact with brief re-read.
