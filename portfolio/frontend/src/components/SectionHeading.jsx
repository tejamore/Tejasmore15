import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12 max-w-2xl"
    >
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-frost">{title}</h2>
      {description && <p className="mt-3 text-mist leading-relaxed">{description}</p>}
    </motion.div>
  );
}
