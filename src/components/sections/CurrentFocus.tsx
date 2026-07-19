import RevealText from "../ui/RevealText";
import SectionHeading from "../ui/SectionHeading";
import { currentFocus } from "../../data/currentFocus";

export default function CurrentFocus() {
  return (
    <section id="current-focus" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Right Now" title="What I'm building this month." align="center" />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {currentFocus.map((f, i) => (
            <RevealText
              key={f.id}
              delay={i * 0.08}
              className="glass rounded-2xl p-6 animate-float"
            >
              <h3 className="font-[var(--font-display)] font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">{f.description}</p>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
}
