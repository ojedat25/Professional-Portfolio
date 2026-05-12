const RAW_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";

/** Base URL for the Django API. Override via `VITE_API_BASE_URL` (see `.env.example`). */
export const API_BASE_URL = RAW_BASE_URL.replace(/\/$/, "");
