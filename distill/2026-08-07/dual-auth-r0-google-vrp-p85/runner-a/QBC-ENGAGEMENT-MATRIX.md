# Q-BC engagement bare vs /h matrix (passive GET only)

UTC: 2026-08-07T15:26:49Z
Context: consolidate aiven/auth0/okta/atlassian/openai slug health for SSoT.

| slug | bare /engagements | bare /brief | /h/engagements | /h/brief | SSoT |
|------|-------------------|-------------|----------------|----------|------|
| aiven | 404 | 301 | 200 | 200 | /h/engagements/aiven |
| auth0 | 404 | 301 | 200 | 200 | /h/engagements/auth0 |
| okta | 200 | 301 | 200 | 200 | /engagements/okta or /h |
| auth0-okta | 200 | 301 | 200 | 200 | /engagements/auth0-okta or /h |
| okta-auth0 | 404 | 301 | 200 | 200 | /h/engagements/okta-auth0 |
| atlassian | 200 | 301 | 200 | 200 | /engagements/atlassian or /h |
| openai | 200 | 301 | 200 | 200 | /engagements/openai or /h |

## Notes
- Prefer any 200 path; bare 404 does not mean program missing if /h is 200.
- brief often 301→/h even when bare slug 200.
- No credentials, no join automation.

## PULSE-48 refresh
See `QBC-ENGAGEMENT-MATRIX-P48.md` for full bare-vs-/h table. Prefer `/h/engagements/{slug}` always.
