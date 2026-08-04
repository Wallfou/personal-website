import { siteConfig, experiences, projects } from "@/lib/data";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-6 md:px-0 py-20 md:py-32">
      {/* header */}
      <header className="mb-20 md:mb-28">
        <p className="label mb-6">
          {siteConfig.role} · {siteConfig.location}
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-normal tracking-tight mb-8">
          {siteConfig.name}
        </h1>
        <p className="max-w-xl text-base md:text-lg leading-relaxed text-[#3a3a3a]">
          {siteConfig.bio}
        </p>
      </header>

      {/* experience */}
      <section id="experience" className="mb-20 md:mb-28">
        <h2 className="label mb-10">Experience</h2>
        <div className="space-y-14">
          {experiences.map((exp) => (
            <div key={exp.organization}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                <h3 className="font-serif text-xl md:text-2xl">
                  {exp.role} <span className="text-[#8a8a8a]">·</span>{" "}
                  {exp.organization}
                </h3>
                <span className="text-xs tracking-wide whitespace-nowrap text-[#8a8a8a]">
                  {exp.period}
                </span>
              </div>
              <p className="text-xs tracking-wide text-[#8a8a8a] mb-4">
                {exp.location}
              </p>
              <ul className="space-y-2.5">
                {exp.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-[#3a3a3a]">
                    <span className="text-[#c0c0c0]">—</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* projects */}
      <section id="projects" className="mb-20 md:mb-28">
        <h2 className="label mb-10">Projects</h2>
        <div className="space-y-8">
          {projects.map((project) => (
            <div key={project.id}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-xl md:text-2xl inline-block"
              >
                {project.title}
              </a>
              <p className="text-sm text-[#8a8a8a] mt-1">
                {project.subtitle} <span className="text-[#c0c0c0]">·</span>{" "}
                {project.date}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* contact */}
      <section id="contact" className="mb-20">
        <h2 className="label mb-10">Contact</h2>
        <div className="space-y-2 text-base">
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
      <footer className="pt-10 border-t border-[#e8e8e8] text-xs tracking-wide text-[#8a8a8a]">
        © 2026 {siteConfig.name}
      </footer>
    </main>
  );
}
