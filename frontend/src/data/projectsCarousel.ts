import type { Project } from "./siteContent";

export const PROJECTS_PAGE_SIZE = 3;

/** Matches carousel layout CSS ([`layout.css`]) and [`useIsNarrowProjects`]. */
export const PROJECTS_NARROW_MEDIA = "(max-width: 960px)";

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

export function visibleProjectPage(
  projects: Project[],
  startIndex: number,
  showNav: boolean,
): Project[] {
  if (!showNav) {
    return projects;
  }
  return projects.slice(startIndex, startIndex + PROJECTS_PAGE_SIZE);
}
