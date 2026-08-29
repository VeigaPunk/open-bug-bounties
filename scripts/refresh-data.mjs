import { createHash } from "node:crypto";
import { lookup } from "node:dns/promises";
import { readFile, rename, rm, writeFile } from "node:fs/promises";
import { request as httpsRequest } from "node:https";
import { isIP } from "node:net";
import { basename, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { parse } from "parse5";

const USER_AGENT =
  "OpenBugBountiesIndex/2.0 (+https://github.com/VeigaPunk/open-bug-bounties)";
const ROBOTS_AGENT = "openbugbountiesindex";
const TIMEOUT_MS = 20_000;
const CONCURRENCY = 6;
const MIN_ORIGIN_DELAY_MS = 1_000;
const MAX_REDIRECTS = 3;
const MAX_PAGES_PER_SOURCE = 20;
const MAX_BYTES_PER_PAGE = 5 * 1024 * 1024;
const MAX_BYTES_PER_SOURCE = 20 * 1024 * 1024;
const MAX_ROBOTS_BYTES = 512 * 1024;
const MAX_INVENTORY_CHURN = 0.35;
const MAX_REQUESTS_PER_ORIGIN = 25;

const files = {
  independent: new URL("../data/independent_programs.json", import.meta.url),
  platform: new URL("../data/platform_programs.json", import.meta.url),
  web3: new URL("../data/web3_programs.json", import.meta.url),
  evidence: new URL("../data/refresh_evidence.json", import.meta.url),
};

export const SOURCE_DEFINITIONS = {
  HackerOne: {
    id: "hackerone",
    name: "HackerOne",
    directoryUrl: "https://www.hackerone.com/bug-bounty-programs",
    pathPrefix: "/bug-bounty-programs",
    parserVersion: "hackerone-cards/v1",
  },
  Sherlock: {
    id: "sherlock",
    name: "Sherlock",
    directoryUrl: "https://audits.sherlock.xyz/bug-bounties",
    pathPrefix: "/bug-bounties",
    parserVersion: "sherlock-cards/v1",
  },
};

const RETAINED_SOURCES = [
  {
    id: "bugcrowd",
    name: "Bugcrowd",
    directoryUrl: "https://bugcrowd.com/engagements",
    dataset: "platform",
    inventoryField: "snapshot_at_utc",
  },
  {
    id: "intigriti",
    name: "Intigriti",
    directoryUrl: "https://www.intigriti.com/researchers/bug-bounty-programs",
    dataset: "platform",
    inventoryField: "snapshot_at_utc",
  },
  {
    id: "yeswehack",
    name: "YesWeHack",
    directoryUrl: "https://yeswehack.com/programs",
    dataset: "platform",
    inventoryField: "snapshot_at_utc",
  },
  {
    id: "hackenproof",
    name: "HackenProof",
    directoryUrl: "https://hackenproof.com/programs",
    dataset: "platform",
    inventoryField: "snapshot_at_utc",
  },
  {
    id: "immunefi",
    name: "Immunefi",
    directoryUrl: "https://immunefi.com/bug-bounty/",
    dataset: "web3",
    inventoryField: "generated_at",
  },
  {
    id: "cantina",
    name: "Cantina",
    directoryUrl: "https://cantina.xyz/opportunities/bounties",
    dataset: "web3",
    inventoryField: "generated_at",
  },
];

export class RefreshError extends Error {
  constructor(code, details = {}) {
    super(code);
    this.name = "RefreshError";
    this.code = code;
    this.details = details;
  }
}

function errorCode(error) {
  return error instanceof RefreshError ? error.code : "unexpected_error";
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function serializeJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function compareAscii(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function normalizeWhitespace(value) {
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/u.test(value)) {
    throw new RefreshError("text_contains_control_character");
  }
  return value.normalize("NFC").replace(/\s+/gu, " ").trim();
}

function assertSafeName(value) {
  const normalized = normalizeWhitespace(value);
  if (!normalized || normalized.length > 200) throw new RefreshError("program_name_invalid");
  return normalized;
}

function attribute(node, name) {
  return node.attrs?.find((entry) => entry.name.toLowerCase() === name)?.value ?? null;
}

function classTokens(node) {
  return new Set((attribute(node, "class") ?? "").split(/\s+/u).filter(Boolean));
}

function hasClasses(node, required) {
  const tokens = classTokens(node);
  return required.every((name) => tokens.has(name));
}

function* elementNodes(root) {
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (node?.tagName) yield node;
    const children = node?.childNodes ?? [];
    for (let index = children.length - 1; index >= 0; index -= 1) stack.push(children[index]);
  }
}

function nodeText(root) {
  const values = [];
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (node?.nodeName === "#text") values.push(node.value ?? "");
    const children = node?.childNodes ?? [];
    for (let index = children.length - 1; index >= 0; index -= 1) stack.push(children[index]);
  }
  return normalizeWhitespace(values.join(""));
}

function assertCompleteHtmlDocument(html) {
  if (!/<\/body\s*>\s*<\/html\s*>\s*$/iu.test(html)) {
    throw new RefreshError("html_document_incomplete");
  }
}

function parseHtmlDocument(html) {
  assertCompleteHtmlDocument(html);
  return parse(html, { scriptingEnabled: false });
}

function descendantByClasses(root, required) {
  return [...elementNodes(root)].find((node) => node !== root && hasClasses(node, required)) ?? null;
}

function descendantByTag(root, tagName) {
  return [...elementNodes(root)].find((node) => node !== root && node.tagName === tagName) ?? null;
}

function paginationContainer(node) {
  const marker = `${attribute(node, "id") ?? ""} ${attribute(node, "class") ?? ""}`;
  return /(?:^|[\s_-])(pagination|pager)(?:$|[\s_-])/iu.test(marker);
}

function insidePagination(node) {
  for (let current = node?.parentNode; current; current = current.parentNode) {
    if (paginationContainer(current)) return true;
  }
  return false;
}

function disabledControl(node) {
  return (
    attribute(node, "disabled") !== null ||
    (attribute(node, "aria-disabled") ?? "").toLowerCase() === "true" ||
    classTokens(node).has("disabled") ||
    classTokens(node.parentNode ?? {}).has("disabled")
  );
}

function canonicalUrl(value) {
  const url = new URL(value);
  url.hash = "";
  url.hostname = url.hostname.toLowerCase();
  if (url.pathname.length > 1) url.pathname = url.pathname.replace(/\/+$/u, "");
  return url.href;
}

