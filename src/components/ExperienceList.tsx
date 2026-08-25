"use client";

import { useState } from "react";
import { experiences } from "@/lib/data";

const row = "flex flex-col gap-1 sm:grid sm:grid-cols-[12rem_1fr] sm:gap-20";

export default function ExperienceList() {
  const [openOrg, setOpenOrg] = useState<string | null>(null);

  return (
    <ul className="exp-list">
      {experiences.map((exp) => {
        const open = openOrg === exp.organization;
        const panelId = `exp-${exp.organization.replace(/\s+/g, "-").toLowerCase()}`;

        return (
          <li key={exp.organization}>
            <button
              type="button"
              onClick={() => setOpenOrg(open ? null : exp.organization)}
              aria-expanded={open}
              aria-controls={panelId}
              className="exp-row w-full cursor-pointer py-4 text-left text-base leading-snug"
            >
              <span className={row}>
                <span className="exp-date">{exp.period}</span>
                <span>
                  <span className="block">{exp.organization}</span>
                  <span className="exp-role block text-sm">{exp.role}</span>
                </span>
              </span>
            </button>

            {open && (
              <div id={panelId} className={`${row} pb-8`}>
                <span aria-hidden="true" />
                <div className="max-w-[46rem]">
                  <p className="text-base leading-snug text-[#3a3a3a]">
                    {exp.highlights.join(". ")}.
                  </p>
                  <p className="mt-3 text-sm">
                    <span className="exp-role">{exp.location} — </span>
                    <a
                      href={exp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="accent-link font-bold"
                    >
                      visit site
                    </a>
                  </p>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
