import { siteConfig, experiences, projects } from "@/lib/data";

export default function Home() {
  return (
    <main className="max-w-xl mx-auto px-5 py-12 md:py-16">
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
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-1">
                <h3 className="font-serif text-lg md:text-xl">
                  {exp.role} <span className="text-[#8a8a8a]">·</span>{" "}
                  {exp.organization}
                </h3>
                <span className="text-xs tracking-wide whitespace-nowrap text-[#8a8a8a]">
                  {exp.period}
                </span>
              </div>
              <p className="text-xs tracking-wide text-[#8a8a8a] mb-2">
                {exp.location}
              </p>
              <p className="text-sm leading-snug text-[#3a3a3a]">
                {exp.highlights.join(". ")}.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* projects */}
      <section id="projects" className="mb-10">
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-lg md:text-xl inline-block"
              >
                {project.title}
              </a>
              <p className="text-xs text-[#8a8a8a] mt-0.5">
                {project.subtitle} <span className="text-[#c0c0c0]">·</span>{" "}
                {project.date}
              </p>
            </div>
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
