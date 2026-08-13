export const siteConfig = {
  name: "Kenneth Fan",
  role: "Software Engineer",
  location: "Boston, MA",
  bio: "Hello! I'm Kenneth, a CS student at Northeastern. Currently, I'm working as a software engineer Co-op at Function Health, contributing to a pretty cool AI-powered proactive health care service. Before this, I worked at Capital One on internal questionnaire management as an intern. I'm looking for more opportunities in 2027, so please reach out!",
  email: "wafan2004@gmail.com",
  phone: "856-571-9766",
  linkedin: "https://www.linkedin.com/in/kennethfan2/",
  github: "https://github.com/Wallfou",
};

export const experiences = [
  {
    role: "Software Engineer Co-op",
    organization: "Function Health",
    website: "https://www.functionhealth.com",
    location: "Boston, MA",
    period: "Jul 2026 – Present",
    highlights: [
      "I'm currently enjoying my time at Function Health, working on the Navigating Care team to build out Function's health data analysis features",
      "For now, my work has been focused on contributing to the safety/value of our AI chat service",
      "A lot of it comes down to building out the evaluation infrastructure, specifically tackling the sensitivity of the model's medical guardrails",
      "I have also been contributing to Function's action plan service, mainly working on roadmap features to revamp user experiences on both mobile and web applications, as well as architecting observability infrastructure to improve monitoring",
    ],
  },
  {
    role: "Software Engineer Intern",
    organization: "Capital One",
    website: "https://www.capitalone.com",
    location: "McLean, VA",
    period: "Jun 2026 – Jul 2026",
    highlights: [
      "I worked on an internal bank case questionnaire management service with substantial impact, quantified to be around 300k+ API calls per day",
      "The service's critical bottleneck was the lack of self-servicing capabilities",
      "This meant internal agents had to rely on engineers to apply questionnaire updates through PR reviews and database migrations",
      "To resolve the issue, I implemented features that allow in-place content updates and cross-environment data promotion, eliminating the tedious review/migration process completely",
      "The best part of this internship was hearing the reactions when I told other engineers that the process, which used to take up to a week, can now be done in seconds",
    ],
  },
  {
    role: "Software Tech Lead",
    organization: "Northeastern Electric Racing Team",
    website: "https://electricracing.northeastern.edu",
    location: "Boston, MA",
    period: "Jan 2025 – Apr 2026",
    highlights: [
      "I was a part of the software department that developed the enterprise resource planning system at Northeastern's electric racing club",
      "We had about 60 students across different engineering groups who used the system as a source of truth for schedules, finances, and manufacturing",
      "I was the software lead responsible for managing work around scheduling features",
      "Later, I transitioned into a leading member of the Launchpad onboarding program, hosting weekly lectures on full-stack development to improve new member retention",
    ],
  },
];

export const projects = [
  {
    id: "medora",
    title: "Medora",
    subtitle: "Offline polypharmacy assistant",
    date: "Apr 2026 – May 2026",
    tech: ["Gemma 4", "Python", "Ollama", "Unsloth", "LoRA", "SQLite"],
    github: "https://github.com/Wallfou/medora",
  },
  {
    id: "ai-ticket-generator",
    title: "Ticketeer",
    subtitle: "AI-powered project ticketing tool",
    date: "Mar 2026",
    tech: ["TypeScript", "Python", "Gemini LLM", "GitHub API"],
    github: "https://github.com/Wallfou/Ticketeer",
  },
  {
    id: "draftpicks",
    title: "DraftPicks",
    subtitle: "NBA prop analytics platform",
    date: "Jan 2026 – Present",
    tech: ["TypeScript", "React", "Python", "Flask", "AWS"],
    github: "https://github.com/Wallfou/NBA-PICKS",
  },
  {
    id: "pacman-rl",
    title: "PacMan RL",
    subtitle: "Reinforcement learning agent",
    date: "Sep 2025 – Dec 2025",
    tech: ["Python", "SARSA", "Reinforcement Learning"],
    github: "https://github.com/DonnyLe/cs_4100_final",
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
    id: "cloud-autoscaling",
    title: "Cloud Autoscaling Simulation",
    subtitle: "Round-robin scheduling simulator",
    date: "Mar 2026 – Apr 2026",
    tech: ["C++", "Round Robin Scheduling", "Cloud Autoscaling"],
    github: "https://github.com/Wallfou/cloud-autoscaling-simulator",
  },
];
