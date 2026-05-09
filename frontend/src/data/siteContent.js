import resumeUrl from "../assets/resume.pdf?url";

/**
 * Site copy aligned with resume. Update links when you publish repos or demos.
 */

export const siteContent = {
  email: "toniojeda2015@gmail.com",
  githubUrl: "https://github.com/ojedat25",
  linkedinUrl: "https://www.linkedin.com/in/ojedat20/",
  resumeUrl,

  heroEyebrow: "Software developer - Minneapolis",
  heroLede:
    "Full-stack developer finishing my CS degree at Augsburg (May 2026). I intern at SureAttend on Django REST and React/Vite, and I'm fluent in English and Spanish.",

  bio: `I'm a full-stack developer who ships real products - currently as a software intern at SureAttend, where I've led features like our Stripe integration across the stack. I care about clear UX, solid APIs, and integrations that hold up in production.`,

  aboutExtra: [
    "For degrees and timeline, see education below; for full bullets on internships and prior roles, grab the PDF - this page stays short on purpose.",
  ],

  educationShort: [
    "B.S. Computer Science, minor in Data Science - Augsburg University, Minneapolis, MN (expected May 2026)",
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

  projects: [
    {
      id: "macroscout",
      title: "MacroScout",
      description:
        "iOS nutrition tracker built in SwiftUI with USDA FoodData Central integration and SwiftData persistence.",
      tags: ["SwiftUI", "SwiftData", "iOS"],
      href: "https://github.com/ojedat25/MacroScout",
    },
    {
      id: "meal-plans",
      title: "Augsburg Meal Plans & Housing Data Visualization",
      description:
        "Collected years of archived housing and meal-plan data via the Wayback Machine, then analyzed and charted it in R, ggplot2, and Quarto - including trend context against food inflation.",
      tags: ["R", "ggplot2", "Quarto"],
      href: "#",
    },
    {
      id: "auggie-task-manager",
      title: "Auggie Task Manager",
      description:
        "Academic desktop app: Electron, React, TypeScript, Django REST, PostgreSQL. Imports Moodle assignments over iCal with a 0-3 difficulty heuristic; team delivery with Jira and GitHub.",
      tags: ["Electron", "React", "TypeScript", "Django", "PostgreSQL"],
      href: "https://github.com/ojedat25/Auggie-Task-Manager/tree/main",
    },
  ],
};
