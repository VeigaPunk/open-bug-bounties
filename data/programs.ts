import independentProgramSeed from "./independent_programs.json";
import platformProgramSeed from "./platform_programs.json";
import web3ProgramSeed from "./web3_programs.json";
import refreshEvidenceSeed from "./refresh_evidence.json";

export type SourceKind = "Platform" | "First-party";
export type Surface = "Web & cloud" | "Web3" | "Products" | "Open source" | "Mixed";

export type Program = {
  id: string;
  name: string;
  platform: string;
  sourceKind: SourceKind;
  surface: Surface;
  url: string;
  evidenceUrl: string;
  minReward?: number | null;
  maxReward?: number | null;
  currency?: "USD" | "EUR" | "CHF";
  note?: string;
};

type RefreshSourceEvidence = {
  source_id: string;
  name: string;
  directory_url: string;
  access_mode: string;
  status: string;
  complete: boolean;
  attempted_at_utc: string;
  inventory_at_utc: string | null;
  count: number;
  configured_count?: number;
  checked_count?: number;
  reachable_count?: number;
  raw_count: number | null;
  deduplicated_count: number;
  duplicates_removed: number | null;
  failure_codes: string[];
};

type RefreshEvidence = {
  run_id: string;
  attempted_at_utc: string;
  status: "complete" | "partial";
  evidence_id: string;
  datasets: Array<{ id: string; path: string; records: number; sha256: string }>;
  sources: RefreshSourceEvidence[];
};

type PlatformSeed = {
  snapshot_at_utc: string;
  refresh_run_id: string;
  last_permitted_check_at_utc?: string;
  programs: Array<{
    id: string;
    platform: string;
    name: string;
    url: string;
    directory_url: string;
    industry?: string | null;
  }>;
};

const platformSeed = platformProgramSeed as PlatformSeed;

function platformSurface(program: PlatformSeed["programs"][number]): Surface {
  if (program.platform === "HackenProof") return "Web3";
  const industry = (program.industry ?? "").toLocaleLowerCase();
  if (/hardware|automotive|semiconductor|manufactur/.test(industry)) return "Products";
  if (/software|technology|internet|finance|bank|commerce|retail|media|telecom|travel|health/.test(industry)) {
    return "Web & cloud";
  }
  return "Mixed";
}

const platformPrograms: Program[] = platformSeed.programs.map((program) => ({
  id: program.id,
  name: program.name,
  platform: program.platform,
  sourceKind: "Platform",
  surface: platformSurface(program),
  url: program.url,
  evidenceUrl: program.url,
}));

type Web3Seed = {
  generated_at: string;
  refresh_run_id: string;
  last_permitted_check_at_utc?: string;
  records: Array<{
    id: string;
    name: string;
    platform: "Cantina" | "Immunefi" | "Sherlock";
    program_url: string;
    source_directory_url: string;
    kyc_required?: boolean;
  }>;
};

const web3Seed = web3ProgramSeed as Web3Seed;

const web3Programs: Program[] = web3Seed.records.map((program) => ({
  id: program.id,
  name: program.name,
  platform: program.platform,
  sourceKind: "Platform",
  surface: "Web3",
  url: program.program_url,
  evidenceUrl: program.source_directory_url,
  note: program.kyc_required ? "KYC may be required" : undefined,
}));

type IndependentSeed = {
  refresh_run_id: string;
  programs: Array<{
    id: string;
    name: string;
    category: string;
    official_url: string;
    participation: string;
    status: string;
    paid_status: string;
    confidence: "high" | "medium";
    reward?: {
      currency?: string;
      min?: number;
      max?: number;
      text?: string;
      source_url?: string;
    };
  }>;
};

const independentSeed = independentProgramSeed as IndependentSeed;
const refreshEvidence = refreshEvidenceSeed as RefreshEvidence;
const expectedDatasets = [
  ["independent", "data/independent_programs.json"],
  ["platform", "data/platform_programs.json"],
  ["web3", "data/web3_programs.json"],
] as const;
const expectedSourceIds = [
  "hackerone",
  "bugcrowd",
  "intigriti",
  "yeswehack",
  "hackenproof",
  "immunefi",
  "cantina",
  "sherlock",
  "first-party",
] as const;
const actualSeedCounts: Record<string, number> = {
  "data/independent_programs.json": independentSeed.programs.length,
  "data/platform_programs.json": platformSeed.programs.length,
  "data/web3_programs.json": web3Seed.records.length,
};
const seedRunIds = new Set([
  independentSeed.refresh_run_id,
  platformSeed.refresh_run_id,
  web3Seed.refresh_run_id,
]);
const generationMatches =
  seedRunIds.size === 1 &&
  seedRunIds.has(refreshEvidence.run_id) &&
  refreshEvidence.datasets.length === expectedDatasets.length &&
  expectedDatasets.every(
    ([id, path], index) =>
      refreshEvidence.datasets[index]?.id === id &&
      refreshEvidence.datasets[index]?.path === path &&
      actualSeedCounts[path] === refreshEvidence.datasets[index]?.records,
  );
