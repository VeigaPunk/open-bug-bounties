# MSRC + Entra identity passive doors (PULSE-57)

UTC: 2026-08-07T16:14:29Z
Policy: recon only — no auth, no exploit, no token harvest.

## Passive GET (max-redirs 0)

| URL | status | location | set-cookie | notes |
|-----|--------|----------|------------|-------|
| `https://portal.msrc.microsoft.com` | 302 | https://msrc.microsoft.com/update-guide | 0 |  |
| `https://portal.msrc.microsoft.com/en-us` | 302 | https://msrc.microsoft.com/update-guide | 0 |  |
| `https://portal.msrc.microsoft.com/en-us/researcher` | 302 | https://msrc.microsoft.com/en-us/researcher | 0 |  |
| `https://portal.msrc.microsoft.com/en-us/report` | 302 | https://msrc.microsoft.com/en-us/report | 0 |  |
| `https://www.microsoft.com/en-us/msrc/bounty` | 200 | - | 2 | cookies=2 |
| `https://www.microsoft.com/en-us/msrc/bounty-online-services` | 200 | - | 2 | cookies=2 |
| `https://api.msrc.microsoft.com` | 404 | - | 0 |  |
| `https://api.msrc.microsoft.com/cvrf/v3.0/updates` | 200 | - | 0 |  |
| `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration` | 200 | - | 4 | cookies=4 |
| `https://login.microsoftonline.com/common/oauth2/v2.0/authorize` | 200 | - | 4 | cookies=4 |
| `https://graph.microsoft.com/v1.0/me` | 401 | - | 0 |  |
| `https://graph.microsoft.com/v1.0/\$metadata` | 200 | - | 0 |  |
| `https://portal.azure.com` | 200 | - | 0 |  |
| `https://entra.microsoft.com` | 200 | - | 0 |  |
| `https://myaccount.microsoft.com` | 200 | - | 2 | cookies=2 |
| `https://admin.microsoft.com` | 200 | - | 6 | cookies=6 |
| `https://account.microsoft.com` | 302 | https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?scope=https:%2F%2Faccount.mic | 4 | cookies=4 |
| `https://www.openbugbounty.org` | 403 | - | 0 |  |

## Notes

- MSRC portal researcher path often 404; use portal root/report + bounty pages.
- Graph /me 401 unauth; OIDC discovery public.
- No credentials; MSA/AAD human only.

## Delta vs prior
- portal.msrc researcher no longer hard-404: **302 → msrc.microsoft.com/en-us/researcher**.
- portal root/en-us both **→ update-guide** on msrc host.
- openbugbounty.org **403** to curl this tick.
