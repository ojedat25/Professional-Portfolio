import { apiRequest } from "./client";

/** Field names match GitHubRepoSerializer, not raw GitHub API keys. */
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

/** Hits Django GET /api/github/repos/; server filters to repos tagged `portfolio` on GitHub. */
export async function fetchGithubRepos(
  signal?: AbortSignal,
): Promise<GithubRepo[]> {
  const data = await apiRequest<GithubRepo[]>("/github/repos/", { signal });
  // Backend misconfiguration should not silently render garbage.
  if (!Array.isArray(data)) {
    throw new TypeError(`Expected array of repos, got ${typeof data}`);
  }
  return data;
}
