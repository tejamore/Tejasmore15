export default function Footer({ data }) {
  return (
    <footer className="border-t border-line py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-mist">
        <p>© {new Date().getFullYear()} {data.name} · built with React + Flask</p>
        <p className="text-mist/60">status: <span className="text-pgreen">● pipeline healthy</span></p>
      </div>
    </footer>
  );
}
