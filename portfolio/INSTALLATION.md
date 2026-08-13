# Installation Guide

Everything you need to run this portfolio locally, add your own intro
video, and put it online. No prior React/Flask experience assumed.

## 1. Prerequisites

Install these once:

| Tool | Minimum version | Check with | Get it |
|---|---|---|---|
| Node.js | 18+ | `node -v` | https://nodejs.org (LTS build) |
| npm | 9+ (comes with Node) | `npm -v` | included with Node |
| Python | 3.10+ | `python3 --version` | https://python.org |
| pip | comes with Python | `pip3 --version` | included with Python |

You do **not** need to install a database or Docker for this project.

---

## 2. Get the project onto your machine

Unzip the project folder wherever you keep code, e.g.:

```bash
cd ~/Projects
unzip tejas-more-portfolio.zip
cd portfolio
```

You should see two folders: `frontend/` and `backend/`.

---

## 3. Set up the backend (Flask / Python)

```bash
cd backend

# Create an isolated Python environment
python3 -m venv venv

# Activate it
source venv/bin/activate        # macOS / Linux
venv\Scripts\activate           # Windows (Command Prompt or PowerShell)

# Install dependencies
pip install -r requirements.txt

# Run the API
python app.py
```

You should see Flask start on `http://127.0.0.1:5000`. Leave this
terminal window open — it's your API server.

**Verify it works:** open `http://127.0.0.1:5000/api/health` in a
browser. You should see `{"status": "ok", ...}`.

Other endpoints this backend exposes:

- `GET /api/resume` — the full resume payload the frontend consumes
- `GET /api/skills/stats` — skill count per category
- `GET /api/experience/summary` — rolled-up experience stats
- `POST /api/contact` — accepts `{ name, email, message }`, validates it,
  and logs it server-side (wire up real email/CRM delivery here if you
  want the contact form to notify you — see the docstring in `app.py`)

To stop the server later, press `Ctrl+C` in that terminal. To come back
to it another day, you only need to re-run `source venv/bin/activate`
and `python app.py` — no need to reinstall dependencies.

---

## 4. Set up the frontend (React / Vite)

Open a **second terminal window** (keep the backend running in the first):

```bash
cd frontend
npm install
npm run dev
```

Vite will print a local URL, typically:

```
Local:   http://localhost:5173/
```

Open that URL in your browser. The site should load with the backend's
live data (if step 3 is running) or fall back to bundled data
automatically (if it isn't).

---

## 5. Add your autoplay intro video (optional)

The hero section has a spot for a short autoplay, muted, looping video.

1. Export or record a short clip — 10 to 20 seconds works well, landscape
   orientation, ideally under ~8 MB so it loads fast.
2. Name it exactly `intro.mp4`.
3. Place it in `frontend/public/intro.mp4`.
4. Refresh the browser tab — no code changes needed.

If you skip this step, nothing breaks: the hero shows its animated data-
pipeline background instead, which was designed to work as the intro on
its own.

---

## 6. Editing your content

Update your resume details in **one place**:

- `backend/data/resume_data.json` — used whenever the Flask API is running
- `frontend/src/data/resumeData.js` — the static fallback (same shape,
  written as a JS object instead of JSON)

Both files share the same structure: `name`, `titles`, `summary`, `stats`,
`skillGroups`, `experience`, `projects`, `education`, `certifications`,
`targetRoles`. Edit the values, save, and refresh your browser — Vite
hot-reloads automatically.

---

## 7. Building for production

When you're ready to deploy:

```bash
cd frontend
npm run build
```

This outputs a static site to `frontend/dist/` — upload that folder to
any static host (Vercel, Netlify, GitHub Pages, S3, etc.).

For the backend, deploy `backend/` to any Python host (Render, Railway,
Fly.io, a VPS, etc.) and run it with a production server instead of the
Flask dev server, for example:

```bash
pip install gunicorn
gunicorn -w 2 -b 0.0.0.0:5000 app:app
```

Then point the frontend at your deployed API: open
`frontend/vite.config.js` and update the `/api` proxy target for local
dev, and for the production build, set the fetch URL in
`frontend/src/hooks/useResumeData.js` to your deployed backend's full
URL (e.g. `https://your-api.onrender.com/api/resume`) instead of the
relative `/api/resume` path, since the proxy only exists in local dev.

If you don't want to run a backend in production at all, that's fine too
— the site works fully static with the bundled fallback data from
`resumeData.js`. In that case just skip deploying `backend/` entirely.

---

## Troubleshooting

**`npm install` fails / hangs** — check your internet connection; all
packages are pulled from the public npm registry.

**Blank page in the browser** — open the browser console (F12) and check
for errors. The most common cause is the dev server not running, or a
typo introduced while editing `resumeData.js`/`resume_data.json` (missing
comma, mismatched bracket).

**Video doesn't autoplay** — most browsers only allow autoplay when the
video is muted. The hero's `<video>` tag is muted by default; the
speaker-icon button in the bottom-right only unmutes after the user
interacts with the page, which is expected browser behavior, not a bug.

**Port already in use** — if `5000` or `5173` is taken by another app,
stop that app or change the port: Flask via `python app.py` reads
`app.run(port=5000)` in `app.py`; Vite via `npm run dev -- --port 5174`.

**CORS errors in the browser console** — make sure the backend is
running and `flask-cors` installed correctly (`pip install -r
requirements.txt` again inside the activated venv).