function canonicalPaginationUrl(value) {
  const url = new URL(canonicalUrl(value));
  const entries = [...url.searchParams.entries()].sort(
    ([leftKey, leftValue], [rightKey, rightValue]) =>
      compareAscii(leftKey, rightKey) || compareAscii(leftValue, rightValue),
  );
  url.search = "";
  for (const [key, entryValue] of entries) url.searchParams.append(key, entryValue);
  return url.href;
}

function evidenceUrl(value) {
  const url = new URL(value);
  url.username = "";
  url.password = "";
  url.search = "";
  url.hash = "";
  return url.href;
}

function hackerOneProgramUrl(value) {
  const url = new URL(value);
  if (
    url.protocol !== "https:" ||
    url.hostname.toLowerCase() !== "hackerone.com" ||
    url.port ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    throw new RefreshError("hackerone_program_url_invalid");
  }
  const parts = url.pathname.split("/").filter(Boolean);
  if (parts.length !== 1 || !/^[a-z0-9_-]+$/iu.test(parts[0])) {
    throw new RefreshError("hackerone_program_url_invalid");
  }
  return `https://hackerone.com/${parts[0]}`;
}

function sherlockProgramUrl(value, pageUrl) {
  const url = new URL(value, pageUrl);
  if (
    url.protocol !== "https:" ||
    url.hostname.toLowerCase() !== "audits.sherlock.xyz" ||
    url.port ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    throw new RefreshError("sherlock_program_url_invalid");
  }
  const match = /^\/bug-bounties\/(\d+)\/?$/u.exec(url.pathname);
  if (!match) throw new RefreshError("sherlock_program_url_invalid");
  return { id: match[1], url: `https://audits.sherlock.xyz/bug-bounties/${match[1]}` };
}

function nextPageFromDocument(document, pageUrl) {
  const candidates = new Set();
  const containers = [];
  let disabledNext = false;

  for (const node of elementNodes(document)) {
    if (paginationContainer(node)) containers.push(node);
    if (!["a", "link", "button"].includes(node.tagName)) continue;
    const rel = new Set((attribute(node, "rel") ?? "").toLowerCase().split(/\s+/u));
    const ariaLabel = (attribute(node, "aria-label") ?? "").trim().toLowerCase();
    const label = nodeText(node).toLowerCase();
    const identifiesNext =
      rel.has("next") ||
      /^next(?: page)?$/u.test(ariaLabel) ||
      (insidePagination(node) && /^next(?:\s*[›»→])?$/u.test(label));
    if (!identifiesNext) continue;
    if (disabledControl(node)) {
      disabledNext = true;
      continue;
    }
    const href = attribute(node, "href");
    if (!href) throw new RefreshError("pagination_url_missing");
    try {
      candidates.add(canonicalPaginationUrl(new URL(href, pageUrl).href));
    } catch {
      throw new RefreshError("pagination_url_invalid");
    }
  }

  if (candidates.size > 1) throw new RefreshError("pagination_next_ambiguous");
  if (candidates.size === 1) return candidates.values().next().value;
  if (disabledNext) return null;
  const unknownActiveControl = containers.some((container) =>
    [...elementNodes(container)].some(
      (node) =>
        node !== container &&
        ["a", "button"].includes(node.tagName) &&
        !disabledControl(node) &&
        Boolean(attribute(node, "href") ?? attribute(node, "data-page")),
    ),
  );
  if (unknownActiveControl) throw new RefreshError("pagination_terminal_unproved");
  return null;
}

export function findNextPage(html, pageUrl) {
  return nextPageFromDocument(parseHtmlDocument(html), pageUrl);
}

export function parseHackerOnePage(html, pageUrl = SOURCE_DEFINITIONS.HackerOne.directoryUrl) {
  const document = parseHtmlDocument(html);
  const cards = [...elementNodes(document)].filter(
    (node) => node.tagName === "a" && classTokens(node).has("bug-bounty-list-item"),
  );
  if (!cards.length) throw new RefreshError("hackerone_cards_missing");

  const itemNumbers = [];
  const records = [];
  for (const card of cards) {
    const item = attribute(card, "data-item") ?? "";
    if (!/^\d+$/u.test(item)) throw new RefreshError("hackerone_card_index_invalid");
    itemNumbers.push(Number.parseInt(item, 10));
    const url = hackerOneProgramUrl(attribute(card, "href") ?? "");
    const visibleNameNode = descendantByClasses(card, ["bug-bounty-list-item-name"]);
    const visibleName = visibleNameNode ? nodeText(visibleNameNode) : "";
    const attributeName = normalizeWhitespace(attribute(card, "data-item-name") ?? "");
    const name = assertSafeName(visibleName || attributeName);
    if (visibleName && attributeName && visibleName !== attributeName) {
      throw new RefreshError("hackerone_program_name_conflict");
    }
    const offerNode = descendantByClasses(card, ["bug-bounty-list-item-meta-item", "bounties"]);
    if (offerNode && nodeText(offerNode) === "Offers bounties") {
      records.push({
        id: `hackerone:${new URL(url).pathname.slice(1)}`,
        name,
        url,
      });
    }
  }

  const uniqueItems = [...new Set(itemNumbers)].sort((left, right) => left - right);
  if (uniqueItems.length !== itemNumbers.length) throw new RefreshError("hackerone_card_index_duplicate");
  for (let index = 1; index < uniqueItems.length; index += 1) {
    if (uniqueItems[index] !== uniqueItems[index - 1] + 1) {
      throw new RefreshError("hackerone_card_index_gap");
    }
  }
  if (!records.length) throw new RefreshError("hackerone_bounty_cards_missing");

  return {
    records,
    rawCount: records.length,
    directoryItems: cards.length,
    nextUrl: nextPageFromDocument(document, pageUrl),
  };
}

