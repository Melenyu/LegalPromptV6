# LexiPrompt

AI-generated compliance prompts for legal professionals.

## Setup

**Step 1 — Add your API key**

Open `config.js` and replace `YOUR-KEY-HERE`:
```js
ANTHROPIC_API_KEY: 'sk-ant-api03-...',
```
Get a key: https://console.anthropic.com

**Step 2 — Serve the files** (required — can't open as a local file)

If you have Node.js:
```bash
npx serve .
```

Or Python:
```bash
python3 -m http.server 3000
```

**Step 3 — Open in browser**
```
http://localhost:3000
```

That's it.

---

## Why can't I just open index.html directly?

Browsers block API calls to external services when loading from `file://` (security policy). 
A local web server (`npx serve .`) takes 5 seconds to start and solves this completely.

## Files

- `index.html` — full site
- `style.css` — design
- `config.js` — your API key goes here
- `app.js` / `ai-engine.js` / `storage.js` — application logic

## Production deployment

Deploy to Vercel, Netlify, or any static host. Set `ANTHROPIC_API_KEY` via environment variable and inject it at build time, or use a serverless function to proxy the API call.

---
*Not legal advice. All AI outputs must be reviewed by qualified counsel.*
