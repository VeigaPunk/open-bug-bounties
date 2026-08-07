# OpenAI Bugcrowd — security-impact only (runner-a notes)

**Engagement:** https://bugcrowd.com/engagements/openai  
**Enroll:** joined (parent ENROLL.md). TAC verified at chatgpt.com/cyber (parent notes).

## Allowed (summary)
- Authn/authz, XSS/CSRF/SQLi, data exposure, payments, CF bypass to unprotected endpoints
- Private/pre-release model *access* security (not content safety)
- Codex sandbox **escape** under default policy; approval bypass
- Own plugin OAuth/SSRF/credential issues

## Critical OOS (do not submit)
- Jailbreaks / “say bad things” / hallucinated secrets
- Sandbox execution claimed as RCE without outside-sandbox indicators
- Model safety → openai.com/form/model-behavior-feedback
- sk-/sess- keys → special form only, never Bugcrowd

## Blockers
- Re-read live brief + TAC surface before first probe
- No reimbursement for Plus/API spend