export function parseSherlockPage(html, pageUrl = SOURCE_DEFINITIONS.Sherlock.directoryUrl) {
  const document = parseHtmlDocument(html);
  const records = [];
  for (const anchor of elementNodes(document)) {
    const href = attribute(anchor, "href");
    if (anchor.tagName !== "a" || !classTokens(anchor).has("block") || !href) continue;
    let identity;
    try {
      identity = sherlockProgramUrl(href, pageUrl);
    } catch (error) {
      if (/^\/?bug-bounties\//u.test(href)) throw error;
      continue;
    }
    const heading = descendantByTag(anchor, "h2");
    const image = descendantByTag(anchor, "img");
    const name = heading ? nodeText(heading) : normalizeWhitespace(attribute(image ?? {}, "alt") ?? "");
    records.push({
      id: `sherlock:${identity.id}`,
      name: assertSafeName(name),
      url: identity.url,
    });
  }
  if (!records.length) throw new RefreshError("sherlock_cards_missing");
  return {
    records,
    rawCount: records.length,
    directoryItems: records.length,
    nextUrl: nextPageFromDocument(document, pageUrl),
  };
}

function directoryPageAllowed(value, definition) {
  const url = validateNetworkUrl(value);
  const expected = new URL(definition.directoryUrl);
  if (url.origin !== expected.origin) throw new RefreshError("directory_origin_not_allowed");
  if (
    url.pathname !== definition.pathPrefix &&
    !url.pathname.startsWith(`${definition.pathPrefix}/`)
  ) {
    throw new RefreshError("directory_path_not_allowed");
  }
  return url;
}

export async function crawlPaginatedInventory({
  definition,
  parser,
  fetchPage,
  maxPages = MAX_PAGES_PER_SOURCE,
  maxBytes = MAX_BYTES_PER_SOURCE,
}) {
  const seenPages = new Set();
  const recordsByUrl = new Map();
  const pages = [];
  let rawCount = 0;
  let directoryItems = 0;
  let totalBytes = 0;
  let current = canonicalPaginationUrl(definition.directoryUrl);

  while (current) {
    current = canonicalPaginationUrl(current);
    directoryPageAllowed(current, definition);
    if (seenPages.has(current)) throw new RefreshError("pagination_cycle");
    if (pages.length >= maxPages) throw new RefreshError("pagination_page_cap");
    seenPages.add(current);

    const fetched = await fetchPage(current, pages.length);
    const html = typeof fetched === "string" ? fetched : fetched.html;
    const bytes = typeof fetched === "string" ? Buffer.byteLength(fetched) : fetched.bytes;
    totalBytes += bytes;
    if (totalBytes > maxBytes) throw new RefreshError("source_byte_cap");
    const parsed = parser(html, current);
    rawCount += parsed.rawCount;
    directoryItems += parsed.directoryItems;

    for (const record of parsed.records) {
      const key = canonicalUrl(record.url);
      const previous = recordsByUrl.get(key);
      if (previous && (previous.name !== record.name || previous.id !== record.id)) {
        throw new RefreshError("duplicate_program_conflict");
      }
      recordsByUrl.set(key, record);
    }

    pages.push({
      index: pages.length + 1,
      url: canonicalPaginationUrl(current),
      fetched_at_utc: typeof fetched === "string" ? null : fetched.fetchedAt,
      http_status: typeof fetched === "string" ? 200 : fetched.status,
      bytes,
      sha256: sha256(html),
    });
    current = parsed.nextUrl;
  }

  return {
    records: [...recordsByUrl.values()].sort(
      (left, right) =>
        compareAscii(left.name.toLowerCase(), right.name.toLowerCase()) ||
        compareAscii(left.name, right.name) ||
        compareAscii(left.id, right.id),
    ),
    rawCount,
    deduplicatedCount: recordsByUrl.size,
    duplicatesRemoved: rawCount - recordsByUrl.size,
    directoryItems,
    pages,
    bytes: totalBytes,
  };
}

export function validateNetworkUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new RefreshError("network_url_invalid");
  }
  const hostname = url.hostname.replace(/^\[|\]$/gu, "");
  if (
    url.protocol !== "https:" ||
    (url.port && url.port !== "443") ||
    url.username ||
    url.password ||
    !hostname ||
    isIP(hostname)
  ) {
    throw new RefreshError("network_url_not_public_https");
  }
  return url;
}

function ipv4Number(address) {
  const parts = address.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) {
    return null;
  }
  return (((parts[0] * 256 + parts[1]) * 256 + parts[2]) * 256 + parts[3]) >>> 0;
}

function inIpv4Cidr(value, base, bits) {
  const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
  return (value & mask) === (base & mask);
}

export function isPublicAddress(address) {
  const family = isIP(address);
  if (family === 4) {
    const value = ipv4Number(address);
    const blocked = [
      ["0.0.0.0", 8],
      ["10.0.0.0", 8],
      ["100.64.0.0", 10],
      ["127.0.0.0", 8],
      ["169.254.0.0", 16],
      ["172.16.0.0", 12],
      ["192.0.0.0", 24],
      ["192.0.2.0", 24],
      ["192.88.99.0", 24],
      ["192.168.0.0", 16],
      ["198.18.0.0", 15],
      ["198.51.100.0", 24],
      ["203.0.113.0", 24],
      ["224.0.0.0", 4],
      ["240.0.0.0", 4],
    ];
    return value !== null && !blocked.some(([base, bits]) => inIpv4Cidr(value, ipv4Number(base), bits));
  }
  if (family === 6) {
    const normalized = address.toLowerCase();
    if (normalized.startsWith("::ffff:")) return isPublicAddress(normalized.slice(7));
    if (normalized === "::" || normalized === "::1" || normalized.startsWith("2001:db8:")) return false;
    const first = Number.parseInt(normalized.split(":", 1)[0] || "0", 16);
    return first >= 0x2000 && first <= 0x3fff;
  }
  return false;
}

async function withTimeout(promise, code) {
  let timeout;
  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => {
        timeout = setTimeout(() => reject(new RefreshError(code)), TIMEOUT_MS);
      }),
    ]);
  } finally {
    clearTimeout(timeout);
  }
}

async function publicAddresses(hostname, context) {
  if (!context.dns.has(hostname)) {
    context.dns.set(
      hostname,
      withTimeout(lookup(hostname, { all: true, verbatim: true }), "dns_timeout").then((records) => {
        const unique = [...new Map(records.map((record) => [`${record.family}:${record.address}`, record])).values()]
          .sort((left, right) => left.family - right.family || compareAscii(left.address, right.address));
        if (!unique.length || unique.some((record) => !isPublicAddress(record.address))) {
          throw new RefreshError("dns_not_public");
        }
        return unique;
      }),
    );
  }
  return context.dns.get(hostname);
}

function createNetworkContext() {
  return {
    dns: new Map(),
    queues: new Map(),
    lastRequestAt: new Map(),
    originDelay: new Map(),
    requestCounts: new Map(),
    robots: new Map(),
    haltedOrigins: new Map(),
  };
}

