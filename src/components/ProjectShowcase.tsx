"use client";

import Image from "next/image";
import { useState } from "react";
import { projects, projectsIntro } from "@/lib/data";

export default function ProjectShowcase() {
  const [activeId, setActiveId] = useState(projects[0].id);

  return (
    <div className="mt-10 md:flex">
      {/* every image is mounted and toggled by opacity so hovering never waits
          on a network request */}
      <div className="projects-media relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#f2f2f2] md:aspect-auto md:w-1/2">
        {projects.map((project, i) => (
          <Image
            key={project.id}
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            priority={i === 0}
            className={`object-cover ${
              project.id === activeId ? "" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="mt-8 md:mt-0 md:ml-16">
        <p className="max-w-[34rem] text-base leading-snug text-[#3a3a3a]">
          {projectsIntro}
        </p>
        <div className="exp-list mt-8 space-y-1.5">
          {projects.map((project) => (
            <p
              key={project.id}
              onMouseEnter={() => setActiveId(project.id)}
              className="exp-row text-base leading-snug"
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="lowercase"
              >
                {project.title}
              </a>
              <span className="exp-role">, {project.subtitle}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
