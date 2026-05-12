import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import type { GithubRepo } from "../api";
import {
  getProjectCarouselBounds,
  visibleProjectPage,
} from "../data/projectsCarousel";

type Props = {
  projects: GithubRepo[];
};

/** Desktop-only projects carousel; use [`ProjectsMobile`] for narrow viewports. */
export default function Projects({ projects }: Props) {
  const { showNav, maxStart } = getProjectCarouselBounds(projects.length);
  const [startIndex, setStartIndex] = useState(0);

  const visible = visibleProjectPage(projects, startIndex, showNav);

  function goPrev() {
    setStartIndex((i) => Math.max(0, i - 1));
  }

  function goNext() {
    setStartIndex((i) => Math.min(maxStart, i + 1));
  }

  return (
    <div className="projects projects--desktop">
      <p id="work-label" className="section-label">
        Selected work
      </p>
      {showNav ? (
        <div className="projects__carousel projects__carousel--desktop">
          <button
            type="button"
            className="projects__nav-btn"
            onClick={goPrev}
            disabled={startIndex === 0}
            aria-label="Previous projects"
          >
            <ChevronLeft size={26} strokeWidth={2} aria-hidden="true" />
          </button>
          <div className="projects__grid projects__grid--carousel">
            {visible.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description ?? ""}
                tags={project.tags}
                href={project.href}
              />
            ))}
          </div>
          <button
            type="button"
            className="projects__nav-btn"
            onClick={goNext}
            disabled={startIndex >= maxStart}
            aria-label="Next projects"
          >
            <ChevronRight size={26} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div className="projects__grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description ?? ""}
              tags={project.tags}
              href={project.href}
            />
          ))}
        </div>
      )}
    </div>
  );
}
