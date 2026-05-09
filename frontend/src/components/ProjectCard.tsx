export type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  href: string;
};

export default function ProjectCard({
  title,
  description,
  tags,
  href,
}: ProjectCardProps) {
  const tagList = Array.isArray(tags) ? tags : [];
  const external = typeof href === "string" && /^https?:\/\//i.test(href);
  const isPlaceholder = !href || href === "#";

  return (
    <article className="project-card">
      <h3 className="project-card__title">{title}</h3>
      <p className="project-card__desc">{description}</p>
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
          Public link coming soon - see resume for full detail.
        </span>
      ) : (
        <a
          className="project-card__link"
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          View project <span aria-hidden="true">↗</span>
        </a>
      )}
    </article>
  );
}
