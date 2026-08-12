import { siteConfig, experiences, projects } from "@/lib/data";

export default function Home() {
  return (
    <main className="max-w-[39.6rem] mx-auto px-5 py-12 md:py-16">
      {/* header */}
      <header className="mb-10">
        <h1 className="font-serif text-3xl md:text-4xl font-normal tracking-tight mb-3">
          {siteConfig.name}
        </h1>
        <p className="text-sm leading-relaxed text-[#3a3a3a]">{siteConfig.bio}</p>
      </header>

      {/* experience */}
      <section id="experience" className="mb-10">
        <div className="space-y-7">
          {experiences.map((exp) => (
            <div key={exp.organization}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-2">
                <h3 className="font-serif text-lg md:text-xl">
                  {exp.role} <span className="text-[#8a8a8a]">·</span>{" "}
                  {exp.organization}
                </h3>
                <span className="text-xs tracking-wide whitespace-nowrap text-[#8a8a8a]">
                  {exp.period}
                </span>
              </div>
              <p className="text-sm leading-snug text-[#3a3a3a]">
                {exp.highlights.join(". ")}.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* projects */}
      <section id="projects" className="mb-10">
        <p className="text-sm leading-snug text-[#3a3a3a] mb-4">
          Here are some personal projects that I have worked on over the past years. These were important stepping stones for my journey as a student, and I started them out of curiosity for an unfamiliar topic/concept. Right now I am working on the ARC Prize competition, which I am very excited about! Hopefully I will have something to show soon.
        </p>
        <div className="space-y-1.5">
          {projects.map((project) => (
            <p key={project.id} className="text-sm leading-snug">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link font-medium"
              >
                {project.title}
              </a>
              <span className="text-[#8a8a8a]">, {project.subtitle}</span>
            </p>
          ))}
        </div>
      </section>

      {/* contact */}
      <section id="contact" className="mb-10">
        <div className="space-y-1 text-sm">
          <p>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
          <p>
            <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}>
              {siteConfig.phone}
            </a>
          </p>
          <p className="text-[#3a3a3a]">{siteConfig.location}</p>
          <p>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
          <p>
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </p>
        </div>
      </section>

      {/* footer */}
      <footer className="pt-6 border-t border-[#e8e8e8] text-xs tracking-wide text-[#8a8a8a]">
        © 2026 {siteConfig.name}
      </footer>
    </main>
  );
}
