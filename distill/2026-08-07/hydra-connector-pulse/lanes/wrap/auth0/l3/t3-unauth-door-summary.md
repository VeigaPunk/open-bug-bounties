# Task t3 — Summarize CIC unauth doors (offline from facts)

Policy-safe. No network. No exploit.

Given facts:
- manage.cic-bug-bounty.auth0app.com/ → 302 /login → 302 config.../authorize code+PKCE
- config.../.well-known/openid-configuration → 200
- api.us1.fga.dev/ → 401
- dashboard.fga.dev/ → 302 auth.fga.dev/authorize
- bugcrowd.com/engagements/auth0-okta → 200
- bare cic-bug-bounty.auth0app.com → 000/ERR

Produce: door graph, what unauth proves, what still needs creds, stop-conditions.
Stdout markdown. Max ~40 lines.
