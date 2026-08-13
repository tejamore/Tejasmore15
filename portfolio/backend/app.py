"""
Flask API for Tejas Vikram More's portfolio.

Serves the resume content as JSON (consumed by the React frontend) and a
couple of small derived endpoints that turn the static resume into
computed, "data engineering flavored" data -- reinforcing the site's own
subject matter rather than just being a plain content API.

Run with:
    python app.py
Or with the Flask CLI:
    flask --app app run --debug
"""
from __future__ import annotations

import json
import logging
from datetime import datetime
from pathlib import Path

from flask import Flask, jsonify, request
from flask_cors import CORS

BASE_DIR = Path(__file__).resolve().parent
DATA_PATH = BASE_DIR / "data" / "resume_data.json"

app = Flask(__name__)
# Wide-open CORS is fine for a personal portfolio API; tighten origins
# before deploying somewhere that isn't your own site.
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("portfolio-api")


def load_resume_data() -> dict:
    """Read resume_data.json fresh on every call so edits to the file
    show up without restarting the server."""
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


@app.get("/api/health")
def health():
    return jsonify({"status": "ok", "time": datetime.utcnow().isoformat() + "Z"})


@app.get("/api/resume")
def get_resume():
    """Full resume payload -- what the frontend fetches on page load."""
    return jsonify(load_resume_data())


@app.get("/api/skills/stats")
def skills_stats():
    """Small aggregation over the skill groups: how many skills per
    category and the total distinct skill count. Mirrors the kind of
    lightweight aggregation query a data analyst writes daily."""
    data = load_resume_data()
    groups = data.get("skillGroups", [])
    stats = [
        {"table": g["table"], "title": g["title"], "count": len(g["columns"])}
        for g in groups
    ]
    total = sum(s["count"] for s in stats)
    return jsonify({"totalSkills": total, "byCategory": stats})


@app.get("/api/experience/summary")
def experience_summary():
    """Rolls up total bullet points (accomplishments) per role -- a stand-in
    for the kind of summary table an analyst would build over raw records."""
    data = load_resume_data()
    rollup = [
        {
            "role": job["role"],
            "company": job["company"],
            "period": f"{job['start']} – {job['end']}",
            "accomplishments": len(job["bullets"]),
        }
        for job in data.get("experience", [])
    ]
    return jsonify(rollup)


@app.post("/api/contact")
def contact():
    """Lightweight contact-form receiver. This does NOT send email out of
    the box -- it validates the payload and logs it server-side so you can
    wire up your own email/CRM integration (e.g. SMTP, SendGrid, a
    Zapier/Make webhook) without changing the frontend contract."""
    payload = request.get_json(silent=True) or {}
    name = (payload.get("name") or "").strip()
    email = (payload.get("email") or "").strip()
    message = (payload.get("message") or "").strip()

    errors = {}
    if not name:
        errors["name"] = "Name is required."
    if not email or "@" not in email:
        errors["email"] = "A valid email is required."
    if not message:
        errors["message"] = "Message is required."

    if errors:
        return jsonify({"ok": False, "errors": errors}), 400

    logger.info("New contact form submission from %s <%s>: %s", name, email, message)
    return jsonify({"ok": True, "message": "Thanks — message received."})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
