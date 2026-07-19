import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import ProjectCard from "../ui/ProjectCard";
import { projects, type ProjectCategory } from "../../data/projects";
import { useGithubStats } from "../../hooks/useGithubStats";

const categoryLabels: Record<ProjectCategory, string> = {
  production: "Production",
  hackathon: "Hackathon",
  academic: "Academic",
  experiment: "Experiments",
};

const tabs: Array<"All" | ProjectCategory> = ["All", "production", "hackathon", "academic", "experiment"];
const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

export default function Projects() {
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");
  const { repos } = useGithubStats();
  const featured = projects.filter((p) => p.featured);

  // Resolve each project's GitHub link against live repo data once, here,
  // rather than every card fetching independently.
  const githubUrlBySlug = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of projects) {
      const match = p.github ?? repos.find((r) => normalize(r.name) === normalize(p.slug))?.html_url;
      if (match) map.set(p.slug, match);
    }
    return map;
  }, [repos]);

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've shipped."
          description="Production apps, hackathon builds, coursework, and a few experiments — sorted honestly, not hyped."
        />

        {featured.length > 0 && (
          <div className="mt-14">
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-cyan)]">Featured</p>
            <div className="mt-4 grid sm:grid-cols-2 gap-6">
              {featured.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} githubUrl={githubUrlBySlug.get(p.slug)} />
              ))}
            </div>
          </div>
        )}

        <p className="mt-16 font-mono text-xs uppercase tracking-wider text-[var(--color-cyan)]">
          All projects
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              data-cursor-hover
              className="relative px-4 py-2 rounded-full text-sm transition-colors"
            >
              {filter === tab && (
                <motion.span
                  layoutId="project-tab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-blue)] via-[var(--color-purple)] to-[var(--color-cyan)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className={`relative ${filter === tab ? "text-black font-medium" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"}`}>
                {tab === "All" ? "All" : categoryLabels[tab]}
              </span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid sm:grid-cols-2 gap-6">
          {filtered.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} githubUrl={githubUrlBySlug.get(p.slug)} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
