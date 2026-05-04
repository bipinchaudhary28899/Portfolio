import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Bipin Chaudhary | Full Stack Engineer",
  description: "Full Stack Engineer building scalable web systems with clean architecture and measurable impact.",
  keywords: ["Full Stack Engineer", "React", "Next.js", "TypeScript", "Node.js", "Bipin Chaudhary"],
  authors: [{ name: "Bipin Chaudhary" }],
  openGraph: {
    title: "Bipin Chaudhary | Full Stack Engineer",
    description: "Building scalable web systems that move metrics.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
