export default function ProjectCard({ title, description, tags, href }) {
  const tagList = Array.isArray(tags) ? tags : [];
  const external = typeof href === "string" && /^https?:\/\//i.test(href);

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
      <a
        className="project-card__link"
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        View project <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}
