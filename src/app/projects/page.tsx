import { siteConfig } from "@/lib/data";
import Nav from "@/components/Nav";
import ProjectShowcase from "@/components/ProjectShowcase";

export default function ProjectsPage() {
  return (
    <main className="projects-shell flex flex-col px-12 py-9 md:h-svh md:px-24 md:py-11">
      <header className="projects-header">
        <h1 className="text-base font-bold">{siteConfig.name}</h1>
        <Nav className="mt-1" />
      </header>

      <ProjectShowcase />
    </main>
  );
}
