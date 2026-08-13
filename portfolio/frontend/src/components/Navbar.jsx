import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";

const LINKS = [
  { href: "#summary", label: "summary" },
  { href: "#skills", label: "schema" },
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#education", label: "education" },
  { href: "#contact", label: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/85 backdrop-blur border-b border-line" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm text-frost focus-ring rounded">
          <Terminal size={16} className="text-teal" />
          <span className="text-mist">~/</span>
          <span className="text-frost">tejas-more</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-mist hover:text-teal transition-colors focus-ring rounded"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-md border border-amber text-amber hover:bg-amber hover:text-ink transition-colors focus-ring"
        >
          run --hire
        </a>

        <button
          className="md:hidden text-frost focus-ring rounded"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-ink border-t border-line px-6 py-4 flex flex-col gap-4 font-mono text-sm uppercase tracking-widest">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-mist hover:text-teal transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="text-amber">
            run --hire
          </a>
        </div>
      )}
    </motion.header>
  );
}
