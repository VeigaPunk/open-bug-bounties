Policy-safe recon ONLY. No network. No secrets. No exploits.

Generate Identity-day AUTH readiness checklist for Auth0 (auth0-okta on Bugcrowd) THEN Okta (okta on Bugcrowd).
Facts:
- Auth0: manage.cic-bug-bounty.auth0app.com only; Get Credentials → 3 users/3 tenants; ≤5 rps; cross-tenant focus
- Okta: Get Credentials dual OIE preview orgs (e.g. bugcrowd-pam-###.oktapreview.com); enforce MFA; no automated scanners; no Workflows automation/DoS
- Creds: store only via 1Password op:// refs, never files

Stdout markdown: sequence (Auth0 then Okta), vault_steps (labels only), gates, forbidden.
