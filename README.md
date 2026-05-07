# 🏛️ Vibe Code Museum

A retro pixel-art web app to showcase mini apps, tools, and study resources.  
Hosted on GitHub Pages — no build tools, no backend.

🔗 **Live:** [https://quangnd.github.io/vibe-code-museum/](https://quangnd.github.io/vibe-code-museum/)

## How to add a new item

### 1. If it's a mini app

Drop your HTML file (or folder) into `apps/`:

```
apps/
├── calculator.html          ← single file
└── snake-game/              ← folder with assets
    └── index.html
```

### 2. Register it in `items.json`

```json
{
  "title": "My Cool App",
  "description": "What it does",
  "category": "Fun",
  "type": "app",
  "url": "apps/my-cool-app.html",
  "icon": "🎮"
}
```

For external links:

```json
{
  "title": "Useful Article",
  "description": "Great read about X",
  "category": "Study",
  "type": "link",
  "url": "https://example.com/article",
  "icon": "📖"
}
```

### 3. Push

```bash
git add . && git commit -m "add my cool app" && git push
```

GitHub Pages auto-deploys. Done.

## Item fields

| Field         | Required | Description                                |
|---------------|----------|--------------------------------------------|
| `title`       | ✅       | Display name                                |
| `description` | ✅       | Short description shown on the card         |
| `category`    | ✅       | `Study`, `Tools`, or `Fun`                  |
| `type`        | ✅       | `app` (iframe) or `link` (new tab)          |
| `url`         | ✅       | Relative path for apps, full URL for links  |
| `icon`        | optional | Emoji shown on the card (default: 📦)       |

## Run locally

Just open `index.html` in a browser. No server needed.  
Or use a simple server for best results:

```bash
npx serve .
```

## Tech stack

- [NES.css](https://nostalgic-css.github.io/NES.css/) — pixel-art CSS framework
- [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) — retro font
- Vanilla HTML / CSS / JS — zero dependencies
