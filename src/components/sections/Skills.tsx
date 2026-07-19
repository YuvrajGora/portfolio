import { useState } from "react";
import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiC,
  SiFlask,
  SiPhp,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiGit,
  SiGithub,
  SiVercel,
  SiGooglegemini,
  SiWordpress,
  SiPandas,
} from "react-icons/si";
import { FiCloud, FiCode, FiTerminal } from "react-icons/fi";
import { Link } from "react-router-dom";
import RevealText from "../ui/RevealText";
import SectionHeading from "../ui/SectionHeading";
import { skillGroups } from "../../data/skills";
import { projects } from "../../data/projects";

const projectTitleBySlug = new Map(projects.map((p) => [p.slug, p.title]));

const iconMap: Record<string, React.ElementType> = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  Python: SiPython,
  C: SiC,
  Flask: SiFlask,
  PHP: SiPhp,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Firebase: SiFirebase,
  Git: SiGit,
  GitHub: SiGithub,
  Vercel: SiVercel,
  "Gemini API": SiGooglegemini,
  "Google AI Studio": SiGooglegemini,
  "Google Cloud Run": FiCloud,
  "REST APIs": FiCloud,
  "Prompt Engineering": FiTerminal,
  Pandas: SiPandas,
  "Zoho Catalyst": FiCloud,
  "Visual Studio Code": FiCode,
  XAMPP: FiCode,
  WordPress: SiWordpress,
};

export default function Skills() {
  const [active, setActive] = useState(skillGroups[0].id);
  const group = skillGroups.find((g) => g.id === active) ?? skillGroups[0];

  return (
    <section id="skills" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I reach for."
          description="A working toolkit built through shipping real projects under real deadlines — not just tutorials."
        />

        <div className="mt-14 flex flex-wrap gap-2">
          {skillGroups.map((g) => (
            <button
              key={g.id}
              onClick={() => setActive(g.id)}
              data-cursor-hover
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                active === g.id
                  ? "text-black"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)]"
              }`}
            >
              {active === g.id && (
                <motion.span
                  layoutId="skill-tab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-blue)] via-[var(--color-purple)] to-[var(--color-cyan)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative">{g.title}</span>
            </button>
          ))}
        </div>

        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {group.skills.map((skill, i) => {
            const Icon = iconMap[skill.name] ?? FiCode;
            return (
              <RevealText key={skill.name} delay={i * 0.04} className="glass rounded-xl p-5 group hover:border-[var(--color-cyan)]/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--color-surface-hover)] text-[var(--color-cyan)] group-hover:scale-110 transition-transform">
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{skill.name}</p>
                    {skill.selfRating && (
                      <p className="text-[10px] font-mono uppercase tracking-wide text-[var(--color-text-dim)]">
                        {skill.selfRating}
                      </p>
                    )}
                  </div>
                </div>
                {skill.usedIn.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {skill.usedIn.map((slug) => {
                      const title = projectTitleBySlug.get(slug);
                      if (!title) return null;
                      return (
                        <Link
                          key={slug}
                          to={`/projects/${slug}`}
                          data-cursor-hover
                          className="font-mono text-[10px] px-2 py-1 rounded-md bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] hover:text-[var(--color-cyan)] transition-colors"
                        >
                          {title}
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <p className="mt-4 text-[10px] font-mono text-[var(--color-text-dim)]">
                    Not yet used in a listed project
                  </p>
                )}
              </RevealText>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
