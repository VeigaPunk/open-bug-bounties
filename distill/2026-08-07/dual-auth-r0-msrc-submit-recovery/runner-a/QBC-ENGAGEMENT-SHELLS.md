# Q-BC engagement public shells (passive GET only)

UTC: 2026-08-07T15:11:10Z
Policy: unauth status only; join state not claimed without human session.

| URL | code0 | follow→ | notes |
|-----|-------|---------|-------|
| `https://bugcrowd.com/engagements` | 200 | 200 | - |
| `https://bugcrowd.com/engagements/aiven` | 404 | 404 | - |
| `https://bugcrowd.com/engagements/auth0-okta` | 200 | 200 | - |
| `https://bugcrowd.com/engagements/okta` | 200 | 200 | - |
| `https://bugcrowd.com/engagements/atlassian` | 200 | 200 | - |
| `https://bugcrowd.com/engagements/openai` | 200 | 200 | - |
| `https://bugcrowd.com/engagements/bugcrowd` | 200 | 200 | - |
| `https://bugcrowd.com/engagements/tesla` | 200 | 200 | - |
| `https://bugcrowd.com/programs/aiven` | 404 | 404 | - |
| `https://bugcrowd.com/programs/okta` | 404 | 404 | - |
| `https://bugcrowd.com/engagements/aiven/brief` | 301 | 200 | https://bugcrowd.com/h/engagements/aiven/brief |
| `https://bugcrowd.com/engagements/openai/brief` | 301 | 200 | https://bugcrowd.com/h/engagements/openai/brief |
| `https://bugcrowd.com/engagements/atlassian/brief` | 301 | 200 | https://bugcrowd.com/h/engagements/atlassian/brief |
| `https://bugcrowd.com/engagements/auth0-okta/brief` | 301 | 200 | https://bugcrowd.com/h/engagements/auth0-okta/brief |
| `https://bugcrowd.com/engagements/okta/brief` | 301 | 200 | https://bugcrowd.com/h/engagements/okta/brief |
| `https://bugcrowd.com/crowdstream` | 200 | 200 | - |
| `https://bugcrowd.com/leaderboard` | 200 | 200 | - |
| `https://tracker.bugcrowd.com/aiven` | 302 | 200 | https://tracker.bugcrowd.com/user/sign_in |
| `https://tracker.bugcrowd.com/okta` | 302 | 200 | https://tracker.bugcrowd.com/user/sign_in |
| `https://bugcrowd.com/engagements/auth0` | 404 | 404 | - |

## Notes
- 200 = public engagement shell present; not proof of researcher acceptance.
- brief paths may 404 or require auth — record codes only.
- No credentials, no mutation.

## SSoT summary (this tick)
| Engagement | Public shell | Brief (`/h/engagements/.../brief`) |
|------------|--------------|-------------------------------------|
| auth0-okta | **200** | **200** via 301 |
| okta | **200** | **200** via 301 |
| atlassian | **200** | **200** via 301 |
| openai | **200** | **200** via 301 |
| aiven | **404** on `/engagements/aiven` | **200** via brief → `/h/...` |
| auth0 (wrong slug) | **404** | n/a — use auth0-okta |

Tracker program paths unauth → sign_in (not public briefs).
