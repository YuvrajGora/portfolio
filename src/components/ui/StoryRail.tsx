import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

const STORY_SECTIONS = [
  { id: "hero", label: "Start" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "current-focus", label: "Now" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "industry-engagement", label: "Industry" },
  { id: "hackathons", label: "Hackathons" },
  { id: "proof-of-growth", label: "Proof" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

export default function StoryRail() {
  const [active, setActive] = useState("hero");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    STORY_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 z-[70] flex-col items-center">
      <div className="relative w-px h-[420px] bg-[var(--color-border)] overflow-visible">
        <motion.div
          className="absolute top-0 left-0 w-px origin-top"
          style={{
            height: "100%",
            scaleY: scrollYProgress,
            background: "linear-gradient(180deg, var(--color-blue), var(--color-purple), var(--color-cyan))",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-between">
          {STORY_SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
              data-cursor-hover
              aria-label={`Jump to ${s.label}`}
              className="group relative -translate-x-1/2 flex items-center"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  active === s.id
                    ? "h-2.5 w-2.5 bg-[var(--color-cyan)]"
                    : "h-1.5 w-1.5 bg-[var(--color-text-dim)] group-hover:bg-[var(--color-text-muted)]"
                }`}
              />
              <span className="pointer-events-none absolute left-4 whitespace-nowrap rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-border)] px-2 py-1 font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
