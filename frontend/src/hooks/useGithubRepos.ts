import { useEffect, useState } from "react";
import { fetchGithubRepos, type GithubRepo } from "../api";

export type GithubReposState =
  | { status: "loading" }
  | { status: "success"; data: GithubRepo[] }
  | { status: "error"; error: Error };

/** Discriminated union: loading on mount, success when fetch resolves, error on failure. */
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

    /* Strict mode / fast navigation: don't update state after unmount. */
    return () => controller.abort();
  }, []);

  return state;
}
