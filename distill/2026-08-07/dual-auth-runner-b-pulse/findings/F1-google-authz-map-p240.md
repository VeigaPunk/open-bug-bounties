# F1 Google VRP authz readiness (P240)

**Scope tag:** FULL (public rules overview)  
**Source:** TinyFish fetch `https://bughunters.google.com/about/rules` + search; sekhmet `sp-rb-p240-f1-google` status=ok (rate_limit note; host fidelity pack).  
**Policy:** passive recon only; own accounts only.

## Program families (authz-relevant doors)

| Family | Report lane | Authz / multi-user note |
|---|---|---|
| Google & Alphabet VRP | standard form → Google VRP | web services handling sensitive user data — dual-own-account IDOR/ACL language |
| Cloud VRP | Cloud VRP | GCP product/web services — own project tenants only |
| AI VRP | AI VRP | AI products handling sensitive data |
| Abuse VRP | Abuse VRP | abuse enabling issues on sensitive services |
| Mobile / Android & Devices | Mobile / Android VRPs | first-party apps / devices |
| Chrome / ChromeOS / Extensions | respective trackers | browser/OS surface |
| OSS VRP | OSS VRP | public Google GitHub orgs |

## Auth doors (research posture)

1. Dual Google accounts (A/B) under researcher control — no third-party data.
2. **First product door:** Drive share ACL — create doc as A, share limited to B, probe unintended principals only on own objects.
3. OAuth consent / third-party app access limited to own test apps.
4. Report routing: when uncertain → Google and Alphabet VRP form.

## Out-of-scope / caution

- Tsunami / InternetCTF Tsunami / OSV-SCALIBR patch reward lanes on hold (as of 2026-04 / 2026-07 public notes) — do not burn time.
- No live exploit payloads in distill; no automated mass scanning language.

## Next human steps

1. Confirm two free Google accounts ready.
2. Drive ACL dual-account passive map only on own files.
3. Track bughunters rules updates for reward/scope diffs.
