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
      "Shipped a safety-review pipeline that catches LLM over-refusals in live daily traffic using a scheduled Cloud Run job and a deterministic classifier, giving the team an audit process for failure modes that had gone unmeasured",
      "Traced an unsafe medication-dosing behavior back to policy after a member complaint, replacing a blanket refusal rule with a three-tier decision policy and pinning the fix in place with a 16-case regression suite",
      "Rebuilt an eval suite's grading layer from 57 brittle regex heuristics into an LLM-as-judge design that scores responses semantically against per-case rubrics, calibrated to agree with human reviewers over 70% of the time",
      "Wrote an orchestration engine for AI clinical-safety review that runs its checks concurrently and fails open, so a failing check never blocks plan generation",
    ],
  },
  {
    role: "Software Engineer Intern",
    organization: "Capital One",
    location: "McLean, VA",
    period: "Jun 2026 – Jul 2026",
    highlights: [
      "Added in-place content updates to a NestJS service fielding 300k+ API calls a day, retiring a Slack-and-PR migration process and shrinking turnaround from over a week to seconds",
      "Designed a stateless JWT confirmation flow that enforces single-use consent without a database ledger, binding each token to a body hash and state fingerprint to close off consent-then-swap and replay attacks",
      "Built secure cross-environment data promotion through batch export/import endpoints, keeping air-gapped AWS boundaries intact and removing the need for 1000+ line migration PRs",
    ],
  },
  {
    role: "Software Tech Lead",
    organization: "Northeastern Electric Racing Team",
    location: "Boston, MA",
    period: "Jan 2025 – Apr 2026",
    highlights: [
      "Led 10+ engineers maintaining a React/Node ERP for 60+ users across 4 sub-teams, shipping calendar releases that cut scheduling conflicts and lifted satisfaction from 4 to 8/10",
      "Built and ran an onboarding program for 10 new members with weekly frontend and backend lectures plus office hours, raising retention by roughly 40%",
    ],
  },
];

export const projects = [
  {
    id: "medora",
    title: "Medora",
    subtitle:
      "Offline polypharmacy assistant on a fine-tuned Gemma 4, cross-referencing 1.4M+ drug interactions",
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
    subtitle: "Round-robin cloud autoscaling simulator",
    date: "Mar 2026 – Apr 2026",
    tech: ["C++", "Round Robin Scheduling", "Cloud Autoscaling"],
    github: "https://github.com/Wallfou/cloud-autoscaling-simulator",
  },
];
