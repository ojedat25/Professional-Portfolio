import { useEffect, useState, useSyncExternalStore, type MouseEvent } from "react";
import { siteContent } from "../data/siteContent";
import { useTypewriter } from "../hooks/useTypewriter";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void): () => void {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
}

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
  const reducedMotion = usePrefersReducedMotion();
  const titles =
    siteContent.heroRotatingTitles.length > 0
      ? siteContent.heroRotatingTitles
      : [siteContent.heroLede];
  const [titleIndex, setTitleIndex] = useState(0);
  const currentTitle = titles[titleIndex] ?? titles[0] ?? siteContent.heroLede;
  const { displayText, isComplete } = useTypewriter(currentTitle);

  useEffect(() => {
    if (reducedMotion) return;
    if (titles.length <= 1) return;
    if (!isComplete) return;

    const HOLD_MS = 1400;
    const timeoutId = window.setTimeout(() => {
      setTitleIndex((i) => (i + 1) % titles.length);
    }, HOLD_MS);

    return () => window.clearTimeout(timeoutId);
  }, [isComplete, reducedMotion, titles.length]);

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="layout-inner hero__inner">
        <div className="editor editor--hero">
          <div className="editor__bar">
            <div className="editor__dots" aria-hidden="true">
              <span className="editor__dot editor__dot--red" />
              <span className="editor__dot editor__dot--yellow" />
              <span className="editor__dot editor__dot--green" />
            </div>
            <div className="editor__filename">Hero.tsx</div>
          </div>
          <div className="editor__body editor__body--gutter">
            <div className="editor__gutter" aria-hidden="true">
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="editor__line">
                  {i + 1}
                </span>
              ))}
            </div>
            <div className="editor__main">
              <p
                className="comment animate-fade-slide-up"
                style={{ animationDelay: "0ms" }}
              >
                {siteContent.heroEyebrow}
              </p>
              <h1
                id="hero-heading"
                className="hero__name animate-fade-slide-up"
                style={{ animationDelay: "150ms" }}
              >
                Toni Ojeda<span className="hero__period">.</span>
              </h1>
              <p
                className="hero__lede muted animate-fade-slide-up"
                style={{ animationDelay: "300ms" }}
              >
                {displayText}
                <span className="hero__typewriter-cursor" aria-hidden="true" />
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
          </div>
        </div>
      </div>
    </section>
  );
}
