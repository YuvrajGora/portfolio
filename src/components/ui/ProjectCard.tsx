import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { Project } from "../../data/projects";

const colorMap = {
  blue: "from-[var(--color-blue)] to-[var(--color-cyan)]",
  purple: "from-[var(--color-purple)] to-[var(--color-blue)]",
  cyan: "from-[var(--color-cyan)] to-[var(--color-purple)]",
};

export default function ProjectCard({
  project,
  index,
  githubUrl,
}: {
  project: Project;
  index: number;
  githubUrl?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass rounded-2xl p-6 h-full flex flex-col group hover:shadow-2xl hover:shadow-black/30 transition-shadow"
      >
        <div className="flex items-start justify-between">
          <div
            className={`h-11 w-11 rounded-xl bg-gradient-to-br ${colorMap[project.color]} grid place-items-center font-[var(--font-display)] font-bold text-black`}
          >
            {project.title.charAt(0)}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)]">
            {project.status}
          </span>
        </div>

        <h3 className="mt-5 font-[var(--font-display)] text-xl font-semibold">{project.title}</h3>
        <p className="mt-1 text-sm text-[var(--color-cyan)]">{project.tagline}</p>
        <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] px-2 py-1 rounded-md bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]"
            >
              {t}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="font-mono text-[10px] px-2 py-1 rounded-md bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
          <Link
            to={`/projects/${project.slug}`}
            data-cursor-hover
            className="flex items-center gap-1.5 text-sm font-medium group-hover:text-[var(--color-cyan)] transition-colors"
          >
            View case study <FiArrowUpRight size={14} />
          </Link>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              aria-label={`${project.title} on GitHub`}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              <FiGithub size={16} />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
