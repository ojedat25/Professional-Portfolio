import { useSyncExternalStore } from "react";
import { PROJECTS_NARROW_MEDIA } from "../data/projectsCarousel";

function getMql(): MediaQueryList {
  return window.matchMedia(PROJECTS_NARROW_MEDIA);
}

/**
 * useSyncExternalStore avoids hydration mismatch and post-paint layout snap from useState + useEffect.
 * Third argument () => false: SSR/first render assumes desktop until the client subscribes.
 */
export function useIsNarrowProjects(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = getMql();
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => getMql().matches,
    () => false,
  );
}
