import RevealText from "../ui/RevealText";
import SectionHeading from "../ui/SectionHeading";
import { posts } from "../../data/blog";

// RECOMMENDATION (kept from the Version 1 review): a "coming soon" blog
// section with no real posts reads as an empty promise to a recruiter —
// worse than not having the section at all. This now hides completely
// when there are no posts, the same pattern used for Testimonials.
// Once real posts exist in data/blog.ts, this renders automatically —
// no code change needed. If you'd rather show a "Learning Journal"
// placeholder instead of hiding, that's a one-line change here.
export default function Blog() {
  if (posts.length === 0) return null;

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);

  return (
    <section id="blog" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Writing" title="From the build logs." />

        <RevealText delay={0.1} className="mt-12 glass rounded-2xl p-8 grid sm:grid-cols-[auto_1fr] gap-6 items-start">
          <span className="font-mono text-xs px-3 py-1 rounded-full bg-[var(--color-surface-hover)] text-[var(--color-cyan)]">
            Featured
          </span>
          <div>
            <h3 className="font-[var(--font-display)] text-2xl font-semibold">{featured.title}</h3>
            <p className="mt-2 text-[var(--color-text-muted)]">{featured.excerpt}</p>
            <div className="mt-4 flex gap-4 font-mono text-xs text-[var(--color-text-dim)]">
              <span>{featured.category}</span>
              <span>{featured.readingTime}</span>
              <span>{featured.date}</span>
            </div>
          </div>
        </RevealText>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((p, i) => (
            <RevealText key={p.slug} delay={i * 0.05} className="glass rounded-2xl p-6">
              <h3 className="font-[var(--font-display)] font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{p.excerpt}</p>
              <div className="mt-4 flex gap-3 font-mono text-xs text-[var(--color-text-dim)]">
                <span>{p.category}</span>
                <span>{p.readingTime}</span>
              </div>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
}
