# SCOPE-NOTES — Google and Alphabet VRP (public rules)

**Fetched:** 2026-08-07 via TinyFish `fetch_content` + prior distill full extract  
**Canonical URL:** https://bughunters.google.com/about/rules/google-friends/google-and-alphabet-vulnerability-reward-program-vrp-rules  
**Submit:** https://bughunters.google.com/  
**Lane product:** Google Drive (authz/IDOR) · own accounts only  

## In scope (web — main VRP)

Any Google-owned or Alphabet (Bet) subsidiary web service handling reasonably sensitive user data, including content under:

- `*.google.com`
- `*.youtube.com`
- `*.blogger.com`
- `*.deepmind.com`
- `*.waymo.com`
- `*.wing.com`

Also: Google- and Waymo-developed apps in Apple App Store (main VRP language). Related programs (Cloud, Chrome, Android, AI, Abuse, OSS, Mobile, Verily H1) have **separate** rules.

## Qualifying vulnerability examples (official)

- Cross-site scripting  
- Cross-site request forgery  
- Mixed-content scripts  
- **Authentication or authorization flaws**  
- Server-side code execution  
- XSLeak  

Limited to technical vulns in Google-owned browser extensions, mobile, and web apps. No office intrusion, no phishing employees.

## Testing restrictions (availability / ethics)

- **No DoS**, black-hat SEO, spam, or similarly questionable techniques  
- Discourage vulnerability tools that generate **very significant volumes of traffic**  
- Report impact without attacking non-test users  

## Important exclusions

| Exclusion | Note |
|-----------|------|
| Third-party / vendor-operated Google-branded sites | Confirm WHOIS; ask first if unsure |
| Recent acquisitions | **Six-month blackout** |
| `*.bc.googleusercontent.com` / `*.appspot.com` | **GCP customer apps** — not VRP-authorized |
| Sandbox domain XSS (e.g. `*.googleusercontent.com`) | Non-qualifying unless sensitive user data impact |
| Owner JS on Blogger / `*.blogspot.com` | Not a bug |
| URL redirection alone | Typically non-reward |
| Legitimate content proxying/framing | e.g. Translate-class products |
| Exceedingly unlikely user interaction | Case-by-case |
| Logout CSRF | Typically non-qualifying |
| Outdated browsers only | Typically non-reward |
| Banner/version strings alone | Not a bug |
| Email spoofing Gmail/Groups | Known class |
| User enumeration | OOS unless **no** rate limits demonstrated |
| SMS account-verify quota bypass | Documented non-reward pattern |

## Information tiers (impact for Drive hunt)

| Tier | Relevance to Drive |
|------|-------------------|
| **IT0** | Credentials, ATO primitives, internal keys, Workspace admin ATO paths |
| **IT1** | **Drive document contents**, Keep notes, private messages, photos, payments-class data |
| **IT2** | Titles of few private docs, email/Gaia/name when not public, ownership metadata, coarse signals |

## Action criticality (state-change)

| Class | Drive-relevant examples (from rules) |
|-------|--------------------------------------|
| Critical (CA) | Password/email change ATO, security-critical priv-esc |
| **Impactful (IA)** | **Deleting Drive files**; **sharing a user’s documents** with others |
| Moderate (MA) | Limited-scope profile-like actions |

## Domain tiers (reward axis)

- **T0:** domains where critical vulns can lead to account compromise / code on user system; also “global impact”  
- **T1:** domains where vulns disclose particularly sensitive user data  
- **T2:** normal Google applications  
- **T3a/b:** acquisitions / sandboxed / lower priority (after blackout)  

Examples of high-tier web apps include `*.google.com` (see full table on rules page).

## Logic / IDOR reward classes (server-side S2*)

| Class | Impact | Table signal (T0 domains, order-of-magnitude) |
|-------|--------|-----------------------------------------------|
| S2a | IT0 or Critical Actions | up to **$50,000** |
| S2b | IT1 or Impactful Actions | up to **$31,337** |
| S2c | IT2 or Moderate Actions | up to **$7,500** (lower on lower domain tiers) |

Client XSS C0 / CSRF-class C1a–c have separate rows (e.g. XSS C0 T0 up to **$20,000** in published table). Panel discretion + quality multiplier **0.8 / 1.0 / 1.2**.

## Report quality (for 1.0–1.2×)

- Clear vulnerability description  
- Attack preconditions  
- Impact analysis (IT/AC)  
- Complete repro / PoC; product URLs/versions  
- Fast technical communication  

Avoid AI-slop incomplete reports (explicitly called out as low quality).

## Cloud VRP note

GCP console/API issues: prefer **Cloud VRP** rules. Do **not** test customer applications on appspot/bc.googleusercontent under main VRP.

## Legal / sanctions

Rules include legal eligibility (e.g. sanctions restrictions). Re-read live legal section before claiming reward.

## Fidelity

Primary source: official rules page extract 2026-08-07. **Live re-verify** reward table and OOS list before filing. This note is a hunting card, not a substitute for the full rules HTML/SPA.