async function scheduleOrigin(url, context, operation) {
  const origin = url.origin;
  const previous = context.queues.get(origin) ?? Promise.resolve();
  const task = previous.catch(() => {}).then(async () => {
    const halted = context.haltedOrigins.get(origin);
    if (halted) throw new RefreshError(halted);
    const requests = context.requestCounts.get(origin) ?? 0;
    if (requests >= MAX_REQUESTS_PER_ORIGIN) {
      context.haltedOrigins.set(origin, "origin_request_cap");
      throw new RefreshError("origin_request_cap");
    }
    const delay = context.originDelay.get(origin) ?? MIN_ORIGIN_DELAY_MS;
    const elapsed = Date.now() - (context.lastRequestAt.get(origin) ?? 0);
    if (elapsed < delay) await new Promise((done) => setTimeout(done, delay - elapsed));
    context.lastRequestAt.set(origin, Date.now());
    context.requestCounts.set(origin, requests + 1);
    return operation();
  });
  context.queues.set(origin, task.then(() => undefined, () => undefined));
  return task;
}

function responseHeaders(response) {
  const value = (name) => {
    const header = response.headers[name];
    return Array.isArray(header) ? header[0] : header ?? null;
  };
  return {
    contentType: value("content-type"),
    contentLength: value("content-length"),
    location: value("location"),
    retryAfter: value("retry-after"),
  };
}

async function requestOnce(url, context, { readBody, maxBytes, headers = {} }) {
  return scheduleOrigin(url, context, async () => {
    const addresses = await publicAddresses(url.hostname, context);
    return new Promise((resolveRequest, rejectRequest) => {
      let settled = false;
      let timeout;
      const finish = (callback, value) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        callback(value);
      };
      const request = httpsRequest(
        url,
        {
          method: "GET",
          agent: false,
          headers: {
            "user-agent": USER_AGENT,
            accept: "text/html,application/xhtml+xml,text/plain;q=0.9",
            "accept-encoding": "identity",
            ...headers,
          },
          lookup: (_hostname, options, callback) => {
            const requestedFamily = typeof options === "number" ? options : options?.family;
            const candidates = requestedFamily
              ? addresses.filter((record) => record.family === requestedFamily)
              : addresses;
            if (!candidates.length) {
              callback(new Error("no public address for requested family"));
              return;
            }
            if (typeof options === "object" && options?.all) callback(null, candidates);
            else callback(null, candidates[0].address, candidates[0].family);
          },
          servername: url.hostname,
        },
        (response) => {
          const status = response.statusCode ?? 0;
          const selectedHeaders = responseHeaders(response);
          const isRedirect = [301, 302, 303, 307, 308].includes(status);
          if (!readBody || isRedirect) {
            response.destroy();
            finish(resolveRequest, { status, headers: selectedHeaders, body: "", bytes: 0 });
            return;
          }
          const declaredLength = Number.parseInt(selectedHeaders.contentLength ?? "0", 10);
          if (declaredLength > maxBytes) {
            response.destroy();
            finish(rejectRequest, new RefreshError("response_body_too_large"));
            return;
          }
          const chunks = [];
          let bytes = 0;
          response.on("data", (chunk) => {
            bytes += chunk.length;
            if (bytes > maxBytes) {
              response.destroy();
              finish(rejectRequest, new RefreshError("response_body_too_large"));
              return;
            }
            chunks.push(chunk);
          });
          response.on("end", () => {
            finish(resolveRequest, {
              status,
              headers: selectedHeaders,
              body: Buffer.concat(chunks, bytes).toString("utf8"),
              bytes,
            });
          });
          response.on("error", () => finish(rejectRequest, new RefreshError("response_stream_error")));
        },
      );
      request.on("error", () => finish(rejectRequest, new RefreshError("network_request_failed")));
      timeout = setTimeout(() => {
        request.destroy();
        finish(rejectRequest, new RefreshError("network_request_timeout"));
      }, TIMEOUT_MS);
      request.end();
    });
  });
}

function pathAllowed(url, policy) {
  const prefix = policy.pathPrefixes.get(url.origin);
  return Boolean(prefix) && (prefix === "/" || url.pathname === prefix || url.pathname.startsWith(`${prefix}/`));
}

function validateAgainstPolicy(value, policy) {
  const url = validateNetworkUrl(value);
  if (!policy.origins.has(url.origin) || !pathAllowed(url, policy)) {
    throw new RefreshError("redirect_or_path_not_allowed");
  }
  return url;
}

async function requestWithoutRobots(value, context, options, policy) {
  let current = validateAgainstPolicy(value, policy);
  const seen = new Set();
  for (let redirects = 0; ; redirects += 1) {
    if (seen.has(current.href)) throw new RefreshError("redirect_cycle");
    seen.add(current.href);
    const response = await requestOnce(current, context, options);
    if (response.headers.retryAfter) {
      context.haltedOrigins.set(current.origin, "retry_after_received");
      throw new RefreshError("retry_after_received", {
        retryAfterSeconds: /^\d+$/u.test(response.headers.retryAfter)
          ? Math.min(Number(response.headers.retryAfter), 86_400)
          : null,
      });
    }
    if (![301, 302, 303, 307, 308].includes(response.status)) return { ...response, url: current };
    if (redirects >= MAX_REDIRECTS) throw new RefreshError("redirect_cap");
    if (!response.headers.location) throw new RefreshError("redirect_location_missing");
    current = validateAgainstPolicy(new URL(response.headers.location, current).href, policy);
  }
}

