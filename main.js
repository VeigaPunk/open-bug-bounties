/* Open Bug Bounties — public board */
(async function () {
  const board = document.getElementById("board");
  const stats = document.getElementById("stats");
  const filters = document.getElementById("filters");
  const pill = document.getElementById("status-pill");

  let data = null;
  let active = "all";

  try {
    const res = await fetch("data/bounties.json", { cache: "no-store" });
    if (!res.ok) throw new Error(String(res.status));
    data = await res.json();
  } catch (e) {
    pill.innerHTML =
      '<span class="dot" style="background:var(--red)"></span> Failed to load bounties.json';
    board.innerHTML = `<li class="card"><p class="snippet">${String(e)}</p></li>`;
    return;
  }

  const when = data.generated_at
    ? new Date(data.generated_at).toISOString().slice(0, 16).replace("T", " ") + "Z"
    : "unknown";
  pill.innerHTML = `<span class="dot"></span> ${data.count} bounties · generated ${when}`;

  const families = ["all", ...new Set((data.bounties || []).map((b) => b.family))].sort((a, b) =>
    a === "all" ? -1 : a.localeCompare(b)
  );

  function familyClass(f) {
    if (f === "comma.ai") return "family-comma";
    if (f === "research-eval") return "family-research";
    if (f === "oss-tooling") return "family-oss";
    if (f === "internal-ops") return "family-internal";
    return "";
  }

  function renderChips() {
    filters.innerHTML = "";
    for (const f of families) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip" + (f === active ? " active" : "");
      const n =
        f === "all"
          ? data.bounties.length
          : data.bounties.filter((b) => b.family === f).length;
      btn.textContent = f === "all" ? `all (${n})` : `${f} (${n})`;
      btn.addEventListener("click", () => {
        active = f;
        renderChips();
        renderBoard();
      });
      filters.appendChild(btn);
    }
  }

  function renderBoard() {
    const list =
      active === "all"
        ? data.bounties
        : data.bounties.filter((b) => b.family === active);
    stats.textContent = `Showing ${list.length} / ${data.bounties.length}`;
    board.innerHTML = "";
    for (const b of list) {
      const li = document.createElement("li");
      li.className = "card";
      const title = b.title || "(no title)";
      const href = b.url || "#";
      li.innerHTML = `
        <div class="card-top">
          <span class="badge ${familyClass(b.family)}">${escapeHtml(b.family || "other")}</span>
          <span class="badge">${escapeHtml(b.tier || "")}</span>
          <span class="badge">${escapeHtml(b.status || "")}</span>
        </div>
        <h3><a href="${escapeAttr(href)}" rel="noopener noreferrer">${escapeHtml(title)}</a></h3>
        <div class="repo">${escapeHtml(b.repo)}#${escapeHtml(String(b.number ?? ""))}</div>
        <p class="snippet">${escapeHtml(b.snippet || "")}</p>
        <div class="card-foot">
          <span>updated ${escapeHtml((b.updated || "").slice(0, 10) || "—")}</span>
          <a href="${escapeAttr(href)}" rel="noopener noreferrer">open issue →</a>
        </div>`;
      board.appendChild(li);
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, "&#39;");
  }

  renderChips();
  renderBoard();
})();
