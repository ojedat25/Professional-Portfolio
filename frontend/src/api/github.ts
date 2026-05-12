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
export async function fetchGithubRepos(
  signal?: AbortSignal,
): Promise<GithubRepo[]> {
  const data = await apiRequest<GithubRepo[]>("/github/repos/", { signal });
  if (!Array.isArray(data)) {
    throw new TypeError(`Expected array of repos, got ${typeof data}`);
  }
  return data;
}
