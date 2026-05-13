export const PROJECTS_PAGE_SIZE = 3;

/** Same breakpoint as `html` rules in [`mobile.css`]; drives [`useIsNarrowProjects`]. */
export const PROJECTS_NARROW_MEDIA = "(max-width: 1024px)";

export type ProjectCarouselBounds = {
  showNav: boolean;
  maxStart: number;
};

export function getProjectCarouselBounds(
  projectsLength: number,
): ProjectCarouselBounds {
  const maxStart = Math.max(0, projectsLength - PROJECTS_PAGE_SIZE);
  const showNav = projectsLength > PROJECTS_PAGE_SIZE;
  return { showNav, maxStart };
}

export function visibleProjectPage<T>(
  items: T[],
  startIndex: number,
  showNav: boolean,
): T[] {
  if (!showNav) {
    return items;
  }
  return items.slice(startIndex, startIndex + PROJECTS_PAGE_SIZE);
}
