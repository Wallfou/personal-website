import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Wa Fan — Software Engineer",
  description:
    "Software engineer based in Boston. Building thoughtful products with sharp engineering.",
  openGraph: {
    title: "Wa Fan — Software Engineer",
    description: "Software engineer based in Boston. Building thoughtful products with sharp engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased bg-[#f2efea] text-[#1a1a1a]">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
