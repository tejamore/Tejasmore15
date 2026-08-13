import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";
import PipelineCanvas from "./PipelineCanvas.jsx";
import TypeWriter from "./TypeWriter.jsx";
import AnimatedCounter from "./AnimatedCounter.jsx";

export default function Hero({ data }) {
  const [line1Done, setLine1Done] = useState(false);
  const [line2Done, setLine2Done] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [muted, setMuted] = useState(true);

  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Signature backdrop: animated pipeline node graph */}
      <div className="absolute inset-0 bg-grid bg-grid opacity-60" />
      <PipelineCanvas className="absolute inset-0 w-full h-full opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />

      {/* Autoplaying introductory video, muted per browser autoplay policy.
          Drop your own file at /public/intro.mp4 -- see README. If it's
          missing, the pipeline canvas above already carries the intro. */}
      {!videoFailed && (
        <div className="absolute inset-0 -z-10">
          <video
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-0"
            onCanPlay={(e) => (e.currentTarget.style.opacity = "0.22")}
            onError={() => setVideoFailed(true)}
          >
            <source src="/intro.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      <div className="relative max-w-6xl mx-auto px-6 w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="eyebrow mb-4"
          >
            portfolio.init() — data analyst / data engineer
          </motion.p>

          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="panel px-5 py-4 font-mono text-sm sm:text-base shadow-2xl shadow-black/40 max-w-xl"
          >
            <div className="flex items-center gap-1.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2DD4BF]/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-mist/40" />
              <span className="ml-3 text-mist text-xs">query_console — zsh</span>
            </div>
            <p className="text-mist">
              <span className="text-teal">$</span>{" "}
              <TypeWriter
                text="SELECT summary FROM engineer WHERE stack = 'modern';"
                onDone={() => setLine1Done(true)}
              />
              {!line1Done && <span className="animate-blink">▍</span>}
            </p>
            {line1Done && (
              <p className="mt-2 text-frost/90 leading-relaxed">
                <TypeWriter text={data.summary} speed={4} onDone={() => setLine2Done(true)} />
                {!line2Done && <span className="animate-blink">▍</span>}
              </p>
            )}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-glow-amber"
          >
            {data.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {data.titles.map((t, i) => (
              <span
                key={t}
                className={`font-mono text-xs px-3 py-1.5 rounded-full border ${
                  i === 0
                    ? "border-amber text-amber"
                    : "border-line text-mist"
                }`}
              >
                {t}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-x-10 gap-y-6"
          >
            {data.stats.map((s) => (
              <div key={s.label}>
                <div className="font-display font-semibold text-2xl sm:text-3xl text-teal">
                  <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="text-mist text-xs mt-1 max-w-[10rem] font-mono">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column: quick facts card, floats gently */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="panel p-6 animate-float hidden lg:block"
        >
          <p className="eyebrow mb-4">-- table: contact_info</p>
          <dl className="space-y-3 font-mono text-sm">
            <div className="flex justify-between border-b border-line pb-2">
              <dt className="text-mist">location</dt>
              <dd className="text-frost">{data.location}</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-2">
              <dt className="text-mist">email</dt>
              <dd className="text-frost truncate max-w-[10rem]">{data.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-mist">linkedin</dt>
              <dd className="text-teal truncate max-w-[10rem]">{data.linkedin}</dd>
            </div>
          </dl>
          <div className="mt-5 pt-5 border-t border-line">
            <p className="eyebrow mb-3">-- table: target_roles</p>
            <div className="flex flex-wrap gap-1.5">
              {data.targetRoles.slice(0, 4).map((r) => (
                <span key={r} className="text-[11px] font-mono px-2 py-1 rounded bg-steel2 text-mist">
                  {r}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {!videoFailed && (
        <button
          onClick={() => setMuted((m) => !m)}
          className="absolute bottom-8 right-6 z-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-mist hover:text-teal transition-colors focus-ring rounded px-3 py-2 border border-line bg-ink/60 backdrop-blur"
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          intro {muted ? "muted" : "sound on"}
        </button>
      )}

      <motion.a
        href="#summary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-mist hover:text-teal transition-colors focus-ring rounded"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="animate-bounce" size={22} />
      </motion.a>
    </section>
  );
}
