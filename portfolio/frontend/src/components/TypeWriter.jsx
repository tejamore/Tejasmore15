import { useEffect, useState } from "react";

export default function TypeWriter({ text, speed = 28, startDelay = 0, onDone, className = "" }) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    let i = 0;
    let interval;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setShown(text);
      onDone && onDone();
      return;
    }

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          onDone && onDone();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return <span className={className}>{shown}</span>;
}
