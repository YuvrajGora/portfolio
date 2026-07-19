import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";
import CommandPalette from "../ui/CommandPalette";
import MagneticButton from "../ui/MagneticButton";

const links = [
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "hackathons", label: "Hackathons" },
  { id: "proof-of-growth", label: "Proof of Growth" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [location.pathname]);

  function handleNavClick(id: string) {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      requestAnimationFrame(() =>
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50)
      );
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[80] transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`flex items-center justify-between rounded-full px-4 sm:px-5 py-2.5 transition-all duration-500 ${
            scrolled ? "glass shadow-lg shadow-black/20" : ""
          }`}
        >
          <Link
            to="/"
            data-cursor-hover
            className="font-[var(--font-display)] text-lg font-semibold tracking-tight"
          >
            YG<span className="text-[var(--color-cyan)]">.</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => handleNavClick(l.id)}
                data-cursor-hover
                className={`relative px-3.5 py-1.5 text-sm rounded-full transition-colors ${
                  active === l.id
                    ? "text-[var(--color-text)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-[var(--color-surface-hover)]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <CommandPalette />
            <ThemeToggle />
            <MagneticButton
              as="button"
              onClick={() => handleNavClick("contact")}
              className="hidden sm:inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-black bg-gradient-to-r from-[var(--color-blue)] via-[var(--color-purple)] to-[var(--color-cyan)]"
            >
              Let's talk
            </MagneticButton>
            <button
              className="lg:hidden grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)]"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX size={16} /> : <FiMenu size={16} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="lg:hidden mx-4 mt-2 glass rounded-2xl overflow-hidden"
          >
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => handleNavClick(l.id)}
                className="block w-full text-left px-5 py-3 text-sm border-b border-[var(--color-border)] last:border-0 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
