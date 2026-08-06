# Open Bug Bounties

A public, source-linked index of open paid bug bounty programs:

<https://veigapunk.github.io/open-bug-bounties/>

## Refresh policy

GitHub Actions runs every 12 hours and on demand. It:

- rechecks eligible first-party policy URLs while respecting `robots.txt`;
- rechecks the permitted HackerOne and Sherlock directory pages;
- retains the last-good inventory through transient failures;
- leaves Bugcrowd, Intigriti, YesWeHack, HackenProof, Immunefi, and Cantina as clearly labeled snapshots until reuse or crawl permission is available;
- rebuilds and republishes the static site after every refresh.

The index stores only minimal factual records: program name, source, surface, reward summary where independently verified, and a link to the official policy. It does not reproduce scopes, policy text, logos, or platform descriptions.

## Local development

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev
```

Run the same checks used by CI:

```bash
npm run refresh
NEXT_PUBLIC_BASE_PATH=/open-bug-bounties npm test
```

Always verify the current scope and rules on the linked official page before testing.
