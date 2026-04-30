"use client";

import Link from "next/link";
import { projects, experiences, education } from "@/lib/data";
import { useState, useEffect } from "react";
import {
  ChevronDown,
  Mail,
  MapPin,
  GitFork,
  ExternalLink,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/lib/data";
import hongKongImage from "../../public/images/hongkongimage.png";
import project1Image from "../../public/images/project1.png";
import project2Image from "../../public/images/project2.png";
import project3Image from "../../public/images/project3.png";
import project4Image from "../../public/images/project4.png";
import project5Image from "../../public/images/project5.png";
import project6Image from "../../public/images/project6.png";
import draftPicksPic from "../../public/images/DraftPicksPic.png";
import rlAgentPic from "../../public/images/RLAgentPic.png";
import ticketeerPic from "../../public/images/TicketeerPic.png";
import nuStackPic from "../../public/images/NuStackPic.png";
import medoraPic from "../../public/images/medoraPic.png";
import cloudAutoscalingPic from "../../public/images/CloudPic.png";
import Image, { type StaticImageData } from "next/image";

type GalleryCell =
  | {
      kind: "project";
      id: string;
      cropRatio?: string;
    }
  | {
      kind: "decor";
      src: StaticImageData;
      alt: string;
      label: string;
    };

// masonry order — items flow top→bottom in each column.
const galleryCells: GalleryCell[] = [
  { kind: "project", id: "ai-ticket-generator" },
  { kind: "decor", src: project2Image, alt: "Gallery piece II", label: "No. II" },
  { kind: "decor", src: project4Image, alt: "Gallery piece IV", label: "No. IV" },
  { kind: "decor", src: project6Image, alt: "Gallery piece VI", label: "No. VI" },
  { kind: "project", id: "medora", cropRatio: "aspect-[4/8]" },
  { kind: "decor", src: project5Image, alt: "Gallery piece V", label: "No. V" },
  { kind: "project", id: "draftpicks" },
  { kind: "decor", src: project1Image, alt: "Gallery piece I", label: "No. I" },
  { kind: "project", id: "nustack" },
  { kind: "decor", src: project3Image, alt: "Gallery piece III", label: "No. III" },
  { kind: "project", id: "pacman-rl" },
  { kind: "project", id: "cloud-autoscaling" },
];

const projectCardImages: Record<
  string,
  { src: StaticImageData; alt: string; objectClass?: string }
> = {
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
  const [bostonTime, setBostonTime] = useState<string>("");
  const [guestbookEntry, setGuestbookEntry] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZoneName: "short",
      }).format(now);
      setBostonTime(formatted);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pt-20" id="home">
      {/* hero — gallery wall */}
      <section className="min-h-[92vh] flex flex-col justify-between bg-[#f2efea] px-6 md:px-10 lg:px-14 py-8">
        {/* framed artwork */}
        <div className="flex-1 flex flex-col justify-center max-w-screen-2xl mx-auto w-full relative">
          {/* vertical edition mark on the right edge */}
          <div className="hidden md:flex absolute top-0 -right-4 lg:-right-8 h-full items-center pointer-events-none">
            <span
              className="label tracking-[0.4em] whitespace-nowrap"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              EDITION 01 / 04
            </span>
          </div>

          <div className="shadow-[0_16px_80px_-8px_rgba(0,0,0,0.45)] relative">
            {/* black frame border */}
            <div className="p-4 bg-[#1a1a1a]">
              {/* cream mat board */}
              <div className="p-6 bg-[#f5f3ef] relative">
                {/* ON VIEW exhibition pill on the mat */}
                <div className="absolute top-3 right-3 z-20 hidden md:block">
                  <span className="inline-flex items-center gap-2 border border-[#1a1a1a]/40 bg-[#f5f3ef] px-2.5 py-1 text-[0.6rem] font-sans font-medium tracking-[0.18em] uppercase text-[#1a1a1a]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]" />
                    On View · 2026 –
                  </span>
                </div>

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
                    <p className="label" style={{ color: "rgb(255,255,255)" }}>
                      [Software Engineer]
                    </p>

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

          {/* museum plaque */}
          <div className="mt-10 mx-auto w-full max-w-2xl">
            <div className="border-t border-[#1a1a1a]/30" />
            <p className="py-4 text-center text-[0.7rem] font-sans tracking-[0.32em] uppercase text-[#1a1a1a]">
              Wa Fan <span className="mx-3 text-[#1a1a1a]/40">·</span> Software Engineer{" "}
              <span className="mx-3 text-[#1a1a1a]/40">·</span> Boston{" "}
              <span className="mx-3 text-[#1a1a1a]/40">·</span> 2026
            </p>
            <div className="border-b border-[#1a1a1a]/30" />
          </div>
        </div>
      </section>

      <div className="border-t border-[#ebebeb] mx-8 md:mx-16 lg:mx-24" />

      {/* projects — gallery wall */}
      <section
        id="projects"
        className="py-24 md:py-40 px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto"
      >
        <div className="mb-10 md:mb-14">
          <p className="label mb-4">[Selected Work]</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">
            Featured
            <br />
            Projects
          </h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6">
          {galleryCells.map((cell, i) => {
            const cls = "break-inside-avoid mb-4 md:mb-6";

            const FramedImage = ({
              src,
              alt,
              cropRatio,
            }: {
              src: StaticImageData;
              alt: string;
              cropRatio?: string;
            }) => (
              <div className="shadow-[0_16px_48px_-8px_rgba(0,0,0,0.35)]">
                <div className="p-[10px] bg-[#1a1a1a]">
                  <div className="p-3 md:p-4 bg-[#f5f3ef]">
                    {cropRatio ? (
                      <div className={`relative ${cropRatio} overflow-hidden`}>
                        <Image
                          src={src}
                          alt={alt}
                          fill
                          className="object-contain object-center"
                          sizes="(max-width: 768px) 100vw, 60vw"
                        />
                      </div>
                    ) : (
                      <Image
                        src={src}
                        alt={alt}
                        width={src.width}
                        height={src.height}
                        className="w-full h-auto block object-contain object-center"
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                    )}
                  </div>
                </div>
              </div>
            );

            if (cell.kind === "decor") {
              return (
                <div key={`decor-${i}`} className={cls}>
                  <FramedImage src={cell.src} alt={cell.alt} />
                  <div className="mt-2">
                    <span className="label">{cell.label}</span>
                  </div>
                </div>
              );
            }

            const project = projects.find((p) => p.id === cell.id);
            const cardImage = projectCardImages[cell.id];
            if (!project) return null;

            return (
              <article key={cell.id} className={cls}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block outline-none"
                >
                  <FramedImage
                    src={cardImage?.src ?? project1Image}
                    alt={
                      cardImage ? `${project.title} screenshot` : project.title
                    }
                    cropRatio={cell.cropRatio}
                  />
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-serif text-xl md:text-2xl tracking-tight text-[#080808] leading-[1.12]">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-xs font-sans text-[#6e6e6e] leading-relaxed">
                        {project.subtitle}
                        <span className="text-[#a8a8a8]"> · </span>
                        <span className="text-[#8a8a8a]">[{project.date}]</span>
                      </p>
                    </div>
                  </div>
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <div className="border-t border-[#ebebeb] mx-8 md:mx-16 lg:mx-24" />

      {/* experience */}
      <section
        id="experience"
        className="px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto py-32 md:py-40"
      >
        <div className="mb-20">
          <p className="label mb-4">
            [Experience · {experiences.length} Roles]
          </p>
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
                            <span className="text-xs tabular-nums whitespace-nowrap text-[#5a5a5a]">
                              [{exp.period}]
                            </span>
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
                                <p className="text-sm text-[#3a3a3a] font-light leading-relaxed">
                                  {h}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {exp.tech.map((t) => (
                              <span key={t} className="pill text-[11px]">
                                {t}
                              </span>
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
                    <p className="text-[#999] font-light text-sm">
                      {education.degree}
                    </p>
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
                      <span key={c} className="pill text-[11px]">
                        {c}
                      </span>
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
      <section
        id="contact"
        className="px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto py-28 md:py-36"
      >
        {/* live boston clock */}
        <div className="flex items-center justify-between mb-16 md:mb-20">
          <p className="label">[Reach Out]</p>
          <p className="text-[0.7rem] font-sans tracking-[0.28em] uppercase text-[#1a1a1a] tabular-nums flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] animate-pulse" />
            Boston <span className="text-[#1a1a1a]/40">·</span>{" "}
            <span className="tabular-nums">{bostonTime || "—"}</span>
          </p>
        </div>

        {/* big serif statement */}
        <div className="mb-20 md:mb-28">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-[0.92] tracking-tight text-[#1a1a1a]">
            Let&apos;s make
            <br />
            something.
          </h2>
        </div>

        {/* postcard + guestbook */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 mb-16">
          {/* postcard */}
          <div className="relative bg-[#f5f3ef] border-[1.5px] border-dashed border-[#1a1a1a]/40 p-8 md:p-10 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)]">
            {/* stamp */}
            <div className="absolute top-5 right-5 w-20 h-24 border-[1.5px] border-dashed border-[#1a1a1a]/50 bg-[#f2efea] flex flex-col items-center justify-center text-center px-2">
              <span className="font-serif italic text-xs text-[#1a1a1a] leading-tight">
                Par
                <br />
                Avion
              </span>
              <div className="w-6 h-px bg-[#1a1a1a]/40 my-1.5" />
              <span className="text-[0.55rem] font-sans tracking-[0.15em] uppercase text-[#1a1a1a]/70">
                2026
              </span>
            </div>

            <p className="label mb-6">[Postcard]</p>

            <p className="font-serif text-lg md:text-xl italic font-light text-[#1a1a1a] leading-relaxed mb-8 max-w-md">
              Drop a line, or
              just say hello!
            </p>

            {/* address lines */}
            <div className="space-y-2.5 max-w-sm">
              <div className="border-b border-[#1a1a1a]/30 pb-1">
                <span className="label text-[0.6rem]">To</span>
                <p className="font-serif text-base md:text-lg italic text-[#1a1a1a]">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="hover:underline underline-offset-4"
                  >
                    {siteConfig.email}
                  </a>
                </p>
              </div>
              <div className="border-b border-[#1a1a1a]/30 pb-1">
                <span className="label text-[0.6rem]">From</span>
                <p className="font-serif text-base md:text-lg italic text-[#1a1a1a]">
                  You
                </p>
              </div>
            </div>
          </div>

          {/* guestbook */}
          <div className="relative bg-[#f5f3ef] border border-[#1a1a1a]/20 p-8 md:p-10">
            <div className="flex items-center justify-between mb-6">
              <p className="label">[Guestbook]</p>
              <span className="text-[0.6rem] font-sans tracking-[0.2em] uppercase text-[#1a1a1a]/50">
                Sign your visit
              </span>
            </div>

            <p className="font-serif italic text-base md:text-lg text-[#1a1a1a]/70 leading-relaxed mb-5">
              Leave a note - 
            </p>

            <textarea
              value={guestbookEntry}
              onChange={(e) => setGuestbookEntry(e.target.value)}
              placeholder="Write something ..."
              rows={5}
              className="w-full bg-transparent font-serif italic text-lg md:text-xl text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 focus:outline-none resize-none leading-[2] [background-image:linear-gradient(transparent,transparent_calc(2em-1px),#1a1a1a30_calc(2em-1px),#1a1a1a30_2em)] [background-size:100%_2em] [line-height:2em]"
            />

            <div className="mt-6 flex items-center justify-between">
              <span className="text-[0.6rem] font-sans tracking-[0.2em] uppercase text-[#1a1a1a]/40">
                {guestbookEntry.length > 0
                  ? `${guestbookEntry.length} characters`
                  : "Awaiting visitor"}
              </span>
              <span className="font-serif italic text-sm text-[#1a1a1a]/40">
                — anonymous welcome
              </span>
            </div>
          </div>
        </div>

        {/* tiny icons row */}
        <div className="flex items-center justify-center gap-10 pt-10 border-t border-[#1a1a1a]/15">
          <a
            href={`mailto:${siteConfig.email}`}
            aria-label="Email"
            className="text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors"
          >
            <Mail size={18} strokeWidth={1.5} />
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors"
          >
            <ExternalLink size={18} strokeWidth={1.5} />
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors"
          >
            <GitFork size={18} strokeWidth={1.5} />
          </a>
          <span
            aria-label="Location"
            className="text-[#1a1a1a]/60 flex items-center gap-2"
          >
            <MapPin size={18} strokeWidth={1.5} />
            <span className="text-[0.7rem] font-sans tracking-[0.2em] uppercase">
              {siteConfig.location}
            </span>
          </span>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-[#ebebeb] px-8 md:px-16 lg:px-24 py-12">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-serif text-sm">Built by Wa Fan!</span>
          <div className="flex items-center gap-10">
            <Link href="#projects" className="label">
              Projects
            </Link>
            <Link
              href="https://github.com/Wallfou"
              target="_blank"
              rel="noopener noreferrer"
              className="label"
            >
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
