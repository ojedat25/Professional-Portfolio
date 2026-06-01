import type { CSSProperties } from "react";
import { siteContent } from "../data/siteContent";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

const SKILL_GROUPS = [
  {
    heading: "Technical",
    items: siteContent.skills.technical,
    ariaLabel: "Technical skills",
    delay: "0ms",
  },
  {
    heading: "Languages",
    items: siteContent.skills.languages,
    ariaLabel: "Human languages",
    delay: "100ms",
  },
  {
    heading: "Soft skills",
    items: siteContent.skills.soft,
    ariaLabel: "Soft skills",
    delay: "200ms",
  },
] as const;

function SkillGroup({
  heading,
  items,
  ariaLabel,
  delay,
}: {
  heading: string;
  items: readonly string[];
  ariaLabel: string;
  delay: string;
}) {
  const { ref: revealRef, isVisible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <div
      ref={revealRef}
      className={`skills__group reveal ${isVisible ? "is-visible" : ""}`}
      style={{ "--reveal-delay": delay } as CSSProperties}
    >
      <h2 className="skills__heading">{heading}</h2>
      <ul className="skills__chips" aria-label={ariaLabel}>
        {items.map((item, index) => (
          <li key={item}>
            <span
              className="skill-chip"
              style={{ "--i": index } as CSSProperties}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Skills() {
  return (
    <div className="skills">
      <div className="editor editor--section">
        <div className="editor__bar">
          <div className="editor__dots" aria-hidden="true">
            <span className="editor__dot editor__dot--red" />
            <span className="editor__dot editor__dot--yellow" />
            <span className="editor__dot editor__dot--green" />
          </div>
          <div className="editor__filename">Skills.tsx</div>
        </div>
        <div className="editor__body">
          <p id="skills-label" className="comment">
            Skills
          </p>
          <div className="skills__groups">
            {SKILL_GROUPS.map((group) => (
              <SkillGroup key={group.heading} {...group} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
