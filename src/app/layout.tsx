import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kenneth Fan",
  description:
    "Kenneth Fan — Computer Science student at Northeastern, software engineer co-op at Function Health.",
  openGraph: {
    title: "Kenneth Fan",
    description:
      "Kenneth Fan — Computer Science student at Northeastern, software engineer co-op at Function Health.",
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
      <body className="min-h-full antialiased bg-[#ffffff] text-[#111111]">
        {children}
      </body>
    </html>
  );
}
