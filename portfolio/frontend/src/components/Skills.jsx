import { motion } from "framer-motion";
import { Database } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";

export default function Skills({ data }) {
  return (
    <section id="skills" className="py-24 bg-steel/30">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="-- 02 · schema"
          title="Skills, modeled as a schema"
          description="Every capability lives in its own table — because that's how I'd design it in a real warehouse, too."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.skillGroups.map((group, idx) => (
            <motion.div
              key={group.table}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
              whileHover={{ y: -4 }}
              className="panel overflow-hidden group"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-steel2/60">
                <Database size={14} className="text-teal shrink-0" />
                <span className="font-mono text-xs text-frost truncate">{group.table}</span>
                <span className="ml-auto font-mono text-[10px] text-mist">
                  {group.columns.length} cols
                </span>
              </div>
              <div className="px-4 py-3">
                <p className="text-sm text-mist mb-3 font-display font-medium">{group.title}</p>
                <ul className="space-y-1.5">
                  {group.columns.map((col) => (
                    <li
                      key={col}
                      className="font-mono text-xs text-frost/85 flex items-center gap-2 group-hover:text-teal transition-colors duration-300"
                    >
                      <span className="text-amber group-hover:text-teal transition-colors duration-300">
                        ·
                      </span>
                      {col}
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
