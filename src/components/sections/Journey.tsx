import { Link } from "react-router-dom";
import RevealText from "../ui/RevealText";
import SectionHeading from "../ui/SectionHeading";
import ConfirmationBadge from "../ui/ConfirmationBadge";
import { timeline } from "../../data/timeline";

export default function Journey() {
  return (
    <section id="journey" className="relative py-32">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading
          eyebrow="Journey"
          title="How I got here."
          description="From HTML to AI-integrated full-stack apps — the honest version, including the steps still being confirmed."
        />

        <div className="mt-16 relative pl-8 border-l border-[var(--color-border)] space-y-10">
          {timeline.map((step, i) => (
            <RevealText key={step.id} delay={Math.min(i * 0.05, 0.4)} className="relative">
              <span
                className={`absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full ${
                  step.verified
                    ? "bg-gradient-to-br from-[var(--color-blue)] to-[var(--color-cyan)]"
                    : "bg-[var(--color-text-dim)]"
                }`}
              />
              <p className="font-mono text-xs text-[var(--color-cyan)]">{step.year}</p>
              <h3 className="mt-1 font-[var(--font-display)] text-xl font-medium">{step.title}</h3>
              <p className="mt-2 text-[var(--color-text-muted)] leading-relaxed">{step.description}</p>

              {step.skillsLearned.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {step.skillsLearned.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] px-2 py-1 rounded-md bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {step.relatedProjectSlug && (
                <Link
                  to={`/projects/${step.relatedProjectSlug}`}
                  className="mt-3 inline-block text-sm text-[var(--color-cyan)] hover:underline"
                >
                  View related project →
                </Link>
              )}

              {!step.verified && <ConfirmationBadge status="needs-confirmation" className="mt-2 inline-block" />}
              {step.verified && step.verificationSource === "user-confirmed" && (
                <ConfirmationBadge status="user-confirmed" className="mt-2 inline-block" />
              )}
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
}
