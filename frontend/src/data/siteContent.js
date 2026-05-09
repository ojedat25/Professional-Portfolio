/**
 * Site copy and links. Replace placeholder URLs when ready.
 * Project blurbs follow the resume / PDF mockup.
 */

export const siteContent = {
  email: "toniojeda2015@gmail.com",
  githubUrl: "https://github.com/ojedat25",
  linkedinUrl: "https://www.linkedin.com/in/ojedat20/",
  resumeUrl: "#",

  bio: `Recently graduated CS student from Augsburg University with a Data Science minor. I've shipped real features at SureAttend as a software development intern, including leading a full Stripe payment integration end to end across Django and React. Looking for a new challenge and opportunity to grow.`,

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
      id: "auggie",
      title: "AuggieTaskManager",
      description:
        "Academic task manager that imports Moodle assignments via iCal. Built with Electron, React, Django REST, and PostgreSQL.",
      tags: ["React", "Django", "Electron"],
      href: "https://github.com/ojedat25/Auggie-Task-Manager/tree/main",
    },
    {
      id: "sureattend",
      title: "SureAttend Stripe",
      description:
        "Led payment integration as product lead. Built checkout flows across Django backend and React/Vite frontend.",
      tags: ["Stripe", "Django", "React"],
      href: "#",
    },
  ],
};