function parseRobots(text) {
  if (text.includes("\0")) throw new RefreshError("robots_invalid");
  const groups = [];
  let group = { agents: [], rules: [], crawlDelay: null };
  let sawRule = false;
  const flush = () => {
    if (group.agents.length) groups.push(group);
    group = { agents: [], rules: [], crawlDelay: null };
    sawRule = false;
  };
  for (const rawLine of text.split(/\r?\n/u)) {
    const line = rawLine.replace(/#.*$/u, "").trim();
    if (!line) continue;
    const separator = line.indexOf(":");
    if (separator < 0) throw new RefreshError("robots_invalid");
    const field = line.slice(0, separator).trim().toLowerCase();
    const value = line.slice(separator + 1).trim();
    if (field === "user-agent") {
      if (sawRule) flush();
      if (!value) throw new RefreshError("robots_invalid");
      group.agents.push(value.toLowerCase());
      continue;
    }
    if (!group.agents.length) continue;
    if (field === "allow" || field === "disallow") {
      sawRule = true;
      if (value) group.rules.push({ kind: field, pattern: value });
    } else if (field === "crawl-delay") {
      sawRule = true;
      const seconds = Number(value);
      if (!Number.isFinite(seconds) || seconds < 0) throw new RefreshError("robots_invalid");
      group.crawlDelay = seconds;
    }
  }
  flush();
  return groups;
}

function robotsPattern(pattern) {
  const anchored = pattern.endsWith("$");
  const source = (anchored ? pattern.slice(0, -1) : pattern)
    .split("*")
    .map((part) => part.replace(/[|\\{}()[\]^$+?.]/gu, "\\$&"))
    .join(".*");
  return {
    expression: new RegExp(`^${source}${anchored ? "$" : ""}`, "u"),
    specificity: pattern.replace(/[\*$]/gu, "").length,
  };
}

export function robotsDecision(text, targetPath, userAgent = ROBOTS_AGENT) {
  const groups = parseRobots(text);
  const matches = [];
  for (const group of groups) {
    for (const agent of group.agents) {
      if (agent === "*" || userAgent.toLowerCase().startsWith(agent)) {
        matches.push({ group, specificity: agent === "*" ? 0 : agent.length });
      }
    }
  }
  if (!matches.length) return { allowed: true, crawlDelaySeconds: 0, matched: null };
  const bestAgent = Math.max(...matches.map((match) => match.specificity));
  const applicable = matches.filter((match) => match.specificity === bestAgent).map((match) => match.group);
  const rules = [];
  let crawlDelaySeconds = 0;
  for (const group of applicable) {
    if (group.crawlDelay !== null) crawlDelaySeconds = Math.max(crawlDelaySeconds, group.crawlDelay);
    for (const rule of group.rules) {
      const compiled = robotsPattern(rule.pattern);
      if (compiled.expression.test(targetPath)) rules.push({ ...rule, ...compiled });
    }
  }
  rules.sort(
    (left, right) =>
      right.specificity - left.specificity ||
      (left.kind === right.kind ? 0 : left.kind === "allow" ? -1 : 1),
  );
  const matched = rules[0] ?? null;
  return {
    allowed: !matched || matched.kind === "allow",
    crawlDelaySeconds,
    matched: matched ? { kind: matched.kind, pattern: matched.pattern } : null,
  };
}

async function robotsForOrigin(origin, context) {
  if (!context.robots.has(origin)) {
    context.robots.set(
      origin,
      (async () => {
        const robotsUrl = new URL("/robots.txt", origin);
        const policy = {
          origins: new Set([robotsUrl.origin]),
          pathPrefixes: new Map([[robotsUrl.origin, "/robots.txt"]]),
        };
        const response = await requestWithoutRobots(
          robotsUrl.href,
          context,
          { readBody: true, maxBytes: MAX_ROBOTS_BYTES },
          policy,
        );
        if (response.status !== 200) throw new RefreshError("robots_unavailable");
        if (response.headers.contentType && !/^text\//iu.test(response.headers.contentType)) {
          throw new RefreshError("robots_content_type_invalid");
        }
        parseRobots(response.body);
        return response.body;
      })(),
    );
  }
  return context.robots.get(origin);
}

function challengeMarkup(html) {
  return /<title[^>]*>\s*(?:just a moment|attention required|access denied)|cf-chl-|challenge-platform|hcaptcha|g-recaptcha/iu.test(
    html,
  );
}

async function fetchPermitted(value, context, options, policy) {
  let current = validateAgainstPolicy(value, policy);
  const seen = new Set();
  for (let redirects = 0; ; redirects += 1) {
    if (seen.has(current.href)) throw new RefreshError("redirect_cycle");
    seen.add(current.href);
    const robots = await robotsForOrigin(current.origin, context);
    const decision = robotsDecision(robots, `${current.pathname}${current.search}`);
    if (!decision.allowed) throw new RefreshError("robots_disallowed");
    if (decision.crawlDelaySeconds > 60) throw new RefreshError("robots_crawl_delay_excessive");
    context.originDelay.set(
      current.origin,
      Math.max(MIN_ORIGIN_DELAY_MS, Math.ceil(decision.crawlDelaySeconds * 1_000)),
    );

    const response = await requestOnce(current, context, options);
    if ([401, 403, 429].includes(response.status)) {
      const code = response.status === 429 ? "rate_limited" : "access_denied";
      context.haltedOrigins.set(current.origin, code);
      throw new RefreshError(code);
    }
    if (response.headers.retryAfter) {
      context.haltedOrigins.set(current.origin, "retry_after_received");
      throw new RefreshError("retry_after_received", {
        retryAfterSeconds: /^\d+$/u.test(response.headers.retryAfter)
          ? Math.min(Number(response.headers.retryAfter), 86_400)
          : null,
      });
    }
    if (![301, 302, 303, 307, 308].includes(response.status)) {
      if (options.readBody && challengeMarkup(response.body)) {
        context.haltedOrigins.set(current.origin, "access_challenge");
        throw new RefreshError("access_challenge");
      }
      return { ...response, url: current };
    }
    if (redirects >= MAX_REDIRECTS) throw new RefreshError("redirect_cap");
    if (!response.headers.location) throw new RefreshError("redirect_location_missing");
    current = validateAgainstPolicy(new URL(response.headers.location, current).href, policy);
  }
}

function sourcePolicy(definition) {
  const url = new URL(definition.directoryUrl);
  return {
    origins: new Set([url.origin]),
    pathPrefixes: new Map([[url.origin, definition.pathPrefix]]),
  };
}

function singleUrlPolicy(value) {
  const url = validateNetworkUrl(value);
  return {
    origins: new Set([url.origin]),
    pathPrefixes: new Map([[url.origin, url.pathname || "/"]]),
  };
}

async function fetchDirectoryPage(url, attemptedAt, definition, context) {
  const response = await fetchPermitted(
    url,
    context,
    { readBody: true, maxBytes: MAX_BYTES_PER_PAGE },
    sourcePolicy(definition),
  );
  if (response.status < 200 || response.status >= 300) {
    throw new RefreshError("directory_http_error", { status: response.status });
  }
  if (response.headers.contentType && !/^text\/html\b/iu.test(response.headers.contentType)) {
    throw new RefreshError("directory_content_type_invalid");
  }
  return {
    html: response.body,
    bytes: response.bytes,
    status: response.status,
    fetchedAt: attemptedAt,
  };
}

function replaceSourceRecords(records, sourceName, replacements, field = "platform") {
  const firstIndex = records.findIndex((record) => record[field] === sourceName);
  const retained = records.filter((record) => record[field] !== sourceName);
  const insertion = firstIndex < 0 ? retained.length : firstIndex;
  retained.splice(insertion, 0, ...replacements);
  return retained;
}

function reconcileLiveRecords(previousRecords, candidateRecords) {
  if (!candidateRecords.length) throw new RefreshError("candidate_inventory_empty");
  const previousUrls = new Set(
    previousRecords.map((record) => canonicalUrl(record.url ?? record.program_url)),
  );
  const candidateUrls = new Set();
  for (const record of candidateRecords) {
    const key = canonicalUrl(record.url ?? record.program_url);
    if (candidateUrls.has(key)) throw new RefreshError("candidate_inventory_duplicate_url");
    candidateUrls.add(key);
  }
  const added = [...candidateUrls].filter((url) => !previousUrls.has(url)).sort(compareAscii);
  const removed = [...previousUrls].filter((url) => !candidateUrls.has(url)).sort(compareAscii);
  const churn = (added.length + removed.length) / Math.max(previousUrls.size, candidateUrls.size, 1);
  if (churn > MAX_INVENTORY_CHURN) {
    throw new RefreshError("candidate_inventory_implausible_churn", {
      added: added.length,
      removed: removed.length,
      churn,
    });
  }
  return { added, removed, churn };
}

async function refreshLiveSource({ definition, parser, previousRecords, context, attemptedAt }) {
  try {
    const crawled = await crawlPaginatedInventory({
      definition,
      parser,
      fetchPage: (url) => fetchDirectoryPage(url, attemptedAt, definition, context),
    });
    const drift = reconcileLiveRecords(previousRecords, crawled.records);
    return { ok: true, ...crawled, drift, failureCodes: [] };
  } catch (error) {
    return {
      ok: false,
      records: previousRecords,
      rawCount: null,
      deduplicatedCount: previousRecords.length,
      duplicatesRemoved: null,
      directoryItems: null,
      pages: [],
      bytes: 0,
      drift: null,
      failureCodes: [errorCode(error)],
    };
  }
}

export function independentEligibilityReason(program) {
  if (program.status !== "active") return `status:${program.status}`;
  if (program.confidence !== "high") return `confidence:${program.confidence}`;
  if (program.participation === "public_needs_confirmation") return "participation_needs_confirmation";
  if (!program.paid_status.includes("cash") && !program.paid_status.includes("rewards")) {
    return "paid_reward_not_explicit";
  }
  return null;
}

async function checkFirstPartyProgram(program, attemptedAt, context) {
  const reason = independentEligibilityReason(program);
  if (reason) {
    return {
      id: program.id,
      url: evidenceUrl(program.official_url),
      attempted_at_utc: null,
      status: "excluded_by_board_policy",
      reason,
    };
  }
  try {
    const response = await fetchPermitted(
      program.official_url,
      context,
      { readBody: false, maxBytes: 0, headers: { range: "bytes=0-4095" } },
      singleUrlPolicy(program.official_url),
    );
    const status =
      response.status === 404 || response.status === 410
        ? "missing"
        : response.status >= 200 && response.status < 300
          ? "reachable"
          : "http_error";
    return {
      id: program.id,
      url: evidenceUrl(program.official_url),
      attempted_at_utc: attemptedAt,
      status,
      http_status: response.status,
    };
  } catch (error) {
    return {
      id: program.id,
      url: evidenceUrl(program.official_url),
      attempted_at_utc: attemptedAt,
      status: errorCode(error),
    };
  }
}

async function mapLimit(items, mapper) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (next < items.length) {
        const index = next;
        next += 1;
        results[index] = await mapper(items[index], index);
      }
    }),
  );
  return results;
}

