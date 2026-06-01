import type { ProjectCardProps } from "./ProjectCard";
import { PROJECT_CARD_ENTRANCE_STAGGER_MS } from "../data/projectsCarousel";

function titleToFilename(title: string): string {
  const parts = title
    .trim()
    .split(/[^a-zA-Z0-9]+/g)
    .filter(Boolean);
  const pascal = parts
    .map((p) => `${p.charAt(0).toUpperCase()}${p.slice(1)}`)
    .join("");
  return `${pascal || "Project"}.tsx`;
}

export default function MobileProjectCard({
  title,
  description,
  tags,
  href,
  entranceIndex = 0,
}: ProjectCardProps) {
  const tagList = Array.isArray(tags) ? tags : [];
  const external = typeof href === "string" && /^https?:\/\//i.test(href); // http(s) opens new tab; same-repo paths stay in-tab.
  const isPlaceholder = !href || href === "#"; // No public demo URL yet — show resume fallback instead of dead link.
  const filename = titleToFilename(title);

  return (
    <article
      className="pcard pcard--mobile animate-fade-slide-up"
      style={{
        animationDelay: `${entranceIndex * PROJECT_CARD_ENTRANCE_STAGGER_MS}ms`,
      }}
    >
      <div className="pcard__bar">
        <div className="pcard__dots" aria-hidden="true">
          <span className="pcard__dot pcard__dot--red" />
          <span className="pcard__dot pcard__dot--yellow" />
          <span className="pcard__dot pcard__dot--green" />
        </div>
        <div className="pcard__filename">{filename}</div>
      </div>
      <div className="pcard__body">
        <div className="pcard__body-main">
          <h3 className="pcard__title">{title}</h3>
          <p className="pcard__desc pcard__desc--clamp">{description}</p>
        </div>
        <div className="pcard__actions">
          {tagList.length > 0 ? (
            <ul className="pcard__tags" aria-label="Technologies">
              {tagList.map((tag) => (
                <li key={tag} className="pcard__tag">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
          {isPlaceholder ? (
            <span className="pcard__placeholder">Link soon - see resume.</span>
          ) : (
            <a
              className="pcard__link"
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
            >
              View <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
