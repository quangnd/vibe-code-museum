/* ── Vibe Code Museum — app.js ───────────────────────────────────────────── */

(async function () {
  const grid    = document.getElementById("card-grid");
  const filters = document.getElementById("filters");
  const overlay = document.getElementById("overlay");
  const iframe  = document.getElementById("overlay-iframe");
  const oTitle  = document.getElementById("overlay-title");
  const oClose  = document.getElementById("overlay-close");

  // ── Fetch items ──────────────────────────────────────────────────────────

  let items = [];
  try {
    const res = await fetch("items.json");
    items = await res.json();
  } catch (e) {
    grid.innerHTML =
      '<p class="nes-text is-error" style="grid-column:1/-1;text-align:center;font-size:.6rem">Could not load items.json</p>';
    return;
  }

  // ── Render cards ─────────────────────────────────────────────────────────

  function renderCards(category) {
    const filtered = category === "all"
      ? items
      : items.filter((i) => i.category === category);

    grid.innerHTML = filtered
      .map(
        (item, idx) => `
      <div class="nes-container is-dark card" data-index="${items.indexOf(item)}">
        <span class="type-tag">${item.type === "app" ? "▶ app" : "🔗 link"}</span>
        <span class="card-icon">${item.icon || "📦"}</span>
        <p class="card-title">${item.title}</p>
        <p class="card-desc">${item.description}</p>
        <span class="badge badge-${item.category}">${item.category}</span>
      </div>`
      )
      .join("");
  }

  renderCards("all");

  // ── Filter buttons ───────────────────────────────────────────────────────

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-category]");
    if (!btn) return;

    filters.querySelectorAll(".nes-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderCards(btn.dataset.category);
  });

  // ── Card clicks ──────────────────────────────────────────────────────────

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;

    const item = items[card.dataset.index];
    if (!item) return;

    if (item.type === "link") {
      window.open(item.url, "_blank", "noopener");
    } else {
      openOverlay(item);
    }
  });

  // ── Overlay ──────────────────────────────────────────────────────────────

  function openOverlay(item) {
    oTitle.textContent = item.title;
    iframe.src = item.url;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeOverlay() {
    overlay.classList.remove("open");
    iframe.src = "";
    document.body.style.overflow = "";
  }

  oClose.addEventListener("click", closeOverlay);

  // Esc key closes overlay
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeOverlay();
  });

  // Click outside iframe bar closes overlay
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeOverlay();
  });
})();
