import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowUpRight, FiGithub } from "react-icons/fi";
import { projects } from "../data/projects";
import ConfirmationBadge from "../components/ui/ConfirmationBadge";
import { useGithubStats } from "../hooks/useGithubStats";
import NotFound from "./NotFound";

function CaseStudyBlock({ title, children, delay }: { title: string; children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: delay * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2 className="mt-10 font-[var(--font-display)] text-xl font-semibold">{title}</h2>
      {children}
    </motion.div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const { repos } = useGithubStats();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = project ? `${project.title} — Yuvraj Gora` : "Project not found — Yuvraj Gora";
  }, [slug, project]);

  if (!project) return <NotFound />;

  // Match against live GitHub data instead of a hand-typed URL — if no repo
  // by this name exists (or is public) on the account, no link is shown
  // rather than guessing at one.
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const matchedRepo = repos.find((r) => normalize(r.name) === normalize(project.slug));
  const githubUrl = project.github ?? matchedRepo?.html_url;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen pt-36 pb-32"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="relative mx-auto max-w-3xl px-6">
        <Link
          to="/"
          onClick={() => requestAnimationFrame(() => document.getElementById("projects")?.scrollIntoView())}
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          <FiArrowLeft size={14} /> Back to projects
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs px-3 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)]">
            {project.status}
          </span>
          <span className="font-mono text-xs text-[var(--color-text-dim)]">{project.year}</span>
          {project.confirmPending && <ConfirmationBadge status="needs-confirmation" />}
        </div>

        <h1 className="mt-4 font-[var(--font-display)] text-4xl sm:text-5xl font-semibold tracking-tight">
          {project.title}
        </h1>
        <p className="mt-3 text-lg text-[var(--color-cyan)]">{project.tagline}</p>

        <div className="mt-6 aspect-video rounded-2xl glass grid place-items-center text-[var(--color-text-dim)] font-mono text-sm">
          Add a screenshot at /public/projects/{project.slug}.jpg
        </div>

        <CaseStudyBlock title="Overview" delay={0}>
          <p className="mt-4 text-[var(--color-text-muted)] leading-relaxed text-lg">{project.description}</p>
        </CaseStudyBlock>

        {project.problem && (
          <CaseStudyBlock title="The problem" delay={1}>
            <p className="mt-4 text-[var(--color-text-muted)] leading-relaxed">{project.problem}</p>
          </CaseStudyBlock>
        )}

        {project.motivation && (
          <CaseStudyBlock title="Why I built it" delay={2}>
            <p className="mt-4 text-[var(--color-text-muted)] leading-relaxed">{project.motivation}</p>
          </CaseStudyBlock>
        )}

        {project.architecture && (
          <CaseStudyBlock title="Architecture" delay={3}>
            <p className="mt-4 text-[var(--color-text-muted)] leading-relaxed">{project.architecture}</p>
          </CaseStudyBlock>
        )}

        <CaseStudyBlock title="Tech stack" delay={4}>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.length > 0 ? (
              project.stack.map((t) => (
                <span key={t} className="font-mono text-xs px-3 py-1.5 rounded-full bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]">
                  {t}
                </span>
              ))
            ) : (
              <span className="text-sm text-[var(--color-text-dim)] italic">Needs Confirmation</span>
            )}
          </div>
        </CaseStudyBlock>

        {project.features.length > 0 && (
          <CaseStudyBlock title="Key features" delay={5}>
            <ul className="mt-4 space-y-3">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[var(--color-text-muted)]">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)] flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </CaseStudyBlock>
        )}

        {project.challenges && (
          <CaseStudyBlock title="Challenges" delay={6}>
            <p className="mt-4 text-[var(--color-text-muted)] leading-relaxed">{project.challenges}</p>
          </CaseStudyBlock>
        )}

        {project.solutions && (
          <CaseStudyBlock title="How I solved it" delay={7}>
            <p className="mt-4 text-[var(--color-text-muted)] leading-relaxed">{project.solutions}</p>
          </CaseStudyBlock>
        )}

        {project.impact && (
          <CaseStudyBlock title="Results & impact" delay={8}>
            <p className="mt-4 text-[var(--color-text-muted)] leading-relaxed">{project.impact}</p>
          </CaseStudyBlock>
        )}

        {project.lessons && (
          <CaseStudyBlock title="What I learned" delay={9}>
            <p className="mt-4 text-[var(--color-text-muted)] leading-relaxed">{project.lessons}</p>
          </CaseStudyBlock>
        )}

        {project.futureImprovements && (
          <CaseStudyBlock title="Future improvements" delay={10}>
            <p className="mt-4 text-[var(--color-text-muted)] leading-relaxed">{project.futureImprovements}</p>
          </CaseStudyBlock>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-black bg-gradient-to-r from-[var(--color-blue)] via-[var(--color-purple)] to-[var(--color-cyan)]"
            >
              Live Demo <FiArrowUpRight size={14} />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium glass"
            >
              <FiGithub size={14} /> View Code
            </a>
          )}
          {!githubUrl && !project.demo && (
            <p className="text-sm text-[var(--color-text-dim)] italic">
              No public repo or live demo linked yet.
            </p>
          )}
        </motion.div>
      </div>
    </motion.main>
  );
}
