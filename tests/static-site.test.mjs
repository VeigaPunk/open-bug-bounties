import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("exports a public, standalone Pages site", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  assert.match(html, /The Bounty Index/);
  assert.match(html, /verified public listings/);
  assert.doesNotMatch(html, /signin-with-chatgpt|oai-authenticated-user/i);
});

test("exports assets below the configured Pages base path", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (basePath) assert.match(html, new RegExp(`${basePath}/_next/`));
});
