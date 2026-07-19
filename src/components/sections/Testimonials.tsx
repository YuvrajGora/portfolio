import { testimonials } from "../../data/testimonials";

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t) => (
          <div key={t.name} className="glass rounded-2xl p-6">
            <p className="text-[var(--color-text-muted)] leading-relaxed">"{t.quote}"</p>
            <p className="mt-4 font-medium">{t.name}</p>
            <p className="text-sm text-[var(--color-text-dim)]">{t.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
