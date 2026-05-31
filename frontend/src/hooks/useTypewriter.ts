import { useEffect, useState, useSyncExternalStore } from "react";

const INITIAL_DELAY_MS = 500;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void): () => void {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
}

export function useTypewriter(
  text: string,
  speedMs = 40,
): { displayText: string; isComplete: boolean } {
  const reducedMotion = usePrefersReducedMotion();
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    let index = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let cancelled = false;

    const resetId = setTimeout(() => {
      if (cancelled) return;
      setDisplayText("");
      setIsComplete(false);
    }, 0);

    const delayId = setTimeout(() => {
      if (cancelled) return;
      intervalId = setInterval(() => {
        index += 1;
        setDisplayText(text.slice(0, index));
        if (index >= text.length) {
          if (intervalId !== undefined) clearInterval(intervalId);
          setIsComplete(true);
        }
      }, speedMs);
    }, INITIAL_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimeout(resetId);
      clearTimeout(delayId);
      if (intervalId !== undefined) clearInterval(intervalId);
    };
  }, [text, speedMs, reducedMotion]);

  if (reducedMotion) {
    return { displayText: text, isComplete: true };
  }

  return { displayText, isComplete };
}
