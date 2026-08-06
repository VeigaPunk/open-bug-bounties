import { readFile, writeFile } from "node:fs/promises";

const USER_AGENT =
  "OpenBugBountiesIndex/1.0 (+https://github.com/VeigaPunk/open-bug-bounties)";
const TIMEOUT_MS = 20_000;
const CONCURRENCY = 6;

const files = {
  independent: new URL("../data/independent_programs.json", import.meta.url),
  platform: new URL("../data/platform_programs.json", import.meta.url),
  web3: new URL("../data/web3_programs.json", import.meta.url),
};

const [independent, platform, web3] = await Promise.all(
  Object.values(files).map(async (file) => JSON.parse(await readFile(file, "utf8"))),
);

const attemptedAt = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const robotsCache = new Map();

async function fetchBounded(url, init = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      redirect: "follow",
      ...init,
      headers: {
        "user-agent": USER_AGENT,
        accept: "text/html,application/xhtml+xml",
        ...(init.headers ?? {}),
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

function wildcardGroupDisallows(text, pathname) {
  const groups = text.split(/\r?\n\s*\r?\n/);
  for (const group of groups) {
    const lines = group
      .split(/\r?\n/)
      .map((line) => line.replace(/#.*$/, "").trim())
      .filter(Boolean);
    const agents = lines
      .filter((line) => /^user-agent\s*:/i.test(line))
      .map((line) => line.split(":", 2)[1].trim().toLowerCase());
    if (!agents.includes("*")) continue;
    const rules = lines
      .filter((line) => /^(allow|disallow)\s*:/i.test(line))
      .map((line) => {
        const [kind, ...rest] = line.split(":");
        return { kind: kind.toLowerCase(), path: rest.join(":").trim() };
      })
      .filter((rule) => rule.path && pathname.startsWith(rule.path))
      .sort((a, b) => b.path.length - a.path.length);
    if (rules.length) return rules[0].kind === "disallow";
  }
  return false;
}

async function robotsAllowed(target) {
  const url = new URL(target);
  if (!robotsCache.has(url.origin)) {
    robotsCache.set(
      url.origin,
      (async () => {
        try {
          const response = await fetchBounded(new URL("/robots.txt", url));
          if (!response.ok) return "";
          return await response.text();
        } catch {
          return "";
        }
      })(),
    );
  }
  return !wildcardGroupDisallows(await robotsCache.get(url.origin), url.pathname);
}

async function checkPolicy(url) {
  if (!(await robotsAllowed(url))) return { status: "robots_disallowed" };
  try {
    const response = await fetchBounded(url, { headers: { range: "bytes=0-4095" } });
    await response.body?.cancel();
    return {
      status:
        response.status === 404 || response.status === 410
          ? "missing"
          : response.ok
            ? "reachable"
            : "error",
      httpStatus: response.status,
    };
  } catch (error) {
    return { status: "error", error: error instanceof Error ? error.name : "unknown" };
  }
}

async function mapLimit(items, mapper) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (next < items.length) {
        const index = next++;
        results[index] = await mapper(items[index], index);
      }
    }),
  );
  return results;
}

const eligiblePolicies = independent.programs.filter(
  (program) =>
    program.status === "active" &&
    program.confidence === "high" &&
    program.participation !== "public_needs_confirmation" &&
    (program.paid_status.includes("cash") || program.paid_status.includes("rewards")),
);
const policyResults = await mapLimit(eligiblePolicies, (program) => checkPolicy(program.official_url));
const reachable = policyResults.filter((result) => result.status === "reachable").length;
const robotsDisallowed = policyResults.filter((result) => result.status === "robots_disallowed").length;
const missing = policyResults.filter((result) => result.status === "missing").length;
const errors = policyResults.length - reachable - robotsDisallowed - missing;

independent.last_attempted_check_at_utc = attemptedAt;
independent.source_check = {
  status: missing || errors ? "partial_last_good_retained" : "healthy",
  checked: policyResults.length,
  reachable,
  robots_disallowed: robotsDisallowed,
  missing,
  errors,
  retention: "No listing is removed automatically after a failed or missing check.",
};
if (reachable > 0) independent.last_permitted_check_at_utc = attemptedAt;

async function checkDirectory(dataset, sourceName, url) {
  const previous = dataset.source_checks?.[sourceName] ?? {};
  const headers = {};
  if (previous.etag) headers["if-none-match"] = previous.etag;
  if (previous.last_modified) headers["if-modified-since"] = previous.last_modified;
  try {
    const response = await fetchBounded(url, { headers });
    if (response.status === 304) {
      return { ...previous, checked_at_utc: attemptedAt, status: "unchanged", consecutive_misses: 0 };
    }
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    await response.body?.cancel();
    return {
      ...previous,
      checked_at_utc: attemptedAt,
      status: "reachable_last_good_inventory_retained",
      etag: response.headers.get("etag") ?? previous.etag,
      last_modified: response.headers.get("last-modified") ?? previous.last_modified,
      consecutive_misses: 0,
    };
  } catch (error) {
    return {
      ...previous,
      last_attempted_check_at_utc: attemptedAt,
      status: "check_failed_last_good_inventory_retained",
      consecutive_misses: (previous.consecutive_misses ?? 0) + 1,
      last_error: error instanceof Error ? error.message : "unknown error",
    };
  }
}

platform.source_checks ??= {};
platform.source_checks.HackerOne = await checkDirectory(
  platform,
  "HackerOne",
  "https://www.hackerone.com/bug-bounty-programs",
);
platform.last_attempted_check_at_utc = attemptedAt;
if (platform.source_checks.HackerOne.checked_at_utc === attemptedAt) {
  platform.last_permitted_check_at_utc = attemptedAt;
}

web3.source_checks ??= {};
web3.source_checks.Sherlock = await checkDirectory(
  web3,
  "Sherlock",
  "https://audits.sherlock.xyz/bug-bounties",
);
web3.last_attempted_check_at_utc = attemptedAt;
if (web3.source_checks.Sherlock.checked_at_utc === attemptedAt) {
  web3.last_permitted_check_at_utc = attemptedAt;
}

await Promise.all([
  writeFile(files.independent, `${JSON.stringify(independent, null, 2)}\n`),
  writeFile(files.platform, `${JSON.stringify(platform, null, 2)}\n`),
  writeFile(files.web3, `${JSON.stringify(web3, null, 2)}\n`),
]);

console.log(
  JSON.stringify(
    {
      attemptedAt,
      firstParty: { checked: policyResults.length, reachable, robotsDisallowed, missing, errors },
      HackerOne: platform.source_checks.HackerOne.status,
      Sherlock: web3.source_checks.Sherlock.status,
    },
    null,
    2,
  ),
);
