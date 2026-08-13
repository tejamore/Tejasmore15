import { motion } from "framer-motion";

// A thin horizontal "pipe" with a packet that animates across it whenever
// it scrolls into view -- ties every section together as one continuous
// data flow, echoing the hero's node graph without repeating it wholesale.
export default function FlowDivider() {
  return (
    <div className="relative max-w-6xl mx-auto px-6">
      <div className="h-px bg-line relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-px w-24 bg-gradient-to-r from-transparent via-teal to-transparent"
          initial={{ x: "-10%" }}
          whileInView={{ x: "110%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
