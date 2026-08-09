# DAWN-ROLLUP — overnight-gold-farm

**Fill at local dawn. Do not invent COMPLETE.**

| Field | Value |
|-------|-------|
| session | overnight-gold-farm |
| rollup_utc | _TBD_ |
| substrate | hydra whip sekhmet |
| OVERFIT | Aiven |
| COMPLETE count (start) | 0 |
| COMPLETE count (dawn) | _TBD_ |
| success definition | overnight-idle-green |
| overnight-idle-green? | _yes / no / partial_ |

## Substrate health

| Check | Dawn state | Evidence path / note |
|-------|------------|----------------------|
| tmux hydra up | | |
| whip loop (WHIP.log tail) | | |
| pruner loop | | |
| sekhmet/luna fertile | | |
| hydra-refill soft-gate | armed (COMPLETE-GATE + evidence) | scripts/hydra-refill.sh |
| secret gate clean | | |

## Lanes at dawn

| Lane | Program | State | COMPLETE? | Evidence non-empty? | Human door |
|------|---------|-------|-----------|---------------------|------------|
| stack | aiven | MAPPED (prefill) | no | no | dual ninja free-tier |
| wrap | auth0 | MAPPED cred pending | no | no | BC Get Credentials |
| grok | google-vrp | MAPPED | no | no | dual Google |

## COMPLETE events overnight

_None expected unless a human door opened and FIRST-5 produced evidence._

| UTC | Lane | Evidence paths | COMPLETE-GATE signer | Refill fired? |
|-----|------|----------------|----------------------|---------------|
| | | | | |

## Human doors pulse (dawn)

| Door | Opened overnight? | Action taken |
|------|-------------------|--------------|
| Aiven dual | | |
| Auth0 assign | | |
| Google dual | | |

## Ships / commits

| UTC | Label | Repo/path | Notes |
|-----|-------|-----------|-------|
| | | | |

## Refill readiness

- COMPLETE-GATE.md: present (template) / GREEN?
- Soft-gate refuse log lines: count _
- New teams spawned: _

## Verdict

- [ ] overnight-idle-green
- [ ] door opened + FIRST-5 started (name lane)
- [ ] thrash / fake COMPLETE (incident — detail below)

### Incident / notes

_Prefilled night state 2026-08-09T01:06:00Z: COMPLETE=0, OVERFIT=Aiven, doors closed/partial, refill soft-gated._
