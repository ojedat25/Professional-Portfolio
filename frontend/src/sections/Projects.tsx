import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import { siteContent } from "../data/siteContent";

export default function Projects() {
  const { projects } = siteContent;
  const maxStart = Math.max(0, projects.length - 3);
  const showNav = projects.length > 3;

  const [startIndex, setStartIndex] = useState(0);

  const visible = showNav
    ? projects.slice(startIndex, startIndex + 3)
    : projects;

  function goPrev() {
    setStartIndex((i) => Math.max(0, i - 1));
  }

  function goNext() {
    setStartIndex((i) => Math.min(maxStart, i + 1));
  }

  return (
    <div className="projects">
      <p id="work-label" className="section-label">
        Selected work
      </p>
      {showNav ? (
        <div className="projects__carousel">
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
                description={project.description}
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
              description={project.description}
              tags={project.tags}
              href={project.href}
            />
          ))}
        </div>
      )}
    </div>
  );
}
