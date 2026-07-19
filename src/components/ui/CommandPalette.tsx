import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiCommand } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { projects } from "../../data/projects";
import { useTheme } from "../../hooks/useTheme";

interface Command {
  id: string;
  label: string;
  hint: string;
  action: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function goTo(id: string) {
    setOpen(false);
    navigate("/");
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  }

  const commands: Command[] = useMemo(
    () => [
      { id: "home", label: "Go to Home", hint: "section", action: () => goTo("hero") },
      { id: "about", label: "Go to About", hint: "section", action: () => goTo("about") },
      { id: "journey", label: "Go to Journey", hint: "section", action: () => goTo("journey") },
      { id: "skills", label: "Go to Skills", hint: "section", action: () => goTo("skills") },
      { id: "projects", label: "Go to Projects", hint: "section", action: () => goTo("projects") },
      { id: "hackathons", label: "Go to Hackathons", hint: "section", action: () => goTo("hackathons") },
      { id: "proof", label: "Go to Proof of Growth", hint: "section", action: () => goTo("proof-of-growth") },
      { id: "github", label: "Go to GitHub", hint: "section", action: () => goTo("github") },
      { id: "contact", label: "Go to Contact", hint: "section", action: () => goTo("contact") },
      {
        id: "theme",
        label: "Toggle dark / light theme",
        hint: "action",
        action: () => {
          toggleTheme();
          setOpen(false);
        },
      },
      {
        id: "resume",
        label: "Download resume",
        hint: "action",
        action: () => {
          window.open("/resume.pdf", "_blank");
          setOpen(false);
        },
      },
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        label: `Open project — ${p.title}`,
        hint: "project",
        action: () => {
          setOpen(false);
          navigate(`/projects/${p.slug}`);
        },
      })),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        data-cursor-hover
        className="hidden md:flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3.5 py-1.5 text-xs text-[var(--color-text-muted)] hover:border-[var(--color-cyan)]/40 hover:text-[var(--color-text)] transition-colors font-mono"
      >
        <FiCommand size={12} />
        <span>K</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-start justify-center px-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg glass rounded-2xl overflow-hidden shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
            >
              <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3 font-mono text-sm">
                <span className="text-[var(--color-cyan)]">$</span>
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent outline-none placeholder:text-[var(--color-text-dim)]"
                />
              </div>
              <div className="max-h-80 overflow-y-auto py-2">
                {filtered.length === 0 && (
                  <p className="px-4 py-6 text-center text-sm text-[var(--color-text-dim)]">
                    No matching commands.
                  </p>
                )}
                {filtered.map((c) => (
                  <button
                    key={c.id}
                    onClick={c.action}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-sm text-left hover:bg-[var(--color-surface-hover)] transition-colors"
                  >
                    <span>{c.label}</span>
                    <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
                      {c.hint} <FiArrowUpRight size={12} />
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