if (!generationMatches) {
  throw new Error("Bounty datasets do not match the committed refresh evidence generation.");
}
const configuredSourceIds = refreshEvidence.sources.map((source) => source.source_id);
if (
  configuredSourceIds.length !== expectedSourceIds.length ||
  configuredSourceIds.some((id, index) => id !== expectedSourceIds[index])
) {
  throw new Error("Refresh evidence does not cover the exact configured source groups.");
}
for (const source of refreshEvidence.sources) {
  const url = new URL(source.directory_url);
  if (url.protocol !== "https:" || url.port || url.username || url.password) {
    throw new Error(`Unsafe source URL in refresh evidence: ${source.source_id}`);
  }
}

function independentSurface(category: string): Surface {
  if (category === "open_source") return "Open source";
  if (["hardware", "mobile_hardware", "browser", "gaming", "software", "security_software"].includes(category)) {
    return "Products";
  }
  return "Web & cloud";
}

const independent: Program[] = independentSeed.programs
  .filter(
    (program) =>
      program.status === "active" &&
      program.confidence === "high" &&
      program.participation !== "public_needs_confirmation" &&
      (program.paid_status.includes("cash") || program.paid_status.includes("rewards")),
  )
  .map((program) => ({
    id: `first-party-${program.id}`,
    name: program.name,
    platform: "Direct",
    sourceKind: "First-party",
    surface: independentSurface(program.category),
    url: program.official_url,
    evidenceUrl: program.reward?.source_url ?? program.official_url,
    minReward: program.reward?.min,
    maxReward: program.reward?.max,
    currency:
      program.reward?.currency === "EUR"
        ? "EUR"
        : program.reward?.currency === "CHF"
          ? "CHF"
          : "USD",
    note:
      program.participation === "public_application"
        ? "Public application required"
        : program.participation === "public_for_listed_subprograms_only"
          ? "Public for listed subprograms"
          : undefined,
  }));


const candidates: Program[] = [
  ...platformPrograms,
  ...web3Programs,
  ...independent,
];

function canonicalProgramUrl(value: string) {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.port || url.username || url.password) {
    throw new Error(`Unsafe program URL: ${value}`);
  }
  url.hash = "";
  url.hostname = url.hostname.toLowerCase();
  if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/, "");
  return url.toString();
}

const deduped = new Map<string, Program>();
for (const program of candidates) {
  const normalized = {
    ...program,
    url: canonicalProgramUrl(program.url),
    evidenceUrl: canonicalProgramUrl(program.evidenceUrl),
  };
  const existing = deduped.get(normalized.url);
  if (!existing || normalized.sourceKind === "First-party") {
    deduped.set(normalized.url, normalized);
  }
}

export const programs = [...deduped.values()].sort((a, b) => a.name.localeCompare(b.name));
export const lastRefreshAttemptAt = refreshEvidence.attempted_at_utc;
export const refreshEvidenceId = refreshEvidence.evidence_id;
export const refreshHealth = refreshEvidence.status === "complete" ? "HEALTHY" : "PARTIAL";

export type SourceCoverage = {
  id: string;
  name: string;
  url: string;
  note: string;
  count: number;
  status: string;
  completeness: "complete" | "partial" | "retained_permission_limited";
  inventoryAt: string | null;
  attemptedAt: string;
  failures: number;
};


function sourceNote(source: RefreshSourceEvidence) {
  if (source.source_id === "first-party") {
    return `${source.count}/${source.configured_count ?? source.count} eligible · ${source.reachable_count ?? 0} reachable · ${source.failure_codes.length} failure types`;
  }
  const date = source.inventory_at_utc?.slice(0, 10) ?? "date unavailable";
  if (source.access_mode === "retained_permission_limited") {
    return `Snapshot ${date} · permission-limited`;
  }
  if (source.complete) {
    const dedupe =
      source.duplicates_removed && source.raw_count !== null
        ? ` · ${source.raw_count} raw → ${source.deduplicated_count} unique`
        : "";
    return `Live directory ${date}${dedupe}`;
  }
  return `Last good ${date} · refresh incomplete`;
}

export const sourceCoverage: SourceCoverage[] = refreshEvidence.sources.map((source) => {
  const count = source.count;
  const completeness: SourceCoverage["completeness"] =
    source.access_mode === "retained_permission_limited"
      ? "retained_permission_limited"
      : source.complete
        ? "complete"
        : "partial";
  return {
    id: source.source_id,
    name: source.name,
    url: source.directory_url,
    note: sourceNote(source),
    count,
    status: source.status,
    completeness,
    inventoryAt: source.inventory_at_utc,
    attemptedAt: source.attempted_at_utc,
    failures: source.failure_codes.length,
  };
});

export const boardEvidence = {
  runId: refreshEvidence.run_id,
  evidenceId: refreshEvidence.evidence_id,
  rawCandidates: candidates.length,
  displayedPrograms: programs.length,
  duplicatesRemoved: candidates.length - programs.length,
  sourceCounts: Object.fromEntries(sourceCoverage.map((source) => [source.id, source.count])),
};
