"use client";

import { skills, education } from "@/lib/data";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";

const skillColors: Record<string, string> = {
  Languages: "#f5f5f0",
  Frameworks: "#f0f0eb",
  "Cloud & Data": "#eeeeea",
  "Developer Tools": "#f2f2ed",
};

export default function AboutPage() {
  const [openSkill, setOpenSkill] = useState<string | null>(null);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="px-8 md:px-16 lg:px-24 max-w-7xl mx-auto pt-24 pb-20">
        <div className="space-y-8">
          <p className="label">[About]</p>
          <h1 className="font-serif text-6xl md:text-7xl font-light leading-tight">
            The person
            <br />
            <span className="italic">behind the code</span>
          </h1>
        </div>
      </section>

      <div className="border-t border-[#ebebeb] mx-8 md:mx-16 lg:mx-24" />

      {/* Bio section */}
      <section className="px-8 md:px-16 lg:px-24 max-w-7xl mx-auto py-28 md:py-36">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32 items-start">
          {/* Profile photo */}
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              <div className="absolute -inset-10 rounded-full border border-[#ebebeb]" />
              <div className="absolute -inset-20 rounded-full border border-[#f3f3f3]" />
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-[#f5f5f0] flex items-center justify-center relative z-10">
                <span className="font-serif text-6xl font-light text-[#c0c0c0]">WF</span>
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                <span className="label bg-white px-2">Wa Fan · 2026</span>
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div className="max-w-xl space-y-10">
            <div className="space-y-7 font-light leading-[1.8] text-[#3a3a3a]">
              <p className="text-base md:text-lg">
                I&apos;m a software engineer studying Computer Engineering and Computer Science at
                Northeastern University in Boston. I build full-stack products, lead engineering
                teams, and spend a lot of time thinking about how to make software that feels right.
              </p>
              <p className="text-base md:text-lg">
                Currently serving as Software Tech Lead at the{" "}
                <span className="font-medium text-[#1a1a1a]">Northeastern Electric Racing Team</span>,
                where I lead a team of 10+ engineers maintaining our club&apos;s internal ERP
                platform. I care about developer experience, clean APIs, and the kind of code that
                you&apos;re not embarrassed to show.
              </p>
              <p className="text-base md:text-lg">
                Outside of coursework, I&apos;ve built everything from NBA prop analytics platforms
                to reinforcement learning agents. I&apos;m drawn to problems where engineering
                precision and good design intersect.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-[#ebebeb]">
              {[
                { label: "Location", value: "Boston, MA" },
                { label: "University", value: "Northeastern University" },
                { label: "Degree", value: "BS Computer Engineering / CS" },
                { label: "GPA", value: `${education.gpa} / 4.0` },
                { label: "Graduation", value: education.graduation },
                { label: "Status", value: "Open to co-ops from May 2027" },
              ].map((item) => (
                <div key={item.label} className="flex items-baseline gap-8">
                  <span className="label w-28 flex-shrink-0">{item.label}</span>
                  <span className="text-sm text-[#3a3a3a] font-light">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[#ebebeb] mx-8 md:mx-16 lg:mx-24" />

      {/* Skills section — collapsible categories */}
      <section className="px-8 md:px-16 lg:px-24 max-w-4xl mx-auto py-28 md:py-36">
        <p className="label mb-16">[Technical Skills]</p>

        <div className="space-y-0">
          {Object.entries(skills).map(([category, items]) => {
            const isOpen = openSkill === category;
            return (
              <div key={category} className="border-b border-[#ebebeb]">
                <button
                  onClick={() => setOpenSkill(isOpen ? null : category)}
                  className="w-full flex items-center justify-between py-7 cursor-pointer group"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-6 h-6 rounded-full border border-[#d0d0d0] flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl font-light group-hover:italic transition-all duration-200">
                      {category}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="label">{items.length} skills</span>
                    <ChevronDown
                      size={14}
                      className={`text-[#999] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                <div
                  style={{
                    maxHeight: isOpen ? "400px" : "0px",
                    overflow: "hidden",
                    opacity: isOpen ? 1 : 0,
                    transition: "max-height 0.4s ease, opacity 0.3s ease",
                  }}
                >
                  <div
                    className="flex flex-wrap gap-3 pb-8 mt-2"
                    style={{ backgroundColor: skillColors[category] || "#f5f5f0", borderRadius: "4px", padding: "1.25rem 1.25rem 1.25rem 2.75rem" }}
                  >
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-white text-[#1a1a1a] shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="border-t border-[#ebebeb] mx-8 md:mx-16 lg:mx-24" />

      {/* Interests */}
      <section className="px-8 md:px-16 lg:px-24 max-w-3xl mx-auto py-28 md:py-36">
        <p className="label mb-10">[Interests]</p>
        <div className="space-y-8 font-light text-[#3a3a3a] text-base md:text-lg leading-[1.8]">
          <p>
            I&apos;m interested in the intersection of systems thinking and user experience — how
            well-engineered backends enable beautiful frontends, and how thoughtful API design
            shapes the products built on top of them.
          </p>
          <p>
            I follow developments in AI/ML closely, particularly around LLM applications and
            reinforcement learning. I enjoy hackathons as a forcing function for shipping fast and
            learning under pressure.
          </p>
          <p>
            When I&apos;m not coding, I think about product, read broadly across disciplines,
            and experiment with side projects that scratch itches I didn&apos;t know I had.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#ebebeb] px-8 md:px-16 lg:px-24 max-w-7xl mx-auto py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-3">
            <p className="label">[Work Together]</p>
            <h3 className="font-serif text-3xl md:text-4xl font-light">
              Always happy to connect.
            </h3>
          </div>
          <div className="flex gap-5">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#1a1a1a] text-white text-sm font-medium rounded-full hover:bg-black transition-colors duration-200"
            >
              Get in Touch <ArrowUpRight size={14} />
            </Link>
            <Link
              href="#projects"
              className="inline-flex items-center gap-3 px-10 py-4 border border-[#ebebeb] text-[#1a1a1a] text-sm font-medium rounded-full hover:border-[#1a1a1a] transition-colors duration-200"
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#ebebeb] px-8 md:px-16 lg:px-24 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-serif text-sm">© 2026 Wa Fan</span>
          <div className="flex items-center gap-10">
            <Link href="#projects" className="label hover:text-black transition-colors">Projects</Link>
            <Link href="/experience" className="label hover:text-black transition-colors">Experience</Link>
            <Link href="/contact" className="label hover:text-black transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