function sourceCount(records, sourceName, field = "platform") {
  return records.filter((record) => record[field] === sourceName).length;
}

function retainedSourceRecords(platform, web3, attemptedAt) {
  return RETAINED_SOURCES.map((source) => {
    const dataset = source.dataset === "platform" ? platform : web3;
    const records = source.dataset === "platform" ? platform.programs : web3.records;
    return {
      source_id: source.id,
      name: source.name,
      directory_url: source.directoryUrl,
      access_mode: "retained_permission_limited",
      status: "policy_limited_snapshot_retained",
      complete: false,
      attempted_at_utc: attemptedAt,
      checked_at_utc: null,
      inventory_at_utc: dataset[source.inventoryField] ?? null,
      count: sourceCount(records, source.name),
      raw_count: null,
      deduplicated_count: sourceCount(records, source.name),
      duplicates_removed: null,
      pages: [],
      failure_codes: ["reuse_or_crawl_permission_not_recorded"],
      retention: "Last verified snapshot retained; no inventory request was made.",
    };
  });
}

function liveSourceRecord(definition, result, previousInventoryAt, attemptedAt) {
  return {
    source_id: definition.id,
    name: definition.name,
    directory_url: definition.directoryUrl,
    access_mode: "live_public_inventory",
    parser_version: definition.parserVersion,
    status: result.ok
      ? result.drift.added.length || result.drift.removed.length
        ? "live_inventory_promoted"
        : "live_inventory_unchanged"
      : "live_refresh_failed_snapshot_retained",
    complete: result.ok,
    attempted_at_utc: attemptedAt,
    checked_at_utc: result.ok ? attemptedAt : null,
    inventory_at_utc: result.ok ? attemptedAt : previousInventoryAt,
    count: result.records.length,
    raw_count: result.rawCount,
    deduplicated_count: result.deduplicatedCount,
    duplicates_removed: result.duplicatesRemoved,
    directory_items_seen: result.directoryItems,
    pages: result.pages,
    drift: result.drift,
    failure_codes: result.failureCodes,
    retention: result.ok ? null : "Last verified snapshot retained byte-for-byte for this source.",
  };
}

function firstPartySourceRecord(independent, checks, attemptedAt) {
  const eligible = checks.filter((check) => check.status !== "excluded_by_board_policy");
  const reachable = eligible.filter((check) => check.status === "reachable").length;
  const failures = eligible.filter((check) => check.status !== "reachable");
  return {
    source_id: "first-party",
    name: "First-party",
    directory_url:
      "https://github.com/VeigaPunk/open-bug-bounties/blob/main/data/independent_programs.json",
    access_mode: "public_policy_checks",
    status: failures.length ? "partial_last_good_retained" : "checks_complete",
    complete: failures.length === 0,
    attempted_at_utc: attemptedAt,
    checked_at_utc: attemptedAt,
    inventory_at_utc: null,
    count: eligible.length,
    configured_count: independent.programs.length,
    excluded_count: checks.length - eligible.length,
    checked_count: eligible.length,
    reachable_count: reachable,
    raw_count: null,
    deduplicated_count: eligible.length,
    duplicates_removed: 0,
    pages: checks,
    failure_codes: [...new Set(failures.map((failure) => failure.status))].sort(compareAscii),
    retention: "Failed or missing checks never remove a listing automatically.",
  };
}

