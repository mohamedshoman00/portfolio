import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohamed Shoman | Frontend Developer",
  description:
    "Frontend Developer specializing in React.js & Next.js — building modern, performant web applications.",
  keywords: ["Frontend Developer", "React", "Next.js", "TypeScript", "Portfolio"],
  authors: [{ name: "Mohamed Shoman" }],
  openGraph: {
    title: "Mohamed Shoman | Frontend Developer",
    description: "React & Next.js Frontend Developer based in Port Said, Egypt.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-base font-sans antialiased">{children}</body>
    </html>
  );
}
