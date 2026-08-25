"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "about me" },
  { href: "/projects", label: "projects" },
];

export default function Nav({ className = "mb-16" }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={`flex gap-6 text-base ${className}`}>
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            data-label={link.label}
            className={`accent-link nav-link ${active ? "font-bold" : "font-medium"}`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
