/** Re-exports the public API surface so sections import from ./api instead of individual modules. */
/* Barrel: sections import from ./api instead of individual modules. */
export { API_BASE_URL } from "./config";
export { apiRequest } from "./client";
export { ApiError } from "./errors";
export { fetchGithubRepos } from "./github";
export type { GithubRepo } from "./github";
export { submitContact } from "./contact";
export type { ContactPayload, ContactSuccess } from "./contact";
