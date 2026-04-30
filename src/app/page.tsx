"use client";

import Link from "next/link";
import { projects, experiences, education } from "@/lib/data";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Mail, MapPin, GitFork, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/lib/data";
import hongKongImage from "../../public/images/hongkongimage.png";
import draftPicksPic from "../../public/images/DraftPicksPic.png";
import rlAgentPic from "../../public/images/RLAgentPic.png";
import ticketeerPic from "../../public/images/TicketeerPic.png";
import nuStackPic from "../../public/images/NuStackPic.png";
import medoraPic from "../../public/images/medoraPic.png";
import cloudAutoscalingPic from "../../public/images/CloudPic.png";
import Image, { type StaticImageData } from "next/image";



const circleEase = [0.16, 1, 0.3, 1] as const;

const projectCardImages: Record<string, { src: StaticImageData; alt: string; objectClass?: string }> = {
  draftpicks: {
    src: draftPicksPic,
    alt: "DraftPicks — NBA prop analytics platform",
  },
  "pacman-rl": {
    src: rlAgentPic,
    alt: "Pac-Man RL Agent — reinforcement learning with SARSA",
  },
  "ai-ticket-generator": {
    src: ticketeerPic,
    alt: "Ticketeer — AI-powered project ticketing tool",
  },
  nustack: {
    src: nuStackPic,
    alt: "NuStack — real-time Q&A platform",
  },
  medora: {
    src: medoraPic,
    alt: "Medora — Gemma 4 powered app",
    objectClass: "object-cover object-center",
  },
  "cloud-autoscaling": {
    src: cloudAutoscalingPic,
    alt: "Cloud Autoscaling Simulation — C++ round-robin cloud autoscaling simulator",
  },
};

