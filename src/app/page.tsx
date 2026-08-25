import { siteConfig } from "@/lib/data";
import Nav from "@/components/Nav";
import ExperienceList from "@/components/ExperienceList";

export default function Home() {
  return (
    <main>
      {/* hero: name + nav, contacts, bio, and scroll cue pinned to the four corners */}
      <section className="flex min-h-svh flex-col justify-between px-12 py-9 md:px-24 md:py-11">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-base font-bold">{siteConfig.name}</h1>
            <Nav className="mt-1" />
          </div>

          <div className="text-base leading-snug sm:text-right">
            <p>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>
            <p>
              <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}>
                {siteConfig.phone}
              </a>
            </p>
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
            <p className="text-[#6b6b6b]">{siteConfig.location}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-8 sm:mt-0 sm:flex-row sm:items-end sm:justify-between sm:gap-16">
          <p className="max-w-[34rem] text-base leading-snug text-[#3a3a3a]">
            {siteConfig.bio}
          </p>
          <a href="#experience" className="shrink-0 text-base sm:text-right">
            Scroll more for my experiences
          </a>
        </div>
      </section>

      {/* experience: click a row to expand what I did there */}
      <section
        id="experience"
        className="px-12 pt-9 pb-16 md:px-24 md:pt-11 md:pb-24"
      >
        <ExperienceList />
      </section>
    </main>
  );
}
