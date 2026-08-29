"use client";

import { useEffect, useMemo, useState } from "react";
import {
  lastRefreshAttemptAt,
  programs,
  refreshEvidenceId,
  refreshHealth,
  sourceCoverage,
  type Program,
  type SourceKind,
  type Surface,
} from "@/data/programs";

const PAGE_SIZE = 48;

type SortMode = "name" | "reward" | "source";

function formatMoney(value: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function rewardLabel(program: Program) {
  if (program.sourceKind === "Platform") return "Paid — see policy";
  if (program.minReward && program.maxReward) {
    return `${formatMoney(program.minReward, program.currency)}–${formatMoney(program.maxReward, program.currency)}`;
  }
  if (program.maxReward) return `Up to ${formatMoney(program.maxReward, program.currency)}`;
  if (program.minReward) return `From ${formatMoney(program.minReward, program.currency)}`;
  return "Paid — see policy";
}


function relativeTime(timestamp: number, now: number) {
  const minutes = Math.max(0, Math.floor((now - timestamp) / 60000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function platformClass(platform: string) {
  return `platform-${platform.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [sourceKind, setSourceKind] = useState<"All" | SourceKind>("All");
  const [platform, setPlatform] = useState("All");
  const [surface, setSurface] = useState<"All" | Surface>("All");
  const [sort, setSort] = useState<SortMode>("name");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [now, setNow] = useState(() => new Date(lastRefreshAttemptAt).getTime());

  useEffect(() => {
    const initialTick = window.setTimeout(() => setNow(Date.now()), 0);
    const ticker = window.setInterval(() => setNow(Date.now()), 60000);
    return () => {
      window.clearTimeout(initialTick);
      window.clearInterval(ticker);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        document.querySelector<HTMLInputElement>("input[type='search']")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const platforms = useMemo(
    () => [...new Set(programs.map((program) => program.platform))].sort(),
    [],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return programs
      .filter((program) => {
        const matchesQuery =
          !needle ||
          `${program.name} ${program.platform} ${program.surface} ${program.note ?? ""}`
            .toLocaleLowerCase()
            .includes(needle);
        return (
          matchesQuery &&
          (sourceKind === "All" || program.sourceKind === sourceKind) &&
          (platform === "All" || program.platform === platform) &&
          (surface === "All" || program.surface === surface)
        );
      })
      .sort((a, b) => {
        if (sort === "reward") return (b.maxReward ?? b.minReward ?? 0) - (a.maxReward ?? a.minReward ?? 0);
        if (sort === "source") return a.platform.localeCompare(b.platform) || a.name.localeCompare(b.name);
        return a.name.localeCompare(b.name);
      });
  }, [platform, query, sort, sourceKind, surface]);

  const firstPartyCount = programs.filter((program) => program.sourceKind === "First-party").length;
  const completeSourceCount = sourceCoverage.filter((source) => source.completeness === "complete").length;

  return (
    <main>
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="The Bounty Index home">
          <span className="wordmark-mark" aria-hidden="true">B/</span>
          <span>THE BOUNTY INDEX</span>
        </a>
        <div className="topbar-status" aria-label="Update status">
          <span className="pulse-dot" aria-hidden="true" />
          <span>12H REFRESH · {refreshHealth}</span>
        </div>
        <a className="method-link" href="#method">METHOD ↓</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow-row">
            <span className="eyebrow">OPEN • PAID • PUBLIC</span>
            <span className="anti-aggregator">OFFICIAL EVIDENCE ONLY</span>
          </div>
          <h1>Bug bounties,<br /><span>without the dead ends.</span></h1>
          <p className="hero-deck">
            A source-linked record of vulnerability programs last observed as public and paid. Every
            listing points to an official platform or the organization’s own policy—not a copied
            aggregator page. Live-permitted sources are rechecked every 12 hours; retained snapshots
            stay visibly dated.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#directory">Explore {programs.length} programs <span>→</span></a>
            <a className="text-button" href="#sources">See source coverage →</a>
          </div>
        </div>

        <div className="status-card">
          <div className="status-card-head">
            <span>INDEX HEALTH</span>
            <span className={`status-open ${refreshHealth === "PARTIAL" ? "status-partial" : ""}`}>{refreshHealth}</span>
          </div>
          <div className="status-number">{programs.length}</div>
          <div className="status-label">source-linked public listings</div>
          <div className="status-rule" />
          <dl className="status-list">
            <div><dt>First-party policies</dt><dd>{firstPartyCount}</dd></div>
            <div><dt>Source groups</dt><dd>{sourceCoverage.length}</dd></div>
            <div><dt>Last attempt</dt><dd>{relativeTime(new Date(lastRefreshAttemptAt).getTime(), now)}</dd></div>
            <div><dt>Complete live inventories</dt><dd>{completeSourceCount} / {sourceCoverage.length}</dd></div>
          </dl>
        </div>
      </section>

      <section className="directory-section" id="directory">
        <div className="section-heading">
          <div>
            <p className="section-kicker">01 / DIRECTORY</p>
            <h2>Find your next scope.</h2>
          </div>
          <p role="status" aria-live="polite">{filtered.length} matching {filtered.length === 1 ? "program" : "programs"}</p>
        </div>

        <div className="filter-shell">
          <label className="search-field">
            <span className="sr-only">Search programs</span>
            <span aria-hidden="true">⌕</span>
            <input
              aria-keyshortcuts="Control+K Meta+K"
              value={query}
              onChange={(event) => { setQuery(event.target.value); setLimit(PAGE_SIZE); }}
              placeholder="Search organization, source, or surface"
              type="search"
            />
            <kbd>⌘ K</kbd>
          </label>

          <div className="filter-row">
            <div className="segmented" aria-label="Evidence source filter">
              {(["All", "First-party", "Platform"] as const).map((value) => (
                <button
                  aria-pressed={sourceKind === value}
                  className={sourceKind === value ? "active" : ""}
                  key={value}
                  onClick={() => { setSourceKind(value); setLimit(PAGE_SIZE); }}
                  type="button"
                >
                  {value}
                </button>
              ))}
            </div>

            <label>
              <span className="sr-only">Platform</span>
              <select value={platform} onChange={(event) => { setPlatform(event.target.value); setLimit(PAGE_SIZE); }}>
                <option>All</option>
                {platforms.map((value) => <option key={value}>{value}</option>)}
              </select>
            </label>

            <label>
              <span className="sr-only">Surface</span>
              <select value={surface} onChange={(event) => { setSurface(event.target.value as "All" | Surface); setLimit(PAGE_SIZE); }}>
                <option>All</option>
                <option>Web & cloud</option>
                <option>Web3</option>
                <option>Products</option>
                <option>Open source</option>
                <option>Mixed</option>
              </select>
            </label>

            <label className="sort-select">
              <span>Sort</span>
              <select value={sort} onChange={(event) => { setSort(event.target.value as SortMode); setLimit(PAGE_SIZE); }}>
                <option value="name">A–Z</option>
                <option value="reward">Highest reward</option>
                <option value="source">Source</option>
              </select>
            </label>
          </div>
        </div>

        <div className="program-table" role="table" aria-label="Open bug bounty programs">
          <div className="program-header" role="row">
            <span role="columnheader">Program</span>
            <span role="columnheader">Evidence</span>
            <span role="columnheader">Surface</span>
            <span role="columnheader">Published reward</span>
            <span aria-hidden="true" />
          </div>

          {filtered.slice(0, limit).map((program, index) => (
            <article className="program-row" role="row" key={program.id}>
              <div className="program-name" role="cell">
                <span className="row-number">{String(index + 1).padStart(3, "0")}</span>
                <div>
                  <a href={program.url} target="_blank" rel="noopener noreferrer">{program.name}</a>
                  {program.note && <small>{program.note}</small>}
                </div>
              </div>
              <div role="cell">
                <a
                  className={`platform-badge ${platformClass(program.platform)}`}
                  href={program.evidenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Open official evidence for ${program.name}`}
                >
                  {program.sourceKind === "First-party" ? "FIRST-PARTY" : program.platform.toUpperCase()}
                </a>
              </div>
              <div className="surface-cell" role="cell">{program.surface}</div>
              <div className="reward-cell" role="cell">{rewardLabel(program)}</div>
              <a className="row-arrow" href={program.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${program.name} program`}>↗︎</a>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="empty-state">
              <span>NO MATCH</span>
              <h3>Try a wider scope.</h3>
              <button type="button" onClick={() => { setQuery(""); setPlatform("All"); setSurface("All"); setSourceKind("All"); }}>
                Reset filters
              </button>
            </div>
          )}
        </div>

        {limit < filtered.length && (
          <button className="load-more" type="button" onClick={() => setLimit((value) => value + PAGE_SIZE)}>
            Show {Math.min(PAGE_SIZE, filtered.length - limit)} more
            <span>{limit} / {filtered.length}</span>
          </button>
        )}
      </section>

      <section className="sources-section" id="sources">
        <div className="section-heading light-heading">
          <div>
            <p className="section-kicker">02 / SOURCE COVERAGE</p>
            <h2>Traceable by design.</h2>
          </div>
          <p>No community aggregator is accepted as evidence.</p>
        </div>
        <div className="source-grid">
          {sourceCoverage.map((source, index) => (
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="source-card" key={source.id}>
              <span className="source-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{source.name}</h3>
                <p>{source.note}</p>
              </div>
              <div className="source-count"><strong>{source.count}</strong><span>{source.completeness === "complete" ? "live" : "retained / partial"}</span></div>
              <span className="source-arrow">↗︎</span>
            </a>
          ))}
        </div>
      </section>

      <section className="method-section" id="method">
        <div className="method-intro">
          <p className="section-kicker">03 / METHOD</p>
          <h2>What “open” means here.</h2>
          <p>
            There is no universal registry for bug bounties. This index treats completeness as a
            verifiable process: cover authoritative directories, follow first-party disclosures,
            and keep uncertainty visible.
          </p>
        </div>
        <ol className="method-list">
          <li>
            <span>01</span>
            <div><h3>Money is explicit</h3><p>Reward language or a bounty table must be present. Unpaid VDPs are excluded.</p></div>
          </li>
          <li>
            <span>02</span>
            <div><h3>The door is open</h3><p>Public submission must be available now. Private, paused, invite-only, and ended programs are excluded.</p></div>
          </li>
          <li>
            <span>03</span>
            <div><h3>Evidence is primary</h3><p>Accepted evidence is an official platform page or the organization’s own domain.</p></div>
          </li>
          <li>
            <span>04</span>
            <div><h3>Failures remain visible</h3><p>A source outage never silently deletes a program. Permission-gated directories stay labeled as snapshots instead of being crawled against their rules.</p></div>
          </li>
          <li>
            <span>05</span>
            <div><h3>Records stay minimal</h3><p>Platform descriptions, scopes, logos, and reward tables are not reproduced. Follow the official link for current terms.</p></div>
          </li>
        </ol>
      </section>

      <footer>
        <div>
          <span className="footer-mark">B/</span>
          <p>Verify the current scope and rules on the linked program page before testing.</p>
        </div>
        <div className="footer-meta">
          <span>ATTEMPT {new Date(lastRefreshAttemptAt).toISOString().slice(0, 10)}</span>
          <span>EVIDENCE {refreshEvidenceId.slice(0, 12)} · 12H SCHEDULE</span>
        </div>
      </footer>
    </main>
  );
}
