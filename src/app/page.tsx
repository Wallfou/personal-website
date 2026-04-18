"use client";

import Link from "next/link";
import { projects, experiences, education } from "@/lib/data";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Mail, MapPin, GitFork, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/lib/data";
import profilePicture from "../../public/images/profile.png";
import draftPicksPic from "../../public/images/DraftPicksPic.png";
import rlAgentPic from "../../public/images/RLAgentPic.png";
import ticketeerPic from "../../public/images/TicketeerPic.png";
import nuStackPic from "../../public/images/NuStackPic.png";
import medoraPic from "../../public/images/medoraPic.png";
import cloudAutoscalingPic from "../../public/images/CloudPic.png";
import Image, { type StaticImageData } from "next/image";



const circleEase = [0.16, 1, 0.3, 1] as const;

const profileCircleVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0, delayChildren: 0 },
  },
};

const profileRingOuter = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1, delay: 0.3, ease: circleEase },
  },
};

const profileRingInner = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, delay: 0, ease: circleEase },
  },
};

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

      {/* hero */}
      <section className="min-h-[92vh] flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-32 items-center py-32">
          {/* left */}
          <div className="space-y-14">
            <div>
              <p className="label mb-8">[Software Engineer]</p>
              <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl font-light leading-[0.9] tracking-tight">
                Wa
                <br />
                Kenneth
                <br />
                Fan
              </h1>
            </div>
            <div className="flex items-center gap-6 pt-2">
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a1a1a] hover:opacity-60 transition-opacity duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6" aria-hidden />
              </a>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a1a1a] hover:opacity-60 transition-opacity duration-200"
                aria-label="GitHub"
              >
                <FaGithub className="w-6 h-6" aria-hidden />
              </a>
            </div>
          </div>

          {/* right: profile circle — rings animate when this block enters the viewport */}
          <div className="flex justify-center md:justify-end">
            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.35 }}
              variants={profileCircleVariants}
            >
              <motion.div
                className="absolute -inset-100 rounded-full border-3 border-[#eff0ef]"
                style={{ transformOrigin: "center" }}
                variants={profileRingOuter}
              />
              <motion.div
                className="absolute -inset-30 rounded-full border-3 border-[#d4d9d4]"
                style={{ transformOrigin: "center" }}
                variants={profileRingInner}
              />
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#f5f5f0] flex items-center justify-center overflow-hidden relative">
                <Image src={profilePicture} alt="WF" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="label">Boston, MA · Available 2027</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex items-center gap-4 pb-20">
          <div className="w-10 h-px bg-[#d0d0d0]" />
          <span className="label">Scroll to explore</span>
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
