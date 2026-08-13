import { projects } from "@/lib/data";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  return (
    <main className="max-w-[43rem] mx-auto px-5 pt-20 pb-12 md:pt-28 md:pb-16">
      <Nav />

      {/* projects */}
      <section id="projects" className="mb-10">
        <p className="text-base leading-snug text-[#3a3a3a] mb-4">
          Here are some personal projects that I have worked on over the past years. These were important stepping stones for my journey as a student, and I started them out of curiosity for an unfamiliar topic/concept. Right now I am working on the ARC Prize competition, which I am very excited about! Hopefully I will have something to show soon.
        </p>
        <div className="space-y-1.5">
          {projects.map((project) => (
            <p key={project.id} className="text-base leading-snug">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="green-link font-bold lowercase"
              >
                {project.title}
              </a>
              <span className="text-[#8a8a8a]">, {project.subtitle}</span>
            </p>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
