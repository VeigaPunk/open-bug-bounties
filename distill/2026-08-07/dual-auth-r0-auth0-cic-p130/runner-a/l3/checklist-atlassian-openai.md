## Axes

- Scope and authorization
- Identity and access control
- Security impact
- Evidence quality
- Safety and prohibited actions

## Atlassian BC

**gates**

- Target site is exactly `bugbounty-test-<bc-username>.atlassian.net`.
- Researcher identity is `@bugcrowdninja`.
- Use two authorized test users for dual-user authorization/IDOR validation.
- Recon-only activity; obtain explicit authorization before any state-changing test.
- No scanners, fuzzers, brute force, or automated enumeration.

**human_steps**

- Confirm the site hostname and both test-user accounts manually.
- Record intended roles, tenant boundaries, and object ownership for each user.
- Review visible routes, identifiers, sharing controls, and permission checks.
- Compare user A versus user B access manually using benign, read-only requests.
- Stop and report if an action could alter data, affect another tenant, or exceed scope.

**first_classes**

- Broken object-level authorization (IDOR/BOLA).
- Cross-user read access to objects owned by the other test user.
- Missing role or tenant boundary enforcement.
- Authorization inconsistencies across equivalent UI/API paths.
- Information disclosure through identifiers, metadata, or error responses.

**forbidden**

- Any host other than the exact required bug-bounty site.
- Testing real customer data, other tenants, or unapproved accounts.
- Scanners, crawling at scale, fuzzing, brute force, DoS, or destructive actions.
- Modifying, deleting, exporting, or exfiltrating data.
- Social engineering, phishing, malware, or credential attacks.

## OpenAI BC

**gates**

- Re-read the current OpenAI Bugcrowd brief before testing; TAC may expand the permitted surface.
- Submit only findings with clear, demonstrable security impact.
- Keep testing within explicitly authorized assets and methods.
- Recon-only unless the brief explicitly authorizes a benign validation step.
- Do not submit `sk-` keys through Bugcrowd.

**human_steps**

- Identify the exact in-scope asset and applicable brief version.
- Map the suspected issue to confidentiality, integrity, availability, or account-impact consequences.
- Validate minimally with synthetic data and reversible, read-only checks.
- Capture timestamps, affected asset, steps, and redacted evidence.
- Re-check TAC and reporting requirements immediately before submission.

**first_classes**

- Authentication or authorization failures with concrete security impact.
- Cross-account or cross-tenant data exposure.
- Sensitive information disclosure caused by access-control defects.
- Integrity-impacting actions available to an unauthorized principal.
- Security-relevant isolation or boundary failures explicitly covered by the brief.

**forbidden**

- Jailbreaks, prompt-injection attempts, or model-safety testing.
- Findings based solely on harmful content, policy behavior, or output quality.
- Testing assets outside the brief or TAC-expanded scope.
- Scanners, mass enumeration, brute force, DoS, persistence, or destructive actions.
- Uploading, exposing, or transmitting `sk-` keys via Bugcrowd.
- Real-user data access, exfiltration, social engineering, or credential theft.
