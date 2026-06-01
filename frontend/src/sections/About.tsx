import { siteContent } from "../data/siteContent";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

export default function About() {
  const revealRef = useRevealOnScroll<HTMLDivElement>();

  return (
    <div ref={revealRef} className="about reveal">
      <div className="editor editor--section">
        <div className="editor__bar">
          <div className="editor__dots" aria-hidden="true">
            <span className="editor__dot editor__dot--red" />
            <span className="editor__dot editor__dot--yellow" />
            <span className="editor__dot editor__dot--green" />
          </div>
          <div className="editor__filename">About.tsx</div>
        </div>
        <div className="editor__body">
          <p id="about-label" className="comment">
            About
          </p>
          <div className="about__main">
            <p className="about__bio">{siteContent.bio}</p>
            {siteContent.aboutExtra.map((para) => (
              <p key={para} className="about__bio about__bio--secondary">
                {para}
              </p>
            ))}
            <div className="about__block">
              <h3 className="about__subhead">Education</h3>
              <ul className="about__list">
                {siteContent.educationShort.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="about__block">
              <h3 className="about__subhead">Experience</h3>
              <ul className="about__experience">
                {siteContent.experienceHighlights.map((job) => (
                  <li key={job.title} className="about__job">
                    <p className="about__job-title">{job.title}</p>
                    <p className="about__job-meta">{job.meta}</p>
                    <p className="about__job-line">{job.oneLiner}</p>
                  </li>
                ))}
              </ul>
            </div>
            <a
              className="about__link"
              href={siteContent.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
