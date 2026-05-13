import { useCallback, useEffect, useState } from "react";

export const THEME_STORAGE_KEY = "portfolio-theme";

export type ThemePreference = "system" | "light" | "dark";

export type ResolvedTheme = "light" | "dark";

const VALID: Record<string, ThemePreference | undefined> = {
  system: "system",
  light: "light",
  dark: "dark",
};

function readStored(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    return VALID[raw ?? ""] ?? "system";
  } catch {
    return "system";
  }
}

function computeResolved(theme: ThemePreference): ResolvedTheme {
  if (theme === "light") {
    return "light";
  }
  if (theme === "dark") {
    return "dark";
  }
  if (typeof window === "undefined" || !window.matchMedia) {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemePreference>(() => readStored());
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    typeof window === "undefined" ? "light" : computeResolved(readStored()),
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* storage disabled or quota; session-only preference */
    }
  }, [theme]);

  useEffect(() => {
    function syncResolved() {
      setResolvedTheme(computeResolved(theme));
    }

    if (theme === "light" || theme === "dark") {
      syncResolved();
      return;
    }

    if (typeof window === "undefined" || !window.matchMedia) {
      syncResolved();
      return;
    }

    const prefersDarkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    syncResolved();

    if (typeof prefersDarkQuery.addEventListener === "function") {
      prefersDarkQuery.addEventListener("change", syncResolved);
      return () => prefersDarkQuery.removeEventListener("change", syncResolved);
    }

    /* One-time sync already ran; no legacy addListener (deprecated in DOM typings). */
  }, [theme]);

  useEffect(() => {
    function onStorage(storageEvent: StorageEvent) {
      if (
        storageEvent.key !== THEME_STORAGE_KEY ||
        storageEvent.newValue == null
      ) {
        return;
      }
      const nextPreference = VALID[storageEvent.newValue];
      if (nextPreference) {
        setTheme(nextPreference);
      }
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const cycleTheme = useCallback(() => {
    setTheme((currentTheme) =>
      currentTheme === "system"
        ? "light"
        : currentTheme === "light"
          ? "dark"
          : "system",
    );
  }, []);

  return { theme, resolvedTheme, cycleTheme };
}
