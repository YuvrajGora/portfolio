import RevealText from "../ui/RevealText";
import SectionHeading from "../ui/SectionHeading";
import ConfirmationBadge from "../ui/ConfirmationBadge";
import { experience } from "../../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="relative py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked."
          description="Internships that exposed me to how software gets built outside a solo hackathon."
        />

        <div className="mt-14 space-y-6">
          {experience.map((e) => (
            <RevealText key={e.id} className="glass rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-[var(--font-display)] text-xl font-semibold">{e.company}</h3>
                {!e.verified && <ConfirmationBadge status="needs-confirmation" />}
                {e.verified && e.verificationSource === "user-confirmed" && (
                  <ConfirmationBadge status="user-confirmed" />
                )}
              </div>
              {(e.role || e.duration) && (
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {[e.role, e.duration].filter(Boolean).join(" · ")}
                </p>
              )}
              {e.highlights.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)] flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
              {e.technologies.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {e.technologies.map((t) => (
                    <span key={t} className="font-mono text-[10px] px-2 py-1 rounded-md bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {e.note && (
                <p className="mt-3 text-sm text-[var(--color-text-dim)] italic">{e.note}</p>
              )}
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
}
