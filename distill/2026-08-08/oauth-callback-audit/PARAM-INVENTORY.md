# PARAM-INVENTORY

| Param | Value (sanitized) | Notes |
|-------|-------------------|--------|
| state | <32-hex-REDACTED> | 32 hex chars; CSRF/session bind candidate |
| iss | https://accounts.google.com | OIDC issuer claim/param |
| code | REDACTED_CODE | len=73; prefix 4/; Google authz code shape |
| scope | openid email profile + userinfo.* | identity only; no Drive/Gmail |
| authuser | 0 | primary Google account index |
| prompt | none | silent/reconsent skip if session valid |
| host/path | github.com /sessions/social/google/callback | GitHub social login RP callback |
| scheme | https | required per OAuth BCP |

## Constraints

- **NO_EXCHANGE** — do not exchange authorization codes.
- **NO_REPLAY** — do not replay callback URLs or codes.
- **Secret-gate** before any ship (`rg` for secrets; never commit raw codes).
