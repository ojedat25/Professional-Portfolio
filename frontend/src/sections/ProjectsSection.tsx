import { useGithubRepos } from "../hooks/useGithubRepos";
import { useIsNarrowProjects } from "../hooks/useMediaQuery";
import Projects from "./Projects";
import ProjectsMobile from "./ProjectsMobile";
import ProjectCardSkeleton from "../components/skeletons/ProjectCardSkeleton";
import MobileProjectCardSkeleton from "../components/skeletons/MobileProjectCardSkeleton";
import { PROJECTS_PAGE_SIZE } from "../data/projectsCarousel";

/* At 1024px, useIsNarrowProjects picks ProjectsMobile vs Projects (same breakpoint as mobile.css). */
export default function ProjectsSection() {
  const reposState = useGithubRepos();
  const isNarrow = useIsNarrowProjects();

  const content =
    reposState.status === "loading" ? (
      <ProjectsSkeleton isNarrow={isNarrow} />
    ) : reposState.status === "error" ? (
      <p className="projects__error">Could not load projects right now.</p>
    ) : isNarrow ? (
      <ProjectsMobile projects={reposState.data} />
    ) : (
      <Projects projects={reposState.data} />
    );

  return (
    <div className={`projects projects--${isNarrow ? "mobile" : "desktop"}`}>
      <div className="editor editor--section">
        <div className="editor__bar">
          <div className="editor__dots" aria-hidden="true">
            <span className="editor__dot editor__dot--red" />
            <span className="editor__dot editor__dot--yellow" />
            <span className="editor__dot editor__dot--green" />
          </div>
          <div className="editor__filename">Projects.tsx</div>
        </div>
        <div className="editor__body">
          <p id="work-label" className="comment">
            Selected work
          </p>
          {content}
        </div>
      </div>
    </div>
  );
}

type ProjectsSkeletonProps = {
  isNarrow: boolean;
};

function ProjectsSkeleton({ isNarrow }: ProjectsSkeletonProps) {
  // Mirrors final layout (3 placeholder cards, mobile vs desktop shape) while repos load.
  const Card = isNarrow ? MobileProjectCardSkeleton : ProjectCardSkeleton;
  return (
    <div
      className={`projects__grid${isNarrow ? " projects__grid--mobile" : ""}`}
      aria-busy="true"
    >
      {Array.from({ length: PROJECTS_PAGE_SIZE }).map((_, i) => (
        <Card key={i} />
      ))}
    </div>
  );
}
