import { useEffect, useLayoutEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const INITIAL_DELAY_MS = 500;

export function useTypewriter(
  text: string,
  speedMs = 40,
): { displayText: string; isComplete: boolean } {
  const reducedMotion = usePrefersReducedMotion();
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      setDisplayText("");
      setIsComplete(false);
    });
    return () => {
      active = false;
    };
  }, [text, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    let index = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let cancelled = false;

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
      clearTimeout(delayId);
      if (intervalId !== undefined) clearInterval(intervalId);
    };
  }, [text, speedMs, reducedMotion]);

  if (reducedMotion) {
    return { displayText: text, isComplete: true };
  }

  return { displayText, isComplete };
}
