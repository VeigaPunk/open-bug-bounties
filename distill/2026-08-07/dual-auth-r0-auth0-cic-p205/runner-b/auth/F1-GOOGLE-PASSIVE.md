# F1 Google VRP — passive portal HTTP map (Runner B)

**UTC:** 2026-08-07T14:31:36Z  
**Policy recon only** — dual own Google accounts later; no appspot/customer; no exploit.

## Live status (all 200 this tick)

| URL | Code | Role |
|-----|------|------|
| bughunters.google.com | 200 | Submit / Bug Hunters hub |
| bughunters.google.com/about/rules | 200 | Rules index |
| .../google-and-alphabet-vulnerability-reward-program-vrp-rules | 200 | VRP rules SSoT |
| bughunters.google.com/learn | 200 | Learn |
| issuetracker.google.com | 200 | Tracker shell |
| accounts.google.com | 200 | Identity |
| drive.google.com | 200 | Drive shell (own-data class later) |
| docs.google.com | 200 | Docs shell |
| google.com/about/appsecurity | 200 | App security hub |
| google.com/about/appsecurity/reward-program | 200 | Reward program page |

## Auth-ready implications

1. Fidelity **FULL** on public rules; pick one product for first 2h (Drive/Docs share ACL preferred).
2. Hard OOS: `*.appspot.com` / customer GCP apps; sandbox XSS without sensitive impact.
3. Dual own accounts required before IDOR class — human.
4. Detail: `findings/F1-google-authz-map.md` · `findings/F1-FIRST-TARGET.md`.

## Axes

- evidence_fidelity↑ (full 200 portal set)
- auth_ready↑ (rules + product shells live)
- safety_in_policy↑ (passive)
