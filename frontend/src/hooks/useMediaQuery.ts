import { useSyncExternalStore } from "react";
import { PROJECTS_NARROW_MEDIA } from "../data/projectsCarousel";

function getMql(): MediaQueryList {
  return window.matchMedia(PROJECTS_NARROW_MEDIA);
}

/**
 * True when viewport matches narrow projects layout (single column, mobile carousel).
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
