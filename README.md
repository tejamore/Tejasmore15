# Tejas Vikram More — Portfolio

A one-page, animated portfolio site built to showcase Data Analyst /
Data Engineer skills — React frontend, Flask (Python) backend serving the
resume as an API.

**Live sections:** hero (autoplay intro + typing terminal) → summary →
skills (as a "schema") → experience (timeline) → projects → education &
certifications → contact.

---

## Why it looks the way it does

The design leans into the actual subject matter — data pipelines and
schemas — instead of a generic dark portfolio theme:

| Element | Idea |
|---|---|
| **Hero background** | A custom `<canvas>` animation (`PipelineCanvas.jsx`) draws a live node graph — sources → pipeline core → outputs — with small packets flowing along the edges, like data moving through an ETL pipeline. It's the page's signature visual and doubles as the "introductory video" backdrop. |
| **Terminal hero card** | Types out a mock SQL query and "returns" the professional summary as a result — a small, on-brand alternative to a plain headline. |
| **Skills section** | Each skill category renders as a database table (`schema` in the nav) — table name, column count, and columns — because that's genuinely how this data would be modeled in a warehouse. |
| **Experience** | A real vertical timeline with a line that draws in on scroll, used because the content is a genuine chronological sequence (not decorative numbering). |
| **Section dividers** | A thin "pipe" with a packet animating across it on scroll, tying every section together as one continuous flow. |
| **Palette** | Slate Ink (`#0B1220`) background, Deep Steel panels, Signal Amber (`#F5A623`) + Query Teal (`#2DD4BF`) as dual accents, Pipeline Green (`#4ADE80`) for metrics. Type: Space Grotesk (display), Inter (body), JetBrains Mono (data/labels/code). |

All animation respects `prefers-reduced-motion` (the canvas freezes on
frame one, typing effects render instantly, scroll-reveals show their end
state immediately).

---

## Project structure

```
portfolio/
├── frontend/               React + Vite + Tailwind + Framer Motion
│   ├── public/
│   │   └── intro.mp4       ← add your own autoplay intro video here (optional)
│   ├── src/
│   │   ├── components/     Navbar, Hero, Skills, Experience, Projects, etc.
│   │   ├── data/            resumeData.js — local fallback content
│   │   ├── hooks/           useResumeData.js — fetches /api/resume, falls back locally
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/                 Flask API
│   ├── app.py                /api/resume, /api/skills/stats,
│   │                          /api/experience/summary, /api/contact
│   ├── data/resume_data.json
│   └── requirements.txt
│
├── INSTALLATION.md           Full setup guide (start here)
├── README.md                 This file
└── .gitignore
```

The frontend works **standalone** as a static site (it has all resume
content bundled in `src/data/resumeData.js`). Running the Flask backend
is optional but recommended — the frontend will automatically use live
data from `/api/resume` when the backend is running, and silently falls
back to the bundled data when it isn't.

---

## Quick start

See **[INSTALLATION.md](./INSTALLATION.md)** for full step-by-step setup
(Node + Python, both servers, adding your intro video, and production
deployment). The short version:

```bash
# Terminal 1 — backend
cd backend
python -m venv venv && source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py                                       # http://127.0.0.1:5000

# Terminal 2 — frontend
cd frontend
npm install
npm run dev                                          # http://localhost:5173
```

Open **http://localhost:5173**.

---

## Editing your content

You only need to edit **one file** to update everything except the
autoplay video:

- `backend/data/resume_data.json` (used when the Flask API is running), or
- `frontend/src/data/resumeData.js` (used as the static fallback)

Keep both in sync (same shape) if you run with the backend — the frontend
prefers the API response but falls back to the JS file if the API is
unreachable.

To add the autoplay intro video, drop an `.mp4` file at
`frontend/public/intro.mp4` — see `frontend/public/ADD_YOUR_VIDEO_HERE.txt`
for details. No video? The site still works — the animated pipeline
canvas plays instead.

## Tech stack

- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, lucide-react icons
- **Backend:** Flask 3, flask-cors
- **No database required** — content is served from a JSON file; swap
  `load_resume_data()` in `backend/app.py` for a real database call later
  if you want to manage content elsewhere.
