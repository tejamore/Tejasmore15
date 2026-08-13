import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";

export default function Projects({ data }) {
  return (
    <section id="projects" className="py-24 bg-steel/30">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="-- 04 · projects"
          title="Selected builds"
          description="Independent and applied work across governance, modeling, and analytics automation."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {data.projects.map((p, idx) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="panel p-6 flex flex-col relative overflow-hidden group"
            >
              <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-teal/10 blur-2xl group-hover:bg-teal/20 transition-colors" />

              <div className="flex items-center gap-1.5 text-pgreen font-mono text-xs mb-4">
                <TrendingUp size={13} />
                {p.impact}
              </div>

              <h3 className="font-display font-semibold text-lg text-frost mb-2 leading-snug">
                {p.name}
              </h3>
              <p className="text-sm text-mist leading-relaxed mb-5 flex-1">{p.description}</p>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2 py-1 rounded bg-steel2 text-teal"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <ArrowUpRight
                size={16}
                className="absolute top-6 right-6 text-mist group-hover:text-amber group-hover:rotate-45 transition-all duration-300"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
