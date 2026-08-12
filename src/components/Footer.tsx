import { siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="pt-6 border-t border-[#e8e8e8] text-xs tracking-wide text-[#8a8a8a]">
      © 2026 {siteConfig.name}
    </footer>
  );
}
