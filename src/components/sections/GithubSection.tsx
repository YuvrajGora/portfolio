import { FiGithub, FiStar, FiUsers } from "react-icons/fi";
import RevealText from "../ui/RevealText";
import SectionHeading from "../ui/SectionHeading";
import { useGithubStats, type ContributionDay } from "../../hooks/useGithubStats";
import { GITHUB_USERNAME } from "../../constants/github";

function levelColor(level: number) {
  return [
    "var(--color-surface-hover)",
    "color-mix(in srgb, var(--color-cyan) 30%, var(--color-surface-hover))",
    "color-mix(in srgb, var(--color-cyan) 55%, var(--color-surface-hover))",
    "color-mix(in srgb, var(--color-blue) 75%, var(--color-cyan))",
    "var(--color-purple)",
  ][level] ?? "var(--color-surface-hover)";
}

function seedIntensity(i: number) {
  const v = Math.sin(i * 12.9898) * 43758.5453;
  return Math.abs(v - Math.floor(v));
}

function ContributionGrid({ live }: { live: ContributionDay[] }) {
  const cells =
    live.length > 0
      ? live.map((d) => d.level)
      : Array.from({ length: 52 * 7 }, (_, i) => {
          const intensity = seedIntensity(i);
          return intensity > 0.85 ? 4 : intensity > 0.65 ? 3 : intensity > 0.4 ? 2 : intensity > 0.2 ? 1 : 0;
        });

  return (
    <div className="overflow-x-auto pb-2">
      <div className="grid grid-flow-col grid-rows-7 gap-[3px] w-max">
        {cells.map((level, i) => (
          <div key={i} className="h-[10px] w-[10px] rounded-[2px]" style={{ background: levelColor(level) }} />
        ))}
      </div>
    </div>
  );
}

export default function GithubSection() {
  const { repos, publicRepos, followers, following, avatarUrl, contributions, contributionsAvailable, isFallback } =
    useGithubStats();

  const nonForkRepos = repos.filter((r) => !r.fork);

  return (
    <section id="github" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="GitHub"
          title="Does he actually code?"
          description="Live from the GitHub API — repositories, contribution activity, and the languages I ship most."
        />

        <RevealText delay={0.1} className="mt-12 glass rounded-2xl p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {avatarUrl && (
                <img src={avatarUrl} alt="GitHub avatar" className="h-10 w-10 rounded-full border border-[var(--color-border)]" />
              )}
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="font-mono text-sm hover:text-[var(--color-cyan)] transition-colors"
              >
                github.com/{GITHUB_USERNAME}
              </a>
            </div>
            <div className="flex items-center gap-6 font-mono text-sm text-[var(--color-text-muted)]">
              <span>{publicRepos} repos</span>
              <span className="flex items-center gap-1"><FiUsers size={12} /> {followers} · {following}</span>
            </div>
          </div>
          <div className="mt-6">
            <ContributionGrid live={contributions} />
          </div>
          {!contributionsAvailable && (
            <p className="mt-3 text-xs text-[var(--color-text-dim)] font-mono">
              Contribution calendar service unavailable right now — showing a placeholder pattern.
            </p>
          )}
          {isFallback && (
            <p className="mt-1 text-xs text-[var(--color-text-dim)] font-mono">
              Live GitHub data couldn't be reached — showing placeholder repos.
            </p>
          )}
        </RevealText>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {nonForkRepos.slice(0, 9).map((repo, i) => (
            <RevealText
              key={repo.name}
              delay={i * 0.05}
              className="glass rounded-2xl p-6 h-full flex flex-col hover:border-[var(--color-cyan)]/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="font-[var(--font-display)] font-semibold hover:text-[var(--color-cyan)] transition-colors"
                >
                  {repo.name}
                </a>
                {repo.archived && (
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-dim)]">
                    Archived
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed flex-1">
                {repo.description ?? "No description yet."}
              </p>
              <div className="mt-4 flex items-center justify-between font-mono text-xs text-[var(--color-text-dim)]">
                <span>{repo.language ?? "—"}</span>
                <span className="flex items-center gap-1">
                  <FiStar size={12} /> {repo.stargazers_count}
                </span>
              </div>
            </RevealText>
          ))}
        </div>

        {nonForkRepos.length === 0 && (
          <p className="mt-6 text-center text-sm text-[var(--color-text-dim)] flex items-center justify-center gap-2">
            <FiGithub size={14} /> No public repositories found yet.
          </p>
        )}
      </div>
    </section>
  );
}
