import { motion } from "framer-motion";
import { GraduationCap, BadgeCheck } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";

export default function Education({ data }) {
  return (
    <section id="education" className="py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        <div>
          <SectionHeading eyebrow="-- 05 · education" title="Education" />
          <div className="space-y-5">
            {data.education.map((e, idx) => (
              <motion.div
                key={e.degree}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="panel p-5 flex gap-4"
              >
                <GraduationCap size={20} className="text-teal shrink-0 mt-1" />
                <div>
                  <p className="font-display font-semibold text-frost">{e.degree}</p>
                  <p className="text-sm text-mist mt-1">{e.school}</p>
                  <p className="text-xs text-mist/70 font-mono mt-1">{e.university}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="-- 06 · certifications" title="Certifications" />
          <div className="space-y-5">
            {data.certifications.map((c, idx) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="panel p-5 flex gap-4 items-start"
              >
                <BadgeCheck size={20} className="text-amber shrink-0 mt-1" />
                <p className="text-sm text-frost/90 leading-relaxed">{c}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
