export default function ProjectCardSkeleton() {
  return (
    <article
      className="project-card project-card--skeleton"
      aria-hidden="true"
    >
      <div className="skeleton skeleton--title" />
      <div className="skeleton skeleton--line" />
      <div className="skeleton skeleton--line skeleton--short" />
      <div className="project-card__tags">
        <span className="skeleton skeleton--tag" />
        <span className="skeleton skeleton--tag" />
        <span className="skeleton skeleton--tag" />
      </div>
    </article>
  );
}
