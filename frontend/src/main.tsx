import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
/* Tokens/globals first, layout second, mobile last so cascade stays predictable. */
import "./styles/index.css";
import "./styles/layout.css";
import "./styles/mobile.css";
import App from "./App";

const rootEl = document.getElementById("root");
/* Fail fast if the Vite entry mount is missing (misconfigured build). */
if (!rootEl) {
  throw new Error("Root element #root not found");
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
