import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Navbar } from "@/components/ui/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bipin Chaudhary | Full Stack Engineer",
  description:
    "Full Stack Engineer building scalable products with clean code and great UX. Specializing in React, Next.js, Node.js, and modern web technologies.",
  keywords: [
    "Full Stack Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Bipin Chaudhary",
  ],
  authors: [{ name: "Bipin Chaudhary" }],
  openGraph: {
    title: "Bipin Chaudhary | Full Stack Engineer",
    description: "Building scalable products with clean code and great UX.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bipin Chaudhary | Full Stack Engineer",
    description: "Building scalable products with clean code and great UX.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
