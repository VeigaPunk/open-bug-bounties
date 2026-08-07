# Dropbox + Shopify path refresh (passive GET only)

UTC: 2026-08-07T15:32:48Z
Context: F4 XOR deep + H1 Shopify; re-verify OAuth/API/admin shells.

| URL | code0 | follow→ | notes |
|-----|-------|---------|-------|
| `https://www.dropbox.com/` | 200 | 200 | - |
| `https://www.dropbox.com/developers` | 200 | 200 | - |
| `https://www.dropbox.com/developers/documentation` | 200 | 200 | - |
| `https://www.dropbox.com/oauth2/authorize` | 302 | 200 | https://www.dropbox.com/oauth2/authorize_error?error_detail=Missing+client_id.&error_name=missing_client_id |
| `https://www.dropbox.com/login` | 200 | 200 | - |
| `https://api.dropboxapi.com/` | 404 | 404 | - |
| `https://api.dropboxapi.com/2/users/get_current_account` | 400 | 400 | - |
| `https://api.dropbox.com/` | 404 | 404 | - |
| `https://content.dropboxapi.com/` | 404 | 404 | - |
| `https://app.intigriti.com/programs/dropbox/dropbox/detail` | 200 | 200 | - |
| `https://admin.shopify.com/` | 403 | 403 | - |
| `https://accounts.shopify.com/` | 403 | 200 | - |
| `https://partners.shopify.com/` | 301 | 200 | https://www.shopify.com/br/parcerias |
| `https://partners.shopify.com/signup` | 302 | 403 | https://accounts.shopify.com/signup?rid=496265f5-a32e-4eba-842a-3daa02dd8557 |
| `https://partners.shopify.com/organizations` | 302 | 403 | https://accounts.shopify.com/lookup?rid=30f1c7fe-35f2-4c02-96e3-a0a29b661467&verify=1786116794-LCOTY9DeJnB3Hnol%2Bx3… |
| `https://www.shopify.com/bugbounty` | 200 | 200 | https://www.shopify.com/br/bugbounty |
| `https://www.shopify.com/bugbounty/criteria` | 200 | 200 | - |
| `https://hackerone.com/shopify` | 200 | 200 | - |
| `https://checkout.shopify.com/` | 404 | 404 | - |

## Notes
- Dropbox API bare often 404; get_current_account 400 without auth.
- Shopify admin/accounts often 403 curl; browser required.
- No credentials, no store create, no spray.
