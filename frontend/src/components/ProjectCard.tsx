import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

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
  const external = typeof href === "string" && /^https?:\/\//i.test(href); // http(s) opens new tab; same-repo paths stay in-tab.
  const isPlaceholder = !href || href === "#"; // No public demo URL yet — show resume fallback instead of dead link.
  const revealRef = useRevealOnScroll<HTMLElement>();

  return (
    <article ref={revealRef} className="project-card reveal">
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
