# Vibe Code Museum — Plan & Status

## Context

A personal web app ("museum") to showcase and organize mini apps, useful links, and articles.
Hosted on **GitHub Pages** as a pure static site — no build step, no backend.
Retro/pixel art visual theme using **NES.css** + **Press Start 2P** font.

Items can be:
- **Embedded HTML apps** — single HTML files or folders with assets, loaded in an iframe
- **External links** — websites, tools, or articles that open in a new tab

Categories: **Study**, **Tools**, **Fun**

---

## Architecture

```
vibe-code-museum/
├── index.html              ← main museum page (reads items.json, renders cards)
├── items.json              ← registry of all items (edit this to add new ones)
├── style.css               ← custom styles on top of NES.css
├── app.js                  ← vanilla JS: fetch items.json, filter, render, iframe modal
├── apps/                   ← mini apps live here
│   ├── calculator.html     ← single-file example
│   └── <your-app>/         ← folder example
│       └── index.html
├── docs/
│   └── plan.md             ← this file
└── README.md
```

### items.json format

```json
[
  {
    "title": "Calculator",
    "description": "A simple retro calculator",
    "category": "Tools",
    "type": "app",
    "url": "apps/calculator.html",
    "icon": "🧮"
  },
  {
    "title": "MDN Web Docs",
    "description": "The best web reference",
    "category": "Study",
    "type": "link",
    "url": "https://developer.mozilla.org",
    "icon": "📖"
  }
]
```

- `type: "app"` → opens in an iframe modal overlay inside the museum
- `type: "link"` → opens in a new tab

### Design

- **NES.css 2.3.0** via CDN for pixel-art borders, buttons, containers
- **Press Start 2P** Google Font for headings
- Dark background (`#212529`) with NES-style card grid
- Category filter buttons at the top: All / Study / Tools / Fun
- Each item = an `nes-container` card with icon, title, description, category badge
- Clicking an app card opens a full-screen iframe overlay with a close button
- Clicking a link card opens in `_blank`
- Fully responsive: 3 cols → 2 → 1

### How to add a new item

1. If it's an app: drop the HTML file (or folder) into `apps/`
2. Add an entry to `items.json`
3. `git add . && git commit && git push`
4. GitHub Pages deploys automatically

---

## Tech stack

- [NES.css](https://nostalgic-css.github.io/NES.css/) — pixel-art CSS framework (CDN)
- [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) — retro font (Google Fonts)
- Vanilla HTML / CSS / JS — zero dependencies, no build tools

---

## Current Status — Phase 1 ✅ Complete

| Step | Status |
|------|--------|
| Create project directory | ✅ Done |
| `index.html` — HTML skeleton | ✅ Done |
| `style.css` — dark retro theme, responsive grid, iframe overlay | ✅ Done |
| `app.js` — fetch, render, filter, iframe modal | ✅ Done |
| `items.json` — seeded with 3 sample items | ✅ Done |
| `apps/calculator.html` — sample embedded app | ✅ Done |
| `README.md` — setup & usage docs | ✅ Done |
| Git repo initialized | ✅ Done |
| Verified in browser | ✅ Done |

### Sample items seeded

| Title | Category | Type |
|-------|----------|------|
| Calculator | Tools | app (iframe) |
| MDN Web Docs | Study | link |
| CSS Tricks | Study | link |

---

## Known issues / next pass

1. **`file://` fetch limitation** — `items.json` can't be fetched over `file://` protocol.
   Workaround locally: `npx serve .` — works fine on GitHub Pages.
2. **No search** — filter is category-only; no text search yet.
3. **No item count badge** on filter buttons.

---

## What's next (Phase 2 ideas)

- [ ] Add more mini apps (snake game, todo list, color picker, etc.)
- [ ] Search / text filter bar
- [ ] Item count badges on category buttons
- [ ] "New" badge on recently added items
- [ ] Push to GitHub and enable Pages at `https://quangnd.github.io/vibe-code-museum/`
