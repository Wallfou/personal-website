"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "about me" },
  { href: "/projects", label: "projects" },
  { href: "/contact", label: "contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6 text-base mb-16">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            data-label={link.label}
            className={`green-link nav-link ${active ? "font-bold" : "font-medium"}`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
