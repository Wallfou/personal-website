"use client";

import Image from "next/image";
import { useState } from "react";
import { projects, projectsIntro } from "@/lib/data";
import { assetPath } from "@/lib/assetPath";

export default function ProjectShowcase() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const hovered = projects.find((project) => project.id === hoveredId);
  // hovering sticks: whatever was last pointed at stays up after the cursor
  // leaves. Before any hover, the first image stands in behind the intro.
  const shownId = hovered?.id ?? projects[0].id;

  return (
    <div className="mt-10 md:flex">
      {/* every image is mounted and toggled by opacity so hovering never waits
          on a network request */}
      <div className="projects-media relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#f2f2f2] md:aspect-auto md:w-1/2">
        {projects.map((project, i) => (
          <Image
            key={project.id}
            src={assetPath(project.image)}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            priority={i === 0}
            className={`object-cover object-center ${
              project.id === shownId ? "" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* two children only, so justify-between pins the copy to the top and the
          list to the bottom - swapping the text changes the gap, never the
          position of either block */}
      <div className="mt-8 md:mt-0 md:ml-16 md:flex md:flex-1 md:flex-col md:justify-between">
        <p className="max-w-[34rem] text-base leading-snug text-[#3a3a3a]">
          {hovered ? hovered.blurb : projectsIntro}
        </p>

        <div className="exp-list mt-16 space-y-1.5 md:mt-0">
          {projects.map((project) => (
            <p key={project.id} className="text-base leading-snug">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredId(project.id)}
                className="exp-row lowercase"
              >
                {project.title}
              </a>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
