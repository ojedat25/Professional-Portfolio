import { useEffect, useState } from "react";
import { fetchGithubRepos, type GithubRepo } from "../api";

export type GithubReposState =
  | { status: "loading" }
  | { status: "success"; data: GithubRepo[] }
  | { status: "error"; error: Error };

/** Loads portfolio-tagged GitHub repos from the Django backend on mount. */
export function useGithubRepos(): GithubReposState {
  const [state, setState] = useState<GithubReposState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    fetchGithubRepos(controller.signal)
      .then((data) => setState({ status: "success", data }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState({
          status: "error",
          error: error instanceof Error ? error : new Error(String(error)),
        });
      });

    return () => controller.abort();
  }, []);

  return state;
}
