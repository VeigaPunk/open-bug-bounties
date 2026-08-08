## Axes

- Reachability/status
- Redirect/authentication boundary
- Public metadata
- Authorized data/actions

## Door graph

```text
manage.cic-bug-bounty.auth0app.com/
  └─302 /login
      └─302 config.../authorize (authorization-code + PKCE)

config.../.well-known/openid-configuration
  └─200 (OIDC discovery metadata)

dashboard.fga.dev/
  └─302 auth.fga.dev/authorize

api.us1.fga.dev/
  └─401 (authentication required)

bugcrowd.com/engagements/auth0-okta
  └─200 (public engagement page)

cic-bug-bounty.auth0app.com (bare)
  └─000/ERR (no usable response observed)
```

## What unauthenticated access proves

- The management host is reachable and enforces login before application access.
- The OIDC discovery endpoint is publicly readable.
- The dashboard redirects unauthenticated users to an authorization endpoint.
- The FGA API rejects unauthenticated requests with `401`.
- The Bugcrowd engagement page is publicly accessible.
- The bare-host result is inconclusive beyond an unavailable/error response.

## What still needs credentials

- Completing the authorization-code + PKCE flow.
- Obtaining tokens and establishing a session.
- Accessing management or dashboard functions.
- Calling protected FGA API resources.
- Verifying tenant-specific permissions, data exposure, or actions.

## Stop conditions

- Do not attempt login, token exchange, PKCE completion, or credential testing.
- Do not probe beyond the listed endpoints or bypass redirects/authentication.
- Treat `000/ERR` as non-evidence of authorization or vulnerability.
- Stop at `401`/authorization redirects unless explicitly supplied valid test credentials and scope.

