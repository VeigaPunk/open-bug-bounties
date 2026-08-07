# Atlassian B3 + OpenAI B4 (r2)

## Atlassian
- Create Cloud site named bugbounty-test-* per program brief
- Own site only for authz/IDOR classes
- Prefer FULL fidelity scope notes in parent scopes/atlassian.md

## OpenAI — security-impact only
- STOP: model/jailbreak/prompt-injection as primary finding OOS
- STOP: sandbox-as-RCE without outside-sandbox indicators
- In-scope: security impact on product/auth/billing/API access control
- Joined via Canary; read STOP sections before any test
