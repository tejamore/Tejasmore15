import { useEffect, useRef } from "react";

/**
 * The page's signature visual: nodes (data sources / warehouse / BI layer)
 * connected by edges, with small "packets" animating along each edge to
 * suggest a live ETL pipeline. Fully generated on <canvas> -- no images,
 * no external assets, resizes with its container, and respects
 * prefers-reduced-motion by freezing on the first frame.
 */
export default function PipelineCanvas({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width, height, dpr;
    let nodes = [];
    let edges = [];
    let rafId;

    const COLORS = {
      node: "#2DD4BF",
      nodeAlt: "#F5A623",
      edge: "rgba(140, 160, 200, 0.16)",
      packet: "#F5A623",
    };

    function layout() {
      const rect = canvas.parentElement.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Three tiers: sources -> pipeline core -> outputs, like a real ETL flow
      const cols = [0.08, 0.34, 0.62, 0.9];
      const tierCounts = [4, 3, 2, 3];
      nodes = [];
      tierCounts.forEach((count, tierIdx) => {
        for (let i = 0; i < count; i++) {
          const spread = height / (count + 1);
          nodes.push({
            x: width * cols[tierIdx],
            y: spread * (i + 1) + (tierIdx % 2 === 0 ? 0 : spread * 0.25),
            r: tierIdx === 1 || tierIdx === 2 ? 5 : 3.4,
            tier: tierIdx,
            pulse: Math.random() * Math.PI * 2,
          });
        }
      });

      edges = [];
      const tiers = [[], [], [], []];
      nodes.forEach((n) => tiers[n.tier].push(n));
      for (let t = 0; t < tiers.length - 1; t++) {
        tiers[t].forEach((a) => {
          const targets = tiers[t + 1];
          const numLinks = 1 + Math.floor(Math.random() * Math.min(2, targets.length));
          for (let k = 0; k < numLinks; k++) {
            const b = targets[Math.floor(Math.random() * targets.length)];
            edges.push({ a, b, offset: Math.random(), speed: 0.15 + Math.random() * 0.25 });
          }
        });
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, width, height);

      // edges
      ctx.lineWidth = 1;
      edges.forEach((e) => {
        ctx.strokeStyle = COLORS.edge;
        ctx.beginPath();
        const midX = (e.a.x + e.b.x) / 2;
        ctx.moveTo(e.a.x, e.a.y);
        ctx.bezierCurveTo(midX, e.a.y, midX, e.b.y, e.b.x, e.b.y);
        ctx.stroke();
      });

      // packets flowing along edges
      if (!prefersReducedMotion) {
        edges.forEach((e) => {
          const progress = (e.offset + t * 0.00006 * e.speed) % 1;
          const midX = (e.a.x + e.b.x) / 2;
          const p = bezierPoint(e.a, { x: midX, y: e.a.y }, { x: midX, y: e.b.y }, e.b, progress);
          ctx.beginPath();
          ctx.fillStyle = COLORS.packet;
          ctx.globalAlpha = 0.85;
          ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        });
      }

      // nodes
      nodes.forEach((n) => {
        const pulse = prefersReducedMotion ? 0 : Math.sin(t * 0.0015 + n.pulse) * 0.5 + 0.5;
        const color = n.tier === 2 ? COLORS.nodeAlt : COLORS.node;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.55 + pulse * 0.25;
        ctx.arc(n.x, n.y, n.r + pulse * 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    }

    function bezierPoint(p0, p1, p2, p3, t) {
      const mt = 1 - t;
      const x =
        mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x;
      const y =
        mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y;
      return { x, y };
    }

    function loop(t) {
      draw(t);
      if (!prefersReducedMotion) rafId = requestAnimationFrame(loop);
    }

    layout();
    draw(0);
    if (!prefersReducedMotion) rafId = requestAnimationFrame(loop);

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
