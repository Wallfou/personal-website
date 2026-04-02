"use client";

import Link from "next/link";
import { projects, experiences, education } from "@/lib/data";
import { useState } from "react";
import { ArrowUpRight, ChevronDown, Mail, MapPin, GitFork, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/data";
import profilePicture from "../../public/images/profile.png";
import Image from "next/image";



const projectVisuals: Record<string, string> = {
  draftpicks: "project-visual-draftpicks",
  nustack: "project-visual-nustack",
  "pacman-rl": "project-visual-pacman",
  "ai-ticket-generator": "project-visual-ai",
};

const projectLetters: Record<string, string> = {
  draftpicks: "DP",
  nustack: "NS",
  "pacman-rl": "RL",
  "ai-ticket-generator": "AI",
};

export default function Home() {
  const [openExpIdx, setOpenExpIdx] = useState<number | null>(null);
  const [eduOpen, setEduOpen] = useState(false);

  return (
    <div className="pt-20">

      {/* hero */}
      <section id="home" className="min-h-[92vh] flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32 items-center py-32">
          {/* left */}
          <div className="space-y-14">
            <div>
              <p className="label mb-8">Software Engineer</p>
              <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl font-light leading-[0.9] tracking-tight">
                Wa
                <br />
                Fan
              </h1>
            </div>
            <p className="text-[#999] text-lg font-light leading-relaxed max-w-sm">
              Building thoughtful software at the intersection of engineering
              precision and design clarity. Based in Boston.
            </p>
            <div className="flex items-center gap-8 pt-2">
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 text-sm font-medium border-b border-[#1a1a1a] pb-1 hover:gap-3 transition-all duration-200"
              >
                View Projects <ArrowUpRight size={14} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#999] border-b border-[#d0d0d0] pb-1 hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-all duration-200"
              >
                About Me
              </Link>
            </div>
          </div>

          {/* right: profile circle */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div 
              className="absolute -inset-80 rounded-full border-3 border-[#eff0ef]" 
              style={{ animation: "circle-expand 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both" }}/>
              <div 
              className="absolute -inset-30 rounded-full border-3 border-[#d4d9d4]" 
              style={{ animation: "circle-expand 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0s both" }}/>
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#f5f5f0] flex items-center justify-center overflow-hidden relative">
                <Image src={profilePicture} alt="WF" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="label">Boston, MA · Available 2027</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 pb-20">
          <div className="w-10 h-px bg-[#d0d0d0]" />
          <span className="label">Scroll to explore</span>
        </div>
      </section>

      <div className="border-t border-[#ebebeb] mx-8 md:mx-16 lg:mx-24" />

      {/* project */}
      <section id="projects" className="py-32 md:py-40 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-20">
          <div>
            <p className="label mb-4">[Selected Work]</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light">
              Featured
              <br />
              <span className="italic">Projects</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group project-card block"
            >
              <div className={`w-full aspect-[16/10] ${projectVisuals[project.id]} rounded-sm overflow-hidden relative mb-7`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <span className="font-serif text-2xl text-white/25 group-hover:text-white/60 transition-colors duration-300">
                      {projectLetters[project.id]}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center">
                    <ArrowUpRight size={14} className="text-black" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="label">{project.date}</p>
                <h3 className="font-serif text-2xl md:text-3xl font-light transition-all duration-200">
                  {project.title}
                </h3>
                <p className="text-sm text-[#999] font-light">{project.subtitle}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="border-t border-[#ebebeb] mx-8 md:mx-16 lg:mx-24" />

      {/* experience */}
      <section id="experience" className="px-8 md:px-16 lg:px-24 max-w-7xl mx-auto py-32 md:py-40">
        <div className="mb-20">
          <p className="label mb-4">[Experience · {experiences.length} Roles]</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight">
              Work &amp;
              <br />
              <span className="italic">Education</span>
            </h2>
            <p className="text-[#999] font-light max-w-xs leading-relaxed text-sm pb-2">
              Leading teams, shipping features, and building systems that last.
            </p>
          </div>
        </div>

        {/* professional timeline */}
        <div className="max-w-4xl">
          <p className="label mb-16">[Professional]</p>

          <div className="space-y-0">
            {experiences.map((exp, i) => {
              const isOpen = openExpIdx === i;
              return (
                <div key={i} className="relative">
                  {i < experiences.length - 1 && (
                    <div className="absolute left-[11px] top-12 bottom-0 w-px bg-[#ebebeb]" />
                  )}
                  <div className="flex gap-10 pb-20">
                    <div className="flex flex-col items-center flex-shrink-0 mt-1">
                      <div className="timeline-dot-ring">
                        <div className="timeline-dot" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <button
                        onClick={() => setOpenExpIdx(isOpen ? null : i)}
                        className="w-full text-left cursor-pointer group"
                      >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-2">
                          <div className="space-y-1.5">
                            <h3 className="font-serif text-2xl md:text-3xl font-light group-hover:italic transition-all duration-200">
                              {exp.role}
                            </h3>
                            <p className="text-[#999] font-light text-sm">
                              {exp.organization} · {exp.location}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="pill text-xs">{exp.period}</span>
                            <ChevronDown
                              size={14}
                              className={`text-[#999] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                            />
                          </div>
                        </div>
                      </button>

                      <div
                        style={{
                          maxHeight: isOpen ? "600px" : "0px",
                          overflow: "hidden",
                          opacity: isOpen ? 1 : 0,
                          transition: "max-height 0.4s ease, opacity 0.3s ease",
                        }}
                      >
                        <div className="pt-8 border-t border-[#ebebeb] mt-6">
                          <div className="space-y-5 mb-8">
                            {exp.highlights.map((h, j) => (
                              <div key={j} className="flex gap-4">
                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#c0c0c0] flex-shrink-0" />
                                <p className="text-sm text-[#3a3a3a] font-light leading-relaxed">{h}</p>
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {exp.tech.map((t) => (
                              <span key={t} className="pill text-[11px]">{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* education */}
          <p className="label mb-16">[Education]</p>
          <div className="flex gap-10">
            <div className="flex flex-col items-center flex-shrink-0 mt-1">
              <div className="timeline-dot-ring">
                <div className="timeline-dot" />
              </div>
            </div>
            <div className="flex-1">
              <button
                onClick={() => setEduOpen(!eduOpen)}
                className="w-full text-left cursor-pointer group"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-2xl md:text-3xl font-light group-hover:italic transition-all duration-200">
                      {education.school}
                    </h3>
                    <p className="text-[#999] font-light text-sm">{education.degree}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="pill text-xs">{education.graduation}</span>
                    <span className="label">GPA: {education.gpa}</span>
                    <ChevronDown
                      size={14}
                      className={`text-[#999] transition-transform duration-300 ${eduOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>
              </button>

              <div
                style={{
                  maxHeight: eduOpen ? "600px" : "0px",
                  overflow: "hidden",
                  opacity: eduOpen ? 1 : 0,
                  transition: "max-height 0.4s ease, opacity 0.3s ease",
                }}
              >
                <div className="pt-8 border-t border-[#ebebeb] mt-6">
                  <p className="label mb-5">[Coursework]</p>
                  <div className="flex flex-wrap gap-2">
                    {education.coursework.map((c) => (
                      <span key={c} className="pill text-[11px]">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[#ebebeb] mx-8 md:mx-16 lg:mx-24" />

      {/* contact */}
      <section id="contact" className="px-8 md:px-16 lg:px-24 max-w-7xl mx-auto py-28 md:py-36">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 lg:gap-32 items-start">
          <div>
            <p className="label mb-4">[Reach Out]</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-12">
              Open to new opportunities.
            </h2>
            <div className="space-y-8">
              {[
                {
                  icon: <Mail size={18} strokeWidth={1.5} />,
                  label: "Email",
                  value: siteConfig.email,
                  href: `mailto:${siteConfig.email}`,
                  external: false,
                },
                {
                  icon: <ExternalLink size={18} strokeWidth={1.5} />,
                  label: "LinkedIn",
                  value: "linkedin.com/in/wa-fan",
                  href: siteConfig.linkedin,
                  external: true,
                },
                {
                  icon: <GitFork size={18} strokeWidth={1.5} />,
                  label: "GitHub",
                  value: "github.com/kennethfan",
                  href: siteConfig.github,
                  external: true,
                },
                {
                  icon: <MapPin size={18} strokeWidth={1.5} />,
                  label: "Location",
                  value: siteConfig.location,
                  href: null,
                  external: false,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="group flex items-start gap-6 p-6 border border-[#ebebeb] rounded-sm hover:border-[#d0d0d0] transition-colors duration-200"
                >
                  <div className="w-11 h-11 rounded-full bg-[#f5f5f0] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#eeeeea] transition-colors duration-200">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="label mb-2">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="text-[#1a1a1a] font-light text-sm md:text-base hover:underline underline-offset-4 break-all"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-[#3a3a3a] font-light text-sm md:text-base">
                        {item.value}
                      </span>
                    )}
                  </div>
                  {item.external && item.href && (
                    <ArrowUpRight
                      size={14}
                      className="text-[#c0c0c0] group-hover:text-[#999] transition-colors mt-1 flex-shrink-0"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side: decorative + message */}
          <div className="space-y-14">
            <div className="flex items-center justify-center py-12">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full border border-[#ebebeb]" />
                <div className="absolute inset-4 rounded-full border border-[#f0f0f0]" />
                <div className="absolute inset-8 rounded-full border border-[#f5f5f5]" />
                <div className="absolute inset-12 rounded-full bg-[#f5f5f0] flex items-center justify-center">
                  <Mail size={24} strokeWidth={1} className="text-[#999]" />
                </div>
              </div>
            </div>

            <div className="space-y-6 font-light text-[#3a3a3a] text-sm md:text-base leading-relaxed max-w-sm">
              <p>
                The best way to reach me is by email. I respond within 24 hours.
              </p>
              <p>
                Whether you have a project in mind, want to talk shop, or are
                looking for someone on your team — I&apos;m all ears.
              </p>
              <p className="font-medium text-[#1a1a1a]">
                Available for co-ops starting May 2027.
              </p>
            </div>

            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#1a1a1a] text-white text-sm font-medium rounded-full hover:bg-black transition-colors duration-200"
            >
              <Mail size={14} />
              Send an Email
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-[#ebebeb] px-8 md:px-16 lg:px-24 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-serif text-sm">© 2026 Wa Fan</span>
          <div className="flex items-center gap-10">
            <Link href="#projects" className="label">Projects</Link>
            <Link href="/about" className="label">About</Link>
            <Link href="/contact" className="label">Contact</Link>
            <Link href="https://github.com/kennethfan" target="_blank" rel="noopener noreferrer" className="label">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
