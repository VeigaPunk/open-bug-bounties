| target | why | creds needed? | first probe class (passive\|authz\|protocol) |
|---|---|---:|---|
| `manage.cic-bug-bounty.auth0app.com` | Tenant management surface; review exposed metadata and role boundaries | Yes (test account) | authz |
| `config.cic-bug-bounty.auth0app.com` | Configuration and deployment controls; identify unintended tenant exposure | Yes (test account) | authz |
| `*.cic-bug-bounty.auth0app.com` | Tier-1 wildcard for approved CIC subdomains and app surfaces | Usually (per app) | passive |
| `marketplace.auth0.com` | Marketplace integrations, listing flows, and package trust boundaries | No for public surface; yes for submissions | protocol |
| FGA dashboard / API / customers / Play US1 | Fine-grained authorization and tenant-isolation paths across control plane and hosted region | Yes (scoped test tenants) | authz |
| Guardian Android / iOS | Mobile enrollment, recovery, token, and deep-link handling | Yes (test device/account) | protocol |

