# Open Bug Bounties

[![Refresh and deploy GitHub Pages](https://github.com/VeigaPunk/open-bug-bounties/actions/workflows/pages.yml/badge.svg)](https://github.com/VeigaPunk/open-bug-bounties/actions/workflows/pages.yml)

A public, source-linked index of open paid bug bounty programs:

<https://veigapunk.github.io/open-bug-bounties/>

## Refresh policy

GitHub Actions runs every 12 hours and on demand. It:

- evaluates every configured source group on every run;
- structurally parses every public HackerOne and Sherlock directory page exposed through explicit pagination;
- rechecks every board-eligible first-party policy URL with fail-closed robots, redirect, DNS, rate, and response limits;
- retains the last-good inventory through transient, access, parser, or completeness failures;
- leaves Bugcrowd, Intigriti, YesWeHack, HackenProof, Immunefi, and Cantina as dated, clearly labeled snapshots until reuse or crawl permission is recorded;
- writes `data/refresh_evidence.json` last, binding all three datasets to one run ID, hashes, counts, source outcomes, dedupe totals, and freshness;
- validates the generated data and static export before committing a scheduled refresh; only the resulting pushed commit is built and deployed.

The index stores only minimal factual records: program name, source, surface, reward summary where independently verified, and a link to the official policy. It does not reproduce scopes, policy text, logos, or platform descriptions.

## OMP bounty fleet

The project-portable cards in `.omp/agents/` define one top-level entry profile,
`THE-BOUNTY-HUNTER`, and exactly one mutation-selected L2 helper,
`SCOPE-EVIDENCE-CUSTODIAN`. The entry profile runs WWKD planning, parallel UFO
proposal lanes, one-L1 Pareto judgment, positive-adjusted-EV ranking, evidence
preservation, and submission preparation. It treats all remote content as
untrusted and stops on ambiguous scope or credentials, destructive impact,
prohibited data, concealment, or any external action without exact written
authorization. Repository and public-metadata maintenance never authorizes
target testing.

## Local development

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev
```

Run the same checks used by CI:

```bash
npm run refresh
npm run verify:data
NEXT_PUBLIC_BASE_PATH=/open-bug-bounties npm test
```

Always verify the current scope and rules on the linked official page before testing.
