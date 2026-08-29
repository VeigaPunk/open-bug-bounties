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
    reward?: { currency?: string; min?: number; max?: number; text?: string };
  }>;
};

const independentSeed = independentProgramSeed as IndependentSeed;
const refreshEvidence = refreshEvidenceSeed as RefreshEvidence;
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
if (
  seedRunIds.size !== 1 ||
  !seedRunIds.has(refreshEvidence.run_id) ||
  refreshEvidence.datasets.length !== 3 ||
  refreshEvidence.datasets.some(
    (dataset) => actualSeedCounts[dataset.path] !== dataset.records,
  )
) {
  throw new Error("Bounty datasets do not match the committed refresh evidence generation.");
}
const configuredSourceIds = new Set(
  refreshEvidence.sources.map((source) => source.source_id),
);
if (configuredSourceIds.size !== 9 || refreshEvidence.sources.length !== 9) {
  throw new Error("Refresh evidence does not cover all nine configured source groups.");
}
for (const source of refreshEvidence.sources) {
  const url = new URL(source.directory_url);
  if (url.protocol !== "https:" || url.username || url.password) {
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
    evidenceUrl: program.official_url,
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

const manual: Program[] = [
  {
    id: "fp-google-vrp",
    name: "Google and Alphabet VRP",
    platform: "Direct",
    sourceKind: "First-party",
    surface: "Web & cloud",
    url: "https://bughunters.google.com/about/rules/google-friends/google-and-alphabet-vulnerability-reward-program-vrp-rules",
    evidenceUrl: "https://bughunters.google.com/about/rules/google-friends/google-and-alphabet-vulnerability-reward-program-vrp-rules",
    currency: "USD",
    note: "Official Google Bug Hunters policy",
  },
  {
    id: "fp-google-cloud",
    name: "Google Cloud VRP",
    platform: "Direct",
    sourceKind: "First-party",
    surface: "Web & cloud",
    url: "https://bughunters.google.com/about/rules/google-friends/cloud-vulnerability-reward-program-rules",
    evidenceUrl: "https://bughunters.google.com/about/rules/google-friends/cloud-vulnerability-reward-program-rules",
    maxReward: 101010,
    currency: "USD",
    note: "Official Google Cloud program",
  },
  {
    id: "fp-google-android",
    name: "Android and Google Devices Security Rewards",
    platform: "Direct",
    sourceKind: "First-party",
    surface: "Products",
    url: "https://bughunters.google.com/about/rules/android-friends/android-and-google-devices-security-reward-program-rules",
    evidenceUrl: "https://bughunters.google.com/about/rules/android-friends/android-and-google-devices-security-reward-program-rules",
    currency: "USD",
  },
  {
    id: "fp-google-oss",
    name: "Google Open Source Software VRP",
    platform: "Direct",
    sourceKind: "First-party",
    surface: "Open source",
    url: "https://bughunters.google.com/about/rules/open-source/google-open-source-software-vulnerability-reward-program-rules",
    evidenceUrl: "https://bughunters.google.com/about/rules/open-source/google-open-source-software-vulnerability-reward-program-rules",
    currency: "USD",
  },
  {
    id: "fp-apple",
    name: "Apple Security Bounty",
    platform: "Direct",
    sourceKind: "First-party",
    surface: "Products",
    url: "https://security.apple.com/bounty/",
    evidenceUrl: "https://security.apple.com/bounty/",
    maxReward: 2000000,
    currency: "USD",
    note: "Bonuses can raise the maximum above $5M",
  },
  {
    id: "fp-microsoft",
    name: "Microsoft Bounty Programs",
    platform: "Direct",
    sourceKind: "First-party",
    surface: "Mixed",
    url: "https://www.microsoft.com/en-us/msrc/bounty",
    evidenceUrl: "https://www.microsoft.com/en-us/msrc/bounty",
    maxReward: 250000,
    currency: "USD",
  },
  {
    id: "fp-ms-azure",
    name: "Microsoft Azure Bounty",
    platform: "Direct",
    sourceKind: "First-party",
    surface: "Web & cloud",
    url: "https://www.microsoft.com/en-us/msrc/bounty-microsoft-azure",
    evidenceUrl: "https://www.microsoft.com/en-us/msrc/bounty-microsoft-azure",
    minReward: 1250,
    maxReward: 60000,
    currency: "USD",
  },
  {
    id: "fp-ms-copilot",
    name: "Microsoft Copilot Bounty",
    platform: "Direct",
    sourceKind: "First-party",
    surface: "Web & cloud",
    url: "https://www.microsoft.com/en-us/msrc/bounty-ai",
    evidenceUrl: "https://www.microsoft.com/en-us/msrc/bounty-ai",
    minReward: 250,
    maxReward: 30000,
    currency: "USD",
  },
  {
    id: "fp-ms-identity",
    name: "Microsoft Identity Bounty",
    platform: "Direct",
    sourceKind: "First-party",
    surface: "Web & cloud",
    url: "https://www.microsoft.com/en-us/msrc/bounty-microsoft-identity",
    evidenceUrl: "https://www.microsoft.com/en-us/msrc/bounty-microsoft-identity",
    minReward: 750,
    maxReward: 100000,
    currency: "USD",
  },
  {
    id: "fp-ms-windows",
    name: "Windows Insider Preview Bounty",
    platform: "Direct",
    sourceKind: "First-party",
    surface: "Products",
    url: "https://www.microsoft.com/en-us/msrc/bounty-windows-insider-preview",
    evidenceUrl: "https://www.microsoft.com/en-us/msrc/bounty-windows-insider-preview",
    minReward: 500,
    maxReward: 100000,
    currency: "USD",
  },
  {
    id: "fp-meta",
    name: "Meta Bug Bounty",
    platform: "Direct",
    sourceKind: "First-party",
    surface: "Web & cloud",
    url: "https://business.facebook.com/whitehat",
    evidenceUrl: "https://business.facebook.com/whitehat",
    currency: "USD",
  },
  {
    id: "fp-github",
    name: "GitHub Bug Bounty",
    platform: "HackerOne",
    sourceKind: "First-party",
    surface: "Web & cloud",
    url: "https://bounty.github.com/",
    evidenceUrl: "https://bounty.github.com/",
    minReward: 10000,
    currency: "USD",
    note: "Official policy; submissions route to HackerOne",
  },
  {
    id: "fp-mozilla-client",
    name: "Mozilla Client Bug Bounty",
    platform: "Direct",
    sourceKind: "First-party",
    surface: "Products",
    url: "https://www.mozilla.org/en-US/security/client-bug-bounty/",
    evidenceUrl: "https://www.mozilla.org/en-US/security/client-bug-bounty/",
    minReward: 3000,
    maxReward: 20000,
    currency: "USD",
  },
  {
    id: "fp-mozilla-web",
    name: "Mozilla Web & Services Bug Bounty",
    platform: "HackerOne",
    sourceKind: "First-party",
    surface: "Web & cloud",
    url: "https://www.mozilla.org/en-US/security/web-bug-bounty/",
    evidenceUrl: "https://www.mozilla.org/en-US/security/web-bug-bounty/",
    currency: "USD",
  },
  {
    id: "fp-samsung",
    name: "Samsung Mobile Security Rewards",
    platform: "Direct",
    sourceKind: "First-party",
    surface: "Products",
    url: "https://security.samsungmobile.com/rewardsProgram.smsb",
    evidenceUrl: "https://security.samsungmobile.com/rewardsProgram.smsb",
    currency: "USD",
  },
  {
    id: "fp-samsung-isvp",
    name: "Samsung Important Scenario Vulnerability Program",
    platform: "Direct",
    sourceKind: "First-party",
    surface: "Products",
    url: "https://security.samsungmobile.com/isvp.smsb",
    evidenceUrl: "https://security.samsungmobile.com/isvp.smsb",
    maxReward: 1000000,
    currency: "USD",
  },
  {
    id: "fp-palo-alto",
    name: "Palo Alto Networks Product Bug Bounty",
    platform: "Direct",
    sourceKind: "First-party",
    surface: "Products",
    url: "https://security.paloaltonetworks.com/bugbounty",
    evidenceUrl: "https://security.paloaltonetworks.com/bugbounty",
    currency: "USD",
  },
  {
    id: "fp-doit",
    name: "DoiT Vulnerability Reward Program",
    platform: "Direct",
    sourceKind: "First-party",
    surface: "Web & cloud",
    url: "https://help.doit.com/docs/vendor-information/bug-bounty-program",
    evidenceUrl: "https://help.doit.com/docs/vendor-information/bug-bounty-program",
    minReward: 100,
    maxReward: 10000,
    currency: "USD",
  },
  {
    id: "bc-openai",
    name: "OpenAI",
    platform: "Bugcrowd",
    sourceKind: "Platform",
    surface: "Web & cloud",
    url: "https://bugcrowd.com/engagements/openai",
    evidenceUrl: "https://bugcrowd.com/engagements/openai",
    currency: "USD",
  },
  {
    id: "bc-keeper",
    name: "Keeper Security Public Bounty",
    platform: "Bugcrowd",
    sourceKind: "Platform",
    surface: "Web & cloud",
    url: "https://bugcrowd.com/engagements/keepersecurity",
    evidenceUrl: "https://bugcrowd.com/engagements/keepersecurity",
    currency: "USD",
  },
  {
    id: "bc-glean",
    name: "Glean Technologies Public Engagement",
    platform: "Bugcrowd",
    sourceKind: "Platform",
    surface: "Web & cloud",
    url: "https://bugcrowd.com/engagements/glean-technologies-public",
    evidenceUrl: "https://bugcrowd.com/engagements/glean-technologies-public",
    currency: "USD",
  },
  {
    id: "bc-stiltsoft",
    name: "Stiltsoft",
    platform: "Bugcrowd",
    sourceKind: "Platform",
    surface: "Web & cloud",
    url: "https://bugcrowd.com/engagements/stiltsoft",
    evidenceUrl: "https://bugcrowd.com/engagements/stiltsoft",
    currency: "USD",
  },
  {
    id: "bc-mastercard",
    name: "Mastercard Public Bug Bounty",
    platform: "Bugcrowd",
    sourceKind: "Platform",
    surface: "Web & cloud",
    url: "https://bugcrowd.com/engagements/mastercard",
    evidenceUrl: "https://bugcrowd.com/engagements/mastercard",
    currency: "USD",
  },
  {
    id: "bc-tyler",
    name: "Tyler Technologies Data & Insights",
    platform: "Bugcrowd",
    sourceKind: "Platform",
    surface: "Web & cloud",
    url: "https://bugcrowd.com/engagements/tyler-tech-data-insights",
    evidenceUrl: "https://bugcrowd.com/engagements/tyler-tech-data-insights",
    currency: "USD",
  },
  {
    id: "bc-rapyd",
    name: "Rapyd",
    platform: "Bugcrowd",
    sourceKind: "Platform",
    surface: "Web & cloud",
    url: "https://bugcrowd.com/engagements/rapyd",
    evidenceUrl: "https://bugcrowd.com/engagements/rapyd",
    currency: "USD",
  },
  {
    id: "bc-newrelic",
    name: "New Relic Public Bug Bounty",
    platform: "Bugcrowd",
    sourceKind: "Platform",
    surface: "Web & cloud",
    url: "https://bugcrowd.com/engagements/newrelic-mbb-og-public",
    evidenceUrl: "https://bugcrowd.com/engagements/newrelic-mbb-og-public",
    currency: "USD",
  },
  {
    id: "ywh-superbank",
    name: "Superbank Public Bug Bounty",
    platform: "YesWeHack",
    sourceKind: "Platform",
    surface: "Web & cloud",
    url: "https://yeswehack.com/programs/superbank-public-bug-bounty-program",
    evidenceUrl: "https://yeswehack.com/programs/superbank-public-bug-bounty-program",
    maxReward: 1000,
    currency: "USD",
  },
  {
    id: "ywh-telenor",
    name: "Telenor Sweden Public Bug Bounty",
    platform: "YesWeHack",
    sourceKind: "Platform",
    surface: "Web & cloud",
    url: "https://yeswehack.com/programs/telenor-sweden-public-bug-bounty-program",
    evidenceUrl: "https://yeswehack.com/programs/telenor-sweden-public-bug-bounty-program",
    currency: "EUR",
  },
  {
    id: "ywh-gojek",
    name: "GOJEK Public Bounty",
    platform: "YesWeHack",
    sourceKind: "Platform",
    surface: "Web & cloud",
    url: "https://yeswehack.com/programs/gojek-bug-bounty-program",
    evidenceUrl: "https://yeswehack.com/programs/gojek-bug-bounty-program",
    currency: "USD",
  },
  {
    id: "ywh-imou",
    name: "IMOU Public Bug Bounty",
    platform: "YesWeHack",
    sourceKind: "Platform",
    surface: "Products",
    url: "https://yeswehack.com/programs/imou-public-bug-bounty-program",
    evidenceUrl: "https://yeswehack.com/programs/imou-public-bug-bounty-program",
    currency: "USD",
  },
  {
    id: "ywh-atg",
    name: "ATG Public Bug Bounty",
    platform: "YesWeHack",
    sourceKind: "Platform",
    surface: "Web & cloud",
    url: "https://yeswehack.com/programs/atg-public-bug-bounty-program",
    evidenceUrl: "https://yeswehack.com/programs/atg-public-bug-bounty-program",
    maxReward: 4000,
    currency: "EUR",
  },
  {
    id: "ywh-doctolib",
    name: "Doctolib Bug Bounty",
    platform: "YesWeHack",
    sourceKind: "Platform",
    surface: "Web & cloud",
    url: "https://yeswehack.com/programs/doctolib-public-bug-bounty-program",
    evidenceUrl: "https://yeswehack.com/programs/doctolib-public-bug-bounty-program",
    currency: "EUR",
  },
  {
    id: "ywh-decathlon",
    name: "DECATHLON Bug Bounty",
    platform: "YesWeHack",
    sourceKind: "Platform",
    surface: "Web & cloud",
    url: "https://yeswehack.com/programs/decathlon",
    evidenceUrl: "https://yeswehack.com/programs/decathlon",
    currency: "EUR",
  },
  {
    id: "ywh-infomaniak",
    name: "Infomaniak Bug Bounty",
    platform: "YesWeHack",
    sourceKind: "Platform",
    surface: "Web & cloud",
    url: "https://yeswehack.com/programs/infomaniak-bug-bounty-program",
    evidenceUrl: "https://yeswehack.com/programs/infomaniak-bug-bounty-program",
    currency: "EUR",
  },
  {
    id: "ywh-lvmh",
    name: "Louis Vuitton Malletier Public Bug Bounty",
    platform: "YesWeHack",
    sourceKind: "Platform",
    surface: "Web & cloud",
    url: "https://yeswehack.com/programs/louis-vuitton-malletier-public-bug-bounty-program",
    evidenceUrl: "https://yeswehack.com/programs/louis-vuitton-malletier-public-bug-bounty-program",
    currency: "EUR",
  },
  {
    id: "ywh-expressvpn",
    name: "ExpressVPN Bug Bounty",
    platform: "YesWeHack",
    sourceKind: "Platform",
    surface: "Products",
    url: "https://yeswehack.com/programs/expressvpn-bug-bounty-program",
    evidenceUrl: "https://yeswehack.com/programs/expressvpn-bug-bounty-program",
    currency: "USD",
  },
  {
    id: "int-amd",
    name: "AMD Product Security Bug Bounty",
    platform: "Intigriti",
    sourceKind: "Platform",
    surface: "Products",
    url: "https://app.intigriti.com/programs/amd/amd/detail",
    evidenceUrl: "https://app.intigriti.com/programs/amd/amd/detail",
    currency: "USD",
  },
  {
    id: "imm-ssv",
    name: "SSV Network",
    platform: "Immunefi",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://immunefi.com/bug-bounty/ssvnetwork/information/",
    evidenceUrl: "https://immunefi.com/bug-bounty/ssvnetwork/information/",
    maxReward: 250000,
    currency: "USD",
  },
  {
    id: "imm-ens",
    name: "ENS",
    platform: "Immunefi",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://immunefi.com/bug-bounty/ens/information/",
    evidenceUrl: "https://immunefi.com/bug-bounty/ens/information/",
    maxReward: 250000,
    currency: "USD",
  },
  {
    id: "imm-lombard",
    name: "Lombard Finance",
    platform: "Immunefi",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://immunefi.com/bug-bounty/lombard-finance/information/",
    evidenceUrl: "https://immunefi.com/bug-bounty/lombard-finance/information/",
    maxReward: 250000,
    currency: "USD",
  },
  {
    id: "imm-graph",
    name: "The Graph",
    platform: "Immunefi",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://immunefi.com/bug-bounty/thegraph/information/",
    evidenceUrl: "https://immunefi.com/bug-bounty/thegraph/information/",
    maxReward: 50000,
    currency: "USD",
  },
  {
    id: "imm-dexe",
    name: "DeXe Protocol",
    platform: "Immunefi",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://immunefi.com/bug-bounty/dexeprotocol/information/",
    evidenceUrl: "https://immunefi.com/bug-bounty/dexeprotocol/information/",
    maxReward: 500000,
    currency: "USD",
  },
  {
    id: "imm-ethena",
    name: "Ethena",
    platform: "Immunefi",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://immunefi.com/bug-bounty/ethena/information/",
    evidenceUrl: "https://immunefi.com/bug-bounty/ethena/information/",
    maxReward: 3000000,
    currency: "USD",
  },
  {
    id: "imm-hedera",
    name: "Hedera",
    platform: "Immunefi",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://immunefi.com/bug-bounty/hedera/information/",
    evidenceUrl: "https://immunefi.com/bug-bounty/hedera/information/",
    maxReward: 30000,
    currency: "USD",
  },
  {
    id: "imm-immunefi",
    name: "Immunefi",
    platform: "Immunefi",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://immunefi.com/bug-bounty/immunefi/information/",
    evidenceUrl: "https://immunefi.com/bug-bounty/immunefi/information/",
    maxReward: 50000,
    currency: "USD",
  },
  {
    id: "imm-zest",
    name: "Zest Protocol V2",
    platform: "Immunefi",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://immunefi.com/bug-bounty/zest-protocol-v2/information/",
    evidenceUrl: "https://immunefi.com/bug-bounty/zest-protocol-v2/information/",
    maxReward: 100000,
    currency: "USD",
  },
  {
    id: "imm-cosmos",
    name: "Cosmos",
    platform: "Immunefi",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://immunefi.com/bug-bounty/cosmos/information/",
    evidenceUrl: "https://immunefi.com/bug-bounty/cosmos/information/",
    maxReward: 50000,
    currency: "USD",
  },
  {
    id: "hp-predictstreet",
    name: "ADI Predictstreet Smart Contracts",
    platform: "HackenProof",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://hackenproof.com/programs/adi-predictstreet-smart-contracts",
    evidenceUrl: "https://hackenproof.com/programs",
    maxReward: 10000,
    currency: "USD",
  },
  {
    id: "hp-stark-staking",
    name: "Starknet Staking",
    platform: "HackenProof",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://hackenproof.com/programs/starknet-staking",
    evidenceUrl: "https://hackenproof.com/programs",
    maxReward: 100000,
    currency: "USD",
  },
  {
    id: "hp-stark-web",
    name: "Starknet Web & SC",
    platform: "HackenProof",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://hackenproof.com/programs/starknet-web-and-sc",
    evidenceUrl: "https://hackenproof.com/programs",
    maxReward: 250000,
    currency: "USD",
  },
  {
    id: "hp-stark-chain",
    name: "Starknet Blockchain/DLT",
    platform: "HackenProof",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://hackenproof.com/programs/starknet-blockchain-dlt",
    evidenceUrl: "https://hackenproof.com/programs",
    maxReward: 250000,
    currency: "USD",
  },
  {
    id: "hp-arcadia",
    name: "Arcadia Finance Smart Contracts",
    platform: "HackenProof",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://hackenproof.com/programs/arcadia-finance-smart-contracts",
    evidenceUrl: "https://hackenproof.com/programs",
    maxReward: 25000,
    currency: "USD",
  },
  {
    id: "hp-hyperbridge",
    name: "Hyperbridge Protocol",
    platform: "HackenProof",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://hackenproof.com/programs/hyperbridge-protocol",
    evidenceUrl: "https://hackenproof.com/programs",
    maxReward: 50000,
    currency: "USD",
  },
  {
    id: "hp-cetus",
    name: "Cetus Web",
    platform: "HackenProof",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://hackenproof.com/programs/cetus-web",
    evidenceUrl: "https://hackenproof.com/programs",
    maxReward: 10000,
    currency: "USD",
  },
  {
    id: "hp-ample",
    name: "Ample Smart Contracts",
    platform: "HackenProof",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://hackenproof.com/programs/ample-smart-contracts",
    evidenceUrl: "https://hackenproof.com/programs?page=2",
    maxReward: 20000,
    currency: "USD",
  },
  {
    id: "hp-dexalot",
    name: "Dexalot Smart Contracts",
    platform: "HackenProof",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://hackenproof.com/programs/dexalot-smart-contracts",
    evidenceUrl: "https://hackenproof.com/programs?page=2",
    maxReward: 20000,
    currency: "USD",
  },
  {
    id: "hp-amlbot",
    name: "AMLBot KYT Web",
    platform: "HackenProof",
    sourceKind: "Platform",
    surface: "Web & cloud",
    url: "https://hackenproof.com/programs/amlbot-kyt-web",
    evidenceUrl: "https://hackenproof.com/programs?page=2",
    maxReward: 1500,
    currency: "USD",
  },
  {
    id: "hp-idos",
    name: "idOS Apps and SC",
    platform: "HackenProof",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://hackenproof.com/programs/idos-apps-and-sc",
    evidenceUrl: "https://hackenproof.com/programs?page=2",
    maxReward: 5000,
    currency: "USD",
  },
  {
    id: "hp-pumb",
    name: "PUMB Web",
    platform: "HackenProof",
    sourceKind: "Platform",
    surface: "Web & cloud",
    url: "https://hackenproof.com/programs/pumb-web",
    evidenceUrl: "https://hackenproof.com/programs?page=2",
    maxReward: 2000,
    currency: "USD",
  },
  {
    id: "hp-ember",
    name: "Ember EVM Smart Contracts",
    platform: "HackenProof",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://hackenproof.com/programs/ember-evm-smart-contracts",
    evidenceUrl: "https://hackenproof.com/programs?page=2",
    maxReward: 15000,
    currency: "USD",
  },
  {
    id: "hp-near-intents",
    name: "NEAR Intents: Bridges",
    platform: "HackenProof",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://hackenproof.com/programs/near-intents-bridges",
    evidenceUrl: "https://hackenproof.com/programs?page=2",
    maxReward: 300000,
    currency: "USD",
  },
  {
    id: "hp-multipli",
    name: "Multipli Smart Contracts",
    platform: "HackenProof",
    sourceKind: "Platform",
    surface: "Web3",
    url: "https://hackenproof.com/programs/multipli-smart-contracts",
    evidenceUrl: "https://hackenproof.com/programs?page=2",
    maxReward: 10000,
    currency: "USD",
  },
];

const candidates: Program[] = [
  ...platformPrograms,
  ...web3Programs,
  ...independent,
  ...manual.filter((program) => program.sourceKind === "First-party"),
];

function canonicalProgramUrl(value: string) {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password) {
    throw new Error(`Unsafe program URL: ${value}`);
  }
  url.hash = "";
  url.hostname = url.hostname.toLowerCase();
  if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/, "");
  return url.toString();
}

const deduped = new Map<string, Program>();
for (const program of candidates) {
  const key = canonicalProgramUrl(program.url);
  const existing = deduped.get(key);
  if (!existing || program.sourceKind === "First-party") deduped.set(key, program);
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
  const count =
    source.source_id === "first-party"
      ? programs.filter((program) => program.sourceKind === "First-party").length
      : programs.filter(
          (program) =>
            program.sourceKind === "Platform" && program.platform === source.name,
        ).length;
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
