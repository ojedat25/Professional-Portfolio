import { siteContent } from "../data/siteContent.js";

function outboundProps(href) {
  if (/^https?:\/\//i.test(href)) {
    return { target: "_blank", rel: "noopener noreferrer" };
  }
  return {};
}

export default function About() {
  return (
    <div className="about">
      <p id="about-label" className="section-label">
        About
      </p>
      <div className="about__grid">
        <p className="about__bio">{siteContent.bio}</p>
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
