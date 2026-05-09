import type { ProjectCardProps } from "./ProjectCard";

export default function MobileProjectCard({
  title,
  description,
  tags,
  href,
}: ProjectCardProps) {
  const tagList = Array.isArray(tags) ? tags : [];
  const external = typeof href === "string" && /^https?:\/\//i.test(href);
  const isPlaceholder = !href || href === "#";

  return (
    <article className="project-card project-card--mobile">
      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc project-card__desc--clamp">
          {description}
        </p>
      </div>
      <div className="project-card__actions">
        {tagList.length > 0 ? (
          <ul className="project-card__tags" aria-label="Technologies">
            {tagList.map((tag) => (
              <li key={tag} className="project-card__tag">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
        {isPlaceholder ? (
          <span className="project-card__placeholder">
            Link soon - see resume.
          </span>
        ) : (
          <a
            className="project-card__link"
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            View <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
