import { apiRequest } from "./client";

/** Shape returned by `GET /api/github/repos/` (mirrors `GitHubRepoSerializer` in the Django app). */
export type GithubRepo = {
  id: string;
  title: string;
  description: string | null;
  tags: string[];
  href: string;
  stars: number;
  language: string | null;
  homepage: string | null;
  updated_at: string;
};

/** Fetch portfolio-tagged repos from the Django backend. */
export function fetchGithubRepos(signal?: AbortSignal): Promise<GithubRepo[]> {
  return apiRequest<GithubRepo[]>("/github/repos/", { signal });
}
