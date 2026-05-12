export default function MobileProjectCardSkeleton() {
  return (
    <article
      className="project-card project-card--mobile project-card--skeleton"
      aria-hidden="true"
    >
      <div className="project-card__body">
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--line skeleton--short" />
      </div>
      <div className="project-card__actions">
        <div className="project-card__tags">
          <span className="skeleton skeleton--tag" />
          <span className="skeleton skeleton--tag" />
        </div>
      </div>
    </article>
  );
}