function summarizeDatasetDuplicates(platform, web3, independent) {
  const eligibleIndependent = independent.programs.filter(
    (program) => independentEligibilityReason(program) === null,
  );
  const urls = [
    ...platform.programs.map((record) => record.url),
    ...web3.records.map((record) => record.program_url),
    ...eligibleIndependent.map((record) => record.official_url),
  ];
  const unique = new Set(urls.map(canonicalUrl));
  return {
    records: urls.length,
    canonical_urls: unique.size,
    duplicate_urls: urls.length - unique.size,
    independent_configured: independent.programs.length,
    independent_eligible: eligibleIndependent.length,
  };
}

async function stageGeneration(entries, runId) {
  const staged = [];
  try {
    for (const [file, content] of entries) {
      const temporary = new URL(`.${basename(file.pathname)}.${process.pid}.${runId}.tmp`, file);
      await writeFile(temporary, content, { flag: "wx" });
      staged.push([temporary, file]);
    }
    for (const [temporary, file] of staged) await rename(temporary, file);
  } finally {
    await Promise.all(staged.map(([temporary]) => rm(temporary, { force: true })));
  }
}

function evidenceDigest(evidence) {
  const core = { ...evidence };
  delete core.evidence_id;
  return sha256(JSON.stringify(core));
}

export function verifyGeneration({ independent, platform, web3, evidence }, serialized = {}) {
  const runIds = new Set([
    independent.refresh_run_id,
    platform.refresh_run_id,
    web3.refresh_run_id,
    evidence.run_id,
  ]);
  if (runIds.size !== 1 || runIds.has(undefined)) throw new RefreshError("generation_id_mismatch");
  if (evidence.sources.length !== 9 || new Set(evidence.sources.map((source) => source.source_id)).size !== 9) {
    throw new RefreshError("source_coverage_mismatch");
  }
  const recordCounts = {
    independent: independent.programs?.length,
    platform: platform.programs?.length,
    web3: web3.records?.length,
  };
  for (const dataset of evidence.datasets) {
    const content = serialized[dataset.id];
    if (content && sha256(content) !== dataset.sha256) throw new RefreshError("dataset_hash_mismatch");
    if (recordCounts[dataset.id] !== undefined && recordCounts[dataset.id] !== dataset.records) {
      throw new RefreshError("dataset_count_mismatch");
    }
  }
  if (evidence.evidence_id && evidenceDigest(evidence) !== evidence.evidence_id) {
    throw new RefreshError("evidence_hash_mismatch");
  }
  return true;
}

export async function verifyStoredGeneration() {
  const [independentContent, platformContent, web3Content, evidenceContent] = await Promise.all(
    [files.independent, files.platform, files.web3, files.evidence].map((file) =>
      readFile(file, "utf8"),
    ),
  );
  const independent = JSON.parse(independentContent);
  const platform = JSON.parse(platformContent);
  const web3 = JSON.parse(web3Content);
  const evidence = JSON.parse(evidenceContent);
  verifyGeneration(
    { independent, platform, web3, evidence },
    { independent: independentContent, platform: platformContent, web3: web3Content },
  );
  return {
    run_id: evidence.run_id,
    evidence_id: evidence.evidence_id,
    status: evidence.status,
    sources: evidence.sources.length,
  };
}

