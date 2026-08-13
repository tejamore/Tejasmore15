import { useEffect, useState } from "react";
import fallbackData from "../data/resumeData.js";

// Tries the live Flask API first (GET /api/resume) so the "Python" half of
// this project is actually doing something -- serving and shaping the
// resume data. If the backend isn't running, the site silently falls back
// to the bundled JS data so it still works as a static site.
export default function useResumeData() {
  const [data, setData] = useState(fallbackData);
  const [source, setSource] = useState("local");

  useEffect(() => {
    let cancelled = false;

    fetch("/api/resume")
      .then((res) => {
        if (!res.ok) throw new Error("API not available");
        return res.json();
      })
      .then((json) => {
        if (!cancelled) {
          setData(json);
          setSource("api");
        }
      })
      .catch(() => {
        if (!cancelled) setSource("local");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, source };
}
