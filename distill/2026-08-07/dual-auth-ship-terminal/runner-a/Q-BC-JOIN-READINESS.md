# Q-BC join / auth readiness matrix

| Slot | Program | BC join | Instance/creds | First safe class |
|------|---------|---------|----------------|------------------|
| B1 | Aiven aiven-mbb-og | joined (parent ENROLL) | free tier + @bugcrowdninja pending | dual-account project authz own only |
| B2 | Auth0 + Okta identity-day | joined both | Get Credentials → vault only; Set5 op item present | CIC tenant stay; pam-5335 preview only |
| B3 | Atlassian | joined | bugbounty-test-* site pending | Cloud site authz own |
| B4 | OpenAI | joined | platform authed | security-impact only; model/jailbreak OOS |

Platform Bugcrowd: vault item `Bugcrowd` present; login URL on item historically login.hackers.bugcrowd.com.
