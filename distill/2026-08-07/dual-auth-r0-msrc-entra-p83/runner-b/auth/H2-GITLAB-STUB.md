# H2 GitLab — STUB / park (Runner B XOR)

**UTC:** 2026-08-07T14:38:38Z  
**Policy:** hard slot-8 XOR → **F4 Dropbox DEEP** / **H2 GitLab PARK** (no deep hunt this race).  
**Policy recon only** — no login, no report, no exploit.

## Live status this tick

| URL | Code | Role |
|-----|------|------|
| https://hackerone.com/gitlab | 200 | Program SPA shell (public) |
| https://hackerone.com/gitlab?type=team | 200 | Team program view shell |
| https://hackerone.com/gitlab/policy_scopes | 200 | Policy scopes route (SPA) |
| https://api.hackerone.com/v1/hackers/programs/gitlab | **401** | Hacker API needs H1 session |
| https://bugcrowd.com/engagements/gitlab | **404** | Not on BC as engagement slug |
| https://about.gitlab.com/security/ | 200 | Corporate security hub |
| https://about.gitlab.com/security/disclosure/ | 200 | Disclosure process |
| https://docs.gitlab.com/ee/security/ | 200 | Product security docs |
| https://about.gitlab.com/handbook/security/ | 200 | Handbook security (public) |
| https://gitlab.com/gitlab-com/gl-security/security-department-meta | **403** | Project not public unauth |

## Auth-ready implications

1. **Park only** — do not allocate deep time while F4 Dropbox is the XOR deep slot.
2. Public H1 shell is enough to re-confirm program still lives; asset inventory needs **H1 logged-in** (same class as Shopify PARTIAL).
3. No BC engagement for GitLab under slug `gitlab` — H1 is SSoT for bounty.
4. Corporate disclosure URL is non-bounty path; bounty submissions stay on H1 policy.

## Related

- XOR claim in `shared/CLAIMS.md`
- F4 deep: `F4-DROPBOX-HTTP.md` / `F4-DROPBOX-PASSIVE.md`
- H1 Shopify parallel: `H1-SHOPIFY-PASSIVE.md`

## Axes

- auth_ready_b↑ (explicit park + 401 API boundary)
- evidence_fidelity↑ (404 BC slug, 403 meta project)
- safety_in_policy↑ (stub; no deep recon)
