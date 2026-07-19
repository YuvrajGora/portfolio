import { useEffect, useState } from "react";
import { GITHUB_USERNAME } from "../constants/github";

export interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0-4
}

export interface GithubData {
  repos: Repo[];
  publicRepos: number;
  followers: number;
  following: number;
  avatarUrl: string | null;
  bio: string | null;
  contributions: ContributionDay[];
  contributionsAvailable: boolean;
  loading: boolean;
  isFallback: boolean;
}

const fallbackRepos: Repo[] = [
  {
    name: "flowfund",
    description: "Personal expense tracker with real financial clarity.",
    html_url: `https://github.com/${GITHUB_USERNAME}/flowfund`,
    language: "TypeScript",
    stargazers_count: 0,
    updated_at: new Date().toISOString(),
    fork: false,
    archived: false,
  },
  {
    name: "ecowise-ai",
    description: "AI carbon footprint coach.",
    html_url: `https://github.com/${GITHUB_USERNAME}/ecowise-ai`,
    language: "Python",
    stargazers_count: 0,
    updated_at: new Date().toISOString(),
    fork: false,
    archived: false,
  },
  {
    name: "careergenie",
    description: "AI career guidance platform.",
    html_url: `https://github.com/${GITHUB_USERNAME}/careergenie`,
    language: "TypeScript",
    stargazers_count: 0,
    updated_at: new Date().toISOString(),
    fork: false,
    archived: false,
  },
];

/**
 * Fetches public repo data from the GitHub REST API (no auth required,
 * rate-limited to 60 req/hr per IP). Falls back to placeholder data
 * if the request fails or the username hasn't been set yet.
 */
export function useGithubStats(): GithubData {
  const [data, setData] = useState<GithubData>({
    repos: fallbackRepos,
    publicRepos: fallbackRepos.length,
    followers: 0,
    following: 0,
    avatarUrl: null,
    bio: null,
    contributions: [],
    contributionsAvailable: false,
    loading: true,
    isFallback: true,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      if (!GITHUB_USERNAME || GITHUB_USERNAME === "yourusername") {
        setData((d) => ({ ...d, loading: false }));
        return;
      }
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");
        const user = await userRes.json();
        const repos: Repo[] = await reposRes.json();
        if (cancelled) return;

        setData((d) => ({
          ...d,
          repos,
          publicRepos: user.public_repos ?? repos.length,
          followers: user.followers ?? 0,
          following: user.following ?? 0,
          avatarUrl: user.avatar_url ?? null,
          bio: user.bio ?? null,
          loading: false,
          isFallback: false,
        }));

        // Contribution calendar isn't exposed by GitHub's public REST API —
        // this uses a well-known unauthenticated community proxy. If it's
        // ever unreachable, the UI falls back gracefully (see GithubSection).
        try {
          const contribRes = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
          );
          if (contribRes.ok) {
            const contribJson = await contribRes.json();
            if (!cancelled && Array.isArray(contribJson.contributions)) {
              setData((d) => ({
                ...d,
                contributions: contribJson.contributions,
                contributionsAvailable: true,
              }));
            }
          }
        } catch {
          // Silently keep contributionsAvailable: false — GithubSection renders a placeholder.
        }
      } catch {
        if (!cancelled) setData((d) => ({ ...d, loading: false }));
      }
    }

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
