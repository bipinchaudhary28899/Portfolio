import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// ✅ Using Inter (similar to Geist) and Roboto Mono for monospace
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono" })

export const metadata: Metadata = {
  title: "Bipin Kumar Chaudhary | Full Stack Developer",
  description:
    "Full Stack Developer | M.Tech CSE IIIT Allahabad | Building scalable web apps with modern JavaScript and cloud technologies",
  generator: "v0.app",
  openGraph: {
    title: "Bipin Kumar Chaudhary | Full Stack Developer",
    description: "Explore my portfolio showcasing Full Stack development with React, Angular, Node.js, and AWS",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
