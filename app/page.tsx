"use client"
import Navigation from "../components/navigation"
import About from "../components/sections/about"
import Contact from "../components/sections/contact"
import Experience from "../components/sections/experience"
import Hero from "../components/sections/hero"
import Projects from "../components/sections/projects"
import Skills from "../components/sections/skills"

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  )
}
