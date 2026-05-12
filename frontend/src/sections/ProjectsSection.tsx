import { useGithubRepos } from "../hooks/useGithubRepos";
import { useIsNarrowProjects } from "../hooks/useMediaQuery";
import Projects from "./Projects";
import ProjectsMobile from "./ProjectsMobile";
import ProjectCardSkeleton from "../components/skeletons/ProjectCardSkeleton";
import MobileProjectCardSkeleton from "../components/skeletons/MobileProjectCardSkeleton";
import { PROJECTS_PAGE_SIZE } from "../data/projectsCarousel";

export default function ProjectsSection() {
  const reposState = useGithubRepos();
  const isNarrow = useIsNarrowProjects();

  if (reposState.status === "loading" || reposState.status === "idle") {
    return <ProjectsSkeleton isNarrow={isNarrow} />;
  }

  if (reposState.status === "error") {
    return (
      <div
        className={`projects projects--${isNarrow ? "mobile" : "desktop"}`}
      >
        <p id="work-label" className="section-label">
          Selected work
        </p>
        <p className="projects__error">Could not load projects right now.</p>
      </div>
    );
  }

  return isNarrow ? (
    <ProjectsMobile projects={reposState.data} />
  ) : (
    <Projects projects={reposState.data} />
  );
}

type ProjectsSkeletonProps = {
  isNarrow: boolean;
};

function ProjectsSkeleton({ isNarrow }: ProjectsSkeletonProps) {
  const Card = isNarrow ? MobileProjectCardSkeleton : ProjectCardSkeleton;
  return (
    <div className={`projects projects--${isNarrow ? "mobile" : "desktop"}`}>
      <p id="work-label" className="section-label">
        Selected work
      </p>
      <div
        className={`projects__grid${isNarrow ? " projects__grid--mobile" : ""}`}
        aria-busy="true"
      >
        {Array.from({ length: PROJECTS_PAGE_SIZE }).map((_, i) => (
          <Card key={i} />
        ))}
      </div>
    </div>
  );
}
