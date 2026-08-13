import { motion } from "framer-motion";
import { Mail, Linkedin, MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";

export default function Contact({ data }) {
  return (
    <section id="contact" className="py-24 bg-steel/30">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="-- 07 · contact"
          title="Let's talk data"
          description="Open to Data Analyst, Data Engineer, and Analytics Engineer roles."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6 }}
          className="panel p-8 grid sm:grid-cols-3 gap-6"
        >
          <a
            href={`mailto:${data.email}`}
            className="group flex flex-col gap-3 focus-ring rounded-lg p-2 -m-2"
          >
            <Mail size={20} className="text-teal" />
            <div>
              <p className="text-xs text-mist font-mono">email</p>
              <p className="text-frost text-sm mt-1 group-hover:text-teal transition-colors break-all">
                {data.email}
              </p>
            </div>
          </a>

          <a
            href={`https://${data.linkedin}`}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col gap-3 focus-ring rounded-lg p-2 -m-2"
          >
            <Linkedin size={20} className="text-teal" />
            <div>
              <p className="text-xs text-mist font-mono">linkedin</p>
              <p className="text-frost text-sm mt-1 group-hover:text-teal transition-colors break-all">
                {data.linkedin}
              </p>
            </div>
          </a>

          <div className="flex flex-col gap-3">
            <MapPin size={20} className="text-teal" />
            <div>
              <p className="text-xs text-mist font-mono">location</p>
              <p className="text-frost text-sm mt-1">{data.location}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
