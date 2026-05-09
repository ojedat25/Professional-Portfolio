import { siteContent } from "../data/siteContent.js";

function outboundProps(href) {
  if (!href || href === "#") {
    return {};
  }
  if (/^mailto:/i.test(href)) {
    return {};
  }
  if (/^https?:\/\//i.test(href)) {
    return { target: "_blank", rel: "noopener noreferrer" };
  }
  return { target: "_blank", rel: "noopener noreferrer" };
}

export default function About() {
  return (
    <div className="about">
      <p id="about-label" className="section-label">
        About
      </p>
      <div className="about__grid">
        <div className="about__main">
          <p className="about__bio">{siteContent.bio}</p>
          {siteContent.aboutExtra?.map((para) => (
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
        </div>
        <div className="about__contact">
          <h2 className="about__cta-heading">Let&apos;s talk</h2>
          <ul className="about__links">
            <li>
              <a className="about__link" href={`mailto:${siteContent.email}`}>
                {siteContent.email}
              </a>
            </li>
            <li>
              <a
                className="about__link"
                href={siteContent.linkedinUrl}
                {...outboundProps(siteContent.linkedinUrl)}
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a
                className="about__link"
                href={siteContent.resumeUrl}
                {...outboundProps(siteContent.resumeUrl)}
              >
                Resume <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
