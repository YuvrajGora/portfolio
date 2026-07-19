import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiAward, FiDownload, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import RevealText from "../ui/RevealText";
import ConfirmationBadge from "../ui/ConfirmationBadge";
import SectionHeading from "../ui/SectionHeading";
import { certificates, type Certificate } from "../../data/certificates";

const categories = [
  "All",
  "AI",
  "Cloud",
  "Cybersecurity",
  "Software Engineering",
  "Hackathon",
  "Internship",
  "Event",
  "Achievement",
  "Community",
  "Professional Development",
] as const;

export default function ProofOfGrowth() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [selected, setSelected] = useState<Certificate | null>(null);

  useEffect(() => {
    if (!selected) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected]);

  const filtered =
    filter === "All" ? certificates : certificates.filter((c) => c.category === filter);

  return (
    <section id="proof-of-growth" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Proof of Growth"
          title="Can I back it up?"
          description="Every credential here is either verified or clearly marked as pending — nothing on this site claims more than it can show."
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              data-cursor-hover
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                filter === c
                  ? "border-[var(--color-cyan)]/50 text-[var(--color-text)] bg-[var(--color-surface-hover)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((cert, i) => (
            <RevealText key={cert.id} delay={i * 0.05}>
              <button
                onClick={() => setSelected(cert)}
                data-cursor-hover
                className="glass rounded-2xl p-6 text-left w-full h-full flex flex-col hover:border-[var(--color-cyan)]/30 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={`${cert.title} certificate thumbnail`}
                      loading="lazy"
                      className="h-11 w-11 rounded-xl object-cover border border-[var(--color-border)] group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[var(--color-blue)] to-[var(--color-purple)] grid place-items-center text-white group-hover:scale-110 transition-transform">
                      <FiAward size={18} />
                    </div>
                  )}
                  {!cert.verified && <ConfirmationBadge status="needs-confirmation" />}
                </div>
                <h3 className="mt-5 font-[var(--font-display)] font-semibold leading-snug">{cert.title}</h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">{cert.issuer}</p>
                <div className="mt-auto pt-4 flex items-center justify-between font-mono text-xs text-[var(--color-text-dim)]">
                  <span>{cert.date}</span>
                  <span>{cert.category}</span>
                </div>
              </button>
            </RevealText>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="relative glass rounded-2xl max-w-lg w-full p-6"
              role="dialog"
              aria-modal="true"
              aria-label={`${selected.title} certificate preview`}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                aria-label="Close preview"
              >
                <FiX size={18} />
              </button>
              {selected.image ? (
                <img
                  src={selected.image}
                  alt={`${selected.title} certificate`}
                  className="w-full rounded-xl border border-[var(--color-border)] object-contain max-h-[50vh]"
                />
              ) : (
                <div className="aspect-[4/3] rounded-xl bg-[var(--color-surface-hover)] grid place-items-center text-[var(--color-text-dim)] font-mono text-xs text-center px-4">
                  No image on file yet for this certificate.
                </div>
              )}
              <h3 className="mt-5 font-[var(--font-display)] text-xl font-semibold">{selected.title}</h3>
              <p className="mt-1 text-[var(--color-text-muted)]">{selected.issuer} · {selected.date}</p>
              {selected.note && <p className="mt-2 text-sm text-[var(--color-text-dim)] italic">{selected.note}</p>}
              {selected.secondaryImage && (
                <a
                  href={selected.secondaryImage}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-sm text-[var(--color-cyan)] hover:underline"
                >
                  {selected.secondaryLabel ?? "View supporting evidence"} →
                </a>
              )}
              <div className="mt-5 flex flex-wrap gap-3">
                {(selected.fileUrl || selected.image) && (
                  <a
                    href={selected.fileUrl ?? selected.image}
                    download
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-[var(--color-blue)] to-[var(--color-cyan)] text-black"
                  >
                    <FiDownload size={14} /> Download
                  </a>
                )}
                {selected.relatedProjectSlug && (
                  <Link
                    to={`/projects/${selected.relatedProjectSlug}`}
                    onClick={() => setSelected(null)}
                    className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium glass"
                  >
                    Related project →
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
