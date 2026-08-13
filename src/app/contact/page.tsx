import { siteConfig } from "@/lib/data";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="max-w-[39.6rem] mx-auto px-5 pt-13 pb-12 md:pt-16 md:pb-16">
      <Nav />

      {/* contact */}
      <section id="contact" className="mb-10">
        <div className="space-y-1 text-base">
          <p>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
          <p>
            <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}>
              {siteConfig.phone}
            </a>
          </p>
          <p className="text-[#3a3a3a]">{siteConfig.location}</p>
          <p>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
          <p>
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