export async function refreshData({ dryRun = false, now = new Date() } = {}) {
  const [independent, platform, web3] = await Promise.all(
    [files.independent, files.platform, files.web3].map(async (file) =>
      JSON.parse(await readFile(file, "utf8")),
    ),
  );
  const attemptedAt = now.toISOString();
  const runId = `refresh-${attemptedAt.replace(/[-:.]/gu, "")}`;
  const context = createNetworkContext();

  const previousHackerOne = platform.programs.filter((record) => record.platform === "HackerOne");
  const previousSherlock = web3.records.filter((record) => record.platform === "Sherlock");
  const [hackerOneResult, sherlockResult, firstPartyChecks] = await Promise.all([
    refreshLiveSource({
      definition: SOURCE_DEFINITIONS.HackerOne,
      parser: parseHackerOnePage,
      previousRecords: previousHackerOne.map((record) => ({
        id: record.id,
        name: record.name,
        url: record.url,
      })),
      context,
      attemptedAt,
    }),
    refreshLiveSource({
      definition: SOURCE_DEFINITIONS.Sherlock,
      parser: parseSherlockPage,
      previousRecords: previousSherlock.map((record) => ({
        id: record.id,
        name: record.name,
        url: record.program_url,
      })),
      context,
      attemptedAt,
    }),
    mapLimit(independent.programs, (program) => checkFirstPartyProgram(program, attemptedAt, context)),
  ]);

  if (hackerOneResult.ok) {
    const previousByUrl = new Map(previousHackerOne.map((record) => [canonicalUrl(record.url), record]));
    const promoted = hackerOneResult.records.map((record) => ({
      id: record.id,
      platform: "HackerOne",
      name: record.name,
      url: record.url,
      directory_url: SOURCE_DEFINITIONS.HackerOne.directoryUrl,
      industry: previousByUrl.get(canonicalUrl(record.url))?.industry ?? null,
    }));
    platform.programs = replaceSourceRecords(platform.programs, "HackerOne", promoted);
  }

  if (sherlockResult.ok) {
    const previousByUrl = new Map(
      previousSherlock.map((record) => [canonicalUrl(record.program_url), record]),
    );
    const promoted = sherlockResult.records.map((record) => ({
      id: record.id,
      name: record.name,
      platform: "Sherlock",
      program_url: record.url,
      source_directory_url: SOURCE_DEFINITIONS.Sherlock.directoryUrl,
      kyc_required: previousByUrl.get(canonicalUrl(record.url))?.kyc_required ?? null,
    }));
    web3.records = replaceSourceRecords(web3.records, "Sherlock", promoted);
  }

  platform.last_attempted_check_at_utc = attemptedAt;
  platform.source_checks ??= {};
  platform.source_checks.HackerOne = {
    checked_at_utc: hackerOneResult.ok ? attemptedAt : null,
    status: hackerOneResult.ok ? "live_inventory_promoted" : "live_refresh_failed_snapshot_retained",
    inventory_at_utc: hackerOneResult.ok
      ? attemptedAt
      : platform.source_checks.HackerOne?.inventory_at_utc ?? platform.snapshot_at_utc,
    included: hackerOneResult.records.length,
    raw_count: hackerOneResult.rawCount,
    duplicates_removed: hackerOneResult.duplicatesRemoved,
    pages: hackerOneResult.pages.length,
    failure_codes: hackerOneResult.failureCodes,
    consecutive_failures: hackerOneResult.ok
      ? 0
      : (platform.source_checks.HackerOne?.consecutive_failures ?? 0) + 1,
  };
  if (hackerOneResult.ok) platform.last_permitted_check_at_utc = attemptedAt;

  web3.last_attempted_check_at_utc = attemptedAt;
  web3.source_checks ??= {};
  web3.source_checks.Sherlock = {
    checked_at_utc: sherlockResult.ok ? attemptedAt : null,
    status: sherlockResult.ok ? "live_inventory_promoted" : "live_refresh_failed_snapshot_retained",
    inventory_at_utc: sherlockResult.ok
      ? attemptedAt
      : web3.source_checks.Sherlock?.inventory_at_utc ?? web3.generated_at,
    included: sherlockResult.records.length,
    raw_count: sherlockResult.rawCount,
    duplicates_removed: sherlockResult.duplicatesRemoved,
    pages: sherlockResult.pages.length,
    failure_codes: sherlockResult.failureCodes,
    consecutive_failures: sherlockResult.ok
      ? 0
      : (web3.source_checks.Sherlock?.consecutive_failures ?? 0) + 1,
  };
  if (sherlockResult.ok) web3.last_permitted_check_at_utc = attemptedAt;
  web3.counts = Object.fromEntries(
    ["Cantina", "Immunefi", "Sherlock"].map((name) => [name, sourceCount(web3.records, name)]),
  );

  const eligibleFirstParty = firstPartyChecks.filter(
    (check) => check.status !== "excluded_by_board_policy",
  );
  const reachableFirstParty = eligibleFirstParty.filter((check) => check.status === "reachable").length;
  const firstPartyFailures = eligibleFirstParty.filter((check) => check.status !== "reachable");
  independent.last_attempted_check_at_utc = attemptedAt;
  independent.source_check = {
    status: firstPartyFailures.length ? "partial_last_good_retained" : "healthy",
    configured: independent.programs.length,
    checked: eligibleFirstParty.length,
    reachable: reachableFirstParty,
    excluded: firstPartyChecks.length - eligibleFirstParty.length,
    errors: firstPartyFailures.length,
    failure_codes: [...new Set(firstPartyFailures.map((failure) => failure.status))].sort(compareAscii),
    retention: "No listing is removed automatically after a failed or missing check.",
  };
  if (reachableFirstParty) independent.last_permitted_check_at_utc = attemptedAt;

  independent.refresh_run_id = runId;
  platform.refresh_run_id = runId;
  web3.refresh_run_id = runId;

  const hackerOneSource = liveSourceRecord(
    SOURCE_DEFINITIONS.HackerOne,
    hackerOneResult,
    platform.source_checks.HackerOne.inventory_at_utc,
    attemptedAt,
  );
  const sherlockSource = liveSourceRecord(
    SOURCE_DEFINITIONS.Sherlock,
    sherlockResult,
    web3.source_checks.Sherlock.inventory_at_utc,
    attemptedAt,
  );
  const firstPartySource = firstPartySourceRecord(independent, firstPartyChecks, attemptedAt);
  const retainedSources = retainedSourceRecords(platform, web3, attemptedAt);
  const sourceById = new Map(
    [hackerOneSource, sherlockSource, firstPartySource, ...retainedSources].map((source) => [
      source.source_id,
      source,
    ]),
  );
  const sourceOrder = [
    "hackerone",
    "bugcrowd",
    "intigriti",
    "yeswehack",
    "hackenproof",
    "immunefi",
    "cantina",
    "sherlock",
    "first-party",
  ];
  const sources = sourceOrder.map((id) => sourceById.get(id));

  const independentContent = serializeJson(independent);
  const platformContent = serializeJson(platform);
  const web3Content = serializeJson(web3);
  const datasetDuplicates = summarizeDatasetDuplicates(platform, web3, independent);
  const datasets = [
    {
      id: "independent",
      path: "data/independent_programs.json",
      records: independent.programs.length,
      sha256: sha256(independentContent),
    },
    {
      id: "platform",
      path: "data/platform_programs.json",
      records: platform.programs.length,
      sha256: sha256(platformContent),
    },
    {
      id: "web3",
      path: "data/web3_programs.json",
      records: web3.records.length,
      sha256: sha256(web3Content),
    },
  ];
  const evidenceCore = {
    schema_version: 1,
    run_id: runId,
    attempted_at_utc: attemptedAt,
    status: sources.every((source) => source.complete) ? "complete" : "partial",
    coverage: {
      configured_sources: sources.length,
      evaluated_sources: sources.length,
      live_inventory_sources: 2,
      public_policy_sources: 1,
      permission_limited_sources: retainedSources.length,
      complete_sources: sources.filter((source) => source.complete).length,
    },
    totals: {
      ...datasetDuplicates,
      live_raw_candidates:
        (hackerOneResult.rawCount ?? hackerOneResult.records.length) +
        (sherlockResult.rawCount ?? sherlockResult.records.length),
      live_deduplicated_candidates:
        hackerOneResult.deduplicatedCount + sherlockResult.deduplicatedCount,
      live_duplicates_removed:
        (hackerOneResult.duplicatesRemoved ?? 0) + (sherlockResult.duplicatesRemoved ?? 0),
    },
    datasets,
    sources,
  };
  const evidence = {
    ...evidenceCore,
    evidence_id: evidenceDigest(evidenceCore),
  };
  const evidenceContent = serializeJson(evidence);
  verifyGeneration(
    { independent, platform, web3, evidence },
    { independent: independentContent, platform: platformContent, web3: web3Content },
  );

  if (!dryRun) {
    await stageGeneration(
      [
        [files.independent, independentContent],
        [files.platform, platformContent],
        [files.web3, web3Content],
        [files.evidence, evidenceContent],
      ],
      runId,
    );
  }

  return { evidence, independent, platform, web3 };
}

async function main() {
  if (process.argv.includes("--verify")) {
    console.log(JSON.stringify(await verifyStoredGeneration(), null, 2));
    return;
  }
  const dryRun = process.argv.includes("--dry-run");
  const { evidence } = await refreshData({ dryRun });
  console.log(
    JSON.stringify(
      {
        dry_run: dryRun,
        run_id: evidence.run_id,
        evidence_id: evidence.evidence_id,
        attempted_at_utc: evidence.attempted_at_utc,
        status: evidence.status,
        sources: Object.fromEntries(
          evidence.sources.map((source) => [
            source.name,
            {
              status: source.status,
              count: source.count,
              raw_count: source.raw_count,
              duplicates_removed: source.duplicates_removed,
              failure_codes: source.failure_codes,
            },
          ]),
        ),
      },
      null,
      2,
    ),
  );
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : null;
if (invokedPath === import.meta.url) {
  main().catch((error) => {
    console.error(JSON.stringify({ status: "failed", error_code: errorCode(error) }));
    process.exitCode = 1;
  });
}
