/* ── Vibe Code Museum — app.js ───────────────────────────────────────────── */

(async function () {
  const grid    = document.getElementById("card-grid");
  const filters = document.getElementById("filters");
  const overlay = document.getElementById("overlay");
  const iframe  = document.getElementById("overlay-iframe");
  const oTitle  = document.getElementById("overlay-title");
  const oClose  = document.getElementById("overlay-close");
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon   = themeToggle.querySelector(".theme-icon");

  // ── Theme ────────────────────────────────────────────────────────────────

  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    localStorage.setItem("museum-theme", theme);
  }

  // Load saved preference, default to light
  const savedTheme = localStorage.getItem("museum-theme") || "light";
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
  });

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
    const isDark = root.getAttribute("data-theme") === "dark";
    const filtered = category === "all"
      ? items
      : items.filter((i) => i.category === category);

    grid.innerHTML = filtered
      .map(
        (item, idx) => `
      <div class="nes-container ${isDark ? "is-dark" : ""} card" data-index="${items.indexOf(item)}" style="animation-delay: ${idx * 0.08}s">
        <span class="type-tag">${item.type === "app" ? "▶ app" : "🔗 link"}</span>
        <span class="card-icon">${item.icon || "📦"}</span>
        <p class="card-title">${item.title}</p>
        <p class="card-desc">${item.description}</p>
        <span class="badge badge-${item.category}">${item.category}</span>
      </div>`
      )
      .join("");
  }

  let activeCategory = "all";
  renderCards(activeCategory);

  // Re-render when theme changes so the is-dark class stays in sync
  themeToggle.addEventListener("click", () => {
    renderCards(activeCategory);
  });

  // ── Filter buttons ───────────────────────────────────────────────────────

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-category]");
    if (!btn) return;

    filters.querySelectorAll(".nes-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    renderCards(activeCategory);
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
