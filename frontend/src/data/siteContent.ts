import resumeUrl from "../assets/resume.pdf?url";

export type ExperienceHighlight = {
  title: string;
  meta: string;
  oneLiner: string;
};

export type SkillsBlock = {
  technical: string[];
  languages: string[];
  soft: string[];
};

export type SiteContent = {
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
  heroEyebrow: string;
  heroLede: string;
  bio: string;
  aboutExtra: string[];
  educationShort: string[];
  experienceHighlights: ExperienceHighlight[];
  skills: SkillsBlock;
};

/**
 * Site copy aligned with resume. Update links when you publish repos or demos.
 */
export const siteContent: SiteContent = {
  email: "toniojeda2015@gmail.com",
  githubUrl: "https://github.com/ojedat25",
  linkedinUrl: "https://www.linkedin.com/in/ojedat20/",
  resumeUrl,

  heroEyebrow: "Software developer - Minneapolis",
  heroLede:
    "I'm Toni, a full-stack developer based in Minneapolis. I build apps and websites, and I build them well.",

  bio: `I just finished my Computer Science degree at Augsburg University, and I've spent the last couple years building actual things alongside my coursework. A payment integration at my internship, a desktop app with my senior team, an iOS nutrition tracker I built for myself because I couldn't find one I liked.


I like understanding how things work. That goes for code, but also just in general. I stay on top of what's happening in tech, spend time gaming, and tend to go deep on whatever I'm into at the moment.`,

  aboutExtra: [
    "For degrees and timeline, see education below; for full bullets on internships and prior roles, grab the PDF",
  ],

  educationShort: [
    "B.S. Computer Science, minor in Data Science - Augsburg University, Minneapolis, MN (May 2026)",
    "A.S. Computer Science - Anoka Ramsey Community College, Coon Rapids, MN (May 2024)",
  ],

  experienceHighlights: [
    {
      title: "Software Development Intern - SureAttend (remote)",
      meta: "Apr 2025 - present",
      oneLiner:
        "Product lead for Stripe integration; Django REST backend, React/Vite frontend, staging on Render/Cloudflare.",
    },
    {
      title: "Sales Lead - American Freight, Coon Rapids, MN",
      meta: "Aug 2023 - Nov 2024",
      oneLiner:
        "Led floor and warehouse staff; strong problem-solving with customers and bilingual outreach.",
    },
  ],

  skills: {
    technical: [
      "JavaScript",
      "TypeScript",
      "React",
      "Vite",
      "Electron",
      "Python",
      "Django REST Framework",
      "Node.js",
      "PostgreSQL",
      "MySQL",
      "REST APIs",
      "SwiftUI",
      "R",
      "ggplot2",
      "Java",
      "Git",
    ],
    languages: ["English (fluent)", "Spanish (fluent)"],
    soft: [
      "Leadership",
      "Management",
      "Multitasking",
      "Critical thinking",
      "Continuous self-improvement",
    ],
  },
};
