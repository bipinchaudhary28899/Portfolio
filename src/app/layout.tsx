import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import LoadingWrapper from "@/components/ui/LoadingWrapper";
import { ThemeProvider } from "@/context/ThemeContext";
import { DexyAssistant } from "@/components/ui/DexyAssistant";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Bipin Chaudhary | Full Stack AI Engineer",
  description: "Full Stack AI Engineer building scalable web systems with clean architecture and measurable impact.",
  keywords: ["Full Stack AI Engineer", "React", "Next.js", "TypeScript", "Node.js", "Bipin Chaudhary"],
  authors: [{ name: "Bipin Chaudhary" }],
  openGraph: {
    title: "Bipin Chaudhary | Full Stack AI Engineer",
    description: "Building scalable web systems that move metrics.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Bipin Chaudhary | Full Stack AI Engineer",
    description: "Building scalable web systems that move metrics.",
    images:      ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <LoadingWrapper>
            <Navbar />
            <main style={{ overflowX: "clip" }}>{children}</main>
            <DexyAssistant />
          </LoadingWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
