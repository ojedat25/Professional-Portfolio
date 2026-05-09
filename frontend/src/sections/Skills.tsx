import { siteContent } from "../data/siteContent";

export default function Skills() {
  const { skills } = siteContent;

  return (
    <div className="skills">
      <p id="skills-label" className="section-label">
        Skills
      </p>
      <div className="skills__groups">
        <div className="skills__group">
          <h2 className="skills__heading">Technical</h2>
          <ul className="skills__chips" aria-label="Technical skills">
            {skills.technical.map((item) => (
              <li key={item}>
                <span className="skill-chip">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="skills__group">
          <h2 className="skills__heading">Languages</h2>
          <ul className="skills__chips" aria-label="Human languages">
            {skills.languages.map((item) => (
              <li key={item}>
                <span className="skill-chip">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="skills__group">
          <h2 className="skills__heading">Soft skills</h2>
          <ul className="skills__chips" aria-label="Soft skills">
            {skills.soft.map((item) => (
              <li key={item}>
                <span className="skill-chip">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
