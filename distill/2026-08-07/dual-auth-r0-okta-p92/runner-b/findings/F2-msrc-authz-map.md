# F2 — Microsoft MSRC Online Services authz map

**FIDELITY: FULL** (`scopes/microsoft-msrc.md` + TinyFish M365 bounty page)  
**Mode:** policy recon · own tenants only · no live exploit  
**Hub:** https://www.microsoft.com/en-us/msrc/bounty  
**M365/Online Services:** https://www.microsoft.com/en-us/msrc/bounty-online-services  
**Submit:** https://msrc.microsoft.com/ · profile may be required on first report  
**Sekhmet:** sp-rb02-f2-msrc (luna) status=ok

## MSOBB tenant naming

Where possible include **`MSOBB`** in account/tenant names for researcher identification per program guidance.

## Web authz endpoints (examples from policy — verify live)

| Area | Hosts (subset) |
|---|---|
| Portals | portal.office.com, admin.microsoft.com, officeapps.live.com |
| Outlook | outlook.office365.com, outlook.office.com, outlook.live.com |
| Teams | teams.microsoft.com, teams.live.com |
| SharePoint/OneDrive | sharepoint.com, onedrive.live.com (**UGC XSS exclusions**) |
| Sec/Compliance | security.microsoft.com, compliance.microsoft.com |

WHOIS: Microsoft ownership required; third-party under MS labels OOS.

## Identity routing

Identity-class issues → **Microsoft Identity Bounty** (moved off M365 page). Azure portal → **Azure Bounty**. Do not mis-route.

## Multipliers (M365)

- Unauthorized **cross-tenant / cross-identity** sensitive data leakage **+20%**
- RCE injection/deserialization **+30%**
- Practical confused-deputy/SSRF bypassing auth **+15%**

## Own-tenant-only rule

Test **only tenants/accounts you own**. No customer data access/exfil. Stop and contact MSRC if sensitive data of others encountered. Critical/Important severity bar applies.

## OOS highlights

Known mitigated classes (Swagger-only, Akamai ARL, dependency confusion examples), info disclosure stack traces, low-impact CSRF logoff, DoS, subdomain takeover, cookie replay alone, URL redirect alone, user/tenant enum, missing headers alone.

## First 2h plan

1. Create free M365/dev tenant with MSOBB in name if eligible.
2. Second identity in same or second own tenant for cross-identity checks.
3. Pick one surface (e.g. OneDrive sharing or Teams resource IDs).
4. Policy re-read Online Services page same day; map in-scope hosts only.
5. No broad scanning; no DoS.

**Auth readiness:** MSRC **needs_profile_on_submit** (ACCOUNTS.md).
