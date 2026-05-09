import type { MouseEvent } from "react";
import { siteContent } from "../data/siteContent";

function scrollToWork(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  const el = document.getElementById("work");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", "#work");
  }
}

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="layout-inner hero__inner">
        <p className="section-label">{siteContent.heroEyebrow}</p>
        <h1 id="hero-heading" className="hero__name">
          Toni Ojeda<span className="hero__dot">.</span>
        </h1>
        <p className="hero__lede muted">{siteContent.heroLede}</p>
        <div className="hero__actions">
          <a
            className="button button--primary"
            href="#work"
            onClick={scrollToWork}
          >
            View my work
          </a>
          <a
            className="button button--ghost"
            href={siteContent.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
