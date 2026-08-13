import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";

export default function Experience({ data }) {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="-- 03 · experience"
          title="Where the pipelines got built"
          description="Real dates, real systems — a timeline because it genuinely is one."
        />

        <div className="relative pl-8">
          {/* the vertical "pipe" */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line" />
          <motion.div
            className="absolute left-[7px] top-2 w-px bg-gradient-to-b from-teal via-teal to-transparent origin-top"
            initial={{ scaleY: 0, height: "100%" }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />

          {data.experience.map((job, idx) => (
            <motion.div
              key={job.role + job.company}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative mb-10 last:mb-0"
            >
              <span className="absolute -left-8 top-1.5 w-4 h-4 rounded-full bg-ink border-2 border-teal flex items-center justify-center">
                <Briefcase size={8} className="text-teal" />
              </span>

              <div className="panel p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <h3 className="font-display font-semibold text-xl text-frost">{job.role}</h3>
                  <span className="font-mono text-xs text-amber">
                    {job.start} – {job.end}
                  </span>
                </div>
                <p className="text-mist text-sm mb-4 font-mono">
                  {job.company} · {job.location}
                </p>
                <ul className="space-y-2">
                  {job.bullets.map((b) => (
                    <li key={b} className="text-sm text-frost/85 flex gap-2 leading-relaxed">
                      <span className="text-teal mt-1.5 shrink-0">▸</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
