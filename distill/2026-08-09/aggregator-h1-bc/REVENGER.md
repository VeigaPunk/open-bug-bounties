# REVENGER — open-bug-bounties H1/BC observe→map→reproduce

**Role:** gx-revenger-aggregator  
**Date:** 2026-08-09  
**Axes:** thrash↓ · evidence_fidelity↑ · gold_ev↑ · ship_hygiene↑  
**Reproduce =** jq/node join recipes against frozen JSON — **not** reimplement H1/BC sites.

---

## 0. RECON surface (kimi-k3 + local probe)

| Path | Role |
|------|------|
| `~/Projects/open-bug-bounties/data/` | Catalog seeds + normalize layer |
| `scripts/refresh-data.mjs` | 12h hygiene — reachability, **not** list re-scrape |
| `~/.xbgst/bounty-distill/2026-08-09/aggregator-h1-bc/` | This session distill (slice, keep8-join, PLAN) |
| `~/.xbgst/hydra-bounty/tracker/EV-QUEUE.md` | Gold rank SSoT (keep-8, OVERFIT=Aiven) |

**Total catalog:** 1101 = platform 768 + independent 60 + web3 273.

---

## 1. OBSERVE — H1 vs BC surface

### 1.1 Inventory (platform_programs.json)

| Metric | Value |
|--------|------:|
| snapshot_at_utc | 2026-08-06T00:44:32Z |
| last_permitted_check_at_utc | 2026-08-08T13:15:46Z |
| HackerOne | **224** |
| Bugcrowd | **241** |
| H1+BC | **465** |
| HackenProof / Intigriti / YesWeHack | 159 / 82 / 62 |

### 1.2 source_checks (behavior, not docs)

```
FINDING: H1 is the only platform directory with live recheck metadata
SOURCE: data/platform_programs.json → source_checks
CONFIDENCE: high
IMPLICATION: BC list is frozen snapshot; do not treat BC status as inventory freshness

HackerOne:
  status: reachable_last_good_inventory_retained
  etag / last_modified present
  included: 224, consecutive_misses: 0

Bugcrowd:
  status: snapshot_reuse_permission_pending
  (no etag, no checked_at, no included count refresh)
```

### 1.3 Row schema (H1 and BC identical keys)

Union keys on H1+BC rows:

`id | platform | name | url | directory_url | industry`

| Field fill | H1 | BC |
|------------|----|----|
| industry | **0**/224 | **221**/241 |
| min/max reward | **0** | **0** |

IDs:

- H1: `hackerone:<handle>` → `https://hackerone.com/<handle>`
- BC: `bugcrowd:<slug>` → `https://bugcrowd.com/engagements/<slug>`

### 1.4 What is NOT in schema (rewards missing)

```
FINDING: Platform seed never carries rewards; Program type allows optional min/max but platform map omits them
SOURCE: data/programs.ts platformPrograms map (url/evidenceUrl only); platform_programs.json keys
CONFIDENCE: high
IMPLICATION: Cannot gold-rank or payout-sort from aggregator JSON. ROI/EV-QUEUE payout_proxy is external evidence.
```

Rewards **do** exist for:

- Some **independent** seeds (`reward.{min,max,currency,text}`)
- Hand **manual** first-party / curated rows in `programs.ts` (Google max, Apple, MSRC bands, Immunefi maxes, etc.)
- **Not** for the 768 platform seed rows (including all H1/BC)

Manual `bc-*` pin list (8 rows: openai, keeper, glean, stiltsoft, mastercard, tyler, rapyd, newrelic):

- All **in-seed** by URL
- Carry `currency: "USD"` only — **still no minReward/maxReward**
- `sourceKind: "Platform"` → **excluded** from dedupe merge (`manual.filter(First-party)` only)

```
FINDING: keep-8 EV queue ≠ programs.ts bc-* manual eight
SOURCE: EV-QUEUE.md vs data/programs.ts id: "bc-"
CONFIDENCE: high
IMPLICATION: Do not join EV keep-8 via bc-* pins; join by name/id regex on platform seed + independent
```

---

## 2. MAP — refresh path

`scripts/refresh-data.mjs`:

1. Load independent + platform + web3 JSON.
2. **Independent:** policy URL checks (robots-aware, concurrency 6) — status/reachable only; **never auto-removes** listings.
3. **Platform directory check:** `checkDirectory` with If-None-Match / If-Modified-Since.
   - **Only HackerOne** directory URL is checked for platform.
   - Body cancelled after headers — **does not parse program list**.
   - On 304 → `unchanged`; on OK → retain last-good inventory + update etag.
4. **Web3:** Sherlock directory same pattern.
5. Write JSON back; stamp `last_permitted_check_at_utc` when H1 check succeeds.

**Not in refresh path:**

- BC / Intigriti / YWH / HackenProof list re-ingest (permission pending)
- Per-program page walk
- Reward scrape
- keep-8 membership changes

Normalize pipeline (`programs.ts`):

```
platformPrograms + web3Programs + independent(filtered) + manual(First-party only)
  → Map key = lower(url) strip query/hash trailing /
  → First-party wins on collision
  → sort by name
```

---

## 3. MAP — keep-8 join without page walk

**SSoT membership:** `~/.xbgst/bounty-distill/2026-08-07/ROI.md`  
**SSoT rank/gates:** `~/.xbgst/hydra-bounty/tracker/EV-QUEUE.md`

| Rank (open-state order) | Program | Lane | Catalog match (no walk) |
|-------------------------|---------|------|-------------------------|
| 1 OVERFIT | Aiven | H1 stack / BC eng | `bugcrowd:aiven-mbb-og` |
| 2 | Auth0 CIC | wrap | `bugcrowd:auth0-okta` (+ indep okta-auth0 name) |
| 3 | Google VRP Drive | grok | **independent / manual FP only** — no H1/BC seed row |
| 4 | Atlassian Cloud | refill | `bugcrowd:atlassian` (+ apps/balsamiq noise) |
| 5 | Proton | refill | **independent FP** — not in H1/BC slice |
| 6 | MSRC | refill | **independent FP** |
| 7 | Shopify H1 | refill | `hackerone:shopify` |
| 8 | GitLab \| Dropbox | refill | `hackerone:gitlab` · Dropbox on **Intigriti** seed (outside H1+BC) |

Policy already frozen: **MAP ≠ COMPLETE**, all `gate_factor=0`, alphabet walk of ~1100 **killed**.

---

## 4. REPRODUCE — jq / node recipes (not site reimpl)

### 4.1 Inventory + H1/BC slice

```bash
ROOT=~/Projects/open-bug-bounties/data
jq '{
  snapshot: .snapshot_at_utc,
  last_check: .last_permitted_check_at_utc,
  source_checks: .source_checks,
  n: (.programs|length),
  by_platform: ([.programs[].platform]|group_by(.)|map({platform:.[0], n:length}))
}' "$ROOT/platform_programs.json"

# H1+BC only + schema proof
jq '{
  n: length,
  h1: map(select(.platform=="HackerOne"))|length,
  bc: map(select(.platform=="Bugcrowd"))|length,
  fields: (map(keys)|add|unique),
  industry_fill: map(select(.industry!=null and .industry!=""))|length,
  reward_keys: map(keys[]) | unique | map(select(test("reward|payout|min|max";"i")))
}' <(jq '[.programs[]|select(.platform=="HackerOne" or .platform=="Bugcrowd")]' "$ROOT/platform_programs.json")
```

Expected: `n=465`, fields ⊆ `{id,platform,name,url,directory_url,industry}`, `reward_keys=[]`.

### 4.2 keep-8 name join (URL hygiene only)

```bash
# patterns mirror keep8-join.md / EV-QUEUE names
jq -r --argjson pats '[
  {"k":"Aiven","re":"aiven"},
  {"k":"Auth0","re":"auth0"},
  {"k":"Atlassian","re":"atlassian"},
  {"k":"Google","re":"google"},
  {"k":"Proton","re":"proton"},
  {"k":"MSRC","re":"microsoft|msrc"},
  {"k":"Shopify","re":"shopify"},
  {"k":"GitLab|Dropbox","re":"gitlab|dropbox"}
]' '
  .programs
  | map(select(.platform=="HackerOne" or .platform=="Bugcrowd"))
  | . as $rows
  | $pats[]
  | . as $p
  | ($rows | map(select(
      (.name|test($p.re;"i")) or (.id|test($p.re;"i")) or (.url|test($p.re;"i"))
    )) | map("\(.id)\t\(.platform)\t\(.url)") )
  | "\($p.k)\t" + (if length==0 then "NONE" else join(" | ") end)
' "$ROOT/platform_programs.json"
```

