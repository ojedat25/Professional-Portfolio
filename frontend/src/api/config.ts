// Vite injects VITE_API_BASE_URL at build time; default suits local dev; production uses Render URL (render.yaml).
const RAW_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";

/** Trailing slash stripped so paths joined in apiRequest do not double up slashes. */
export const API_BASE_URL = RAW_BASE_URL.replace(/\/$/, "");
