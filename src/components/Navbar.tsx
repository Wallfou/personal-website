"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const leftLinks = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
];

const rightLinks = [
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth"});
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#f2efea]/95 backdrop-blur-sm border-b border-[#ebebeb]" : "bg-[#f2efea]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 h-20 flex items-center">
        {/* left links */}
        <div className="flex items-center gap-8 flex-1">
          {leftLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="label tracking-widest transition-colors hover:text-black cursor-pointer"
              onClick={(e) => scrollTo(e, link.href)}
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
        </div>

        {/* center: my name */}
        <Link
          href="/"
          className="font-serif text-xl font-normal tracking-wide flex-shrink-0"
        >
          WA FAN
        </Link>

        {/* right links */}
        <div className="flex items-center gap-8 flex-1 justify-end">
          {rightLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="label tracking-widest transition-colors hover:text-black cursor-pointer"
              onClick={(e) => scrollTo(e, link.href)}
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
