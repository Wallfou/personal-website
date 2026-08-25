"use client";

import { useState } from "react";
import { experiences } from "@/lib/data";

export default function ExperienceList() {
  const [openOrg, setOpenOrg] = useState<string | null>(null);

  return (
    <ul className="border-t border-[var(--border)]">
      {experiences.map((exp) => {
        const open = openOrg === exp.organization;
        const panelId = `exp-${exp.organization.replace(/\s+/g, "-").toLowerCase()}`;

        return (
          <li key={exp.organization} className="border-b border-[var(--border)]">
            <button
              type="button"
              onClick={() => setOpenOrg(open ? null : exp.organization)}
              aria-expanded={open}
              aria-controls={panelId}
              className="exp-row w-full cursor-pointer py-5 text-left text-base leading-snug"
            >
              <span className="flex flex-col gap-0.5 sm:grid sm:grid-cols-[1.1fr_1.3fr_auto_1rem] sm:items-baseline sm:gap-6">
                <span className="font-bold">{exp.organization}</span>
                <span className="exp-meta">{exp.role}</span>
                <span className="exp-meta sm:text-right">{exp.period}</span>
                <span className="exp-meta hidden sm:block sm:text-right">
                  {open ? "−" : "+"}
                </span>
              </span>
            </button>

            {open && (
              <div id={panelId} className="max-w-[46rem] pb-7 sm:pb-8">
                <p className="text-base leading-snug text-[#3a3a3a]">
                  {exp.highlights.join(". ")}.
                </p>
                <p className="mt-3 text-base">
                  <span className="exp-meta">{exp.location} — </span>
                  <a
                    href={exp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="accent-link font-bold"
                  >
                    visit site <span aria-hidden="true">↗</span>
                  </a>
                </p>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
