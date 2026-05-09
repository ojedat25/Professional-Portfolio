import ProjectCard from "../components/ProjectCard.jsx";
import { siteContent } from "../data/siteContent.js";

export default function Projects() {
  return (
    <div className="projects">
      <p id="work-label" className="section-label">
        Selected work
      </p>
      <div className="projects__grid">
        {siteContent.projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            tags={project.tags}
            href={project.href}
          />
        ))}
      </div>
    </div>
  );
}
