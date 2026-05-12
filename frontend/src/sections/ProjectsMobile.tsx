import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import MobileProjectCard from "../components/MobileProjectCard";
import type { GithubRepo } from "../api";
import {
  getProjectCarouselBounds,
  visibleProjectPage,
} from "../data/projectsCarousel";

type Props = {
  projects: GithubRepo[];
};

export default function ProjectsMobile({ projects }: Props) {
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
    <div className="projects projects--mobile">
      <p id="work-label" className="section-label">
        Selected work
      </p>
      {showNav ? (
        <div className="projects__carousel projects__carousel--mobile">
          <button
            type="button"
            className="projects__nav-btn projects__nav-btn--mobile"
            onClick={goPrev}
            disabled={startIndex === 0}
            aria-label="Previous projects"
          >
            <ChevronUp size={26} strokeWidth={2} aria-hidden="true" />
          </button>
          <div className="projects__grid projects__grid--mobile">
            {visible.map((project) => (
              <MobileProjectCard
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
            className="projects__nav-btn projects__nav-btn--mobile"
            onClick={goNext}
            disabled={startIndex >= maxStart}
            aria-label="Next projects"
          >
            <ChevronDown size={26} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div className="projects__grid projects__grid--mobile">
          {projects.map((project) => (
            <MobileProjectCard
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
