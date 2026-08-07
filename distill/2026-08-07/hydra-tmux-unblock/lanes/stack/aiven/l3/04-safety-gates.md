# L3 — FAIL-CLOSED safety gates (Aiven stack lane)

- [ ] Live brief URL is `aiven-mbb-og` (not bare `/aiven`)
- [ ] BC Join accepted this wave
- [ ] All tester emails end with `@bugcrowdninja.com`
- [ ] Free tier / trial only — **no credit card**
- [ ] Only `*.aivencloud.com` services **we** created
- [ ] No scanners, fuzz-at-scale, or DoS
- [ ] No social engineering
- [ ] Credential find → report, do not expand
- [ ] Foreign token replay working ≠ bug (program rule)
- [ ] Cookie-only “session” reports without header context = weak/N/A
- [ ] If free-tier signup blocked → stop probes; document BLOCKED in REPORT/tracker
- [ ] Secrets only via `op://` — never commit tokens
- [ ] Ship path scrubbed with secret rg gate before milestone-ship
