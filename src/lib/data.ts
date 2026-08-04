export const siteConfig = {
  name: "Kenneth Fan",
  role: "Software Engineer",
  location: "Boston, MA",
  bio: "Hello! My name is Kenneth, I'm currently a Computer Science student at Northeastern. Right now I'm working as a software engineer Co-op at Function Health, working on a pretty cool proactive health care service with LLMs. I also previously worked at Capital One as an intern, and I'm looking for more opportunities in 2027, so please reach out!",
  email: "wafan2004@gmail.com",
  phone: "856-571-9766",
  linkedin: "https://www.linkedin.com/in/kennethfan2/",
  github: "https://github.com/Wallfou",
};

export const experiences = [
  {
    role: "Software Engineer Co-op",
    organization: "Function Health",
    location: "Boston, MA",
    period: "Jul 2026 – Present",
    highlights: [
      "Leading an end-to-end observability overhaul of a Tier 1 service by defining 4 SLOs, migrating all alerting to Terraform, and instrumenting the AI pipeline — projected to cut incident detection from hours to minutes",
      "Contributing to an AI health guidance service with an event-driven LLM pipeline that processes 18K+ clinical events weekly from 6 data sources into personalized, clinician-reviewed action plans",
    ],
  },
  {
    role: "Software Engineer Intern",
    organization: "Capital One",
    location: "McLean, VA",
    period: "Jun 2026 – Jul 2026",
    highlights: [
      "Architected a secure cross-environment data promotion tool via batch export/import endpoints, preserving air-gapped AWS infrastructure boundaries and eliminating manual TypeORM migration scripts",
      "Implemented an in-place content update API for Bank Claims Questionnaires, cutting workflow delays from ~1 hour to seconds",
      "Optimized a memory-heavy database scan into a single index-only SQL aggregate, maintaining throughput across millions of rows while using pessimistic write locks to mitigate race conditions",
      "Engineered a state-bound JWT confirmation flow to prevent consent-then-swap vulnerabilities",
    ],
  },
  {
    role: "Software Tech Lead",
    organization: "Northeastern Electric Racing Team",
    location: "Boston, MA",
    period: "Jan 2025 – Apr 2026",
    highlights: [
      "Led 10+ engineers maintaining a React/Node ERP for 60+ users across 4 sub-teams, raising user satisfaction from 4 to 8/10",
      "Developed and led an onboarding program for 10 new members, hosting weekly frontend/backend lectures and office hours that increased member retention by ~40%",
    ],
  },
];

export const projects = [
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
    id: "medora",
    title: "Medora",
    subtitle: "Offline polypharmacy assistant powered by Gemma 4",
    date: "Mar 2026 – May 2026",
    tech: ["Gemma 4", "Python", "Ollama", "Unsloth"],
    github: "https://github.com/Wallfou/medora",
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
    subtitle: "Round-robin cloud autoscaling simulator",
    date: "Mar 2026 – Apr 2026",
    tech: ["C++", "Round Robin Scheduling", "Cloud Autoscaling"],
    github: "https://github.com/Wallfou/cloud-autoscaling-simulator",
  },
];
