import { Link } from "react-router-dom";
import RevealText from "../ui/RevealText";
import SectionHeading from "../ui/SectionHeading";
import ConfirmationBadge from "../ui/ConfirmationBadge";
import { hackathons } from "../../data/hackathons";
import { events } from "../../data/events";

function VerificationBadge({ verified, source }: { verified: boolean; source?: string }) {
  if (!verified) return <ConfirmationBadge status="needs-confirmation" />;
  if (source === "user-confirmed") return <ConfirmationBadge status="user-confirmed" />;
  return null;
}

export default function Hackathons() {
  return (
    <section id="hackathons" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Hackathons"
          title="How I stress-test what I know."
          description="I compete because I enjoy the pressure of learning fast, not to chase certificates."
        />

        <div className="mt-14 grid sm:grid-cols-2 gap-6">
          {hackathons.map((h, i) => (
            <RevealText key={h.id} delay={i * 0.06} className="glass rounded-2xl p-6 flex flex-col">
              <div className="flex items-center justify-between">
                {h.date && <p className="font-mono text-xs text-[var(--color-cyan)]">{h.date}</p>}
                <VerificationBadge verified={h.verified} source={h.verificationSource} />
              </div>
              <h3 className="mt-2 font-[var(--font-display)] text-lg font-semibold">{h.name}</h3>
              {(h.organizer || h.role) && (
                <p className="text-sm text-[var(--color-text-muted)]">
                  {[h.organizer, h.role].filter(Boolean).join(" · ")}
                </p>
              )}

              {h.problem && (
                <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
                  <span className="text-[var(--color-text)]">Problem: </span>{h.problem}
                </p>
              )}
              {h.solution && (
                <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                  <span className="text-[var(--color-text)]">What I built: </span>{h.solution}
                </p>
              )}
              {!h.problem && !h.solution && (
                <p className="mt-3 text-sm text-[var(--color-text-dim)] italic">
                  Details coming soon.
                </p>
              )}

              {h.technologies.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {h.technologies.map((t) => (
                    <span key={t} className="font-mono text-[10px] px-2 py-1 rounded-md bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-auto pt-4 flex items-center justify-between">
                {h.whatILearned && (
                  <p className="text-xs text-[var(--color-text-dim)] italic">{h.whatILearned}</p>
                )}
                {h.relatedProjectSlug && (
                  <Link to={`/projects/${h.relatedProjectSlug}`} className="text-sm text-[var(--color-cyan)] hover:underline whitespace-nowrap ml-3">
                    Case study →
                  </Link>
                )}
              </div>
            </RevealText>
          ))}
        </div>

        <RevealText delay={0.2} className="mt-10 glass rounded-2xl p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-cyan)]">Also showed up for</p>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            {events.map((e) => (
              <div key={e.id} className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{e.name}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{e.organizer} · {e.date}</p>
                  <p className="mt-1 text-sm text-[var(--color-text-dim)]">{e.whyIAttended}</p>
                </div>
                {!e.verified && <ConfirmationBadge status="needs-confirmation" className="shrink-0" />}
              </div>
            ))}
          </div>
        </RevealText>
      </div>
    </section>
  );
}
