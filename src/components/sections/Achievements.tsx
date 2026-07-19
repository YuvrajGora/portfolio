import { FiAward, FiCode, FiTarget, FiZap } from "react-icons/fi";
import RevealText from "../ui/RevealText";
import SectionHeading from "../ui/SectionHeading";
import { useCountUp } from "../../hooks/useCountUp";
import { projects } from "../../data/projects";
import { hackathons } from "../../data/hackathons";
import { certificates } from "../../data/certificates";
import { events } from "../../data/events";

// Derived from the data files rather than hardcoded, so these numbers stay
// correct automatically as projects.ts / hackathons.ts / certificates.ts grow.
const highlights = [
  { icon: FiCode, label: "Projects built", value: projects.length, suffix: "+" },
  { icon: FiZap, label: "Hackathons", value: hackathons.filter((h) => h.verified).length, suffix: "" },
  { icon: FiTarget, label: "Events attended", value: events.filter((e) => e.verified).length, suffix: "+" },
  { icon: FiAward, label: "Credentials", value: certificates.filter((c) => c.verified).length, suffix: "+" },
];

function HighlightCard({
  icon: Icon,
  label,
  value,
  suffix,
  delay,
}: {
  icon: typeof FiZap;
  label: string;
  value: number;
  suffix?: string;
  delay: number;
}) {
  const { ref, value: count } = useCountUp(value);
  return (
    <RevealText delay={delay} className="glass rounded-2xl p-7 relative overflow-hidden group">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl bg-gradient-to-br from-[var(--color-blue)] to-[var(--color-purple)] group-hover:opacity-40 transition-opacity" />
      <Icon size={22} className="text-[var(--color-cyan)]" />
      <p ref={ref} className="mt-5 font-[var(--font-display)] text-4xl font-semibold">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{label}</p>
    </RevealText>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Achievements" title="The scoreboard so far." align="center" />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((h, i) => (
            <HighlightCard key={h.label} {...h} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
