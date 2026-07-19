import RevealText from "../ui/RevealText";
import SectionHeading from "../ui/SectionHeading";

export default function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="About" title="Why I build." />

        <RevealText delay={0.1} className="mt-10 space-y-6 text-lg leading-relaxed text-[var(--color-text-muted)]">
          <p>
            I'm a first-year Computer Science Engineering student, and most of what I know I picked up by building
            something, breaking it, and figuring out why. I didn't start with a plan to become a "full stack developer" —
            I started with HTML and CSS because I wanted a webpage to look like the one in my head, and one thing kept
            leading to the next.
          </p>
          <p>
            React came after I got tired of rewriting the same DOM logic by hand. Flask came after I wanted my projects
            to actually do something with data, not just display it. AI came in more recently — once I started using the
            Gemini API in EcoWise AI and CareerGenie, it became a default part of how I think about what a project can do.
          </p>
          <p>
            Hackathons are where most of my learning gets compressed. I compete solo — team name "The Solo Rider" — which
            means I'm the architect, the developer, and the one debugging a deployment failure at 2 AM before a submission
            deadline. It's not always efficient, but it's taught me more in a weekend than a month of tutorials would.
          </p>
          <p>
            I don't think of myself as someone who has this figured out. I'm still learning backend patterns properly,
            still getting more comfortable with cloud deployment, still working out what I actually want to specialize in.
            What I can say is that I keep showing up, keep shipping, and keep getting a little better at reading a rubric,
            debugging a stack trace, or explaining a decision — which, most days, feels like the actual job.
          </p>
        </RevealText>
      </div>
    </section>
  );
}