Optional independent join for Google/Proton/MSRC:

```bash
jq -r '
  .programs[]
  | select((.name|test("google|proton|microsoft|msrc";"i")) or (.id|test("google|proton|microsoft|msrc";"i")))
  | [.id, .name, .official_url // .url // empty] | @tsv
' "$ROOT/independent_programs.json"
```

### 4.3 Dedupe key parity with programs.ts

```bash
# normalize URL key as programs.ts does
node -e '
const norm = u => u.toLocaleLowerCase().replace(/[?#].*$/,"").replace(/\/$/,"");
const d = require(process.env.HOME+"/Projects/open-bug-bounties/data/platform_programs.json");
const keys = new Map();
for (const p of d.programs) {
  const k = norm(p.url);
  if (keys.has(k)) console.log("dup", k, keys.get(k), p.id);
  else keys.set(k, p.id);
}
console.log("unique urls", keys.size, "rows", d.programs.length);
'
```

### 4.4 What **not** to reproduce

- Directory HTML parse / GraphQL / H1 API — refresh only HEAD-ish reachability.
- BC engagement page spider for max bounty.
- Re-rank EV from empty reward fields.
- Treat `bc-*` manual currency pins as EV keep-8.

---

## 5. Intent reconstruction (MODEL lite)

| Designer intent | Evidence |
|-----------------|----------|
| Catalog is a **public index of URLs**, not a payout database | No reward keys on platform seed; UI type optional |
| Legal freeze on bulk re-scrape for BC/YWH/… | `snapshot_reuse_permission_pending` |
| H1 directory recheck is **cache validation**, not re-ingest | etag/304 path; body cancelled |
| Gold hunting is **out of band** (ROI + EV-QUEUE + human gates) | PLAN.md kill: alphabet walk; gate_factor binary |
| keep-8 is a **curated EV shortlist**, not a filter of catalog size | 8 names join to ≤ handful of URLs; Google/Proton/MSRC FP |

---

## 6. Findings log

```
FINDING: H1+BC = 465 of 1101; schema has zero reward fields
SOURCE: platform_programs.json + h1-bc-slice.json
CONFIDENCE: high
IMPLICATION: Filter+join only; never page-walk for rank

FINDING: Refresh touches H1 (and Sherlock) directory headers only; BC inventory frozen 2026-08-06
SOURCE: scripts/refresh-data.mjs checkDirectory + source_checks.Bugcrowd
CONFIDENCE: high
IMPLICATION: last_permitted_check_at is H1 hygiene stamp, not BC freshness

FINDING: keep-8 joins by name/id regex against seed; Google/Proton/MSRC miss H1+BC
SOURCE: keep8-join.md + node probe
CONFIDENCE: high
IMPLICATION: Full keep-8 coverage needs independent_programs.json + programs.ts manual FP

FINDING: programs.ts bc-* eight are currency pins, not EV keep-8, and do not enter dedupe
SOURCE: programs.ts manual filter sourceKind==="First-party"
CONFIDENCE: high
IMPLICATION: Naming collision risk — document "EV keep-8" vs "bc-pin-8"

FINDING: EV-QUEUE all gate_factor=0; OVERFIT=Aiven; catalog check cannot flip gold_ev
SOURCE: tracker/EV-QUEUE.md
CONFIDENCE: high
IMPLICATION: Revenger stop condition = join hygiene artifact; gold waits on human doors
```

---

## 7. Stop / handoff

- **Done:** surface map, schema truth, refresh path, keep-8 join recipe, distill REVENGER.md  
- **Not done / out of role:** site reimpl, CAPTCHA, re-scrape, re-rank keep-8  
- **Next cheap moves (others):** gate pulse titles-only Aiven; independent reward extract for FP keep-8 only; ship distill if critic green  

**APPROVED for observe-map-reproduce notes** (no secret material; recipes only).
