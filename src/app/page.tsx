import { siteConfig, experiences } from "@/lib/data";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="max-w-[39.6rem] mx-auto px-5 pt-13 pb-12 md:pt-16 md:pb-16">
      <Nav />

      {/* about me */}
      <header className="mb-10">
        <p className="text-base leading-snug text-[#3a3a3a]">{siteConfig.bio}</p>
      </header>

      {/* experience */}
      <section id="experience" className="mb-10">
        <div className="space-y-7">
          {experiences.map((exp) => (
            <div key={exp.organization}>
              <h3 className="font-serif text-base md:text-lg mb-2">
                <a
                  href={exp.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="green-link font-bold"
                >
                  {exp.organization}
                </a>{" "}
                <span className="text-[#8a8a8a]">·</span>{" "}
                <span className="lowercase">{exp.role}</span>
              </h3>
              <p className="text-base leading-snug text-[#3a3a3a]">
                {exp.highlights.join(". ")}.
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
