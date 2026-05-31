import type { MouseEvent } from "react";
import { siteContent } from "../data/siteContent";
import { useTypewriter } from "../hooks/useTypewriter";

function scrollToWork(event: MouseEvent<HTMLAnchorElement>) {
  // preventDefault + scrollIntoView for smooth scroll; replaceState updates hash without reload jump.
  event.preventDefault();
  const el = document.getElementById("work");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", "#work");
  }
}

export default function Hero() {
  const { displayText, isComplete } = useTypewriter(siteContent.heroLede);

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="layout-inner hero__inner">
        <p
          className="section-label animate-fade-slide-up"
          style={{ animationDelay: "0ms" }}
        >
          {siteContent.heroEyebrow}
        </p>
        <h1
          id="hero-heading"
          className="hero__name animate-fade-slide-up"
          style={{ animationDelay: "150ms" }}
        >
          Toni Ojeda<span className="hero__dot">.</span>
        </h1>
        <p
          className="hero__lede muted animate-fade-slide-up"
          style={{ animationDelay: "300ms" }}
        >
          {displayText}
          <span
            className={`hero__typewriter-cursor${isComplete ? " hero__typewriter-cursor--done" : ""}`}
            aria-hidden="true"
          >
            |
          </span>
        </p>
        <div
          className="hero__actions animate-fade-slide-up"
          style={{ animationDelay: "450ms" }}
        >
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