export default function Home() {
  const [openExpIdx, setOpenExpIdx] = useState<number | null>(null);
  const [eduOpen, setEduOpen] = useState(false);

  return (
    <div className="pt-20" id="home">

      {/* hero — gallery wall */}
      <section className="min-h-[92vh] flex flex-col justify-between bg-[#f2efea] px-6 md:px-10 lg:px-14 py-8">

        {/* framed artwork */}
        <div className="flex-1 flex flex-col justify-center max-w-screen-2xl mx-auto w-full">
          <div className="shadow-[0_16px_80px_-8px_rgba(0,0,0,0.45)]">
            {/* black frame border */}
            <div className="p-4 bg-[#1a1a1a]">
              {/* cream mat board */}
              <div className="p-6 bg-[#f5f3ef]">
                {/* image: fills the mat; text overlays on top */}
                <div className="relative overflow-hidden min-h-[68vh]">
                  <Image
                    src={hongKongImage}
                    alt="Hong Kong cityscape"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="100vw"
                  />
                  {/* directional dark overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/42 to-black/18" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                  {/* text */}
                  <div className="relative z-10 flex flex-col justify-between p-8 md:p-12 min-h-[68vh]">
                    <p className="label" style={{ color: "rgb(255,255,255)" }}>[Software Engineer]</p>

                    <div className="space-y-10">
                      <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl font-light leading-[0.9] tracking-tight text-white">
                        Wa
                        <br />
                        Kenneth
                        <br />
                        Fan
                      </h1>
                      <div className="flex items-center gap-6">
                        <a
                          href={siteConfig.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:opacity-60 transition-opacity duration-200"
                          aria-label="LinkedIn"
                        >
                          <FaLinkedin className="w-6 h-6" aria-hidden />
                        </a>
                        <a
                          href={siteConfig.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:opacity-60 transition-opacity duration-200"
                          aria-label="GitHub"
                        >
                          <FaGithub className="w-6 h-6" aria-hidden />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* gallery caption */}
          <div className="mt-8 flex justify-between items-center">
            <span className="label">Scroll to explore</span>
          </div>
        </div>

      </section>

      <div className="border-t border-[#ebebeb] mx-8 md:mx-16 lg:mx-24" />

      {/* projects — two per row */}
      <section id="projects" className="py-24 md:py-40 px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto">
        <div className="mb-10 md:mb-14">
          <p className="label mb-4">[Selected Work]</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">
            Featured
            <br />
            Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 md:gap-y-16 lg:gap-x-12">
          {projects.map((project, i) => {
            const cardImage = projectCardImages[project.id];
            const objectClass = cardImage?.objectClass ?? "object-cover object-center";
            return (
              <motion.article
                key={project.id}
                className="min-w-0"
                initial={{ y: 12 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
                transition={{ duration: 0.45, ease: circleEase, delay: i * 0.05 }}
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block outline-none"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-[#f0f0ec]">
                    {cardImage ? (
                      <Image
                        src={cardImage.src}
                        alt={cardImage.alt}
                        fill
                        className={objectClass}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : null}
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-serif text-2xl md:text-3xl tracking-tight text-[#080808] leading-[1.12]">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm font-sans text-[#6e6e6e] leading-relaxed">
                        {project.subtitle}
                        <span className="text-[#a8a8a8]"> · </span>
                        <span className="text-[#8a8a8a]">[{project.date}]</span>
                      </p>
                    </div>
                    <ArrowUpRight
                      size={22}
                      strokeWidth={2}
                      className="mt-1 shrink-0 text-[#1a1a1a] opacity-30 transition-opacity duration-200 group-hover:opacity-100"
                      aria-hidden
                    />
                  </div>
                </a>
              </motion.article>
            );
          })}
        </div>
      </section>

      <div className="border-t border-[#ebebeb] mx-8 md:mx-16 lg:mx-24" />

      {/* experience */}
      <section id="experience" className="px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto py-32 md:py-40">
        <div className="mb-20">
          <p className="label mb-4">[Experience · {experiences.length} Roles]</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight">
              Work &amp;
              <br />
              Education
            </h2>
            <p className="text-[#999] font-light max-w-xs leading-relaxed text-sm pb-2">
              Leading teams, shipping features, and building systems that last.
            </p>
          </div>
        </div>

        {/* professional timeline — full content width */}
        <div className="w-full">
          <p className="label mb-14">[Professional]</p>

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
                        <div className="flex w-full flex-col md:flex-row md:items-start md:justify-between gap-5 md:gap-10 lg:gap-16 mb-2">
                          <div className="min-w-0 space-y-1.5 md:pr-4">
                            <h3 className="font-serif text-2xl md:text-3xl font-light transition-all duration-200">
                              {exp.role}
                            </h3>
                            <p className="text-[#242222] text-lg">
                              {exp.organization} · {exp.location}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0 md:pt-1">
                            <span className="text-xs tabular-nums whitespace-nowrap text-[#5a5a5a]">[{exp.period}]</span>
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
                        <div className="pt-4">
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
          <p className="label mb-14">[Education]</p>
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
                <div className="flex w-full flex-col md:flex-row md:items-start md:justify-between gap-5 md:gap-10 lg:gap-16">
                  <div className="min-w-0 space-y-1.5 md:pr-4">
                    <h3 className="font-serif text-2xl md:text-3xl font-light transition-all duration-200">
                      {education.school}
                    </h3>
                    <p className="text-[#999] font-light text-sm">{education.degree}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 md:pt-1">
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
                <div className="pt-4">
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
      <section id="contact" className="px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto py-28 md:py-36">
        <div className="w-full">
          <p className="label mb-4">[Reach Out]</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-12">
            Open to new opportunities.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full">
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
                value: "linkedin.com/in/kennethfan2",
                href: siteConfig.linkedin,
                external: true,
              },
              {
                icon: <GitFork size={18} strokeWidth={1.5} />,
                label: "GitHub",
                value: "github.com/Wallfou",
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
                className="group flex items-start gap-6 p-6 border border-[#ebebeb] rounded-sm hover:border-[#9e9e9e] transition-colors duration-200"
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
      </section>

      {/* footer */}
      <footer className="border-t border-[#ebebeb] px-8 md:px-16 lg:px-24 py-12">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-serif text-sm">Built by Wa Fan!</span>
          <div className="flex items-center gap-10">
            <Link href="#projects" className="label">Projects</Link>
            <Link href="https://github.com/Wallfou" target="_blank" rel="noopener noreferrer" className="label">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
