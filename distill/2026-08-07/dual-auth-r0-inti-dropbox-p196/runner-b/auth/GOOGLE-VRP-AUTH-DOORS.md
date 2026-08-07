# Google VRP / accounts auth doors (passive GET only)

UTC: 2026-08-07T15:13:00Z
Policy: unauth status only. Own accounts only when live. No spray.

| URL | code0 | follow→ | notes |
|-----|-------|---------|-------|
| `https://bughunters.google.com/` | 200 | 200 | - |
| `https://bughunters.google.com/about/rules` | 301 | 200 | https://bughunters.google.com/about/rules/about-this-section |
| `https://bughunters.google.com/about/rules/google-friends/google-and-alphabet-vulnerability-reward-program-vrp-rules` | 200 | 200 | - |
| `https://bughunters.google.com/report` | 200 | 200 | - |
| `https://bughunters.google.com/learn` | 200 | 200 | - |
| `https://issuestacker.google.com/` | err | - | DNS/connect fail this tick |
| `https://accounts.google.com/` | 302 | 200 | https://accounts.google.com/ServiceLogin?passive=1209600&followup=https%3A%2F%2Faccounts.google.com% |
| `https://accounts.google.com/ServiceLogin` | 302 | 200 | https://accounts.google.com/v3/signin/identifier?flowName=WebLiteSignIn&flowEntry=ServiceLogin&dsh=S |
| `https://accounts.google.com/signup` | 302 | 200 | https://accounts.google.com/lifecycle/flows/signup?flowName=GlifWebSignIn&flowEntry=SignUp&dsh=S1695 |
| `https://myaccount.google.com/` | 302 | 200 | https://myaccount.google.com/intro;https://myaccount.google.com/general-light;https://accounts.googl |
| `https://drive.google.com/` | 302 | 200 | https://accounts.google.com/ServiceLogin?service=wise&passive=1209600&osid=1&followup=https://drive. |
| `https://docs.google.com/` | 302 | 200 | https://accounts.google.com/ServiceLogin?passive=1209600&osid=1&followup=https://docs.google.com/&em |
| `https://mail.google.com/` | 301 | 200 | /mail/;https://mail.google.com/mail/u/0/;https://accounts.google.com/ServiceLogin?service=mail&passi |
| `https://www.google.com/appserve/security-bugs/m2/new` | 302 | 200 | https://bughunters.google.com/ |
| `https://g.co/vulnz` | 302 | 200 | https://bughunters.google.com/ |
| `https://security.googleblog.com/` | 301 | 200 | https://blog.google/security/ |
| `https://www.google.com/about/appsecurity/` | 301 | 200 | https://about.google/appsecurity;https://about.google/company-info/appsecurity/ |
| `https://www.google.com/about/appsecurity/reward-program/` | 301 | 200 | https://bughunters.google.com/about/rules/6625378258649088;https://bughunters.google.com/about/rules |
| `https://oauth2.googleapis.com/token` | 404 | 404 | - |
| `https://www.googleapis.com/oauth2/v1/userinfo` | 401 | 401 | - |

## Notes
- F1: dual own Google accounts; avoid customer appspot.
- OAuth userinfo/token expected 401/400 unauth.
- No credentials, no mutation.
