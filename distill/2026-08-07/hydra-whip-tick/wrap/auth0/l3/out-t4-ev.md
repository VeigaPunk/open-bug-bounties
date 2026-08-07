| Rank | Test | EV | Effort | Dupe risk | Evidence needed |
|---:|---|:---:|---|---|---|
| 1 | Cross-tenant isolation | H | M | M | Reproducible cross-tenant read/write, tenant IDs, affected roles, clean-control comparison |
| 2 | OAuth client misbinding | H | M | H | Authorization traces proving attacker-controlled client/redirect binding to another tenant or user |
| 3 | Tenant-member privilege escalation | H | M–H | M–H | Before/after role matrix, minimal privilege delta, durable unauthorized action |
| 4 | Enterprise connection/SAML own IdP | H | H | L–M | IdP configuration, signed assertion flow, account/tenant takeover impact, exact trust-boundary failure |
| 5 | FGA store isolation | M–H | H | L | Store/object/tuple identifiers, unauthorized decision or mutation, isolation invariant and controls |

Start with cross-tenant isolation, then OAuth misbinding: broad impact with relatively cheap confirmation.  
Run privilege-escalation checks next if role boundaries are exposed; preserve exact before/after authorization evidence.  
Pursue SAML and FGA only with strong tenant-specific signals, since setup cost is higher but duplication is lower.

