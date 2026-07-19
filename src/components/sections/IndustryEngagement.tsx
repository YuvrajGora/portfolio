import RevealText from "../ui/RevealText";
import SectionHeading from "../ui/SectionHeading";
import { industryEngagements } from "../../data/industryEngagement";

export default function IndustryEngagement() {
  if (industryEngagements.length === 0) return null;

  return (
    <section id="industry-engagement" className="relative py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="Industry Programs & Volunteering"
          title="Where I've engaged beyond the classroom."
          description="Training, masterclasses, and volunteering — real activities, kept in their own category rather than dressed up as a formal role."
        />

        <div className="mt-14 space-y-5">
          {industryEngagements.map((e) => (
            <RevealText key={e.id} className="glass rounded-2xl p-6 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs text-[var(--color-cyan)]">{e.organization} · {e.date}</p>
                <h3 className="mt-1 font-[var(--font-display)] text-lg font-semibold">{e.activity}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">{e.description}</p>
              </div>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
}
