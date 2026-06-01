import { useEffect, useMemo, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

function getScrollProgress(): number {
  const root = document.documentElement;
  const scrollTop = window.scrollY || root.scrollTop || 0;
  const max = Math.max(1, root.scrollHeight - root.clientHeight);
  return Math.min(1, Math.max(0, scrollTop / max));
}

export default function ScrollProgress() {
  const reducedMotion = usePrefersReducedMotion();
  const [progress, setProgress] = useState(() =>
    typeof window === "undefined" ? 0 : getScrollProgress(),
  );

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      rafId = 0;
      setProgress(getScrollProgress());
    };

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    // Schedule an initial paint without a sync setState-in-effect.
    onScrollOrResize();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  const style = useMemo(
    () => ({
      transform: `scaleX(${progress})`,
      transition: reducedMotion ? "none" : undefined,
    }),
    [progress, reducedMotion],
  );

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__bar" style={style} />
    </div>
  );
}
