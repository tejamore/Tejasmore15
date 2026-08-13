import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading.jsx";

export default function Summary({ data }) {
  return (
    <section id="summary" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="-- 01 · about"
          title="Turning raw feeds into decisions"
          description="A quick read on what I do and where I focus."
        />

        <div className="grid md:grid-cols-3 gap-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 text-lg leading-relaxed text-frost/90"
          >
            {data.summary} I spend most of my time where SQL, Python, and cloud pipelines meet
            business reporting — validating data before it ever reaches a dashboard, and building
            the automation that keeps it that way.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="panel p-5 font-mono text-xs text-mist"
          >
            <p className="eyebrow mb-3">-- currently targeting</p>
            <ul className="space-y-2">
              {data.targetRoles.map((r) => (
                <li key={r} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                  {r}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
