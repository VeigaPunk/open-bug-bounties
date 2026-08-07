# Identity-day B2 — Auth0 then Okta (r2)

Order: Auth0 Get Credentials → vault → CIC work; then Okta pam-5335 Set5.

## Auth0
- Stay on manage.cic-bug-bounty.auth0app.com (or program-issued tenant)
- Redeem Get Credentials into 1Password only
- ≤5 rps; no brute force; own tenants only

## Okta Set5
- Host: bugcrowd-pam-5335.oktapreview.com
- op://Personal/Bugcrowd Org (Set 5) Okta/username|password
- Interactive browser + MFA; map UserHome tiles (names only)
- Admin: bugcrowd-pam-5335-admin.oktapreview.com

No secret expansion. No production Okta customers.
