export const siteConfig = {
  name: "Wa Fan",
  tagline: "Software Engineer · Boston",
  email: "wafan2004@gmail.com",
  location: "Boston, MA",
  phone: "856-571-9766",
  linkedin: "https://www.linkedin.com/in/kennethfan2/",
  github: "https://github.com/Wallfou",
};

export const projects = [
  {
    id: "draftpicks",
    title: "DraftPicks",
    subtitle: "NBA prop analytics platform",
    date: "Jan 2026 – Present",
    tech: ["TypeScript", "React", "Python", "Flask", "AWS"],
    github: "https://github.com/Wallfou/NBA-PICKS",
  },
  {
    id: "nustack",
    title: "NuStack",
    subtitle: "Real-time Q&A platform",
    date: "Sep 2025 – Jan 2026",
    tech: ["TypeScript", "React", "Node.js", "MongoDB", "Socket.io", "Firebase"],
    github: "https://github.com/Wallfou/NuStack",
  },
  {
    id: "pacman-rl",
    title: "Pac-Man RL Agent",
    subtitle: "Reinforcement learning with SARSA",
    date: "Sep 2025 – Dec 2025",
    tech: ["Python", "SARSA", "Reinforcement Learning"],
    github: "https://github.com/DonnyLe/cs_4100_final",
  },
  {
    id: "ai-ticket-generator",
    title: "AI Ticket Generator",
    subtitle: "AI-powered project management tool",
    date: "Mar 2026",
    tech: ["Python", "Gemini LLM", "REST API", "GitHub API"],
    github: "https://github.com/Wallfou/Ticketeer",
  },
];

export const experiences = [
  {
    role: "Software Tech Lead",
    organization: "Northeastern Electric Racing Team",
    location: "Boston, MA",
    period: "Jan 2025 – Present",
    highlights: [
      "Led a software development team of 10+ engineers maintaining a club-developed ERP application (React, Node.js, Express, Prisma), managing 20+ projects for 60+ users across 4 engineering sub-teams",
      "Drove Agile transformation of the calendar module, delivering sprint-based feature releases that reduced scheduling conflicts and improved user satisfaction from 6.5 to 8.5/10",
      "Developed and led a launchpad program for 10 new club members, delivering weekly lectures and office hours covering fundamental frontend and backend concepts",
    ],
    tech: ["React", "Node.js", "Express", "Prisma"],
  },
  {
    role: "Hackathon Participant",
    organization: "GatewayGS Hackathon",
    location: "Boston, MA",
    period: "Mar 2026",
    highlights: [
      "Built an AI-powered ticket generation tool for software team leads that analyzes GitHub repositories via REST API and decomposes project goals into scoped, classified tickets",
      "Engineered keyword-based file retrieval and priority-weighted context injection to ground Gemini LLM outputs in actual codebase content",
      "Built a conversational AI chatbot enabling iterative ticket refinement through natural language prompts",
    ],
    tech: ["Python", "Gemini LLM", "REST API"],
  },
];

export const skills = {
  Languages: ["Python", "TypeScript", "Java", "JavaScript", "C", "SQL", "HTML/CSS"],
  Frameworks: [
    "React",
    "Node.js",
    "Express",
    "Flask",
    "FastAPI",
    "Jest",
    "Cypress",
    "Prisma ORM",
    "Socket.io",
    "TensorFlow",
  ],
  "Cloud & Data": ["AWS Amplify", "AWS Lambda", "MongoDB", "MySQL", "Firebase"],
  "Developer Tools": ["Git", "Docker", "Linux/Unix", "Jupyter Notebook"],
};

export const education = {
  school: "Northeastern University",
  location: "Boston, MA",
  degree: "Bachelor of Science in Computer Engineering / Computer Science",
  gpa: "3.76",
  graduation: "May 2027",
  coursework: [
    "Fundamentals of Software Engineering",
    "Object-Oriented Programming",
    "Artificial Intelligence",
    "Natural Language Processing",
    "Algorithms & Data Structures",
    "Web Development",
    "Logic and Computation",
  ],
};
